/* Baromètre DPE · Aldev — moteur commun TB01 / TB02
   Aucune valeur en dur : tout vient de data/*.csv (ou data/data.js en secours file://). */
(function () {
  "use strict";
  const A = (window.BARO = {});
  const FICHIERS = ["dim_indicateur", "dim_territoire", "dim_bloc", "fait_valeur"];
  const COUL = { favorable: "#1D5F8A", defavorable: "#A3461A", neutre: "#4A5A66" };
  A.SERIES = { ZE5202: "#C8243B", FR: "#1F2A33", D49: "#3E7C8C", R52: "#9DB6BE" };

  /* ---------- Chargement ---------- */
  const parseCSV = (txt) => {
    const l = txt.replace(/^\uFEFF/, "").split(/\r?\n/).filter((x) => x.trim() !== "");
    const h = l.shift().split(";").map((x) => x.trim());
    return l.map((r) => { const c = r.split(";"); const o = {}; h.forEach((k, i) => (o[k] = (c[i] ?? "").trim())); return o; });
  };
  const viaScript = (src) => new Promise((ok, ko) => {
    const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => ko(new Error(src)); document.head.appendChild(s);
  });
  async function textes() {
    try { // 1) fetch des CSV (SharePoint, GitHub Pages, serveur local)
      return Object.fromEntries(await Promise.all(FICHIERS.map(async (f) => {
        const r = await fetch(`data/${f}.csv`, { cache: "no-store" });
        if (!r.ok) throw new Error(`${f}.csv : HTTP ${r.status}`);
        return [f, await r.text()];
      })));
    } catch (e) { // 2) secours file:// : data/data.js généré par build_data
      await viaScript("data/data.js");
      if (!window.DATA) throw new Error("Données introuvables (ni CSV ni data/data.js)");
      A.modeSecours = true;
      return window.DATA;
    }
  }
  A.charger = async function () {
    const t = await textes();
    const m = {
      ind: new Map(parseCSV(t.dim_indicateur).map((r) => [r.code, r])),
      terr: new Map(parseCSV(t.dim_territoire).map((r) => [r.code, r])),
      bloc: new Map(parseCSV(t.dim_bloc).map((r) => [r.code, r])),
      faits: new Map()
    };
    for (const r of parseCSV(t.fait_valeur)) {
      const k = `${r.indicateur}|${r.territoire}|${r.mesure}`;
      if (!m.faits.has(k)) m.faits.set(k, []);
      m.faits.get(k).push({ p: r.periode, v: parseFloat(r.valeur), source: r.source, millesime: r.millesime });
    }
    m.faits.forEach((s) => s.sort((a, b) => a.p.localeCompare(b.p)));
    A.m = m;
    return m;
  };

  /* ---------- Accès aux données ---------- */
  A.serie = (ind, terr, mes = "valeur") => A.m.faits.get(`${ind}|${terr}|${mes}`) || [];
  A.dernier = (ind, terr, mes = "valeur") => { const s = A.serie(ind, terr, mes); return s.length ? s[s.length - 1] : null; };
  A.a = (ind, terr, mes, p) => { const x = A.serie(ind, terr, mes).find((r) => r.p === p); return x ? x.v : null; };
  const MES_NIVEAU = ["valeur", "stock", "cumul_12m"];
  A.niveau = (ind, terr) => { for (const mes of MES_NIVEAU) { const d = A.dernier(ind, terr, mes); if (d) return { ...d, mes }; } return null; };
  A.territoireAvecDonnee = (ind, liste) => liste.find((t) => A.niveau(ind, t)) || null;
  A.terrDuBloc = (b) => (b.territoires || "").split(",").map((x) => x.trim()).filter(Boolean);
  A.indDuBloc = (b) => (b.indicateurs || "").split(",").map((x) => x.trim()).filter(Boolean);

  // Évolution calculée depuis la série (EMP01 : points vs T-1 et T-4)
  A.ecartSerie = (ind, terr, recul, p) => {
    const s = A.serie(ind, terr); const i = p ? s.findIndex((r) => r.p === p) : s.length - 1;
    return i >= recul && i >= 0 ? s[i].v - s[i - recul].v : null;
  };
  // Évolutions disponibles pour un indicateur : calculées (unité %) ou lues (lignes evol_*)
  A.evolutions = (ind, terr) => {
    const def = A.m.ind.get(ind); const ev = {};
    if (def.unite === "%") {
      const t = A.ecartSerie(ind, terr, 1), y = A.ecartSerie(ind, terr, 4);
      if (t !== null) ev.trim = { v: t, type: "pt" };
      if (y !== null) ev.an = { v: y, type: "pt" };
    }
    const lu = (mes, cle, type) => { const d = A.dernier(ind, terr, mes); if (d && !ev[cle]) ev[cle] = { v: d.v, type }; };
    lu("evol_1an_pct", "an", "pct"); lu("evol_1an", "an", "abs"); lu("evol_trim", "trim", "abs");
    return ev;
  };

  /* ---------- Règles de couleur ---------- */
  A.couleur = (ind, v) => {
    const s = A.m.ind.get(ind)?.sens_favorable;
    if (!v || s === "neutre" || !s) return COUL.neutre;
    return (v > 0) === (s === "hausse") ? COUL.favorable : COUL.defavorable;
  };
  A.fleche = (v) => (v > 0 ? "▲" : v < 0 ? "▼" : "=");

  /* ---------- Formats français ---------- */
  const nf = (d) => new Intl.NumberFormat("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
  A.nb = (v, d = 0) => nf(d).format(v).replace(/-/g, "−");
  A.signe = (v, d) => (v > 0 ? "+" : "") + A.nb(Math.abs(v) < 1e-9 ? 0 : v, d);
  A.pts = (v) => `${A.signe(v, 1)} ${Math.abs(v) >= 2 ? "pts" : "pt"}`;
  A.fmtEvol = (e) => e.type === "pt" ? A.pts(e.v) : e.type === "pct" ? `${A.signe(e.v, 1)} %` : A.signe(e.v, 0);
  A.fmtNiveau = (ind, v) => {
    const u = A.m.ind.get(ind).unite;
    if (u === "%") return `${A.nb(v, 1)} %`;
    if (u === "ratio") return A.nb(v, 2);
    return A.nb(v, 0);
  };

  /* ---------- Périodes ---------- */
  const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  A.per = (p) => {
    let m = /^(\d{4})-T(\d)$/.exec(p); if (m) return { t: "T", a: +m[1], n: +m[2] };
    m = /^(\d{4})-(\d{2})$/.exec(p); if (m) return { t: "M", a: +m[1], n: +m[2] };
    return { t: "?", a: 0, n: 0, brut: p };
  };
  const maj = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  A.perLib = (p, mes) => {
    const x = A.per(p);
    if (x.t === "T") return `T${x.n} ${x.a}`;
    if (x.t === "M") return (mes === "valeur" || mes === "stock" ? `Fin ${MOIS[x.n - 1]}` : maj(MOIS[x.n - 1])) + ` ${x.a}`;
    return p;
  };
  A.perCourt = (p) => { const x = A.per(p); return x.t === "T" ? `T${x.n} ${String(x.a).slice(2)}` : p; };
  A.perOrdinal = (p) => { const x = A.per(p); return x.t === "T" ? `${x.n}<sup>${x.n === 1 ? "er" : "e"}</sup> trimestre ${x.a}` : A.perLib(p); };
  A.dateFr = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ""); return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || ""; };

  const MAILLE = { ZE: "ZE", EPCI: "ALM", departement: "Maine-et-Loire", region: "Pays de la Loire" };
  A.maille = (ind) => MAILLE[A.m.ind.get(ind).maille] || A.m.ind.get(ind).maille;
  A.min1 = (s) => (/^.[a-zà-ÿ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  A.lib = (terr) => A.m.terr.get(terr)?.libelle || terr;

  /* ---------- Composants HTML ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  A.esc = esc;
  A.code = (c) => `<span class="code">${esc(c)}</span>`;
  A.tuile = ({ code, titre, valeur, ligne, couleur, sous, vide, petite, discret }) => `
    <div class="tuile${vide ? " vide" : ""}${petite ? " petite" : ""}">
      <div class="t-tete"><span class="t-titre">${esc(titre)}</span>${A.code(code)}</div>
      <div class="t-val">${vide ? "[à charger]" : valeur}</div>
      ${ligne ? `<div class="t-evol${discret ? " discret" : ""}" style="color:${couleur || COUL.neutre}">${ligne}</div>` : ""}
      ${sous ? `<div class="t-sous">${sous}</div>` : ""}
    </div>`;
  A.legende = (series) => series.map((s) => `<span class="leg"><i style="background:${s.couleur}"></i>${esc(s.nom)}</span>`).join("");

  /* ---------- Courbe SVG ---------- */
  A.courbe = function ({ ind, terrs, debut, annoter, aria, H = 290 }) {
    const W = 700, x0 = 40, x1 = 680, yT = 24, yB = H - 32;
    const series = terrs.map((t) => ({ t, s: A.serie(ind, t).filter((r) => !debut || r.p >= debut) })).filter((x) => x.s.length);
    const periodes = [...new Set(series.flatMap((x) => x.s.map((r) => r.p)))].sort();
    const vals = series.flatMap((x) => x.s.map((r) => r.v));
    const lo = Math.floor(Math.min(...vals) - 0.2), hi = Math.ceil(Math.max(...vals) + 0.2);
    const X = (p) => x0 + (periodes.indexOf(p) / Math.max(1, periodes.length - 1)) * (x1 - x0);
    const Y = (v) => yB - ((v - lo) / (hi - lo)) * (yB - yT);
    let g = `<g stroke="#E3E9EC" stroke-width="1">`, lab = `<g class="axe">`;
    const pas = hi - lo > 6 ? 2 : 1;
    for (let v = lo; v <= hi; v += pas) { g += `<line x1="34" y1="${Y(v)}" x2="690" y2="${Y(v)}"/>`; lab += `<text x="0" y="${Y(v) + 4}">${A.nb(v, 0)} %</text>`; }
    periodes.forEach((p) => { if (A.per(p).n === 4) lab += `<text x="${X(p)}" y="${H - 6}" text-anchor="middle">${A.perCourt(p)}</text>`; });
    g += "</g>"; lab += "</g>";
    // Angers dessiné en dernier (au-dessus)
    const ordre = [...series].sort((a, b) => (a.t === "ZE5202") - (b.t === "ZE5202"));
    const lignes = ordre.map(({ t, s }) => `<polyline fill="none" stroke="${A.SERIES[t] || "#888"}" stroke-width="${t === "ZE5202" ? 3.2 : 2.3}" stroke-linejoin="round"
      points="${s.map((r) => `${X(r.p).toFixed(1)},${Y(r.v).toFixed(1)}`).join(" ")}"/>`).join("");
    let ann = "";
    if (annoter) {
      const s = A.serie(ind, annoter).filter((r) => !debut || r.p >= debut), c = A.SERIES[annoter];
      const bas = s.reduce((m, r) => (r.v < m.v ? r : m), s[0]), fin = s[s.length - 1];
      ann += `<circle cx="${X(bas.p)}" cy="${Y(bas.v)}" r="4.5" fill="${c}"/><text class="ann" x="${X(bas.p)}" y="${Y(bas.v) + 19}" text-anchor="middle" fill="${c}">${A.nb(bas.v, 1)} %</text>`;
      ann += `<circle cx="${X(fin.p)}" cy="${Y(fin.v)}" r="5.5" fill="${c}"/><text class="ann" x="${X(fin.p) - 8}" y="${Y(fin.v) - 12}" text-anchor="middle" fill="${c}">${A.nb(fin.v, 1)} %</text>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">${g}${lab}${lignes}${ann}</svg>`;
  };

  // Lecture automatique d'une série : point bas + tendance en cours
  A.lectureSerie = (ind, terr, debut) => {
    const s = A.serie(ind, terr).filter((r) => !debut || r.p >= debut);
    if (s.length < 3) return "";
    const bas = s.reduce((m, r) => (r.v < m.v ? r : m), s[0]);
    let i = s.length - 1; const sens = Math.sign(s[i].v - s[i - 1].v);
    while (i > 0 && Math.sign(s[i].v - s[i - 1].v) * sens >= 0) i--;
    const n = s.length - 1 - i, d = s[s.length - 1].v - s[i].v;
    let t = `Point bas au ${A.perLib(bas.p)} (${A.nb(bas.v, 1)} %).`;
    if (sens !== 0 && n >= 2) t += ` ${sens > 0 ? "Hausse" : "Baisse"} continue depuis le ${A.perLib(s[i].p)} : ${A.pts(d)} en ${n} trimestres.`;
    return t;
  };

  /* ---------- Cadre de page ---------- */
  A.ajuster = (page) => { // affichage homothétique à l'écran ; impression à 100 %
    const f = () => { const k = Math.min(1, (window.innerWidth - 24) / page.offsetWidth); page.style.setProperty("--k", k); page.parentElement.style.height = page.offsetHeight * k + "px"; };
    window.addEventListener("resize", f); f();
  };
  A.erreur = (el, e) => { el.innerHTML = `<div class="erreur"><strong>Chargement impossible.</strong> ${esc(e.message)}<br>Ouvrir la page via un serveur (GitHub Pages, SharePoint, <code>python -m http.server</code>) ou générer <code>data/data.js</code> avec <code>build_data</code>.</div>`; };
})();
