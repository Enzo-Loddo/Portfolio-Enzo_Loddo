/**
 * Prépare les images d'une page projet : convertit les fichiers de
 * public/images/projets/<slug>/originaux/ en WebP optimisés dans public/images/projets/<slug>/.
 *
 * Usage : node scripts/process-project-images.mjs la-cite-de-dieu
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage : node scripts/process-project-images.mjs <slug>');
  process.exit(1);
}
const SRC = `public/images/projets/${slug}/originaux`;
const OUT = `public/images/projets/${slug}`;

/** nom du fichier source (sans extension) → réglages */
const RULES = {
  couverture: { width: 2400, quality: 80, mobile: 1100 },
  affiche: { width: 900, quality: 88 },
  'appareil-nikon': { width: 600, quality: 88 },
  palmier: { width: 600, quality: 88 },
  inspiration: { width: 1000, quality: 88 },
  'cadre-video': { width: 1100, quality: 90 },
  scotch: { width: 560, quality: 88 },
  'papier-dechire': { width: 800, quality: 88 },
  'comparateur-affiche-film': { width: 960, quality: 86 },
  'comparateur-ma-creation': { width: 1400, quality: 86 },
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));
for (const file of files) {
  const name = path.parse(file).name.trim();
  const rule = RULES[name];
  if (!rule) {
    console.log(`ignoré : ${file}`);
    continue;
  }
  const img = sharp(path.join(SRC, file)).rotate();
  const meta = await img.metadata();
  const info = await img
    .clone()
    .resize({ width: Math.min(rule.width, meta.width ?? rule.width), withoutEnlargement: true })
    .webp({ quality: rule.quality, alphaQuality: 100 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`${name}.webp ${info.width}x${info.height} (${Math.round(info.size / 1024)} Ko)`);
  if (rule.mobile) {
    const m = await img.clone().resize({ width: rule.mobile }).webp({ quality: 74 }).toFile(path.join(OUT, `${name}-mobile.webp`));
    console.log(`${name}-mobile.webp ${m.width}x${m.height} (${Math.round(m.size / 1024)} Ko)`);
  }
}
