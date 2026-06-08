'use client';

import { useEffect, useState, useCallback } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { agentConfig } from '@/config/agent.config';

// ─── TypeScript: Extend window with gtag + fbq ──────────────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

// ─── GA4 Measurement ID ──────────────────────────────────────────────────────
// Priority: NEXT_PUBLIC_GA4_ID env var → agentConfig fallback
const GA4_ID =
  process.env.NEXT_PUBLIC_GA4_ID ?? agentConfig.ga4MeasurementId;

// ─── Meta Pixel ID ───────────────────────────────────────────────────────────
// Priority: NEXT_PUBLIC_META_PIXEL_ID env var → agentConfig fallback
const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? agentConfig.metaPixelId;

// ─── Conversion event tracker (call from any form success handler) ───────────
//
// Events used in this project:
//   'form_submit_contact'     — ContactForm
//   'form_submit_valuation'   — ValuationForm
//   'form_submit_showing'     — ShowingForm
//   'form_submit_newsletter'  — NewsletterSignup
//   'listing_view'            — single property page load
//   'phone_click'             — any tel: link click
//   'schedule_click'          — any bookingUrl link click
//
export function trackConversion(eventName: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Track Event: ${eventName}`, data);
  }
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, data ?? {});
}

// ─── Cookie consent helper ───────────────────────────────────────────────────
// react-cookie-consent stores a cookie named "CookieConsent" with value "true" or "false"
function getConsentCookie(): boolean {
  if (typeof document === 'undefined') return false;
  const match = document.cookie.match(/(?:^|;\s*)CookieConsent=([^;]*)/);
  return match?.[1] === 'true';
}

// ─── Meta Pixel base code (inlined) ──────────────────────────────────────────
// Equivalent to the standard fbevents.js bootstrap, injected via next/script
const META_PIXEL_SCRIPT = `
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){
    n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
  };
  if(!f._fbq) f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
  t=b.createElement(e);
  t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  const checkConsent = useCallback(() => {
    setHasConsent(getConsentCookie());
  }, []);

  useEffect(() => {
    // Check on mount (handles returning visitors with existing cookie)
    checkConsent();

    // Listen for live consent changes from CookieBanner
    const handleConsentChange = () => checkConsent();
    window.addEventListener('cookie-consent-updated', handleConsentChange);
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentChange);
    };
  }, [checkConsent]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href.startsWith('tel:')) {
        trackConversion('phone_click', { phone: href.replace('tel:', '') });
      } else if (href === agentConfig.bookingUrl || href.includes('calendly.com')) {
        trackConversion('schedule_click', { url: href });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Skip rendering the scripts in development to avoid polluting real analytics data
  if (process.env.NODE_ENV === 'development') return null;

  // Only render analytics scripts after cookie consent has been granted
  if (!hasConsent) return null;

  return (
    <>
      {/* Part 1 — Google Analytics 4 (official Next.js package) */}
      {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}

      {/* Part 2 — Meta Pixel */}
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: META_PIXEL_SCRIPT }}
        />
      )}
    </>
  );
}
