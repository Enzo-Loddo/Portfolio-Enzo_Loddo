/**
 * Transition de page « atterrissage » : au clic sur un lien entre l'accueil et Me découvrir / les 3 projets, un GIF d'avion qui atterrit en
 * accéléré passe en plein écran (quelques secondes) ; sur la page suivante, des volets noirs se relèvent
 * (comme les stores d'un hall d'aéroport) pour révéler le contenu.
 *
 * Fonctionnement : un drapeau est posé dans sessionStorage avant la navigation ; un script en ligne
 * (BaseLayout) couvre aussitôt la nouvelle page pour éviter tout flash, puis ce module la « découvre ».
 */
const KEY = 'pt';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const overlay = document.getElementById('pt');
const gif = overlay?.querySelector<HTMLImageElement>('.pt-gif') ?? null;
const gifUrl = overlay?.dataset.gif ?? '';
const duration = Number(overlay?.dataset.duration ?? 1500);
/** Pages reliées à l'accueil par la transition (voir `transitionPages` dans data/discover.ts) */
const pages = (overlay?.dataset.pages ?? '').split(',').filter(Boolean);
const clean = (path: string) => path.replace(/\/+$/, '') || '/';
const shouldPlay = (from: string, to: string) =>
  (from === '/' && pages.includes(to)) || (to === '/' && pages.includes(from));

/** Précharge le GIF quand le navigateur est inactif pour qu'il démarre sans attente. */
const preload = () => {
  if (gifUrl) new Image().src = gifUrl;
};
if ('requestIdleCallback' in window) (window as any).requestIdleCallback(preload, { timeout: 3000 });
else window.setTimeout(preload, 1500);

const release = () => {
  if (!overlay) return;
  overlay.classList.remove('is-in');
  overlay.classList.add('is-out');
  window.setTimeout(() => {
    overlay.classList.remove('is-out');
    document.documentElement.classList.remove('pt-held');
  }, 900);
};

if (overlay) {
  let arriving = false;
  try {
    arriving = sessionStorage.getItem(KEY) === '1';
    sessionStorage.removeItem(KEY);
  } catch {
    /* stockage indisponible : pas de transition d'arrivée */
  }

  if (arriving && !reduce) {
    // La page est déjà couverte (classe pt-held posée dans <head>) : on attend un instant puis on la révèle.
    window.setTimeout(release, 150);
  } else {
    document.documentElement.classList.remove('pt-held');
  }

  // Retour arrière (cache de navigation) : on retire toujours le rideau
  window.addEventListener('pageshow', (e) => {
    if ((e as PageTransitionEvent).persisted) {
      overlay.classList.remove('is-in', 'is-out');
      document.documentElement.classList.remove('pt-held');
    }
  });

  document.addEventListener('click', (e) => {
    if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest('a');
    if (!link || link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-no-transition')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // ancre ou même page
    if (/\.(pdf|zip|png|jpe?g|webp|svg)$/i.test(url.pathname)) return;
    // Transition réservée à l'accueil ↔ Me découvrir et aux 3 projets ; ailleurs, navigation normale
    if (!shouldPlay(clean(location.pathname), clean(url.pathname))) return;

    e.preventDefault();
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    // Redémarre le GIF depuis sa première image à chaque transition
    if (gif) gif.src = `${gifUrl}?t=${Date.now()}`;
    overlay.style.setProperty('--pt-duration', `${duration}ms`);
    overlay.classList.add('is-in');
    window.setTimeout(() => (location.href = url.href), duration);
  });
}
