/**
 * Prépare les images de la page « Me découvrir » :
 *  - lit les JPG fournis dans public/images/decouvrir/originaux/ (fond blanc) ;
 *  - supprime le fond blanc (remplissage depuis les bords, avec adoucissement des contours) ;
 *  - convertit les logos noir sur blanc en PNG noir à fond transparent ;
 *  - écrit des WebP / PNG optimisés dans public/images/decouvrir/.
 *
 * Usage : node scripts/process-discover-images.mjs
 */
import { access, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/decouvrir/originaux';
const OUT = 'public/images/decouvrir';

/** Découpes : fond blanc relié au bord → transparent. */
const CUTOUTS = [
  'appareil-polaroid', 'cadre-polaroid', 'carte-reunion', 'coucher-soleil', 'eglise',
  'fougere-droite', 'fougere-gauche', 'hibiscus', 'montagne-nb', 'panier',
];
/** Ceux-ci n'ont aucun blanc dans le sujet : on peut supprimer tout le blanc, même enfermé. */
const GLOBAL_KEY = new Set(['fougere-droite', 'fougere-gauche', 'hibiscus']);
/** Photos de la bande : conservées telles quelles (simple conversion). */
const PHOTOS = ['photo-1', 'photo-2', 'photo-3', 'photo-4'];
const LOGOS = ['logo-affinity', 'logo-astro', 'logo-canva', 'logo-etoile', 'logo-figma', 'logo-vscode'];

const WHITE = 246; // en dessous, un pixel est considéré comme du contenu

async function readRgba(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

function minChan(data, i) {
  return Math.min(data[i], data[i + 1], data[i + 2]);
}

/** Remplit depuis les bords les pixels quasi blancs. Retourne un masque (1 = fond). */
function floodBackground(data, w, h, threshold) {
  const bg = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    const p = y * w + x;
    if (bg[p] || minChan(data, p * 4) < threshold) return;
    bg[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
  return bg;
}

/** Adoucit les contours : les pixels voisins du fond deviennent semi-transparents et perdent leur halo blanc. */
function feather(data, w, h, bg, rings = 2) {
  let frontier = new Set();
  const near = (p) => {
    const x = p % w, y = (p / w) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (bg[ny * w + nx] === 1) return true;
    }
    return false;
  };
  for (let p = 0; p < w * h; p++) if (!bg[p] && near(p)) frontier.add(p);
  for (let r = 0; r < rings; r++) {
    const next = new Set();
    for (const p of frontier) {
      const i = p * 4;
      const m = minChan(data, i);
      if (m >= 205) {
        const a = Math.max(0, Math.min(1, (255 - m) / 50));
        if (a > 0.04) {
          for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, (data[i + c] - (1 - a) * 255) / a));
        }
        data[i + 3] = Math.round(a * 255);
        if (a < 0.2) bg[p] = 1;
      }
    }
    frontier = next;
  }
}

/**
 * Masques de transparence exportés de Figma (public/images/decouvrir/originaux/masques/NOM.png).
 * Ils contiennent la forme exacte du calque, contour blanc déchiré compris : on les applique
 * comme canal alpha à la photo JPG haute définition.
 */
async function maskedCutout(name) {
  const maskFile = path.join(SRC, 'masques', `${name}.png`);
  try { await access(maskFile); } catch { return null; }
  const jpg = path.join(SRC, `${name}.jpg`);
  const meta = await sharp(jpg).metadata();
  const rgb = await sharp(jpg).removeAlpha().toBuffer();
  const alpha = await sharp(maskFile)
    .ensureAlpha()
    .extractChannel(3)
    .resize(meta.width, meta.height, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer();
  await sharp(rgb)
    .joinChannel(alpha, { raw: { width: meta.width, height: meta.height, channels: 1 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT, `${name}.webp`));
  return `${name}.webp ${meta.width}x${meta.height} (masque Figma)`;
}

async function cutout(name) {
  const masked = await maskedCutout(name);
  if (masked) return masked;
  const { data, w, h } = await readRgba(path.join(SRC, `${name}.jpg`));
  if (GLOBAL_KEY.has(name)) {
    for (let p = 0; p < w * h; p++) {
      const i = p * 4;
      const m = minChan(data, i);
      if (m >= 205) {
        const a = Math.max(0, Math.min(1, (255 - m) / 50));
        if (a > 0.04) for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, (data[i + c] - (1 - a) * 255) / a));
        data[i + 3] = Math.round(a * 255);
      }
    }
  } else {
    const bg = floodBackground(data, w, h, WHITE);
    feather(data, w, h, bg);
    for (let p = 0; p < w * h; p++) if (bg[p]) data[p * 4 + 3] = 0;
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT, `${name}.webp`));
  return `${name}.webp ${w}x${h}`;
}

async function photo(name) {
  const info = await sharp(path.join(SRC, `${name}.jpg`)).webp({ quality: 88 }).toFile(path.join(OUT, `${name}.webp`));
  return `${name}.webp ${info.width}x${info.height}`;
}

/** Logo noir sur blanc → noir, la transparence suit la luminosité. */
async function logo(name) {
  const { data, w, h } = await readRgba(path.join(SRC, `${name}.jpg`));
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const a = Math.max(0, Math.min(1, (255 - lum) / 215));
    data[i] = data[i + 1] = data[i + 2] = 0;
    data[i + 3] = Math.round(a * 255);
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${name}.png`));
  return `${name}.png ${w}x${h}`;
}

await mkdir(OUT, { recursive: true });
const present = new Set((await readdir(SRC)).map((f) => path.parse(f).name));
const report = [];
for (const n of CUTOUTS) report.push(present.has(n) ? await cutout(n) : `MANQUANT : ${n}`);
for (const n of PHOTOS) report.push(present.has(n) ? await photo(n) : `MANQUANT : ${n}`);
for (const n of LOGOS) report.push(present.has(n) ? await logo(n) : `MANQUANT : ${n}`);
console.log(report.join('\n'));
