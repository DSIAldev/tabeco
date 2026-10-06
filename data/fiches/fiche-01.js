DVPE.fiche({
  id: 1, direction: "DVPE", statut: "publiée", debut: "2020-04", fin: "2021-12",
  court: "Covid-19",
  titre: "Covid-19 : quel territoire après la crise ?",
  sousTitre: "Reprise lente, rebond vert ou dislocation : trois trajectoires chiffrées pour Angers Loire Métropole, réajustées pendant la crise",
  periode: "Avr. 2020 → 2021",
  meta: ["A. Ascensi", "Note interne Aldev", "5 versions · 35 p. (juin 2020)"],
  depart: [
    "Printemps 2020 : l'économie s'arrête en quelques jours. Les scénarios nationaux (Futuribles, Banque de France, Insee) existent, mais **que deviennent-ils à l'échelle d'Angers Loire Métropole ?**",
    "La note les **projette sur le territoire**, secteur par secteur, et les met à jour au fil des données."
  ],
  materiau: {
    chiffres: [
      { v: "30", l: "références citées (version juin)" },
      { v: "≈ 150", l: "fichiers de données collectés" },
      { v: "4", l: "sources de scénarios nationaux" },
      { v: "5", l: "versions en un an" }
    ],
    sources: "Futuribles, Banque de France, Insee, FMI, Dares, Acoss, Unédic, Pôle emploi, Aura, chambres d'agriculture, base Sirene. Traitements Excel, Access et Tableau."
  },
  diagnostic: {
    titre: "Ce que disait le diagnostic (juin 2020)",
    chiffres: [
      { v: "−29 %", l: "de PIB en avril 2020 en France, au cœur du confinement (Insee)" },
      { v: "18 %", l: "des salariés des Pays de la Loire en chômage partiel dès mars" },
      { v: "−61 %", l: "de créations d'entreprises dans la région en début d'année" },
      { v: "≈ 40 %", l: "d'emplois non marchands à Angers Loire Métropole : un amortisseur" }
    ]
  },
  scenarios: {
    titre: "Trois scénarios chiffrés pour le territoire",
    note: "Barre : demandeurs cat. A fin 2021 · trait : niveau fin 2019 (18 000)",
    liste: [
      { lettre: "A", nom: "La reprise lente", role: "le scénario le plus probable", couleur: "bleu",
        barre: { type: "jauge", valeur: 27000, max: 45000, repere: 18000 },
        chiffre: "**27 000** demandeurs d'emploi cat. A fin 2021",
        texte: "PIB régional à −8 % en 2021 par rapport à 2019. Chômage à 12,5 % sur la métropole. Faillites contenues par les aides.",
        plus: "e-commerce, commerce de proximité, made in France",
        moins: "culture et événementiel, hôtellerie-restauration, transport" },
      { lettre: "B", nom: "Le rebond vert", role: "le scénario optimiste", couleur: "vert",
        barre: { type: "jauge", valeur: 22000, max: 45000, repere: 18000 },
        chiffre: "**22 000** demandeurs d'emploi cat. A fin 2021",
        texte: "Chute forte en 2020 puis relance verte soutenue par l'État : le PIB de 2021 revient au niveau de 2017.",
        plus: "agroalimentaire, santé, commerce en ligne, économie verte",
        moins: "tourisme, hôtellerie-restauration, transport" },
      { lettre: "C", nom: "La dislocation", role: "le scénario le moins probable", couleur: "brun",
        barre: { type: "jauge", valeur: 40000, max: 45000, repere: 18000 },
        chiffre: "**40 000** demandeurs d'emploi cat. A fin 2021",
        texte: "Deuxième vague, chômage de 15 à 18 %, faillites en série, économie informelle et tensions sociales.",
        plus: "commande publique, entraide et économie parallèle",
        moins: "TPE-PME, automobile, équipement, bâtiment" }
    ]
  },
  bloc5: {
    titre: "Une prospective en continu", type: "etapes",
    etapes: [
      { n: "1", titre: "Avr. 2020", sous: "1re esquisse" },
      { n: "2", titre: "Juin 2020", sous: "version de référence", etat: "actuel" },
      { n: "3", titre: "Oct. 2020", sous: "mise à jour" },
      { n: "4", titre: "Févr. 2021", sous: "4e jet, emploi et défaillances" },
      { n: "5", titre: "2021", sous: "5e mise à jour" }
    ],
    note: "D'avril à juin 2020, la chute du PIB du scénario optimiste est revue de −20 % à −8 %.",
    pistes: {
      titre: "Pistes pour le territoire",
      items: [
        { t: "Attractivité", d: "accueillir les urbains qui quittent les métropoles" },
        { t: "Emploi", d: "amplifier plate-forme RH et Café emploi" },
        { t: "Relocalisations", d: "capter les productions rapatriées en Europe" },
        { t: "Coopération", d: "simplifier les relations entre acteurs publics" }
      ]
    }
  },
  reel: {
    titre: "Six ans après : le test du réel",
    items: [
      { date: "PIB", texte: "−7,5 % en 2020 puis +6,4 % en 2021 en France : le profil du rebond (B), sans la reprise lente annoncée." },
      { date: "Relance", texte: "France Relance (sept. 2020) : 100 Md€, dont 30 Md€ pour la transition écologique." },
      { date: "Emploi", texte: "Chômage autour de 7 % fin 2022, au plus bas depuis 2008 : mieux que les trois scénarios." },
      { date: "Entreprises", texte: "Défaillances au plus bas en 2020-2021 grâce aux aides, rattrapage ensuite en 2023-2024." }
    ],
    apport: "le rebond (B) l'emporte pour l'activité. Tous les scénarios ont surestimé le chômage : l'ampleur des amortisseurs publics était la variable sous-estimée, corrigée au fil des mises à jour."
  },
  source: "Source détaillée : « Scénarios d'après crise Covid-19 », version de juin 2020 (35 p.), note confidentielle interne"
});
