import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Missing route, with a way back to the landing page.
 */
export default function NotFound() {
  usePageTitle('Not found');

  return (
    <div className="page">
      <div className="wrap empty empty--page">
        <p className="kicker">404</p>
        <h1>That page is not on the desk.</h1>
        <p>The story may have moved, or the address lost a letter.</p>
        <Link to="/" className="btn btn--ink">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
