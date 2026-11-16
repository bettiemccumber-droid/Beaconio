/** Paths read only to avoid reusing a static article slug. */
export const STATIC_SLUG_FILES = [
  "../src/data/articles.js"
];

/**
 * Public path for one published article.
 * @param {string} slug
 * @returns {string}
 */
export function articlePath(slug) {
  return "/blog/" + encodeURIComponent(slug);
}
