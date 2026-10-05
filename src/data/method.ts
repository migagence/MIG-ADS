import shopifyConversion from '../assets/proof/shopify-conversion.webp';
import creativesFragrance from '../assets/proof/creatives-fragrance.webp';
import googleAds from '../assets/proof/google-ads-dashboard.webp';
import klaviyo from '../assets/proof/klaviyo-kanal.webp';

export type MethodStep = {
  id: 'convert' | 'create' | 'acquire' | 'retain';
  index: string;
  key: string;
  title: string;
  /** Texte repris/adapté de la section « Un pilotage clé en main » du site actuel. */
  description: string;
  items: string[];
  proof: { image: ImageMetadata; alt: string; caption: string };
};

export const methodSteps: MethodStep[] = [
  {
    id: 'convert',
    index: '01',
    key: 'CRO',
    title: 'Optimisation du site (CRO)',
    description:
      'Pages produits, tunnel d’achat, réassurance : on corrige ce qui te coûte des ventes.',
    items: ['Pages produits', 'Tunnel d’achat', 'Réassurance', 'Friction', 'Taux de conversion'],
    proof: {
      image: shopifyConversion,
      alt: 'Extrait d’analytics Shopify : ventilation du taux de conversion et visites par appareil',
      caption: 'Extrait réel · analytics de conversion',
    },
  },
  {
    id: 'create',
    index: '02',
    key: 'Créatives',
    title: 'Création de créatives',
    description:
      'Nouvelles créatives testées en continu, pensées pour ta niche.',
    items: ['Concepts', 'Variantes', 'Tests continus', 'Adaptation à la niche'],
    proof: {
      image: creativesFragrance,
      alt: 'Trois créatives publicitaires produites pour une campagne « Fragrance Days »',
      caption: 'Extrait réel · créatives produites',
    },
  },
  {
    id: 'acquire',
    index: '03',
    key: 'Ads',
    title: 'Gestion des Ads',
    description:
      'Campagnes restructurées, budgets réalloués par performance, tracking vérifié.',
    items: ['Meta Ads', 'Google Ads', 'Budgets', 'Tracking', 'Structure de campagne'],
    proof: {
      image: googleAds,
      alt: 'Extrait d’un tableau de bord Google Ads avec la liste des campagnes',
      caption: 'Extrait réel · pilotage Google Ads',
    },
  },
  {
    id: 'retain',
    index: '04',
    key: 'Rétention',
    title: 'Email + WhatsApp',
    description:
      'Flows email et WhatsApp : bienvenue, panier abandonné, post-achat, réactivation.',
    items: ['Bienvenue', 'Panier abandonné', 'Post-achat', 'Réactivation', 'Revenu récurrent'],
    proof: {
      image: klaviyo,
      alt: 'Extrait de tableaux de bord Klaviyo et Kanal (WhatsApp) : chiffre d’affaires attribué',
      caption: 'Extrait réel · Klaviyo & WhatsApp',
    },
  },
];

/** Vidéo « VSL MIG » déjà hébergée sur Wistia (11 min). Chargée uniquement au clic. */
export const methodVideo = {
  wistiaId: '5oytxz0e4w',
  title: 'La méthode MIG expliquée en vidéo',
  duration: '11 min',
} as const;
