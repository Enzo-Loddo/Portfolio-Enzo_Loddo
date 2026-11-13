/**
 * Défilement fluide (Lenis) : la molette et le tactile glissent en douceur au lieu de sauter.
 * Désactivé si le visiteur préfère réduire les animations.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, anchors: true });
  // Exposé pour les boutons qui font défiler la page (ex. « Haut de page » du pied de page)
  (window as any).__lenis = lenis;
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
