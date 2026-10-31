/**
 * Prépare les images d'une page projet : convertit les fichiers de
 * public/images/projets/<slug>/originaux/ en WebP optimisés dans public/images/projets/<slug>/.
 *
 * Usage : node scripts/process-project-images.mjs la-cite-de-dieu
 *
 * Chaque règle : nom du fichier source (sans extension, accents ignorés) → { out, width, quality, ... }
 *   keyWhite : rend transparent le blanc relié aux bords (autocollants exportés sur fond blanc)
 *   crop     : { left, top, width, height } en pixels de l'original, appliqué avant le redimensionnement
 *   height   : avec width, force une taille exacte (fit: fill)
 *   mobile   : largeur d'une variante mobile (`<out>-mobile.webp`)
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const slug = process.argv[2];
const PROJECTS = {
  'la-cite-de-dieu': {
    couverture: { width: 2400, quality: 80, mobile: 1100 },
    affiche: { width: 900, quality: 88 },
    'appareil-nikon': { width: 600, quality: 88 },
    palmier: { width: 600, quality: 88 },
    inspiration: { width: 1000, quality: 88 },
    scotch: { width: 560, quality: 88 },
    'papier-dechire': { width: 800, quality: 88 },
    'comparateur-affiche-film': { width: 960, quality: 86 },
    'comparateur-ma-creation': { width: 1400, quality: 86 },
  },
  'tokyo-rwb': {
    couverture: { width: 2400, quality: 82, mobile: 1100 },
    // Recadrage exact de la photo d'origine tel qu'il apparaît dans l'affiche (mesuré par comparaison des deux images),
    // puis mise à la même taille que l'affiche : le comparateur avant / après ne « bouge » plus.
    avant: { crop: { left: 2, top: 76, width: 729, height: 1030 }, width: 1400, height: 1980, quality: 88 },
    apres: { width: 1400, quality: 86 },
    decors: { out: 'plaque', width: 700, quality: 90 },
    decors2: { out: 'logo-kanjozoku', width: 600, quality: 90, keyWhite: true },
    inspiration: { width: 900, quality: 86 },
    inspiration2: { width: 900, quality: 86 },
  },
};
const RULES = PROJECTS[slug];
if (!RULES) {
  console.error(`Usage : node scripts/process-project-images.mjs <${Object.keys(PROJECTS).join('|')}>`);
  process.exit(1);
}
const SRC = `public/images/projets/${slug}/originaux`;
const OUT = `public/images/projets/${slug}`;
const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/** Remplit depuis les bords : le blanc (ou quasi blanc) connecté au bord devient transparent. */
async function keyWhite(file, width) {
  const { data, info } = await sharp(file).ensureAlpha().resize({ width, withoutEnlargement: true }).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    const o = p * 4;
    if (data[o] < 235 || data[o + 1] < 235 || data[o + 2] < 235) continue;
    seen[p] = 1;
    data[o + 3] = 0;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  return sharp(data, { raw: info });
}

await mkdir(OUT, { recursive: true });
for (const file of (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const name = plain(path.parse(file).name);
  const rule = RULES[name];
  if (!rule) {
    console.log(`ignoré : ${file}`);
    continue;
  }
  const out = rule.out ?? name;
  const input = path.join(SRC, file);
  let base;
  if (rule.keyWhite) base = await keyWhite(input, rule.width);
  else if (rule.crop) base = sharp(input).extract(rule.crop).resize(rule.width, rule.height, { fit: 'fill' });
  else base = sharp(input).rotate().resize({ width: rule.width, withoutEnlargement: true });
  const info = await base.clone().webp({ quality: rule.quality, alphaQuality: 100 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(`${out}.webp ${info.width}x${info.height} (${Math.round(info.size / 1024)} Ko)`);
  if (rule.mobile) {
    const m = await sharp(input).resize({ width: rule.mobile, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, `${out}-mobile.webp`));
    console.log(`${out}-mobile.webp ${m.width}x${m.height} (${Math.round(m.size / 1024)} Ko)`);
  }
}
