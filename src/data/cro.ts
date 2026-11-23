/**
 * Contenu de la SECONDE landing page : /cro (« LP CRO MIG »).
 *
 * Cette page tourne en parallèle de la page d’accueil, qui n’est pas modifiée.
 * Elle reprend les mêmes composants, mais tout son texte vient de ce fichier.
 * Source : PDF « LP CRO MIG — page annotée » fourni par MIG (annotations 1 à 39).
 *
 * Règle de crédibilité inchangée : aucun chiffre inventé. Les chiffres repris ici
 * proviennent soit des données déjà vérifiées (caseStudies.ts, site.ts), soit du
 * brief annoté de MIG (signalés par « Source : brief CRO »).
 */
import type { CaseStudy } from './caseStudies';
import type { MethodStep } from './method';
import type { Faq } from './faq';
import type { DiagnosticStep } from './diagnostic';
import type { VideoTestimonial } from './videoTestimonials';
import { videoTestimonials } from './videoTestimonials';

import siho from '../assets/logos/clients/siho.png';
import cosmeticHairShop from '../assets/logos/clients/cosmetic-hair-shop.png';
import joiaLogo from '../assets/logos/clients/joia-paris.png';
import sihoAvant from '../assets/proof/cases/siho-shopify-avant.webp';
import sihoApres from '../assets/proof/cases/siho-shopify-mai-2025.webp';
import chsAvant from '../assets/proof/cases/chs-shopify-fevrier-2025.webp';
import chsApres from '../assets/proof/cases/chs-shopify-juillet-2025.webp';
import joiaJanvier from '../assets/proof/cases/joia-shopify-janvier-2025.webp';
import shopifyConversion from '../assets/proof/shopify-conversion.webp';

/** Métadonnées SEO propres à la page. */
export const croMeta = {
  path: '/cro',
  title: 'MIG | Diagnostic CRO e-commerce : vends plus sans dépenser plus en pub',
  description:
    'Fiches produits, tunnel d’achat, vitesse, upsell : MIG optimise ton site e-commerce pour transformer le trafic que tu as déjà en ventes. Diagnostic CRO gratuit de 30 minutes.',
  /**
   * La page vit en parallèle de l’accueil et vise le même mot-clé : elle est en
   * noindex pour éviter la concurrence entre les deux pages (contenu proche).
   * Passer à `false` si MIG veut la référencer (prévoir alors des textes distincts).
   */
  noindex: true,
  /** Transmis à Calendly en utm_content : permet de compter les RDV venus de cette page. */
  bookingTag: 'lp-cro',
} as const;

/* ------------------------------------------------------------------ 1 · Hero */

export const croHero = {
  /** Annotation 2 : « Agence CRO e-commerce · +180 marques accompagnées ». */
  pill: 'Agence CRO e-commerce',
  /** Annotation 3 : accroche validée par MIG. */
  title: 'Vends plus sans dépenser un euro de plus en pub.',
  /** Annotation 4. */
  lead: '98 visiteurs sur 100 repartent sans acheter. On s’occupe des 98 : fiches produits, tunnel d’achat, réassurance, vitesse.',
  /** Version courte affichée sur mobile (annotation 4). */
  leadShort: '98 visiteurs sur 100 repartent sans acheter. On s’occupe des 98.',
  /** Annotation 6. */
  ctaLabel: 'Réserver mon diagnostic CRO gratuit',
  ctaSub: 'Trouver où mon site perd des ventes',
  /**
   * Annotation 7 : le badge pointe désormais sur le cas Siho.
   * Le brief écrit « 4K€ → 35K€ » mais la carte Siho (chiffres corrigés par MIG
   * le 05/10/2026) part de 5K€ : on garde 5K€ pour rester cohérent avec la carte.
   */
  chip: {
    href: '#case-siho',
    before: '5K€',
    after: '35K€',
    unit: '/mois',
    label: 'compléments bio · Siho',
  },
} as const;

export type HeroKpi = {
  value: string;
  label: string;
  count?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  stars?: boolean;
};

/** Annotation 8 : seul le chiffre du milieu change. */
export const croHeroKpis: HeroKpi[] = [
  { value: '+180', label: 'marques e-commerce accompagnées', count: 180, prefix: '+' },
  // Source : brief CRO MIG (remplace « ×6 de CA sur certains cas »).
  { value: '120', label: 'missions CRO réalisées', count: 120 },
  { value: '4,7/5', label: 'sur Trustpilot', count: 4.7, decimals: 1, suffix: '/5', stars: true },
];

