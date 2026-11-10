import { socialLinks } from '../data/social';

/**
 * Text links to Beaconio profiles. Each address opens in a new tab.
 */
export default function SocialLinks() {
  return (
    <ul className="social-links">
      {socialLinks.map((item) => (
        <li key={item.name}>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
