/**
 * Contenu des pages projet « grand format » (modèle ProjectPage).
 * Une seule mise en page pour tous les projets : on ne change que ce contenu.
 *
 * Disposition (identique pour chaque projet) :
 *  1. Couverture fixe plein écran — recouverte par la suite au défilement
 *  2. Synopsis + citation
 *  3. Note de l'auteur + recherches (image d'inspiration)
 *  4. Vidéo (cadre déchiré) — facultatif
 *  5. Comparateur avant / après — facultatif
 *  6. Projet suivant
 */
export interface ProjectPageContent {
  slug: string;
  /** Direction artistique propre au projet : couleurs (la disposition, elle, ne change pas). */
  theme: {
    /** Fond de la page */
    bg: string;
    /** Fond des blocs mis en avant (bande défilante, section recherches) */
    panel: string;
    /** Couleur d'accent : titres, repères, boutons */
    accent: string;
    /** Couleur du texte courant sur le fond de page */
    text: string;
    /** Mots clés mis en valeur sur le fond de page */
    key: string;
    /** Texte et mots clés sur les blocs `panel` */
    onPanel: string;
    onPanelKey: string;
    muted: string;
    /** Fond du pied de page */
    footer: string;
    /** Habillage « VHS » : lignes de balayage et décalage chromatique du titre (statique) */
    vhs?: boolean;
  };
  /** Couverture : texte déjà intégré à l'image (cover.liveText = false) ou texte affiché en direct. */
  cover: {
    src: string;
    srcMobile?: string;
    alt: string;
    /** Si renseigné, affiché par-dessus l'image (utile quand le texte n'est pas dans l'image). */
    liveText?: { eyebrow: string; title: string; place: string };
  };
  /** Ligne d'identification sous la couverture. */
  meta: { item: string; sujet: string; outils: string[] };
  intro: {
    kicker: string;
    /** Les mots entre ** ** sont mis en valeur. */
    synopsis: string;
    quote?: { text: string; author: string };
    note: string;
  };
  research: {
    title: string;
    paragraphs: string[];
    /** Titre court de chaque paragraphe (cartes numérotées) */
    labels: string[];
    image: { src: string; alt: string; label: string };
    /** Petit objet décoratif posé près de l'image (facultatif). */
    sticker?: { src: string };
    /** Seconde image, posée en biais sur la première (facultatif) */
    extra?: { src: string; alt: string };
    /** Décors qui flottent autour de la section (parallaxe) */
    decor?: { src: string; side: 'left' | 'right'; width: string; top: string; rotate: string }[];
  };
  film?: {
    title: string;
    /** Fichier vidéo hébergé (lecture auto, muette, avec boutons pause / son)… */
    src?: string;
    poster?: string;
    /** …ou identifiant YouTube (lecteur officiel, lecture auto muette). */
    youtube?: string;
    credit: string;
  };
  compare?: {
    title: string;
    /** Proportions des deux images, ex. « 2481 / 3508 » */
    ratio: string;
    before: { src: string; alt: string; label: string };
    after: { src: string; alt: string; label: string };
    paragraphs: string[];
  };
  next: { slug: string; label: string };
}

const base = '/images/projets/la-cite-de-dieu';
const tokyo = '/images/projets/tokyo-rwb';

