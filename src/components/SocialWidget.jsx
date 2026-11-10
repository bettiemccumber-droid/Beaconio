import SocialLinks from './SocialLinks';

/**
 * A short follow block used beside the journal and on the contact page.
 */
export default function SocialWidget() {
  return (
    <aside className="social-widget" aria-label="Beaconio on social networks">
      <p className="kicker">Follow</p>
      <p>Desk notes, posted where you already read.</p>
      <SocialLinks />
    </aside>
  );
}
