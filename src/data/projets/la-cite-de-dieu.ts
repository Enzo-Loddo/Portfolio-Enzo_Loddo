/** Page projet « LA CITÉ DE DIEU » : contenu, couleurs et médias. La disposition vient de ProjectPage.astro. */
import type { ProjectPageContent } from './types';

const img = '/images/projets/la-cite-de-dieu';

const page: ProjectPageContent = {
  slug: 'la-cite-de-dieu',
  title: 'LA CITÉ DE DIEU',
  description: 'La Cité de Dieu : affiche détournée en collage brut et rouge sang, inspirée du film de 2002.',
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
    src: `${img}/couverture.webp`,
    srcMobile: `${img}/couverture-mobile.webp`,
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
      { src: `${img}/palmier.webp`, side: 'left', width: '9rem', top: '4%', rotate: '-8deg' },
    ],
    image: { src: `${img}/inspiration.webp`, alt: 'Planche d’inspiration : scènes du film découpées et assemblées', label: 'Inspiration' },
    sticker: { src: `${img}/appareil-nikon.webp` },
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
    before: { src: `${img}/comparateur-ma-creation.webp`, alt: 'Ma création : affiche en collage rouge et noir', label: 'Ma création' },
    after: { src: `${img}/comparateur-affiche-film.webp`, alt: 'Affiche officielle du film La Cité de Dieu', label: 'Affiche du film' },
    paragraphs: [
      'J’ai conçu ce visuel sur **Affinity** comme un puzzle rassemblant les scènes marquantes pour refléter l’ambiance du film.',
      'En plaçant côte à côte l’enfant et le gang armé, on comprend immédiatement **comment la favela transforme ses habitants**. Pour appuyer ce propos, les personnages ont été détourés et j’ai appliqué un filtre noir et blanc ainsi que du grain afin d’alourdir l’atmosphère.',
      'L’ensemble utilise une **typographie forte** sur un fond rouge. Ce rouge fait ressortir les éléments noirs tout en imposant instantanément la tension du film.',
    ],
  },
  next: { slug: 'projets', label: 'Tous mes projets' },
};

export default page;
