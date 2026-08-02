'use client';

import { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import styles from './checkout.module.css';

// Module-scope: loadStripe must run exactly once per page load, not once per render.
// PLACEHOLDER — NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must be set in your .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm({ slug }: { slug: string }) {
  const [error, setError] = useState<string | null>(null);

  /**
   * The EmbeddedCheckoutProvider calls this on mount to get the client secret.
   * If it throws, the provider renders nothing — so we catch here and show
   * a human-readable message instead of a blank box.
   */
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });

    if (!res.ok) {
      setError('We could not open checkout. Please refresh and try again.');
      throw new Error(`checkout init failed: ${res.status}`);
    }

    const { clientSecret } = (await res.json()) as { clientSecret: string };
    return clientSecret;
  }, [slug]);

  if (error) {
    return (
      <div className={styles.stripeError} role="alert">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return (
    <div className={styles.stripeEmbed}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
