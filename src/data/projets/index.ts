/** Les projets qui ont une page grand format (une par fichier dans ce dossier). */
import compton from './compton';
import laCiteDeDieu from './la-cite-de-dieu';
import tokyoRwb from './tokyo-rwb';
import type { ProjectPageContent } from './types';

export const projectPages: Record<string, ProjectPageContent> = {
  compton,
  'la-cite-de-dieu': laCiteDeDieu,
  'tokyo-rwb': tokyoRwb,
};
