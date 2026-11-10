import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import SocialWidget from '../components/SocialWidget';
import { articles, categories } from '../data/articles';
import { usePageTitle } from '../hooks/usePageTitle';
import { articleCategories, articleHaystack, byNewest } from '../utils';

const PAGE_SIZE = 6;

/**
 * Journal index with category filters, search, date sorting, and pagination.
 */
export default function Blog() {
  usePageTitle('Journal');
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const requestedCategory = params.get('category') || 'All';
  const category = categories.some((item) => item.name === requestedCategory)
    ? requestedCategory
    : 'All';
  const sort = params.get('sort') === 'oldest' ? 'oldest' : 'newest';
  const page = Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1);
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = byNewest(articles);
    if (category !== 'All') {
      list = list.filter((article) => articleCategories(article).includes(category));
    }
    if (needle) {
      list = list.filter((article) => articleHaystack(article).includes(needle));
    }
    if (sort === 'oldest') {
      list = [...list].reverse();
    }
    return list;
  }, [query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);

  useEffect(() => {
    if (page <= pageCount) return;
    const next = new URLSearchParams(params);
    if (pageCount <= 1) next.delete('page');
    else next.set('page', String(pageCount));
    setParams(next, { replace: true });
  }, [page, pageCount, params, setParams]);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  /**
   * Write list controls into the query string.
   * @param {Record<string, string>} partial
   * @param {{ resetPage?: boolean }} [options]
   */
  function update(partial, { resetPage = true } = {}) {
    const next = new URLSearchParams(params);
    Object.entries(partial).forEach(([key, value]) => {
      const isDefault = value === '' || value === 'All' || value === 'newest';
      if (isDefault) next.delete(key);
      else next.set(key, value);
    });
    if (resetPage) next.delete('page');
    setParams(next);
  }

  /**
   * Move to a results page and keep the reader at the list.
   * @param {number} nextPage
   */
  function goToPage(nextPage) {
    const next = new URLSearchParams(params);
    if (nextPage <= 1) next.delete('page');
    else next.set('page', String(nextPage));
    setParams(next);
    const list = document.getElementById('journal-list');
    list?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const chips = ['All', ...categories.map((item) => item.name)];

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">The journal</p>
          <h1>Stories, newest first unless you say otherwise.</h1>
          <p className="lede">
            Product reviews, platform picks, buying guides, and field notes filed from February 2025 through February 2026.
          </p>
        </div>
      </header>

      <div className="wrap blog-layout" id="journal-list">
        <div>
          <form
            className="filters"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="search-field">
              <span className="sr-only">Search stories</span>
              <input
                type="search"
                value={query}
                placeholder="Search titles, desks, platforms…"
                onChange={(event) => update({ q: event.target.value })}
              />
            </label>
            <div className="chip-row" role="toolbar" aria-label="Categories">
              {chips.map((name) => {
                const count = articles.filter(
                  (article) => name === 'All' || articleCategories(article).includes(name),
                ).length;
                return (
                  <button
                    key={name}
                    type="button"
                    className={`chip${category === name ? ' is-active' : ''}`}
                    aria-pressed={category === name}
                    onClick={() => update({ category: name })}
                  >
                    {name}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="filter-row">
              <p aria-live="polite">
                {filtered.length === 0
                  ? 'No stories'
                  : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}`}
              </p>
              <div className="filter-actions">
                <div className="sort-switch" role="group" aria-label="Sort by date">
                  <button
                    type="button"
                    className={sort === 'newest' ? 'is-active' : ''}
                    aria-pressed={sort === 'newest'}
                    onClick={() => update({ sort: 'newest' })}
                  >
                    Newest
                  </button>
                  <button
                    type="button"
                    className={sort === 'oldest' ? 'is-active' : ''}
                    aria-pressed={sort === 'oldest'}
                    onClick={() => update({ sort: 'oldest' })}
                  >
                    Oldest
                  </button>
                </div>
                <div className="sort-switch" role="group" aria-label="Layout">
                  <button
                    type="button"
                    className={view === 'grid' ? 'is-active' : ''}
                    aria-pressed={view === 'grid'}
                    onClick={() => setView('grid')}
                  >
                    Grid
                  </button>
                  <button
                    type="button"
                    className={view === 'list' ? 'is-active' : ''}
                    aria-pressed={view === 'list'}
                    onClick={() => setView('list')}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </form>

          {visible.length === 0 ? (
            <div className="empty">
              <h2>Nothing on the desk matches that search.</h2>
              <p>Try a product, a platform, or clear the filters.</p>
              <button
                type="button"
                className="btn btn--ink"
                onClick={() => update({ q: '', category: 'All', sort: 'newest' })}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={view === 'list' ? 'piece-list' : 'card-grid'}>
              {visible.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {filtered.length > PAGE_SIZE ? (
            <nav className="pager" aria-label="Pagination">
              <button type="button" disabled={safePage <= 1} onClick={() => goToPage(safePage - 1)}>
                Previous
              </button>
              <ol>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <li key={number}>
                    <button
                      type="button"
                      className={number === safePage ? 'is-active' : ''}
                      aria-current={number === safePage ? 'page' : undefined}
                      onClick={() => goToPage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                disabled={safePage >= pageCount}
                onClick={() => goToPage(safePage + 1)}
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
        <SocialWidget />
      </div>
    </div>
  );
}
