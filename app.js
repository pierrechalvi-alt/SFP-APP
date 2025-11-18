// app_stade_francais.js
// Version améliorée "style FIFA" avec sections cliquables, graphiques canvas
// et organisation des blocs : Profil physique, GPS, Blessures, Tests, Zones anatomiques, Rééducation.

// ================== ETAT GLOBAL ================== 

let currentPlayerId = null;
let selectedSegment = "Global";
let selectedTestId = null;
let searchTerm = ""; // recherche texte
let activeFunctionalMetric = null;
let activeCourseMetric = null;
let activeJumpMetric = null;

// ================== DONNEES JOUEURS ================= = 

const joueurs = [
  {
    id: "J001",
    nom: "Braxton",
    prenom: "ASI",
    poste: "3",
    ligne: "Pilier",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-10",
    scoreGlobal: 88,
    pointsForts: "CMJ, Sprint 10m",
    pointsFaibles: "Isocinétique quadriceps",
    antecedents: "Entorse cheville D 2023",
    taille: 178,
    poids: 82,
    masseGrasse: 10,
    minutesJouees: 320,
    photoUrl: "Image/asi.png",
    dateNaissance: "12/03/2006",
  },
  {
    id: "J002",
    nom: "Martin",
    prenom: "BLUM",
    poste: "9",
    ligne: "Demi de mêlée",
    statut: "Blessé",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-05",
    scoreGlobal: 76,
    pointsForts: "CMJ",
    pointsFaibles: "NordBoard, McCall",
    antecedents: "Ischio D 2023; Cheville G 2021; Commotion 2024",
    taille: 182,
    poids: 88,
    masseGrasse: 11,
    minutesJouees: 410,
    photoUrl: "Image/blum.png",
    dateNaissance: "25/07/2005",
  },
  {
    id: "J003",
    nom: "Jacques",
    prenom: "BOTHA",
    poste: "4",
    ligne: "Deuxième ligne",
    statut: "Adapté",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-08",
    scoreGlobal: 72,
    pointsForts: "Isocinétique quadriceps, McCall",
    pointsFaibles: "Sprint 30m",
    antecedents: "Épaule G 2023",
    taille: 185,
    poids: 122,
    masseGrasse: 18,
    minutesJouees: 280,
    photoUrl: "Image/botha.png",
    dateNaissance: "09/11/2005",
  },
  {
    id: "J004",
    nom: "Alvaro",
    prenom: "GARCIA ALBO",
    poste: "2",
    ligne: "Talonneur",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 84,
    pointsForts: "Sprint 10m, CMJ",
    pointsFaibles: "Ischio",
    antecedents: "Aucune",
    taille: 180,
    poids: 86,
    masseGrasse: 9,
    minutesJouees: 390,
    photoUrl: "Image/garcia.png",
    dateNaissance: "03/01/2006",
  },
  {
    id: "J005",
    nom: "Isaac",
    prenom: "KOFFI",
    poste: "3",
    ligne: "Pilier",
    statut: "Blessé",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-06",
    scoreGlobal: 79,
    pointsForts: "NordBoard, CMJ",
    pointsFaibles: "KTW cheville",
    antecedents: "Entorse LLA cheville G 2022",
    taille: 190,
    poids: 104,
    masseGrasse: 13,
    minutesJouees: 250,
    photoUrl: "Image/koffi.png",
    dateNaissance: "18/09/2005",
  },
  {
    id: "J006",
    nom: "Noah",
    prenom: "NENE",
    poste: "13",
    ligne: "Centre",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-10",
    scoreGlobal: 86,
    pointsForts: "Sprint 30m, CMJ",
    pointsFaibles: "Rachis cervical",
    antecedents: "Commotion 2024",
    taille: 184,
    poids: 92,
    masseGrasse: 10,
    minutesJouees: 430,
    photoUrl: "Image/nene.png",
    dateNaissance: "07/05/2006",
  },
  {
    id: "J007",
    nom: "Luka",
    prenom: "RUSSEL",
    poste: "11",
    ligne: "Ailier",
    statut: "Adapté",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-09",
    scoreGlobal: 81,
    pointsForts: "HSR GPS, Sprint 30m",
    pointsFaibles: "Ischio G",
    antecedents: "Ischio G 2022",
    taille: 186,
    poids: 90,
    masseGrasse: 9,
    minutesJouees: 360,
    photoUrl: "Image/russel.png",
    dateNaissance: "30/01/2006",
  },
  {
    id: "J008",
    nom: "Mosese",
    prenom: "TABUAKOTO",
    poste: "8",
    ligne: "Troisième ligne",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-07",
    scoreGlobal: 90,
    pointsForts: "Isocinétique quadriceps, CMJ",
    pointsFaibles: "KTW cheville D",
    antecedents: "Lombalgies récidivantes",
    taille: 192,
    poids: 112,
    masseGrasse: 14,
    minutesJouees: 445,
    photoUrl: "Image/tabuakoto.png",
    dateNaissance: "21/06/2005",
  },
  {
    id: "J009",
    nom: "IBO",
    prenom: "Mathis",
    poste: "15",
    ligne: "Arrière",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 83,
    pointsForts: "Sprint 30m, HSR",
    pointsFaibles: "Ischio G",
    antecedents: "Ischio G 2023",
    taille: 183,
    poids: 89,
    masseGrasse: 11,
    minutesJouees: 400,
    photoUrl: "Image/ibo.png",
    dateNaissance: "14/02/2006",
  },
  {
    id: "J010",
    nom: "Yanis",
    prenom: "LUX",
    poste: "3",
    ligne: "Pilier",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 82,
    pointsForts: "CMJ, Sprint 10m",
    pointsFaibles: "KTW cheville",
    antecedents: "Entorse cheville D 2022",
    taille: 181,
    poids: 87,
    masseGrasse: 11,
    minutesJouees: 310,
    photoUrl: "Image/lux.png",
    dateNaissance: "27/04/2006",
  },
  {
    id: "J011",
    nom: "Yannick",
    prenom: "LODJRO",
    poste: "14",
    ligne: "Ailier",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-08",
    scoreGlobal: 80,
    pointsForts: "NordBoard, HSR",
    pointsFaibles: "Isocinétique genou",
    antecedents: "Ischio D 2021",
    taille: 188,
    poids: 102,
    masseGrasse: 12,
    minutesJouees: 295,
    photoUrl: "Image/lodjro.png",
    dateNaissance: "05/10/2005",
  },
  {
    id: "J012",
    nom: "Ollie",
    prenom: "McCREA",
    poste: "4",
    ligne: "Deuxième ligne",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-08",
    scoreGlobal: 83,
    pointsForts: "Isocinétique, CMJ",
    pointsFaibles: "Sprint 30m",
    antecedents: "Aucune",
    taille: 195,
    poids: 110,
    masseGrasse: 13,
    minutesJouees: 270,
    photoUrl: "Image/mccrea.png",
    dateNaissance: "11/12/2005",
  },
  {
    id: "J013",
    nom: "Thibault",
    prenom: "MOTASSI",
    poste: "9",
    ligne: "Demi de mêlée",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-07",
    scoreGlobal: 81,
    pointsForts: "Lombaire iso, NordBoard",
    pointsFaibles: "Sprint 10m",
    antecedents: "Lombalgies 2023",
    taille: 193,
    poids: 108,
    masseGrasse: 14,
    minutesJouees: 260,
    photoUrl: "Image/motassi.png",
    dateNaissance: "19/08/2005",
  },
  {
    id: "J014",
    nom: "Seta",
    prenom: "TURAGACOKE",
    poste: "6",
    ligne: "Troisième ligne",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-07",
    scoreGlobal: 85,
    pointsForts: "Sprint 30m, HSR",
    pointsFaibles: "Ischio",
    antecedents: "Ischio D 2022",
    taille: 183,
    poids: 90,
    masseGrasse: 10,
    minutesJouees: 330,
    photoUrl: "Image/turagacoke.png",
    dateNaissance: "08/06/2006",
  },
  {
    id: "J015",
    nom: "Ethan",
    prenom: "TIA",
    poste: "2",
    ligne: "Talonneur",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 84,
    pointsForts: "Sprint 10m, CMJ",
    pointsFaibles: "Isocinétique genou",
    antecedents: "Entorse genou G 2023",
    taille: 182,
    poids: 88,
    masseGrasse: 10,
    minutesJouees: 345,
    photoUrl: "Image/tia.png",
    dateNaissance: "01/03/2006",
  },
  {
    id: "J016",
    nom: "Jaydon",
    prenom: "VILIAMU",
    poste: "5",
    ligne: "Deuxième ligne",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 84,
    pointsForts: "CMJ",
    pointsFaibles: "Force soléaire G",
    antecedents: "Entorse genou G 2023",
    taille: 182,
    poids: 88,
    masseGrasse: 10,
    minutesJouees: 345,
    photoUrl: "Image/viliamu.png",
    dateNaissance: "23/09/2005",
  },
  {
    id: "J017",
    nom: "Méric",
    prenom: "CHIFFRIN",
    poste: "7",
    ligne: "Troisième ligne",
    statut: "Blessé",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-09",
    scoreGlobal: 49,
    pointsForts: "",
    pointsFaibles: "Cheville, Ischio",
    antecedents: "Entorse cheville G 2023",
    taille: 198,
    poids: 87,
    masseGrasse: 7,
    minutesJouees: 345,
    photoUrl: "Image/chiffrin.png",
    dateNaissance: "04/04/2006",
  },
  {
    id: "J018",
    nom: "Mehdi",
    prenom: "BORSALI",
    poste: "1",
    ligne: "Pilier",
    statut: "Adapté",
    disponibilite: "Infirmerie",
    dernierTest: "2025-11-08",
    scoreGlobal: 62,
    pointsForts: "Isocinétique quadriceps, McCall",
    pointsFaibles: "Sprint 30m",
    antecedents: "Épaule G 2023",
    taille: 182,
    poids: 122,
    masseGrasse: 18,
    minutesJouees: 280,
    photoUrl: "Image/borsali.png",
    dateNaissance: "29/01/2005",
  },
  {
    id: "J019",
    nom: "LEOFA",
    prenom: "TAUAVE",
    poste: "15",
    ligne: "Arrière",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-09",
    scoreGlobal: 83,
    pointsForts: "HSR",
    pointsFaibles: "Cheville G",
    antecedents: "Syndesmose G 2023",
    taille: 178,
    poids: 79,
    masseGrasse: 11,
    minutesJouees: 400,
    photoUrl: "Image/leofa.png",
    dateNaissance: "16/05/2006",
  },
  {
    id: "J020",
    nom: "Antonin",
    prenom: "BIKAI-COMBE",
    poste: "13",
    ligne: "Centre",
    statut: "Disponible",
    disponibilite: "Disponible",
    dernierTest: "2025-11-10",
    scoreGlobal: 86,
    pointsForts: "Développé couché",
    pointsFaibles: "Rachis cervical",
    antecedents: "Commotion 2024",
    taille: 185,
    poids: 97,
    masseGrasse: 12,
    minutesJouees: 43,
    photoUrl: "Image/bikaicombe.png",
    dateNaissance: "10/02/2006",
  },
];

