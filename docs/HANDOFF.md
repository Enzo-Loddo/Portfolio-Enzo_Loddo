# Portfolio d'Enzo Loddo : document de passation (pour une autre IA)

Ce document résume tout le travail réalisé avec Claude Code sur ce dépôt, les choix faits, les règles données par Enzo et ce qui reste à faire. Il est écrit pour qu'une IA (ou un développeur) puisse reprendre le projet sans rien demander de ce qui a déjà été décidé.

- **Utilisateur** : Enzo Loddo, étudiant en BUT MMI (IUT « Marie et Louis Pasteur », Montbéliard), originaire de La Réunion. Il vise un stage ou une alternance (community manager et infographiste / designer). Il parle français : **toutes les réponses, les textes du site et les commentaires de code sont en français.**
- **Dépôt** : `/Users/enzoloddo/Desktop/Portfolio`, branche `feat/init-astro` (GitHub : `Enzo-Loddo/Portfolio-Enzo_Loddo`). La branche principale est `main`.
- **Maquette Figma (référence, lecture seule)** : fichier `IZWEcX0NawasXD1xaYOLyS` (page « Page 1 »). **Ne jamais modifier la maquette d'origine.** Frames utiles : `1:159` accueil/menu, `1:673/702/733/758` « Me découvrir » (4 états), `1:789` projet, `1:826` « Mes projets accueil », `1:865` « Mes projets 2 », `1:876` contact, `851:815` page Brésil.

---

## 1. Concept et contexte

Le portfolio reprend l'univers d'un **hall d'aéroport** : « DEPARTURES » (accueil, tableau des vols), « ARRIVALS » (pages intérieures, le logo ramène à l'accueil). Jaune `#F6DD0B` sur fond sombre.

La direction vient d'une soutenance où le jury (Xavier et Pascal) a fait des remarques. **Elles s'appliquent à tout le site :**
- Deux polices seulement : **Oswald** (titres, affichage) et **Inter** (texte courant), chargées via `@fontsource-variable`.
- Texte courant ≥ 16 px, aligné à gauche, **aucun titre souligné**, bons contrastes.
- Le papier déchiré sert de décor (jamais de ligne déchirée pour séparer des zones).
- Un visiteur qui ne connaît pas l'aéroport doit tout comprendre : le vocabulaire aéroport est un habillage, chaque mot reste clair (« Destination = le projet », « Vol = son numéro », « Porte = le type de création »).
- Hero de l'accueil et textes corrigés (voir `src/data/site.ts`).

---

## 2. Pile technique

