// Généré par build.py depuis fiches/03-cloud.md : ne pas modifier ici.
DVPE.fiche({
  "id": 3,
  "direction": "DVPE",
  "statut": "publiée",
  "debut": "2023-01",
  "fin": "2023-10",
  "court": "Cloud et PME",
  "titre": "Le cloud, solution d'avenir pour les PME ?",
  "sousTitre": "Abonnement ou investissement, dépendance, souveraineté : trois futurs de l'informatique des entreprises",
  "periode": "Janv. → oct. 2023",
  "meta": [
    "A. Ascensi & M. Manceau",
    "Cible : PME du territoire",
    "1 livrable · 20 pages"
  ],
  "depart": [
    "Trois questions de chef d'entreprise : **le cloud est-il l'avenir des PME ?** L'abonnement est-il plus rentable que l'investissement ? Existe-t-il un seuil de rentabilité ?",
    "Au même moment, Aldev engage sa propre bascule : la démarche s'appuie sur **un cas réel vécu de l'intérieur**."
  ],
  "materiau": {
    "chiffres": [
      {
        "v": "14",
        "l": "références bibliographiques"
      },
      {
        "v": "4",
        "l": "études de fond (Insee, Direccte, Forrester, thèse)"
      },
      {
        "v": "2",
        "l": "bases d'analyse (datacenters, Tableau)"
      },
      {
        "v": "9",
        "l": "versions de travail en 10 mois"
      }
    ],
    "sources": "Presse spécialisée (Les Échos, Usine Nouvelle, Le Monde Informatique, ZDNet), Statista, avis de l'Autorité de la concurrence, grilles tarifaires éditeurs, retour d'expérience de la migration Aldev."
  },
  "diagnostic": {
    "titre": "Ce que disait le diagnostic (2023)",
    "chiffres": [
      {
        "v": "74 %",
        "l": "du marché mondial détenu par 4 acteurs : Amazon, Microsoft, Google, Alibaba"
      },
      {
        "v": "80 %",
        "l": "des données des entreprises européennes stockées chez des fournisseurs américains"
      },
      {
        "v": "+40 %",
        "l": "hausse d'une licence Microsoft 365 en 2 ans : des tarifs non négociables"
      },
      {
        "v": "125 %",
        "l": "du coût annuel : niveau possible des frais de sortie d'un contrat cloud"
      }
    ]
  },
  "scenarios": {
    "titre": "Trois scénarios",
    "note": "Barre : crédibilité estimée par l'équipe en 2023",
    "liste": [
      {
        "lettre": "A",
        "nom": "L'ère du cloud",
        "role": "le scénario tendanciel",
        "couleur": "bleu",
        "barre": {
          "type": "pct",
          "valeur": 75
        },
        "texte": "Le marché mûrit : concurrence, licences simplifiées, interopérabilité, accord UE–États-Unis sur les données, datacenters de proximité.",
        "plus": "conseil en SI, intégrateurs, hébergeurs de proximité",
        "moins": "serveurs sur site, maintenance d'infrastructure"
      },
      {
        "lettre": "B",
        "nom": "La désaffection",
        "role": "le scénario pessimiste",
        "couleur": "brun",
        "barre": {
          "type": "pct",
          "valeur": 5
        },
        "texte": "Cyberconflits, confiscation de données, « big bug » chez un géant : les entreprises rapatrient leurs serveurs.",
        "plus": "salles serveurs, équipes informatiques internes",
        "moins": "hébergeurs, éditeurs en ligne"
      },
      {
        "lettre": "C",
        "nom": "L'informatique distribuée",
        "role": "le scénario alternatif",
        "couleur": "vert",
        "barre": {
          "type": "pct",
          "valeur": 20
        },
        "texte": "Tarifs en hausse, euro faible : micro-datacenters chauffants (université d'Angers, Qarnot), open source, applications réparties.",
        "plus": "acteurs locaux, open source, start-up",
        "moins": "hégémonie des géants du cloud"
      }
    ]
  },
  "bloc5": {
    "titre": "Le terrain : Aldev, de 0 à 100 % cloud",
    "type": "matrice",
    "entete": "Brique du SI",
    "colonnes": [
      "2022",
      "mi-2024",
      "déc. 2025"
    ],
    "codes": {
      "s": "sur site",
      "l": "en ligne"
    },
    "lignes": [
      [
        "Factures (Yooz)",
        "l",
        "l",
        "l"
      ],
      [
        "Temps / RH (Kelio → Factorial)",
        "s",
        "l",
        "l"
      ],
      [
        "Relation client (Sugar → We Share)",
        "s",
        "l",
        "l"
      ],
      [
        "Messagerie (→ Microsoft 365)",
        "s",
        "l",
        "l"
      ],
      [
        "Intranet (Le Link → SharePoint)",
        "s",
        "s",
        "l"
      ],
      [
        "Fichiers partagés (→ SharePoint)",
        "s",
        "s",
        "l"
      ],
      [
        "Comptes et mots de passe (→ Entra)",
        "s",
        "s",
        "l"
      ],
      [
        "Salle serveur",
        "s",
        "s",
        "l"
      ]
    ],
    "note": "Bascule achevée en décembre 2025, sans recrutement informatique. Les enjeux identifiés (coûts, réversibilité, souveraineté, sécurité) ont servi de grille aux choix."
  },
  "reel": {
    "titre": "Trois ans après : le test du réel",
    "items": [
      {
        "date": "Juil. 2024",
        "texte": "La panne mondiale CrowdStrike bloque des millions de postes Windows : le « big bug » du scénario B survient… sans provoquer de désaffection."
      },
      {
        "date": "2024 – 2025",
        "texte": "Loi SREN puis Data Act européen : crédits cloud et frais de sortie encadrés. Les verrous pointés en 2023 deviennent la cible du législateur."
      },
      {
        "date": "Juin 2025",
        "texte": "Devant le Sénat, Microsoft France ne peut garantir que les données échappent aux autorités américaines."
      },
      {
        "date": "Juil. 2026",
        "texte": "Nouvelle hausse Microsoft 365, jusqu'à +16 % sur les offres PME."
      }
    ],
    "apport": "le scénario A l'emporte, mais sans ses conditions favorables (prix régulés, accord sur les données). Ce sont les vigilances des scénarios B et C, coûts et souveraineté, qui guident aujourd'hui les choix."
  },
  "source": "Source détaillée : « Prospective infonuagique ou le devenir du cloud ? » (oct. 2023, 20 p.)",
  "liens": [
    {
      "titre": "Cloud français : un marché désormais prêt à prendre son envol",
      "editeur": "Markess",
      "date": null,
      "url": "https://www.markess.com/cloud-computing/cloud-francais-un-marche-desormais-pret-a-prendre-son-envol/",
      "type": "reference"
    },
    {
      "titre": "Préparer un environnement de travail hybride",
      "editeur": "Colt",
      "date": null,
      "url": "https://www.colt.net/resources/prepare-for-a-hybrid-work-environment/",
      "type": "reference"
    },
    {
      "titre": "Banque d'investissement internationale (cas client)",
      "editeur": "Colt",
      "date": null,
      "url": "https://www.colt.net/fr/resources/banque-dinvestissement-internationale/",
      "type": "reference"
    },
    {
      "titre": "Cloud de confiance : nouveau dispositif d'accompagnement vers l'obtention du visa de sécurité",
      "editeur": "Gouvernement",
      "date": null,
      "url": "https://www.gouvernement.fr/cloud-de-confiance-nouveau-dispositif-d-accompagnement-vers-l-obtention-du-visa-de-securite",
      "type": "reference"
    },
    {
      "titre": "Le gouvernement lance un dispositif pour accompagner start-up et PME vers l'obtention de SecNumCloud",
      "editeur": "L'Usine Digitale",
      "date": null,
      "url": "https://www.usine-digitale.fr/article/le-gouvernement-lance-un-dispositif-pour-accompagner-start-up-et-pme-vers-l-obtention-du-secnumcloud.N2080731",
      "type": "reference"
    },
    {
      "titre": "Cloud : cinq nouveaux dispositifs pour soutenir le développement du secteur",
      "editeur": "Ministère de l'Économie",
      "date": null,
      "url": "https://www.economie.gouv.fr/cloud-cinq-nouveaux-dispositifs-soutenir-developpement-secteur",
      "type": "reference"
    },
    {
      "titre": "Microsoft Office 365",
      "editeur": "NowTeam",
      "date": null,
      "url": "https://www.nowteam.net/microsoft-office-365/",
      "type": "reference"
    },
    {
      "titre": "BYOD (Bring Your Own Device) : définition",
      "editeur": "TechTarget",
      "date": null,
      "url": "https://whatis.techtarget.com/fr/definition/BYOD-Bring-Your-Own-Device",
      "type": "reference"
    },
    {
      "titre": "Les meilleures solutions cloud pour les PME",
      "editeur": "NowTeam",
      "date": null,
      "url": "https://www.nowteam.net/les-meilleurs-solutions-cloud-pour-les-pme/",
      "type": "reference"
    },
    {
      "titre": "Outscale lance « Path to a Trusted Cloud » pour hâter la croissance d'un écosystème SecNumCloud",
      "editeur": "IT Social",
      "date": null,
      "url": "https://itsocial.fr/actualites/outscale-lance-%E2%80%89path-to-a-trusted-cloud%E2%80%89-pour-hater-la-croissance-dun-ecosysteme-secnumcloud/",
      "type": "reference"
    },
    {
      "titre": "Webinar 5G : quels avantages et inconvénients pour les entreprises ?",
      "editeur": "Colt",
      "date": null,
      "url": "https://www.colt.net/fr/resources/webinar-5g-quels-avantages-et-inconvenients-pour-les-entreprises/",
      "type": "reference"
    },
    {
      "titre": "Qui a le plus profité du boom du cloud d'infrastructure en 2021 ?",
      "editeur": "L'Usine Nouvelle",
      "date": "2022",
      "url": "https://www.usinenouvelle.com/article/qui-a-le-plus-profite-du-boom-du-cloud-d-infrastructure-en-2021.N1780997",
      "type": "reference"
    },
    {
      "titre": "Développement d'applications mobiles",
      "editeur": "Salesforce",
      "date": null,
      "url": "https://www.salesforce.com/fr/learning-centre/tech/mobile-app-development/",
      "type": "reference"
    },
    {
      "titre": "Le cloud computing",
      "editeur": "France Num",
      "date": null,
      "url": "https://www.francenum.gouv.fr/guides-et-conseils/pilotage-de-lentreprise/stockage-des-donnees-en-ligne-cloud/le-cloud-computing",
      "type": "reference"
    },
    {
      "titre": "Contrat de cloud : négocier le SLA",
      "editeur": "La loi des parties",
      "date": null,
      "url": "http://laloidesparties.fr/contrat-de-cloud-negocier-le-sla",
      "type": "reference"
    },
    {
      "titre": "Shadow IT : définition",
      "editeur": "LeMagIT",
      "date": null,
      "url": "https://www.lemagit.fr/definition/Shadow-IT",
      "type": "reference"
    },
    {
      "titre": "Cloud computing et cybersécurité : toutes les informations à connaître",
      "editeur": "Cyber University",
      "date": null,
      "url": "https://www.cyberuniversity.com/post/cloud-computing-et-cybersecurite-toutes-les-informations-a-connaitre",
      "type": "reference"
    },
    {
      "titre": "Cloud computing : connaître les risques et savoir l'utiliser",
      "editeur": "CNET France",
      "date": null,
      "url": "https://www.cnetfrance.fr/produits/cloud-computing-connaitre-les-risques-et-savoir-l-utiliser-39762624.htm",
      "type": "reference"
    },
    {
      "titre": "Parts de marché du cloud en France et en Europe",
      "editeur": "Siècle Digital",
      "date": "2021-04-06",
      "url": null,
      "type": "citee"
    },
    {
      "titre": "80 % des données des entreprises européennes stockées chez des fournisseurs américains",
      "editeur": "OVHcloud",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Croissance du marché français du cloud et part des ETI et PME en 2025",
      "editeur": "Markess",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Plus de 75 % des PME et grands comptes en multicloud d'ici 2021",
      "editeur": "Gartner",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "95 % des défaillances de sécurité du cloud imputables au client jusqu'en 2022",
      "editeur": "Gartner",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Marché mondial du cloud d'infrastructure, parts de marché",
      "editeur": "Synergy Research",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Entretien avec Aaron Partouche, 5G & Edge",
      "editeur": "Colt Technology Services",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Visa de sécurité SecNumCloud",
      "editeur": "ANSSI",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Référentiel européen de certification cloud (EUCS)",
      "editeur": "ENISA",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Avis sur l'hébergement de données sensibles (Health Data Hub)",
      "editeur": "CNIL",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Arrêt Schrems II, invalidation du Privacy Shield",
      "editeur": "Cour de justice de l'UE",
      "date": "2020-07-16",
      "url": null,
      "type": "citee"
    },
    {
      "titre": "Règlement général sur la protection des données (RGPD)",
      "editeur": "Union européenne",
      "date": "2016",
      "url": null,
      "type": "citee"
    },
    {
      "titre": "USA PATRIOT Act",
      "editeur": "États-Unis",
      "date": "2001-10-26",
      "url": null,
      "type": "citee"
    },
    {
      "titre": "CLOUD Act (Clarifying Lawful Overseas Use of Data Act)",
      "editeur": "États-Unis",
      "date": "2018-03",
      "url": null,
      "type": "citee"
    },
    {
      "titre": "GAIA-X, cadre européen pour le cloud",
      "editeur": "France, Allemagne",
      "date": null,
      "url": null,
      "type": "citee"
    },
    {
      "titre": "L'économie et la société à l'ère du numérique",
      "editeur": "Insee",
      "date": "2019",
      "url": null,
      "type": "etude"
    },
    {
      "titre": "Le cloud computing : études sectorielles",
      "editeur": "Direccte Île-de-France",
      "date": "2012-09",
      "url": null,
      "type": "etude"
    },
    {
      "titre": "Total Economic Impact de Microsoft Office 365",
      "editeur": "Forrester",
      "date": "2011-06",
      "url": null,
      "type": "etude"
    },
    {
      "titre": "Total Economic Impact de Microsoft Office 365",
      "editeur": "Forrester",
      "date": "2015-09",
      "url": null,
      "type": "etude"
    },
    {
      "titre": "Thèse de doctorat en informatique (A. Chikhaoui)",
      "editeur": "École doctorale MathSTIC",
      "date": "2022",
      "url": null,
      "type": "etude"
    },
    {
      "titre": "Microsoft 365 Roadmap",
      "editeur": "Microsoft",
      "date": null,
      "url": "https://www.microsoft.com/en-US/microsoft-365/roadmap",
      "type": "favori"
    },
    {
      "titre": "Pourquoi CrowdStrike a planté 8,5 millions de terminaux Windows",
      "editeur": "Le Monde Informatique",
      "date": "2024-07",
      "url": "https://www.lemondeinformatique.fr/actualites/lire-pourquoi-crowdstrike-a-plante-8-5-millions-de-terminaux-windows-94343.html",
      "type": "reel"
    },
    {
      "titre": "Informatique en nuage : rôle et action de l'Arcep (loi SREN, Data Act)",
      "editeur": "Arcep",
      "date": null,
      "url": "https://www.arcep.fr/la-regulation/grands-dossiers-internet-et-numerique/informatique-en-nuage-cloud/role-et-action-arcep.html",
      "type": "reel"
    },
    {
      "titre": "Commission d'enquête sur la commande publique : audition de Microsoft France",
      "editeur": "Sénat",
      "date": "2025-06-10",
      "url": "https://senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html",
      "type": "reel"
    },
    {
      "titre": "Microsoft announces worldwide price hike for Microsoft 365 subscriptions",
      "editeur": "Nasdaq",
      "date": "2025-12",
      "url": "https://www.nasdaq.com/articles/microsoft-announces-worldwide-price-hike-microsoft-365-subscriptions",
      "type": "reel"
    }
  ]
});