// ================== TESTS PHYSIQUES ==================
// On reprend ta base et on ajoute quelques tests (Bonco, Squat Jump, Single/Triple hop...) pour rendre les sections Course/Saut plus visuelles.

const testsPhysiques = [
  // ASI Braxton (J001)
  { id: "T001", joueurId: "J001", date: "2025-11-10", type: "CMJ", segment: "Hanche", cote: "-", valeur: 42, unite: "cm", ref: 40, ratio: 1.05, zone: "Vert" },
  { id: "T002", joueurId: "J001", date: "2025-11-09", type: "CMJ", segment: "Hanche", cote: "-", valeur: 40, unite: "cm", ref: 40, ratio: 1.0, zone: "Vert" },
  { id: "T003", joueurId: "J001", date: "2025-11-10", type: "Sprint 10m", segment: "Course", cote: "-", valeur: 1.62, unite: "s", ref: 1.70, ratio: 1.05, zone: "Vert" },
  { id: "T004", joueurId: "J001", date: "2025-11-08", type: "Sprint 10m", segment: "Course", cote: "-", valeur: 1.67, unite: "s", ref: 1.70, ratio: 1.02, zone: "Vert" },
  { id: "T005", joueurId: "J001", date: "2025-11-09", type: "Isocinétique quadriceps", segment: "Genou", cote: "Droit", valeur: 185, unite: "%BW", ref: 180, ratio: 1.03, zone: "Vert" },
  { id: "T006", joueurId: "J001", date: "2025-11-09", type: "Isocinétique quadriceps", segment: "Genou", cote: "Gauche", valeur: 176, unite: "%BW", ref: 180, ratio: 0.98, zone: "Orange" },
  { id: "T007", joueurId: "J001", date: "2025-11-07", type: "Cognition réaction", segment: "Tête", cote: "-", valeur: 280, unite: "ms", ref: 300, ratio: 1.07, zone: "Vert" },
  { id: "T008", joueurId: "J001", date: "2025-11-07", type: "Isométrie rachis cervical", segment: "Rachis cervical", cote: "-", valeur: 260, unite: "N", ref: 250, ratio: 1.04, zone: "Vert" },
  { id: "T009", joueurId: "J001", date: "2025-11-06", type: "Bonco", segment: "Course", cote: "-", valeur: 175, unite: "contacts", ref: 160, ratio: 1.09, zone: "Vert" },
  { id: "T010", joueurId: "J001", date: "2025-11-06", type: "Squat Jump", segment: "Hanche", cote: "-", valeur: 39, unite: "cm", ref: 38, ratio: 1.03, zone: "Vert" },

  // BLUM Martin (J002) blessé ischio
  { id: "T101", joueurId: "J002", date: "2025-11-05", type: "CMJ", segment: "Hanche", cote: "-", valeur: 31, unite: "cm", ref: 40, ratio: 0.78, zone: "Rouge" },
  { id: "T102", joueurId: "J002", date: "2025-11-05", type: "NordBoard", segment: "Ischio", cote: "Droit", valeur: 245, unite: "N", ref: 320, ratio: 0.77, zone: "Rouge" },
  { id: "T103", joueurId: "J002", date: "2025-11-05", type: "NordBoard", segment: "Ischio", cote: "Gauche", valeur: 305, unite: "N", ref: 320, ratio: 0.95, zone: "Vert" },
  { id: "T104", joueurId: "J002", date: "2025-11-04", type: "McCall", segment: "Ischio", cote: "Droit", valeur: 2, unite: "/5", ref: 5, ratio: 0.4, zone: "Rouge" },
  { id: "T105", joueurId: "J002", date: "2025-11-03", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 11, unite: "cm", ref: 10, ratio: 1.1, zone: "Vert" },
  { id: "T106", joueurId: "J002", date: "2025-11-03", type: "Single Hop", segment: "Genou", cote: "Droit", valeur: 180, unite: "cm", ref: 190, ratio: 0.95, zone: "Orange" },
  { id: "T107", joueurId: "J002", date: "2025-11-03", type: "Single Hop", segment: "Genou", cote: "Gauche", valeur: 192, unite: "cm", ref: 190, ratio: 1.01, zone: "Vert" },

  // BOTHA Jacques (J003) genou / épaule
  { id: "T201", joueurId: "J003", date: "2025-11-08", type: "CMJ", segment: "Hanche", cote: "-", valeur: 29, unite: "cm", ref: 32, ratio: 0.9, zone: "Orange" },
  { id: "T202", joueurId: "J003", date: "2025-11-08", type: "Isocinétique quadriceps", segment: "Genou", cote: "Droit", valeur: 165, unite: "%BW", ref: 180, ratio: 0.92, zone: "Orange" },
  { id: "T203", joueurId: "J003", date: "2025-11-08", type: "Isocinétique quadriceps", segment: "Genou", cote: "Gauche", valeur: 150, unite: "%BW", ref: 180, ratio: 0.83, zone: "Rouge" },
  { id: "T204", joueurId: "J003", date: "2025-11-07", type: "McCall", segment: "Ischio", cote: "Gauche", valeur: 3, unite: "/5", ref: 5, ratio: 0.6, zone: "Rouge" },
  { id: "T205", joueurId: "J003", date: "2025-11-07", type: "ASH test", segment: "Épaule", cote: "-", valeur: 38, unite: "N/kg", ref: 40, ratio: 0.95, zone: "Vert" },

  // GARCIA Alvaro (J004)
  { id: "T301", joueurId: "J004", date: "2025-11-09", type: "CMJ", segment: "Hanche", cote: "-", valeur: 40, unite: "cm", ref: 40, ratio: 1.0, zone: "Vert" },
  { id: "T302", joueurId: "J004", date: "2025-11-09", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.15, unite: "s", ref: 4.2, ratio: 1.01, zone: "Vert" },
  { id: "T303", joueurId: "J004", date: "2025-11-08", type: "KTW", segment: "Cheville", cote: "Droit", valeur: 9, unite: "cm", ref: 10, ratio: 0.9, zone: "Orange" },
  { id: "T304", joueurId: "J004", date: "2025-11-08", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 10, unite: "cm", ref: 10, ratio: 1.0, zone: "Vert" },
  { id: "T305", joueurId: "J004", date: "2025-11-08", type: "Triple Hop", segment: "Genou", cote: "Droit", valeur: 570, unite: "cm", ref: 550, ratio: 1.04, zone: "Vert" },
  { id: "T306", joueurId: "J004", date: "2025-11-08", type: "Triple Hop", segment: "Genou", cote: "Gauche", valeur: 555, unite: "cm", ref: 550, ratio: 1.01, zone: "Vert" },

  // KOFFI Isaac (J005) cheville
  { id: "T401", joueurId: "J005", date: "2025-11-06", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 8, unite: "cm", ref: 10, ratio: 0.8, zone: "Rouge" },
  { id: "T402", joueurId: "J005", date: "2025-11-06", type: "KTW", segment: "Cheville", cote: "Droit", valeur: 10, unite: "cm", ref: 10, ratio: 1.0, zone: "Vert" },
  { id: "T403", joueurId: "J005", date: "2025-11-06", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.4, unite: "s", ref: 4.3, ratio: 0.98, zone: "Orange" },

  // NENE Noah (J006) tête / cervical
  { id: "T501", joueurId: "J006", date: "2025-11-10", type: "Cognition réaction", segment: "Tête", cote: "-", valeur: 310, unite: "ms", ref: 300, ratio: 0.97, zone: "Orange" },
  { id: "T502", joueurId: "J006", date: "2025-11-07", type: "Cognition réaction", segment: "Tête", cote: "-", valeur: 340, unite: "ms", ref: 300, ratio: 0.88, zone: "Rouge" },
  { id: "T503", joueurId: "J006", date: "2025-11-09", type: "Isométrie rachis cervical", segment: "Rachis cervical", cote: "-", valeur: 235, unite: "N", ref: 250, ratio: 0.94, zone: "Orange" },

  // RUSSEL Luka (J007) ischio
  { id: "T601", joueurId: "J007", date: "2025-11-09", type: "NordBoard", segment: "Ischio", cote: "Droit", valeur: 310, unite: "N", ref: 320, ratio: 0.97, zone: "Vert" },
  { id: "T602", joueurId: "J007", date: "2025-11-09", type: "NordBoard", segment: "Ischio", cote: "Gauche", valeur: 275, unite: "N", ref: 320, ratio: 0.86, zone: "Orange" },
  { id: "T603", joueurId: "J007", date: "2025-11-08", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.28, unite: "s", ref: 4.2, ratio: 0.98, zone: "Orange" },

  // TABUAKOTO Mosese (J008) lombaire / genou
  { id: "T701", joueurId: "J008", date: "2025-11-07", type: "Extension lombaire iso", segment: "Lombaire", cote: "-", valeur: 430, unite: "N", ref: 400, ratio: 1.08, zone: "Vert" },
  { id: "T702", joueurId: "J008", date: "2025-11-07", type: "Isocinétique quadriceps", segment: "Genou", cote: "Droit", valeur: 190, unite: "%BW", ref: 180, ratio: 1.06, zone: "Vert" },
  { id: "T703", joueurId: "J008", date: "2025-11-07", type: "Isocinétique quadriceps", segment: "Genou", cote: "Gauche", valeur: 182, unite: "%BW", ref: 180, ratio: 1.01, zone: "Vert" },
];

// ================== TESTS FONCTIONNELS GLOBAUX ==================

