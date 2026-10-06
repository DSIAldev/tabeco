"""Conversion indicateurs_aldev_2019_2025.csv -> format long (agence/data)."""
import csv, re, sys, pathlib
from collections import defaultdict
SRC, OUT = sys.argv[1], pathlib.Path(sys.argv[2]); OUT.mkdir(parents=True, exist_ok=True)
TERR = "EPCI244900015"; SOURCE = "Aldev, rapports d'activité"
rows = list(csv.DictReader(open(SRC, encoding="utf-8-sig"), delimiter=";"))

# code ; domaine ; libelle ; libelle_court ; unite ; sens ; calcul ; axes
IND = [
 ("ACC01","ACC","Projets d'entreprise accompagnés","Projets accompagnés","projets","hausse","","nature,secteur,origine"),
 ("ACC02","ACC","Projets d'entreprise décidés ou aboutis","Projets décidés","projets","hausse","","nature,secteur,origine"),
 ("ACC03","ACC","Taux de concrétisation (décidés / accompagnés)","Taux de concrétisation","%","hausse","ACC02/ACC01",""),
 ("ACC04","ACC","Part des projets accompagnés issus d'ALM","Part ALM des projets","%","neutre","ACC01[ORI-ALM]/ACC01",""),
 ("ACC05","ACC","Porteurs de projet accompagnés en QPV","Porteurs accompagnés QPV","personnes","hausse","",""),
 ("ACC06","ACC","Entreprises créées en QPV","Entreprises créées QPV","entreprises","hausse","",""),
 ("ACC07","ACC","Actions collectives menées en QPV","Actions collectives QPV","actions","hausse","",""),
 ("ACC08","ACC","Participants aux actions collectives QPV","Participants QPV","personnes","hausse","",""),
 ("FIN01","FIN","Prêts TPE Initiative Anjou : dossiers retenus (périmètre jusqu'en 2022)","Prêts Initiative Anjou","dossiers","hausse","",""),
 ("FIN02","FIN","Prêts TPE Initiative Anjou : montant prêté (périmètre jusqu'en 2022)","Montant Initiative Anjou","k€","hausse","",""),
 ("FIN03","FIN","Création-reprise TPE, tous dispositifs : dossiers retenus (depuis 2023)","Dossiers TPE","dossiers","hausse","",""),
 ("FIN04","FIN","Création-reprise TPE, tous dispositifs : montant prêté ou alloué (depuis 2023)","Montant TPE","k€","hausse","",""),
 ("FIN05","FIN","Primes Création / Incube : dossiers","Primes Création / Incube","dossiers","hausse","",""),
 ("FIN06","FIN","Primes Création / Incube : montant versé","Montant primes","k€","hausse","",""),
 ("FIN07","FIN","Fonds d'intervention économique (FIE) : dossiers","Dossiers FIE","dossiers","hausse","",""),
 ("FIN08","FIN","Fonds d'intervention économique (FIE) : montant versé","Montant FIE","k€","hausse","",""),
 ("FIN09","FIN","Fonds de revitalisation du territoire (FRT) : dossiers","Dossiers FRT","dossiers","hausse","",""),
 ("FIN10","FIN","Fonds de revitalisation du territoire (FRT) : montant versé","Montant FRT","k€","hausse","",""),
 ("FIN11","FIN","Entreprises ayant reçu un soutien financier","Entreprises soutenues","entreprises","hausse","",""),
 ("EMA01","EMA","Bénéficiaires d'un accompagnement vers l'emploi","Personnes accompagnées","personnes","hausse","",""),
 ("EMA02","EMA","Accès à un emploi durable (CDI ou CDD > 6 mois)","Emplois durables","personnes","hausse","",""),
 ("EMA03","EMA","Taux d'accès à l'emploi durable","Taux d'emploi durable","%","hausse","EMA02/EMA01",""),
 ("EMA04","EMA","Entreprises concernées par les programmes emploi","Entreprises concernées","entreprises","hausse","",""),
 ("INS01","INS","Heures d'insertion réalisées (marchés publics)","Heures d'insertion","heures","hausse","",""),
 ("INS02","INS","Personnes ayant signé un contrat d'insertion","Personnes en insertion","personnes","hausse","",""),
 ("INS03","INS","Contrats d'insertion signés","Contrats d'insertion","contrats","hausse","",""),
 ("INS04","INS","Entreprises mobilisées sur les clauses","Entreprises mobilisées","entreprises","hausse","",""),
 ("INS05","INS","Dont structures d'insertion par l'activité économique (SIAE)","Dont SIAE","structures","neutre","",""),
 ("IMM01","IMM","Surface globale du parc locatif","Surface du parc","m²","neutre","",""),
 ("IMM02","IMM","Taux d'occupation du parc locatif","Taux d'occupation","%","hausse","",""),
 ("IMM03","IMM","Locataires du parc","Locataires","locataires","hausse","",""),
 ("IMM04","IMM","Nouveaux locataires accueillis","Nouveaux locataires","locataires","hausse","",""),
 ("IMM05","IMM","Surface louée aux nouveaux locataires","Surface nouveaux locataires","m²","hausse","",""),
 ("IMM06","IMM","Recettes de location","Recettes locatives","k€","hausse","",""),
 ("IMM07","IMM","Parcelles vendues dans les parcs d'activités","Parcelles vendues","parcelles","hausse","",""),
 ("IMM08","IMM","Surface foncière vendue","Surface vendue","m²","hausse","",""),
 ("IMM09","IMM","Recette des ventes foncières actées","Recette foncière","k€","hausse","",""),
 ("IMM10","IMM","Compromis de vente en cours au 31/12","Compromis en cours","compromis","hausse","",""),
 ("IMM11","IMM","Surface sous compromis","Surface sous compromis","m²","hausse","",""),
 ("IMM12","IMM","Recette estimée des compromis","Recette estimée compromis","k€","hausse","",""),
 ("IMM13","IMM","Biens immobiliers vendus","Biens vendus","biens","neutre","",""),
 ("IMM14","IMM","Surface bâtie vendue","Surface bâtie vendue","m²","neutre","",""),
 ("IMM15","IMM","Recette des cessions immobilières","Recette cessions immo.","k€","neutre","",""),
 ("FIL01","FIL","Projets filières accompagnés","Projets filières","projets","hausse","","filiere"),
 ("ESR01","ESR","Projets ESRI suivis ou accompagnés","Projets ESRI","projets","hausse","",""),
 ("ESR02","ESR","Projets de recherche démarrés dans l'année","Recherche : démarrés","projets","hausse","",""),
 ("ESR03","ESR","Projets de recherche en cours démarrés les années précédentes","Recherche : en cours","projets","neutre","",""),
 ("ESR04","ESR","Colloques scientifiques financés","Colloques financés","colloques","hausse","",""),
 ("ESR05","ESR","Projets soutenus dans le cadre du CPER 2021-2027","Projets CPER","projets","hausse","","cper"),
 ("ESR11","ESR","Projets CPER : équipements de recherche","CPER équipements","projets","hausse","",""),
 ("ESR12","ESR","Projets immobiliers ou d'équipement de recherche soutenus (CPER précédent)","Immobilier et équipement","projets","hausse","","cper"),
 ("ESR06","ESR","Projets immobiliers ESR démarrés","Immobilier démarré","projets","hausse","",""),
 ("ESR07","ESR","Projets ESR en études préalables","Études préalables","projets","neutre","",""),
 ("ESR08","ESR","Projets ESR en suivi d'études et dispositifs","Suivi d'études","projets","neutre","",""),
 ("ESR09","ESR","Étudiants-chercheurs financés (thèses, post-doc)","Thèses et post-doc","personnes","hausse","",""),
 ("ESR10","ESR","Subvention ALM au CPER 2021-2027","Subvention CPER","k€","neutre","",""),
 ("RSE01","RSE","Mécène à Angers : projets concrétisés","Projets de mécénat","projets","hausse","",""),
 ("RSE02","RSE","Mécène à Angers : mécènes engagés","Mécènes","mécènes","hausse","",""),
 ("RSE03","RSE","Mécène à Angers : montant collecté","Montant mécénat","k€","hausse","",""),
 ("RSE04","RSE","RSE interne : heures d'insertion (tri et recyclage)","Heures d'insertion RSE","heures","hausse","",""),
 ("RSE05","RSE","Score RSE Impact France (ISO 26000)","Score Impact France","/100","hausse","",""),
 ("BUD01","BUD","Recettes de fonctionnement","Recettes","k€","neutre","","recette"),
 ("BUD02","BUD","Dépenses d'exploitation","Dépenses","k€","neutre","","depense"),
 ("BUD03","BUD","Résultat de l'exercice","Résultat","k€","hausse","",""),
 ("BUD04","BUD","Coût net pour ALM","Coût net ALM","k€","neutre","",""),
 ("BUD05","BUD","Budgets publics gérés pour ALM","Budgets gérés pour ALM","k€","neutre","","budget"),
]
DOM = [("ACC","Accompagnement des entreprises",1),("FIN","Financement des entreprises",2),("EMA","Emploi et accès à l'emploi",3),
       ("INS","Clauses d'insertion",4),("IMM","Immobilier et foncier",5),("FIL","Filières et innovation",6),
       ("ESR","Enseignement supérieur et recherche",7),("RSE","RSE et mécénat",8),("BUD","Budget de l'agence",9)]

