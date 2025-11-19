// app.js
// Version "pro" : même logique de bulles pour GPS, profil physique et antécédents,
// + zones anatomiques claires avec tous les tests, différences D/G, % poids de corps
// et position par rapport à la moyenne du groupe.

// ================== ETAT GLOBAL ================== 

let currentPlayerId = null;
let searchTerm = "";
let currentLineFilter = "all";
let currentStatusFilter = "all";

let activeGpsMetric = null;
let activePhysicalMetric = null;
let activeInjuryMetric = null;
let activeTestId = null;

// Références vers graphiques Chart.js pour les détruire proprement
const chartsStore = {
  gps: null,
  physical: null,
  injury: null,
  test: null,
};

// ================== STRUCTURE DES TESTS ================== 

// Tous les tests référencés : id unique -> description pour affichage et synthèse
const TEST_DEFINITION = {
  cervical_flex: { label: "Cervical – Flexion", zone: "Rachis cervical" },
  cervical_ext: { label: "Cervical – Extension", zone: "Rachis cervical" },
  cervical_incl: { label: "Cervical – Inclinaisons", zone: "Rachis cervical" },

  shoulder_ash: { label: "Épaule – ASH Test", zone: "Épaule" },

  knee_quad_iso: { label: "Genou – Quadriceps – ISO 90°", zone: "Genou quadriceps" },
  knee_ham_mccall: { label: "Genou – Ischios – McCall", zone: "Genou ischios" },
  knee_ham_iso30: { label: "Genou – Ischios – NordBoard ISO30", zone: "Genou ischios" },

  ankle_soleus: { label: "Cheville – Soléaire (Force desk)", zone: "Cheville" },
  ankle_inv_evr: { label: "Cheville – Inverseurs/Éverseurs (Dynamo)", zone: "Cheville" },
  ankle_gastro_hr: { label: "Cheville – Heel Raise", zone: "Cheville" },
};

// Structure pour l'affichage des zones anatomiques
const ANATOMY_STRUCTURE = [
  {
    title: "Rachis cervical",
    tests: ["cervical_flex", "cervical_ext", "cervical_incl"],
  },
  {
    title: "Épaule",
    tests: ["shoulder_ash"],
  },
  {
    title: "Genou – Quadriceps",
    tests: ["knee_quad_iso"],
  },
  {
    title: "Genou – Ischios – McCall",
    tests: ["knee_ham_mccall"],
  },
  {
    title: "Genou – Ischios – ISO30",
    tests: ["knee_ham_iso30"],
  },
  {
    title: "Cheville – Soléaire",
    tests: ["ankle_soleus"],
  },
  {
    title: "Cheville – Inverseurs/Éverseurs",
    tests: ["ankle_inv_evr"],
  },
  {
    title: "Cheville – Gastroc – Heel Raise",
    tests: ["ankle_gastro_hr"],
  },
];

// Moyennes du groupe par test (à ajuster plus tard si tu veux les pluger sur des vraies données)
const TEAM_TEST_AVERAGES = {
  cervical_flex: 220,
  cervical_ext: 240,
  cervical_incl: 210,
  shoulder_ash: 38,
  knee_quad_iso: 3.1,        // N/kg ou valeur relative
  knee_ham_mccall: 9,        // nb de répétitions
  knee_ham_iso30: 1.7,       // N/kg
  ankle_soleus: 3.4,
  ankle_inv_evr: 1.8,
  ankle_gastro_hr: 28,
};

// ================== DONNÉES JOUEURS (EXEMPLES) ================== 

