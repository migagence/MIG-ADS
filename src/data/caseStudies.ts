import attar from '../assets/logos/clients/attar-studio.png';
import cosmeticHairShop from '../assets/logos/clients/cosmetic-hair-shop.png';
import siho from '../assets/logos/clients/siho.png';
import joiaLogo from '../assets/logos/clients/joia-paris.png';
import chsAvant from '../assets/proof/cases/chs-shopify-fevrier-2025.webp';
import chsApres from '../assets/proof/cases/chs-shopify-juillet-2025.webp';
import sihoAvant from '../assets/proof/cases/siho-shopify-avant.webp';
import sihoApres from '../assets/proof/cases/siho-shopify-mai-2025.webp';
import attarAvant from '../assets/proof/cases/attar-shopify-avant.webp';
import attarApres from '../assets/proof/cases/attar-shopify-apres.webp';
import attarMobile from '../assets/proof/cases/attar-shopify-mobile.webp';
import joiaJanvier from '../assets/proof/cases/joia-shopify-janvier-2025.webp';

export type CaseStudy = {
  id: string;
  brand: string;
  logo: ImageMetadata;
  /** Hauteur d’affichage du logo (px). */
  logoHeight: number;
  niche: string;
  /** Point de départ (texte affiché tel quel). */
  before: string;
  /** Point d’arrivée (texte affiché tel quel). */
  after: string;
  unit: string;
  beforeValue: number;
  afterValue: number;
  /** Ligne de résultat secondaire (multiplicateur, délai, ROI…). */
  highlight: string;
  timeframe?: string;
  levers: string[];
  /** Contexte court, repris de la landing page actuelle. */
  story: string;
  /** Titre de la ligne dépliable (format « avant → après »). */
  headline: string;
  /** Métriques secondaires (sources : landing page actuelle, migagence.com). */
  metrics?: { value: string; label: string }[];
  /** Avis vérifié associé au cas (texte verbatim). */
  review?: { quote: string; name: string; role: string; source: string };
  /** Captures avant/après : à fournir par MIG (vide = emplacement « capture à fournir »). */
  screens?: { image: ImageMetadata; alt: string; label: string }[];
};

/**
 * Cas clients repris de la landing page actuelle (section « Avant et après MIG »)
 * et de migagence.com (études de cas : noms des fondateurs, métriques secondaires, avis).
 */
