import { fallbackProjects } from '@/data/fallback-projects';
import type { Project, ProjectStatus } from '@/types/project';
import { pb } from './pocketbase';

const STATUTS: ProjectStatus[] = ['boarding', 'on_time', 'delayed'];

/** URL d'un fichier PocketBase (champ `file`). */
function fileUrl(record: any, filename?: string): string | undefined {
  return filename ? pb.files.getURL(record, filename) : undefined;
}

/** Convertit un enregistrement PocketBase en `Project`. */
function toProject(r: any): Project {
  return {
    slug: r.slug,
    titre: r.titre,
    destination: r.destination ?? r.titre,
    heure: r.heure ?? '--:--',
    vol: r.vol ?? '---',
    statut: STATUTS.includes(r.statut) ? r.statut : 'boarding',
    itemId: r.item_id,
    sujet: r.sujet,
    categorie: r.categorie ?? 'Design',
    description: String(r.description ?? '').split(/\n{2,}/).filter(Boolean),
    visuel: fileUrl(r, r.visuel),
    visuelAlt: r.visuel_alt || r.titre,
    outils: Array.isArray(r.outils) ? r.outils : [],
    hero: r.hero ?? undefined,
    citation: r.citation ?? undefined,
    sections: r.sections ?? undefined,
    video: r.video || undefined,
    ordre: r.ordre ?? 0,
    publie: Boolean(r.publie),
  };
}

let cache: Project[] | undefined;

/** Tous les projets triés par `ordre`. Retombe sur les données locales si PocketBase est injoignable. */
export async function getProjects(): Promise<Project[]> {
  if (cache) return cache;
  try {
    const records = await pb.collection('projets').getFullList({ sort: 'ordre', requestKey: null });
    cache = records.map(toProject);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[projects] PocketBase injoignable (${reason}), utilisation des projets de secours.`);
    cache = [...fallbackProjects].sort((a, b) => a.ordre - b.ordre);
  }
  return cache;
}

/** Projets ayant une page (publie = true). */
export async function getPublishedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.publie);
}
