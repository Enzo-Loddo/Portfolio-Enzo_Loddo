/**
 * Scène « Me découvrir » — données reprises de la maquette Figma
 * (page « Maquette », frames « Me découvrir 4 → 5 → 7 → 6 »), puis réorganisées :
 *  - le bloc Polaroïd (appareil, bande de photos, flèches, indication) est réduit à 85 %,
 *    remonté et collé au bord gauche de la page ;
 *  - chaque calque est ancré à gauche, au centre ou à droite pour que la scène occupe toute la fenêtre.
 *
 * Unité : 1 px de la maquette (scène de 1280 × 891). Les positions sont données par état (1 à 4).
 */

export const SCENE = { width: 1280, height: 891 } as const;
/** États : 0 = écran d'arrivée (héros), 1 à 4 = sections de la page. */
export const STATE_COUNT = 4;

type Pos = [number, number];
type Positions = [Pos, Pos, Pos, Pos];
export type Anchor = 'l' | 'c' | 'r';

const r2 = (n: number) => Math.round(n * 100) / 100;

/* ---------- Bloc Polaroïd : transformation depuis la maquette ---------- */
/** Échelle du bloc Polaroïd. */
export const S = 0.85;
/** Position de l'appareil dans la maquette (référence) et sur la nouvelle scène. */
const CAM_FIGMA = { x: 21, y: 557 };
const CAM_NEW = { x: 14, y: 505 };

/** Convertit un point de la maquette vers la scène (bloc Polaroïd). */
const lc = ([x, y]: Pos): Pos => [
  r2(CAM_NEW.x + (x - CAM_FIGMA.x) * S),
  r2(CAM_NEW.y + (y - CAM_FIGMA.y) * S),
];
const lcAll = (p: Positions): Positions => p.map(lc) as Positions;
const sc = (n: number) => r2(n * S);

/** Centre une image de taille (w, h) sur la boîte (bw, bh) mesurée dans Figma (rotation incluse). */
const centered = (boxes: Positions, bw: number, bh: number, w: number, h: number): Positions =>
  boxes.map(([x, y]) => [x + (bw - w) / 2, y + (bh - h) / 2]) as Positions;

const dir = '/images/decouvrir';

export interface SceneLayer {
  id: string;
  src: string;
  alt: string;
  /** Taille d'affichage en px de la scène. */
  w: number;
  h: number;
  pos: Positions;
  anchor: Anchor;
  /** Amplitude (px) du décalage suivant la souris : plus c'est grand, plus le calque semble proche. */
  depth: number;
  /** Léger balancement permanent (degrés, durée en s, origine de la rotation). */
  sway?: { deg: number; dur: number; origin: string; delay?: number };
  /** Légende affichée au survol. */
  label: string;
  /** Délai d'apparition après le héros (s). */
  enter: number;
}

/**
 * Calques d'arrière-plan, du plus bas au plus haut. Ils se déplacent à chaque état,
 * chacun sur sa propre distance (effet de profondeur).
 */
