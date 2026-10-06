#!/usr/bin/env python3
"""Mode secours file:// : convertit data/*.csv en data/data.js (window.DATA_AGENCE = {...}).
Usage : python build_data.py   (depuis le dossier agence)"""
import json, pathlib
d = pathlib.Path(__file__).parent / "data"
noms = ["dim_domaine", "dim_indicateur", "dim_modalite", "fait_valeur"]
data = {n: (d / f"{n}.csv").read_text(encoding="utf-8-sig") for n in noms}
(d / "data.js").write_text("// Généré par build_data.py — ne pas modifier à la main\nwindow.DATA_AGENCE = "
                           + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
print("data/data.js :", {n: data[n].count("\n") for n in noms})
