import type { Oracle } from '../models';

// Ces oracles statiques servent de test. À REMPLACER PLUS TARD !!!

export const ORACLES: Oracle[] = [
  {
    id: 'action',
    name: 'Action',
    category: 'inspiration',
    entries: [
      { text: 'Fuir', weight: 1 },
      { text: 'Protéger', weight: 1 },
      { text: 'Trahir', weight: 1 },
      { text: 'Révéler', weight: 1 },
      { text: 'Chercher', weight: 2 },
    ],
  },
  {
    id: 'oui-non',
    name: 'Oui ou non ?',
    category: 'questions',
    entries: [
      { text: 'Oui, et…', weight: 1 },
      { text: 'Oui', weight: 3 },
      { text: 'Non', weight: 3 },
      { text: 'Non, et…', weight: 1 },
    ],
  },
  {
    id: 'meteo',
    name: 'Météo',
    category: 'world',
    entries: [
      { text: 'Ciel clair', weight: 2 },
      { text: 'Brouillard épais', weight: 1 },
      { text: 'Pluie battante', weight: 1 },
      { text: 'Orage', weight: 1 },
    ],
  },
];