export const layers: SceneLayer[] = [
  {
    id: 'sunset',
    label: 'Couchers de soleil',
    src: `${dir}/coucher-soleil.webp`,
    alt: '',
    w: 530.5,
    h: 440.5,
    pos: centered([[195, 1993], [195, -30], [173, -345], [245, -971]], 525.8, 434.3, 530.5, 440.5),
    anchor: 'c',
    depth: 16,
    sway: { deg: 0.8, dur: 9, origin: '50% 50%', delay: 1 },
    enter: 0.9,
  },
  {
    id: 'basket',
    label: 'Artisanat de l’île',
    src: `${dir}/panier.webp`,
    alt: '',
    w: sc(335),
    h: sc(326),
    pos: lcAll([[239, 1198], [239, 1198], [239, 1198], [301, -839]]),
    anchor: 'l',
    depth: 10,
    enter: 0.9,
  },
  {
    id: 'church',
    label: 'Souvenirs de l’île',
    src: `${dir}/eglise.webp`,
    alt: '',
    w: 386.5,
    h: 301.5,
    pos: centered([[341, 1759], [318, 85], [296, -230], [368, -856]], 382.5, 294, 386.5, 301.5),
    anchor: 'c',
    depth: 14,
    sway: { deg: 0.7, dur: 8, origin: '50% 50%', delay: 0.4 },
    enter: 0.8,
  },
  {
    // L'image exportée est rognée par le haut de la frame Figma : on la cale en haut.
    id: 'fern-right',
    label: 'Végétation tropicale',
    src: `${dir}/fougere-droite.webp`,
    alt: '',
    w: 512,
    h: 319.5,
    pos: [[756, 0], [721, -876], [721, -876], [721, -876]],
    anchor: 'r',
    depth: 22,
    sway: { deg: 1.6, dur: 7, origin: '88% 0%' },
    enter: 0.6,
  },
  {
    id: 'fern-left',
    label: 'Végétation tropicale',
    src: `${dir}/fougere-gauche.webp`,
    alt: '',
    w: 479,
    h: 500,
    pos: centered([[525, 548], [826, -312], [482, -451], [544, -1253]], 478.9, 499.8, 479, 500),
    anchor: 'c',
    depth: 20,
    sway: { deg: 1.8, dur: 8, origin: '50% 100%', delay: 0.8 },
    enter: 0.7,
  },
  {
    // Rognée à droite par la frame Figma : cale sur le bord gauche.
    id: 'map',
    label: 'Mon île : La Réunion (974)',
    src: `${dir}/carte-reunion.webp`,
    alt: '',
    w: 510,
    h: 541,
    pos: [[771, 667], [771, 667], [937, 2], [833, -786]],
    anchor: 'r',
    depth: 10,
    sway: { deg: 0.5, dur: 11, origin: '0% 50%' },
    enter: 0.8,
  },
  {
    id: 'mountain',
    label: 'Les reliefs de l’île',
    src: `${dir}/montagne-nb.webp`,
    alt: '',
    w: 277,
    h: 374.5,
    pos: [[1004, 535], [1004, 535], [1170, -139], [1066, -927]],
    anchor: 'r',
    depth: 12,
    sway: { deg: 0.9, dur: 9, origin: '0% 50%', delay: 1.5 },
    enter: 1,
  },
  {
    id: 'hibiscus',
    label: 'L’hibiscus',
    src: `${dir}/hibiscus.webp`,
    alt: '',
    w: sc(212.5),
    h: sc(227.5),
    pos: lcAll([[348, 865], [348, 865], [348, 492], [410, -327]]),
    anchor: 'l',
    depth: 26,
    sway: { deg: 3, dur: 6, origin: '30% 100%' },
    enter: 1.1,
  },
];

/** Bande de 4 Polaroïds : un groupe qui défile derrière l'appareil. Toutes les cotes sont à 85 %. */
const stripFrames = [
  { y: 0, photo: { src: `${dir}/photo-1.webp`, x: 92, y: 53, w: 242, h: 323, alt: 'Enzo, portrait 1' } },
  { y: 463, photo: { src: `${dir}/photo-2.webp`, x: 92.5, y: 516, w: 241, h: 323, alt: 'Enzo, portrait 2' } },
  { y: 937, photo: { src: `${dir}/photo-3.webp`, x: 83, y: 990, w: 259, h: 323, alt: 'Enzo, portrait 3' } },
  { y: 1400, photo: { src: `${dir}/photo-4.webp`, x: 88, y: 1453, w: 242, h: 323, alt: 'Enzo, portrait 4' } },
];

export const strip = {
  w: sc(425),
  h: sc(1984),
  pos: lcAll([[32, 240], [33, -369], [33, -805], [32, -2128]]),
  backing: { x: sc(30), y: sc(30), w: sc(360), h: sc(1954) },
  frames: stripFrames.map((f) => ({
    y: sc(f.y),
    photo: { src: f.photo.src, alt: f.photo.alt, x: sc(f.photo.x), y: sc(f.photo.y), w: sc(f.photo.w), h: sc(f.photo.h) },
  })),
  frame: { src: `${dir}/cadre-polaroid.webp`, w: sc(425), h: sc(505) },
};

