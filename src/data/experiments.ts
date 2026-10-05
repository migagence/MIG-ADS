/**
 * Définition des tests A/B.
 * - `active: false` → tout le monde voit la variante de contrôle (première de la liste).
 * - `active: true`  → répartition aléatoire persistée en localStorage.
 * - Forçage pour prévisualiser : ?exp=headline:B,cta:B,heroProof:trustpilot
 * Chaque exposition est trackée via l’événement `experiment_exposure`.
 */
export type Experiment = { id: string; variants: readonly string[]; active: boolean };

export const experiments = {
  headline: { id: 'headline', variants: ['A', 'B'], active: false },
  heroProof: { id: 'heroProof', variants: ['trustpilot', 'case'], active: false },
  cta: { id: 'cta', variants: ['A', 'B'], active: false },
} as const satisfies Record<string, Experiment>;

export const headlineVariants = {
  A: {
    title: 'Jusqu’à ×6 sur ton CA.',
    lead: 'CRO, créatives, Ads et email pilotés ensemble. Un seul objectif : accroître ton chiffre d’affaires.',
  },
  B: {
    title: 'On transforme ton acquisition en système de croissance.',
    lead: 'CRO, créatives, Ads et email pilotés ensemble. Un seul objectif : accroître ton CA.',
  },
} as const;

export const ctaVariants = {
  A: 'Réserver mon diagnostic gratuit',
  B: 'Identifier mes leviers de croissance',
} as const;
