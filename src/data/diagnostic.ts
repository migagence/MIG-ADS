export type DiagnosticStep = { index: string; title: string; text: string };

/** Ce qui est passé en revue pendant le diagnostic (ordre validé par MIG le 02/10/2026). */
export const diagnosticSteps: DiagnosticStep[] = [
  { index: '1', title: 'Conversion', text: 'Pages produits, tunnel, réassurance.' },
  { index: '2', title: 'Acquisition', text: 'Campagnes, budgets, tracking, créatives.' },
  { index: '3', title: 'Rétention', text: 'Email, WhatsApp, base clients.' },
  { index: '4', title: 'Priorités', text: 'Les leviers à débloquer, dans l’ordre.' },
];
