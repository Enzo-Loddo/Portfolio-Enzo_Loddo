import { projectPages } from '@/data/projets';

/** Projets qui ont une page grand format en plus de leur présentation. */
export const hasFullPage = (slug: string) => slug in projectPages;

/**
 * Où mène un projet dans la liste : sa petite page de présentation (visuel, description, outils).
 * Pour les projets qui ont une page grand format, cette présentation propose ensuite d'y accéder :
 * le visiteur n'est donc pas projeté directement dans la grande page.
 */
export const projectHref = (slug: string) => (hasFullPage(slug) ? `/projets/${slug}/apercu` : `/projets/${slug}`);
