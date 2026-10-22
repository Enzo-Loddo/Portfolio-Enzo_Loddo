/** Rend transparent l'intérieur noir du cadre vidéo (remplissage depuis le centre). */
import sharp from 'sharp';
const f = process.argv[2];
const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const seen = new Uint8Array(w * h);
const stack = [Math.floor(h / 2) * w + Math.floor(w / 2)];
while (stack.length) {
  const p = stack.pop();
  if (seen[p]) continue;
  const o = p * 4;
  if (data[o] > 40 || data[o + 1] > 40 || data[o + 2] > 40) continue;
  seen[p] = 1;
  data[o + 3] = 0;
  const x = p % w, y = (p / w) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w);
  if (y < h - 1) stack.push(p + w);
}
await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(f + '.tmp');
console.log('ok', w, h);