const testsFonctionnels = [
  // Upper : dc1rm, tirage1rm, tractions, grip
  // Lower : squat1rm, imtp
  { joueurId: "J001", dc1rm: 110, tirage1rm: 95, tractions: 10, grip: 52, squat1rm: 150, imtp: 2800, f1080: 8.5, vmax: 9.1 },
  { joueurId: "J002", dc1rm: 95,  tirage1rm: 85, tractions: 8,  grip: 50, squat1rm: 140, imtp: 2600, f1080: 8.0, vmax: 9.0 },
  { joueurId: "J003", dc1rm: 140, tirage1rm: 120, tractions: 6, grip: 54, squat1rm: 180, imtp: 3200, f1080: 7.8, vmax: 8.2 },
  { joueurId: "J004", dc1rm: 105, tirage1rm: 100, tractions: 11, grip: 50, squat1rm: 155, imtp: 2750, f1080: 8.6, vmax: 9.3 },
  { joueurId: "J005", dc1rm: 120, tirage1rm: 105, tractions: 8, grip: 55, squat1rm: 170, imtp: 2900, f1080: 8.0, vmax: 8.8 },
  { joueurId: "J006", dc1rm: 110, tirage1rm: 100, tractions: 10, grip: 51, squat1rm: 160, imtp: 2700, f1080: 8.7, vmax: 9.4 },
  { joueurId: "J007", dc1rm: 100, tirage1rm: 95, tractions: 9, grip: 49, squat1rm: 150, imtp: 2650, f1080: 8.3, vmax: 9.0 },
  { joueurId: "J008", dc1rm: 135, tirage1rm: 120, tractions: 7, grip: 56, squat1rm: 185, imtp: 3100, f1080: 8.1, vmax: 8.5 },
  { joueurId: "J009", dc1rm: 105, tirage1rm: 100, tractions: 10, grip: 50, squat1rm: 160, imtp: 2720, f1080: 8.5, vmax: 9.2 },
  { joueurId: "J010", dc1rm: 100, tirage1rm: 95, tractions: 9, grip: 48, squat1rm: 150, imtp: 2680, f1080: 8.4, vmax: 9.0 },
  { joueurId: "J011", dc1rm: 125, tirage1rm: 115, tractions: 8, grip: 55, squat1rm: 175, imtp: 2950, f1080: 8.1, vmax: 8.6 },
  { joueurId: "J012", dc1rm: 130, tirage1rm: 118, tractions: 7, grip: 54, squat1rm: 180, imtp: 3050, f1080: 7.9, vmax: 8.4 },
  { joueurId: "J013", dc1rm: 120, tirage1rm: 110, tractions: 7, grip: 53, squat1rm: 172, imtp: 2980, f1080: 8.0, vmax: 8.5 },
  { joueurId: "J014", dc1rm: 110, tirage1rm: 100, tractions: 11, grip: 50, squat1rm: 165, imtp: 2750, f1080: 8.8, vmax: 9.4 },
  { joueurId: "J015", dc1rm: 108, tirage1rm: 100, tractions: 10, grip: 51, squat1rm: 162, imtp: 2730, f1080: 8.6, vmax: 9.3 },
];

// ================== BLESSURES & REEDUC ==================

const blessures = [
  {
    id: "B001",
    joueurId: "J002",
    dateBlessure: "2025-10-29",
    diagnostic: "Lésion ischio BFlh grade 2",
    localisation: "Ischio Droit",
    segment: "Ischio",
    phase: "Rééducation",
    rttEstimee: "2025-11-18",
    rttEffective: "",
    rtpEstimee: "2025-11-25",
    rtpEffective: "",
    prochainesVisites: "IRM 12/11; Chir 18/11",
    prochainsTests: "NordBoard; CMJ; McCall; Sprint 30m",
    protocole: {
      semaine1: "Contrôle douleur, isométriques légers, mobilité douce",
      semaine2: "Augmentation charge isométrique, début excentrique léger",
      semaine3: "Excentrique ciblé, course en ligne droite jusqu'à 60%",
      semaine4: "Sprints 70–80%, changements de direction contrôlés",
      semaine5: "Sprints 90%, drills poste, intégration partielle",
      semaine6: "Validation : tests iso genou + NordBoard + CMJ + Sprint",
    },
    etapesCles: "IRM, test excentrique, test sprint 90%, test terrain poste, validation pré-match",
  },
  {
    id: "B002",
    joueurId: "J003",
    dateBlessure: "2025-10-25",
    diagnostic: "Instabilité acromio-claviculaire",
    localisation: "Épaule G",
    segment: "Épaule",
    phase: "Reconditionnement terrain",
    rttEstimee: "2025-11-15",
    rttEffective: "",
    rtpEstimee: "2025-11-22",
    rtpEffective: "",
    prochainesVisites: "Chir 14/11",
    prochainsTests: "Isométrie épaule; tests de contact progressifs",
    protocole: {
      semaine1: "Gestion douleur, travail passif/actif assisté",
      semaine2: "Renfo scapulaire, isométrie épaule",
      semaine3: "Renfo dynamique, proprioception, chaîne cinétique",
      semaine4: "Exercices fonctionnels, poussées, passes et plaquages contrôlés",
      semaine5: "Contacts progressifs + validation tests iso épaule",
    },
    etapesCles: "Imagerie initiale, avis chir, validation force, test plaquage progressif",
  },
  {
    id: "B003",
    joueurId: "J005",
    dateBlessure: "2025-11-01",
    diagnostic: "Entorse LLA cheville G",
    localisation: "Cheville G",
    segment: "Cheville",
    phase: "Rééducation",
    rttEstimee: "2025-11-20",
    rttEffective: "",
    rtpEstimee: "2025-11-27",
    rtpEffective: "",
    prochainesVisites: "Contrôle médecin 18/11",
    prochainsTests: "KTW; test appui unipodal; tests terrain",
    protocole: {
      semaine1: "Décharge relative, contrôle œdème, mobilité douce",
      semaine2: "Renfo proprioception, KTW progressif",
      semaine3: "Course en ligne droite, changements appuis légers",
      semaine4: "Drills spécifiques, appuis multidirectionnels",
    },
    etapesCles: "KTW symétrique, test appui unipodal, test terrain 100%",
  },
  {
    id: "B004",
    joueurId: "J007",
    dateBlessure: "2025-10-30",
    diagnostic: "Lésion ischio semi-tendineux G grade 1",
    localisation: "Ischio G",
    segment: "Ischio",
    phase: "Adapté / Reprise",
    rttEstimee: "2025-11-12",
    rttEffective: "",
    rtpEstimee: "2025-11-19",
    rtpEffective: "",
    prochainesVisites: "PP + staff 15/11",
    prochainsTests: "NordBoard; Sprint 30m; CMJ",
    protocole: {
      semaine1: "Isométriques, travail chaine postérieure léger",
      semaine2: "Excentrique nordic, course 60%",
      semaine3: "Sprints 80%, changements de direction, drills poste",
      semaine4: "Sprints 90–95%, matchs d'entraînement",
    },
    etapesCles: "NordBoard >90% ref, sprint 90%, match amical",
  },
  {
    id: "B005",
    joueurId: "J006",
    dateBlessure: "2024-09-15",
    diagnostic: "Commotion cérébrale",
    localisation: "Tête",
    segment: "Tête",
    phase: "Résolu",
    rttEstimee: "2024-09-30",
    rttEffective: "2024-09-28",
    rtpEstimee: "2024-10-07",
    rtpEffective: "2024-10-05",
    prochainesVisites: "",
    prochainsTests: "SCAT6, tests cognitifs",
    protocole: {
      semaine1: "Repos relatif, suivi symptômes",
      semaine2: "Reprise vélo, course légère",
      semaine3: "Intégration rugby sans contact",
      semaine4: "Contact progressif, validation médicale",
    },
    etapesCles: "Asymptomatique au repos, asymptomatique à l'effort, validation neurologue",
  },
];

// ================== SEANCES REEDUC ==================

const seances = [
  { id: "S001", blessureId: "B001", joueurId: "J002", date: "2025-11-01", type: "Physio", resume: "Renfo ischio excentrique", rpe: 5, tolerance: "OK", commentaire: "Bonne séance" },
  { id: "S002", blessureId: "B001", joueurId: "J002", date: "2025-11-04", type: "PPG / Prépa", resume: "CMJ + accélérations 60%", rpe: 6, tolerance: "Légère gêne", commentaire: "" },
  { id: "S003", blessureId: "B002", joueurId: "J003", date: "2025-11-03", type: "Physio", resume: "Stabilité scapulaire + isométrie", rpe: 4, tolerance: "OK", commentaire: "" },
  { id: "S004", blessureId: "B002", joueurId: "J003", date: "2025-11-07", type: "Reconditionnement", resume: "Travail contact léger", rpe: 5, tolerance: "OK", commentaire: "" },
  { id: "S005", blessureId: "B003", joueurId: "J005", date: "2025-11-05", type: "Physio", resume: "Proprioception cheville + KTW", rpe: 4, tolerance: "OK", commentaire: "" },
  { id: "S006", blessureId: "B004", joueurId: "J007", date: "2025-11-06", type: "PPG / Prépa", resume: "Sprint 70% + nordic léger", rpe: 6, tolerance: "OK", commentaire: "" },
];

// ================== GPS ==================

const gpsData = [
  { id: "G001", joueurId: "J001", semaine: "2025-W44", mois: "2025-11", match: true,  date: "2025-11-02", totalDistance: 6500, hsr: 600, sprint: 90, vmax: 9.0 },
  { id: "G002", joueurId: "J001", semaine: "2025-W45", mois: "2025-11", match: false, date: "2025-11-06", totalDistance: 7200, hsr: 800, sprint: 120, vmax: 9.4 },
  { id: "G003", joueurId: "J002", semaine: "2025-W44", mois: "2025-11", match: true,  date: "2025-10-28", totalDistance: 5800, hsr: 550, sprint: 80, vmax: 8.9 },
  { id: "G004", joueurId: "J003", semaine: "2025-W45", mois: "2025-11", match: false, date: "2025-11-05", totalDistance: 4000, hsr: 200, sprint: 30, vmax: 8.1 },
  { id: "G005", joueurId: "J007", semaine: "2025-W45", mois: "2025-11", match: true,  date: "2025-11-08", totalDistance: 6900, hsr: 780, sprint: 105, vmax: 9.3 },
  { id: "G006", joueurId: "J008", semaine: "2025-W44", mois: "2025-11", match: true,  date: "2025-11-02", totalDistance: 7200, hsr: 820, sprint: 110, vmax: 9.1 },
];

// ================== UTILITAIRES ==================

function getInitials(joueur) {
  return `${(joueur.prenom[0] ?? "").toUpperCase()}${(joueur.nom[0] ?? "").toUpperCase()}`;
}

function getStatusBadgeClass(statut) {
  switch (statut) {
    case "Disponible":
      return "badge badge-disponible";
    case "Blessé":
      return "badge badge-blesse";
    case "Adapté":
      return "badge badge-adapte";
    default:
      return "badge";
  }
}

function getPhaseClass(phase) {
  if (!phase) return "phase-pill";
  const p = phase.toLowerCase();
  if (p.includes("aigu")) return "phase-pill phase-aigu";
  if (p.includes("rééducation")) return "phase-pill phase-reeeducation";
  if (p.includes("reconditionnement")) return "phase-pill phase-recond";
  if (p.includes("reprise") || p.includes("adapté")) return "phase-pill phase-reprise";
  return "phase-pill";
}

