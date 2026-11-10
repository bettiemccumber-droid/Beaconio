import { Link } from 'react-router-dom';

/**
 * Render a mix of plain text and styled links.
 * @param {{ runs?: Array<{ text: string, href?: string, style?: string, external?: boolean }> }} props
 */
export function Runs({ runs = [] }) {
  return runs.map((run, index) => {
    if (!run.href) return <span key={index}>{run.text}</span>;
    const className = `prose-link prose-link--${run.style || 'ink'}`;
    if (run.external || run.href.startsWith('http')) {
      return (
        <a key={index} className={className} href={run.href} target="_blank" rel="noopener noreferrer">
          {run.text}
        </a>
      );
    }
    return (
      <Link key={index} className={className} to={run.href}>
        {run.text}
      </Link>
    );
  });
}

/**
 * Story body: prose, photographs, and the soft shelf notes that sit inside the piece.
 * @param {{ sections: object[] }} props
 */
export default function ArticleBody({ sections }) {
  let seenParagraph = false;

  return sections.map((block, index) => {
    if (block.type === 'h2') {
      return (
        <h2 key={index} id={block.id}>
          {block.text}
        </h2>
      );
    }

    if (block.type === 'quote') {
      return (
        <blockquote key={index} className="pull">
          <p>{block.text}</p>
          {block.cite ? <footer>{block.cite}</footer> : null}
        </blockquote>
      );
    }

    if (block.type === 'ul') {
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    if (block.type === 'figure') {
      return (
        <figure key={index} className={`figure figure--${block.place || 'wide'}`}>
          <img src={block.src} alt={block.alt} />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    }

    if (block.type === 'pair') {
      return (
        <div key={index} className="figure-pair">
          {block.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      );
    }

    if (block.type === 'ad') {
      const className = `soft-ad soft-ad--${block.variant || 'note'}`;
      const action = block.external || block.href?.startsWith('http') ? (
        <a className={`prose-link prose-link--${block.style || 'arrow'}`} href={block.href} target="_blank" rel="noopener noreferrer">
          {block.cta}
        </a>
      ) : (
        <Link className={`prose-link prose-link--${block.style || 'arrow'}`} to={block.href}>
          {block.cta}
        </Link>
      );

      if (block.variant === 'line') {
        return (
          <aside key={index} className={className}>
            <p>
              <span>{block.label}. </span>
              {block.text} {action}
            </p>
          </aside>
        );
      }

      return (
        <aside key={index} className={className}>
          {block.image ? <img src={block.image} alt={block.imageAlt || ''} /> : null}
          <div>
            <p className="kicker">{block.label}</p>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
            {action}
          </div>
        </aside>
      );
    }

    const isFirst = !seenParagraph;
    seenParagraph = true;
    return (
      <p key={index} className={isFirst ? 'drop' : undefined}>
        <Runs runs={block.runs || [{ text: block.text || '' }]} />
      </p>
    );
  });
}
