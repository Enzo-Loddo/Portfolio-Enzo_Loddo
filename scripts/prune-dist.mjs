/**
 * Après le build : retire du dossier `dist/` ce qui ne doit pas être mis en ligne
 * (les images « originaux » en pleine résolution, ~140 Mo, et les fichiers système macOS).
 * Ils restent dans `public/` pour le travail, mais n'ont aucune raison d'être publiés.
 */
import { readdir, rm } from 'node:fs/promises';
import path from 'node:path';

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name === 'originaux') {
      await rm(full, { recursive: true, force: true });
      console.log(`supprimé : ${full}`);
    } else if (entry.isFile() && entry.name === '.DS_Store') {
      await rm(full, { force: true });
    } else if (entry.isDirectory()) {
      await walk(full);
    }
  }
}
await walk('dist');
