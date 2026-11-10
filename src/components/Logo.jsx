import { Link } from 'react-router-dom';

/**
 * Wordmark. The whole name returns readers to the landing page.
 */
export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Beaconio, go to the homepage">
      Beaconio
    </Link>
  );
}
