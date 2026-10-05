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
 * Analytics. Deux façons de brancher le pixel Meta ou GTM, au choix :
 *
 * 1. EN DUR, ICI (le plus simple si tu n’as pas accès au compte Vercel qui déploie) :
 *    renseigne META_PIXEL_ID ci-dessous, commite et pousse. Le déploiement se fait tout seul.
 *    Un ID de pixel n’est pas un secret : il apparaît de toute façon en clair dans le code
 *    de la page pour tous les visiteurs.
 *
 * 2. PAR VARIABLE D’ENVIRONNEMENT Vercel (prioritaire sur la valeur ci-dessous) :
 *    PUBLIC_META_PIXEL_ID et PUBLIC_GTM_ID. Le préfixe PUBLIC_ est obligatoire.
 *    Un redéploiement est nécessaire après chaque changement de valeur.
 *
 * Laisser vide des deux côtés = aucun script de tracking n’est chargé.
 * ID du pixel présent sur l’ancien site migecosystem.com, pour mémoire : 39199030669683909.
 * TODO MIG : prévoir un bandeau de consentement (RGPD) avant d’activer le pixel.
 */
const META_PIXEL_ID = '';
const GTM_ID = '';

export const analytics = {
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || META_PIXEL_ID,
  gtmId: import.meta.env.PUBLIC_GTM_ID || GTM_ID,
} as const;

export const nav = [
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Résultats', href: '#resultats' },
  { label: 'Méthode', href: '#methode' },
] as const;
