"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";

const GTM_ID = "GTM-T3SWJ2DB";
const CONSENT_COOKIE_NAME = "cookieyes-consent";
const CONSENT_EVENTS = [
  "cookieyes_consent_update",
  "cookieyes_banner_load",
  "cookie_consent_update",
] as const;
const CONSENT_SYNC_INTERVAL_MS = 1000;
const GOOGLE_ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl_", "_gac_"];

type ConsentState = {
  analytics: boolean;
  functional: boolean;
};

declare global {
  interface Window {
    dataLayer?: Object[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string): string | null {
  const encodedName = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(encodedName));

  return cookie ? decodeURIComponent(cookie.slice(encodedName.length)) : null;
}

function hasGrantedCategory(rawConsent: string, category: string): boolean {
  const normalizedConsent = rawConsent.toLowerCase();
  const matcher = new RegExp(
    String.raw`(?:^|,)\s*${category}\s*:\s*yes(?:,|$)`,
    "i"
  );

  return matcher.test(normalizedConsent);
}

function readConsentState(): ConsentState | null {
  const rawConsent = readCookie(CONSENT_COOKIE_NAME);

  if (!rawConsent) {
    return null;
  }

  return {
    analytics: hasGrantedCategory(rawConsent, "analytics"),
    functional: hasGrantedCategory(rawConsent, "functional"),
  };
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

function removeCookie(name: string, domain?: string) {
  const domainPart = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${domainPart}`;
}

function buildDomainVariants(hostname: string): string[] {
  const segments = hostname.split(".").filter(Boolean);
  const domains = new Set<string>([hostname, `.${hostname}`]);

  if (segments.length >= 2) {
    const rootDomain = segments.slice(-2).join(".");
    domains.add(rootDomain);
    domains.add(`.${rootDomain}`);
  }

  return [...domains];
}

function clearGoogleAnalyticsCookies() {
  const matchingCookieNames = document.cookie
    .split(";")
    .map((value) => value.trim().split("=")[0])
    .filter((name) =>
      GOOGLE_ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))
    );

  if (matchingCookieNames.length === 0) {
    return;
  }

  const domainVariants = buildDomainVariants(window.location.hostname);

  for (const name of matchingCookieNames) {
    removeCookie(name);

    for (const domain of domainVariants) {
      removeCookie(name, domain);
    }
  }
}

function applyConsent(consent: ConsentState | null) {
  ensureGtag();

  const analyticsGranted = consent?.analytics ? "granted" : "denied";
  const functionalGranted = consent?.functional ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsGranted,
    functionality_storage: functionalGranted,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });

  if (analyticsGranted === "denied") {
    clearGoogleAnalyticsCookies();
  }
}

export default function ConsentAwareGTM() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const lastConsentRef = useRef<string | null>(null);

  useEffect(() => {
    ensureGtag();

    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      functionality_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500,
    });

    const syncConsent = () => {
      const rawConsent = readCookie(CONSENT_COOKIE_NAME);

      if (rawConsent === lastConsentRef.current) {
        return;
      }

      lastConsentRef.current = rawConsent;

      const consent = readConsentState();
      applyConsent(consent);
      setAnalyticsEnabled(Boolean(consent?.analytics));
    };

    syncConsent();

    const intervalId = window.setInterval(syncConsent, CONSENT_SYNC_INTERVAL_MS);

    for (const eventName of CONSENT_EVENTS) {
      window.addEventListener(eventName, syncConsent);
      document.addEventListener(eventName, syncConsent);
    }

    return () => {
      window.clearInterval(intervalId);

      for (const eventName of CONSENT_EVENTS) {
        window.removeEventListener(eventName, syncConsent);
        document.removeEventListener(eventName, syncConsent);
      }
    };
  }, []);

  return analyticsEnabled ? <GoogleTagManager gtmId={GTM_ID} /> : null;
}
