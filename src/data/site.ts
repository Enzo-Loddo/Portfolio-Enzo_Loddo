/** Contenu global du site. Source unique pour les textes validés. */
export const site = {
  name: 'Enzo Loddo',
  title: 'Enzo Loddo — Community Manager & Infographiste',
  description:
    'Portfolio d’Enzo Loddo, étudiant en BUT MMI à Montbéliard : community management, infographie et création de visuels. Recherche un stage ou une alternance.',
  kicker: 'ENZO LODDO — COMMUNITY MANAGER & INFOGRAPHISTE',
  heroTitle: ['LE WEB COMME', 'VOYAGE CRÉATIF.'],
  intro:
    'Je suis Enzo Loddo, étudiant en MMI à l’IUT « Marie et Louis Pasteur » à Montbéliard. Bienvenue dans mon Portfolio, un espace pensé pour vous faire découvrir mes projets et mon univers.',
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
    subtitle: 'Profil Community Manager, Infographiste',
  },
  {
    label: 'MES PROJETS',
    href: '/projets',
    time: '09:72',
    flight: 'HUB-00',
    subtitle: 'Catalogue complet des mes créations en tout genre',
  },
  {
    label: 'CONTACT',
    href: '/contact',
    time: '09:71',
    flight: 'HUB-01',
    subtitle: 'Profil Community Manager, Infographiste',
  },
] as const;
