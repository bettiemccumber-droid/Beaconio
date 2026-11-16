import { applyApiHeaders, isPublishAuthorized, sendJson } from "../../lib/http.js";
import { getPublishedBody, removePublishedPost, StorageError } from "../../lib/posts-store.js";

/**
 * GET https://www.ajiusblogs.top/api/posts/:slug
 * Returns { bodyHtml } for one API-published article. No PUBLISH_TOKEN.
 * Static articles stay in js/articles-content.js and are not served here.
 *
 * DELETE https://www.ajiusblogs.top/api/posts/:slug
 * Authorization: Bearer <PUBLISH_TOKEN>
 * Removes one API-published article. Static posts are left untouched.
 *
 * @param {import("http").IncomingMessage & { query?: { slug?: string|string[] } }} req
 * @param {import("http").ServerResponse} res
 */
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    applyApiHeaders(res);
    res.status(204).end();
    return;
  }

  if (req.method === "DELETE") {
    if (!isPublishAuthorized(req)) {
      sendJson(res, 401, { error: "Unauthorized" });
      return;
    }
    if (!slugFromQuery(req)) {
      sendJson(res, 404, { error: "Article not found" });
      return;
    }
    try {
      await removePublishedPost(slugFromQuery(req));
      sendJson(res, 200, { ok: true });
    } catch (error) {
      console.error("Could not delete article", error);
      if (error instanceof StorageError) {
        sendJson(res, 503, { error: "Blob storage is not configured" });
        return;
      }
      sendJson(res, 500, { error: deleteErrorText(error) });
    }
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const slug = slugFromQuery(req);
  if (!slug) {
    sendJson(res, 404, { error: "Article not found" });
    return;
  }

  try {
    const bodyHtml = await getPublishedBody(slug);
    if (bodyHtml == null) {
      sendJson(res, 404, { error: "Article not found" });
      return;
    }
    sendJson(res, 200, { bodyHtml });
  } catch (error) {
    console.error("Could not read article body", error);
    if (error instanceof StorageError) {
      sendJson(res, 503, { error: "Blob storage is not configured" });
      return;
    }
    sendJson(res, 500, { error: "Could not read the article" });
  }
}

/**
 * @param {import("http").IncomingMessage & { query?: { slug?: string|string[] } }} req
 * @returns {string}
 */
function slugFromQuery(req) {
  const raw = req.query?.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  return typeof slug === "string" ? slug.trim() : "";
}

/**
 * 把存储错误收成一句能看的话，不带密钥。
 * @param {unknown} error
 * @returns {string}
 */
function deleteErrorText(error) {
  const message = error instanceof Error ? error.message : "Could not delete the article";
  return message.replace(/Bearer\s+\S+/gi, "Bearer").slice(0, 180) || "Could not delete the article";
}
