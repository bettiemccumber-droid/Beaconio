import { Link } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { products } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { articleCategories, byNewest, formatPrice } from '../utils';

const collage = [
  { src: '/images/article-lamp.jpg', alt: 'A brass task lamp over a sheet of paper' },
  { src: '/images/article-headphones.jpg', alt: 'Charcoal headphones on an oak desk' },
  { src: '/images/article-carafe.jpg', alt: 'A speckled ceramic carafe in morning light' },
  { src: '/images/article-backpack.jpg', alt: 'An olive canvas pack on a train seat' },
];

/**
 * Landing page composed like an editorial issue: headline, collage, current pieces, studio.
 */
export default function Home() {
  usePageTitle();
  const stories = byNewest(articles);
  const lead = stories[0];
  const pieces = stories.slice(1, 4);
  const notes = stories
    .map((article) => {
      const quote = article.sections.find((block) => block.type === 'quote');
      return quote ? { text: quote.text, title: article.title, slug: article.slug } : null;
    })
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <section className="hero-edit" aria-label="Introduction">
        <div className="hero-edit__copy">
          <p className="kicker">2026 · Desk notes no. I</p>
          <h1>
            <span>Clear</span>
            <span>Signal</span>
          </h1>
          <p className="hero-edit__caption">
            <i aria-hidden="true" />
            the things we kept
          </p>
          <Link to="/blog" className="text-link">
            Enter the journal
          </Link>
        </div>
        <div className="hero-edit__collage" aria-hidden="true">
          {collage.map((shot) => (
            <img key={shot.src} src={shot.src} alt="" />
          ))}
        </div>
      </section>

      <section className="season" id="latest" aria-label="Current issue">
        <div className="season__index">
          <p className="kicker">Journal</p>
          <span className="season__rule" aria-hidden="true" />
          <p className="kicker">Current issue</p>
        </div>
        <div className="season__stage">
          <p className="season__spine">Journal</p>
          <Link to={`/blog/${lead.slug}`} className="season__frame">
            <img src={lead.image} alt={lead.imageAlt} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="kicker">Newest first</p>
            <Link to="/blog" className="text-link">
              View all pieces
            </Link>
          </div>
          <div className="piece-list">
            {pieces.map((article) => (
              <article key={article.slug} className="piece">
                <Link to={`/blog/${article.slug}`} className="piece__media">
                  <img src={article.image} alt={article.imageAlt} />
                </Link>
                <div>
                  <p className="mono">{articleCategories(article).join(' · ')}</p>
                  <h2>
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p>{article.excerpt}</p>
                  <Link to={`/blog/${article.slug}`} className="text-link">
                    View piece
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="film">
        <img src="/images/article-beacon.jpg" alt="" />
        <div className="wrap film__copy">
          <p className="mono">2026 · Vol. I</p>
          <h2>
            Quiet
            <br />
            things
          </h2>
          <p>A journal of objects and platforms that survived a real month on the desk.</p>
          <Link to="/products" className="text-link text-link--light">
            Enter the shelf
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="kicker">The shelf</p>
            <Link to="/products" className="text-link">
              View all pieces
            </Link>
          </div>
          <div className="card-grid card-grid--three">
            {products.slice(0, 3).map((product) => (
              <article key={product.slug} className="product-card">
                <Link to={`/products/${product.slug}`} className="product-card__media">
                  <img src={product.image} alt={product.imageAlt} />
                </Link>
                <div className="product-card__body">
                  <p className="mono">
                    {product.category} · {formatPrice(product.price)}
                  </p>
                  <h3>
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p>{product.summary}</p>
                  <Link to={`/products/${product.slug}`} className="text-link">
                    View piece
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap letter">
          <img
            src="/images/about-studio.jpg"
            alt="Afternoon light across the Beaconio studio table"
          />
          <div className="letter__copy">
            <p className="kicker">Est. 2025 · The desk</p>
            <h2>
              The
              <br />
              Studio
            </h2>
            <p className="letter__lead">Our philosophy</p>
            <p>
              We write down what we do not want to decide again. If an object goes back in the box, it does not get a kind paragraph.
            </p>
            <Link to="/about" className="text-link">
              The atelier
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-label="From the journal">
        <div className="wrap">
          <p className="kicker">The record</p>
          <div className="notes">
            {notes.map((note) => (
              <blockquote key={note.slug}>
                <p>{note.text}</p>
                <footer>
                  <Link to={`/blog/${note.slug}`}>{note.title}</Link>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="index-row">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/blog?category=${encodeURIComponent(category.name)}`}
              >
                <span>{category.name}</span>
                <small>{category.line}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
