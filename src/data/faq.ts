export type Faq = { q: string; a: string };

/**
 * Réponses rédigées uniquement à partir des contenus MIG existants (landing page actuelle, cas clients, Trustpilot).
 * Les points non documentés sont signalés par un TODO à confirmer par MIG.
 */
export const faq: Faq[] = [
  {
    q: 'Dois-je déjà faire du chiffre d’affaires ?',
    a: 'Non. On peut accompagner dès zéro, tout dépend de ton diagnostic.',
  },
  {
    q: 'Pouvez-vous reprendre mes campagnes existantes ?',
    a: 'Oui, c’est le cas le plus fréquent : restructuration, budgets réalloués, tracking vérifié.',
  },
  {
    q: 'Travaillez-vous sur Shopify ?',
    a: 'Oui. Migrations WordPress vers Shopify et refontes Shopify font partie des cas accompagnés.',
  },
  {
    q: 'Que se passe-t-il après le diagnostic ?',
    // TODO MIG : confirmer le déroulé exact (proposition, délai, format) avant mise en ligne.
    a: 'Tu repars avec tes blocages et tes actions prioritaires. Si un accompagnement a du sens, on te dit lequel.',
  },
  {
    q: 'Suis-je engagé après l’appel ?',
    a: 'Non. Gratuit et sans engagement.',
  },
];
