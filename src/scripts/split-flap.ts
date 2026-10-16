/**
 * Effet « tableau à palettes » (split-flap) : les caractères défilent avant de se fixer
 * sur leur valeur finale, de gauche à droite, comme sur un panneau d'aéroport.
 *
 * Markup attendu : <span data-flap="TEXTE FINAL" aria-hidden="true">TEXTE FINAL</span>
 * Les lignes de vol portent `data-flap-row`.
 */
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pick = (pool: string) => pool[Math.floor(Math.random() * pool.length)];

function randomFor(finalChar: string): string {
  if (/[0-9]/.test(finalChar)) return pick(DIGITS);
  if (/[A-ZÀ-Ý]/i.test(finalChar)) return pick(LETTERS);
  return finalChar; // espaces, « : », « - », « # » restent fixes
}

export function flap(el: HTMLElement, { duration = 1100, delay = 0 } = {}): void {
  if (reduceMotion || el.dataset.flapping) return;
  const finalText = el.dataset.flap ?? el.textContent ?? '';
  const chars = [...finalText];
  el.dataset.flapping = '1';
  // Fige la largeur pour éviter que la ligne ne « saute » pendant le défilement.
  el.style.minWidth = `${el.offsetWidth}px`;

  const start = performance.now() + delay;
  let last = 0;

  const frame = (now: number) => {
    if (now < start) return void requestAnimationFrame(frame);
    const t = now - start;
    if (now - last >= 45) {
      last = now;
      el.textContent = chars
        .map((c, i) => (t >= ((i + 1) / chars.length) * duration ? c : randomFor(c)))
        .join('');
    }
    if (t < duration) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = finalText;
      el.style.minWidth = '';
      delete el.dataset.flapping;
    }
  };
  requestAnimationFrame(frame);
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-flap-row]').forEach((row, index) => {
    const targets = Array.from(row.querySelectorAll<HTMLElement>('[data-flap]'));
    // Arrivée de la page : les lignes s'affichent l'une après l'autre.
    targets.forEach((el, i) => flap(el, { delay: index * 140 + i * 60 }));
    // Survol : le nom et le vol se rafraîchissent brièvement.
    row.addEventListener('mouseenter', () => {
      targets
        .filter((el) => el.dataset.flapHover !== undefined)
        .forEach((el, i) => flap(el, { duration: 600, delay: i * 80 }));
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
