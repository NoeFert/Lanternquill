import type { Oracle } from '../../models';

export const BASIC_ORACLES: Oracle[] = [
  {
    id: 'main-oracle',
    name: 'Oui ou non',
    category: 'basic',
    entries: [
      { text: 'Oui, et…', weight: 1 },
      { text: 'Oui', weight: 3 },
      { text: 'Oui, mais...', weight: 1 },
      { text: 'Non, mais...', weight: 1 },
      { text: 'Non', weight: 3 },
      { text: 'Non, et…', weight: 1 }
    ],
    order:10,
  },
  {
    id: 'probability',
    name: 'Probabilité',
    category: 'basic',
    entries: [
      { text: 'Absolument sûr', weight: 1 },
      { text: 'Très probable', weight: 1 },
      { text: 'Probable', weight: 1 },
      { text: 'Peu problable', weight: 1 },
      { text: 'Très peu probable', weight: 1 },
      { text: 'Impossible', weight: 1 }
    ],
    order:10,
  },
  {
    id: 'difficulty',
    name: 'Difficulté',
    category: 'basic',
    entries: [
      { text: 'Trivial', weight: 1 },
      { text: 'Facile', weight: 1 },
      { text: 'Neutre', weight: 1 },
      { text: 'Difficile', weight: 1 },
      { text: 'Très difficile', weight: 1 },
      { text: 'Presque impossible', weight: 1 }
    ],
    order:10,
  },
  {
    id: 'danger',
    name: 'Dangerosité',
    category: 'basic',
    entries: [
      { text: 'Trivial', weight: 1 },
      { text: 'Facile', weight: 1 },
      { text: 'Neutre', weight: 1 },
      { text: 'Difficile', weight: 1 },
      { text: 'Très difficile', weight: 1 },
      { text: 'Danger de mort', weight: 1 }
    ],
    order:10,
  },
];
