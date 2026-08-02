'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';

/**
 * Suppresses the site header, announcement bar, and footer on checkout pages
 * so the buyer has a focused, distraction-free experience.
 * Thank-you and all other pages keep the full chrome.
 */
export default function ConditionalSiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCheckout = !!pathname?.includes('/checkout');

  return (
    <>
      {!isCheckout && <AnnouncementBar />}
      {!isCheckout && <Header />}
      {children}
      {!isCheckout && <Footer />}
    </>
  );
}