- **Astro 7** en génération statique (`output: static`), **Tailwind CSS 4** (via `@tailwindcss/vite`, tokens dans `@theme` de `src/styles/global.css`), **PocketBase** optionnel (lu au build seulement).
- Node ≥ 22.22. Gestionnaire : **npm** (`package-lock.json`). Un `bun.lock` existe aussi : **ne jamais l'inclure dans un commit**.
- `AGENTS.md` : lancer le serveur de développement en arrière-plan (`astro dev --background`, puis `astro dev status|logs|stop`). Le site tourne sur `http://localhost:4321`.
- `sharp` (traitement d'images) et `/usr/local/bin/ffmpeg` (vidéos) sont utilisés par les scripts.
- Pas de bibliothèque d'animation : tout est en CSS et en petits scripts. **Lenis a été installé puis retiré à la demande de l'utilisateur** : le défilement est natif, aucun `scroll-behavior: smooth` global.

Commandes :
```bash
npm run dev        # développement
npm run build      # astro build + scripts/prune-dist.mjs (retire les dossiers `originaux` de dist/)
```

---

## 3. Arborescence utile

```
src/
  pages/            index, me-decouvrir, contact, 404
    projets/        index (vitrine) · compton/tokyo-rwb/la-cite-de-dieu.astro (pages grand format)
                    [slug].astro (présentation des autres créations) · [slug]/apercu.astro (présentation des 3 grands projets)
  components/
    layout/         Header, Footer, ArrivalsLogo
    board/          BoardStatusBar, FlightBoard, FlightRow, Flap (split-flap)
    about/          DiscoverStage (scène animée), DiscoverHero, HeroVideo, DiscoverMobile
    projet/         ProjectPage (grand format), ProjectSimple (présentation), BeforeAfter
    projects/       ProjectShowcase (vitrine « Mes projets »), ProjectCard (ancien, inutilisé)
    ui/             Button, Icon, ImageOrPlaceholder, SectionBar, SocialLinks
  data/
    site.ts         nom, e-mail, liens réseaux, navigation, textes d'accueil
    discover.ts     TOUT le contenu et la géométrie de « Me découvrir » + `transition` + `transitionPages`
    fallback-projects.ts   les 8 projets de la liste (source utilisée au build)
    projets/        types.ts (interface ProjectPageContent) + un fichier par grand projet + index.ts
  lib/              pocketbase.ts, projects.ts (PocketBase sinon fallback), project-links.ts (projectHref)
  scripts/          page-transition.ts, split-flap.ts
  layouts/BaseLayout.astro
  styles/global.css
scripts/            process-discover-images.mjs, process-project-images.mjs, hole-video-frame.mjs, prune-dist.mjs
public/             images (decouvrir, projets/<slug>, projets/commun, projets/liste, contact), videos, cv-enzo-loddo.pdf, .htaccess
docs/               pocketbase-schema.md, HANDOFF.md (ce fichier)
```

Chaque dossier `public/images/projets/<slug>/originaux/` contient les fichiers bruts fournis par Enzo et un `LISEZMOI.txt` (liste de ce qu'il faut déposer). **Ils ne sont pas publiés** (`prune-dist.mjs` les retire de `dist/`).

---

## 4. Design system

Tokens dans `global.css` : `--color-accent #f6dd0b`, `--color-stage #191b1c`, `--color-base #2c2c2c`, `--color-deep #0b0b0b`, `--color-surface #1a1a1a`, `--color-line #555`, `--color-ok #00e275`, `--color-late #ff666c`, etc. Échelles de texte `--text-*`. Classes utilitaires utiles : `.led`/`.glow` (lueur néon), `.blink-text`, `.crt` (fond cathodique), ticker, lignes de vol avec balayage au survol.

Règles de style données par Enzo :
- **Textes en jaune** avec les **mots clés en blanc** (`**mot**` dans les données). Aucun texte long en blanc pur.
- **Alléger** : il a demandé de retirer plusieurs micro-animations car « cela ralentit le site ». Éviter les effets de survol lourds, les ombres portées en `filter`, le flou, les animations au défilement et la parallaxe.
- Tout ce qui n'est pas demandé n'est pas ajouté ; en cas de doute, le faire valider d'abord.
- Les listes de fichiers à fournir se donnent sous forme de `LISEZMOI.txt` dans le dossier dédié.

Le logo **ARRIVALS** (SVG vectoriel de Figma) clignote au survol. Au survol, une pastille jaune « Retour à l'accueil » apparaît (classes `.home-link` / `.home-hint` dans `global.css`, utilisées dans `Header.astro` et `DiscoverStage.astro`).

La barre de défilement du navigateur est masquée sur tout le site (`scrollbar-width: none`).

---

## 5. Pages

### 5.1 Accueil (`index.astro`)
Tableau des départs : `BoardStatusBar` (heure, bandeau défilant), `FlightBoard`/`FlightRow` avec animation **split-flap** (`Flap.astro`, `split-flap.ts`), 3 vols projets (Compton, Tokyo, La Cité de Dieu) et 3 lignes de menu (statut « CHECK-IN »). Fond « tube cathodique » (CRT). Les lignes clignotent selon leur couleur, survol avec marqueur et balayage. Le défilement du bandeau ne se relance pas quand l'heure change.

### 5.2 « Me découvrir » (`me-decouvrir.astro`, `DiscoverStage.astro`, `data/discover.ts`)
Scène plein écran en **unités de maquette** : `--u = min(100vw/1280, 100dvh/891)`, avec trois ancrages gauche/centre/droite (`.a-l`, `.a-c`, `.a-r`). Cinq états (`data-state` 0 à 4) : 0 hero, 1 Profil, 2 Outils, 3 Contact, 4 Fin.
- **Hero** : vidéo de fond locale `reunion-hero.mp4/.webm` (« Aerial views of Réunion » de JSery Films, **CC BY 3.0**, recadrée en 1920×808 pour retirer les bandes noires incrustées ; crédit affiché en bas à droite). Billet d'embarquement, titre « LA RÉUNION » lettre par lettre, bouton « Embarquer ». Le hero se lève comme un rideau.
- **Décors** (fougères, hibiscus, cartes, polaroïds…) : découpes produites par `scripts/process-discover-images.mjs` (détourage par remplissage + masques alpha issus de Figma) dans `public/images/decouvrir/`. Les photos gardent leur contour blanc.
- Panneau d'outils avec logos (Figma, Affinity, Canva, VS Code, Astro, Gemini) et description au survol ; carte de contact avec puce de disponibilité, e-mail copiable, bouton CV (`/cv-enzo-loddo.pdf`, téléchargement) et bouton contact ; projecteur qui suit la souris ; légende des éléments ; indicateur d'étapes à droite (01–04) ; flèches de navigation à leur position d'origine de la maquette (grisées à 13 % à l'état final, comportement voulu).
- **Mobile** (< 768 px) : `DiscoverMobile.astro`, une colonne. Les pages desktop et mobile sont dans `me-decouvrir.astro` (`hidden md:block` / `md:hidden`).
- Cette page passe `header="none"` et `footer={false}` à `BaseLayout` (elle a son propre en-tête et son propre pied).

### 5.3 Transition de page « atterrissage »
`BaseLayout` contient l'overlay `#pt` (GIF `avion-atterrissage.gif`, légende, barre, 8 volets). `src/scripts/page-transition.ts` intercepte les clics internes. **La transition ne se joue que** entre l'accueil et `/me-decouvrir`, `/projets/compton`, `/projets/tokyo-rwb`, `/projets/la-cite-de-dieu` (dans les deux sens) : liste `transitionPages` dans `discover.ts`. Ailleurs, navigation normale. Durée : `transition.duration = 2900` ms (c'est la valeur voulue ; une version à 1,5 s a été refusée). Un indicateur `sessionStorage` (`pt`) et la classe `pt-held` (posée dans `<head>`) recouvrent la page d'arrivée avant que les volets se relèvent. Respecte `prefers-reduced-motion`. GIF : « Airplane Landing Timelapse » (Kingofthedead, domaine public, Wikimedia).

### 5.4 « Mes projets » (`projets/index.astro`, `ProjectShowcase.astro`)
Le concept **« vitrine »** a été choisi par Enzo parmi cinq propositions (l'ancien concept « zone de stockage / sachets » de la maquette a été jugé peu clair pour qui ne connaît pas l'aéroport). Un projet à la fois en grand, la sélection à droite :
- bandeau d'annonce, compteur « Vol 01 sur 08 », **carte d'embarquement** (destination, vol, porte = type, outils, statut) et tableau des vols cliquable (clic ou flèches haut/bas) ;
- une **série** (plusieurs visuels) a des vignettes sous le visuel ;
- statuts : « À l'heure » (le projet a une page), « Embarquement » (visuels seulement), « Retardé » (rien encore) ;
- le bouton « Embarquer pour ce projet » mène à `projectHref(slug)` : la **présentation** (`/projets/<slug>/apercu`) pour les 3 grands projets, la page de présentation `/projets/<slug>` pour les autres.

### 5.5 Les 3 grands projets (pages « grand format »)
Fichiers : `src/pages/projets/<slug>.astro` (minces : `BaseLayout` + `<ProjectPage page={...}>`), contenu et couleurs dans `src/data/projets/<slug>.ts` (interface `ProjectPageContent` dans `types.ts`). **Même disposition pour les trois, chacun sa direction artistique.**

Disposition (`ProjectPage.astro`) :
1. **Couverture fixe** plein écran (`position: fixed`, image `cover` cadrée vers le bas pour garder le texte incrusté lisible ; sur mobile, image entière avec fond assombri). Le contenu monte et la recouvre au défilement. **Aucune ligne déchirée** entre les deux.
2. Titre + pastilles (item, sujet, outils).
3. Synopsis (+ citation sur papier déchiré, facultative).
4. Bloc « INSPIRATION & RECHERCHES » : note, titre sur toute la largeur (une seule ligne), étapes numérotées, planche d'images (polaroïd seul, ou **duo** si `research.extra`), scotch, autocollant, décor flottant.
5. **Vidéo** dans un cadre déchiré (`commun/cadre-video.webp`, intérieur rendu transparent par `hole-video-frame.mjs`). Fichier `.mp4` local en **lecture automatique, muette, en boucle**, avec boutons Pause et Son au survol. (Pas de lecteur YouTube : refusé par l'utilisateur.)
6. **Avant / après** (`BeforeAfter.astro`) : poignée à glisser (champ `range` invisible, accessible au clavier). Les deux images doivent avoir **exactement la même taille et le même cadrage** pour que le décor ne bouge pas (voir §7).
7. Fin de page : carte « Envie de voir la suite ? » avec ligne de vol en pointillés et bouton « Tous mes projets → ».
8. Repères de section à droite (points cliquables, visibles ≥ 1100 px) ; pied de page opaque aux couleurs du projet (`--p-footer`) pour que la couverture fixe ne transparaisse pas.

Thème par projet (`theme` : `bg, panel, accent, text, key, onPanel, onPanelKey, muted, footer`, options `vhs`, `sign`), injecté en variables CSS `--p-*` :
- **La Cité de Dieu** (`la-cite-de-dieu.ts`) : noir, jaune, mots clés blancs. Vidéo : bande-annonce fournie par l'utilisateur.
- **Tokyo - RWB** (`tokyo-rwb.ts`) : bleu nuit presque noir `#070b14`, orange sodium `#e8962e`, texte `#e6c28a`, habillage **VHS statique** (lignes de balayage, léger décalage cyan/rouge sur les titres). Duo d'inspiration (rue + affiche BMW), plaque japonaise, logo Kanjozoku. Vidéo : extrait KANJOZOKU (sɛɴsɛɴ), 480×360 (4:3, recadré par `object-fit: cover`).
- **Compton - Dre** (`compton.ts`) : gris anthracite `#2a2c2f`, titres orange `#ff9f1c`, texte jaune `#ffd23f`, cadres blancs arrondis (`sign: true`, façon panneau routier américain). Fausse couverture du magazine XXL (Dr. Dre) ; planche d'inspiration = couvertures XXL de 2Pac et Snoop Dogg ; radio-cassette et Chevrolet lowrider détourés. Vidéo : « California Love (Behind The Scenes) » de Makaveli Lives On.

### 5.6 Pages de présentation (`ProjectSimple.astro`)
Petite page commune : titre en grand, pastilles, **galerie** (cadre blanc, scotch, vignettes, **plein écran au clic** via `<dialog>` avec flèches, compteur, Échap ; boîte de taille fixe pour éviter un bug de dimensionnement sous Safari), blocs « Description », « Outils utilisés » (logos jaunes de `discover.ts`) et « Infos du vol », navigation « Projet précédent / suivant », et (si `fullHref`) un bouton « Voir le projet en détail » vers la grande page. Le visuel n'a **pas** d'effet de couverture fixe (essayé puis retiré à la demande d'Enzo).
- `projets/[slug].astro` : sert les 5 autres créations (**Doris, Charme, Datsun, Enzo, Nike - Maxfly 2**), listées dans `fallback-projects.ts`, avec `galerie`, `description`, `outils`. (« Charme » est la série de 4 posts ; ce n'est plus l'ancien projet Compton.)
- `projets/[slug]/apercu.astro` : sert les 3 grands projets ; le texte est repris du synopsis et de la note de la grande page (marques `**` retirées), les outils de `meta.outils`.
- `project-links.ts` : `hasFullPage(slug)` et `projectHref(slug)`.

### 5.7 Contact et pied de page
- `contact.astro` : titre « ALLON MET LA MAIN ENSAMB* » (créole réunionnais, note en bas), liens (Instagram `https://www.instagram.com/3nzo_ldd/`, LinkedIn `https://www.linkedin.com/in/enzo-loddo-15338b398/`, mail `enzo.loddo05@gmail.com`) via `SocialLinks`, et la **photo d'Enzo à La Réunion** (`public/images/contact/enzo-reunion.webp`) dans un cadre blanc incliné avec scotch.
- `Footer.astro` : icônes, liens (Me découvrir, Mes projets, Contact), bouton **« Haut de page »** (défilement natif vers le haut), copyright.
- `404.astro` existe.

---

## 6. Données et contenu

- **Projets** : `getProjects()` (`src/lib/projects.ts`) lit PocketBase (collection `projets`, schéma dans `docs/pocketbase-schema.md`) ; s'il est injoignable, il utilise `src/data/fallback-projects.ts` (cas du build actuel : message « PocketBase injoignable… projets de secours », **normal**). Ordre : Compton (001), Tokyo (002), La Cité de Dieu (003), Doris (004), Charme (005), Datsun (006), Enzo (007), Nike (008).
- **Ajouter une création simple** : un objet dans `fallback-projects.ts` (+ images dans `public/images/projets/liste/` via le script) avec `publie: true`.
- **Ajouter un grand projet** : un fichier `src/data/projets/<slug>.ts`, l'ajouter à `src/data/projets/index.ts`, créer `src/pages/projets/<slug>.astro` (copier `compton.astro`), l'entrée dans `fallback-projects.ts`, et le slug dans `transitionPages` si la transition avion est voulue.
- **Textes des pages** : surtout rédigés par Claude à partir des visuels pour Tokyo et Compton (**à faire relire** : il a validé Charme et corrigé Doris, Datsun, Enzo, Nike lui-même). Les étapes « Observer la rue », « Choisir un style », « Étudier les couvertures XXL », « Composer la couverture » sont de Claude. Les textes du Brésil viennent de la maquette Figma.
- **Mots en gras** : `**mot**` (blanc, importance) et `*mot*` (italique) via `richSegments()` dans `types.ts`.

---

## 7. Scripts et traitement des médias

- `scripts/process-project-images.mjs <slug>` (slugs : `la-cite-de-dieu`, `tokyo-rwb`, `compton`, `liste`) convertit `public/images/projets/<slug>/originaux/*` en WebP. Règles par fichier : largeur, qualité, variante mobile, **`keyWhite`** (rend transparent le blanc relié aux bords), **`crop`** (extraction avant redimensionnement). Les noms sont normalisés (accents retirés, minuscules, espaces en tirets).
- **Avant/après alignés** : l'« avant » est recadré pour correspondre exactement à l'« après ». Les recadrages ont été **mesurés par corrélation d'images** : Tokyo `{left 2, top 76, width 729, height 1030}`, Compton `{left 7, top 37, width 1193, height 1492}`. Ils sont codés dans le script ; si l'utilisateur change une image, refaire cette mesure.
- `scripts/hole-video-frame.mjs <fichier.webp>` rend transparent l'intérieur noir du cadre vidéo. **Ne pas relancer le traitement de `cadre-video` à partir de l'original** : ce fichier est maintenant dans `public/images/projets/commun/` (avec `scotch.webp` et `papier-dechire.webp`), non géré par le script.
- Vidéos : encodées avec ffmpeg (H.264 `+faststart`, WebM VP9 pour le hero), recadrées si des bandes noires sont incrustées, avec affiche (`*-poster.webp`) extraite d'une image.
- Image du hero de « Me découvrir » : recadrage 1920×808, `object-fit: cover`.
- `scripts/prune-dist.mjs` (appelé par `npm run build`) supprime `dist/**/originaux` (~140 Mo) et les `.DS_Store`.

Crédits des médias : `public/videos/CREDITS.md` (GIF avion, vidéo hero, et mention que bande-annonce / extraits de Compton et Tokyo appartiennent à leurs auteurs).

---

## 8. Ce que l'utilisateur a décidé (et ne veut plus voir)

- Plus de zone « stockage / sachets » pour « Mes projets » : remplacée par la vitrine avec ambiance aéroport.
- Plus de GIF d'avion partout : seulement accueil ↔ Me découvrir et les 3 grands projets, durée 2,9 s.
- Plus de Lenis ni de défilement fluide ; barre de défilement masquée.
- Plus de dégradés de fond sur les pages projet, plus de bande défilante rouge, plus de lignes pointillées guides, plus de bord déchiré entre la couverture et le contenu, plus de barre de progression, plus de micro-animations d'apparition.
- Le bouton « Voir tous mes projets » a été retiré des pages de présentation.
- Pas de lecteur YouTube : toujours des fichiers `.mp4` locaux.
- Effet de couverture fixe sur les pages de présentation : essayé puis annulé.
- Flèches de navigation de « Me découvrir » : essai de déplacement annulé, elles restent à la position de la maquette.

---

## 9. État du dépôt, déploiement et points ouverts

**Git** : jusqu'au commit `53c704d` (« Ajout de mon CV en PDF »), l'utilisateur a commité lui-même. **Règles : ne commiter que si on le demande ; jamais de `git push` sans demande ; ne pas inclure `bun.lock`.** En attente de commit : `package.json` (script `build` avec `prune-dist.mjs`), `scripts/prune-dist.mjs`, `public/.htaccess`, `docs/HANDOFF.md`.

**Déploiement (Infomaniak, en cours, fait par l'utilisateur)** : hébergement web classique (Apache). `npm run build` produit `dist/` (≈ 56 Mo, 16 pages). Il faut envoyer **le contenu** de `dist/` (avec `.htaccess`, qui gère la 404, la compression et le cache) par FTP/SFTP à la racine du site, activer Let's Encrypt et la redirection HTTPS. PocketBase n'est pas déployé : le site fonctionne avec les données de secours. Prévu mais pas fait : renseigner `site: 'https://<domaine>'` dans `astro.config.mjs` (liens canoniques) une fois le domaine connu.

**À faire / à valider**
- Faire relire par Enzo les textes de Tokyo, Compton et des projets Doris, Datsun, Enzo, Nike (les outils indiqués « Affinity » pour ces derniers sont des hypothèses).
- Tokyo : le bloc « Outils utilisés » est vide (outils inconnus).
- Version **mobile** : les pages projet, la vitrine « Mes projets » et la page contact n'ont pas été vérifiées visuellement sur téléphone ; seule la mise en page responsive du code existe. `DiscoverMobile` est volontairement simple (la version Figma iPhone n'existe pas encore).
- Droits des vidéos de tiers (bande-annonce La Cité de Dieu, extraits Compton et Tokyo) : crédits affichés, mais les droits restent à leurs auteurs ; risque de retrait à l'adresse publique.
- La couverture de Tokyo n'a que 1280 px de large ; celle de Compton 1280 px également (un peu floues en plein écran).
- Les trois grands projets sont toujours accessibles directement depuis l'accueil (avec la transition). Seuls « Mes projets » et la navigation précédent/suivant passent par la présentation.

**Limites de l'environnement de test** : le navigateur intégré à Claude Code n'exécute pas `requestAnimationFrame` quand le panneau est masqué et fige les animations CSS ; les captures prises pendant une animation peuvent montrer un état intermédiaire. Safari a révélé un bug de dimensionnement de l'image du plein écran (corrigé par une boîte de taille fixe). Après modification de CSS en développement, ajouter `?v=N` à l'URL si le navigateur garde l'ancienne version.
