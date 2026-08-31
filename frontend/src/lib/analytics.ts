"use client";

/**
 * C2 — conversion events for GA4, pushed through the GTM dataLayer that
 * layout.tsx already installs.
 *
 * The audit asks whether conversions are configured. On this site there are
 * exactly two things a visitor can do that count as one: send the contact form,
 * and download the product catalogue. Neither emitted anything before, so GA4
 * had page views and nothing else — no way to measure a campaign.
 *
 * These are dataLayer pushes rather than direct gtag calls so the events can be
 * mapped to GA4 conversions in the GTM UI without another deploy.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  // GTM creates the array itself, but an event can fire before its script has
  // run — a visitor who submits fast, or a blocked CDN. Seeding it here means
  // the event is queued rather than lost.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Fired once the contact form has been accepted by the backend. */
export function trackContactFormSubmit() {
  push({ event: "contact_form_submit", form_name: "b2b_contact" });
}

/** Fired when a visitor requests the product catalogue PDF. */
export function trackCatalogDownload(location: string) {
  push({
    event: "catalog_download",
    file_name: "Evervale-B2B-Catalog.pdf",
    // Which button was used — header, hero or the "why us" section.
    link_location: location,
  });
}
