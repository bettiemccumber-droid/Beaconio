/**
 * A plain text run, or a run that becomes a link.
 * @typedef {{ text: string, href?: string, style?: string, external?: boolean }} Run
 */

/**
 * Build a paragraph from strings and link runs.
 * @param {...(string | Run)} parts
 * @returns {{ type: 'p', runs: Run[] }}
 */
export function p(...parts) {
  return {
    type: 'p',
    runs: parts.map((part) => (typeof part === 'string' ? { text: part } : part)),
  };
}

/**
 * A text link with one of several visual treatments.
 * @param {string} text
 * @param {string} href
 * @param {'ink' | 'mark' | 'quiet' | 'serif' | 'arrow'} [style]
 * @returns {Run}
 */
export function link(text, href, style = 'ink') {
  return {
    text,
    href,
    style,
    external: href.startsWith('http'),
  };
}

/**
 * A section heading that can be targeted from the contents list.
 * @param {string} text
 * @param {string} id
 * @returns {{ type: 'h2', text: string, id: string }}
 */
export function h2(text, id) {
  return { type: 'h2', text, id };
}

/**
 * An in-story photograph.
 * @param {string} src
 * @param {string} alt
 * @param {string} caption
 * @param {'wide' | 'left' | 'right'} [place]
 * @returns {object}
 */
export function figure(src, alt, caption, place = 'wide') {
  return { type: 'figure', src, alt, caption, place };
}

/**
 * Two photographs sharing one row.
 * @param {Array<{ src: string, alt: string, caption: string }>} images
 * @returns {object}
 */
export function pair(images) {
  return { type: 'pair', images };
}

/**
 * A soft shelf mention that sits inside the story, not above it.
 * @param {'note' | 'shelf' | 'line' | 'aside'} variant
 * @param {object} fields
 * @returns {object}
 */
export function ad(variant, fields) {
  return { type: 'ad', variant, ...fields };
}
