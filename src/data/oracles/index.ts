import type { Oracle } from '../../models';
import { BASIC_ORACLES } from './basic';
import { WORLD_ORACLES } from './world';
import { EVENT_ORACLES } from './event';
import { INSPIRATION_ORACLES } from './inspiration';

// Ces oracles statiques servent de test. À REMPLACER PLUS TARD !!!

export const ORACLES: Oracle[] = [
  ...BASIC_ORACLES,
  ...WORLD_ORACLES,
  ...EVENT_ORACLES,
  ...INSPIRATION_ORACLES,
];