function getZoneClass(zone) {
  if (!zone) return "";
  const z = zone.toLowerCase();
  if (z.includes("vert")) return "flag-dot flag-vert";
  if (z.includes("orange")) return "flag-dot flag-orange";
  if (z.includes("rouge")) return "flag-dot flag-rouge";
  return "flag-dot";
}

// tests où une valeur plus faible est meilleure (temps de sprint)
function isLowerBetter(type) {
  const t = type.toLowerCase();
  return t.includes("sprint") || t.includes("10m") || t.includes("30m");
}

// tendances neutres (physique simple)
function buildNeutralTrendIcon(current, previous) {
  if (previous == null || current == null) return "";
  let icon = "→";
  if (current > previous) icon = "↑";
  else if (current < previous) icon = "↓";
  return `<span class="trend-neutral">${icon}</span>`;
}

function buildPerfTrendIcon(current, previous, higherIsBetter = true) {
  if (previous == null || current == null) return "";
  let trendClass = "trend-neutral";
  let icon = "→";
  if (higherIsBetter) {
    if (current > previous) {
      trendClass = "trend-up";
      icon = "↑";
    } else if (current < previous) {
      trendClass = "trend-down";
      icon = "↓";
    }
  } else {
    if (current < previous) {
      trendClass = "trend-up";
      icon = "↑";
    } else if (current > previous) {
      trendClass = "trend-down";
      icon = "↓";
    }
  }
  return `<span class="${trendClass}">${icon}</span>`;
}

// toggle des "section-card"
function initSectionCardToggles(root) {
  const scope = root || document;
  scope.querySelectorAll(".section-card").forEach((card) => {
    const header = card.querySelector(".section-header");
    if (!header) return;
    header.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
}

// Toggles "Voir l'historique" (déjà dans ta première version, je garde le principe)
function initSubToggles(root) {
  const scope = root || document;
  scope.querySelectorAll(".subtoggle").forEach((btn) => {
    const targetId = btn.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (!target) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = target.classList.contains("active");
      if (isActive) {
        target.classList.remove("active");
        btn.textContent = "Voir l'historique";
      } else {
        target.classList.add("active");
        btn.textContent = "Masquer l'historique";
      }
    });
  });
}

// ================== STATS HEADER ==================

function renderStats() {
  const dispoCount = joueurs.filter((j) => j.disponibilite === "Disponible").length;
  const injuryCount = joueurs.filter((j) => j.disponibilite === "Infirmerie").length;
  document.getElementById("stat-disponibles").textContent = dispoCount;
  document.getElementById("stat-infirmerie").textContent = injuryCount;
}

// ================== LISTE JOUEURS ==================

function createAvatar(joueur, baseClass) {
  const avatar = document.createElement("div");
  avatar.className = baseClass;
  if (joueur.photoUrl) {
    const img = document.createElement("img");
    img.src = joueur.photoUrl;
    img.alt = `${joueur.prenom} ${joueur.nom}`;
    avatar.appendChild(img);
  } else {
    avatar.textContent = getInitials(joueur);
  }
  return avatar;
}

