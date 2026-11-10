import { useEffect, useState } from 'react';
import { Icon } from './Icons';

/**
 * Returns the window to the top after the reader has scrolled.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /**
     * Show the control once the page has moved past the opening screen.
     */
    function onScroll() {
      setVisible(window.scrollY > 480);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="up" />
      <span>Top</span>
    </button>
  );
}