/**
 * Annotation 5 : nouvelle VSL « Pourquoi ton site ne convertit pas » à fournir par Ismael.
 * En attendant, la vidéo et le titre actuels sont conservés (valeur `undefined` =
 * on garde methodVideo). Pour brancher la nouvelle vidéo : renseigner l’ID Wistia ici.
 */
export const croVideo: { wistiaId: string; title: string; duration: string } | undefined = undefined;

/* ------------------------------------------------- 2 · Témoignages vidéo */

/**
 * Annotation 9 : Ambre → Leo → Julien. Ambre est la seule à parler des ventes
 * qui arrivent après la reprise du site ; Leo et Julien parlent d’Ads.
 * TODO MIG : tourner 1 ou 2 témoignages orientés site (pistes : Jean-Christophe
 * de Siho, Johanna de Joia Paris) pour remplacer Leo et Julien sur cette page.
 */
const byId = (id: string): VideoTestimonial => {
  const found = videoTestimonials.find((t) => t.id === id);
  if (!found) throw new Error(`Témoignage vidéo introuvable : ${id}`);
  return found;
};

export const croVideoTestimonials: VideoTestimonial[] = [
  byId('ambre-lunae-paris'),
  byId('leo-eziclic'),
  byId('julien-dalicences'),
];

/* ---------------------------------------------------- 3 · Études de cas */

export const croCasesHeading = {
  /** Annotation 10. */
  title: 'Avant et après<br />l’optimisation de leur site.',
  /** Annotation 11. */
  lead: 'Un plan d’action CRO adapté à chaque niche.',
  /** Annotation 16. */
  ctaLabel: 'Obtenir mon diagnostic CRO gratuit',
} as const;

/**
 * Annotations 12 à 15 : Siho passe en 1re position, textes recentrés sur le site,
 * levier « site » mis en avant, Attar Studio retiré (aucun travail sur le site).
 * Captures et avis vérifiés : inchangés.
 */
