import { get, put } from "@vercel/blob";
import { collectStaticSlugs, uniqueSlug } from "./post-record.js";

/** Single JSON document for every article published through the API. */
const PATHNAME = "published-posts.json";

/**
 * Raised when the project has no private Blob store connected.
 */
export class StorageError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * Read every published article. Missing file means an empty list.
 * useCache: false is required so a post shows up on the next read.
 * @returns {Promise<{ posts: Array<Record<string, unknown>>, etag: string|null }>}
 */
export async function readPublishedStore() {
  assertStorage();

  let result;
  try {
    result = await get(PATHNAME, { access: "private", useCache: false });
  } catch (error) {
    if (isMissingBlob(error)) return { posts: [], etag: null };
    throw error;
  }

  if (!result) return { posts: [], etag: null };
  if (result.statusCode !== 200 || !result.stream) {
    throw new Error(`Unexpected blob read status ${result.statusCode}`);
  }

  const text = await new Response(result.stream).text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { posts: [], etag: result.blob?.etag || null };
  }

  const posts = Array.isArray(parsed?.posts) ? parsed.posts : [];
  return { posts, etag: result.blob?.etag || null };
}

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function listPublishedPosts() {
  const { posts } = await readPublishedStore();
  return posts;
}

/**
 * @param {string} slug
 * @returns {Promise<string|null>} bodyHtml, or null when this slug was not published via the API
 */
/**
 * @param {string} slug
 * @returns {Promise<Record<string, unknown>|null>}
 */
export async function getPublishedPost(slug) {
  const { posts } = await readPublishedStore();
  return posts.find((item) => item && item.slug === slug) || null;
}

export async function getPublishedBody(slug) {
  const { posts } = await readPublishedStore();
  const post = posts.find((item) => item && item.slug === slug);
  if (!post) return null;
  return typeof post.bodyHtml === "string" ? post.bodyHtml : "";
}

/**
 * Insert one article. Retries when another write wins the etag check.
 * The callback receives slugs already used by static posts and this store.
 * @param {(taken: Set<string>) => Record<string, unknown>} createPost
 * @returns {Promise<Record<string, unknown>>}
 */
export async function appendPublishedPost(createPost) {
  let lastError;
  /** @type {Record<string, unknown>|null} */
  let pending = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { posts, etag } = await readPublishedStore();
    const taken = collectStaticSlugs();
    posts.forEach((post) => {
      if (post && typeof post.slug === "string") taken.add(post.slug);
    });

    const record = createPost(taken);
    pending = record;
    try {
      await writePublishedStore(posts.concat(record), etag);
      return record;
    } catch (error) {
      if (isPreconditionFailed_(error)) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  // etag 冲突重试耗尽后：重新读列表，用不带 ifMatch 的覆盖写。
  if (pending) {
    const { posts } = await readPublishedStore();
    const taken = collectStaticSlugs();
    posts.forEach((post) => {
      if (post && typeof post.slug === "string") taken.add(post.slug);
    });
    // 避免整表重写时漏掉刚被别人写进去的文章：用最新 posts + 本条
    const already = posts.some((post) => post && post.slug === pending.slug);
    let nextPosts = already ? posts : posts.concat(pending);
    if (!already && typeof pending.slug === "string" && taken.has(pending.slug)) {
      pending = { ...pending, slug: uniqueSlug(String(pending.slug), taken) };
      nextPosts = posts.concat(pending);
    }
    await writePublishedStore(nextPosts, null);
    return pending;
  }

  throw lastError || new Error("Could not save the article");
}

/**
 * 删掉通过接口发布的一篇。静态文章不在这份存储里，找不到就当作已经删过。
 * @param {string} slug
 * @returns {Promise<boolean>} 这次是否真的从存储里移除
 */
export async function removePublishedPost(slug) {
  const target = slug.trim();
  if (!target) return false;
  /** @type {Array<Record<string, unknown>>|null} */
  let pending = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { posts, etag } = await readPublishedStore();
    const next = posts.filter((post) => !post || post.slug !== target);
    if (next.length === posts.length) return false;
    pending = next;
    try {
      await writePublishedStore(next, etag);
      return true;
    } catch (error) {
      if (isPreconditionFailed_(error)) continue;
      break;
    }
  }

  if (!pending) throw new Error("Could not delete the article");
  await writePublishedStore(pending, null);
  return true;
}

/**
 * @param {Array<Record<string, unknown>>} posts
 * @param {string|null} etag
 * @returns {Promise<void>}
 */
async function writePublishedStore(posts, etag) {
  assertStorage();

  const options = {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60
  };
  // 仅在有 etag 时做条件写；冲突由上层识别后改传 null 覆盖写
  if (etag) options.ifMatch = etag;

  try {
    await put(PATHNAME, JSON.stringify({ posts }), options);
  } catch (error) {
    // 部分 @vercel/blob 版本不抛 BlobPreconditionFailedError，只带文案
    if (etag && isPreconditionFailed_(error)) {
      const precondition = new Error(error instanceof Error ? error.message : "ETag mismatch");
      precondition.name = "BlobPreconditionFailedError";
      throw precondition;
    }
    throw error;
  }
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
function isPreconditionFailed_(error) {
  if (!error || typeof error !== "object") return false;
  const name = /** @type {{ name?: string }} */ (error).name || "";
  if (name === "BlobPreconditionFailedError") return true;
  const message = String(/** @type {{ message?: string }} */ (error).message || error);
  return /precondition failed|etag\s*mismatch/i.test(message);
}

/**
 * Private Blob on Vercel supplies BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID.
 */
function assertStorage() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    throw new StorageError("Private Vercel Blob is not configured");
  }
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
function isMissingBlob(error) {
  if (!error || typeof error !== "object") return false;
  const name = /** @type {{ name?: string }} */ (error).name;
  return name === "BlobNotFoundError";
}
