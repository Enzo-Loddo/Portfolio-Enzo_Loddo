/** Contenu global du site. Source unique pour les textes validés. */
export const site = {
  name: 'Enzo Loddo',
  title: 'Enzo Loddo — Designer Web & Directeur Artistique',
  description:
    'Portfolio d’Enzo Loddo, étudiant en BUT MMI à Montbéliard : design web, direction artistique et intégration créative. Recherche un stage ou une alternance.',
  kicker: 'ENZO LODDO — DESIGNER WEB & DIRECTEUR ARTISTIQUE',
  heroTitle: ['LE WEB COMME', 'VOYAGE CRÉATIF.'],
  intro:
    'Je suis Enzo Loddo, étudiant en MMI à l’IUT « Marie et Louis Pasteur » à Montbéliard. Je conçois des interfaces et des visuels, et je recherche un stage ou une alternance en agence UX/UI ou création web.',
  email: 'enzo.loddo05@gmail.com',
  /** TODO : renseigner les URLs réelles des réseaux. */
  socials: [
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'mail', label: 'E-mail', href: 'mailto:enzo.loddo05@gmail.com' },
  ],
  year: 2026,
} as const;

export const nav = [
  {
    label: 'ME DÉCOUVRIR',
    href: '/me-decouvrir',
    time: '09:74',
    flight: 'RUN-974',
    subtitle: 'Mon parcours, mon univers, La Réunion',
  },
  {
    label: 'MES PROJETS',
    href: '/projets',
    time: '09:72',
    flight: 'HUB-00',
    subtitle: 'Catalogue complet de mes créations en tout genre',
  },
  {
    label: 'CONTACT',
    href: '/contact',
    time: '09:71',
    flight: 'HUB-01',
    subtitle: 'Réseaux et e-mail',
  },
] as const;

export const bio = [
  'Originaire de La Réunion, j’ai toujours été animé par la volonté de concevoir des projets à la fois innovants et visuellement captivants. Mon parcours en BUT MMI à Montbéliard m’a permis d’explorer de nombreux domaines du digital, avec une spécialisation affirmée pour la stratégie de communication et le design d’expérience. J’ai eu l’opportunité de travailler sur des projets académiques variés, allant de l’élaboration de stratégies digitales globales au développement d’interfaces interactives.',
  'En parallèle de mes études, je nourris constamment ma créativité à travers divers projets personnels. Je conçois régulièrement des affiches, des posts et du contenu « story » pour les réseaux sociaux, ce qui me permet d’expérimenter de nouvelles directions artistiques en toute liberté. Je suis toujours à la recherche de nouveaux défis pour mettre en pratique mes compétences, continuer d’apprendre et donner vie à des concepts percutants.',
] as const;

/** Photos du Polaroïd. Déposer les fichiers dans public/images/polaroid/. */
export const polaroidPhotos = [
  { src: '', alt: 'Photo d’Enzo 1' },
  { src: '', alt: 'Photo d’Enzo 2' },
  { src: '', alt: 'Photo d’Enzo 3' },
  { src: '', alt: 'Photo d’Enzo 4' },
] as const;
