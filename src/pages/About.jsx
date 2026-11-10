import { Link } from 'react-router-dom';
import SocialWidget from '../components/SocialWidget';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * About the desk: origin, coverage, and how a piece earns its place.
 */
export default function About() {
  usePageTitle('About');

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">About</p>
          <h1>A small desk with a fixed light.</h1>
          <p className="lede">
            Beaconio is an independent English-language journal. We recommend products and platforms only after they have survived a working month.
          </p>
        </div>
      </header>
      <div className="wrap about-grid">
        <img
          src="/images/about-studio.jpg"
          alt="Afternoon light across the Beaconio studio table"
        />
        <div className="prose">
          <h2>Where the name comes from</h2>
          <p>
            A beacon stays put. That felt like the right ambition for a recommendations site: not a feed that chases the week, but a light you can come back to when a desk, a bag, or a piece of software needs choosing. We opened the journal in February 2025.
          </p>
          <h2>What we cover</h2>
          <p>
            Objects you live beside. Platforms that hold a real week of work. Guides for decisions that do not need another twenty tabs. The shelf is short. The archive is dated so you can see what we believed, and when.
          </p>
          <h2>How a piece gets filed</h2>
          <ul>
            <li>We buy, borrow, or already own the object. Loaners go back if they do not earn the hook.</li>
            <li>Platform picks name the job the software did for this staff, and the reader who should skip it.</li>
            <li>We do not sell placement. A kind sentence is not for sale, and the first line would say so if that ever changed.</li>
          </ul>
          <p>
            The masthead is Mara Ellison, Jonah Hale, Priya Raman, and Elise Cho. Four bylines, one desk, no anonymous enthusiasm.
          </p>
          <Link to="/contact" className="btn btn--ink">
            Write to the desk
          </Link>
        </div>
      </div>
      <div className="wrap section">
        <SocialWidget />
      </div>
    </div>
  );
}
