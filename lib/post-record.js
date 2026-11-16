import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { STATIC_SLUG_FILES } from "./site-config.js";

/** Public article origin. Merchant sites are never used as this URL. */
export const SITE_ORIGIN = "https://www.ajiusblogs.top";

/** @type {string} */
export const DEFAULT_AUTHOR = "Beaconio";

/** @type {string} */
export const DEFAULT_CATEGORY = "Product Review";

const TITLE_STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your", "you",
  "are", "was", "were", "into", "about", "how", "what", "why", "when",
  "who", "its", "our", "their", "but", "not", "just"
]);

/**
 * Blog article URL. This is the only URL returned to publishers.
 * @param {string} slug
 * @returns {string}
 */
export function articleUrl(slug) {
  return `${SITE_ORIGIN}/post-detail?slug=${encodeURIComponent(slug)}`;
}

/**
 * Calendar day on the server (UTC, which is Vercel's clock).
 * @param {Date} [now]
 * @returns {string} YYYY-MM-DD
 */
export function serverDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

/**
 * Slugs already shipped in js/data.js. Used so a published article
 * does not reuse a static slug. This only reads the file.
 * @returns {Set<string>}
 */
export function collectStaticSlugs() {
  const slugs = new Set();
  for (const relative of STATIC_SLUG_FILES) {
    try {
      const dataFile = fileURLToPath(new URL(relative, import.meta.url));
      const sourceText = readFileSync(dataFile, "utf8");
      const pattern = /slug:\s*["']([^"']+)["']/g;
      let match = pattern.exec(sourceText);
      while (match) {
        slugs.add(match[1]);
        match = pattern.exec(sourceText);
      }
    } catch (error) {
      console.error("Could not read static slugs", relative, error);
    }
  }
  return slugs;
}

/**
 * English kebab-case slug from a title.
 * Titles without enough Latin letters get a stable post- prefix.
 * @param {string} title
 * @returns {string}
 */
export function slugifyTitle(title) {
  const latin = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72)
    .replace(/-+$/g, "");

  if (latin.length >= 3) return latin;
  return `post-${hashSuffix(title)}`;
}

/**
 * Add a short suffix until the slug is unused.
 * @param {string} base
 * @param {Set<string>} taken
 * @returns {string}
 */
export function uniqueSlug(base, taken) {
  if (!taken.has(base)) return base;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const suffix = Math.random().toString(36).slice(2, 6);
    const candidate = `${base}-${suffix}`;
    if (!taken.has(candidate)) return candidate;
  }

  const fallback = `${base}-${Date.now().toString(36)}`;
  if (!taken.has(fallback)) return fallback;
  return `${fallback}-${hashSuffix(String(Math.random()))}`;
}

/**
 * Validate a publish body. bodyHtml is kept exactly as sent.
 * @param {unknown} body
 * @returns {{ ok: true, value: PublishInput } | { ok: false, error: string }}
 */
export function parsePublishBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object" };
  }

  const record = /** @type {Record<string, unknown>} */ (body);
  const title = textField(record.title);
  const bodyHtml = textField(record.bodyHtml) || textField(record.html) || textField(record.content) || textField(record.body);
  if (!title || !bodyHtml.trim()) {
    return { ok: false, error: "title and bodyHtml are required" };
  }

  const category = textField(record.category);
  const author = textField(record.author);

  return {
    ok: true,
    value: {
      title,
      excerpt: textField(record.excerpt) || textField(record.dek) || textField(record.summary),
      category: category || DEFAULT_CATEGORY,
      image: textField(record.image) || textField(record.cover) || textField(record.coverImage),
      images: normalizeImages(record.images || record.gallery),
      bodyHtml,
      merchantName: typeof record.merchantName === "string" ? record.merchantName.trim() : "",
      merchantUrl: typeof record.merchantUrl === "string" ? record.merchantUrl.trim() : "",
      mid: record.mid == null ? "" : String(record.mid).trim(),
      trackUrl: typeof record.trackUrl === "string" ? record.trackUrl.trim() : "",
      author: author || DEFAULT_AUTHOR
    }
  };
}

/**
 * Build the stored record. Affiliate hrefs inside bodyHtml are not rewritten.
 * merchantUrl is kept as a note and is not the article URL.
 * @param {PublishInput} input
 * @param {string} slug
 * @param {number} id
 * @param {string} date
 * @returns {StoredPost}
 */
