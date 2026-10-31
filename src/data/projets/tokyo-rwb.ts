/** Page projet « TOKYO - RWB » : contenu, couleurs et médias. La disposition vient de ProjectPage.astro. */
import type { ProjectPageContent } from './types';

const img = '/images/projets/tokyo-rwb';

const page: ProjectPageContent = {
  slug: 'tokyo-rwb',
  title: 'TOKYO - RWB',
  description: 'Tokyo - RWB : affiche concept inspirée des rues de Tokyo et des Porsche RWB.',
  // Tokyo la nuit, scènes de rue clandestines des années 90-2000, vu sur une cassette VHS :
  // bleu nuit presque noir, orange sodium des lampadaires, lignes de balayage.
  theme: {
    bg: '#070b14',
    accent: '#e8962e',
    text: '#e6c28a',
    key: '#ffffff',
    onPanel: '#ffffff',
    onPanelKey: '#e8962e',
    panel: '#070b14',
    muted: '#97a1b5',
    footer: '#03050a',
    vhs: true,
  },
  cover: {
    src: `${img}/couverture.webp`,
    srcMobile: `${img}/couverture-mobile.webp`,
    alt: 'Welcome in Japan, Tokyo : rue de Shinjuku la nuit, enseignes lumineuses et kanji',
  },
  meta: { item: 'ITEM #002', sujet: 'Affiche concept', outils: [] },
  intro: {
    kicker: 'LE SUJET',
    synopsis:
      'Du côté de **Tokyo**, la nuit, les enseignes au néon éclairent des rues où se croisent salarymen et **voitures de légende**. **RWB** (*Rauh-Welt Begriff*), c’est l’univers du préparateur japonais **Akira Nakai** : des Porsche 911 aux ailes élargies, entre passion mécanique et culture de rue.',
    note: 'Une photo m’a donné envie de ce projet : une **911 RWB** garée sur un passage piéton, sous les enseignes de Tokyo. J’en ai fait une **affiche concept** qui garde l’ambiance des rues japonaises des **années 90**.',
  },
  research: {
    title: 'INSPIRATION & RECHERCHES',
    paragraphs: [
      'Je suis parti de **photographies de rue** prises de nuit à Tokyo : enseignes verticales, kanji lumineux et voitures garées au bord du trottoir. L’objectif était de retrouver **l’ambiance** de ces ruelles, entre nostalgie et vitesse.',
      'J’ai ensuite regardé des **affiches typographiques** très graphiques, avec de grands aplats, un seul ton dominant et du texte japonais. Cela m’a guidé vers une composition qui laisse la **voiture au centre** et le décor tout autour.',
    ],
    labels: ['Observer la rue', 'Choisir un style'],
    image: { src: `${img}/inspiration.webp`, alt: 'Voiture de course devant une façade éclairée dans une rue de Tokyo', label: 'Inspiration' },
    extra: { src: `${img}/inspiration2.webp`, alt: 'Affiche typographique jaune avec une BMW qui dérape' },
    sticker: { src: `${img}/plaque.webp` },
    decor: [{ src: `${img}/logo-kanjozoku.webp`, side: 'left', width: '9rem', top: '6%', rotate: '-10deg' }],
  },
  film: {
    title: 'AMBIANCE TOKYO',
    src: '/videos/tokyo-rwb-video.mp4',
    poster: '/videos/tokyo-rwb-video-poster.webp',
    credit: 'Vidéo : ＫＡＮＪＯＺＯＫＵ — sɛɴsɛɴ (YouTube). Présentée à titre d’illustration.',
  },
  compare: {
    title: 'AVANT / APRÈS',
    // Les deux images ont exactement la même taille et le même cadrage (voir scripts/process-project-images.mjs)
    ratio: '1400 / 1980',
    before: { src: `${img}/avant.webp`, alt: 'Photographie d’origine : Porsche 911 RWB sur un passage piéton à Tokyo', label: 'Photo d’origine' },
    after: { src: `${img}/apres.webp`, alt: 'Affiche concept finale : la 911 RWB, textes japonais et étoile jaune', label: 'Affiche finale' },
    paragraphs: [
      'Je suis parti d’**une seule photographie** : la 911 RWB sur le passage piéton, devant une façade pleine d’enseignes.',
      'J’ai gardé le décor en l’état et ajouté de **grands textes verticaux en japonais**, une couronne et une étoile jaune derrière la voiture pour la faire ressortir.',
      'Le **jaune** relie l’ensemble : il reprend le ton des enseignes et donne à l’affiche un côté **magazine japonais** des années 90.',
    ],
  },
  next: { slug: 'projets', label: 'Tous mes projets' },
};

export default page;
