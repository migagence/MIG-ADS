/**
 * Réservation : widget Calendly intégré directement dans la page.
 * Le script Calendly (~100 Ko) n’est chargé qu’à l’approche de la section, pour ne pas
 * pénaliser le chargement initial. Les paramètres de campagne sont transmis au widget.
 */
import { track, withAttribution, getAttribution } from './analytics';

type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, string | undefined>;
  }) => void;
};
declare global {
  interface Window { Calendly?: CalendlyApi }
}

const CALENDLY_SRC = 'https://assets.calendly.com/assets/external/widget.js';
let loader: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
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
  const section = document.querySelector<HTMLElement>('[data-booking]');
  const host = section?.querySelector<HTMLElement>('[data-calendly-host]');
  const status = section?.querySelector<HTMLElement>('[data-booking-status]');
  if (!section || !host || !status) return;

  const baseUrl = host.dataset.url as string;
  let mounted = false;

  const setState = (state: string) => { status.dataset.state = state; };

  const mount = () => {
    if (mounted) return;
    mounted = true;
    setState('loading');
    const slowTimer = window.setTimeout(() => {
      if (status.dataset.state === 'loading') setState('slow');
    }, 6000);

    loadCalendlyScript()
      .then(() => {
        window.clearTimeout(slowTimer);
        const a = getAttribution();
        const utmMap: Record<string, string> = {
          utm_source: 'utmSource', utm_medium: 'utmMedium', utm_campaign: 'utmCampaign',
          utm_content: 'utmContent', utm_term: 'utmTerm',
        };
        const utm: Record<string, string> = {};
        for (const [key, calendlyKey] of Object.entries(utmMap)) if (a[key]) utm[calendlyKey] = a[key];

        window.Calendly?.initInlineWidget({
          url: withAttribution(baseUrl),
          parentElement: host,
          ...(Object.keys(utm).length ? { utm } : {}),
        });
        setState('ready');
        track('calendly_loaded');
      })
      .catch(() => {
        window.clearTimeout(slowTimer);
        mounted = false;
        setState('error');
      });
  };

  /* Chargement anticipé : 600 px avant que la section n'entre dans le viewport. */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); mount(); } },
      { rootMargin: '600px 0px' },
    );
    io.observe(section);
  } else {
    mount();
  }

  /* Un CTA mène à la section : on force le chargement sans attendre le scroll. */
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest<HTMLElement>('[data-book]');
    if (!trigger) return;
    mount();
    track('calendly_open', { source: trigger.dataset.track ?? 'unknown' });
  });

  /* Événements renvoyés par l'iframe Calendly. */
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://calendly.com') return;
    const data = e.data as { event?: string } | null;
    if (!data || typeof data.event !== 'string' || !data.event.startsWith('calendly.')) return;
    if (data.event === 'calendly.event_scheduled') track('booking_complete');
    else if (data.event === 'calendly.date_and_time_selected') track('booking_slot_selected');
  });
}
