DVPE.fiche({
  id: 5, direction: "DPE", statut: "publiée", debut: "2024-10", fin: "2026-04",
  court: "Intelligence artificielle",
  titre: "Intelligence artificielle : quelle carte pour Angers ?",
  sousTitre: "Hégémonie, croissance maîtrisée ou désaveu : trois futurs de l'IA et ce qu'ils changent pour le territoire",
  periode: "Oct. 2024 → avr. 2026",
  meta: ["A. Ascensi", "Cible : Angers Loire Métropole", "11 versions · synthèse 4 p."],
  depart: [
    "L'IA n'est plus une promesse : elle **restructure les chaînes de valeur** et redessine les métiers, que les territoires le veuillent ou non.",
    "Question posée : **quels secteurs gagneront ou souffriront à Angers**, et sur quels leviers le territoire peut-il agir ?"
  ],
  materiau: {
    chiffres: [
      { v: "≈ 200", l: "fichiers de travail" },
      { v: "59", l: "articles de presse veillés" },
      { v: "28", l: "schémas, dont analyse PESTEL" },
      { v: "11", l: "versions en 18 mois" }
    ],
    sources: "FMI, Cour des comptes, OPECST, rapport Villani, McKinsey, France Digitale, Insee, panoramas du cabinet SVP, signaux faibles. Livrables : dossier complet, synthèse 4 pages, débat audio."
  },
  diagnostic: {
    titre: "Ce que disait le diagnostic (2026)",
    chiffres: [
      { v: "60 %", l: "des emplois des économies avancées affectés par l'IA (FMI)" },
      { v: "36 200", l: "salariés du numérique en Pays de la Loire, 1 725 établissements" },
      { v: "46 %", l: "de l'empreinte carbone numérique française due aux data centers" },
      { v: "10 %", l: "des emplois numériques régionaux en Maine-et-Loire, contre 79 % en Loire-Atlantique" }
    ]
  },
  scenarios: {
    titre: "Trois scénarios",
    note: "Ils ne s'excluent pas : chacun existe déjà en germe",
    liste: [
      { lettre: "A", nom: "L'hégémonie", role: "l'IA, interface universelle", couleur: "bleu",
        texte: "Agents autonomes et mandataire numérique unique. Quelques géants imposent leurs standards à toutes les industries.",
        plus: "majeurs de l'IA, santé, info-télécoms",
        moins: "commerce de proximité, middle-management",
        carte: "réveiller le tissu électronique pour l'IA embarquée." },
      { lettre: "B", nom: "La croissance continue", role: "l'IA se spécialise", couleur: "vert",
        texte: "IA de niche interconnectées, IA embarquée généralisée. L'Europe impose ses standards, les PME éditrices trouvent leur place.",
        plus: "IA de niche, robotique, électronique embarquée",
        moins: "salariés qui décrochent, commerce",
        carte: "intégrateur de niche, connecteur des PME locales." },
      { lettre: "C", nom: "Le déclin", role: "le désaveu et la Rétro-IA", couleur: "brun",
        texte: "Scandales et saturation de contenus : retour aux interactions de proximité, outils sobres et locaux.",
        plus: "commerce de proximité, savoir-faire locaux",
        moins: "géants de l'IA, industrie électronique",
        carte: "pionnier d'un numérique sobre et ancré localement." }
    ]
  },
  bloc5: {
    titre: "Le produit : dynamique des secteurs", type: "grille",
    entete: "Secteur", colonnes: ["A", "B", "C"],
    lignes: [
      ["Majeurs de l'IA", "+", "+", "-"],
      ["IA de niche", "+", "+", "="],
      ["Électronique embarquée", "+", "+", "="],
      ["Industrie électronique", "-", "+", "-"],
      ["Commerce de proximité", "-", "-", "="],
      ["Services administratifs", "-", "=", "="],
      ["Santé", "+", "=", "-"],
      ["Enseignement", "=", "=", "-"]
    ],
    legende: { plus: "croissance", neutre: "adaptation ou recomposition", moins: "contraction", lecture: "Grille complète : 11 secteurs dans la synthèse." }
  },
  reel: {
    titre: "Six mois après : premier signal",
    items: [
      { date: "Juil. 2026", texte: "L'omnibus numérique reporte les obligations de l'AI Act pour l'IA à haut risque d'août 2026 à décembre 2027. L'Europe régulatrice du scénario B marque le pas." }
    ],
    liste: {
      titre: "Les questions qui décideront :",
      items: [
        "ETI et PME saisiront-elles la fenêtre ?",
        "Les écoles formeront-elles assez vite des profils hybrides ?",
        "La dépendance aux plates-formes extra-européennes sera-t-elle contenue ?"
      ]
    },
    apport: "pas un pronostic, mais une carte à jouer pour ALM dans chaque futur, et la question « si ce scénario se réalisait, serions-nous prêts ? »"
  },
  source: "Sources détaillées : « Prospective Intelligence artificielle » v11 et synthèse 4P (avril 2026)"
});
