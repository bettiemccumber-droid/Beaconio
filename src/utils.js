/**
 * Format a journal date for display without timezone drift.
 * @param {string} isoDate Date in YYYY-MM-DD.
 * @returns {string}
 */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

/**
 * Format a USD shelf price with no cents.
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Sort records by ISO date, newest first.
 * @template {{ date: string }} T
 * @param {T[]} list
 * @returns {T[]}
 */
export function byNewest(list) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Pick related stories, preferring the same category.
 * @param {object[]} all
 * @param {object} current
 * @param {number} [count]
 * @returns {object[]}
 */
/**
 * Categories worn by a story. Older records may still have a single category.
 * @param {object} article
 * @returns {string[]}
 */
export function articleCategories(article) {
  if (Array.isArray(article.categories) && article.categories.length) return article.categories;
  return article.category ? [article.category] : [];
}

/**
 * Pick related stories, preferring a shared category.
 * @param {object[]} all
 * @param {object} current
 * @param {number} [count]
 * @returns {object[]}
 */
export function relatedArticles(all, current, count = 3) {
  const mine = new Set(articleCategories(current));
  const rest = byNewest(all).filter((item) => item.slug !== current.slug);
  const same = rest.filter((item) => articleCategories(item).some((name) => mine.has(name)));
  const others = rest.filter((item) => !articleCategories(item).some((name) => mine.has(name)));
  return [...same, ...others].slice(0, count);
}

/**
 * Build a lowercase search blob for a story.
 * @param {object} article
 * @returns {string}
 */
/**
 * Flatten a story into text a search box can see.
 * @param {object} article
 * @returns {string}
 */
export function articleHaystack(article) {
  const body = (article.sections || [])
    .map((block) => {
      const runs = (block.runs || []).map((run) => run.text).join(' ');
      const items = (block.items || []).join(' ');
      return [block.text, block.caption, block.title, runs, items].filter(Boolean).join(' ');
    })
    .join(' ');
  return [
    article.title,
    article.standfirst,
    article.excerpt,
    ...articleCategories(article),
    article.author,
    ...(article.tags || []),
    body,
  ]
    .join(' ')
    .toLowerCase();
}
