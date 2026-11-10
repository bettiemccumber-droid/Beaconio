import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

/**
 * Light footer in the same register as the masthead.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <Logo />
          <p className="site-footer__note">Where the desk keeps what stayed.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            <li><Link to="/blog">Journal</Link></li>
            <li><Link to="/products">Shelf</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="kicker">Follow</p>
          <SocialLinks />
        </div>
      </div>
      <div className="wrap site-footer__base">
        <p>© {new Date().getFullYear()} Beaconio</p>
        <p>Recommendations are earned by use, not by placement.</p>
      </div>
    </footer>
  );
}
