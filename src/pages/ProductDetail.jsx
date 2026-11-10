import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { articles } from '../data/articles';
import { getProductBySlug } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatDate, formatPrice } from '../utils';

/**
 * Product portrait: image, description, specs, and the review that put it here.
 */
export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  usePageTitle(product ? product.name : 'Object not found');
  const review = articles.find((article) => article.productSlug === slug);
  const gallery = [product?.image, review?.image].filter(Boolean);
  const alts = [product?.imageAlt, review?.imageAlt].filter(Boolean);
  const [active, setActive] = useState(0);

  if (!product) return <NotFound />;

  return (
    <div className="page">
      <div className="wrap product-detail">
        <div className="product-detail__gallery">
          <img src={gallery[active]} alt={alts[active] || product.imageAlt} />
          {gallery.length > 1 ? (
            <div className="thumbs">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={index === active ? 'is-active' : ''}
                  onClick={() => setActive(index)}
                  aria-label={index === 0 ? 'Studio photograph' : 'In use'}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="product-detail__copy">
          <p className="kicker">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p className="lede">{product.summary}</p>
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <div className="fit-grid">
            <p>
              <strong>Best for.</strong> {product.bestFor}
            </p>
            <p>
              <strong>Leave it.</strong> {product.skipIf}
            </p>
          </div>
          <p className="verdict-line">{product.verdict}</p>
          <div className="hero__actions">
            {review ? (
              <Link to={`/blog/${review.slug}`} className="btn btn--ink">
                Read the {formatDate(review.date)} review
              </Link>
            ) : null}
            <Link
              to={`/contact?topic=${encodeURIComponent('Product question')}&about=${product.slug}`}
              className="btn btn--ghost-ink"
            >
              Ask the desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