function renderPlayersList() {
  const filter = document.getElementById("filterSelect").value;
  const container = document.getElementById("playersList");
  container.innerHTML = "";

  let filtered = [...joueurs];

  if (filter === "available") {
    filtered = filtered.filter((j) => j.disponibilite === "Disponible");
  } else if (filter === "injury") {
    filtered = filtered.filter((j) => j.disponibilite === "Infirmerie");
  }

  // Filtre texte : nom / prénom / poste / ligne
  if (searchTerm && searchTerm.trim() !== "") {
    const query = searchTerm.toLowerCase();
    filtered = filtered.filter((j) => {
      const fullName = `${j.prenom} ${j.nom}`.toLowerCase();
      const poste = `poste ${j.poste}`.toLowerCase();
      const ligne = (j.ligne || "").toLowerCase();
      return fullName.includes(query) || poste.includes(query) || ligne.includes(query);
    });
  }

  filtered.forEach((j) => {
    const card = document.createElement("div");
    card.className = "player-card" + (currentPlayerId === j.id ? " active" : "");
    card.addEventListener("click", () => {
      currentPlayerId = j.id;
      selectedSegment = "Global";
      selectedTestId = null;
      activeFunctionalMetric = null;
      activeCourseMetric = null;
      activeJumpMetric = null;
      renderPlayersList();
      renderPlayerDetail(j.id);
    });

    const avatar = createAvatar(j, "player-avatar");

    const main = document.createElement("div");
    main.className = "player-main";

    const name = document.createElement("div");
    name.className = "player-name";
    name.textContent = `${j.prenom} ${j.nom}`;

    const sub = document.createElement("div");
    sub.className = "player-sub";
    sub.textContent = `Poste ${j.poste} • ${j.ligne}`;

    main.appendChild(name);
    main.appendChild(sub);

    const badge = document.createElement("span");
    badge.className = getStatusBadgeClass(j.statut);
    badge.textContent = j.statut;

    card.appendChild(avatar);
    card.appendChild(main);
    card.appendChild(badge);
    container.appendChild(card);
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p style='font-size:0.85rem;color:#cbd5f5;'>Aucun joueur ne correspond à ce filtre.</p>";
  }
}

// ================== FICHE JOUEUR ==================

function renderPlayerDetail(id) {
  const joueur = joueurs.find((j) => j.id === id);
  if (!joueur) return;

  const detail = document.getElementById("playerDetail");
  detail.classList.remove("empty-state");
  detail.innerHTML = "";

  // HEADER "CARTE FIFA"
  const headerCard = document.createElement("div");
  headerCard.className = "player-header-card";

  const avatar = createAvatar(joueur, "ph-avatar");

  const phMain = document.createElement("div");
  phMain.className = "ph-main";

  const phName = document.createElement("div");
  phName.className = "ph-name";
  phName.textContent = `${joueur.prenom} ${joueur.nom}`;

  const phBirth = document.createElement("div");
  phBirth.className = "ph-meta";
  phBirth.textContent = joueur.dateNaissance ? `Né le ${joueur.dateNaissance}` : "";

  const phSub = document.createElement("div");
  phSub.className = "ph-sub";
  phSub.textContent = `Poste ${joueur.poste} • ${joueur.ligne}`;

  const phTags = document.createElement("div");
  phTags.className = "ph-tags";

  const tagStatut = document.createElement("span");
  tagStatut.className = "ph-tag";
  tagStatut.textContent = joueur.statut;

  const tagMinutes = document.createElement("span");
  tagMinutes.className = "ph-tag";
  tagMinutes.textContent = `Minutes jouées : ${joueur.minutesJouees ?? "-"}`;

  phTags.appendChild(tagStatut);
  phTags.appendChild(tagMinutes);

  phMain.appendChild(phName);
  phMain.appendChild(phBirth);
  phMain.appendChild(phSub);
  phMain.appendChild(phTags);

  const phScore = document.createElement("div");
  phScore.className = "ph-score";
  const scoreValue = document.createElement("div");
  scoreValue.className = "ph-score-value";
  scoreValue.textContent = joueur.scoreGlobal ?? "-";
  const scoreLabel = document.createElement("div");
  scoreLabel.className = "ph-score-label";
  scoreLabel.textContent = "Indice global";
  phScore.appendChild(scoreValue);
  phScore.appendChild(scoreLabel);

  headerCard.appendChild(avatar);
  headerCard.appendChild(phMain);
  headerCard.appendChild(phScore);
  detail.appendChild(headerCard);

  // === Sous-blocs dans l'ordre demandé ===

  renderPhysicalSection(detail, joueur);          // Profil physique
  renderGpsSection(detail, joueur);               // Performance GPS
  renderInjuryOverviewSection(detail, joueur);    // Antécédents blessures
  renderFunctionalSection(detail, joueur);        // Tests fonctionnels globaux
  renderRunningTestsSection(detail, joueur);      // Tests de course
  renderJumpTestsSection(detail, joueur);         // Tests de saut
  renderForceVelocitySection(detail, joueur);     // Profil F-V
  renderAnatomicalZonesSection(detail, joueur);   // Zones anatomiques + tests

  // Rééducation uniquement pour joueurs blessés / adaptés
  if (joueur.statut !== "Disponible") {
    renderBlessureSection(detail, joueur);
  }

  // Active les toggles des sections
  initSectionCardToggles(detail);
  initSubToggles(detail);
}

// ================== PROFIL PHYSIQUE ==================

function getMorphoHistory(joueur) {
  // Historique artificiel sur 4 dates pour un rendu plus visuel
  const baseDate = new Date(joueur.dernierTest || "2025-11-01");
  const dates = [-90, -60, -30, 0].map((d) => {
    const tmp = new Date(baseDate);
    tmp.setDate(tmp.getDate() + d);
    return tmp.toISOString().slice(0, 10);
  });
  const values = [];
  for (let i = 0; i < dates.length; i++) {
    values.push({
      date: dates[i],
      taille: joueur.taille ?? null,
      poids: joueur.poids != null ? joueur.poids - (3 - i) * 0.5 : null,
      masseGrasse: joueur.masseGrasse != null ? joueur.masseGrasse + (3 - i) * 0.2 : null,
    });
  }
  // Dernier point = valeur actuelle exacte
  values[values.length - 1].poids = joueur.poids ?? null;
  values[values.length - 1].masseGrasse = joueur.masseGrasse ?? null;
  return values;
}

function renderPhysicalSection(detail, joueur) {
  const history = getMorphoHistory(joueur);
  const current = history[history.length - 1];
  const prev = history[history.length - 2] || current;
  const historyId = `physical-history-${joueur.id}`;
  const canvasId = `morpho-canvas-${joueur.id}`;

  const card = document.createElement("div");
  card.className = "section-card open";
  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Profil physique</div>
        <div class="section-title-sub">Taille, poids, % masse grasse · dernière mesure ${current.date}</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="two-columns">
        <div class="info-card">
          <div class="info-label">Taille</div>
          <div class="info-value">${current.taille ?? "-"} cm</div>
        </div>
        <div class="info-card">
          <div class="info-label">Poids</div>
          <div class="info-value">
            ${current.poids ?? "-"} kg
            ${buildNeutralTrendIcon(current.poids, prev.poids)}
          </div>
        </div>
        <div class="info-card">
          <div class="info-label">% masse grasse (estimée)</div>
          <div class="info-value">
            ${current.masseGrasse ?? "-"} %
            ${buildNeutralTrendIcon(current.masseGrasse, prev.masseGrasse)}
          </div>
        </div>
      </div>
      <div class="section-canvas-wrapper">
        <canvas id="${canvasId}" width="420" height="120"></canvas>
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique des mesures</div>
          <table class="table-like" style="margin-top:4px;">
            <thead>
              <tr>
                <th>Date</th>
                <th>Taille (cm)</th>
                <th>Poids (kg)</th>
                <th>% MG</th>
              </tr>
            </thead>
            <tbody>
              ${history
                .map(
                  (h) => `
                <tr>
                  <td>${h.date}</td>
                  <td>${h.taille ?? "-"}</td>
                  <td>${h.poids ?? "-"}</td>
                  <td>${h.masseGrasse ?? "-"}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  const canvas = card.querySelector(`#${canvasId}`);
  if (canvas) {
    drawMorphoChart(canvas, history);
  }
}

function drawMorphoChart(canvas, history) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 24;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  const weights = history.map((h) => h.poids).filter((v) => v != null);
  if (weights.length === 0) return;
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);

  ctx.strokeStyle = "#cbd5f5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding, padding);
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  ctx.strokeStyle = "#ff2e9a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  history.forEach((pt, idx) => {
    if (pt.poids == null) return;
    const x = padding + (w * idx) / (history.length - 1 || 1);
    const norm = (pt.poids - minW) / (maxW - minW || 1);
    const y = padding + h - norm * h;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#ff2e9a";
  history.forEach((pt, idx) => {
    if (pt.poids == null) return;
    const x = padding + (w * idx) / (history.length - 1 || 1);
    const norm = (pt.poids - minW) / (maxW - minW || 1);
    const y = padding + h - norm * h;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#6b7280";
  ctx.font = "10px system-ui";
  ctx.fillText("Evolution du poids (kg)", padding, padding - 6);
}

// ================== PERFORMANCE GPS ==================

function renderGpsSection(detail, joueur) {
  const data = gpsData.filter((g) => g.joueurId === joueur.id);
  const card = document.createElement("div");
  card.className = "section-card open";

  const historyId = `gps-history-${joueur.id}`;
  const canvasId = `gps-canvas-${joueur.id}`;

  if (data.length === 0) {
    card.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <div class="section-title-main">Performance GPS</div>
          <div class="section-title-sub">Aucune donnée enregistrée</div>
        </div>
        <div class="section-toggle-icon">▶</div>
      </div>
      <div class="section-summary">
        <div class="section-content">Pas de données GPS enregistrées pour ce joueur.</div>
      </div>
    `;
    detail.appendChild(card);
    return;
  }

  const sortedByDate = [...data].sort((a, b) => (a.date > b.date ? 1 : -1));
  const last = sortedByDate[sortedByDate.length - 1];
  const prev = sortedByDate.length > 1 ? sortedByDate[sortedByDate.length - 2] : null;

  const byDateRows = sortedByDate
    .map(
      (d) => `
    <tr>
      <td>${d.date}</td>
      <td>${d.totalDistance} m</td>
      <td>${d.hsr} m</td>
      <td>${d.sprint} m</td>
      <td>${d.vmax ?? "-"} m/s</td>
    </tr>`
    )
    .join("");

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Performance GPS</div>
        <div class="section-title-sub">Dernière séance ${last.date}</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="gps-cards">
        <div class="info-card">
          <div class="info-label">Distance totale</div>
          <div class="info-value">
            ${last.totalDistance} m
            ${prev ? buildPerfTrendIcon(last.totalDistance, prev.totalDistance, true) : ""}
          </div>
          <div class="info-label">HSR</div>
          <div class="info-value">
            ${last.hsr} m
            ${prev ? buildPerfTrendIcon(last.hsr, prev.hsr, true) : ""}
          </div>
        </div>
        <div class="info-card">
          <div class="info-label">Sprint & Vitesse max</div>
          <div class="info-value">
            Sprint : ${last.sprint} m
            ${prev ? buildPerfTrendIcon(last.sprint, prev.sprint, true) : ""}<br/>
            Vmax : ${last.vmax ?? "-"} m/s
            ${prev ? buildPerfTrendIcon(last.vmax ?? 0, prev.vmax ?? 0, true) : ""}
          </div>
        </div>
      </div>
      <div class="section-canvas-wrapper">
        <canvas id="${canvasId}" width="420" height="120"></canvas>
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique complet des séances GPS</div>
          <table class="table-like" style="margin-top:4px;">
            <thead>
              <tr>
                <th>Date</th>
                <th>Distance</th>
                <th>HSR</th>
                <th>Sprint</th>
                <th>Vmax</th>
              </tr>
            </thead>
            <tbody>
              ${byDateRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  const canvas = card.querySelector(`#${canvasId}`);
  if (canvas) {
    drawGpsChart(canvas, sortedByDate);
  }
}

function drawGpsChart(canvas, data) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 24;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  const distances = data.map((d) => d.totalDistance);
  const minD = Math.min(...distances);
  const maxD = Math.max(...distances);

  ctx.strokeStyle = "#cbd5f5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding, padding);
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  ctx.strokeStyle = "#ff2e9a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((d, idx) => {
    const x = padding + (w * idx) / (data.length - 1 || 1);
    const norm = (d.totalDistance - minD) / (maxD - minD || 1);
    const y = padding + h - norm * h;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#ff2e9a";
  data.forEach((d, idx) => {
    const x = padding + (w * idx) / (data.length - 1 || 1);
    const norm = (d.totalDistance - minD) / (maxD - minD || 1);
    const y = padding + h - norm * h;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#6b7280";
  ctx.font = "10px system-ui";
  ctx.fillText("Evolution distance totale (m)", padding, padding - 6);
}

// ================== ANTECEDENTS DE BLESSURES ==================

function renderInjuryOverviewSection(detail, joueur) {
  const playerBlessures = blessures
    .filter((b) => b.joueurId === joueur.id)
    .sort((a, b) => (a.dateBlessure > b.dateBlessure ? -1 : 1));

  const card = document.createElement("div");
  card.className = "section-card open";

  const historyId = `injury-history-${joueur.id}`;

  if (playerBlessures.length === 0) {
    const hasCommotion = (joueur.antecedents || "").toLowerCase().includes("commotion");
    card.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <div class="section-title-main">Antécédents de blessures</div>
          <div class="section-title-sub">Aucune blessure enregistrée dans le système</div>
        </div>
        <div class="section-toggle-icon">▶</div>
      </div>
      <div class="section-summary">
        <div class="section-content">
          ${
            hasCommotion
              ? "Antécédent de commotion mentionné dans l'anamnèse mais non renseigné en détail."
              : "Pas d'antécédents de blessure renseignés."
          }
        </div>
      </div>
    `;
    detail.appendChild(card);
    return;
  }

  const lastInjury = playerBlessures[0];

  // total days off
  let totalDays = 0;
  const rows = playerBlessures
    .map((b) => {
      const start = new Date(b.dateBlessure);
      const endDateStr = b.rtpEffective || b.rtpEstimee || b.rttEstimee || new Date().toISOString().slice(0, 10);
      const end = new Date(endDateStr);
      const diffDays = Math.max(Math.round((end - start) / (1000 * 60 * 60 * 24)), 0);
      totalDays += diffDays;
      return `
        <tr>
          <td>${b.dateBlessure}</td>
          <td>${b.diagnostic}</td>
          <td>${b.localisation}</td>
          <td>${diffDays} j</td>
        </tr>
      `;
    })
    .join("");

  // résumé par zone anatomique
  const byZone = {};
  playerBlessures.forEach((b) => {
    if (!byZone[b.segment]) {
      byZone[b.segment] = { nb: 0, days: 0 };
    }
    const start = new Date(b.dateBlessure);
    const endDateStr = b.rtpEffective || b.rtpEstimee || b.rttEstimee || new Date().toISOString().slice(0, 10);
    const end = new Date(endDateStr);
    const diffDays = Math.max(Math.round((end - start) / (1000 * 60 * 60 * 24)), 0);
    byZone[b.segment].nb += 1;
    byZone[b.segment].days += diffDays;
  });

  const zoneCards = Object.entries(byZone)
    .map(([seg, info]) => {
      let intensityClass = "asym-green";
      if (info.days > 40) intensityClass = "asym-red";
      else if (info.days > 20) intensityClass = "asym-orange";
      return `
        <div class="injury-zone-card">
          <div class="injury-zone-title">${seg}</div>
          <div class="injury-zone-days">${info.nb} blessure(s)</div>
          <div class="${intensityClass}" style="margin-top:4px;display:inline-block;">${info.days} j au total</div>
        </div>
      `;
    })
    .join("");

  const hasCommotion = playerBlessures.some((b) => b.segment === "Tête") || (joueur.antecedents || "").toLowerCase().includes("commotion");

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Antécédents de blessures</div>
        <div class="section-title-sub">Dernière blessure : ${lastInjury.diagnostic} (${lastInjury.dateBlessure})</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="two-columns">
        <div class="info-card">
          <div class="info-label">Dernière pathologie</div>
          <div class="info-value">${lastInjury.diagnostic}</div>
          <div class="info-label">Localisation</div>
          <div class="info-value">${lastInjury.localisation}</div>
        </div>
        <div class="info-card">
          <div class="info-label">Impact global</div>
          <div class="info-value">${totalDays} jours d'absence cumulés</div>
          ${
            hasCommotion
              ? '<div class="info-label" style="margin-top:4px;">Antécédents de commotion présents</div>'
              : ""
          }
        </div>
      </div>
      <div class="injury-zones-grid" style="margin-top:8px;">
        ${zoneCards}
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique détaillé par blessure</div>
          <table class="table-like" style="margin-top:4px;">
            <thead>
              <tr>
                <th>Date</th>
                <th>Diagnostic</th>
                <th>Zone</th>
                <th>Jours d'absence</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);
}

// ================== TESTS FONCTIONNELS GLOBAUX (UPPER / LOWER) ==================

function getFunctionalHistorySynthetic(joueur) {
  const base = testsFonctionnels.find((t) => t.joueurId === joueur.id);
  if (!base) return [];
  const baseDate = new Date(joueur.dernierTest || "2025-11-01");
  const dates = [-90, -60, -30, 0].map((d) => {
    const tmp = new Date(baseDate);
    tmp.setDate(tmp.getDate() + d);
    return tmp.toISOString().slice(0, 10);
  });
  const history = [];
  dates.forEach((date, idx) => {
    const factor = 1 - (3 - idx) * 0.03; // léger progrès
    history.push({
      date,
      dc1rm: Math.round(base.dc1rm * factor),
      tirage1rm: Math.round(base.tirage1rm * factor),
      tractions: Math.round(base.tractions * factor),
      grip: Math.round(base.grip * factor),
      squat1rm: Math.round(base.squat1rm * factor),
      imtp: Math.round(base.imtp * factor),
      f1080: +(base.f1080 * factor).toFixed(2),
      vmax: +(base.vmax * factor).toFixed(2),
    });
  });
  // dernier = valeur actuelle exacte
  const last = history[history.length - 1];
  Object.assign(last, base, { date: dates[dates.length - 1] });
  return history;
}

function renderFunctionalSection(detail, joueur) {
  const data = testsFonctionnels.find((t) => t.joueurId === joueur.id);
  const history = getFunctionalHistorySynthetic(joueur);
  const current = history[history.length - 1];
  const prev = history[history.length - 2] || current;
  const historyId = `functional-history-${joueur.id}`;
  const canvasId = `fv-canvas-${joueur.id}`;

  const card = document.createElement("div");
  card.className = "section-card open";

  if (!data) {
    card.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <div class="section-title-main">Tests fonctionnels globaux</div>
          <div class="section-title-sub">Aucun test renseigné</div>
        </div>
        <div class="section-toggle-icon">▶</div>
      </div>
      <div class="section-summary">
        <div class="section-content">Tests fonctionnels à compléter.</div>
      </div>
    `;
    detail.appendChild(card);
    return;
  }

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Tests fonctionnels globaux</div>
        <div class="section-title-sub">Membre supérieur / membre inférieur</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="metrics-row">
        <div class="metric-pill" data-metric="dc1rm">
          <span class="metric-label">DC 1RM</span>
          <span class="metric-value">${current.dc1rm} kg</span>
          ${buildPerfTrendIcon(current.dc1rm, prev.dc1rm, true)}
        </div>
        <div class="metric-pill" data-metric="tirage1rm">
          <span class="metric-label">Tirage 1RM</span>
          <span class="metric-value">${current.tirage1rm} kg</span>
          ${buildPerfTrendIcon(current.tirage1rm, prev.tirage1rm, true)}
        </div>
        <div class="metric-pill" data-metric="tractions">
          <span class="metric-label">Tractions</span>
          <span class="metric-value">${current.tractions}</span>
          ${buildPerfTrendIcon(current.tractions, prev.tractions, true)}
        </div>
        <div class="metric-pill" data-metric="grip">
          <span class="metric-label">Force grip</span>
          <span class="metric-value">${current.grip} kg</span>
          ${buildPerfTrendIcon(current.grip, prev.grip, true)}
        </div>
      </div>
      <div class="metrics-row" style="margin-top:10px;">
        <div class="metric-pill" data-metric="squat1rm">
          <span class="metric-label">Squat 1RM</span>
          <span class="metric-value">${current.squat1rm} kg</span>
          ${buildPerfTrendIcon(current.squat1rm, prev.squat1rm, true)}
        </div>
        <div class="metric-pill" data-metric="imtp">
          <span class="metric-label">IMTP</span>
          <span class="metric-value">${current.imtp} N</span>
          ${buildPerfTrendIcon(current.imtp, prev.imtp, true)}
        </div>
      </div>
      <div class="section-canvas-wrapper">
        <div class="info-label">Profil force–vitesse synthétique</div>
        <canvas id="${canvasId}" width="420" height="140"></canvas>
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique des tests fonctionnels (sélectionne une variable ci-dessus)</div>
          <div id="functional-history-table-${joueur.id}" class="section-content" style="margin-top:6px;font-size:0.8rem;color:#6b7280;">
            Clique sur une bulle pour afficher le détail et la courbe d'évolution.
          </div>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  const canvas = card.querySelector(`#${canvasId}`);
  if (canvas) {
    drawFVProfile(canvas, data);
  }

  card.querySelectorAll(".metric-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation();
      const metric = pill.getAttribute("data-metric");
      activeFunctionalMetric = metric;
      renderFunctionalMetricHistory(joueur, metric);
    });
  });
}

function renderFunctionalMetricHistory(joueur, metricKey) {
  const container = document.getElementById(`functional-history-table-${joueur.id}`);
  if (!container) return;

  const history = getFunctionalHistorySynthetic(joueur);
  const labelMap = {
    dc1rm: "DC 1RM (kg)",
    tirage1rm: "Tirage 1RM (kg)",
    tractions: "Tractions (reps)",
    grip: "Force grip (kg)",
    squat1rm: "Squat 1RM (kg)",
    imtp: "IMTP (N)",
  };
  const label = labelMap[metricKey] || metricKey;

  const values = history.map((h) => h[metricKey]).filter((v) => v != null);
  if (values.length === 0) {
    container.innerHTML = "<div class='section-content'>Pas de données pour ce test.</div>";
    return;
  }

  const rows = history
    .map(
      (h) => `
    <tr>
      <td>${h.date}</td>
      <td>${h[metricKey]}</td>
    </tr>
  `
    )
    .join("");

  const canvasId = `functional-metric-canvas-${joueur.id}`;
  container.innerHTML = `
    <table class="table-like" style="margin-top:4px;">
      <thead>
        <tr><th>Date</th><th>${label}</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="functional-canvas-wrapper">
      <canvas id="${canvasId}" width="420" height="130"></canvas>
    </div>
  `;

  const canvas = document.getElementById(canvasId);
  if (canvas) {
    drawSimpleLineChart(canvas, history.map((h) => ({ date: h.date, value: h[metricKey] })), label);
  }
}

function drawFVProfile(canvas, data) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 24;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  const fMax = data.imtp || 2500;
  const vMax = data.vmax || 9;
  const fRef = 3500;
  const vRef = 10;

  const fNorm = Math.min(fMax / fRef, 1.2);
  const vNorm = Math.min(vMax / vRef, 1.2);

  ctx.strokeStyle = "#cbd5f5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding, padding);
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding + w * 0.05, padding + h * 0.1);
  ctx.lineTo(padding + w * 0.95, padding + h * 0.9);
  ctx.stroke();

  const x = padding + w * Math.min(vNorm, 1);
  const y = padding + h * (1 - Math.min(fNorm, 1));

  ctx.fillStyle = "#ff2e9a";
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#6b7280";
  ctx.font = "10px system-ui";
  ctx.fillText("Profil actuel", x + 6, y - 6);
}