const players = [
  {
    id: "J001",
    nom: "Dupont",
    prenom: "Arthur",
    poste: "9",
    ligne: "Trois-quarts",
    statut: "Disponible",
    disponibilite: "Apte",
    scoreGlobal: 88,
    pointsForts: "Vitesse, prise d'info",
    pointsFaibles: "Force quadriceps",
    antecedentsTexte: "Entorse cheville G 2023, lésion ischio D 2024",
    taille: 175,
    poids: 80,
    masseGrasse: 10,
    minutesJouees: 620,
    photoUrl: "", // image optionnelle
    dateNaissance: "2005-03-12",
    risqueProfil: "Modéré",

    // Profils physiques -> bulles + historique
    physicalProfile: {
      speed: {
        label: "Vitesse",
        lastValue: 9.9,
        unit: "m/s",
        history: [
          { date: "2025-06-01", value: 9.5 },
          { date: "2025-08-01", value: 9.7 },
          { date: "2025-10-01", value: 9.9 },
        ],
      },
      power: {
        label: "Puissance (CMJ)",
        lastValue: 45,
        unit: "cm",
        history: [
          { date: "2025-06-01", value: 42 },
          { date: "2025-08-01", value: 44 },
          { date: "2025-10-01", value: 45 },
        ],
      },
      strength: {
        label: "Force (1RM squat)",
        lastValue: 140,
        unit: "kg",
        history: [
          { date: "2025-06-01", value: 130 },
          { date: "2025-08-01", value: 135 },
          { date: "2025-10-01", value: 140 },
        ],
      },
      bodyComp: {
        label: "Masse grasse",
        lastValue: 10,
        unit: "%",
        history: [
          { date: "2025-06-01", value: 11.5 },
          { date: "2025-08-01", value: 10.8 },
          { date: "2025-10-01", value: 10.0 },
        ],
      },
    },

    // GPS -> bulles + historique
    gpsMetrics: {
      totalDistance: {
        label: "Distance totale",
        lastValue: 7.6,
        unit: "km",
        history: [
          { date: "2025-09-01", value: 7.2 },
          { date: "2025-09-15", value: 7.5 },
          { date: "2025-10-01", value: 7.6 },
        ],
      },
      hsr: {
        label: "HSR",
        lastValue: 550,
        unit: "m",
        history: [
          { date: "2025-09-01", value: 480 },
          { date: "2025-09-15", value: 520 },
          { date: "2025-10-01", value: 550 },
        ],
      },
      sprintLoad: {
        label: "Sprints",
        lastValue: 12,
        unit: "nb",
        history: [
          { date: "2025-09-01", value: 9 },
          { date: "2025-09-15", value: 11 },
          { date: "2025-10-01", value: 12 },
        ],
      },
    },

    // Antécédents -> bulles + historique détaillé
    injuries: [
      {
        id: "inj_ischio_2024",
        label: "Ischio D · 2024",
        zone: "Ischio droit",
        type: "Lésion musculaire",
        dateDebut: "2024-03-10",
        dateRetour: "2024-04-05",
        severite: "Modérée",
        impact: "4 matchs manqués",
        notes: "Bonne tolérance à la reprise haute vitesse.",
        history: [
          { date: "2024-03-10", etape: "Blessure match" },
          { date: "2024-03-15", etape: "Début renfo excentrique" },
          { date: "2024-03-25", etape: "Retour course linéaire" },
          { date: "2024-04-05", etape: "Retour terrain complet" },
        ],
      },
      {
        id: "inj_cheville_2023",
        label: "Cheville G · 2023",
        zone: "Cheville gauche",
        type: "Entorse",
        dateDebut: "2023-10-18",
        dateRetour: "2023-11-10",
        severite: "Légère",
        impact: "2 matchs manqués",
        notes: "Renforcer stabilité latérale.",
        history: [
          { date: "2023-10-18", etape: "Blessure entraînement" },
          { date: "2023-10-22", etape: "Début renfo proprio" },
          { date: "2023-11-10", etape: "Retour match" },
        ],
      },
    ],

    // Tests par id => toujours gauche/droite
    tests: {
      cervical_flex: { left: 215, right: 220 },
      cervical_ext: { left: 235, right: 242 },
      cervical_incl: { left: 205, right: 210 },

      shoulder_ash: { left: 37, right: 39 },

      knee_quad_iso: { left: 3.0, right: 3.2 },
      knee_ham_mccall: { left: 8, right: 9 },
      knee_ham_iso30: { left: 1.6, right: 1.8 },

      ankle_soleus: { left: 3.3, right: 3.5 },
      ankle_inv_evr: { left: 1.7, right: 1.9 },
      ankle_gastro_hr: { left: 27, right: 29 },
    },
  },

  // === Joueur 2 (exemple) ===
  {
    id: "J002",
    nom: "Martin",
    prenom: "Léo",
    poste: "3",
    ligne: "Avants",
    statut: "Blessé",
    disponibilite: "Réathlé terrain",
    scoreGlobal: 76,
    pointsForts: "Force max, mêlée",
    pointsFaibles: "Vitesse, HSR",
    antecedentsTexte: "Commotion 2024, tendinopathie rotulienne 2023",
    taille: 186,
    poids: 112,
    masseGrasse: 16,
    minutesJouees: 430,
    photoUrl: "",
    dateNaissance: "2005-08-21",
    risqueProfil: "Élevé",

    physicalProfile: {
      speed: {
        label: "Vitesse",
        lastValue: 8.5,
        unit: "m/s",
        history: [
          { date: "2025-06-01", value: 8.2 },
          { date: "2025-08-01", value: 8.4 },
          { date: "2025-10-01", value: 8.5 },
        ],
      },
      power: {
        label: "Puissance (CMJ)",
        lastValue: 33,
        unit: "cm",
        history: [
          { date: "2025-06-01", value: 31 },
          { date: "2025-08-01", value: 32 },
          { date: "2025-10-01", value: 33 },
        ],
      },
      strength: {
        label: "Force (1RM squat)",
        lastValue: 190,
        unit: "kg",
        history: [
          { date: "2025-06-01", value: 180 },
          { date: "2025-08-01", value: 185 },
          { date: "2025-10-01", value: 190 },
        ],
      },
      bodyComp: {
        label: "Masse grasse",
        lastValue: 16,
        unit: "%",
        history: [
          { date: "2025-06-01", value: 17.5 },
          { date: "2025-08-01", value: 16.8 },
          { date: "2025-10-01", value: 16.0 },
        ],
      },
    },

    gpsMetrics: {
      totalDistance: {
        label: "Distance totale",
        lastValue: 5.4,
        unit: "km",
        history: [
          { date: "2025-09-01", value: 5.2 },
          { date: "2025-09-15", value: 5.3 },
          { date: "2025-10-01", value: 5.4 },
        ],
      },
      hsr: {
        label: "HSR",
        lastValue: 220,
        unit: "m",
        history: [
          { date: "2025-09-01", value: 210 },
          { date: "2025-09-15", value: 215 },
          { date: "2025-10-01", value: 220 },
        ],
      },
      sprintLoad: {
        label: "Sprints",
        lastValue: 6,
        unit: "nb",
        history: [
          { date: "2025-09-01", value: 5 },
          { date: "2025-09-15", value: 6 },
          { date: "2025-10-01", value: 6 },
        ],
      },
    },

    injuries: [
      {
        id: "inj_commotion_2024",
        label: "Commotion · 2024",
        zone: "Crâne",
        type: "Commotion cérébrale",
        dateDebut: "2024-11-10",
        dateRetour: "2024-12-05",
        severite: "Modérée",
        impact: "3 matchs manqués",
        notes: "Protocole retour validé neuro.",
        history: [
          { date: "2024-11-10", etape: "Commotion match" },
          { date: "2024-11-12", etape: "Consult neuro" },
          { date: "2024-11-26", etape: "Retour entrainement adapté" },
          { date: "2024-12-05", etape: "Retour match" },
        ],
      },
    ],

    tests: {
      cervical_flex: { left: 205, right: 210 },
      cervical_ext: { left: 230, right: 235 },
      cervical_incl: { left: 198, right: 204 },

      shoulder_ash: { left: 35, right: 36 },

      knee_quad_iso: { left: 2.9, right: 3.0 },
      knee_ham_mccall: { left: 7, right: 8 },
      knee_ham_iso30: { left: 1.5, right: 1.6 },

      ankle_soleus: { left: 3.1, right: 3.2 },
      ankle_inv_evr: { left: 1.6, right: 1.7 },
      ankle_gastro_hr: { left: 25, right: 26 },
    },
  },
];
// ================== FONCTIONS UTILITAIRES ================== 