export function toStoredPost(input, slug, id, date) {
  const httpsImages = input.images.map(httpUrl).filter(Boolean);
  const image =
    httpUrl(input.image)
    || httpsImages[0]
    || firstHttpsImageFromHtml_(input.bodyHtml)
    || "";
  const excerptText = input.excerpt ? plainText(input.excerpt) : excerptFromHtml(input.bodyHtml);

  return {
    id,
    slug,
    title: input.title,
    category: input.category,
    date,
    readTime: estimateReadTime(input.bodyHtml),
    author: input.author,
    image,
    excerpt: excerptText,
    keywords: keywordsFromTitle(input.title),
    relatedProducts: [],
    bodyHtml: input.bodyHtml,
    images: httpsImages,
    merchantName: input.merchantName,
    merchantUrl: input.merchantUrl,
    mid: input.mid,
    trackUrl: input.trackUrl
  };
}

/**
 * Fields aligned with BLOG_POSTS. Body and merchant notes stay out of the list.
 * @param {StoredPost} post
 * @returns {PublicPost}
 */
export function toPublicPost(post) {
  const image =
    httpUrl(typeof post.image === "string" ? post.image : "")
    || (Array.isArray(post.images) ? post.images.map(httpUrl).find(Boolean) : "")
    || (typeof post.bodyHtml === "string" ? firstHttpsImageFromHtml_(post.bodyHtml) : "")
    || "";
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    image,
    excerpt: post.excerpt || "",
    keywords: Array.isArray(post.keywords) ? post.keywords : [],
    relatedProducts: Array.isArray(post.relatedProducts) ? post.relatedProducts : []
  };
}

/**
 * Rough minutes from plain-text length. Latin words and CJK characters both count.
 * @param {string} html
 * @returns {number}
 */
export function estimateReadTime(html) {
  const text = plainText(html);
  const cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
  const words = text.replace(/[\u3400-\u9fff]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round((words + cjk) / 200));
}

/**
 * @param {string} input
 * @returns {string}
 */
function hashSuffix(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).slice(0, 6);
}

/**
 * @param {unknown} images
 * @returns {string[]}
 */
function textField(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeImages(images) {
  if (typeof images === "string" && images.trim()) return [images.trim()];
  if (!Array.isArray(images)) return [];
  return images
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Keep http(s) cover URLs. Anything else is dropped from the cover field only.
 * @param {string} value
 * @returns {string}
 */
function httpUrl(value) {
  if (typeof value !== "string") return "";
  const url = value.trim();
  if (!/^https?:\/\//i.test(url)) return "";
  if (/[\s"<>]/.test(url)) return "";
  return url;
}

/**
 * 正文里第一张 https 图，用作卡片封面（忽略 data:image，避免列表 JSON 膨胀）。
 * @param {string} html
 * @returns {string}
 */
function firstHttpsImageFromHtml_(html) {
  const match = String(html || "").match(/<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["']/i);
  return match ? match[1] : "";
}

/**
 * @param {string} html
 * @returns {string}
 */
function plainText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} html
 * @returns {string}
 */
function excerptFromHtml(html) {
  const text = plainText(html);
  const max = 180;
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 60 ? cut.slice(0, lastSpace) : cut;
  return `${base.trim()}…`;
}

/**
 * Split a title into a short keyword list.
 * @param {string} title
 * @returns {string[]}
 */
function keywordsFromTitle(title) {
  const parts = title
    .split(/[\s,，。.!！?？:：|/\\–—-]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && !TITLE_STOP_WORDS.has(part.toLowerCase()));

  const unique = [];
  parts.forEach((part) => {
    const key = part.toLowerCase();
    if (!unique.some((item) => item.toLowerCase() === key)) unique.push(part);
  });
  return unique.slice(0, 8);
}

/**
 * @typedef {Object} PublishInput
 * @property {string} title
 * @property {string} excerpt
 * @property {string} category
 * @property {string} image
 * @property {string[]} images
 * @property {string} bodyHtml
 * @property {string} merchantName
 * @property {string} merchantUrl
 * @property {string} mid
 * @property {string} trackUrl
 * @property {string} author
 */

/**
 * @typedef {Object} StoredPost
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} date
 * @property {number} readTime
 * @property {string} author
 * @property {string} image
 * @property {string} excerpt
 * @property {string[]} keywords
 * @property {string[]} relatedProducts
 * @property {string} bodyHtml
 * @property {string[]} images
 * @property {string} merchantName
 * @property {string} merchantUrl
 * @property {string} mid
 * @property {string} trackUrl
 */

/**
 * @typedef {Object} PublicPost
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} date
 * @property {number} readTime
 * @property {string} author
 * @property {string} image
 * @property {string} excerpt
 * @property {string[]} keywords
 * @property {string[]} relatedProducts
 */
