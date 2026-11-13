/**
 * Défilement fluide (Lenis) : la molette et le tactile glissent en douceur au lieu de sauter.
 * Désactivé si le visiteur préfère réduire les animations.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, anchors: true });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
