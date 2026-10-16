# Portfolio — Enzo Loddo

Portfolio en **Astro** + **Tailwind CSS v4**, avec des projets gérés dans **PocketBase**.
Direction artistique : terminal d'aéroport (Departures / Arrivals). Maquette : Figma « Portfolio Enzo Loddo – v2 ».

## Démarrage

```sh
npm install
cp .env.example .env   # puis adapter PUBLIC_POCKETBASE_URL
npm run dev            # http://localhost:4321
```

Sans serveur PocketBase, le site utilise les projets de `src/data/fallback-projects.ts`.

| Commande | Action |
| :-- | :-- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build statique dans `dist/` |
| `npm run preview` | Prévisualiser le build |

## Arborescence

```text
src/
├── assets/            images et icônes importées par les composants
├── components/
│   ├── layout/        Header (DEPARTURES / ARRIVALS), Footer
│   ├── ui/            Button, SectionBar, Icon, SocialLinks, ImageOrPlaceholder
│   ├── board/         FlightBoard, FlightRow (tableau des départs)
│   ├── projects/      ProjectCard
│   └── about/         PolaroidCarousel
├── data/              site.ts (textes validés), fallback-projects.ts
├── layouts/           BaseLayout.astro
├── lib/               pocketbase.ts, projects.ts
├── pages/             index, me-decouvrir, contact, projets/, 404
├── styles/global.css  tokens de design (@theme)
└── types/             project.ts
public/images/         visuels statiques (Polaroïd, décors)
docs/                  schéma PocketBase
```

## Règles de design (retours du jury)

- 2 polices : Oswald (titres, tableau) et Inter (texte).
- Corps de texte ≥ 16 px, paragraphes alignés à gauche, aucun titre souligné.
- Texte courant en blanc ou gris clair ; le jaune sert aux accents.
- Papier déchiré = décor uniquement, jamais un conteneur de texte.
- Tous les styles passent par les tokens de `src/styles/global.css`.

## À compléter

- URLs Instagram et LinkedIn dans `src/data/site.ts`.
- Photos du Polaroïd (`public/images/polaroid/`) et visuels des projets.
- Création de la collection `projets` dans PocketBase (voir `docs/pocketbase-schema.md`).
