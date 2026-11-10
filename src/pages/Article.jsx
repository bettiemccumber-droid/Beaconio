import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody';
import ArticleCard from '../components/ArticleCard';
import SocialLinks from '../components/SocialLinks';
import NotFound from './NotFound';
import { getArticleBySlug, articles } from '../data/articles';
import { getProductBySlug } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { articleCategories, formatDate, formatPrice, relatedArticles } from '../utils';

/**
 * Full story, with a linked product or platform when the piece recommends one.
 */
export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  usePageTitle(article ? article.title : 'Story not found');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [typeSize, setTypeSize] = useState('m');
  const [wide, setWide] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    /**
     * Track reading progress for the slim bar under the masthead.
     */
    function onScroll() {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? (root.scrollTop / max) * 100 : 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const key = 'beaconio-saved';
    const current = JSON.parse(window.localStorage.getItem(key) || '[]');
    setSaved(current.includes(article.slug));
  }, [article]);

  if (!article) return <NotFound />;

  const names = articleCategories(article);
  const contents = article.sections.filter((block) => block.type === 'h2');

  /**
   * Remember a story on this browser.
   */
  function toggleSaved() {
    const key = 'beaconio-saved';
    const current = JSON.parse(window.localStorage.getItem(key) || '[]');
    const next = current.includes(article.slug)
      ? current.filter((item) => item !== article.slug)
      : [...current, article.slug];
    window.localStorage.setItem(key, JSON.stringify(next));
    setSaved(next.includes(article.slug));
  }

  const product = article.productSlug ? getProductBySlug(article.productSlug) : undefined;
  const related = relatedArticles(articles, article);

  /**
   * Copy the story address for a reader who wants to send it on.
   */
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className={`page article-page article-page--${article.layout || 'feature'}${wide ? ' is-wide' : ''}`}>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className="article-hero">
        <img src={article.image} alt={article.imageAlt} />
        <div className="wrap article-hero__panel">
          <p className="story-card__meta">
            <span>
              {names.map((name) => (
                <Link key={name} to={`/blog?category=${encodeURIComponent(name)}`}>
                  {name}
                </Link>
              ))}
            </span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.standfirst}</p>
        </div>
      </header>

      <div className="wrap article-layout">
        <div className={`prose prose--${typeSize}`}>
          <p className="byline">
            <strong>{article.author}</strong>
            <span>{article.role}</span>
            <span>{article.readMinutes} min read</span>
          </p>
          <div className="reader-tools" role="toolbar" aria-label="Reading tools">
            <div className="reader-tools__size" role="group" aria-label="Type size">
              {['s', 'm', 'l'].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={typeSize === size ? 'is-active' : ''}
                  aria-pressed={typeSize === size}
                  onClick={() => setTypeSize(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" aria-pressed={wide} onClick={() => setWide((value) => !value)}>
              {wide ? 'Narrow' : 'Wide'}
            </button>
            <button type="button" aria-pressed={saved} onClick={toggleSaved}>
              {saved ? 'Saved' : 'Save'}
            </button>
            <button type="button" aria-pressed={tocOpen} onClick={() => setTocOpen((value) => !value)}>
              Contents
            </button>
          </div>
          {tocOpen && contents.length ? (
            <nav className="toc" aria-label="In this piece">
              {contents.map((block) => (
                <a key={block.id} href={`#${block.id}`}>
                  {block.text}
                </a>
              ))}
            </nav>
          ) : null}
          <ArticleBody sections={article.sections} />

          {article.verdict ? (
            <aside className="verdict">
              <p className="kicker kicker--cream">Desk verdict</p>
              <p className="verdict__score">{article.verdict.score}</p>
              <p>{article.verdict.summary}</p>
            </aside>
          ) : null}

          <div className="article-end">
            <ul className="tag-row">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/blog?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn--ghost-ink" onClick={copyLink}>
              {copied ? 'Link copied' : 'Copy link'}
            </button>
            <SocialLinks compact />
          </div>
        </div>

        <aside className="article-rail">
          {product ? (
            <Link to={`/products/${product.slug}`} className="rail-card">
              <img src={product.image} alt={product.imageAlt} />
              <p className="kicker">On the shelf</p>
              <h2>{product.name}</h2>
              <p>{product.summary}</p>
              <span>{formatPrice(product.price)}</span>
            </Link>
          ) : null}
          {article.external ? (
            <a
              className="rail-card rail-card--link"
              href={article.external.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="kicker">Platform</p>
              <h2>{article.external.label}</h2>
              <p>Opens the service we actually used for this piece.</p>
              <span>Visit site →</span>
            </a>
          ) : null}
        </aside>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="kicker">Continue</p>
              <h2>More from the desk</h2>
            </div>
          </div>
          <div className="card-grid card-grid--three">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