export const croCaseStudies: CaseStudy[] = [
  {
    id: 'siho',
    brand: 'Siho',
    logo: siho,
    logoHeight: 32,
    niche: 'Compléments bio',
    before: '5K€',
    after: '35K€',
    unit: '/mois',
    beforeValue: 5,
    afterValue: 35,
    highlight: '×7 en 8 mois',
    timeframe: '8 mois',
    levers: ['CRO', 'Créatives', 'Meta Ads', 'Google Ads', 'Email'],
    highlightLever: 'CRO',
    headline: '5K€ → 35K€/mois en 8 mois',
    metrics: [
      { value: '×7', label: 'sur le CA en 8 mois' },
      // TODO MIG (annotation 12) : remplacer par le taux de conversion avant → après
      // dès que le chiffre est fourni. En attendant, on garde le MER déjà publié.
      { value: '~5', label: 'MER' },
    ],
    review: {
      quote:
        'Avec MIG, en seulement 8 mois je suis passé de 4 000€ à 40 000€ de CA avec la refonte de mon site web et les optimisations sur la partie email marketing. Je recommande fortement, FONCÉS.',
      name: 'Jean-Christophe Gadrat',
      role: 'Fondateur de Siho',
      source: 'landing page actuelle',
    },
    screens: [
      { image: sihoAvant, alt: 'Application Shopify Siho : 5,64 k€ de ventes et 111 commandes sur le mois', label: 'Avant · Shopify · 5 640 € sur le mois' },
      { image: sihoApres, alt: 'Application Shopify Siho : 35 020 € de ventes et 575 commandes du 1er au 31 mai 2025', label: 'Après · Shopify · mai 2025 · 35 020 €' },
    ],
    story:
      'Marque bretonne de compléments bio, environ 5 000 €/mois : un excellent produit, une visibilité quasi nulle. MIG refond le site et les fiches produits, puis construit créatives, Meta Ads, Google Ads et email.',
  },
  {
    id: 'cosmetic-hair-shop',
    brand: 'Cosmetic Hair Shop',
    logo: cosmeticHairShop,
    logoHeight: 16,
    niche: 'Capillaire',
    before: '10K€',
    after: '46K€',
    unit: '/mois',
    beforeValue: 10,
    afterValue: 46,
    highlight: '×4,6 en 6 mois',
    timeframe: '6 mois',
    levers: ['Shopify', 'Google Ads', 'Email', 'Meta Ads'],
    highlightLever: 'Shopify',
    headline: '10K€ → 46K€/mois en 6 mois',
    metrics: [
      { value: '×4,6', label: 'sur le CA en 6 mois' },
      { value: 'WordPress → Shopify', label: 'migration du site' },
    ],
    review: {
      quote:
        'Merci à MIG AGENCE qui ma aidé à développer mon site , des personnes avec beaucoup de patience et comprehensive qui vous oriente afin de comprendre comment fonctionne un site et comment le développer je recommande à 100%',
      name: 'Laurent Hamamlian',
      role: 'Fondateur de Cosmetic Hair',
      source: 'migagence.com',
    },
    screens: [
      { image: chsAvant, alt: 'Shopify, ventes totales au fil du temps : 10 208 € sur février 2025', label: 'Avant · Shopify · févr. 2025 · 10 208 €' },
      { image: chsApres, alt: 'Shopify, ventes totales au fil du temps : 46 881 € sur juillet 2025, +359 % vs février', label: 'Après · Shopify · juil. 2025 · 46 882 € (+359 %)' },
    ],
    story:
      'Boutique capillaire à 10K€/mois sur un WordPress qui plafonnait techniquement. Migration Shopify en février 2025, puis Google Ads, email et Meta Ads : de 10 208 € à 46 882 € en juillet 2025.',
  },
  {
    id: 'joia-paris',
    brand: 'Joia Paris',
    logo: joiaLogo,
    logoHeight: 24,
    niche: 'Compléments alimentaires',
    before: '4K€',
    after: '250K€',
    unit: '/mois',
    beforeValue: 4,
    afterValue: 250,
    highlight: '×62 sur le CA mensuel',
    timeframe: '6 mois',
    levers: ['Site web', 'Ads', 'Email'],
    highlightLever: 'Site web',
    headline: '4K€ → 250K€/mois',
    metrics: [
      { value: '235K€', label: 'de ventes en janvier 2025' },
      { value: '+650K€', label: 'de CA en 6 mois de collaboration' },
    ],
    review: {
      quote:
        'En passant de 250 000€ à +650 000€ de CA en 6 mois de collaboration, je ne peux que recommander leurs services! Un travail de professionnel sur tous les domaines : site web, ads et les mails… Merci à Matthieu et Ismaël !',
      name: 'Johanna Saada',
      role: 'Propriétaire de Joia Paris',
      source: 'landing page actuelle',
    },
    screens: [
      { image: joiaJanvier, alt: 'Shopify Joia Paris : 235 530 € de ventes totales du 1er au 31 janvier 2025', label: 'Shopify · janv. 2025 · 235 530 €' },
    ],
    story:
      'Marque de compléments alimentaires à 4 000 €/mois. MIG intervient sur le site web, les Ads et l’email et amène la marque à 250 000 €/mois : 235 530 € de ventes sur le seul mois de janvier 2025.',
  },
];

/* -------------------------------------------------------- 4 · Méthode CRO */

export const croMethodHeading = {
  /** Annotation 17. */
  eyebrow: 'La méthode CRO MIG',
  /** Annotation 18. */
  title: 'Ton produit est bon.<br /><span class="accent">Ton site le cache.</span>',
  /** Annotation 19. */
  lead: 'Pas de refonte pour le plaisir : on corrige ce qui te coûte des ventes, dans l’ordre d’impact.',
  /** Annotation 20 : fin de la frise. */
  pipelineEnd: 'Plus de ventes, même budget pub',
} as const;

