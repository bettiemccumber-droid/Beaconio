import { applyApiHeaders, isPublishAuthorized, readJsonBody, sendJson } from "../../lib/http.js";
import {
  parsePublishBody,
  serverDate,
  slugifyTitle,
  toPublicPost,
  toStoredPost,
  uniqueSlug
} from "../../lib/post-record.js";
import { articlePath } from "../../lib/site-config.js";
import { appendPublishedPost, listPublishedPosts, StorageError } from "../../lib/posts-store.js";

/**
 * Same publish contract as AJiusBlog.
 * POST /api/posts with Authorization: Bearer <PUBLISH_TOKEN>
 * GET /api/posts is public.
 *
 * @param {import("http").IncomingMessage & { body?: unknown }} req
 * @param {import("http").ServerResponse} res
 */
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyApiHeaders(res);
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const posts = await listPublishedPosts();
      sendJson(res, 200, posts.map((post) => toPublicPost(/** @type {import("../../lib/post-record.js").StoredPost} */ (post))));
    } catch (error) {
      sendStorageError(res, error, "Could not read published articles");
    }
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!isPublishAuthorized(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  let payload;
  try {
    payload = readJsonBody(req);
  } catch {
    sendJson(res, 400, { error: "Request body must be JSON" });
    return;
  }

  const parsed = parsePublishBody(payload);
  if (!parsed.ok) {
    sendJson(res, 400, { error: parsed.error });
    return;
  }

  try {
    const saved = await appendPublishedPost((taken) => {
      const slug = uniqueSlug(slugifyTitle(parsed.value.title), taken);
      return toStoredPost(parsed.value, slug, Date.now(), serverDate());
    });
    const slug = String(saved.slug);
    sendJson(res, 200, { slug, url: `${requestOrigin(req)}${articlePath(slug)}` });
  } catch (error) {
    sendStorageError(res, error, "Could not save the article");
  }
}

/**
 * Prefer SITE_ORIGIN. Otherwise use the host that received this request.
 * @param {import("http").IncomingMessage} req
 * @returns {string}
 */
function requestOrigin(req) {
  const configured = (process.env.SITE_ORIGIN || "").trim().replace(/\/$/, "");
  if (configured) return configured;
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  const proto = String(req.headers["x-forwarded-proto"] || "https").split(",")[0].trim() || "https";
  return host ? `${proto}://${host}` : "";
}

/**
 * @param {import("http").ServerResponse} res
 * @param {unknown} error
 * @param {string} fallback
 */
function sendStorageError(res, error, fallback) {
  console.error(fallback, error);
  if (error instanceof StorageError) {
    sendJson(res, 503, { error: "Blob storage is not configured" });
    return;
  }
  const detail = error instanceof Error ? error.message : "";
  const safe = detail
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/token[=:]\s*\S+/gi, "token=[redacted]")
    .slice(0, 180);
  sendJson(res, 500, { error: safe ? `${fallback}: ${safe}` : fallback });
}
