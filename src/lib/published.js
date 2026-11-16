/**
 * Articles saved by the platform through POST /api/posts.
 * A failed request leaves the built-in stories in place.
 */

export async function fetchPublishedList() {
  try {
    const response = await fetch('/api/posts', { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/**
 * @param {string} slug
 * @returns {Promise<(object & { bodyHtml: string }) | null>}
 */
export async function fetchPublishedArticle(slug) {
  const list = await fetchPublishedList();
  const meta = list.find((item) => item && item.slug === slug);
  if (!meta) return null;
  try {
    const response = await fetch(`/api/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const body = await response.json();
    return { ...meta, bodyHtml: typeof body?.bodyHtml === 'string' ? body.bodyHtml : '' };
  } catch {
    return null;
  }
}
