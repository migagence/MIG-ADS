/**
 * Couche de tracking neutre : pousse dans window.dataLayer (GTM-ready),
 * relaie vers gtag / fbq s’ils existent. Conserve les paramètres de campagne.
 */
export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const;
const STORAGE_KEY = 'mig_attribution';

export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    if (Object.keys(found).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    /* stockage indisponible : on continue sans attribution */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

/** Ajoute les paramètres de campagne conservés à une URL (ex. Calendly). */
export function withAttribution(url: string): string {
  const attribution = getAttribution();
  if (!Object.keys(attribution).length) return url;
  try {
    const u = new URL(url);
    for (const [k, v] of Object.entries(attribution)) u.searchParams.set(k, v);
    return u.toString();
  } catch {
    return url;
  }
}

/** Variantes A/B actives, lues sur <html data-exp-*>. */
export function experimentParams(): TrackParams {
  const out: TrackParams = {};
  for (const attr of Array.from(document.documentElement.attributes)) {
    if (attr.name.startsWith('data-exp-') && attr.name !== 'data-exp-active') out[attr.name.replace('data-', '').replace(/-/g, '_')] = attr.value;
  }
  return out;
}

export function track(event: string, params: TrackParams = {}): void {
  const payload = { event, ...params, ...experimentParams(), ...getAttribution(), page_path: window.location.pathname };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  try { window.gtag?.('event', event, params); } catch { /* noop */ }
  try { window.fbq?.('trackCustom', event, params); } catch { /* noop */ }
  if (import.meta.env.DEV) console.debug('[track]', payload);
}

/** Tout élément portant data-track="nom_evenement" est tracké au clic. */
export function bindTracking(): void {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    track(el.dataset.track as string, { label: el.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) });
  });
}

export function trackExperimentExposure(): void {
  const html = document.documentElement;
  if (html.getAttribute('data-exp-active') !== '1') return;
  track('experiment_exposure', {});
}