export const caseStudies: CaseStudy[] = [
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
    headline: '10K€ → 46K€/mois en 6 mois',
    metrics: [
      { value: '×4,6', label: 'sur le CA en 6 mois' },
      { value: '~40 %', label: 'du CA via l’email' },
    ],
    review: {
      quote: 'Merci à MIG AGENCE qui ma aidé à développer mon site , des personnes avec beaucoup de patience et comprehensive qui vous oriente afin de comprendre comment fonctionne un site et comment le développer je recommande à 100%',
      name: 'Laurent Hamamlian',
      role: 'Fondateur de Cosmetic Hair',
      source: 'migagence.com',
    },
    screens: [
      { image: chsAvant, alt: 'Shopify, ventes totales au fil du temps : 10 208 € sur février 2025', label: 'Avant · Shopify · févr. 2025 · 10 208 €' },
      { image: chsApres, alt: 'Shopify, ventes totales au fil du temps : 46 881 € sur juillet 2025, +359 % vs février', label: 'Après · Shopify · juil. 2025 · 46 882 € (+359 %)' },
    ],
    story:
      'Boutique capillaire à 10K€/mois, 100 % dépendante du SEO sur un WordPress qui plafonnait techniquement. Migration Shopify en février 2025, puis Google Ads, email (~40 % du CA) et Meta Ads ajoutés étape par étape. Résultat : 10 208€ en février 2025 à 46 882€ en juillet 2025, soit +359 % sur le CA mensuel.',
  },
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
    timeframe: '8 mois', // Source : témoignage du fondateur (« en seulement 8 mois je suis passé de 4 000€ à 40 000€ »)
    levers: ['CRO', 'Créatives', 'Meta Ads', 'Google Ads', 'Email'],
    headline: '5K€ → 35K€/mois en 8 mois',
    metrics: [
      { value: '×7', label: 'sur le CA en 8 mois' },
      { value: '~5', label: 'MER' },
    ],
    review: {
      quote: 'Avec MIG, en seulement 8 mois je suis passé de 4 000€ à 40 000€ de CA avec la refonte de mon site web et les optimisations sur la partie email marketing. Je recommande fortement, FONCÉS.',
      name: 'Jean-Christophe Gadrat',
      role: 'Fondateur de Siho',
      source: 'landing page actuelle',
    },
    screens: [
      { image: sihoAvant, alt: 'Application Shopify Siho : 5,64 k€ de ventes et 111 commandes sur le mois', label: 'Avant · Shopify · 5 640 € sur le mois' },
      { image: sihoApres, alt: 'Application Shopify Siho : 35 020 € de ventes et 575 commandes du 1er au 31 mai 2025', label: 'Après · Shopify · mai 2025 · 35 020 €' },
    ],
    story:
      'Marque bretonne de compléments alimentaires bio, environ 5 000€/mois, un excellent produit mais une visibilité quasi nulle. MIG construit l’écosystème complet (CRO, créatives, Meta Ads, Google Ads, email) au moment où le marché du Shilajit explose en France.',
  },
  {
    id: 'attar-studio',
    brand: 'Attar Studio',
    logo: attar,
    logoHeight: 26,
    niche: 'Parfumerie',
    before: '19K€',
    after: '50K€',
    unit: '/mois',
    beforeValue: 19,
    afterValue: 50,
    highlight: 'L’email pèse ~40 % du CA',
    levers: ['Meta Ads', 'Google Ads', 'Email'],
    headline: '19K€ → 50K€/mois',
    metrics: [
      { value: '+4', label: 'ROAS pub' },
      { value: '~40 %', label: 'du CA via l’email' },
    ],
    review: {
      quote: 'Je suis absolument satisfait de collaborer avec cette agence! Une équipe à l’écoute, réactive, toujours force de proposition et surtout vraiment investie dans la réussite de ses clients. Chaque échange est fluide et humain, on sent qu’ils aiment ce qu’ils font et qu’ils le font avec passion. Grâce à eux, j’ai pu ouvrir de nouveaux marchés et faire évoluer ma marque. Je recommande à 100 % !',
      name: 'Ayoub Slassi',
      role: 'Fondateur d’Attar',
      source: 'migagence.com',
    },
    screens: [
      { image: attarAvant, alt: 'Shopify Attar Studio : 18 997 € de ventes totales sur août 2025', label: 'Avant · Shopify · août 2025 · 18 997 €' },
      { image: attarApres, alt: 'Shopify Attar Studio : 50 502 € de ventes totales le mois dernier, +166 % vs août 2025', label: 'Après · Shopify · 50 502 € (+166 %)' },
      { image: attarMobile, alt: 'Application Shopify Attar Studio : 65 882 CHF de ventes sur le mois en cours, +41 %', label: 'Shopify · mois en cours · 65 882 CHF (+41 %)' },
    ],
    story:
      'Marque de parfum suisse, environ 19 000€/mois, aucune stratégie email, des pubs qui ne délivraient pas. MIG reprend toute la stratégie digitale : Meta Ads restructuré, Google Ads activé, email construit de zéro (~40 % du CA aujourd’hui). Résultat : 18 997€ en août 2025 à 50 502€, soit +166 %.',
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
    headline: '4K€ → 250K€/mois',
    metrics: [
      { value: '235K€', label: 'de ventes en janvier 2025' },
      { value: '+650K€', label: 'de CA en 6 mois de collaboration' },
    ],
    review: {
      quote: 'En passant de 250 000€ à +650 000€ de CA en 6 mois de collaboration, je ne peux que recommander leurs services! Un travail de professionnel sur tous les domaines : site web, ads et les mails… Merci à Matthieu et Ismaël !',
      name: 'Johanna Saada',
      role: 'Propriétaire de Joia Paris',
      source: 'landing page actuelle',
    },
    screens: [
      { image: joiaJanvier, alt: 'Shopify Joia Paris : 235 530 € de ventes totales du 1er au 31 janvier 2025', label: 'Shopify · janv. 2025 · 235 530 €' },
    ],
    story:
      'Marque de compléments alimentaires à 4 000€/mois. MIG intervient sur le site web, les Ads et l’email et amène la marque à 250 000€/mois : 235 530€ de ventes sur le seul mois de janvier 2025.',
  },
];

export const caseStudiesDisclaimer =
  'Les résultats présentés correspondent à des cas clients spécifiques et ne constituent pas une garantie de performance future.';
