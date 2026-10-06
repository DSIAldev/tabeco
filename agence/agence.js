/* Indicateurs d'agence (TB03) · DPE Aldev
   Aucune valeur en dur : tout vient de data/*.csv (ou data/data.js en secours file://). */
(function () {
  "use strict";
  const G = (window.AGENCE = {});
  const FICHIERS = ["dim_domaine", "dim_indicateur", "dim_modalite", "fait_valeur"];
  const COUL = { favorable: "#1D5F8A", defavorable: "#A3461A", neutre: "#4A5A66" };
  // Palette catégorielle validée (validate_palette.js : 5/5 PASS, contraste < 3:1 sur l'ocre → valeurs toujours affichées)
  const CAT = ["#1769AA", "#D98B1F", "#119180", "#C8243B", "#7C5CC4"];

  /* ---------- Chargement ---------- */
  const parseCSV = (txt) => {
    const l = txt.replace(/^﻿/, "").split(/\r?\n/).filter((x) => x.trim() !== "");
    const h = l.shift().split(";").map((x) => x.trim());
    return l.map((r) => { const c = r.split(";"); const o = {}; h.forEach((k, i) => (o[k] = (c[i] ?? "").trim())); return o; });
  };
  const viaScript = (src) => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => ko(new Error(src)); document.head.appendChild(s); });
  async function textes() {
    try {
      return Object.fromEntries(await Promise.all(FICHIERS.map(async (f) => {
        const r = await fetch(`data/${f}.csv`, { cache: "no-store" });
        if (!r.ok) throw new Error(`${f}.csv : HTTP ${r.status}`);
        return [f, await r.text()];
      })));
    } catch (e) {
      await viaScript("data/data.js");
      if (!window.DATA_AGENCE) throw new Error("Données introuvables (ni CSV ni data/data.js)");
      G.modeSecours = true; return window.DATA_AGENCE;
    }
  }
  G.charger = async function () {
    const t = await textes();
    const m = {
      dom: parseCSV(t.dim_domaine).sort((a, b) => a.ordre - b.ordre),
      ind: new Map(parseCSV(t.dim_indicateur).map((r) => [r.code, r])),
      mod: new Map(parseCSV(t.dim_modalite).map((r) => [r.code, r])),
      f: new Map(), notes: new Map(), annees: new Set()
    };
    for (const r of parseCSV(t.fait_valeur)) {
      const k = `${r.indicateur}|${r.periode}|${r.modalite}`;
      m.f.set(k, parseFloat(r.valeur)); m.annees.add(r.periode);
      if (r.note) m.notes.set(k, r.note);
      if (r.territoire) m.territoire = r.territoire;
      if (r.source) m.source = r.source;
    }
    m.annees = [...m.annees].sort();
    G.m = m; return m;
  };

  /* ---------- Valeurs (les indicateurs « calcul » sont recalculés quand c'est possible) ---------- */
  const brut = (ind, y, mo = "") => { const v = G.m.f.get(`${ind}|${y}|${mo}`); return v === undefined ? null : v; };
  const ref = (s, y) => { const x = /^(\w+)(?:\[([\w-]+)\])?$/.exec(s.trim()); return x ? brut(x[1], y, x[2] || "") : null; };
  G.val = (ind, y, mo = "") => {
    const d = G.m.ind.get(ind);
    if (!mo && d && d.calcul) {
      const [a, b] = d.calcul.split("/"), na = ref(a, y), nb = ref(b, y);
      if (na !== null && nb) return (100 * na) / nb;
    }
    return brut(ind, y, mo);
  };
  G.calcule = (ind, y) => { const d = G.m.ind.get(ind); if (!d.calcul) return false; const [a, b] = d.calcul.split("/"); return ref(a, y) !== null && !!ref(b, y); };
  G.prec = (y) => { const i = G.m.annees.indexOf(y); return i > 0 ? G.m.annees[i - 1] : null; };
  G.evol = (ind, y) => {
    const p = G.prec(y), a = G.val(ind, y), b = p && G.val(ind, p);
    if (a === null || b === null || b === undefined) return null;
    return G.m.ind.get(ind).unite === "%" ? { v: a - b, type: "pt" } : b ? { v: ((a - b) / Math.abs(b)) * 100, type: "pct" } : null;
  };
  G.modalites = (ind, y, axe) => [...G.m.mod.values()].filter((x) => x.axe === axe)
    .map((x) => ({ ...x, v: brut(ind, y, x.code) })).filter((x) => x.v !== null);

  /* ---------- Formats ---------- */
  const nf = (d) => new Intl.NumberFormat("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
  G.nb = (v, d = 0) => nf(d).format(v).replace(/-/g, "−");
  const signe = (v, d) => (v > 0 ? "+" : "") + G.nb(Math.abs(v) < 1e-9 ? 0 : v, d);
  G.fmt = (ind, v) => {
    const u = G.m.ind.get(ind).unite;
    if (u === "%") return `${G.nb(v, 1).replace(/,0$/, "")} %`;
    if (u === "k€") return Math.abs(v) >= 1000 ? `${G.nb(v / 1000, 2)} M€` : `${G.nb(v, 0)} K€`;
    if (u === "m²") return `${G.nb(v, 0)} m²`;
    if (u === "/100") return `${G.nb(v, 1)} / 100`;
    return G.nb(v, Number.isInteger(v) ? 0 : 1);
  };
  G.fmtEvol = (e) => e.type === "pt" ? `${signe(e.v, 1)} ${Math.abs(e.v) >= 2 ? "pts" : "pt"}` : `${signe(e.v, 1)} %`;
  G.couleur = (ind, v) => {
    const s = G.m.ind.get(ind).sens_favorable;
    if (!v || Math.abs(v) < 0.05 || s === "neutre") return COUL.neutre;
    return (v > 0) === (s === "hausse") ? COUL.favorable : COUL.defavorable;
  };
  const fl = (v) => (v > 0.05 ? "▲" : v < -0.05 ? "▼" : "=");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  G.esc = esc;
  const code = (c) => `<span class="code">${esc(c)}</span>`;
  const min1 = (s) => (/^.[a-zà-ÿ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

  /* ---------- Courbe miniature (toutes les années, année choisie marquée) ---------- */
  function sparkline(ind, y) {
    const pts = G.m.annees.map((a) => ({ a, v: G.val(ind, a) })).filter((p) => p.v !== null);
    if (pts.length < 2) return "";
    const W = 120, H = 30, n = G.m.annees.length;
    const X = (a) => 3 + (G.m.annees.indexOf(a) / (n - 1)) * (W - 6);
    const lo = Math.min(...pts.map((p) => p.v)), hi = Math.max(...pts.map((p) => p.v)), r = hi - lo || 1;
    const Y = (v) => H - 4 - ((v - lo) / r) * (H - 8);
    const sel = pts.find((p) => p.a === y);
    const lib = pts.map((p) => `${p.a} : ${G.fmt(ind, p.v)}`).join(" · ");
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(lib)}"><title>${esc(lib)}</title>
      <polyline fill="none" stroke="#8A9AA5" stroke-width="1.5" stroke-linejoin="round" points="${pts.map((p) => `${X(p.a).toFixed(1)},${Y(p.v).toFixed(1)}`).join(" ")}"/>
      ${sel ? `<circle cx="${X(sel.a)}" cy="${Y(sel.v)}" r="4" fill="#2B3A47" stroke="#fff" stroke-width="2"/>` : ""}</svg>`;
  }

  /* ---------- Tuile ---------- */
  function tuile(ind, y) {
    const d = G.m.ind.get(ind), v = G.val(ind, y);
    if (v === null) return `<div class="tuile vide"><div class="t-tete"><span class="t-titre">${esc(d.libelle_court)}</span>${code(ind)}</div>
      <div class="t-val">[non disponible]</div><div class="t-sous">${y}</div></div>`;
    const e = G.evol(ind, y), note = G.m.notes.get(`${ind}|${y}|`);
    return `<div class="tuile cliquable" data-detail="${ind}" role="button" tabindex="0" title="${esc(d.libelle)} : détail ${G.m.annees[0]}–${G.m.annees[G.m.annees.length - 1]}">
      <div class="t-tete"><span class="t-titre">${esc(d.libelle_court)}</span>${code(ind)}</div>
      <div class="t-val">${G.fmt(ind, v)}</div>
      <div class="t-evol" style="color:${e ? G.couleur(ind, e.v) : COUL.neutre}">${e ? `${fl(e.v)} ${G.fmtEvol(e)} vs ${G.prec(y)}` : "&nbsp;"}</div>
      ${sparkline(ind, y)}
      ${note || G.calcule(ind, y) ? `<div class="t-sous">${[G.calcule(ind, y) ? "calculé" : "", note].filter(Boolean).map(esc).join(" · ")}</div>` : ""}
    </div>`;
  }

  /* ---------- Barres empilées (une ligne par indicateur) ---------- */
  function empile(inds, y, axe) {
    const mods = [...G.m.mod.values()].filter((x) => x.axe === axe).sort((a, b) => a.ordre - b.ordre);
    const coul = Object.fromEntries(mods.map((x, i) => [x.code, CAT[i % CAT.length]])); // couleur liée à la modalité, pas au rang
    const lignes = inds.map((ind) => {
      const ms = G.modalites(ind, y, axe), tot = ms.reduce((s, x) => s + x.v, 0);
      const lib = esc(G.m.ind.get(ind).libelle_court);
      if (!tot) return `<div class="emp-lib">${lib}</div><div class="emp-vide">[non disponible en ${y}]</div>`;
      const segs = mods.map((mo) => { const x = ms.find((z) => z.code === mo.code); if (!x || !x.v) return "";
        const p = (x.v / tot) * 100;
        return `<span class="seg" style="flex:${x.v};background:${coul[mo.code]}" title="${esc(mo.libelle)} : ${G.fmt(ind, x.v)} (${G.nb(p, 0)} %)">${p >= 15 ? `${G.nb(p, 0)} %` : ""}</span>`; }).join("");
      return `<div class="emp-lib">${lib}<small>${G.fmt(ind, tot)}</small></div><div class="emp">${segs}</div>`;
    }).join("");
    const presents = mods.filter((mo) => inds.some((ind) => brut(ind, y, mo.code) !== null));
    const leg = presents.map((mo) => `<span class="leg"><i style="background:${coul[mo.code]}"></i>${esc(mo.libelle)}</span>`).join("");
    return `<div class="emp-grille">${lignes}</div><div class="legendes">${leg}</div>`;
  }

  /* ---------- Barres horizontales triées (axes à nombreuses modalités) ---------- */
  function barres(ind, y, axe) {
    const ms = G.modalites(ind, y, axe).sort((a, b) => b.v - a.v || a.ordre - b.ordre);
    if (!ms.length) return `<p class="emp-vide">[non disponible en ${y}]</p>`;
    const max = Math.max(...ms.map((x) => x.v)), p = G.prec(y);
    return `<div class="barres">${ms.map((x) => { const av = p ? brut(ind, p, x.code) : null;
      const d = av === null ? "" : x.v - av;
      return `<span>${esc(x.libelle)}</span><span class="b-rail"><span class="b" style="width:${((x.v / max) * 100).toFixed(1)}%"></span></span>
        <strong>${G.fmt(ind, x.v)}</strong><span class="b-ev">${d === "" ? "nouveau" : d === 0 ? "=" : (d > 0 ? "+" : "−") + G.fmt(ind, Math.abs(d)).replace(" K€", "")}</span>`; }).join("")}</div>`;
  }

  /* ---------- Entonnoir accompagnés → décidés ---------- */
  function entonnoir(y) {
    const a = G.val("ACC01", y), d = G.val("ACC02", y), t = G.val("ACC03", y);
    if (a === null || d === null) return "";
    return `<div class="entonnoir" role="img" aria-label="${G.nb(a)} projets accompagnés, dont ${G.nb(d)} décidés">
      <div class="e-l"><i class="e-a" style="width:100%"></i><b>${G.nb(a)}</b> accompagnés</div>
      <div class="e-l"><i class="e-d" style="width:${((d / a) * 100).toFixed(1)}%"></i><b>${G.nb(d)}</b> décidés</div>
      <div class="e-t">${t !== null ? `soit ${G.fmt("ACC03", t)} de concrétisation` : ""}</div></div>`;
  }

  /* ---------- Section par domaine ---------- */
  G.section = function (dom, y) {
    const inds = [...G.m.ind.values()].filter((i) => i.domaine === dom.code);
    const ans = G.m.annees, iy = ans.indexOf(y), der = iy === ans.length - 1;
    const a = (c, f) => ans.filter((x, k) => f(k)).some((x) => G.val(c, x) !== null);
    // tuile si valeur l'année choisie ; « non disponible » seulement pour un trou dans une série
    // (valeur avant ET après), ou pour la dernière année si la série courait l'année précédente
    const tuiles = inds.filter((i) => G.val(i.code, y) !== null || (a(i.code, (k) => k < iy) && (a(i.code, (k) => k > iy) || (der && G.val(i.code, ans[iy - 1]) !== null))))
      .map((i) => tuile(i.code, y));
    if (!tuiles.length) return "";
    // ventilations : regroupées par axe
    const axes = new Map();
    inds.forEach((i) => i.axes.split(",").filter(Boolean).forEach((ax) => { if (!axes.has(ax)) axes.set(ax, []); axes.get(ax).push(i.code); }));
    let graph = dom.code === "ACC" ? `<div class="boite cliquable" data-detail="ACC01" role="button" tabindex="0"><div class="boite-tete"><span>Du projet accompagné au projet décidé</span>${code("ACC01 → ACC02")}</div>${entonnoir(y)}</div>` : "";
    for (const [ax, li] of axes) {
      const nMod = [...G.m.mod.values()].filter((x) => x.axe === ax).length;
      const avec = li.filter((i) => G.modalites(i, y, ax).length);
      if (!avec.length) continue;
      const titre = { nature: "Nature des projets", secteur: "Secteur d'activité", origine: "Origine géographique", filiere: "Projets par filière",
        cper: "Projets CPER par type", recette: "Composition des recettes", depense: "Composition des dépenses", budget: "Budgets publics gérés pour ALM" }[ax] || ax;
      graph += `<div class="boite cliquable${nMod > 5 ? " large" : ""}" data-detail="${li[0]}" data-axe="${ax}" role="button" tabindex="0"><div class="boite-tete"><span>${esc(titre)}</span>${code(li.join(", "))}</div>
        ${nMod > 5 ? barres(li[0], y, ax) : empile(ax === "recette" || ax === "depense" ? avec : li, y, ax)}</div>`;
    }
    // tableau des données de l'année (accessibilité + relief des couleurs à faible contraste)
    const rows = [];
    inds.forEach((i) => { const v = G.val(i.code, y); if (v !== null) rows.push([i.code, i.libelle, "", G.fmt(i.code, v)]);
      [...G.m.mod.values()].forEach((mo) => { const w = brut(i.code, y, mo.code); if (w !== null) rows.push([i.code, i.libelle, mo.libelle, G.fmt(i.code, w)]); }); });
    const table = `<details class="donnees"><summary>Données ${y} (${rows.length} lignes)</summary><table><thead><tr><th>Code</th><th>Indicateur</th><th>Ventilation</th><th class="n">${y}</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="n">${r[3]}</td></tr>`).join("")}</tbody></table></details>`;
    return `<section class="domaine" id="${dom.code}">
      <h2><span>${esc(dom.libelle)}</span>${code(dom.code)}</h2>
      <div class="tuiles">${tuiles.join("")}</div>
      ${graph ? `<div class="graphes">${graph}</div>` : ""}
      ${table}</section>`;
  };

  /* ---------- Vue détaillée (clic sur une tuile ou un graphique) ---------- */
  // Séries comparées : l'indicateur cliqué + ceux du même domaine qui partagent ses ventilations (ex. ACC01 et ACC02)
  const jumeaux = (ind) => { const d = G.m.ind.get(ind);
    return [...G.m.ind.values()].filter((i) => i.code === ind || (d.axes && i.domaine === d.domaine && i.axes === d.axes)).map((i) => i.code).sort(); };
  const SERIE = ["#2B3A47", "#8A9AA5"];

  function colonnes(inds, y) {   // colonnes groupées par année, valeurs affichées, année choisie soulignée
    const ans = G.m.annees, W = 760, H = 250, g = 34, b = 22, h0 = H - 30, pl = 8;
    const max = Math.max(...inds.flatMap((i) => ans.map((a) => G.val(i, a) ?? 0))) || 1;
    const larg = (W - pl * 2) / ans.length, nb = inds.length, bw = Math.min(46, (larg - 18) / nb);
    let svg = `<line x1="${pl}" y1="${h0}" x2="${W - pl}" y2="${h0}" stroke="#C9D3D8"/>`;
    ans.forEach((a, k) => {
      const x0 = pl + k * larg + (larg - bw * nb - 2 * (nb - 1)) / 2;
      if (a === y) svg += `<rect x="${pl + k * larg + 2}" y="6" width="${larg - 4}" height="${h0 - 6}" fill="#F2F5F6" rx="4"/>`;
      inds.forEach((i, j) => {
        const v = G.val(i, a), x = x0 + j * (bw + 2);
        if (v === null) { svg += `<rect x="${x}" y="${h0 - 30}" width="${bw}" height="30" fill="none" stroke="#8A9AA5" stroke-dasharray="3 3" rx="3"><title>${esc(G.m.ind.get(i).libelle_court)} ${a} : non disponible</title></rect>`; return; }
        const hh = Math.max(1, (v / max) * (h0 - g)), lib = `${G.m.ind.get(i).libelle_court} ${a} : ${G.fmt(i, v)}`;
        svg += `<rect x="${x}" y="${h0 - hh}" width="${bw}" height="${hh}" fill="${SERIE[j % 2]}" rx="3"><title>${esc(lib)}</title></rect>`;
        svg += `<text x="${x + bw / 2}" y="${h0 - hh - 5}" text-anchor="middle" class="d-val">${G.fmt(i, v).replace(" K€", "").replace(" m²", "")}</text>`;
      });
      svg += `<text x="${pl + k * larg + larg / 2}" y="${H - 8}" text-anchor="middle" class="d-an${a === y ? " sel" : ""}">${a}</text>`;
    });
    const leg = inds.length > 1 ? `<div class="legendes">${inds.map((i, j) => `<span class="leg"><i style="background:${SERIE[j % 2]}"></i>${esc(G.m.ind.get(i).libelle_court)}</span>`).join("")}</div>` : "";
    return `${leg}<svg viewBox="0 0 ${W} ${H}" class="d-svg" role="img" aria-label="Évolution ${ans[0]}–${ans[ans.length - 1]}">${svg}</svg>`;
  }

  function ventilAnnees(ind, axe, y) {   // une barre 100 % par année : la structure dans le temps
    const mods = [...G.m.mod.values()].filter((x) => x.axe === axe).sort((a, b) => a.ordre - b.ordre);
    const coul = Object.fromEntries(mods.map((x, i) => [x.code, CAT[i % CAT.length]]));
    if (mods.length > 5) {   // beaucoup de modalités : tableau années × modalités, intensité par cellule
      const ans = G.m.annees.filter((a) => G.modalites(ind, a, axe).length);
      const max = Math.max(...ans.flatMap((a) => G.modalites(ind, a, axe).map((x) => x.v)));
      const lignes = mods.filter((mo) => ans.some((a) => brut(ind, a, mo.code) !== null));
      return `<table class="d-heat"><thead><tr><th></th>${ans.map((a) => `<th class="${a === y ? "sel" : ""}">${a}</th>`).join("")}</tr></thead><tbody>
        ${lignes.map((mo) => `<tr><th>${esc(mo.libelle)}</th>${ans.map((a) => { const v = brut(ind, a, mo.code);
          return v === null ? `<td class="nd">–</td>` : `<td style="background:rgba(29,95,138,${(0.08 + 0.6 * v / max).toFixed(2)});color:${v / max > 0.6 ? "#fff" : "inherit"}">${G.fmt(ind, v)}</td>`; }).join("")}</tr>`).join("")}</tbody></table>`;
    }
    const rows = G.m.annees.map((a) => {
      const ms = G.modalites(ind, a, axe), tot = ms.reduce((s2, x) => s2 + x.v, 0);
      if (!tot) return `<span class="d-an2${a === y ? " sel" : ""}">${a}</span><span class="emp-vide">non disponible</span>`;
      return `<span class="d-an2${a === y ? " sel" : ""}">${a}</span><div class="emp">${mods.map((mo) => { const x = ms.find((z) => z.code === mo.code); if (!x || !x.v) return "";
        const pc = (x.v / tot) * 100; return `<span class="seg" style="flex:${x.v};background:${coul[mo.code]}" title="${esc(mo.libelle)} ${a} : ${G.fmt(ind, x.v)} (${G.nb(pc, 0)} %)">${pc >= 12 ? `${G.nb(pc, 0)} %` : ""}</span>`; }).join("")}</div>`;
    }).join("");
    return `<div class="d-ventil">${rows}</div><div class="legendes">${mods.map((mo) => `<span class="leg"><i style="background:${coul[mo.code]}"></i>${esc(mo.libelle)}</span>`).join("")}</div>`;
  }

  G.detail = function (ind, y, axeFocus) {
    const d = G.m.ind.get(ind), inds = jumeaux(ind), ans = G.m.annees;
    const axes = d.axes.split(",").filter(Boolean);
    const ax = axes.includes(axeFocus) ? axeFocus : axes[0];
    const titresAxe = { nature: "Nature", secteur: "Secteur", origine: "Origine", filiere: "Filière", cper: "Type de projet CPER", recette: "Recettes", depense: "Dépenses", budget: "Budget" };
    // tableau complet : séries × années (+ ventilations)
    const lignesT = inds.flatMap((i) => [[G.m.ind.get(i).libelle_court, "", i, ""],
      ...[...G.m.mod.values()].filter((mo) => ans.some((a) => brut(i, a, mo.code) !== null)).map((mo) => ["", mo.libelle, i, mo.code])]);
    const table = `<details class="donnees"><summary>Tableau ${ans[0]}–${ans[ans.length - 1]}</summary><div class="d-scroll"><table><thead><tr><th>Indicateur</th><th>Ventilation</th>${ans.map((a) => `<th class="n">${a}</th>`).join("")}</tr></thead><tbody>
      ${lignesT.map(([l, m2, i, mo]) => `<tr${mo ? "" : ' class="tot"'}><td>${esc(l)}</td><td>${esc(m2)}</td>${ans.map((a) => { const v = mo ? brut(i, a, mo) : G.val(i, a); return `<td class="n">${v === null ? "–" : G.fmt(i, v)}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div></details>`;
    // évolution moyenne sur la période disponible
    const pts = ans.map((a) => ({ a, v: G.val(ind, a) })).filter((p) => p.v !== null);
    let synthese = "";
    if (pts.length >= 2) {
      const p0 = pts[0], p1 = pts[pts.length - 1], hi = pts.reduce((m, p) => (p.v > m.v ? p : m)), lo = pts.reduce((m, p) => (p.v < m.v ? p : m));
      const ev = d.unite === "%" ? `${p1.v - p0.v >= 0 ? "+" : "−"}${G.nb(Math.abs(p1.v - p0.v), 1)} pt` : `${p1.v - p0.v >= 0 ? "+" : "−"}${G.nb(Math.abs((p1.v - p0.v) / p0.v) * 100, 1)} %`;
      synthese = `${inds.length > 1 ? esc(d.libelle_court) + " : d" : "D"}e ${p0.a} à ${p1.a} : ${G.fmt(ind, p0.v)} → ${G.fmt(ind, p1.v)} (${ev}). Maximum en ${hi.a} (${G.fmt(ind, hi.v)}), minimum en ${lo.a} (${G.fmt(ind, lo.v)}).`;
    }
    return `<div class="d-tete"><div><div class="kicker">${esc(G.m.dom.find((x) => x.code === d.domaine)?.libelle || "")} · détail ${ans[0]}–${ans[ans.length - 1]}</div>
        <h2>${esc(inds.length > 1 ? inds.map((i) => G.m.ind.get(i).libelle_court).join(" et ") : d.libelle)}</h2></div>
        <div class="d-codes">${inds.map(code).join(" ")}<button type="button" class="d-fermer" aria-label="Fermer">×</button></div></div>
      <p class="lecture">${synthese}${d.calcul ? ` Taux recalculé (${esc(d.calcul)}) quand les composantes existent.` : ""}</p>
      <div class="boite">${colonnes(inds, y)}</div>
      ${ax ? `<div class="boite"><div class="boite-tete"><span>Répartition par ${esc((titresAxe[ax] || ax).toLowerCase())} · ${esc(d.libelle_court)}</span>
        <span class="d-onglets" role="tablist">${axes.length > 1 ? axes.map((a2) => `<button type="button" role="tab" data-axe="${a2}" aria-selected="${a2 === ax}">${esc(titresAxe[a2] || a2)}</button>`).join("") : ""}
        ${inds.length > 1 ? (axes.length > 1 ? '<span class="d-sep"></span>' : "") + inds.map((i) => `<button type="button" role="tab" data-ind="${i}" aria-selected="${i === ind}">${esc(G.m.ind.get(i).libelle_court)}</button>`).join("") : ""}</span></div>
        ${ventilAnnees(ind, ax, y)}</div>` : ""}
      ${table}`;
  };

  /* ---------- En bref (règles) ---------- */
  G.bref = function (y) {
    const p = G.prec(y), out = [];
    const v = (c) => G.val(c, y), e = (c) => G.evol(c, y);
    const tend = (c) => { const x = e(c); if (!x) return ""; const s = Math.abs(x.v) < (x.type === "pt" ? 0.5 : 2) ? "stable" : x.v > 0 ? "en hausse" : "en baisse"; return ` (${s}, ${G.fmtEvol(x)})`; };
    if (v("ACC01") !== null) out.push(`${G.nb(v("ACC01"))} projets d'entreprise accompagnés${tend("ACC01")}, dont ${v("ACC02") !== null ? G.nb(v("ACC02")) + " décidés" : "[décidés non disponibles]"}${v("ACC03") !== null ? ` (${G.fmt("ACC03", v("ACC03"))})` : ""}.`);
    if (v("EMA02") !== null) out.push(`${G.nb(v("EMA02"))} personnes ont accédé à un emploi durable${v("EMA03") !== null ? `, soit ${G.fmt("EMA03", v("EMA03"))} des personnes accompagnées` : ""}${tend("EMA02")}.`);
    if (v("INS01") !== null) out.push(`${G.nb(v("INS01"))} heures d'insertion dans les marchés publics${tend("INS01")}.`);
    if (v("IMM02") !== null) out.push(`Parc locatif occupé à ${G.fmt("IMM02", v("IMM02"))}${tend("IMM02")}.`);
    if (v("BUD03") !== null) out.push(`Résultat de l'agence : ${v("BUD03") >= 0 ? "+" : ""}${G.fmt("BUD03", v("BUD03"))}${p && G.val("BUD03", p) !== null ? ` (${G.fmt("BUD03", G.val("BUD03", p))} en ${p})` : ""}.`);
    return out.join(" ");
  };
  G.erreur = (el, e) => { el.innerHTML = `<div class="erreur"><strong>Chargement impossible.</strong> ${esc(e.message)}<br>Ouvrir la page via un serveur (GitHub Pages, SharePoint, <code>python -m http.server</code>) ou générer <code>data/data.js</code> avec <code>build_data</code>.</div>`; };
})();