// simple line chart générique
function drawSimpleLineChart(canvas, series, label) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 24;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  const vals = series.map((s) => s.value).filter((v) => v != null);
  if (vals.length === 0) return;
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);

  ctx.strokeStyle = "#cbd5f5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding, padding);
  ctx.moveTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  ctx.strokeStyle = "#ff2e9a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  series.forEach((pt, idx) => {
    const x = padding + (w * idx) / (series.length - 1 || 1);
    const norm = (pt.value - minV) / (maxV - minV || 1);
    const y = padding + h - norm * h;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#ff2e9a";
  series.forEach((pt, idx) => {
    const x = padding + (w * idx) / (series.length - 1 || 1);
    const norm = (pt.value - minV) / (maxV - minV || 1);
    const y = padding + h - norm * h;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#6b7280";
  ctx.font = "10px system-ui";
  ctx.fillText(label, padding, padding - 6);
}

// ================== TESTS DE COURSE ==================

function renderRunningTestsSection(detail, joueur) {
  const card = document.createElement("div");
  card.className = "section-card open";

  const historyId = `running-history-${joueur.id}`;
  const lastTests = getLastTestsByType(joueur.id, ["Bonco", "Sprint 10m", "Sprint 30m"]);
  const func = testsFonctionnels.find((t) => t.joueurId === joueur.id);
  const vmax = func ? func.vmax : null;

  const pills = [];
  if (lastTests["Bonco"]) {
    const { current, previous } = lastTests["Bonco"];
    pills.push(`
      <div class="metric-pill" data-course="Bonco">
        <span class="metric-label">Bonco</span>
        <span class="metric-value">${current.valeur} ${current.unite}</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, true) : ""}
      </div>
    `);
  }
  if (lastTests["Sprint 10m"]) {
    const { current, previous } = lastTests["Sprint 10m"];
    pills.push(`
      <div class="metric-pill" data-course="Sprint 10m">
        <span class="metric-label">Sprint 10m</span>
        <span class="metric-value">${current.valeur} s</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, false) : ""}
      </div>
    `);
  }
  if (lastTests["Sprint 30m"]) {
    const { current, previous } = lastTests["Sprint 30m"];
    pills.push(`
      <div class="metric-pill" data-course="Sprint 30m">
        <span class="metric-label">Sprint 30m</span>
        <span class="metric-value">${current.valeur} s</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, false) : ""}
      </div>
    `);
  }
  if (vmax != null) {
    pills.push(`
      <div class="metric-pill" data-course="Vmax">
        <span class="metric-label">Vitesse max</span>
        <span class="metric-value">${vmax} m/s</span>
      </div>
    `);
  }

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Tests de course</div>
        <div class="section-title-sub">Energétique & vitesse</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="metrics-row">
        ${pills.join("") || "<div class='section-content'>Aucun test de course enregistré.</div>"}
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique par test de course</div>
          <div id="running-history-table-${joueur.id}" class="section-content" style="margin-top:6px;font-size:0.8rem;color:#6b7280;">
            Clique sur une bulle pour afficher l'historique et le graphique associé.
          </div>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  card.querySelectorAll(".metric-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation();
      const metric = pill.getAttribute("data-course");
      activeCourseMetric = metric;
      renderRunningMetricHistory(joueur, metric);
    });
  });
}

function getLastTestsByType(joueurId, types) {
  const result = {};
  types.forEach((type) => {
    const list = testsPhysiques
      .filter((t) => t.joueurId === joueurId && t.type === type)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
    if (list.length > 0) {
      result[type] = {
        current: list[list.length - 1],
        previous: list.length > 1 ? list[list.length - 2] : null,
        all: list,
      };
    }
  });
  return result;
}

function renderRunningMetricHistory(joueur, metric) {
  const container = document.getElementById(`running-history-table-${joueur.id}`);
  if (!container) return;

  if (metric === "Vmax") {
    const hist = getFunctionalHistorySynthetic(joueur).map((h) => ({ date: h.date, value: h.vmax }));
    if (!hist.length) {
      container.innerHTML = "<div class='section-content'>Pas de données Vmax.</div>";
      return;
    }
    const rows = hist
      .map(
        (h) => `
        <tr>
          <td>${h.date}</td>
          <td>${h.value} m/s</td>
        </tr>`
      )
      .join("");
    const canvasId = `running-metric-canvas-${joueur.id}`;
    container.innerHTML = `
      <table class="table-like" style="margin-top:4px;">
        <thead><tr><th>Date</th><th>Vmax (m/s)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="functional-canvas-wrapper">
        <canvas id="${canvasId}" width="420" height="130"></canvas>
      </div>
    `;
    const canvas = document.getElementById(canvasId);
    if (canvas) drawSimpleLineChart(canvas, hist, "Vmax (m/s)");
    return;
  }

  const all = testsPhysiques
    .filter((t) => t.joueurId === joueur.id && t.type === metric)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  if (!all.length) {
    container.innerHTML = "<div class='section-content'>Pas de données pour ce test.</div>";
    return;
  }
  const rows = all
    .map(
      (t) => `
      <tr>
        <td>${t.date}</td>
        <td>${t.valeur} ${t.unite}</td>
        <td>${t.ratio}</td>
      </tr>`
    )
    .join("");
  const canvasId = `running-metric-canvas-${joueur.id}`;
  container.innerHTML = `
    <table class="table-like" style="margin-top:4px;">
      <thead><tr><th>Date</th><th>Valeur</th><th>Ratio</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="functional-canvas-wrapper">
      <canvas id="${canvasId}" width="420" height="130"></canvas>
    </div>
  `;
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    drawSimpleLineChart(
      canvas,
      all.map((t) => ({ date: t.date, value: t.ratio })),
      `${metric} (ratio)`
    );
  }
}

