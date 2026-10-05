/**
 * Modal de réservation : Calendly chargé uniquement à l’ouverture,
 * UTM transmis, tracking calendly_open / booking_complete.
 */
import { track, withAttribution, getAttribution } from './analytics';

type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: Record<string, unknown>; utm?: Record<string, string | undefined> }) => void;
};
declare global {
  interface Window { Calendly?: CalendlyApi }
}

const CALENDLY_SRC = 'https://assets.calendly.com/assets/external/widget.js';
let loader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CALENDLY_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { loader = null; reject(new Error('Calendly indisponible')); };
    document.head.appendChild(script);
  });
  return loader;
}

export function initBooking(): void {
  const dialog = document.getElementById('booking') as HTMLDialogElement | null;
  if (!dialog) return;
  const host = dialog.querySelector<HTMLElement>('[data-calendly-host]');
  const status = dialog.querySelector<HTMLElement>('[data-booking-status]');
  const fallback = dialog.querySelector<HTMLAnchorElement>('[data-booking-fallback]');
  if (!host || !status || !fallback) return;
  const baseUrl = host.dataset.url as string;
  let initialized = false;
  let lastTrigger: HTMLElement | null = null;

  const setState = (state: string) => { status.dataset.state = state; };

  const mountCalendly = () => {
    if (initialized) return;
    initialized = true;
    setState('loading');
    const slowTimer = window.setTimeout(() => { if (status.dataset.state === 'loading') setState('slow'); }, 6000);
    loadCalendly()
      .then(() => {
        window.clearTimeout(slowTimer);
        const a = getAttribution();
        const utmMap: Record<string, string> = { utm_source: 'utmSource', utm_medium: 'utmMedium', utm_campaign: 'utmCampaign', utm_content: 'utmContent', utm_term: 'utmTerm' };
        const utm: Record<string, string> = {};
        for (const [key, calendlyKey] of Object.entries(utmMap)) if (a[key]) utm[calendlyKey] = a[key];
        window.Calendly?.initInlineWidget({
          url: withAttribution(baseUrl),
          parentElement: host,
          ...(Object.keys(utm).length ? { utm } : {}),
        });
        setState('ready');
      })
      .catch(() => {
        window.clearTimeout(slowTimer);
        initialized = false;
        setState('error');
      });
  };

  const open = (trigger: HTMLElement | null) => {
    lastTrigger = trigger;
    fallback.href = withAttribution(baseUrl);
    if (typeof dialog.showModal !== 'function') {
      window.open(fallback.href, '_blank', 'noopener');
      return;
    }
    dialog.showModal();
    document.documentElement.classList.add('modal-open');
    track('calendly_open', { source: trigger?.dataset.track ?? 'unknown' });
    mountCalendly();
  };

  const close = () => { if (dialog.open) dialog.close(); };

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    lastTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  dialog.querySelector('[data-booking-close]')?.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest<HTMLElement>('[data-book]');
    if (!trigger) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // laisser le lien s’ouvrir dans un onglet
    e.preventDefault();
    open(trigger);
  });

  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://calendly.com') return;
    const data = e.data as { event?: string } | null;
    if (!data || typeof data.event !== 'string' || !data.event.startsWith('calendly.')) return;
    if (data.event === 'calendly.event_scheduled') {
      track('booking_complete', { source: lastTrigger?.dataset.track ?? 'unknown' });
    } else if (data.event === 'calendly.date_and_time_selected') {
      track('booking_slot_selected');
    }
  });
}
