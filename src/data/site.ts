/**
 * Configuration globale du site.
 * Toutes les URLs, identifiants et chiffres "de marque" sont centralisés ici.
 * Chaque valeur chiffrée est sourcée (voir commentaires) : aucune donnée inventée.
 */

export const site = {
  name: 'MIG',
  legalName: 'migagence',
  url: 'https://www.migecosystem.com',
  title: 'MIG | Croissance e-commerce : CRO, créatives, Ads et rétention pilotés ensemble',
  description:
    'MIG pilote l’ensemble de ton écosystème e-commerce (CRO, créatives, Meta & Google Ads, email et WhatsApp) pour augmenter ton chiffre d’affaires. Réserve un diagnostic gratuit de 30 minutes.',
  locale: 'fr_FR',
  contactEmail: 'contact@migagence.com', // Source : fiche Trustpilot AGENCE MIG
} as const;

export const booking = {
  /** Lien utilisé par les boutons CTA du site actuel (rendez-vous de 30 minutes). */
  calendlyUrl: 'https://calendly.com/d/cqhc-yrt-fft/appel-decouverte-mig',
  /** Lien du widget inline présent sur le site actuel, conservé en secours. */
  calendlyFallbackUrl: 'https://calendly.com/ismaelmig/appeldedecouverte',
  /** Durée confirmée sur la page Calendly : « Ce rendez-vous de 30 minutes ». */
  durationMinutes: 30,
  /** Microcopy sous les CTA, reprise du site actuel (« Dispo en 24h · Gratuit · Sans engagement »). */
  microcopy: 'Dispo sous 24 h · Gratuit · Sans engagement',
} as const;

export const trust = {
  /** Vérifié le 30/09/2026 sur https://fr.trustpilot.com/review/mig-enterprises.com */
  trustpilotUrl: 'https://fr.trustpilot.com/review/mig-enterprises.com',
  rating: '4,7',
  ratingValue: 4.7,
  reviewCount: 56,
  fiveStarShare: '91 %',
  /** Chiffre communiqué par MIG (retour vidéo Tella du 01/10/2026 : « plus de 180 marques accompagnées »). */
  brandsCount: '+180',
  /** Promesse affichée sur la landing page actuelle (« Jusqu’à ×6 sur ton CA en 90 jours »). */
  maxMultiplier: '×6',
} as const;

/**
 * Analytics : tout se pilote par variables d’environnement (Vercel → Settings → Environment Variables).
 * - PUBLIC_META_PIXEL_ID : ID du pixel Meta. Renseigné = pixel chargé. Vide ou absent = rien n’est chargé.
 * - PUBLIC_GTM_ID        : ID Google Tag Manager (facultatif).
 * Le préfixe PUBLIC_ est obligatoire pour qu’Astro expose la variable au navigateur.
 * Un redéploiement est nécessaire après chaque changement de valeur.
 * Pixel de l’ancien site, à titre de référence : 39199030669683909.
 * TODO MIG : prévoir un bandeau de consentement (RGPD) avant d’activer le pixel en production.
 */
export const analytics = {
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID ?? '',
  gtmId: import.meta.env.PUBLIC_GTM_ID ?? '',
} as const;

export const nav = [
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Résultats', href: '#resultats' },
  { label: 'Méthode', href: '#methode' },
] as const;
