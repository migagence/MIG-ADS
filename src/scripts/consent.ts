/**
 * Bandeau de consentement : affichage, mémorisation du choix et chargement différé des traceurs.
 * Tant qu’aucun choix n’est enregistré, window.__migLoadTrackers n’est jamais appelé.
 */
import { track } from './analytics';

declare global {
  interface Window {
    __migLoadTrackers?: () => void;
    __migConsentSettled?: boolean;
    __migConsentConfig?: { storageKey: string; maxAgeDays: number };
  }
}

export function initConsent(): void {
  const banner = document.querySelector<HTMLElement>('[data-consent]');
  const config = window.__migConsentConfig;
  if (!banner || !config) return;

  const save = (choice: 'granted' | 'denied') => {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify({ choice, date: Date.now() }));
    } catch {
      /* stockage indisponible : le bandeau réapparaîtra à la prochaine visite */
    }
  };

  const hide = () => {
    banner.hidden = true;
    document.body.classList.remove('has-consent-banner');
  };

  const show = () => {
    banner.hidden = false;
    document.body.classList.add('has-consent-banner');
  };

  banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => {
    save('granted');
    window.__migLoadTrackers?.();
    track('consent_granted');
    hide();
  });

  banner.querySelector('[data-consent-decline]')?.addEventListener('click', () => {
    save('denied');
    track('consent_denied');
    hide();
  });

  /** Lien « Cookies » du pied de page : permet de revenir sur son choix. */
  document.querySelectorAll<HTMLElement>('[data-consent-reopen]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      try { localStorage.removeItem(config.storageKey); } catch { /* noop */ }
      show();
      banner.querySelector<HTMLButtonElement>('[data-consent-decline]')?.focus();
    });
  });

  if (!window.__migConsentSettled) show();
}
