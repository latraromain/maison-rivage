# Maison Rivage

Thème Shopify (Online Store 2.0) pour Maison Rivage, marque de lunettes de soleil premium.

Basé sur [Dawn](https://github.com/Shopify/dawn), le thème officiel de Shopify, personnalisé avec :

- une palette éditoriale ivoire / noir / laiton et une typographie Playfair Display + Inter
- des sections sur-mesure : bandeau de confiance (`trust-badges`), avis clients (`testimonials`), galerie sociale (`social-gallery`)
- une page d'accueil, une fiche produit et une page collection pré-remplies, entièrement modifiables section par section dans le Theme Customizer Shopify, comme n'importe quel thème classique
- le français comme langue par défaut (`locales/fr.default.json`)

## Importer le thème dans une boutique Shopify

Ce thème vit dans un repo de code ; il doit être poussé vers une boutique Shopify pour être visible et modifiable dans le Theme Customizer.

### Option 1 — Shopify CLI (recommandé)

```bash
npm install -g @shopify/cli @shopify/theme
shopify theme dev --store=ta-boutique.myshopify.com   # aperçu en local
shopify theme push --store=ta-boutique.myshopify.com  # publier comme brouillon
```

### Option 2 — Connecter le repo GitHub à Shopify

Dans l'admin Shopify : **Boutique en ligne → Thèmes → Ajouter un thème → Connecter depuis GitHub**, puis sélectionner ce repo et la branche `claude/shopify-dropshipping-uiux-sj584s`. Chaque push met alors à jour le thème automatiquement.

### Option 3 — Zip manuel

Télécharger le repo en `.zip` puis l'importer via **Boutique en ligne → Thèmes → Ajouter un thème → Importer un fichier zip**.

## Après l'import

1. Aller dans le Theme Customizer et ajouter votre logo (**Paramètres du thème → Logo**).
2. Uploader vos vraies photos produit dans les sections `image_banner`, `brand_story`, `collections_multirow` et `social_gallery` (des placeholders Shopify s'affichent tant qu'aucune image n'est choisie).
3. Créer les collections `aviateur`, `oeil-de-chat` et `ronde` (ou adapter les liens dans la section « Nos collections » sur la page d'accueil).
4. Chaque section reste éditable indépendamment dans le Customizer — glisser-déposer, dupliquer ou supprimer comme sur un thème Shopify classique.

## Structure

Structure standard d'un thème Shopify OS 2.0 : `layout/`, `templates/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`.

Sections sur-mesure ajoutées pour Maison Rivage : `sections/trust-badges.liquid`, `sections/testimonials.liquid`, `sections/social-gallery.liquid` (+ snippets `icon-trust.liquid`, `icon-star.liquid`).
