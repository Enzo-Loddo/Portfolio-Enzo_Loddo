# IA.md : déclaration d'usage de l'intelligence artificielle

Projet individuel du semestre 3 : portfolio d'Enzo Loddo (BUT MMI 2, Montbéliard).
Site en ligne : https://portfolio.enzo-loddo.fr · Dépôt : https://github.com/Enzo-Loddo/Portfolio-Enzo_Loddo

> **État de ce document : brouillon à relire.** Il a été rédigé à partir de l'historique des conversations avec Claude. Les passages marqués **[À COMPLÉTER PAR ENZO]** concernent ce que seul Enzo peut confirmer (ce qu'il a lui-même écrit, modifié ou rejeté). Il doit être relu et corrigé avant le rendu : une déclaration inexacte est traitée comme une fausse déclaration.

## 1. Outils utilisés

| Outil | Version / mode | Usage |
| --- | --- | --- |
| **Claude** (Anthropic) | Claude Code dans l'application Claude pour Mac, avec accès au dossier du projet, au terminal, à un navigateur de prévision et à Figma | Assistant de développement, rédaction de code et de textes, déploiement, maquette Figma |
| Figma (via Claude) | Outil Figma relié à Claude (lecture et écriture du fichier de maquette) | Construction et mise à jour de la maquette et du prototype |

Aucun autre outil d'IA générative (ChatGPT, Copilot, Cursor, Midjourney…) n'a été utilisé. Les visuels de projets (affiches, posts), les photos et les vidéos ont été produits ou fournis par Enzo : **l'IA n'a généré aucune image de projet.**

## 2. Déclaration par étape

Légende : **Gardé** = repris tel quel · **Modifié** = repris puis corrigé · **Rejeté** = abandonné à la demande d'Enzo.

### Conception (septembre à octobre)

| Étape | Ce que l'IA a fait | Ce qu'Enzo a modifié, corrigé ou rejeté |
| --- | --- | --- |
| Remarques du jury et pistes de correction | Synthèse des retours du jury (polices, contrastes, taille de texte, titres non soulignés) et plan de corrections | Enzo a validé les corrections et les a appliquées à la maquette. Le positionnement, le moodboard (Figma) et les deux pistes écartées (Windows 98 et thème mauve) ont été faits par Enzo seul, sans IA. |
| Maquette Figma « v2 » | Création d'un fichier avec variables, styles de texte, composants (en-tête, pied de page, lignes de vols) et écrans desktop et mobile ; proposition de textes | Enzo a gardé ses textes actuels plutôt que les propositions de l'IA. Il a imposé la direction « terminal d'aéroport » et ses visuels |

### Réalisation (octobre à novembre)