function getInitials(player) {
  return (player.prenom[0] + player.nom[0]).toUpperCase();
}

function formatPoste(player) {
  return `N°${player.poste} · ${player.ligne}`;
}

function computeSideDiff(left, right) {
  const diffAbs = Math.abs(right - left);
  const maxSide = Math.max(Math.abs(left), Math.abs(right));
  const diffPct = maxSide > 0 ? (diffAbs / maxSide) * 100 : 0;
  return { diffAbs, diffPct };
}

function computeRelativeToBodyWeight(value, poidsKg) {
  if (!poidsKg || poidsKg <= 0) return null;
  // Valeur par kg (approx) -> on laisse générique
  return value / poidsKg;
}

function classifyVsTeam(avgSideValue, testId) {
  const teamAvg = TEAM_TEST_AVERAGES[testId];
  if (teamAvg == null) return { label: "Non comparé", className: "medium" };

  const ratio = avgSideValue / teamAvg;
  if (ratio >= 1.05) return { label: "Au-dessus moyenne groupe", className: "good" };
  if (ratio <= 0.95) return { label: "Sous la moyenne groupe", className: "poor" };
  return { label: "Dans la moyenne groupe", className: "medium" };
}

// Détruit un chart existant avant d'en recréer un
function resetChart(key) {
  const existing = chartsStore[key];
  if (existing) {
    existing.destroy();
    chartsStore[key] = null;
  }
}
// ================== RENDU LISTE JOUEURS ================== 

