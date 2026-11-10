import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { productCategories, products } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatPrice } from '../utils';

/**
 * The shelf: every object Beaconio is willing to picture and describe.
 */
export default function Products() {
  usePageTitle('The shelf');
  const [category, setCategory] = useState('All');
  const chips = ['All', ...productCategories];

  const visible = useMemo(
    () => products.filter((product) => category === 'All' || product.category === category),
    [category],
  );

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">The shelf</p>
          <h1>Six objects with a picture and a reason.</h1>
          <p className="lede">
            Prices are what we paid or were quoted at review. This is not a shop. If an object is here, a story explains why it stayed.
          </p>
        </div>
      </header>
      <div className="wrap section">
        <div className="chip-row" role="toolbar" aria-label="Product categories">
          {chips.map((name) => (
            <button
              key={name}
              type="button"
              className={`chip${category === name ? ' is-active' : ''}`}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="card-grid card-grid--three">
          {visible.map((product) => (
            <article key={product.slug} className="product-card">
              <Link to={`/products/${product.slug}`} className="product-card__media">
                <img src={product.image} alt={product.imageAlt} />
              </Link>
              <div className="product-card__body">
                <p className="story-card__meta">
                  <span>{product.category}</span>
                  <span>{formatPrice(product.price)}</span>
                </p>
                <h3>
                  <Link to={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p>{product.summary}</p>
                <Link to={`/products/${product.slug}`} className="text-link">
                  View the object
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