/** Appareil Polaroïd : fixe sur les états 1 à 3, il remonte et sort de l'écran à l'état 4. */
export const camera = {
  src: `${dir}/appareil-polaroid.webp`,
  w: sc(436),
  h: sc(287),
  // À l'état 4 l'appareil sort entièrement de l'écran par le haut
  pos: (() => {
    const p = lcAll([[21, 557], [21, 557], [21, 557], [21, 557]]);
    p[3] = [p[3][0], -sc(287) - 60];
    return p;
  })(),
  /** Position du flash sur l'appareil (en % de l'image) : sert à l'effet de flash. */
  flash: { x: 84.6, y: 70.6 },
};

/** Logo ARRIVALS (fixe, au centre) et flèches (fixes, à côté de l'appareil). */
export const header = { x: 406, y: 42, w: 475, h: 106 };
const arrowsAt = lc([458, 670]);
export const arrows = { x: arrowsAt[0], y: arrowsAt[1], size: sc(60) };

/** Indication « Clique » et petites flèches pointillées. */
export const hint = {
  label: lc([539, 714]),
  top: { pos: lc([527.2, 690.7]), w: sc(38.5), h: sc(25) },
  bottom: { pos: lc([527, 743]), w: sc(38.5), h: sc(25) },
};

export const texts = {
  title: 'Me découvrir',
  /** Description : `**mot**` met le mot en valeur (blanc, gras). */
  bio: {
    lead: 'Originaire de La Réunion, je conçois des projets à la fois innovants et visuellement captivants.',
    paragraphs: [
      'Étudiant en **BUT MMI** à Montbéliard, j’ai exploré le digital sous toutes ses formes, avec une spécialisation en **stratégie de communication** et en **design d’expérience** : des stratégies digitales globales aux **interfaces interactives**.',
      'Côté créatif, j’imagine des **affiches**, des **posts** et des contenus « story » pour les réseaux sociaux, pour expérimenter de nouvelles directions artistiques.',
    ],
    closing: 'Toujours à la recherche de nouveaux défis.',
  },
  hint: 'Clique',
  toolsTitle: 'LOGICIELS & OUTILS',
  ctaTitle: 'ALLON MET LA MAIN ENSAMB*',
  ctaNote: '* Unissons nos forces — « Allons mettre la main ensemble », en créole réunionnais.',
  ctaAvailability: 'Disponible pour un stage ou une alternance',
  ctaCopy: 'Copier',
  ctaCopied: 'Copié ✓',
  ctaCv: 'Télécharger mon CV',
  ctaContact: 'Me contacter',
};

/** Écran d'arrivée (héros) : vidéo aérienne de La Réunion, en fond (boucle muette). */
export const hero = {
  video: {
    mp4: '/videos/reunion-hero.mp4',
    webm: '/videos/reunion-hero.webm',
    poster: '/videos/reunion-hero-poster.webp',
  },
  videoLabel: 'Vidéo de présentation de La Réunion',
  credit: {
    text: 'Vidéo : JSery Films (CC BY 3.0)',
    href: 'https://commons.wikimedia.org/wiki/File:Aerial_views_of_R%C3%A9union.webm',
  },
  ticket: ['VOL RUN-974', 'PORTE 974', 'PLACE 01A'],
  lines: ['LA', 'RÉUNION'],
  subtitle: 'Là où tout a commencé',
  cta: 'Embarquer',
  cue: 'Clique ou fais défiler',
};

/** Transition de page : GIF d'un avion qui atterrit (accéléré), durée en ms avant le changement de page. */
export const transition = {
  gif: '/videos/avion-atterrissage.gif',
  duration: 2900,
  caption: 'ATTERRISSAGE EN COURS',
};

/** Étapes affichées dans l'indicateur de droite. */
export const steps = ['Profil', 'Outils', 'Contact', 'Fin'] as const;

