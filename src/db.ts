import Dexie, { type EntityTable } from 'dexie';
import type { Story, Chapter, Favorite, Tracker } from './models';

export const db = new Dexie('LanternQuill') as Dexie & {
  stories: EntityTable<Story, 'id'>;
  chapters: EntityTable<Chapter, 'id'>;
  favorites: EntityTable<Favorite, 'oracleId'>;
  trackers: EntityTable<Tracker, 'id'>;
};

db.version(1).stores({
  stories: 'id, updatedAt',
  chapters: 'id, storyId, order',
  favorites: 'oracleId',
  trackers: 'id, storyId, type',
});

export async function requestPersistentStorage() {
  if (navigator.storage?.persist) {
    const granted = await navigator.storage.persist();
    console.log('Stockage persistant accordé :', granted);
  }
}