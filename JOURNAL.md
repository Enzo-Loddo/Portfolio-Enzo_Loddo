# JOURNAL.md : journal de bord du portfolio

Projet individuel du semestre 3, Enzo Loddo (BUT MMI 2). Une dizaine de lignes par semaine : ce qui a été fait, ce qui a coincé, ce qui a été décidé.

> **État : brouillon à compléter.** Les faits (dates des commits, contenus des pages) viennent de l'historique Git et des conversations de travail. Les passages **[À COMPLÉTER]** concernent ce que seul Enzo peut écrire (ressenti, difficultés, décisions personnelles, travail hors dépôt). Le journal doit rester celui d'Enzo : à relire et à reformuler avec ses mots.

## Avant le 12 octobre : conception (septembre à début octobre)

- Maquette Figma d'origine (accueil / menu, « Me découvrir », « Mes projets », contact, projet Brésil), concept « terminal d'aéroport » : Departures, Arrivals, jaune sur fond sombre.
- Soutenance maquette : retours du jury (deux polices, texte ≥ 16 px, contrastes, titres non soulignés, papier déchiré en décor, mobile en colonne).
- Maquette « v2 » créée avec l'aide de Claude pour intégrer ces corrections.
- Positionnement : je m'adresse à tout type d'entreprise, en priorité celles qui touchent à la création graphique et les équipes de chargés de communication. Le message à retenir : je suis quelqu'un qui aime casser les codes, toucher à tout et essayer, et surtout qui aime faire découvrir son univers aux autres. Ce qui me distingue : l'idée d'un aéroport avec plusieurs destinations pour faire découvrir mes créations.
- Moodboard réalisé sur Figma : plusieurs univers explorés (Windows 98, l'espace, les rêves…). Deux pistes graphiques écartées : Windows 98, parce que c'était trop commun ; un thème orienté mauve, parce qu'il était compliqué à lire.

## Semaine du 12 au 18 octobre : mise en place

- 16 oct. : création du dépôt, Astro + Tailwind + PocketBase, accueil et menu (base générée avec Claude).
- Décision : site statique, projets lus au build avec données de secours, pour pouvoir fonctionner sans serveur PocketBase.
- Accueil : tableau des vols animé, fond « tube cathodique », bandeau avec les heures de Montbéliard et de La Réunion, ajustements des textes (Check-in, sélection de 3 projets).
- Ce qui a coincé et ce que j'ai décidé: Modification des polices d'écritures ainsi que des couleurs du sites.

## Semaine du 19 au 25 octobre : « Me découvrir »

- 22 oct. : pages « Me découvrir » et premier projet.
- Scène animée en 5 états (profil, outils, contact, fin), photos de ma pellicule, décors découpés, panneau d'outils avec logos, carte de contact, version mobile.
- Hero : vidéo de La Réunion. Décisions : écarter les photos libres de droit, puis la vidéo YouTube (lecteur visible) au profit d'un fichier hébergé (CC BY 3.0, crédit affiché).
- Transition d'avion qui atterrit entre les pages.


## Semaine du 26 octobre au 1er novembre : pages projet

- 28 oct. : page Brésil (La Cité de Dieu) : couverture fixe recouverte par la page, bandeau, vidéo, avant/après. Page Tokyo (RWB).
- 31 oct. : page Compton, un fichier de contenu par projet et un gabarit commun ; palette propre à chaque projet.
- Décisions : même disposition pour les trois projets, direction artistique différente ; avant/après avec images exactement alignées (mesure du recadrage) ; vidéos en fichier local lancées automatiquement et sans le son.
- Retraits décidés pour alléger : bande défilante, fond rouge, pointillés guides, micro-animations.


## Semaine du 9 au 15 novembre : autres créations et finitions

- 13 nov. : photos des créations (Doris, Charme, Datsun, Enzo, Nike), liens cliquables (Instagram, LinkedIn, e-mail), bouton « Haut de page », barre de défilement du navigateur masquée, suppression du GIF d'avion hors des pages principales, changement de couleurs.
- Page « Mes projets » : la zone de stockage de la maquette a été jugée peu claire (remarque de la soutenance) ; cinq propositions comparées, vitrine « carte d'embarquement » choisie.
- Défilement fluide (Lenis) essayé puis supprimé : je préfère le défilement natif.
- Page de présentation de chaque création : galerie, plein écran, description, outils.


## Semaine du 16 au 18 novembre : mise en ligne

- 16 nov. : CV en PDF, textes des projets réécrits (Doris, Datsun, Enzo, Nike), icône du site, workflow GitHub Actions.
- Mise en ligne sur https://portfolio.enzo-loddo.fr : DNS chez Infomaniak, Apache et HTTPS (certbot) sur le VPS 018, secrets GitHub, déploiement automatique à chaque push sur `main`.
- Difficulté : le workflow a d'abord échoué sur `npm ci` (fichier verrou incomplet pour Linux), corrigé avec `npm install`.
- Maquette Figma refaite d'après le site (desktop et mobile) et prototype avec l'effet de couverture recouverte.