function renderPlayersList() {
  const container = document.getElementById("playersList");
  if (!container) return;

  const term = (searchTerm || "").toLowerCase();

  const filtered = players.filter((p) => {
    // filtre ligne
    if (currentLineFilter === "Avants" && p.ligne !== "Avants") return false;
    if (currentLineFilter === "Trois-quarts" && p.ligne !== "Trois-quarts") return false;

    // filtre dispo
    if (currentStatusFilter === "Disponible" && p.statut !== "Disponible") return false;
    if (currentStatusFilter === "Blessé" && p.statut === "Disponible") return false;

    // recherche texte
    if (term) {
      const haystack = `${p.nom} ${p.prenom} ${p.poste} ${p.ligne}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }

    return true;
  });

  container.innerHTML = filtered
    .map((p) => {
      const isSelected = p.id === currentPlayerId;
      const badgeClass = p.statut === "Disponible" ? "badge-disponible" : "badge-blesse";

      return `
        <div class="player-row ${isSelected ? "is-selected" : ""}" data-player-id="${p.id}">
          <div class="player-initials">${getInitials(p)}</div>
          <div class="player-row-main">
            <div class="player-row-name">${p.prenom} ${p.nom}</div>
            <div class="player-row-meta">${formatPoste(p)}</div>
          </div>
          <div class="player-row-status ${badgeClass}">
            ${p.statut}
          </div>
        </div>
      `;
    })
    .join("");

  // Stats effectif
  const dispo = players.filter((p) => p.statut === "Disponible").length;
  const blesse = players.length - dispo;
  const dispoEl = document.getElementById("countDisponible");
  const blesseEl = document.getElementById("countBlesses");
  if (dispoEl) dispoEl.textContent = dispo;
  if (blesseEl) blesseEl.textContent = blesse;

  // Binding clic
  container.querySelectorAll(".player-row").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-player-id");
      selectPlayer(id);
    });
  });
}

function selectPlayer(playerId) {
  currentPlayerId = playerId;
  const player = players.find((p) => p.id === playerId);
  const breadcrumbEl = document.getElementById("breadcrumbPlayer");
  if (breadcrumbEl && player) {
    breadcrumbEl.textContent = `${player.prenom} ${player.nom}`;
  }
  renderPlayersList();
  renderPlayerDetail(player);
}

// ================== RENDU HEADER JOUEUR ================== 

function renderPlayerHeader(player) {
  const statutClass = player.statut === "Disponible" ? "disponible" : "blesse";
  const dispoLabel = player.disponibilite || (player.statut === "Disponible" ? "Apte" : "Adapté");

  return `
    <div class="player-header-card">
      <div class="ph-left">
        <div class="ph-avatar" style="${player.photoUrl ? `background-image:url('${player.photoUrl}')` : ""}"></div>
        <div class="ph-infos">
          <h2 class="ph-name">${player.prenom} ${player.nom}</h2>
          <p class="ph-poste">${formatPoste(player)}</p>
          <div class="ph-badges">
            <span class="badge-pill">${player.taille} cm</span>
            <span class="badge-pill">${player.poids} kg</span>
            <span class="badge-pill">${player.masseGrasse}% MG</span>
          </div>
        </div>
      </div>

      <div class="ph-middle">
        <div class="ph-tags-row">
          <span class="ph-tag">Minutes jouées : ${player.minutesJouees}</span>
          <span class="ph-tag">Risque profil : ${player.risqueProfil}</span>
          <span class="ph-tag">Points forts : ${player.pointsForts}</span>
          <span class="ph-tag">À surveiller : ${player.pointsFaibles}</span>
        </div>
        <div class="ph-metrics">
          <div class="ph-metric">
            <div class="ph-metric-label">Disponibilité</div>
            <div class="ph-metric-value">${dispoLabel}</div>
          </div>
          <div class="ph-metric">
            <div class="ph-metric-label">Antécédents</div>
            <div class="ph-metric-value">${player.antecedentsTexte}</div>
          </div>
          <div class="ph-metric">
            <div class="ph-metric-label">Profil physique</div>
            <div class="ph-metric-value">${player.physicalProfile.speed.lastValue.toFixed(1)} m/s · vitesse</div>
          </div>
        </div>
      </div>

      <div class="ph-right">
        <div class="ph-availability">
          <span class="badge-status ${statutClass}">${player.statut}</span>
        </div>
        <div class="ph-score">
          <div class="ph-score-card">
            <div class="ph-score-label">Score global</div>
            <div class="ph-score-value">${player.scoreGlobal}</div>
          </div>
        </div>
        <div>
          <span class="ph-risk-tag">
            Profil risque ${player.risqueProfil}
          </span>
        </div>
      </div>
    </div>
  `;
}
// ================== RENDU SECTIONS BULLES ================== 

function renderPhysicalSection(player) {
  const metrics = player.physicalProfile || {};
  const bubblesHtml = Object.keys(metrics)
    .map((key) => {
      const m = metrics[key];
      const isActive = activePhysicalMetric === key;
      return `
        <button class="metric-bubble physical ${isActive ? "is-active" : ""}" data-physical-id="${key}">
          <span>${m.label}</span>
          <small>${m.lastValue} ${m.unit}</small>
        </button>
      `;
    })
    .join("");

  const detailHtml = activePhysicalMetric
    ? renderMetricDetail("physical", metrics[activePhysicalMetric])
    : "";

  return `
    <div class="section-card">
      <div class="section-header">
        <div class="section-title-block">
          <h3>Profil physique</h3>
          <p>Vue synthétique des qualités physiques clés du joueur.</p>
        </div>
      </div>
      <div class="bubbles-row">
        ${bubblesHtml}
      </div>
      ${detailHtml ? `<div class="metric-detail">${detailHtml}</div>` : ""}
    </div>
  `;
}

function renderGpsSection(player) {
  const metrics = player.gpsMetrics || {};
  const bubblesHtml = Object.keys(metrics)
    .map((key) => {
      const m = metrics[key];
      const isActive = activeGpsMetric === key;
      return `
        <button class="metric-bubble gps ${isActive ? "is-active" : ""}" data-gps-id="${key}">
          <span>${m.label}</span>
          <small>${m.lastValue} ${m.unit}</small>
        </button>
      `;
    })
    .join("");

  const detailHtml = activeGpsMetric
    ? renderMetricDetail("gps", metrics[activeGpsMetric])
    : "";

  return `
    <div class="section-card">
      <div class="section-header">
        <div class="section-title-block">
          <h3>GPS match / entraînement</h3>
          <p>Charge externe récente sur les principaux indicateurs.</p>
        </div>
      </div>
      <div class="bubbles-row">
        ${bubblesHtml}
      </div>
      ${detailHtml ? `<div class="metric-detail">${detailHtml}</div>` : ""}
    </div>
  `;
}

function renderInjurySection(player) {
  const injuries = player.injuries || [];
  const bubblesHtml = injuries
    .map((inj) => {
      const isActive = activeInjuryMetric === inj.id;
      return `
        <button class="metric-bubble injury ${isActive ? "is-active" : ""}" data-injury-id="${inj.id}">
          <span>${inj.label}</span>
          <small>${inj.severite} · ${inj.zone}</small>
        </button>
      `;
    })
    .join("");

  const activeInjury = injuries.find((i) => i.id === activeInjuryMetric);
  const detailHtml = activeInjury ? renderInjuryDetail(activeInjury) : "";

  return `
    <div class="section-card">
      <div class="section-header">
        <div class="section-title-block">
          <h3>Antécédents de blessure</h3>
          <p>Vue rapide des blessures significatives et du parcours de rééducation.</p>
        </div>
      </div>
      <div class="bubbles-row">
        ${bubblesHtml}
      </div>
      ${detailHtml ? `<div class="metric-detail">${detailHtml}</div>` : ""}
    </div>
  `;
}

// Rendu d'une métrique (GPS ou physique) : graphe + tableau historique
function renderMetricDetail(type, metricObj) {
  const canvasId = `${type}-chart`;
  const tableRows = (metricObj.history || [])
    .map((row) => {
      return `<tr><td>${row.date}</td><td>${row.value}</td></tr>`;
    })
    .join("");

  // Le canvas sera instancié après injection dans le DOM
  setTimeout(() => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    resetChart(type);
    const labels = metricObj.history.map((h) => h.date);
    const data = metricObj.history.map((h) => h.value);

    chartsStore[type] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: metricObj.label,
            data,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true },
          y: { display: true },
        },
      },
    });
  }, 0);

  return `
    <div class="metric-detail-header">
      <div class="metric-detail-title">${metricObj.label}</div>
      <div class="metric-detail-meta">Historique récent</div>
    </div>
    <div class="metric-detail-layout">
      <div>
        <canvas id="${canvasId}" height="120"></canvas>
      </div>
      <div>
        <table class="metric-table">
          <thead>
            <tr><th>Date</th><th>Valeur</th></tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Rendu détail blessure (sans graphe, mais timeline + infos)
function renderInjuryDetail(inj) {
  const rows = (inj.history || [])
    .map((step) => `<li>${step.date} – ${step.etape}</li>`)
    .join("");

  return `
    <div class="metric-detail-header">
      <div class="metric-detail-title">${inj.type} – ${inj.zone}</div>
      <div class="metric-detail-meta">${inj.dateDebut} → ${inj.dateRetour} · ${inj.impact}</div>
    </div>
    <div class="rehab-timeline">
      <strong>Notes :</strong> ${inj.notes || "Rien de particulier."}
      <ul>
        ${rows}
      </ul>
    </div>
  `;
}
// ================== RENDU ZONES ANATOMIQUES ================== 

function renderAnatomySection(player) {
  const cardsHtml = ANATOMY_STRUCTURE.map((zone) => {
    const chips = zone.tests
      .map((testId) => {
        const def = TEST_DEFINITION[testId];
        if (!def) return "";
        const isActive = activeTestId === testId;
        return `
          <button class="anatomy-test-chip ${isActive ? "is-active" : ""}" data-test-id="${testId}">
            ${def.label.split("–").slice(-1)[0].trim()}
          </button>
        `;
      })
      .join("");

    return `
      <div class="anatomy-card">
        <div class="anatomy-card-title">${zone.title}</div>
        <div class="anatomy-tests">
          ${chips}
        </div>
      </div>
    `;
  }).join("");

  const detailHtml = renderTestDetail(player);

  return `
    <div class="section-card">
      <div class="section-header">
        <div class="section-title-block">
          <h3>Zones anatomiques &amp; tests spécifiques</h3>
          <p>Correspondance claire entre articulation et tests réalisés.</p>
        </div>
      </div>
      <div class="anatomy-layout">
        <div class="anatomy-map">
          ${cardsHtml}
        </div>
        <div class="anatomy-detail" id="anatomyDetail">
          ${detailHtml}
        </div>
      </div>
    </div>
  `;
}

// Détail d'un test sélectionné (D/G, % poids de corps, position vs groupe)
function renderTestDetail(player) {
  if (!activeTestId) {
    return `<div style="font-size:12px;color:#6b7280;">
      Sélectionne un test dans la carte de gauche pour afficher le détail (droite/gauche, % poids de corps, comparaison groupe).
    </div>`;
  }

  const values = player.tests[activeTestId];
  const def = TEST_DEFINITION[activeTestId];
  if (!values || !def) {
    return `<div style="font-size:12px;color:#6b7280;">Pas de données pour ce test.</div>`;
  }

  const { left, right } = values;
  const avgSide = (left + right) / 2;
  const diff = computeSideDiff(left, right);
  const relLeft = computeRelativeToBodyWeight(left, player.poids);
  const relRight = computeRelativeToBodyWeight(right, player.poids);
  const vsTeam = classifyVsTeam(avgSide, activeTestId);

  // graphe petit historique fictif basé sur valeurs statiques (ici juste 3 points)
  const canvasId = "test-chart";
  setTimeout(() => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    resetChart("test");
    const labels = ["-2 mois", "-1 mois", "Actuel"];
    const base = avgSide * 0.95;
    chartsStore.test = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: def.label,
            data: [base, avgSide * 0.98, avgSide],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true },
          y: { display: true },
        },
      },
    });
  }, 0);

  return `
    <div style="font-size:12px;font-weight:600;margin-bottom:4px;">
      ${def.label}
    </div>
    <div class="test-metrics-grid">
      <div class="test-metric-block">
        <div class="test-metric-label">Droite / Gauche</div>
        <div class="test-metric-value">${right} / ${left}</div>
      </div>
      <div class="test-metric-block">
        <div class="test-metric-label">Différence D/G</div>
        <div class="test-metric-value">${diff.diffAbs.toFixed(2)} (${diff.diffPct.toFixed(1)}%)</div>
      </div>
      <div class="test-metric-block">
        <div class="test-metric-label">% poids de corps (approx.)</div>
        <div class="test-metric-value">
          D: ${relRight ? relRight.toFixed(2) : "–"} / G: ${relLeft ? relLeft.toFixed(2) : "–"}
        </div>
      </div>
    </div>
    <div class="test-metric-block" style="margin-top:6px;">
      <div class="test-metric-label">Position vs moyenne du groupe</div>
      <div class="test-metric-value">
        <span class="tests-summary-chip ${vsTeam.className}">${vsTeam.label}</span>
      </div>
    </div>
    <div style="margin-top:8px;">
      <canvas id="${canvasId}" height="110"></canvas>
    </div>
  `;
}