MOD = {}  # code -> (axe, libelle, ordre)
def mod(code, axe, lib, o): MOD[code] = (axe, lib, o); return code
NAT = {"Développement":"NAT-DEV","Création ou reprise":"NAT-CRE","Implantation":"NAT-IMP","Proximité / Réseau":"NAT-PRO","Restructuration":"NAT-RES"}
SEC = {"Services":"SEC-SER","Commerce":"SEC-COM","Industrie":"SEC-IND","BTP":"SEC-BTP"}
ORI = {"Angers Loire Métropole":"ORI-ALM","France (hors ALM)":"ORI-FRA","Monde (hors France)":"ORI-MON"}
for i,(k,v) in enumerate(NAT.items()): mod(v,"nature",k,i)
for i,(k,v) in enumerate(SEC.items()): mod(v,"secteur",k,i)
for i,(k,v) in enumerate(ORI.items()): mod(v,"origine",{"Angers Loire Métropole":"Angers Loire Métropole","France (hors ALM)":"France hors ALM","Monde (hors France)":"Monde hors France"}[k],i)
FIL = {"Végétal":"FIL-VEG","Numérique / Électronique":"FIL-NUM","Santé":"FIL-SAN","Silver économie":"FIL-SAN","Santé / Silver économie":"FIL-SAN",
       "Innovation":"FIL-INN","Économie Sociale et Solidaire (ESS)":"FIL-ESS","Territoire intelligent":"FIL-TER","Industrie culturelle et créative":"FIL-ICC",
       "Tourisme":"FIL-TOU","Entrepreneuriat étudiant":"FIL-ETU","Inter-filières":"FIL-INT"}
