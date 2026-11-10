import { Link } from 'react-router-dom';
import { articleCategories, formatDate } from '../utils';

/**
 * Editorial story card: photograph, mono label, serif title.
 * @param {{ article: object, featured?: boolean }} props
 */
export default function ArticleCard({ article, featured = false }) {
  return (
    <article className={`story-card${featured ? ' story-card--featured' : ''}`}>
      <Link to={`/blog/${article.slug}`} className="story-card__media">
        <img src={article.image} alt={article.imageAlt} />
      </Link>
      <div className="story-card__body">
        <p className="story-card__meta">
          <span>{articleCategories(article).join(' · ')}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <h3>
          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="story-card__excerpt">{article.excerpt}</p>
        <Link to={`/blog/${article.slug}`} className="text-link">
          View piece
        </Link>
      </div>
    </article>
  );
}
