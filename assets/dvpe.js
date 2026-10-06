/* DVPE · Aldev — moteur commun : chargement des données et rendu des fiches */
(function () {
  const D = (window.DVPE = { fiches: {}, liste: [] });

  D.fiche = function (d) { D.fiches[d.id] = d; };

  // Chargement par <script> : fonctionne sur GitHub Pages ET en ouverture locale (file://)
  D.charger = (src) => new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src; s.onload = ok; s.onerror = () => ko(new Error("Fichier introuvable : " + src));
    document.head.appendChild(s);
  });
  D.fichier = (n) => "data/fiches/fiche-" + String(n).padStart(2, "0") + ".js";

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Balisage léger : **gras**, ^exposant^, [à compléter]
  const t = (D.txt = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\^(.+?)\^/g, "<sup>$1</sup>")
    .replace(/\[([^\]]*)\]/g, '<em class="todo">[$1]</em>'));

  const SYM = {
    "+": '<span class="sym plus" aria-label="favorisé">▲</span>',
    "=": '<span class="sym neutre" aria-label="neutre">●</span>',
    "-": '<span class="sym moins" aria-label="pénalisé">▼</span>'
  };
  const STATUT = {
    ok: '<span class="st ok">● en place</span>',
    partiel: '<span class="st partiel">◐ partiel</span>',
    non: '<span class="st non">○ non déployé</span>'
  };

  function barre(b) {
    if (!b) return "";
    if (b.type === "jauge") {
      const p = (b.valeur / b.max) * 100, r = (b.repere / b.max) * 100;
      return `<div class="barre" role="img" aria-label="${b.valeur} sur une échelle de ${b.max}, repère ${b.repere}">
        <span class="rempli" style="width:${p}%"></span><span class="repere" style="left:${r}%"></span></div>`;
    }
    if (b.type === "parts") {
      return `<div class="barre parts" role="img" aria-label="${b.parts.map((x) => x.v + " %").join(", ")}">${b.parts
        .map((x) => `<span class="part ${x.ton || "rempli"}" style="width:${x.v}%"></span>`).join("")}</div>`;
    }
    if (b.type === "pct") {
      return `<div class="barre-pct"><div class="barre"><span class="rempli" style="width:${b.valeur}%"></span></div><strong>${b.valeur} %</strong></div>`;
    }
    return "";
  }

  function scenario(s, brouillon) {
    return `<article class="scen c-${s.couleur}${brouillon ? " brouillon" : ""}">
      <header><h3>${s.lettre} · ${t(s.nom)}</h3><p>${t(s.role)}</p></header>
      <div class="scen-corps">
        ${barre(s.barre)}
        ${s.chiffre ? `<p class="scen-chiffre">${t(s.chiffre)}</p>` : ""}
        ${s.declencheur ? `<p class="declencheur"><strong>Déclencheur :</strong> ${t(s.declencheur)}</p>` : ""}
        <p>${t(s.texte)}</p>
        <p class="eff"><span class="sym plus" aria-label="favorisé">▲</span> ${t(s.plus)}</p>
        <p class="eff"><span class="sym moins" aria-label="pénalisé">▼</span> ${t(s.moins)}</p>
        ${s.carte ? `<p class="carte"><strong>Carte ALM :</strong> ${t(s.carte)}</p>` : ""}
      </div></article>`;
  }

  function bloc5(b) {
    let h = "";
    if (b.type === "etapes") {
      h += `<ol class="etapes">${b.etapes.map((e) => `<li class="${e.etat || ""}">
        <span class="pastille">${e.etat === "fait" ? "✓" : esc(e.n)}</span>
        <strong>${t(e.titre)}</strong><span>${t(e.sous)}</span></li>`).join("")}</ol>`;
    }
    if (b.type === "grille") {
      h += `<table class="tab"><thead><tr><th>${esc(b.entete)}</th>${b.colonnes.map((c, i) => `<th class="col c${i}">${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${b.lignes.map((l) => `<tr><td>${t(l[0])}</td>${l.slice(1).map((v) => `<td class="col">${SYM[v]}</td>`).join("")}</tr>`).join("")}</tbody></table>
        <p class="legende">▲ ${esc(b.legende.plus)} · ● ${esc(b.legende.neutre)} · ▼ ${esc(b.legende.moins)}. ${t(b.legende.lecture)}</p>`;
    }
    if (b.type === "matrice") {
      h += `<table class="tab matrice"><thead><tr><th>${esc(b.entete)}</th>${b.colonnes.map((c) => `<th class="col">${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${b.lignes.map((l) => `<tr><td>${t(l[0])}</td>${l.slice(1).map((v) => `<td class="col"><span class="case ${v}" title="${esc(b.codes[v])}"><span class="sr">${esc(b.codes[v])}</span></span></td>`).join("")}</tr>`).join("")}</tbody></table>
        <p class="legende">${Object.entries(b.codes).map(([k, v]) => `<span class="case ${k}"></span> ${esc(v)}`).join("   ")}</p>`;
    }
    if (b.type === "statuts") {
      h += `<table class="tab"><thead><tr><th>${esc(b.entete)}</th><th>Statut</th></tr></thead>
        <tbody>${b.lignes.map((l) => `<tr><td>${t(l[0])}</td><td>${STATUT[l[1]]}</td></tr>`).join("")}</tbody></table>`;
    }
    if (b.note) h += `<p class="note5">${t(b.note)}</p>`;
    if (b.pistes) h += `<h3 class="sous-titre">${esc(b.pistes.titre)}</h3><ul class="pistes">${b.pistes.items.map((p) => `<li><strong>${esc(p.t)}</strong> · ${t(p.d)}</li>`).join("")}</ul>`;
    if (b.apres) h += `<p>${t(b.apres)}</p>`;
    return h;
  }

  function reel(r) {
    return `${(r.items || []).map((i) => `<p><b>${esc(i.date)}</b> · ${t(i.texte)}</p>`).join("")}
      ${r.liste ? `<p class="liste-titre">${t(r.liste.titre)}</p><ul>${r.liste.items.map((x) => `<li>${t(x)}</li>`).join("")}</ul>` : ""}
      <p class="apport"><strong>L'apport de la prospective :</strong> ${t(r.apport)}</p>`;
  }

  D.rendreFiche = function (f) {
    const n = f.id;
    const prec = D.liste.includes(n - 1) ? n - 1 : null, suiv = D.liste.includes(n + 1) ? n + 1 : null;
    document.title = `Fiche ${n} · ${f.titre} · DVPE Aldev`;
    return `
    <header class="f-tete">
      <a class="marque" href="index.html" aria-label="Accueil DVPE"><span>aldev</span><small>Angers Loire Développement</small></a>
      <div class="f-titres">
        <p class="kicker">DVPE · Fiche prospective n°${n}${f.statut === "en cours" ? ' <span class="badge">En cours</span>' : ""}</p>
        <h1>${t(f.titre)}</h1>
        <p class="f-sous">${t(f.sousTitre)}</p>
      </div>
      <div class="f-meta"><strong>${esc(f.periode)}</strong>${f.meta.map((m) => `<span>${esc(m)}</span>`).join("")}</div>
    </header>

    <div class="rangee deux">
      <section class="encart"><h2>1 · Le point de départ</h2>${f.depart.map((p) => `<p>${t(p)}</p>`).join("")}</section>
      <section class="encart"><h2>2 · Le matériau mobilisé</h2>
        <div class="tuiles">${f.materiau.chiffres.map((c) => `<div><b>${t(c.v)}</b><span>${t(c.l)}</span></div>`).join("")}</div>
        <p class="sources">${t(f.materiau.sources)}</p></section>
    </div>

    <section>
      <div class="titre-ligne"><h2>3 · ${t(f.diagnostic.titre)}</h2>${f.diagnostic.alerte ? `<span class="alerte">${esc(f.diagnostic.alerte)}</span>` : ""}</div>
      <div class="diag">${f.diagnostic.chiffres.map((c) => `<div><b>${t(c.v)}</b><span>${t(c.l)}</span></div>`).join("")}</div>
    </section>

    <section>
      <div class="titre-ligne"><h2>4 · ${t(f.scenarios.titre)}</h2>${f.scenarios.note ? `<span class="note">${esc(f.scenarios.note)}</span>` : ""}</div>
      ${f.scenarios.variables ? `<ul class="puces">${f.scenarios.variables.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>` : ""}
      <div class="scens">${f.scenarios.liste.map((s) => scenario(s, f.scenarios.brouillon)).join("")}</div>
    </section>

    <div class="rangee deux">
      <section><h2>5 · ${t(f.bloc5.titre)}</h2>${bloc5(f.bloc5)}</section>
      <section class="reel"><h2>6 · ${t(f.reel.titre)}</h2>${reel(f.reel)}</section>
    </div>

    <footer class="f-pied"><span>${t(f.source)}</span><span>DVPE · Aldev</span></footer>

    <nav class="f-nav" aria-label="Navigation entre fiches">
      ${prec ? `<a href="fiche.html?n=${prec}">‹ Fiche ${prec}</a>` : "<span></span>"}
      <a href="prospectives.html">Toutes les prospectives</a>
      ${suiv ? `<a href="fiche.html?n=${suiv}">Fiche ${suiv} ›</a>` : "<span></span>"}
    </nav>`;
  };

  D.erreur = (el, e) => { el.innerHTML = `<p class="erreur">${esc(e.message)}. Vérifier le numéro de fiche et la présence du fichier dans data/fiches/.</p>`; };
})();
