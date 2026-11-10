import { useEffect } from 'react';

/**
 * Keep the browser tab in step with the current page.
 * @param {string} [title] Page-specific title. The brand is appended.
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · Beaconio`
      : 'Beaconio — A journal of products and platforms';
  }, [title]);
}