/** Annotations 21 à 24. */
export const croMethodSteps: MethodStep[] = [
  {
    id: 'audit',
    index: '01',
    key: 'Audit',
    title: 'Audit du parcours d’achat',
    description:
      'Fiche produit → panier → checkout : on mesure où tes visiteurs décrochent (Shopify, GA4, Microsoft Clarity).',
    proof: {
      image: shopifyConversion,
      alt: 'Extrait d’analytics Shopify : ventilation du taux de conversion et visites par appareil',
      caption: 'Extrait réel · analytics de conversion',
    },
  },
  {
    id: 'product',
    index: '02',
    key: 'Fiches produits',
    title: 'Refonte de ta fiche best-seller',
    description:
      'Bénéfices, réassurance et 4 visuels HD optimisés par produit, puis un template duplicable sur tout ton catalogue.',
    // TODO MIG : visuel à fournir (annotation 22).
    proofTodo: 'Fiche produit avant / après',
  },
  {
    id: 'speed',
    index: '03',
    key: 'Vitesse',
    title: 'Vitesse et mobile',
    description:
      'Un site plus rapide sur Shopify ou WordPress, pensé pour le mobile, là où se fait l’essentiel de ton trafic.',
    // TODO MIG : visuel à fournir (annotation 23).
    proofTodo: 'Score PageSpeed avant / après',
  },
  {
    id: 'upsell',
    index: '04',
    key: 'Panier moyen',
    title: 'Upsell post-achat',
    description:
      'Une offre en 2 étapes juste après le paiement pour vendre plus à chaque commande. Rapport à J+30.',
    // TODO MIG : visuel à fournir (annotation 24).
    proofTodo: 'Dashboard de l’app d’upsell',
  },
];

/* ------------------------------------------------------------ 5 · Questions */

/** Annotations 25 à 29. */
export const croFaq: Faq[] = [
  {
    q: 'Dois-je déjà avoir du trafic ?',
    a: 'Idéalement oui : le CRO travaille sur les visiteurs que tu as déjà. Si ton trafic est faible, on te dit par quoi commencer pendant le diagnostic.',
  },
  {
    q: 'Faut-il refaire tout mon site ?',
    a: 'Non. On commence par ta fiche best-seller, puis on duplique ce qui marche sur le reste du catalogue.',
  },
  {
    q: 'Travaillez-vous sur Shopify ?',
    a: 'Oui, Shopify et PrestaShop. Les migrations WordPress vers Shopify font partie des cas accompagnés.',
  },
  {
    q: 'Combien ça coûte ?',
    // Tarifs communiqués par MIG dans le brief CRO (annotation 28).
    a: 'Refonte d’une fiche produit : 600 €. Photos optimisées CRO : 200 € par produit. Vitesse du site : 290 €. Upsell post-achat : 800 €. Le diagnostic, lui, est gratuit.',
  },
  {
    q: 'Suis-je engagé après l’appel ?',
    a: 'Non. Tu repars avec tes blocages et tes actions prioritaires. Si un accompagnement a du sens, on te dit lequel.',
  },
];

/* ------------------------------------------------------- 6 · Bloc de clôture */

/** Annotations 30 à 35. */
export const croClosing = {
  eyebrow: 'Diagnostic CRO gratuit',
  title: 'Ton trafic est déjà là ?<br />On transforme tes visiteurs en clients.',
  lead: 'minutes pour trouver où ton site perd des ventes et quoi corriger en premier.',
  ctaLabel: 'Réserver mon diagnostic CRO gratuit',
  ctaSub: 'Trouver où mon site perd des ventes',
  steps: [
    { title: 'Tu choisis ton créneau', text: 'Directement sur le calendrier ci-dessous.' },
    { title: 'On prépare ton diagnostic', text: 'On regarde ton site, tes fiches produits et ton tunnel d’achat avant l’appel.' },
    { title: 'On débriefe ensemble', text: 'Tu repars avec tes blocages et tes actions prioritaires.' },
  ],
  notFor: 'Pas pour toi si ton site n’a pas encore de trafic.',
} as const;

/* --------------------------------------------------------- 7 · Réservation */

/** Annotations 36 à 38. */
export const croBooking = {
  title: 'Réserve ton diagnostic CRO gratuit,<br />disponible sous 24 h.',
  lead: 'minutes pour voir où ton site perd des ventes et par quoi commencer.',
} as const;

export const croDiagnosticSteps: DiagnosticStep[] = [
  { index: '1', title: 'Fiches produits', text: 'Photos, bénéfices, réassurance.' },
  { index: '2', title: 'Tunnel', text: 'Panier, checkout, frais de port.' },
  { index: '3', title: 'Vitesse', text: 'Mobile et temps de chargement.' },
  { index: '4', title: 'Priorités', text: 'Les corrections à faire, dans l’ordre.' },
];

/** Annotations 1 et 39. */
export const croCtaLabels = {
  header: 'Réserver mon diagnostic CRO',
  headerShort: 'Réserver',
  sticky: 'Réserver mon diagnostic CRO gratuit',
} as const;
