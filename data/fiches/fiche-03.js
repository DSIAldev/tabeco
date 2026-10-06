DVPE.fiche({
  id: 3, direction: "DVPE", statut: "publiée", debut: "2023-01", fin: "2023-10",
  court: "Cloud et PME",
  titre: "Le cloud, solution d'avenir pour les PME ?",
  sousTitre: "Abonnement ou investissement, dépendance, souveraineté : trois futurs de l'informatique des entreprises",
  periode: "Janv. → oct. 2023",
  meta: ["A. Ascensi & M. Manceau", "Cible : PME du territoire", "1 livrable · 20 pages"],
  depart: [
    "Trois questions de chef d'entreprise : **le cloud est-il l'avenir des PME ?** L'abonnement est-il plus rentable que l'investissement ? Existe-t-il un seuil de rentabilité ?",
    "Au même moment, Aldev engage sa propre bascule : la démarche s'appuie sur **un cas réel vécu de l'intérieur**."
  ],
  materiau: {
    chiffres: [
      { v: "14", l: "références bibliographiques" },
      { v: "4", l: "études de fond (Insee, Direccte, Forrester, thèse)" },
      { v: "2", l: "bases d'analyse (datacenters, Tableau)" },
      { v: "9", l: "versions de travail en 10 mois" }
    ],
    sources: "Presse spécialisée (Les Échos, Usine Nouvelle, Le Monde Informatique, ZDNet), Statista, avis de l'Autorité de la concurrence, grilles tarifaires éditeurs, retour d'expérience de la migration Aldev."
  },
  diagnostic: {
    titre: "Ce que disait le diagnostic (2023)",
    chiffres: [
      { v: "74 %", l: "du marché mondial détenu par 4 acteurs : Amazon, Microsoft, Google, Alibaba" },
      { v: "80 %", l: "des données des entreprises européennes stockées chez des fournisseurs américains" },
      { v: "+40 %", l: "hausse d'une licence Microsoft 365 en 2 ans : des tarifs non négociables" },
      { v: "125 %", l: "du coût annuel : niveau possible des frais de sortie d'un contrat cloud" }
    ]
  },
  scenarios: {
    titre: "Trois scénarios",
    note: "Barre : crédibilité estimée par l'équipe en 2023",
    liste: [
      { lettre: "A", nom: "L'ère du cloud", role: "le scénario tendanciel", couleur: "bleu",
        barre: { type: "pct", valeur: 75 },
        texte: "Le marché mûrit : concurrence, licences simplifiées, interopérabilité, accord UE–États-Unis sur les données, datacenters de proximité.",
        plus: "conseil en SI, intégrateurs, hébergeurs de proximité",
        moins: "serveurs sur site, maintenance d'infrastructure" },
      { lettre: "B", nom: "La désaffection", role: "le scénario pessimiste", couleur: "brun",
        barre: { type: "pct", valeur: 5 },
        texte: "Cyberconflits, confiscation de données, « big bug » chez un géant : les entreprises rapatrient leurs serveurs.",
        plus: "salles serveurs, équipes informatiques internes",
        moins: "hébergeurs, éditeurs en ligne" },
      { lettre: "C", nom: "L'informatique distribuée", role: "le scénario alternatif", couleur: "vert",
        barre: { type: "pct", valeur: 20 },
        texte: "Tarifs en hausse, euro faible : micro-datacenters chauffants (université d'Angers, Qarnot), open source, applications réparties.",
        plus: "acteurs locaux, open source, start-up",
        moins: "hégémonie des géants du cloud" }
    ]
  },
  bloc5: {
    titre: "Le terrain : Aldev, de 0 à 100 % cloud", type: "matrice",
    entete: "Brique du SI", colonnes: ["2022", "mi-2024", "déc. 2025"],
    codes: { s: "sur site", l: "en ligne" },
    lignes: [
      ["Factures (Yooz)", "l", "l", "l"],
      ["Temps / RH (Kelio → Factorial)", "s", "l", "l"],
      ["Relation client (Sugar → We Share)", "s", "l", "l"],
      ["Messagerie (→ Microsoft 365)", "s", "l", "l"],
      ["Intranet (Le Link → SharePoint)", "s", "s", "l"],
      ["Fichiers partagés (→ SharePoint)", "s", "s", "l"],
      ["Comptes et mots de passe (→ Entra)", "s", "s", "l"],
      ["Salle serveur", "s", "s", "l"]
    ],
    note: "Bascule achevée en décembre 2025, sans recrutement informatique. Les enjeux identifiés (coûts, réversibilité, souveraineté, sécurité) ont servi de grille aux choix."
  },
  reel: {
    titre: "Trois ans après : le test du réel",
    items: [
      { date: "Juil. 2024", texte: "La panne mondiale CrowdStrike bloque des millions de postes Windows : le « big bug » du scénario B survient… sans provoquer de désaffection." },
      { date: "2024 – 2025", texte: "Loi SREN puis Data Act européen : crédits cloud et frais de sortie encadrés. Les verrous pointés en 2023 deviennent la cible du législateur." },
      { date: "Juin 2025", texte: "Devant le Sénat, Microsoft France ne peut garantir que les données échappent aux autorités américaines." },
      { date: "Juil. 2026", texte: "Nouvelle hausse Microsoft 365, jusqu'à +16 % sur les offres PME." }
    ],
    apport: "le scénario A l'emporte, mais sans ses conditions favorables (prix régulés, accord sur les données). Ce sont les vigilances des scénarios B et C, coûts et souveraineté, qui guident aujourd'hui les choix."
  },
  source: "Source détaillée : « Prospective infonuagique ou le devenir du cloud ? » (oct. 2023, 20 p.)"
});
