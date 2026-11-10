/**
 * Social and interface glyphs.
 * @param {{ name: string }} props
 */
export function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
  };

  if (name === 'x') {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M14.7 10.4 21.4 2.5h-1.6l-5.8 6.8L9.2 2.5H3l7.1 10.3L3 21.5h1.6l6.2-7.3 5 7.3H21l-6.3-11.1Zm-2.2 2.5-.7-1-5.7-8.1h2.5l4.6 6.6.7 1 6 8.6h-2.5l-4.9-7.1Z"
        />
      </svg>
    );
  }

  if (name === 'instagram') {
    return (
      <svg {...common}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          d="M8 3.8h8A4.2 4.2 0 0 1 20.2 8v8A4.2 4.2 0 0 1 16 20.2H8A4.2 4.2 0 0 1 3.8 16V8A4.2 4.2 0 0 1 8 3.8Z"
        />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.7" cy="7.3" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M6.7 9.4H4.1V20h2.6V9.4ZM5.4 4.2A1.6 1.6 0 1 0 5.4 7.4 1.6 1.6 0 0 0 5.4 4.2ZM20 20h-2.6v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H10.8s.1-9.3 0-10.6h2.6v1.8c.4-.7 1.3-1.9 3.3-1.9 2.4 0 4.3 1.6 4.3 5.1V20Z"
        />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M21.2 7.6a2.7 2.7 0 0 0-1.9-1.9C17.6 5.3 12 5.3 12 5.3s-5.6 0-7.3.4a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2.4 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.4 7.3.4 7.3.4s5.6 0 7.3-.4a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-4.4 28 28 0 0 0-.4-4.4ZM10.4 15.2V8.8L15.6 12l-5.2 3.2Z"
        />
      </svg>
    );
  }

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'up') {
    return (
      <svg {...common}>
        <path
          d="M6 14.5 12 8.5l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