export const projectPages: Record<string, ProjectPageContent> = {
  'la-cite-de-dieu': {
    slug: 'la-cite-de-dieu',
    theme: {
      bg: '#0e0e0e',
      panel: '#b3121c',
      accent: '#ffd400',
      text: '#ffd400',
      key: '#ffffff',
      onPanel: '#ffffff',
      onPanelKey: '#ffd400',
      muted: '#bdbdbd',
      footer: '#000000',
    },
    cover: {
      src: `${base}/couverture.webp`,
      srcMobile: `${base}/couverture-mobile.webp`,
      alt: 'Welcome in Brazil — Rio de Janeiro, Cidade de Deus : favela en noir et blanc devant le Christ Rédempteur',
    },
    meta: { item: 'ITEM #005', sujet: 'Affiche détournée', outils: ['Affinity Photo'] },
    intro: {
      kicker: 'LE FILM',
      synopsis:
        'Loin des cartes postales de **Copacabana**, *La Cité de Dieu* nous plonge dans la brutalité des **favelas de Rio** des années 70. On y suit les destins croisés de **Buscapé**, qui cherche à s’en sortir grâce à la photographie, et de **Zé Pequeno**, dont le plan de carrière consiste plutôt à devenir le plus grand baron de la drogue des favelas.',
      quote: {
        text: 'Je suis forcé d’étudier parce que j’aime pas travailler avec les muscles…',
        author: 'Buscapé',
      },
      note: 'Un chef-d’œuvre sorti en 2002 dont l’énergie chaotique m’a inspiré ce projet. La claque visuelle du film m’a directement poussé à revisiter son affiche avec une approche **collage brut** et un **rouge sang**.',
    },
    research: {
      title: 'INSPIRATION & RECHERCHES',
      paragraphs: [
        'La première étape a été de capturer **l’énergie et la tension** du film sans utiliser les codes d’une affiche classique. J’ai d’abord regroupé et découpé les scènes clés comme les pièces d’un puzzle ; mon objectif était aussi de montrer **l’évolution des personnages**.',
        'Ma recherche graphique s’est ensuite concentrée sur le **collage brut**, puis sur des photographies en **noir et blanc très contrastées** avec un grain marqué. Cette étape a permis de poser l’ambiance et le style « fanzine » avant d’entamer la composition finale.',
      ],
      labels: ['Capturer la tension', 'Tester le collage'],
      decor: [
        { src: `${base}/palmier.webp`, side: 'left', width: '9rem', top: '4%', rotate: '-8deg' },
      ],
      image: { src: `${base}/inspiration.webp`, alt: 'Planche d’inspiration : scènes du film découpées et assemblées', label: 'Inspiration' },
      sticker: { src: `${base}/appareil-nikon.webp` },
    },
    film: {
      title: 'SUPERBE FILM',
      src: '/videos/la-cite-de-dieu-bande-annonce.mp4',
      poster: '/videos/la-cite-de-dieu-bande-annonce-poster.webp',
      credit: 'Bande-annonce de La Cité de Dieu © Miramax / O2 Filmes — présentée à titre d’illustration.',
    },
    compare: {
      title: 'AVANT / APRÈS',
      ratio: '960 / 1282',
      before: { src: `${base}/comparateur-ma-creation.webp`, alt: 'Ma création : affiche en collage rouge et noir', label: 'Ma création' },
      after: { src: `${base}/comparateur-affiche-film.webp`, alt: 'Affiche officielle du film La Cité de Dieu', label: 'Affiche du film' },
      paragraphs: [
        'J’ai conçu ce visuel sur **Affinity** comme un puzzle rassemblant les scènes marquantes pour refléter l’ambiance du film.',
        'En plaçant côte à côte l’enfant et le gang armé, on comprend immédiatement **comment la favela transforme ses habitants**. Pour appuyer ce propos, les personnages ont été détourés et j’ai appliqué un filtre noir et blanc ainsi que du grain afin d’alourdir l’atmosphère.',
        'L’ensemble utilise une **typographie forte** sur un fond rouge. Ce rouge fait ressortir les éléments noirs tout en imposant instantanément la tension du film.',
      ],
    },
    next: { slug: 'projets', label: 'Tous mes projets' },
  },

  'tokyo-rwb': {
    slug: 'tokyo-rwb',
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
      src: `${tokyo}/couverture.webp`,
      srcMobile: `${tokyo}/couverture-mobile.webp`,
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
      image: { src: `${tokyo}/inspiration.webp`, alt: 'Voiture de course devant une façade éclairée dans une rue de Tokyo', label: 'Inspiration' },
      extra: { src: `${tokyo}/inspiration2.webp`, alt: 'Affiche typographique jaune avec une BMW qui dérape' },
      sticker: { src: `${tokyo}/plaque.webp` },
      decor: [{ src: `${tokyo}/logo-kanjozoku.webp`, side: 'left', width: '9rem', top: '6%', rotate: '-10deg' }],
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
      before: { src: `${tokyo}/avant.webp`, alt: 'Photographie d’origine : Porsche 911 RWB sur un passage piéton à Tokyo', label: 'Photo d’origine' },
      after: { src: `${tokyo}/apres.webp`, alt: 'Affiche concept finale : la 911 RWB, textes japonais et étoile jaune', label: 'Affiche finale' },
      paragraphs: [
        'Je suis parti d’**une seule photographie** : la 911 RWB sur le passage piéton, devant une façade pleine d’enseignes.',
        'J’ai gardé le décor en l’état et ajouté de **grands textes verticaux en japonais**, une couronne et une étoile jaune derrière la voiture pour la faire ressortir.',
        'Le **jaune** relie l’ensemble : il reprend le ton des enseignes et donne à l’affiche un côté **magazine japonais** des années 90.',
      ],
    },
    next: { slug: 'projets', label: 'Tous mes projets' },
  },
};

/** Découpe un texte en segments, les passages **gras** et *italiques* étant signalés. */
export function richSegments(text: string): { t: string; b?: boolean; i?: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((s) =>
      s.startsWith('**') ? { t: s.slice(2, -2), b: true } : s.startsWith('*') ? { t: s.slice(1, -1), i: true } : { t: s },
    );
}
