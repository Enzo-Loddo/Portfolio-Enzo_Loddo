/** Page projet « COMPTON - DRE » : contenu, couleurs et médias. La disposition vient de ProjectPage.astro. */
import type { ProjectPageContent } from './types';

const img = '/images/projets/compton';

const page: ProjectPageContent = {
  slug: 'compton',
  title: 'COMPTON - DRE',
  description: 'Compton - Dre : fausse couverture du magazine XXL, hommage à la West Coast.',
  // Gris anthracite uni, texte jaune, titres orange : contrastes très confortables.
  theme: {
    bg: '#2a2c2f',
    accent: '#ff9f1c',
    text: '#ffd23f',
    key: '#ffffff',
    onPanel: '#ffffff',
    onPanelKey: '#ffd23f',
    panel: '#2a2c2f',
    muted: '#c3c6ca',
    footer: '#161718',
    sign: true,
  },
  cover: {
    src: `${img}/couverture.webp`,
    srcMobile: `${img}/couverture-mobile.webp`,
    alt: 'Welcome in United States, California, Compton : vue de nuit sur une rue de Compton et les lumières de Los Angeles',
  },
  meta: { item: 'ITEM #001', sujet: 'Post Instagram', outils: ['Affinity'] },
  intro: {
    kicker: 'LE SUJET',
    synopsis:
      'Direction **Compton**, en **Californie**. C’est ici que **Dr. Dre** a grandi, et que le rap de la **West Coast** a trouvé sa voix, avec **Snoop Dogg**, **2Pac** et toute la scène **G-funk** des années 90.',
    note: 'J’ai voulu rendre hommage à cet univers en imaginant une **fausse couverture du magazine XXL** : un portrait de Dr. Dre en **noir et blanc**, pensé comme un **post Instagram**.',
  },
  research: {
    title: 'INSPIRATION & RECHERCHES',
    paragraphs: [
      'J’ai commencé par regarder de vraies **couvertures du magazine XXL** : le gros logo rouge en haut à gauche, un portrait cadré serré, un titre en grandes lettres et une liste de noms sur le côté. Ces **codes de la presse hip-hop** sont devenus ma base.',
      'Pour mon visuel, j’ai choisi un portrait en **noir et blanc**, plus intemporel. Le **rouge** du logo et du sous-titre ressort sur le gris, et j’ai ajouté des textes de vrai magazine pour que l’illusion soit **complète**.',
    ],
    labels: ['Étudier les couvertures XXL', 'Composer la couverture'],
    image: { src: `${img}/inspiration.webp`, alt: 'Couverture du magazine XXL avec 2Pac, bandana blanc et titre rouge', label: 'Inspiration' },
    extra: { src: `${img}/inspiration2.webp`, alt: 'Couverture du magazine XXL avec Snoop Dogg, « 40 years of hip-hop »' },
    sticker: { src: `${img}/radio.webp` },
    decor: [{ src: `${img}/impala.webp`, side: 'left', width: '13rem', top: '4%', rotate: '-6deg' }],
  },
  film: {
    title: 'CALIFORNIA LOVE — BEHIND THE SCENES',
    src: '/videos/compton-video.mp4',
    poster: '/videos/compton-video-poster.webp',
    credit: 'Vidéo : « California Love » (Behind The Scenes, 10-13 novembre 1995) — Makaveli Lives On (YouTube). Présentée à titre d’illustration.',
  },
  compare: {
    title: 'AVANT / APRÈS',
    // Les deux images ont exactement la même taille et le même cadrage (voir scripts/process-project-images.mjs)
    ratio: '1080 / 1350',
    before: { src: `${img}/avant.webp`, alt: 'Photographie d’origine : Dr. Dre en noir et blanc, appuyé contre une voiture, casquette Compton', label: 'Photo d’origine' },
    after: { src: `${img}/apres.webp`, alt: 'Fausse couverture XXL : Dr. Dre, titre DR.DRE et logo XXL rouge', label: 'Ma couverture' },
    paragraphs: [
      'Je suis parti d’**une seule photographie** en noir et blanc de Dr. Dre, appuyé contre une voiture, casquette « Compton » sur la tête.',
      'J’ai ajouté le **logo XXL**, le titre **DR.DRE** et les listes de noms, en reprenant la mise en page des vraies couvertures.',
      'Une **touche de rouge** sur le titre et le logo suffit : l’image reste sobre, très **presse hip-hop** des années 2000.',
    ],
  },
  next: { slug: 'projets', label: 'Tous mes projets' },
};

export default page;