| Étape | Ce que l'IA a fait | Ce qu'Enzo a modifié, corrigé ou rejeté |
| --- | --- | --- |
| Base du site Astro + Tailwind + PocketBase (16 oct.) | Génération de la structure du projet, de l'accueil et du menu (commit « base faite par IA ») | Enzo a ensuite fait modifier la quasi-totalité des textes, des couleurs et des animations. Ce qui reste de la base générée par l'IA : la structure du projet et le tableau des vols (composant `FlightRow`). Enzo a fait modifier le pied de page et le bouton de retour au menu (logo ARRIVALS). **Point à travailler avant la soutenance :** Enzo ne sait pas encore expliquer le fonctionnement du tableau des vols. |
| Accueil : tableau des vols, effet « flip », fond tube cathodique, bandeau, survols | Écriture du code CSS/JS des animations d'après le prototype Figma | Enzo a demandé de ralentir les effets, d'en ajouter, de changer les textes (« Check-in », sous-titres, sélection de 3 projets) et de retirer le bouton « Voir mes projets » |
| Page « Me découvrir » | Scène animée à 5 états, polaroïd, décors détourés, panneau d'outils, carte de contact, version mobile | Enzo a fourni les originaux, a fait déplacer des éléments, retirer l'avion blanc et des effets de survol, et a corrigé le texte de description. **Rejeté :** les photos libres de droit initiales (remplacées par une vidéo), puis une vidéo YouTube (remplacée par un fichier hébergé) |
| Vidéo de présentation de La Réunion | Recherche de vidéos libres, encodage, recadrage des bandes noires | Enzo a refusé des vidéos à licence restrictive (Mixkit), choisi la vidéo de Wikimedia (CC BY 3.0, auteur crédité) |
| Transition « atterrissage » (GIF d'avion) | Code de la transition et choix d'un GIF du domaine public | Enzo a demandé de la limiter à l'accueil, à « Me découvrir » et aux trois projets, et de garder sa durée d'origine |
| Pages projet (Brésil, Tokyo, Compton) | Gabarit commun (couverture fixe recouverte par la feuille, avant/après, vidéo, fin de page), un fichier de contenu par projet, palettes | **Rejeté par Enzo :** bande défilante rouge, fond rouge continu, dégradés, pointillés guides, barre de progression, micro-animations d'apparition (jugées lourdes), lecteur YouTube. Il a choisi les palettes de Tokyo (bleu nuit et orange) et de Compton (vert foncé puis gris) |
| Alignement des visuels avant/après | Mesure du recadrage de la photo d'origine dans l'affiche finale, par comparaison d'images | Enzo avait fourni les images ; il a demandé que le curseur ne « bouge » pas |
| Textes des pages projet | Rédaction de brouillons pour Tokyo et Compton à partir des visuels ; reprise des textes existants du Brésil et de Charme | Enzo a fourni ses propres textes pour Doris, Datsun, Enzo et Nike (l'IA les a seulement corrigés) ; la description « Charme » est de lui. Enzo a relu les textes de Tokyo et de Compton, en a réécrit la plupart des passages qui parlent de ses affiches, et confirme que le contenu est exact.  |
| Page « Mes projets » | Cinq propositions de disposition ; construction de la vitrine « carte d'embarquement » | Enzo a jugé la zone de stockage de sa maquette peu claire et a **choisi** la vitrine (option D) en demandant que l'ambiance aéroport reste présente |
| Pages de présentation des autres créations | Gabarit (galerie, plein écran, description, outils, navigation) | Enzo a fourni les visuels, les textes et les outils ; il a demandé la suppression de plusieurs éléments (bouton, effet de couverture) |
| Défilement fluide (bibliothèque Lenis) | Installation et intégration | **Rejeté par Enzo** : supprimé du site. Barre de défilement masquée à sa demande |
| Contact, liens et favicon | Intégration de la photo, liens Instagram/LinkedIn/e-mail, création de l'icône (avion jaune) | Enzo a fourni les URL et la photo |
| Figma : mise à jour de la maquette et prototype | Reconstruction des écrans du site en calques Figma, import des images, prototype (navigation, effet de couverture recouverte) | Enzo a choisi de refaire en calques modifiables et a validé la suppression des anciennes frames |

### Mise en ligne

| Étape | Ce que l'IA a fait | Ce qu'Enzo a fait ou décidé |
| --- | --- | --- |
| Hébergement et déploiement | Inspection du VPS, script d'installation Apache, workflow GitHub Actions (compilation puis envoi par rsync), correction d'une erreur `npm ci` | **Enzo** a saisi son mot de passe sudo, créé l'enregistrement DNS, lancé le script et certbot, ajouté les secrets GitHub et lancé le workflow. L'IA n'a jamais saisi de mot de passe ni de clé dans GitHub |
| Document de passation | Rédaction de `docs/HANDOFF.md` (résumé technique) | À relire |

## 3. Limites connues

- Plusieurs textes de présentation (Tokyo, Compton, descriptions courtes) ont été rédigés d'abord par l'IA d'après les images : à réécrire avec la voix d'Enzo.
- Des vidéos de tiers (bande-annonce de La Cité de Dieu, extraits de Compton et de Tokyo) sont présentées à titre d'illustration avec crédit ; les droits restent à leurs auteurs.
- Les contrôles de qualité (accessibilité, performance, référencement, mentions légales) font l'objet de `QUALITE.md`.
