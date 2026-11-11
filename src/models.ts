export interface Story {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  content: string;
  order: number;
  updatedAt: number;
}

export interface OracleEntry {
  text: string;
  weight: number; // 1 = normal, 2 = compte double, etc.
}

export const ORACLE_CATEGORIES = [
  { key: 'basic', label: 'Basique' },
  { key: 'storyline', label: 'Arc narratif' },
  { key: 'world', label: 'Monde' },
  { key: 'characters', label: 'Personnages' },
  { key: 'event', label: 'Événements' },
  { key: 'inspiration', label: 'Inspiration' },
] as const;
export type OracleCategory = (typeof ORACLE_CATEGORIES)[number]['key'];

export interface Oracle {
  id: string;
  name: string;
  category: OracleCategory;
  entries: OracleEntry[];
  order: number;
}

export interface Favorite {
  oracleId: string;
}


export const TRACKER_TYPES = [
  { key: 'character', label: 'Personnage' },
  { key: 'faction', label: 'Faction' },
  { key: 'location', label: 'Lieu' },
  { key: 'event', label: 'Événement' },
  { key: 'quest', label: 'Quête' },
  { key: 'item', label: 'Objet' },
] as const;

export type TrackerType = (typeof TRACKER_TYPES)[number]['key'];

export interface Tracker {
  id: string;
  storyId: string;
  type: TrackerType;
  title: string;
  description: string;
  clues: string[];
}


export function getLabel(
  list: readonly { key: string; label: string }[],
  key: string
): string {
  return list.find((item) => item.key === key)?.label ?? key;
}