FIL_LIB = {"FIL-VEG":"Végétal","FIL-NUM":"Numérique / Électronique","FIL-SAN":"Santé et Silver économie","FIL-INN":"Innovation","FIL-ESS":"Économie sociale et solidaire",
           "FIL-TER":"Territoire intelligent","FIL-ICC":"Industries culturelles et créatives","FIL-TOU":"Tourisme","FIL-ETU":"Entrepreneuriat étudiant","FIL-INT":"Inter-filières"}
for i,(k,v) in enumerate(FIL_LIB.items()): mod(k,"filiere",v,i)
for i,(c,l) in enumerate([("CPER-IMM","Immobilier"),("CPER-EQU","Équipement de recherche"),("CPER-NUM","Numérique"),("CPER-INN","Innovation")]): mod(c,"cper",l,i)
for i,(c,l) in enumerate([("REC-SUB","Subventions d'exploitation"),("REC-CA","Chiffre d'affaires"),("REC-DIV","Recettes diverses")]): mod(c,"recette",l,i)
for i,(c,l) in enumerate([("DEP-SAL","Masse salariale"),("DEP-ACH","Achats et autres charges"),("DEP-AFF","Redevance d'affermage")]): mod(c,"depense",l,i)
BUDS = {"Budget Enseignement supérieur et Recherche":("BDG-ESR","Enseignement supérieur et recherche"),"Budget Politique Emploi et Insertion":("BDG-EMP","Emploi et insertion"),
        "Budget Filières et Innovation économique":("BDG-FIL","Filières et innovation"),"Budget Interventions économiques diverses":("BDG-INT","Interventions économiques diverses"),
        "Budget Annexe Angers Loire Aéroport":("BDG-AER","Angers Loire Aéroport (budget annexe)"),"Budget Immobilier d'entreprise":("BDG-IMM","Immobilier d'entreprise")}
for i,(k,(c,l)) in enumerate(BUDS.items()): mod(c,"budget",l,i)

