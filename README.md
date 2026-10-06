# DVPE · Aldev — site GitHub Pages

## Structure
```
index.html            accueil DVPE (2 entrées : Baromètre, Prospectives)
barometre.html        page d'entrée vers TB01 / TB02
barometre/            TB01.html, TB02.html, app.js, style.css, build_data.py/.ps1, data/*.csv
prospectives.html     frise + catalogue des fiches (générés depuis les données)
fiche.html?n=N        gabarit unique d'une fiche (même structure pour toutes)
assets/dvpe.css       charte
assets/dvpe.js        chargement des données + rendu
data/prospectives.js  catalogue : DVPE.liste = [1, 2, …]
data/fiches/fiche-NN.js  contenu d'une fiche
```

## Ajouter une fiche
1. Copier `data/fiches/fiche-06.js` en `fiche-07.js`, mettre `id: 7` et le contenu.
2. Ajouter `7` dans `data/prospectives.js`.

Bloc 5 au choix : `etapes`, `grille` (▲●▼ par scénario), `matrice` (cases colorées), `statuts`.
Barre de scénario au choix : `jauge` (valeur + repère), `parts` (barre empilée), `pct`.
Balisage dans les textes : `**gras**`, `^exposant^`, `[à compléter]` (affiché en italique gris).

## Publier
Dépôt GitHub → Settings → Pages → Source : branche `main`, dossier `/ (root)`.
Fonctionne aussi en ouverture locale (double-clic), sans serveur.

## Baromètre (TB01, TB02)
- Aucune valeur en dur : tout vient de `barometre/data/*.csv` (format long, séparateur `;`, décimale `.`).
- Mise à jour : les runbooks remplacent les CSV, rien d'autre à toucher.
- Chargement : `fetch()` des CSV (GitHub Pages, SharePoint, serveur local). Si échec (ouverture `file://`), repli sur `data/data.js`,
  généré par `build_data.ps1` (PowerShell 7, appelable en fin de runbook) ou `build_data.py`. Le bandeau indique la source utilisée.
- Mention MAQUETTE : attribut `data-statut` de la div `#page` ; le vider pour la retirer.
- Impression : 1 page A4 (portrait TB01, paysage TB02), Ctrl+P, marges « aucune ».
