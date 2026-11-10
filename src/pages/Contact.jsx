import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SocialWidget from '../components/SocialWidget';
import { getProductBySlug } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';

const topics = [
  'A note for the desk',
  'Product question',
  'Platform suggestion',
  'Correction',
  'Partnerships',
];

/**
 * Contact page. Valid notes open the reader’s mail app with the message prepared.
 */
export default function Contact() {
  usePageTitle('Contact');
  const [params] = useSearchParams();
  const topicFromUrl = params.get('topic') || '';
  const aboutSlug = params.get('about') || '';
  const aboutProduct = aboutSlug ? getProductBySlug(aboutSlug) : undefined;
  const initialTopic = topics.includes(topicFromUrl) ? topicFromUrl : topics[0];
  const initialMessage = aboutProduct ? `Question about the ${aboutProduct.name}: ` : '';

  const [values, setValues] = useState({
    name: '',
    email: '',
    topic: initialTopic,
    message: initialMessage,
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Beaconio desk: ${values.topic}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
    return `mailto:desk@beaconio.com?subject=${subject}&body=${body}`;
  }, [values]);

  /**
   * Update a single field and clear its error.
   * @param {string} key
   * @param {string} value
   */
  function setField(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  /**
   * Validate, then hand the note to the mail client.
   * @param {import('react').FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'That email does not look complete.';
    }
    if (values.message.trim().length < 12) {
      next.message = 'A little more detail helps us answer.';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <h1>The desk reads mail in the morning.</h1>
          <p className="lede">
            Corrections, platforms we should live with, and objects you think belong on the shelf. The form opens your email app so the note actually leaves this page.
          </p>
        </div>
      </header>
      <div className="wrap contact-grid">
        <div>
          {sent ? (
            <div className="success" role="status">
              <p className="kicker kicker--cream">Ready to send</p>
              <h2>Your mail app should be open.</h2>
              <p>
                If it did not appear, use the email link. The note is addressed to the desk and includes what you wrote.
              </p>
              <a className="btn btn--cream" href={mailto}>
                Open email again
              </a>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                Name
                <input
                  value={values.name}
                  onChange={(event) => setField('name', event.target.value)}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? <small>{errors.name}</small> : null}
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => setField('email', event.target.value)}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>
              <label>
                Topic
                <select
                  value={values.topic}
                  onChange={(event) => setField('topic', event.target.value)}
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label>
                Message
                <textarea
                  rows={7}
                  value={values.message}
                  onChange={(event) => setField('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <small>{errors.message}</small> : null}
              </label>
              <button type="submit" className="btn btn--ink">
                Send via email
              </button>
            </form>
          )}
        </div>
        <aside className="contact-aside">
          <img
            src="/images/about-studio.jpg"
            alt="The studio table where the desk reads morning mail"
          />
          <p className="kicker">Visit</p>
          <h2>Beaconio Desk</h2>
          <p>418 Harbor Lane, Studio 3<br />Portland, Oregon</p>
          <p>
            <a href="mailto:desk@beaconio.com">desk@beaconio.com</a>
          </p>
          <p>Weekday mornings. We answer corrections first.</p>
          <SocialWidget />
        </aside>
      </div>
    </div>
  );
}
