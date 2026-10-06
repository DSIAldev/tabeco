DVPE.fiche({
  id: 4, statut: "publiée", debut: "2023-02", fin: "2024-07",
  court: "Cybersécurité",
  titre: "Cybersécurité : PME et collectivités tiendront-elles le choc ?",
  sousTitre: "Menace en hausse, intelligence artificielle des deux côtés, obligations nouvelles : trois futurs à 10 – 15 ans",
  periode: "Févr. 2023 → juil. 2024",
  meta: ["A. Ascensi & M. Manceau", "Cible : PME et collectivités", "1 livrable · 50 pages"],
  depart: [
    "PME et petites collectivités n'ont souvent **ni responsable sécurité, ni budget dédié**, alors que les attaques se multiplient et que les JO 2024 approchent.",
    "Question posée : **la défense peut-elle rattraper l'attaque**, et à quelles conditions pour notre tissu de PME ?"
  ],
  materiau: {
    chiffres: [
      { v: "37", l: "références citées" },
      { v: "20", l: "rapports et articles archivés" },
      { v: "6", l: "schémas d'analyse, dont les variables" },
      { v: "2", l: "diagnostics internes Aldev" }
    ],
    sources: "ANSSI, CNIL, Cybermalveillance.gouv.fr, Institut Montaigne, CPME, Banque des Territoires, rapports Orange Cyberdefense, CrowdStrike, Splunk, SoSafe, presse (Les Échos, Ouest-France, Gazette des communes)."
  },
  diagnostic: {
    titre: "Ce que disait le diagnostic (2024)",
    chiffres: [
      { v: "+112 %", l: "d'attaques par rançongiciel entre janvier 2022 et juillet 2023" },
      { v: "187", l: "incidents dans les collectivités en 18 mois (ANSSI), soit 10 par mois" },
      { v: "25 076", l: "menaces avérées traitées en 2023 par Orange Cyberdefense" },
      { v: "72 h", l: "pour porter plainte, condition d'indemnisation par l'assureur (LOPMI)" }
    ]
  },
  scenarios: {
    titre: "Trois scénarios",
    note: "Hypothèse commune : bascule possible d'ici 2 à 5 ans",
    liste: [
      { lettre: "A", nom: "La course permanente", role: "le scénario tendanciel", couleur: "bleu",
        declencheur: "l'IA progresse pour l'attaque comme pour la défense.",
        texte: "Attaques via les fournisseurs. Les PME investissent et mutualisent (GIE, responsable sécurité partagé), aidées par l'État.",
        plus: "économie de la sécurité numérique, prestataires mutualisés",
        moins: "rentabilité des PME, confiance des clients envers les petites structures" },
      { lettre: "B", nom: "La submersion", role: "le scénario pessimiste", couleur: "brun",
        declencheur: "IA offensive et premiers ordinateurs quantiques déjouent toutes les protections.",
        texte: "Faillites de PME en cascade, retour du papier et des espèces. L'État légifère en urgence : logiciels certifiés, cloud étranger interdit pour les données sensibles.",
        plus: "éditeurs et hébergeurs français certifiés",
        moins: "commerce en ligne, PME dépendantes du numérique" },
      { lettre: "C", nom: "Le bouclier", role: "le scénario optimiste", couleur: "vert",
        declencheur: "IA défensive, clés d'accès sans mot de passe, sécurité intégrée dès la conception.",
        texte: "L'économie cybercriminelle s'effondre. Confiance retrouvée dans le numérique, la France devient une référence en sécurité.",
        plus: "commerce en ligne, innovation des PME",
        moins: "coûts de cybersécurité, marché de la cyberdéfense" }
    ]
  },
  bloc5: {
    titre: "Le miroir : Aldev en 2024", type: "statuts",
    entete: "Mesure de protection",
    lignes: [
      ["Annuaire, mots de passe, double authentification", "ok"],
      ["Charte et sensibilisation des salariés", "ok"],
      ["Pare-feu et filtrage réseau", "ok"],
      ["Antivirus sur tous les postes", "ok"],
      ["Chiffrement des données", "ok"],
      ["Sauvegarde 3-2-1", "partiel"],
      ["Mises à jour des postes", "partiel"],
      ["Politique de sécurité formalisée", "partiel"],
      ["Mises à jour des serveurs", "non"],
      ["Gestion automatisée des identités (IAM)", "non"],
      ["Registre des incidents", "non"],
      ["Surveillance et détection des menaces", "non"]
    ],
    note: "Auto-diagnostic intégré à l'étude : **5 mesures en place, 3 partielles, 4 à construire**."
  },
  reel: {
    titre: "Deux ans après : le test du réel",
    items: [
      { date: "Été 2024", texte: "JO de Paris : 548 événements cyber signalés à l'ANSSI, 83 intrusions réussies, aucune n'a perturbé les épreuves. La préparation paie." },
      { date: "2024", texte: "L'ANSSI traite 4 386 événements, +15 % sur un an : la courbe ne s'infléchit pas." },
      { date: "2026", texte: "NIS 2 toujours pas transposée, la France est renvoyée devant la Cour de justice de l'UE. 15 000 entités visées, dont près de 1 000 intercommunalités." },
      { date: "Aldev", texte: "Serveurs supprimés (déc. 2025), outil de crise cyber pour la direction, filtrage messagerie en bascule vers Defender." }
    ],
    apport: "le scénario A se confirme, la menace monte et la réponse passe par la préparation. L'auto-diagnostic de 2024 est devenu la feuille de route d'Aldev."
  },
  source: "Source détaillée : [intitulé du livrable à compléter] (juil. 2024, 50 p.)"
});