SIMPLE = {  # libellé source -> code (ligne sans ventilation)
 "Projets d'entreprise accompagnés":"ACC01","Projets d'entreprise décidés / aboutis":"ACC02",
 "Porteurs de projet accompagnés en QPV":"ACC05","Entreprises créées en QPV":"ACC06","Actions collectives menées QPV":"ACC07","Participants aux actions collectives QPV":"ACC08",
 "Dossiers retenus (Prêt Initiative Anjou)":"FIN01","Montant prêté Initiative Anjou":"FIN02",
 "Dossiers retenus (Prêt Initiative Anjou, BPI, Solidaire, Prime)":"FIN03","Montant prêté / alloué TPE":"FIN04",
 "Dossiers Prime Création / Incube":"FIN05","Montant versé Primes TPE":"FIN06","Dossiers FIE":"FIN07","Montant versé FIE":"FIN08",
 "Dossiers FRT":"FIN09","Montant versé FRT":"FIN10","Entreprises soutenues financièrement":"FIN11",
 "Bénéficiaires d'un accompagnement vers l'emploi":"EMA01","Accès à un emploi durable (CDI ou CDD > 6 mois)":"EMA02","Entreprises concernées par les programmes":"EMA04",
 "Heures d'insertion réalisées":"INS01","Personnes ayant signé un contrat d'insertion":"INS02","Contrats signés en insertion":"INS03",
 "Entreprises mobilisées clauses insertion":"INS04","Structures d'insertion par l'activité éco (SIAE)":"INS05",
 "Surface globale du parc locatif":"IMM01","Taux d'occupation du parc locatif":"IMM02","Nombre total de locataires":"IMM03","Nouveaux locataires accueillis":"IMM04",
 "Surface louée aux nouveaux locataires":"IMM05","Recettes de location":"IMM06","Parcelles vendues dans les parcs d'activités":"IMM07","Surface totale vendue":"IMM08",
 "Recette des ventes actées":"IMM09","Compromis de vente en cours":"IMM10","Surface sous compromis de vente":"IMM11","Recette estimée des compromis en cours":"IMM12",
 "Biens immobiliers vendus":"IMM13","Surface bâtie vendue":"IMM14","Recette des cessions immobilières":"IMM15",
 "Projets filières accompagnés":"FIL01",
 "Projets ESRI suivis / accompagnés":"ESR01","Projets recherche démarrés dans l'année":"ESR02",
 "Projets de recherche en cours démarrés avant 2023":"ESR03","Projets de recherche en cours démarrés avant 2024":"ESR03","Projets de recherche en cours démarrés avant 2025":"ESR03",
 "Colloques scientifiques financés":"ESR04","Projets CPER équipements de recherche":"ESR11","Projets dans le cadre du CPER":"ESR05",
 "Projets ESRI soutenus et accompagnés CPER":"ESR05","Projets immobiliers ou équipement recherche soutenus":"ESR12",
 "Projets immobiliers démarrés":"ESR06","Projets en études préalables":"ESR07","Projets en suivi d'études et dispositifs":"ESR08",
 "Étudiants-chercheurs financés (thèses/post-doc)":"ESR09","Subvention ALM pour CPER 2021-2027":"ESR10",
 "Projets de mécénat concrétisés":"RSE01","Mécènes engagés":"RSE02","Montant total mécénat collecté":"RSE03",
 "Heures d'insertion - tri et recyclage":"RSE04","Score RSE Impact France":"RSE05",
 "Total recettes de fonctionnement":"BUD01","Total dépenses d'exploitation":"BUD02","Résultat d'exercice":"BUD03","Coût net pour ALM":"BUD04",
}
VENT = {"Subventions d'exploitation":("BUD01","REC-SUB"),"Chiffre d'affaires":("BUD01","REC-CA"),"Recettes diverses":("BUD01","REC-DIV"),
        "Masse salariale":("BUD02","DEP-SAL"),"Achats et autres charges":("BUD02","DEP-ACH"),"Redevance d'affermage":("BUD02","DEP-AFF")}
STOCKES = {"Part des projets ALM parmi accompagnés":"ACC04","Taux de concrétisation (aboutis / accompagnés)":"ACC03","Taux d'accès à l'emploi durable":"EMA03"}
NOTE_CPER = {"immobilier":"CPER-IMM","équipement":"CPER-EQU","numérique":"CPER-NUM","innovation":"CPER-INN"}

out = defaultdict(float); notes = {}; journal = []; inconnus = []
def put(ind, per, val, modal="", note=""):
    k = (ind, per, modal)
    if k in out and modal == "" and ind not in ("FIL01",): journal.append(f"doublon {k}")
    out[k] += val
    if note: notes[k] = note

