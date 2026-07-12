# Maison Rivage

Thème Shopify (Online Store 2.0) pour **Maison Rivage**, maison de lunettes de soleil premium — luxe discret, solaire, méditerranéen.

Basé sur [Dawn](https://github.com/Shopify/dawn), le thème officiel de Shopify, personnalisé pour la marque :

- palette crème / sable / noir / doré discret / blanc cassé, typographie Playfair Display (titres) + Inter (texte, menus, boutons)
- header transparent sur le hero de l'accueil, opaque au scroll
- pastilles de coloris natives + badge discret "Signature"/"Nouveau" sur les cartes produit
- accueil en 6 sections : hero, modèle phare, collection, univers de marque, réassurance, newsletter
- fiche produit optimisée conversion : pastilles, accordéon piloté par métachamps, barre "Ajouter au panier" fixe sur mobile
- panier en tiroir latéral avec réassurance
- français comme langue par défaut (`locales/fr.default.json`)

Le plan UX complet (arborescence, design system, hiérarchie des boutons, étapes) est dans `/root/.claude/plans/zesty-baking-spark.md` de la session de conception.

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

## Actions à faire dans l'Admin Shopify après l'import

Ces éléments sont des données de boutique, pas du code de thème — ils ne peuvent pas être créés depuis ce repo.

- [ ] **Logo** : Theme Customizer → Paramètres du thème → Logo.
- [ ] **Menus de navigation** : créer le menu `main-menu` (Nouveautés / Lunettes / La Maison / Journal / Contact), et en footer `footer` (navigation) + `footer-service-client` (livraison/retours, FAQ...).
- [ ] **Collections** : `lunettes` (collection complète, utilisée par la grille d'accueil et le header) et `nouveautes`.
- [ ] **Modèle phare** : dans le Customizer, section "Modèle phare" de l'accueil → choisir le produit à mettre en avant.
- [ ] **Coloris** : configurer un swatch (couleur ou image) pour chaque valeur de l'option "Couleur" de vos produits (Admin → Produits → réglages des options) — les pastilles sur les cartes et la fiche produit s'affichent automatiquement dès que c'est fait, sans code.
- [ ] **Badges éditoriaux** : ajouter le tag `Signature` ou `Nouveau` sur les produits concernés pour afficher le badge doré sur leur carte.
- [ ] **Métachamps produit** (Admin → Réglages → Données personnalisées → Produits), namespace `custom` — l'accordéon de la fiche produit les affiche automatiquement s'ils existent, avec un texte de repli sinon :
  - `dimensions` (texte)
  - `matieres` (texte)
  - `contenu_coffret` (liste de textes)
  - `details_verres` (texte enrichi)
  - `entretien` (texte enrichi)
- [ ] **Politiques légales** (Admin → Réglages → Politiques) : mentions légales, confidentialité, CGV — apparaissent automatiquement dans le footer une fois rédigées.
- [ ] **Photos produit** : à uploader sur chaque fiche produit (le hero et la section "Modèle phare" de l'accueil affichent des visuels tant qu'aucun produit/image n'est sélectionné).

## Structure

Structure standard d'un thème Shopify OS 2.0 : `layout/`, `templates/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`.

Sections et composants ajoutés ou étendus pour Maison Rivage :

- `sections/trust-badges.liquid`, `sections/testimonials.liquid`, `sections/social-gallery.liquid` — sections éditoriales sur-mesure (les deux dernières ne sont pas dans le parcours d'accueil par défaut mais restent ajoutables depuis l'éditeur)
- `sections/product-accordion.liquid` — accordéon produit piloté par métachamps
- `snippets/sticky-add-to-cart.liquid` + `assets/sticky-add-to-cart.js` — barre "Ajouter au panier" fixe sur mobile (réutilise le formulaire natif, ne le duplique pas)
- `snippets/icon-trust.liquid`, `snippets/icon-star.liquid` — icônes de réassurance et d'avis
- `snippets/card-product.liquid` — pastilles de coloris et badge Signature/Nouveau sur les cartes produit (étend le composant natif Dawn)
- `sections/header.liquid` — header transparent sur l'accueil, opaque au scroll (étend le composant natif Dawn)
- `snippets/cart-drawer.liquid` — bouton "Continuer mes achats" et réassurance dans le panier (étend le composant natif Dawn)

## Vérification

Le thème passe le linter officiel Shopify sans erreur introduite par ces personnalisations :

```bash
npx @shopify/cli theme check --path=.
```

(Les quelques avertissements restants viennent des traductions françaises officielles de Shopify elles-mêmes, dépassant une limite de longueur de nom propre à la certification Theme Store — sans impact sur le fonctionnement réel du thème.)
