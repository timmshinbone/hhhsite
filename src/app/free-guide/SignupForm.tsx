'use client';

import { useState } from 'react';
import styles from './SignupForm.module.css';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done'; downloadUrl: string; repeat: boolean }
  | { status: 'error'; message: string };

export default function SignupForm({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [website, setWebsite] = useState(''); // honeypot

  async function submit() {
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, firstName, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: 'error', message: data.error ?? 'Please try again.' });
        return;
      }
      setState({ status: 'done', downloadUrl: data.downloadUrl, repeat: data.repeat });
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' });
    }
  }

  if (state.status === 'done') {
    return (
      <div className={styles.done}>
        <i className="ph ph-check-circle" style={{ fontSize: 40, color: 'var(--forest)' }} />
        <p className={styles.doneHead}>
          {state.repeat ? 'Welcome back!' : 'Your guide is on its way!'}
        </p>
        <p className={styles.doneSub}>
          {state.repeat
            ? "We found your original link — it still works!"
            : "We've also emailed it to you so you'll always be able to find it."}
        </p>
        <a href={state.downloadUrl} className="btn btn-primary" style={{ marginTop: 8 }}>
          Download now
          <i className="ph ph-download-simple" />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="signup-name" className={styles.label}>First name</label>
          <input
            id="signup-name"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            placeholder="Hana"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="signup-email" className={styles.label}>
            Email <span className={styles.req}>*</span>
          </label>
          <input
            id="signup-email"
            type="email"
            required
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="hana@example.com"
            onKeyDown={(e) => e.key === 'Enter' && email && submit()}
          />
        </div>
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="signup-website">Website</label>
        <input
          id="signup-website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        onClick={submit}
        disabled={state.status === 'sending' || !email}
        className={`btn btn-primary ${styles.submit}`}
      >
        {state.status === 'sending' ? 'Sending…' : 'Get the Free Guide'}
        {state.status !== 'sending' && <i className="ph ph-paper-plane-tilt" />}
      </button>

      {state.status === 'error' && (
        <p role="alert" className={styles.error}>{state.message}</p>
      )}

      <p className="fineprint">
        <i className="ph ph-lock-simple" />
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}