// ================== TESTS DE SAUT ==================

function renderJumpTestsSection(detail, joueur) {
  const card = document.createElement("div");
  card.className = "section-card open";

  const historyId = `jump-history-${joueur.id}`;
  const lastTests = getLastTestsByType(joueur.id, ["CMJ", "Squat Jump", "Single Hop", "Triple Hop"]);

  const pills = [];
  if (lastTests["CMJ"]) {
    const { current, previous } = lastTests["CMJ"];
    pills.push(`
      <div class="metric-pill" data-jump="CMJ">
        <span class="metric-label">CMJ</span>
        <span class="metric-value">${current.valeur} cm</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, true) : ""}
      </div>
    `);
  }
  if (lastTests["Squat Jump"]) {
    const { current, previous } = lastTests["Squat Jump"];
    pills.push(`
      <div class="metric-pill" data-jump="Squat Jump">
        <span class="metric-label">Squat Jump</span>
        <span class="metric-value">${current.valeur} cm</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, true) : ""}
      </div>
    `);
  }
  if (lastTests["Single Hop"]) {
    const { current, previous } = lastTests["Single Hop"];
    pills.push(`
      <div class="metric-pill" data-jump="Single Hop">
        <span class="metric-label">Single Hop</span>
        <span class="metric-value">${current.valeur} cm</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, true) : ""}
      </div>
    `);
  }
  if (lastTests["Triple Hop"]) {
    const { current, previous } = lastTests["Triple Hop"];
    pills.push(`
      <div class="metric-pill" data-jump="Triple Hop">
        <span class="metric-label">Triple Hop</span>
        <span class="metric-value">${current.valeur} cm</span>
        ${previous ? buildPerfTrendIcon(current.valeur, previous.valeur, true) : ""}
      </div>
    `);
  }

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Tests de saut</div>
        <div class="section-title-sub">CMJ · Squat Jump · Single / Triple Hop</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="metrics-row">
        ${pills.join("") || "<div class='section-content'>Aucun test de saut enregistré.</div>"}
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir l'historique</button>
      <div id="${historyId}" class="section-body-details">
        <div class="info-card">
          <div class="info-label">Historique par test de saut</div>
          <div id="jump-history-table-${joueur.id}" class="section-content" style="margin-top:6px;font-size:0.8rem;color:#6b7280;">
            Clique sur une bulle pour afficher l'historique et le graphique associé.
          </div>
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  card.querySelectorAll(".metric-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation();
      const metric = pill.getAttribute("data-jump");
      activeJumpMetric = metric;
      renderJumpMetricHistory(joueur, metric);
    });
  });
}

function renderJumpMetricHistory(joueur, metric) {
  const container = document.getElementById(`jump-history-table-${joueur.id}`);
  if (!container) return;

  const all = testsPhysiques
    .filter((t) => t.joueurId === joueur.id && t.type === metric)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  if (!all.length) {
    container.innerHTML = "<div class='section-content'>Pas de données pour ce test.</div>";
    return;
  }

  const rows = all
    .map(
      (t) => `
      <tr>
        <td>${t.date}</td>
        <td>${t.cote || "-"}</td>
        <td>${t.valeur} ${t.unite}</td>
        <td>${t.ratio}</td>
      </tr>`
    )
    .join("");
  const canvasId = `jump-metric-canvas-${joueur.id}`;
  container.innerHTML = `
    <table class="table-like" style="margin-top:4px;">
      <thead><tr><th>Date</th><th>Côté</th><th>Valeur</th><th>Ratio</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="functional-canvas-wrapper">
      <canvas id="${canvasId}" width="420" height="130"></canvas>
    </div>
  `;
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    drawSimpleLineChart(
      canvas,
      all.map((t) => ({ date: t.date, value: t.ratio })),
      `${metric} (ratio)`
    );
  }
}

// ================== PROFIL FORCE / VITESSE (CARTE DEDIEE) ==================

function renderForceVelocitySection(detail, joueur) {
  const data = testsFonctionnels.find((t) => t.joueurId === joueur.id);
  if (!data) return;
  const canvasId = `fv-card-canvas-${joueur.id}`;

  const card = document.createElement("div");
  card.className = "section-card open";
  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Profil force / vitesse</div>
        <div class="section-title-sub">Synthèse F-V</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="section-canvas-wrapper">
        <canvas id="${canvasId}" width="420" height="140"></canvas>
      </div>
    </div>
    <div class="section-body">
      <div class="info-card">
        <div class="info-label">Détail</div>
        <div class="section-content">
          Profil basé sur IMTP (force max) et Vmax (vitesse max). Utilise-le pour suivre le profil F-V dans le temps lors des campagnes de tests.
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  const canvas = card.querySelector(`#${canvasId}`);
  if (canvas) {
    drawFVProfile(canvas, data);
  }
}

// ================== ZONES ANATOMIQUES & TESTS ==================

const anatomicalConfig = {
  "Tête": ["Cognition réaction"],
  "Rachis cervical": ["Isométrie rachis cervical"],
  "Épaule": ["ASH test"],
  "Lombaire": ["Extension lombaire iso"],
  "Hanche": ["CMJ", "Squat Jump"],
  "Genou": ["Isocinétique quadriceps", "McCall", "Single Hop", "Triple Hop"],
  "Cheville": ["KTW"],
  "Ischio": ["NordBoard"],
  "Course": ["Sprint 10m", "Sprint 30m", "Bonco"],
};

function renderAnatomicalZonesSection(detail, joueur) {
  const card = document.createElement("div");
  card.className = "section-card open";
  const tests = testsPhysiques.filter((t) => t.joueurId === joueur.id);

  const zonesHtml = Object.entries(anatomicalConfig)
    .map(([seg, expectedTests]) => {
      const hasTests = tests.some((t) => t.segment === seg || expectedTests.includes(t.type));
      const cls = hasTests ? "segment-tab active" : "segment-tab";
      return `<button type="button" class="${cls}" data-seg="${seg}">${seg}</button>`;
    })
    .join("");

  const tableContainerId = `zones-tests-${joueur.id}`;
  const detailContainerId = `zones-detail-${joueur.id}`;

  card.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Zones anatomiques & tests</div>
        <div class="section-title-sub">Sélectionne une zone pour voir les derniers tests</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="segment-tabs">
        ${zonesHtml}
      </div>
      <div id="${tableContainerId}" class="section-content" style="margin-top:8px;">
        Sélectionne une zone anatomique pour afficher les tests associés.
      </div>
    </div>
    <div class="section-body">
      <div class="info-card">
        <div class="info-label">Détail test sélectionné</div>
        <div id="${detailContainerId}" class="section-content" style="margin-top:6px;font-size:0.8rem;color:#6b7280;">
          Clique sur une ligne de test pour voir l'évolution, l'asymétrie et la comparaison au groupe.
        </div>
      </div>
    </div>
  `;
  detail.appendChild(card);

  const tabs = card.querySelectorAll(".segment-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.stopPropagation();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const seg = tab.getAttribute("data-seg");
      renderZoneTestsTable(joueur, seg, tableContainerId, detailContainerId);
    });
  });

  // zone globale par défaut si dispo
  const defaultSeg = "Hanche";
  renderZoneTestsTable(joueur, defaultSeg, tableContainerId, detailContainerId);
}

function renderZoneTestsTable(joueur, segment, tableContainerId, detailContainerId) {
  const container = document.getElementById(tableContainerId);
  if (!container) return;

  let tests = testsPhysiques
    .filter(
      (t) =>
        t.joueurId === joueur.id &&
        (t.segment === segment || (anatomicalConfig[segment] || []).includes(t.type))
    )
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  if (!tests.length) {
    container.innerHTML = "<div class='section-content'>Aucun test enregistré pour cette zone.</div>";
    return;
  }

  // Ne garder que le dernier test par type / côté
  const map = {};
  tests.forEach((t) => {
    const key = `${t.type}-${t.cote || "-"}`;
    if (!map[key]) map[key] = t;
  });
  const latestTests = Object.values(map);

  const rows = latestTests
    .map((t) => {
      return `
      <tr data-test-id="${t.id}">
        <td>${t.date}</td>
        <td>${t.type}</td>
        <td>${t.cote || "-"}</td>
        <td>${t.valeur} ${t.unite}</td>
        <td>${t.ratio}</td>
        <td><span class="${getZoneClass(t.zone)}"></span></td>
      </tr>`;
    })
    .join("");

  container.innerHTML = `
    <table class="table-like">
      <thead>
        <tr>
          <th>Date</th>
          <th>Test</th>
          <th>Côté</th>
          <th>Valeur</th>
          <th>Ratio</th>
          <th>Zone</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  container.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-test-id");
      renderTestDetailAdvanced(joueur, id, detailContainerId);
    });
  });
}

// ================== DETAIL TEST AVANCE (ASYM, GROUPE, GOLD) ==================

