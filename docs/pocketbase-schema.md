# Collection PocketBase : `projets`

Les projets sont lus **au build** (`src/lib/projects.ts`). Si PocketBase est injoignable,
le site utilise `src/data/fallback-projects.ts`.

| Champ | Type | Notes |
|---|---|---|
| `slug` | text, unique, requis | URL : `/projets/<slug>` |
| `titre` | text, requis | H1 de la page (ex. `CHARME`) |
| `destination` | text | Ligne du tableau (ex. `COMPTON - DRE`) |
| `heure` | text | `00:42` |
| `vol` | text | `DRE-92` |
| `statut` | select | `boarding`, `on_time`, `delayed` |
| `item_id` | text, requis | `ITEM #001` |
| `sujet` | text, requis | `Post Instagram` |
| `categorie` | text | `Design` |
| `description` | editor / text | Paragraphes séparés par une ligne vide |
| `visuel` | file (image) | Visuel principal |
| `visuel_alt` | text | Texte alternatif |
| `outils` | JSON | `["Affinity", "Figma"]` |
| `hero` | JSON | `{ "surtitre": "", "titre": "", "lieu": "" }` (optionnel) |
| `citation` | JSON | `{ "texte": "", "auteur": "" }` (optionnel) |
| `sections` | JSON | `[{ "titre": "", "texte": "", "image": "" }]` (optionnel) |
| `video` | url | URL d'embed (optionnel) |
| `ordre` | number | Tri croissant |
| `publie` | bool | `false` = carte visible, pas de page |

Règles d'accès : `listRule` et `viewRule` à vide (lecture publique), écriture réservée aux admins.