/**
 * Les 6 logos d'outils : tuile jaune 123 × 123 + logo noir placé comme dans Figma.
 * `desc` et `tags` s'affichent dans le panneau d'information quand on survole la tuile.
 */
export const tools = [
  {
    name: 'Figma',
    src: `${dir}/logo-figma.png`,
    x: 743, y: 245,
    logo: { x: 26, y: 13, w: 71, h: 101 },
    desc: 'Mon outil de conception : maquettes, prototypes interactifs et design systems, du premier croquis à la présentation.',
    tags: ['Maquettes', 'Prototypage', 'UX / UI'],
  },
  {
    name: 'Affinity',
    src: `${dir}/logo-affinity.png`,
    x: 889, y: 245,
    logo: { x: 20, y: 13, w: 84, h: 97 },
    desc: 'Pour mes affiches et visuels : retouche photo, détourage, collages, grain et textures.',
    tags: ['Affiches', 'Retouche', 'Collage'],
  },
  {
    name: 'Canva',
    src: `${dir}/logo-canva.png`,
    x: 1035, y: 245,
    logo: { x: 2, y: 43, w: 119, h: 38 },
    desc: 'Pour produire vite des contenus réseaux sociaux et des supports de présentation.',
    tags: ['Posts', 'Stories', 'Présentations'],
  },
  {
    name: 'Visual Studio Code',
    src: `${dir}/logo-vscode.png`,
    x: 743, y: 390,
    logo: { x: 10, y: 10, w: 103, h: 104 },
    desc: 'Mon éditeur de code pour intégrer mes maquettes et développer le front-end.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    name: 'Astro',
    src: `${dir}/logo-astro.png`,
    x: 889, y: 390,
    logo: { x: 19, y: 8, w: 85, h: 107 },
    desc: 'Le framework de ce portfolio : des pages statiques ultra rapides, avec Tailwind CSS et PocketBase.',
    tags: ['Astro', 'Tailwind CSS', 'PocketBase'],
  },
  {
    name: 'Gemini',
    src: `${dir}/logo-etoile.png`,
    x: 1035, y: 391,
    logo: { x: 9, y: 9, w: 105, h: 105 },
    desc: 'Pour chercher des idées, structurer mes recherches et gagner du temps sur les tâches répétitives.',
    tags: ['Idées', 'Recherche', 'Assistance'],
  },
] as const;

/** Panneau d'information des outils (affiché sous les tuiles). */
export const toolsPanel = {
  x: 742,
  y: 560,
  w: 440,
  hint: 'Survole un logo pour voir à quoi je l’utilise.',
};

/** Lien du CV (à déposer dans public/). */
export const cvHref = '/cv-enzo-loddo.pdf';

/** Particules (poussière dorée) : générées une fois, de façon déterministe. */
export const dust = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 26 }, (_, i) => ({
    i,
    x: r2(rnd() * 100),
    y: r2(rnd() * 100),
    size: r2(2 + rnd() * 4),
    dur: r2(14 + rnd() * 18),
    delay: r2(-rnd() * 20),
    drift: r2(-40 + rnd() * 80),
  }));
})();

/** Découpe un texte en segments normaux / en valeur (`**gras**`). */
export function segments(text: string): { t: string; b: boolean }[] {
  return text
    .split('**')
    .map((t, i) => ({ t, b: i % 2 === 1 }))
    .filter((x) => x.t.length > 0);
}

/**
 * Découpe un texte en mots (chaque mot garde son statut « en valeur »).
 * `join` = true quand le mot est collé au suivant (ex. un point juste après un mot en gras).
 */
export function toWords(text: string): { w: string; b: boolean; join: boolean }[] {
  const segs = segments(text);
  return segs.flatMap((seg, si) => {
    const tokens = seg.t.split(' ').filter(Boolean);
    return tokens.map((w, i) => {
      const last = i === tokens.length - 1;
      const next = segs[si + 1];
      const join = last && !!next && !seg.t.endsWith(' ') && !next.t.startsWith(' ');
      return { w, b: seg.b, join };
    });
  });
}