for x in rows:
    a, lib, seg, u, n = x["annee"], x["indicateur"], x["segment"], x["unite"], x["notes"].strip()
    v = float(x["valeur"]); v = v * 1000 if u == "M€" else v
    keep = n if n and not re.search(r"%|Excédent|Déficit|selon rapport|points depuis|^\d+ k€$", n) else ""
    m = re.match(r"Projets (accompagnés|décidés) par (nature|secteur|origine)", lib)
    if m:
        ind = "ACC01" if m.group(1) == "accompagnés" else "ACC02"
        put(ind, a, v, {"nature":NAT,"secteur":SEC,"origine":ORI}[m.group(2)][seg]); continue
    if lib == "Projets filière accompagnés":
        put("FIL01", a, v, FIL[seg]); continue
    if lib in STOCKES: put(STOCKES[lib], a, v); continue
    if lib in VENT: i, c = VENT[lib]; put(i, a, v, c); continue
    if lib.startswith("Budget "): put("BUD05", a, v, BUDS[lib][0]); continue
    if lib in SIMPLE:
        ind = SIMPLE[lib]
        # notes porteuses de ventilation CPER : "7 immobiliers et 4 équipement"
        if ind in ("ESR05", "ESR12") and n:
            for q, w in re.findall(r"(\d+)\s+(\w+)", n):
                w2 = w.rstrip("s").replace("immobilier","immobilier")
                cle = next((c for t, c in NOTE_CPER.items() if w2.startswith(t[:6])), None)
                if cle: put(ind, a, float(q), cle)
            keep = ""
        put(ind, a, v, "", keep); continue
    inconnus.append(lib)

# Corrections validées (maquette)
def corr(k, v, why):
    journal.append(f"correction {k}: {out.get(k)} -> {v} ({why})"); out[k] = v
s = sum(out[("ACC02","2020",c)] for c in NAT.values() if ("ACC02","2020",c) in out)
if s != out[("ACC02","2020","")]: corr(("ACC02","2020","NAT-DEV"), out[("ACC02","2020","NAT-DEV")] - (s - out[("ACC02","2020","")]), "somme nature = total publié 263")

# Contrôles : ventilations = total
for (ind, per, mo) in list(out):
    if mo: continue
    axes = defaultdict(float)
    for (i2, p2, m2), v in out.items():
        if i2 == ind and p2 == per and m2: axes[MOD[m2][0]] += v
    for ax, sv in axes.items():
        if abs(sv - out[(ind, per, "")]) > 0.5: journal.append(f"écart {ind} {per} {ax}: somme {sv:g} / total {out[(ind,per,'')]:g}")
# Contrôle des taux stockés
for t, (num, den) in {"ACC03":("ACC02","ACC01"),"EMA03":("EMA02","EMA01")}.items():
    for (i, p, m), v in list(out.items()):
        if i == t and (num,p,"") in out and (den,p,"") in out:
            c = 100*out[(num,p,"")]/out[(den,p,"")]
            if abs(c - v) >= 1: journal.append(f"taux {t} {p}: stocké {v:g} % / calculé {c:.1f} %")

with open(OUT/"dim_domaine.csv","w",encoding="utf-8",newline="") as f:
    w = csv.writer(f, delimiter=";", lineterminator="\n"); w.writerow(["code","libelle","ordre"]); w.writerows(DOM)
with open(OUT/"dim_indicateur.csv","w",encoding="utf-8",newline="") as f:
    w = csv.writer(f, delimiter=";", lineterminator="\n")
    w.writerow(["code","domaine","libelle","libelle_court","unite","sens_favorable","calcul","axes"]); w.writerows(IND)
with open(OUT/"dim_modalite.csv","w",encoding="utf-8",newline="") as f:
    w = csv.writer(f, delimiter=";", lineterminator="\n"); w.writerow(["code","axe","libelle","ordre"])
    for c,(ax,l,o) in MOD.items(): w.writerow([c,ax,l,o])
U = {c: u for c,_,_,_,u,_,_,_ in IND}
with open(OUT/"fait_valeur.csv","w",encoding="utf-8",newline="") as f:
    w = csv.writer(f, delimiter=";", lineterminator="\n")
    w.writerow(["indicateur","territoire","periode","mesure","valeur","modalite","unite","source","millesime","note"])
    for (i,p,m) in sorted(out):
        v = out[(i,p,m)]; vs = f"{v:.2f}".rstrip("0").rstrip(".")
        mil = "maquette-corrigée" if any(f"correction ('{i}', '{p}'" in j for j in journal) else f"RA {p}"
        w.writerow([i,TERR,p,"valeur",vs,m,U[i],SOURCE,mil,notes.get((i,p,m),"")])
print("lignes", len(out), "| libellés non reconnus:", sorted(set(inconnus)))
print("\n".join(journal))
