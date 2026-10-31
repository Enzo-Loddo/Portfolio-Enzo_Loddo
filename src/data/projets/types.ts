/**
 * Types du contenu d'une page projet « grand format » (modèle ProjectPage).
 * Chaque projet a son fichier dans ce dossier (ex. compton.ts) : on n'y change que le contenu.
 *
 * Disposition (identique pour chaque projet) :
 *  1. Couverture fixe plein écran — recouverte par la suite au défilement
 *  2. Synopsis + citation
 *  3. Note de l'auteur + recherches (image d'inspiration)
 *  4. Vidéo (cadre déchiré) — facultatif
 *  5. Comparateur avant / après — facultatif
 *  6. Projet suivant
 */
export interface ProjectPageContent {
  slug: string;
  /** Titre affiché en grand (H1) et dans l'onglet */
  title: string;
  /** Description pour les moteurs de recherche */
  description: string;
  /** Direction artistique propre au projet : couleurs (la disposition, elle, ne change pas). */
  theme: {
    /** Fond de la page */
    bg: string;
    /** Fond des blocs mis en avant (bande défilante, section recherches) */
    panel: string;
    /** Couleur d'accent : titres, repères, boutons */
    accent: string;
    /** Couleur du texte courant sur le fond de page */
    text: string;
    /** Mots clés mis en valeur sur le fond de page */
    key: string;
    /** Texte et mots clés sur les blocs `panel` */
    onPanel: string;
    onPanelKey: string;
    muted: string;
    /** Fond du pied de page */
    footer: string;
    /** Habillage « VHS » : lignes de balayage et décalage chromatique du titre (statique) */
    vhs?: boolean;
    /** Habillage « panneau routier » : cadres blancs arrondis et lueur de coucher de soleil */
    sign?: boolean;
  };
  /** Couverture : texte déjà intégré à l'image (cover.liveText = false) ou texte affiché en direct. */
  cover: {
    src: string;
    srcMobile?: string;
    alt: string;
    /** Si renseigné, affiché par-dessus l'image (utile quand le texte n'est pas dans l'image). */
    liveText?: { eyebrow: string; title: string; place: string };
  };
  /** Ligne d'identification sous la couverture. */
  meta: { item: string; sujet: string; outils: string[] };
  intro: {
    kicker: string;
    /** Les mots entre ** ** sont mis en valeur. */
    synopsis: string;
    quote?: { text: string; author: string };
    note: string;
  };
  research: {
    title: string;
    paragraphs: string[];
    /** Titre court de chaque paragraphe (cartes numérotées) */
    labels: string[];
    image: { src: string; alt: string; label: string };
    /** Petit objet décoratif posé près de l'image (facultatif). */
    sticker?: { src: string };
    /** Seconde image, posée en biais sur la première (facultatif) */
    extra?: { src: string; alt: string };
    /** Décors qui flottent autour de la section (parallaxe) */
    decor?: { src: string; side: 'left' | 'right'; width: string; top: string; rotate: string }[];
  };
  film?: {
    title: string;
    /** Fichier vidéo hébergé (lecture auto, muette, avec boutons pause / son)… */
    src?: string;
    poster?: string;
    /** …ou identifiant YouTube (lecteur officiel, lecture auto muette). */
    youtube?: string;
    credit: string;
  };
  compare?: {
    title: string;
    /** Proportions des deux images, ex. « 2481 / 3508 » */
    ratio: string;
    before: { src: string; alt: string; label: string };
    after: { src: string; alt: string; label: string };
    paragraphs: string[];
  };
  next: { slug: string; label: string };
}

/** Découpe un texte en segments, les passages **gras** et *italiques* étant signalés. */
export function richSegments(text: string): { t: string; b?: boolean; i?: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((s) =>
      s.startsWith('**') ? { t: s.slice(2, -2), b: true } : s.startsWith('*') ? { t: s.slice(1, -1), i: true } : { t: s },
    );
}