function renderTestDetailAdvanced(joueur, testId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const test = testsPhysiques.find((t) => t.id === testId);
  if (!test) {
    container.innerHTML = "";
    return;
  }

  // même type pour l'historique
  const sameTypeAll = testsPhysiques
    .filter((t) => t.joueurId === joueur.id && t.type === test.type)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  // même type + côté pour tendance
  const sameSide = sameTypeAll.filter((t) => t.cote === test.cote || test.cote === "-");

  // asy D/G si applicable
  const sameDate = sameTypeAll.filter((t) => t.date === test.date);
  let droite = null;
  let gauche = null;
  sameDate.forEach((t) => {
    if (t.cote === "Droit") droite = t;
    if (t.cote === "Gauche") gauche = t;
  });

  let asymHtml = "";
  if (droite && gauche) {
    const diff =
      (Math.abs(droite.valeur - gauche.valeur) / Math.max(droite.valeur, gauche.valeur)) * 100;
    let cls = "asym-green";
    if (diff > 15) cls = "asym-red";
    else if (diff > 10) cls = "asym-orange";
    asymHtml = `<span class="${cls}">Asymétrie D/G : ${diff.toFixed(1)}%</span>`;
  }

  // comparaison groupe (tous joueurs)
  const peers = testsPhysiques.filter(
    (t) => t.type === test.type && t.segment === test.segment && t.cote === test.cote
  );
  let groupHtml = "";
  if (peers.length) {
    const meanRatio = peers.reduce((acc, t) => acc + (t.ratio || 0), 0) / peers.length;
    const ratio = test.ratio || 0;
    const lowerBetter = isLowerBetter(test.type);
    let deltaPercent = ((ratio - meanRatio) / meanRatio) * 100;
    if (lowerBetter) deltaPercent *= -1; // si plus bas = mieux, on inverse
    let cls = "asym-green";
    if (deltaPercent < -5) cls = "asym-red";
    else if (Math.abs(deltaPercent) <= 5) cls = "asym-orange";
    groupHtml = `<span class="${cls}">Par rapport au groupe : ${deltaPercent >= 0 ? "+" : ""}${deltaPercent.toFixed(
      1
    )}%</span>`;
  }

  // Gold : meilleure perf du groupe
  let goldHtml = "";
  if (peers.length) {
    const lowerBetter = isLowerBetter(test.type);
    let best = peers[0];
    peers.forEach((p) => {
      if (!lowerBetter) {
        if (p.ratio > best.ratio) best = p;
      } else {
        if (p.ratio < best.ratio) best = p;
      }
    });
    if (best.id === test.id) {
      goldHtml = `<span class="badge-gold">Top équipe</span>`;
    }
  }

  // tendance sur le ratio
  let trendHtml = "";
  if (sameSide.length > 1) {
    const idx = sameSide.findIndex((t) => t.id === test.id);
    if (idx > 0) {
      const prev = sameSide[idx - 1];
      const current = test.ratio;
      const previous = prev.ratio;
      const lowerBetter = isLowerBetter(test.type);
      let trendClass = "trend-neutral";
      let trendIcon = "→";
      let text = "Stable";

      if (!lowerBetter) {
        if (current > previous) {
          trendClass = "trend-up";
          trendIcon = "↑";
          text = "En amélioration";
        } else if (current < previous) {
          trendClass = "trend-down";
          trendIcon = "↓";
          text = "En baisse";
        }
      } else {
        if (current < previous) {
          trendClass = "trend-up";
          trendIcon = "↑";
          text = "En amélioration";
        } else if (current > previous) {
          trendClass = "trend-down";
          trendIcon = "↓";
          text = "En baisse";
        }
      }

      trendHtml = `<span class="${trendClass}">${trendIcon} ${text}</span>`;
    }
  }

  // ratio poids de corps
  let bwHtml = "";
  const joueurData = joueurs.find((j) => j.id === joueur.id);
  if (joueurData && ["N", "kg"].includes(test.unite)) {
    const bwRatio = joueurData.poids ? test.valeur / joueurData.poids : null;
    if (bwRatio != null) {
      bwHtml = `<div class="info-label">Ratio / poids de corps</div>
        <div class="info-value">${bwRatio.toFixed(2)} x BW</div>`;
    }
  }

  const canvasId = `test-advanced-canvas-${joueur.id}`;
  container.innerHTML = `
    <div class="test-detail-header">
      <div>
        <div class="test-detail-title">${test.type} · ${test.segment}</div>
        <div class="test-detail-sub">Date : ${test.date} · Côté : ${test.cote || "-"}</div>
      </div>
      <div class="test-detail-sub">
        Ratio : ${test.ratio ?? "-"} ${trendHtml} ${goldHtml}
      </div>
    </div>
    <div class="test-detail-grid">
      <div class="info-card">
        <div class="info-label">Valeur actuelle</div>
        <div class="info-value">${test.valeur} ${test.unite}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Référence</div>
        <div class="info-value">${test.ref ?? "-"} ${test.unite}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Zone</div>
        <div class="info-value"><span class="${getZoneClass(test.zone)}"></span> ${test.zone || "-"}</div>
      </div>
      <div class="info-card">
        ${bwHtml || "<div class='info-label'>Ratio / poids de corps</div><div class='info-value'>-</div>"}
      </div>
    </div>
    <div class="test-badge-row">
      ${asymHtml}
      ${groupHtml}
    </div>
    <div class="functional-canvas-wrapper" style="margin-top:8px;">
      <canvas id="${canvasId}" width="420" height="130"></canvas>
    </div>
  `;

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (sameTypeAll.length <= 1) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px system-ui";
    ctx.fillText("Pas assez de mesures pour une courbe d'évolution.", 10, 20);
    return;
  }

  drawSimpleLineChart(
    canvas,
    sameTypeAll.map((t) => ({ date: t.date, value: t.ratio })),
    `${test.type} (ratio)`
  );
}

// ================== REEDUCATION (Joueurs blessés uniquement) ==================

function renderBlessureSection(detail, joueur) {
  const blessureSection = document.createElement("div");
  blessureSection.className = "section-card open";

  const blessureList = blessures
    .filter((b) => b.joueurId === joueur.id)
    .sort((a, b) => (a.dateBlessure > b.dateBlessure ? -1 : 1));

  if (blessureList.length === 0) {
    blessureSection.innerHTML = `
      <div class="section-header">
        <div class="section-header-left">
          <div class="section-title-main">Rééducation</div>
          <div class="section-title-sub">Aucune blessure en cours</div>
        </div>
        <div class="section-toggle-icon">▶</div>
      </div>
      <div class="section-summary">
        <div class="section-content">Aucune blessure active pour ce joueur.</div>
      </div>
    `;
    detail.appendChild(blessureSection);
    return;
  }

  const blessure = blessureList[0];
  const phaseClass = getPhaseClass(blessure.phase);
  const today = new Date();
  const d0 = new Date(blessure.dateBlessure);
  const dRtt = blessure.rttEstimee ? new Date(blessure.rttEstimee) : null;
  let progress = 0;
  if (dRtt && dRtt > d0) {
    const total = dRtt - d0;
    const done = Math.min(Math.max(today - d0, 0), total);
    progress = Math.round((done / total) * 100);
  }

  const blessureId = blessure.id;
  const historyId = `rehab-history-${joueur.id}`;

  blessureSection.innerHTML = `
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-title-main">Rééducation</div>
        <div class="section-title-sub">${blessure.diagnostic} · cliquez pour voir le calendrier</div>
      </div>
      <div class="section-toggle-icon">▶</div>
    </div>
    <div class="section-summary">
      <div class="two-columns">
        <div class="info-card">
          <div class="info-label">Pathologie</div>
          <div class="info-value">${blessure.diagnostic}</div>
          <div class="info-label" style="margin-top:4px;">Localisation</div>
          <div class="info-value">${blessure.localisation}</div>
        </div>
        <div class="info-card">
          <div class="info-label">Dates clés</div>
          <div class="info-value">
            Début : ${blessure.dateBlessure}<br/>
            RTT estimée : ${blessure.rttEstimee || "-"}<br/>
            RTP estimée : ${blessure.rtpEstimee || "-"}
          </div>
          <div class="info-label" style="margin-top:4px;">Phase</div>
          <div class="info-value"><span class="${phaseClass}">${blessure.phase}</span></div>
        </div>
      </div>
      <div class="progress-container">
        <div class="info-label">Progression vers RTT</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${progress}%;"></div>
          <div class="progress-marks">
            <span class="progress-mark"></span>
            <span class="progress-mark"></span>
            <span class="progress-mark"></span>
            <span class="progress-mark"></span>
          </div>
        </div>
        <div class="progress-text">${progress}% du protocole réalisé (objectif RTT = 100%)</div>
      </div>
    </div>
    <div class="section-body">
      <button type="button" class="subtoggle" data-target="${historyId}">Voir le calendrier détaillé</button>
      <div id="${historyId}" class="section-body-details">
        ${renderRehabCalendarHtml(blessure)}
        ${renderRehabSessionsHtml(blessure)}
      </div>
    </div>
  `;
  detail.appendChild(blessureSection);
}

function renderRehabCalendarHtml(blessure) {
  const protocoleWeeks = blessure.protocole
    ? Object.entries(blessure.protocole).map(([key, text]) => ({ key, text }))
    : [];
  if (!protocoleWeeks.length) {
    return `<div class="section-content">Protocole détaillé non renseigné.</div>`;
  }

  const start = new Date(blessure.dateBlessure);
  const formatter = new Intl.DateTimeFormat("fr-FR");
  const weeksHtml = protocoleWeeks
    .map((w, idx) => {
      const s = new Date(start);
      s.setDate(s.getDate() + idx * 7);
      const e = new Date(s);
      e.setDate(e.getDate() + 6);
      return `
        <div class="calendar-week">
          <div class="calendar-week-title">Semaine ${idx + 1} (${formatter.format(s)} - ${formatter.format(
        e
      )})</div>
          <div class="calendar-week-content">${w.text}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="rehab-agenda">
      <div class="rehab-agenda-header">
        <div class="rehab-week-label">Calendrier de rééducation</div>
      </div>
      <div class="rehab-agenda-days">
        ${weeksHtml}
      </div>
    </div>
  `;
}

function renderRehabSessionsHtml(blessure) {
  const seancesBlessure = seances.filter((s) => s.blessureId === blessure.id);
  if (!seancesBlessure.length) {
    return `<div class="info-card" style="margin-top:8px;">
      <div class="info-label">Séances de rééducation</div>
      <div class="section-content">Aucune séance renseignée pour le moment.</div>
    </div>`;
  }
  const rows = seancesBlessure
    .map(
      (s) => `
      <tr>
        <td>${s.date}</td>
        <td>${s.type}</td>
        <td>${s.resume}</td>
        <td>${s.rpe}</td>
        <td>${s.tolerance}</td>
      </tr>`
    )
    .join("");
  return `
    <div class="info-card" style="margin-top:8px;">
      <div class="info-label">Séances de rééducation</div>
      <table class="table-like" style="margin-top:4px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Contenu</th>
            <th>RPE</th>
            <th>Tolérance</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ================== INIT ==================

function init() {
  renderStats();
  renderPlayersList();

  const select = document.getElementById("filterSelect");
  select.addEventListener("change", () => {
    renderPlayersList();
    const detail = document.getElementById("playerDetail");
    detail.innerHTML = `
      <div class="empty-welcome">
        <img src="Image/SFP.png" class="empty-logo" alt="Logo Stade Français">
        <h2 class="empty-title">U21 Stade Français Paris</h2>
        <p class="empty-subtitle">Centre de suivi – Performance &amp; Médecine</p>
        <p class="empty-hint">Sélectionne un joueur dans la liste pour commencer.</p>
      </div>
    `;
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value || "";
      renderPlayersList();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
