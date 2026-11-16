import { timingSafeEqual } from "node:crypto";

/**
 * CORS and cache headers for /api/posts.
 * GET is public. POST still requires PUBLISH_TOKEN.
 * @param {import("http").ServerResponse} res
 */
export function applyApiHeaders(res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
}

/**
 * Send a JSON response. Pass null to send an empty 204.
 * @param {import("http").ServerResponse} res
 * @param {number} status
 * @param {unknown} payload
 */
export function sendJson(res, status, payload) {
  applyApiHeaders(res);
  if (status === 204) {
    res.status(204).end();
    return;
  }
  res.status(status).json(payload);
}

/**
 * Accept only Authorization: Bearer <PUBLISH_TOKEN>.
 * A missing or empty PUBLISH_TOKEN rejects every publish.
 * @param {import("http").IncomingMessage} req
 * @returns {boolean}
 */
export function isPublishAuthorized(req) {
  const token = (process.env.PUBLISH_TOKEN || "").trim();
  if (!token) return false;

  const header = String(req.headers.authorization || "");
  const expected = `Bearer ${token}`;
  const actualBuf = Buffer.from(header);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(actualBuf, expectedBuf);
}

/**
 * Read the JSON body Vercel already parsed, or parse a raw string.
 * @param {import("http").IncomingMessage & { body?: unknown }} req
 * @returns {unknown}
 */
export function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  return null;
}
