import PocketBase from 'pocketbase';

/**
 * Client PocketBase partagé. L'URL vient de PUBLIC_POCKETBASE_URL (voir .env.example).
 * Le site est statique : les données sont lues au build, pas dans le navigateur.
 */
export const POCKETBASE_URL = import.meta.env.PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);
// Évite que les requêtes simultanées du build s'annulent entre elles.
pb.autoCancellation(false);
