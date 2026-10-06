# DPE · Aldev — site GitHub Pages

Direction de la Prospective économique (ex-DVPE, Direction Veille et Prospective Économiques, renommée en 2023).

## Structure
```
index.html            accueil DPE (3 entrées : Baromètre, Indicateurs d'agence, Prospectives)
barometre.html        page d'entrée vers TB01 / TB02
agence/               indicateurs.html (TB03), agence.js, agence.css, build_data.py/.ps1, data/*.csv
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

## Fiches : sigle de la direction
Champ `direction` de chaque fiche (`"DVPE"` ou `"DPE"`), affiché dans l'en-tête et le pied. Fiches 1 à 3 : DVPE ; 4 et suivantes : DPE.

## Indicateurs d'agence (TB03)
- Page écran, sélecteur d'année (lien direct : `indicateurs.html#2023`), imprimable depuis le navigateur.
- Données : `agence/data/` au même format long que le baromètre, plus une colonne `modalite` (ventilations) et `note`.
  - `dim_domaine.csv` : les 9 axes et leur ordre.
  - `dim_indicateur.csv` : codes ACC, FIN, EMA, INS, IMM, FIL, ESR, RSE, BUD ; `calcul` (ex. `ACC02/ACC01`) pour les taux recalculés ; `axes` pour les ventilations.
  - `dim_modalite.csv` : modalités par axe (nature, secteur, origine, filière, CPER, recettes, dépenses, budgets).
  - `fait_valeur.csv` : une ligne par indicateur × année × modalité ; territoire = Angers Loire Métropole (EPCI244900015) ; montants en k€.
- Ajouter une année : ajouter ses lignes dans `fait_valeur.csv`, puis lancer `build_data` pour le mode `file://`.
- Ruptures de série conservées sous des codes distincts : FIN01-02 (Initiative Anjou, jusqu'en 2022) / FIN03-04 (tous dispositifs, depuis 2023) ; ESR12 (CPER précédent) / ESR11 (2023) / ESR05 (CPER 2021-2027).