// ================== SYNTHÈSE DE TOUS LES TESTS ================== 

function renderTestsSummarySection(player) {
  const rowsHtml = Object.keys(player.tests || {})
    .map((testId) => {
      const def = TEST_DEFINITION[testId];
      if (!def) return "";
      const v = player.tests[testId];
      const { left, right } = v;
      const avgSide = (left + right) / 2;
      const diff = computeSideDiff(left, right);
      const vsTeam = classifyVsTeam(avgSide, testId);

      return `
        <tr>
          <td>${def.zone}</td>
          <td>${def.label}</td>
          <td>${right}</td>
          <td>${left}</td>
          <td>${diff.diffAbs.toFixed(2)} (${diff.diffPct.toFixed(1)}%)</td>
          <td>${avgSide.toFixed(2)}</td>
          <td><span class="tests-summary-chip ${vsTeam.className}">${vsTeam.label}</span></td>
        </tr>
      `;
    })
    .join("");

  return `
    <div class="section-card">
      <div class="section-header">
        <div class="section-title-block">
          <h3>Synthèse des tests</h3>
          <p>Vue globale des tests spécifiques avec asymétries et comparaison groupe.</p>
        </div>
      </div>
      <div class="tests-summary-table">
        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Test</th>
              <th>D</th>
              <th>G</th>
              <th>Diff D/G</th>
              <th>Moy. joueur</th>
              <th>Vs groupe</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
// ================== COMPOSITION DETAIL JOUEUR ================== 

function renderPlayerDetail(player) {
  const container = document.getElementById("playerDetail");
  if (!container) return;

  if (!player) {
    container.classList.add("empty-state");
    container.innerHTML = `
      <div class="empty-card">
        <h2 class="empty-title">U21 Stade Français Paris</h2>
        <p class="empty-subtitle">Centre de suivi – Performance &amp; Médecine</p>
        <p class="empty-hint">Sélectionne un joueur dans la liste pour afficher son profil complet.</p>
      </div>
    `;
    return;
  }

  container.classList.remove("empty-state");

  const headerHtml = renderPlayerHeader(player);
  const physicalHtml = renderPhysicalSection(player);
  const gpsHtml = renderGpsSection(player);
  const injuryHtml = renderInjurySection(player);
  const anatomyHtml = renderAnatomySection(player);
  const summaryHtml = renderTestsSummarySection(player);

  container.innerHTML = `
    ${headerHtml}
    <div class="sections-grid">
      <div>
        ${physicalHtml}
        ${gpsHtml}
      </div>
      <div>
        ${injuryHtml}
        ${anatomyHtml}
      </div>
    </div>
    ${summaryHtml}
  `;

  // Event delegation pour les bulles et chips (on rebinde à chaque rendu)
  bindDetailEvents(player);
}

// ================== BIND DES EVENTS ================== 

function bindDetailEvents(player) {
  const detail = document.getElementById("playerDetail");
  if (!detail) return;

  // Bulles physiques
  detail.querySelectorAll(".metric-bubble.physical").forEach((btn) => {
    btn.addEventListener("click", () => {
      activePhysicalMetric = btn.getAttribute("data-physical-id");
      renderPlayerDetail(player);
    });
  });

  // Bulles GPS
  detail.querySelectorAll(".metric-bubble.gps").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGpsMetric = btn.getAttribute("data-gps-id");
      renderPlayerDetail(player);
    });
  });

  // Bulles blessures
  detail.querySelectorAll(".metric-bubble.injury").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeInjuryMetric = btn.getAttribute("data-injury-id");
      renderPlayerDetail(player);
    });
  });

  // Chips tests anatomiques
  detail.querySelectorAll(".anatomy-test-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTestId = btn.getAttribute("data-test-id");
      renderPlayerDetail(player);
    });
  });
}

// ================== INIT & EVENTS GLOBAUX ================== 

function initFilters() {
  // Filtres ligne
  document.querySelectorAll("[data-filter-line]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-line]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentLineFilter = btn.getAttribute("data-filter-line");
      renderPlayersList();
    });
  });

  // Filtres dispo
  document.querySelectorAll("[data-filter-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-status]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentStatusFilter = btn.getAttribute("data-filter-status");
      renderPlayersList();
    });
  });

  // Recherche
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value || "";
      renderPlayersList();
    });
  }
}

function init() {
  initFilters();
  renderPlayersList();
}

document.addEventListener("DOMContentLoaded", init);
