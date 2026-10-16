/** Statut affiché dans le tableau des départs. */
export type ProjectStatus = 'boarding' | 'on_time' | 'delayed';

export interface ProjectSection {
  titre: string;
  texte: string;
  /** URL d'image (PocketBase ou /public). Absent = bloc sans visuel. */
  image?: string;
  imageAlt?: string;
}

export interface ProjectHero {
  surtitre: string;
  titre: string;
  lieu: string;
  image?: string;
}

/** Un projet = un enregistrement de la collection PocketBase `projets`. */
export interface Project {
  slug: string;
  /** Titre court affiché en H1 (ex. « CHARME »). */
  titre: string;
  /** Ligne du tableau des départs. */
  destination: string;
  heure: string;
  vol: string;
  statut: ProjectStatus;
  /** « ITEM #001 » */
  itemId: string;
  sujet: string;
  categorie: string;
  /** Paragraphes de description (page projet). */
  description: string[];
  visuel?: string;
  visuelAlt?: string;
  outils: string[];
  hero?: ProjectHero;
  citation?: { texte: string; auteur: string };
  sections?: ProjectSection[];
  video?: string;
  ordre: number;
  /** false = dossier en cours : carte visible mais pas de page. */
  publie: boolean;
}
