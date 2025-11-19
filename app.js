// app.js
// Version refondue "staff pro" – même style SFP, structure plus claire, bulles + modale d'historique.

/* ===========================
ETAT GLOBAL
=========================== */

let currentPlayerId = null;
let searchTerm = "";
let currentFilter = "all";

// Modal global (historique graphique + tableau)
let historyModalEl = null;
let historyModalTitleEl = null;
let historyModalCanvas = null;
let historyModalTableBody = null;

/* ===========================
DONNÉES JOUEURS
(reprend ta base + tu peux enrichir)
=========================== */

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
];

/* ===========================
TESTS PHYSIQUES
(reprend ce que tu avais + logique par segments)
=========================== */

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

// BLUM (J002)
{ id: "T101", joueurId: "J002", date: "2025-11-05", type: "CMJ", segment: "Hanche", cote: "-", valeur: 31, unite: "cm", ref: 40, ratio: 0.78, zone: "Rouge" },
{ id: "T102", joueurId: "J002", date: "2025-11-05", type: "NordBoard", segment: "Ischio", cote: "Droit", valeur: 245, unite: "N", ref: 320, ratio: 0.77, zone: "Rouge" },
{ id: "T103", joueurId: "J002", date: "2025-11-05", type: "NordBoard", segment: "Ischio", cote: "Gauche", valeur: 305, unite: "N", ref: 320, ratio: 0.95, zone: "Vert" },
{ id: "T104", joueurId: "J002", date: "2025-11-04", type: "McCall", segment: "Ischio", cote: "Droit", valeur: 2, unite: "/5", ref: 5, ratio: 0.4, zone: "Rouge" },
{ id: "T105", joueurId: "J002", date: "2025-11-03", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 11, unite: "cm", ref: 10, ratio: 1.1, zone: "Vert" },
{ id: "T106", joueurId: "J002", date: "2025-11-03", type: "Single Hop", segment: "Genou", cote: "Droit", valeur: 180, unite: "cm", ref: 190, ratio: 0.95, zone: "Orange" },
{ id: "T107", joueurId: "J002", date: "2025-11-03", type: "Single Hop", segment: "Genou", cote: "Gauche", valeur: 192, unite: "cm", ref: 190, ratio: 1.01, zone: "Vert" },

// BOTHA (J003)
{ id: "T201", joueurId: "J003", date: "2025-11-08", type: "CMJ", segment: "Hanche", cote: "-", valeur: 29, unite: "cm", ref: 32, ratio: 0.9, zone: "Orange" },
{ id: "T202", joueurId: "J003", date: "2025-11-08", type: "Isocinétique quadriceps", segment: "Genou", cote: "Droit", valeur: 165, unite: "%BW", ref: 180, ratio: 0.92, zone: "Orange" },
{ id: "T203", joueurId: "J003", date: "2025-11-08", type: "Isocinétique quadriceps", segment: "Genou", cote: "Gauche", valeur: 150, unite: "%BW", ref: 180, ratio: 0.83, zone: "Rouge" },
{ id: "T204", joueurId: "J003", date: "2025-11-07", type: "McCall", segment: "Ischio", cote: "Gauche", valeur: 3, unite: "/5", ref: 5, ratio: 0.6, zone: "Rouge" },
{ id: "T205", joueurId: "J003", date: "2025-11-07", type: "ASH test", segment: "Épaule", cote: "-", valeur: 38, unite: "N/kg", ref: 40, ratio: 0.95, zone: "Vert" },

// GARCIA (J004)
{ id: "T301", joueurId: "J004", date: "2025-11-09", type: "CMJ", segment: "Hanche", cote: "-", valeur: 40, unite: "cm", ref: 40, ratio: 1.0, zone: "Vert" },
{ id: "T302", joueurId: "J004", date: "2025-11-09", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.15, unite: "s", ref: 4.2, ratio: 1.01, zone: "Vert" },
{ id: "T303", joueurId: "J004", date: "2025-11-08", type: "KTW", segment: "Cheville", cote: "Droit", valeur: 9, unite: "cm", ref: 10, ratio: 0.9, zone: "Orange" },
{ id: "T304", joueurId: "J004", date: "2025-11-08", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 10, unite: "cm", ref: 10, ratio: 1.0, zone: "Vert" },
{ id: "T305", joueurId: "J004", date: "2025-11-08", type: "Triple Hop", segment: "Genou", cote: "Droit", valeur: 570, unite: "cm", ref: 550, ratio: 1.04, zone: "Vert" },
{ id: "T306", joueurId: "J004", date: "2025-11-08", type: "Triple Hop", segment: "Genou", cote: "Gauche", valeur: 555, unite: "cm", ref: 550, ratio: 1.01, zone: "Vert" },

// KOFFI (J005)
{ id: "T401", joueurId: "J005", date: "2025-11-06", type: "KTW", segment: "Cheville", cote: "Gauche", valeur: 8, unite: "cm", ref: 10, ratio: 0.8, zone: "Rouge" },
{ id: "T402", joueurId: "J005", date: "2025-11-06", type: "KTW", segment: "Cheville", cote: "Droit", valeur: 10, unite: "cm", ref: 10, ratio: 1.0, zone: "Vert" },
{ id: "T403", joueurId: "J005", date: "2025-11-06", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.4, unite: "s", ref: 4.3, ratio: 0.98, zone: "Orange" },

// NENE (J006)
{ id: "T501", joueurId: "J006", date: "2025-11-10", type: "Cognition réaction", segment: "Tête", cote: "-", valeur: 310, unite: "ms", ref: 300, ratio: 0.97, zone: "Orange" },
{ id: "T502", joueurId: "J006", date: "2025-11-07", type: "Cognition réaction", segment: "Tête", cote: "-", valeur: 340, unite: "ms", ref: 300, ratio: 0.88, zone: "Rouge" },
{ id: "T503", joueurId: "J006", date: "2025-11-09", type: "Isométrie rachis cervical", segment: "Rachis cervical", cote: "-", valeur: 235, unite: "N", ref: 250, ratio: 0.94, zone: "Orange" },

// RUSSEL (J007)
{ id: "T601", joueurId: "J007", date: "2025-11-09", type: "NordBoard", segment: "Ischio", cote: "Droit", valeur: 310, unite: "N", ref: 320, ratio: 0.97, zone: "Vert" },
{ id: "T602", joueurId: "J007", date: "2025-11-09", type: "NordBoard", segment: "Ischio", cote: "Gauche", valeur: 275, unite: "N", ref: 320, ratio: 0.86, zone: "Orange" },
{ id: "T603", joueurId: "J007", date: "2025-11-08", type: "Sprint 30m", segment: "Course", cote: "-", valeur: 4.28, unite: "s", ref: 4.2, ratio: 0.98, zone: "Orange" },

// TABUAKOTO (J008)
{ id: "T701", joueurId: "J008", date: "2025-11-07", type: "Extension lombaire iso", segment: "Lombaire", cote: "-", valeur: 430, unite: "N", ref: 400, ratio: 1.08, zone: "Vert" },
{ id: "T702", joueurId: "J008", date: "2025-11-07", type: "Isocinétique quadriceps", segment: "Genou", cote: "Droit", valeur: 190, unite: "%BW", ref: 180, ratio: 1.06, zone: "Vert" },
{ id: "T703", joueurId: "J008", date: "2025-11-07", type: "Isocinétique quadriceps", segment: "Genou", cote: "Gauche", valeur: 182, unite: "%BW", ref: 180, ratio: 1.01, zone: "Vert" },
];

/* ===========================
TESTS FONCTIONNELS GLOBAUX
=========================== */

const testsFonctionnels = [
{ joueurId: "J001", dc1rm: 110, tirage1rm: 95, tractions: 10, grip: 52, squat1rm: 150, imtp: 2800, f1080: 8.5, vmax: 9.1 },
{ joueurId: "J002", dc1rm: 95, tirage1rm: 85, tractions: 8, grip: 50, squat1rm: 140, imtp: 2600, f1080: 8.0, vmax: 9.0 },
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

/* ===========================
BLESSURES & REEDUC
=========================== */

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
},
{
id: "B004",
joueurId: "J007",
dateBlessure: "2025-10-30",
diagnostic: "Lésion ischio ST G grade 1",
localisation: "Ischio G",
segment: "Ischio",
phase: "Adapté / Reprise",
rttEstimee: "2025-11-12",
rttEffective: "",
rtpEstimee: "2025-11-19",
rtpEffective: "",
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
},
];

const seances = [
{ id: "S001", blessureId: "B001", joueurId: "J002", date: "2025-11-01", type: "Physio", resume: "Renfo ischio excentrique", rpe: 5, tolerance: "OK" },
{ id: "S002", blessureId: "B001", joueurId: "J002", date: "2025-11-04", type: "PPG / Prépa", resume: "CMJ + accélérations 60%", rpe: 6, tolerance: "Légère gêne" },
{ id: "S003", blessureId: "B002", joueurId: "J003", date: "2025-11-03", type: "Physio", resume: "Stabilité scapulaire + isométrie", rpe: 4, tolerance: "OK" },
{ id: "S004", blessureId: "B003", joueurId: "J005", date: "2025-11-05", type: "Physio", resume: "Proprioception cheville + KTW", rpe: 4, tolerance: "OK" },
];

/* ===========================
GPS
=========================== */

const gpsData = [
{ id: "G001", joueurId: "J001", date: "2025-11-02", match: true, totalDistance: 6500, hsr: 600, sprint: 90, vmax: 9.0 },
{ id: "G002", joueurId: "J001", date: "2025-11-06", match: false, totalDistance: 7200, hsr: 800, sprint: 120, vmax: 9.4 },
{ id: "G003", joueurId: "J002", date: "2025-10-28", match: true, totalDistance: 5800, hsr: 550, sprint: 80, vmax: 8.9 },
{ id: "G004", joueurId: "J003", date: "2025-11-05", match: false, totalDistance: 4000, hsr: 200, sprint: 30, vmax: 8.1 },
{ id: "G005", joueurId: "J007", date: "2025-11-08", match: true, totalDistance: 6900, hsr: 780, sprint: 105, vmax: 9.3 },
{ id: "G006", joueurId: "J008", date: "2025-11-02", match: true, totalDistance: 7200, hsr: 820, sprint: 110, vmax: 9.1 },
];

/* ===========================
UTILITAIRES GÉNÉRAUX
=========================== */

function getInitials(joueur) {
return `${(joueur.prenom?.[0] || "").toUpperCase()}${(joueur.nom?.[0] || "").toUpperCase()}`;
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

/* ===========================
HEADER STATS GLOBAL
=========================== */

function renderStats() {
const dispoCount = joueurs.filter((j) => j.disponibilite === "Disponible").length;
const injuryCount = joueurs.filter((j) => j.disponibilite !== "Disponible").length;

const dispoSpan = document.getElementById("stat-disponibles");
const injSpan = document.getElementById("stat-infirmerie");

if (dispoSpan) dispoSpan.textContent = dispoCount;
if (injSpan) injSpan.textContent = injuryCount;
}

/* ===========================
LISTE JOUEURS + FILTRES
=========================== */

function renderPlayersList() {
const container = document.getElementById("playersList");
if (!container) return;

let list = [...joueurs];

// filtre dispo
if (currentFilter === "available") {
list = list.filter((j) => j.disponibilite === "Disponible");
} else if (currentFilter === "injury") {
list = list.filter((j) => j.disponibilite !== "Disponible");
}

// recherche texte
if (searchTerm.trim() !== "") {
const q = searchTerm.toLowerCase();
list = list.filter((j) => {
const fullName = `${j.prenom} ${j.nom}`.toLowerCase();
const poste = `poste ${j.poste}`.toLowerCase();
const ligne = (j.ligne || "").toLowerCase();
return (
fullName.includes(q) ||
poste.includes(q) ||
ligne.includes(q)
);
});
}

container.innerHTML = "";

if (!list.length) {
container.innerHTML = `<p style="font-size:0.8rem;color:#cbd5f5;">Aucun joueur ne correspond à ce filtre.</p>`;
return;
}

list.forEach((j) => {
const card = document.createElement("div");
card.className = "player-card";
if (j.id === currentPlayerId) card.classList.add("active");

card.addEventListener("click", () => {
currentPlayerId = j.id;
renderPlayersList();
renderPlayerDetail(j.id);
});

const avatar = createAvatar(j, "player-avatar");

const main = document.createElement("div");
main.style.flex = "1";

const nameEl = document.createElement("div");
nameEl.className = "player-name";
nameEl.textContent = `${j.prenom} ${j.nom}`;

const subEl = document.createElement("div");
subEl.className = "player-sub";
subEl.textContent = `Poste ${j.poste} • ${j.ligne}`;

main.appendChild(nameEl);
main.appendChild(subEl);

const badge = document.createElement("span");
badge.className = getStatusBadgeClass(j.statut);
badge.textContent = j.statut;

card.appendChild(avatar);
card.appendChild(main);
card.appendChild(badge);

container.appendChild(card);
});
}
/* ===========================
TENDANCES & PETITS UTILITAIRES VISUELS
=========================== */

function buildPerfTrendIcon(current, previous, higherIsBetter = true) {
if (current == null || previous == null) return "";
let icon = "→";
let cls = "trend-neutral";

if (higherIsBetter) {
if (current > previous) {
icon = "↑";
cls = "trend-up";
} else if (current < previous) {
icon = "↓";
cls = "trend-down";
}
} else {
// plus bas = mieux (sprint)
if (current < previous) {
icon = "↑";
cls = "trend-up";
} else if (current > previous) {
icon = "↓";
cls = "trend-down";
}
}

return `<span class="${cls}">${icon}</span>`;
}

function isLowerBetter(type) {
const t = (type || "").toLowerCase();
return t.includes("sprint") || t.includes("10m") || t.includes("30m");
}

/* ===========================
MODALE HISTORIQUE GLOBALE
=========================== */

function createHistoryModal() {
const modal = document.createElement("div");
modal.className = "modal hidden";
modal.id = "historyModal";

modal.innerHTML = `
<div class="modal-backdrop"></div>
<div class="modal-content">
<div class="modal-header">
<div>
<div id="historyModalTitle" class="section-detail-title">Historique</div>
<div id="historyModalSub" class="section-detail-sub"></div>
</div>
<button type="button" class="modal-close" aria-label="Fermer">&times;</button>
</div>
<div class="section-detail-body" style="grid-template-columns: minmax(0,1.2fr) minmax(0,1fr);">
<div class="section-detail-chart">
<canvas id="historyModalCanvas" width="460" height="180"></canvas>
</div>
<div class="section-detail-table">
<table class="modal-table">
<thead>
<tr id="historyModalHeadRow"></tr>
</thead>
<tbody id="historyModalBody"></tbody>
</table>
</div>
</div>
</div>
`;

document.body.appendChild(modal);

historyModalEl = modal;
historyModalTitleEl = modal.querySelector("#historyModalTitle");
historyModalCanvas = modal.querySelector("#historyModalCanvas");
historyModalTableBody = modal.querySelector("#historyModalBody");

const headRow = modal.querySelector("#historyModalHeadRow");

// petite fonction pour ajuster les têtes de colonnes à la volée
historyModalEl.setHeadColumns = (cols) => {
headRow.innerHTML = "";
cols.forEach((label) => {
const th = document.createElement("th");
th.textContent = label;
headRow.appendChild(th);
});
};

modal.querySelector(".modal-close").addEventListener("click", closeHistoryModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeHistoryModal);
}

function closeHistoryModal() {
if (!historyModalEl) return;
historyModalEl.classList.add("hidden");
}

/**
* Ouvre la modale avec :
* - title: titre principal
* - sub: sous-titre
* - series: [{ label: '2025-11-01', value: 40 }, ...]
* - tableColumns: ['Date','Valeur'] (2 ou 3 colonnes typiquement)
* - tableRows: array de arrays [['2025-11-01','40 cm'], ...]
*/
function openHistoryModal({ title, sub, series, tableColumns, tableRows }) {
if (!historyModalEl) createHistoryModal();

historyModalTitleEl.textContent = title;
const subEl = historyModalEl.querySelector("#historyModalSub");
subEl.textContent = sub || "";

// Table
historyModalEl.setHeadColumns(tableColumns || []);
historyModalTableBody.innerHTML = "";
(tableRows || []).forEach((row) => {
const tr = document.createElement("tr");
row.forEach((cell) => {
const td = document.createElement("td");
td.textContent = cell;
tr.appendChild(td);
});
historyModalTableBody.appendChild(tr);
});

// Graph
if (historyModalCanvas) {
drawSimpleLineChart(historyModalCanvas, series || [], title);
}

historyModalEl.classList.remove("hidden");
}

/* ===========================
COURBE SIMPLE (line chart canvas)
=========================== */

function drawSimpleLineChart(canvas, series, label) {
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

if (!series || !series.length) {
ctx.fillStyle = "#6b7280";
ctx.font = "11px system-ui";
ctx.fillText("Pas assez de données pour afficher la courbe.", 18, 30);
return;
}

const padding = 28;
const w = canvas.width - padding * 2;
const h = canvas.height - padding * 2;

const values = series.map((s) => s.value).filter((v) => v != null);
const minV = Math.min(...values);
const maxV = Math.max(...values);

// grille simple
ctx.strokeStyle = "#e5e7eb";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(padding, padding);
ctx.lineTo(padding, padding + h);
ctx.lineTo(padding + w, padding + h);
ctx.stroke();

// courbe
ctx.strokeStyle = "#ff2e9a";
ctx.lineWidth = 2;
ctx.beginPath();

series.forEach((pt, idx) => {
if (pt.value == null) return;
const x = padding + (w * idx) / Math.max(series.length - 1, 1);
const norm = (pt.value - minV) / (maxV - minV || 1);
const y = padding + h - norm * h;

if (idx === 0) ctx.moveTo(x, y);
else ctx.lineTo(x, y);
});

ctx.stroke();

// points
ctx.fillStyle = "#ff2e9a";
series.forEach((pt, idx) => {
if (pt.value == null) return;
const x = padding + (w * idx) / Math.max(series.length - 1, 1);
const norm = (pt.value - minV) / (maxV - minV || 1);
const y = padding + h - norm * h;
ctx.beginPath();
ctx.arc(x, y, 3, 0, Math.PI * 2);
ctx.fill();
});

ctx.fillStyle = "#6b7280";
ctx.font = "11px system-ui";
ctx.fillText(label || "", padding, padding - 8);
}

/* ===========================
FICHE JOUEUR — CONTAINER GLOBAL
=========================== */

function renderPlayerDetail(joueurId) {
const joueur = joueurs.find((j) => j.id === joueurId);
const container = document.getElementById("playerDetail");
if (!container || !joueur) return;

container.classList.remove("empty-state");
container.innerHTML = "";

// HEADER STYLE FIFA
const header = document.createElement("div");
header.className = "player-header-card";

const avatar = createAvatar(joueur, "ph-avatar");

const main = document.createElement("div");
main.className = "ph-main";

const name = document.createElement("div");
name.className = "ph-name";
name.textContent = `${joueur.prenom} ${joueur.nom}`;

const meta = document.createElement("div");
meta.className = "ph-meta";
meta.textContent = joueur.dateNaissance
? `Né le ${joueur.dateNaissance}`
: "";

const sub = document.createElement("div");
sub.className = "ph-sub";
sub.textContent = `Poste ${joueur.poste} • ${joueur.ligne}`;

const tagWrap = document.createElement("div");
tagWrap.className = "ph-tags";

const tag1 = document.createElement("span");
tag1.className = "ph-tag";
tag1.textContent = joueur.statut;

const tag2 = document.createElement("span");
tag2.className = "ph-tag";
tag2.textContent = `Minutes jouées : ${joueur.minutesJouees ?? "-"}`;

tagWrap.appendChild(tag1);
tagWrap.appendChild(tag2);

main.appendChild(name);
main.appendChild(meta);
main.appendChild(sub);
main.appendChild(tagWrap);

const scoreBlock = document.createElement("div");
scoreBlock.className = "ph-score";

const scoreVal = document.createElement("div");
scoreVal.className = "ph-score-value";
scoreVal.textContent = joueur.scoreGlobal ?? "-";

const scoreLabel = document.createElement("div");
scoreLabel.className = "ph-score-label";
scoreLabel.textContent = "Indice global";

scoreBlock.appendChild(scoreVal);
scoreBlock.appendChild(scoreLabel);

header.appendChild(avatar);
header.appendChild(main);
header.appendChild(scoreBlock);

container.appendChild(header);

// ====== SECTIONS ======

renderSectionProfilPhysique(container, joueur);
renderSectionGPS(container, joueur); // sera défini dans le bloc suivant
renderSectionBlessures(container, joueur); // idem
renderSectionFonctionnel(container, joueur); // idem
renderSectionAnatomie(container, joueur); // idem

if (joueur.statut !== "Disponible") {
renderSectionReeduc(container, joueur); // idem
}
}

/* ===========================
PROFIL PHYSIQUE — BULLE + MODALE
=========================== */

// petit historique synthétique taille / poids / MG (exemple)
function getMorphoHistory(joueur) {
const baseDate = new Date(joueur.dernierTest || "2025-11-01");
const offsets = [-90, -60, -30, 0];

return offsets.map((d, idx) => {
const dt = new Date(baseDate);
dt.setDate(dt.getDate() + d);
const dateStr = dt.toISOString().slice(0, 10);

// on reconstruit un petit trend artificiel pour visuel
const poidsBase = joueur.poids ?? 80;
const mgBase = joueur.masseGrasse ?? 10;

return {
date: dateStr,
taille: joueur.taille ?? null,
poids: +(poidsBase - (3 - idx) * 0.3).toFixed(1),
masseGrasse: +(mgBase + (3 - idx) * 0.2).toFixed(1),
};
});
}

function renderSectionProfilPhysique(root, joueur) {
const section = document.createElement("div");
section.className = "section-block";

const history = getMorphoHistory(joueur);
const current = history[history.length - 1] || {};
const previous = history[history.length - 2] || {};

section.innerHTML = `
<div class="section-title">Profil physique</div>
<div class="section-sub">Taille, poids, % masse grasse</div>

<div class="two-col-grid" style="margin-bottom:10px;">
<div class="info-card">
<div class="info-label">Taille</div>
<div class="info-value">${current.taille ?? "-"} cm</div>
</div>
<div class="info-card">
<div class="info-label">Poids</div>
<div class="info-value">
${current.poids ?? "-"} kg
</div>
</div>
<div class="info-card">
<div class="info-label">% Masse grasse (estimée)</div>
<div class="info-value">
${current.masseGrasse ?? "-"} %
</div>
</div>
</div>

<div class="performance-bubbles">
<button type="button" class="bubble-pill" id="bubble-morpho-${joueur.id}">
<span class="bubble-main-value">
${current.poids ?? "-"} kg
</span>
<span class="bubble-label">
Historique poids / %MG
</span>
</button>
</div>
`;

root.appendChild(section);

// CLIC BULLE → MODALE HISTORIQUE
const bubble = section.querySelector(`#bubble-morpho-${joueur.id}`);
if (bubble) {
bubble.addEventListener("click", () => {
const weightSeries = history.map((h) => ({
label: h.date,
value: h.poids,
}));

const tableRows = history.map((h) => [
h.date,
h.taille != null ? `${h.taille} cm` : "-",
h.poids != null ? `${h.poids} kg` : "-",
h.masseGrasse != null ? `${h.masseGrasse} %` : "-",
]);

openHistoryModal({
title: `Profil physique – ${joueur.prenom} ${joueur.nom}`,
sub: "Evolution du poids et de la composition corporelle",
series: weightSeries,
tableColumns: ["Date", "Taille", "Poids", "% Masse grasse"],
tableRows,
});
});
}
}
/* ===========================
SECTION GPS — BULLES + MODALE
=========================== */

function renderSectionGPS(root, joueur) {
const section = document.createElement("div");
section.className = "section-block";

const data = gpsData
.filter((g) => g.joueurId === joueur.id)
.sort((a, b) => (a.date > b.date ? 1 : -1));

section.innerHTML = `
<div class="section-title">Performance GPS</div>
<div class="section-sub">${
data.length
? `Dernière séance : ${data[data.length - 1].date}`
: "Aucune donnée GPS enregistrée"
}</div>
`;

if (!data.length) {
const p = document.createElement("p");
p.className = "section-content";
p.textContent = "Pas de données GPS disponibles pour ce joueur.";
section.appendChild(p);
root.appendChild(section);
return;
}

const last = data[data.length - 1];
const prev = data.length > 1 ? data[data.length - 2] : null;

const bubbles = document.createElement("div");
bubbles.className = "performance-bubbles";

const metrics = [
{
key: "distance",
label: "Distance totale",
value: `${last.totalDistance} m`,
raw: last.totalDistance,
prev: prev ? prev.totalDistance : null,
higherIsBetter: true,
unit: "m",
extractor: (d) => d.totalDistance,
title: "Distance totale (m)",
},
{
key: "hsr",
label: "HSR",
value: `${last.hsr} m`,
raw: last.hsr,
prev: prev ? prev.hsr : null,
higherIsBetter: true,
unit: "m",
extractor: (d) => d.hsr,
title: "HSR (m)",
},
{
key: "sprint",
label: "Sprint",
value: `${last.sprint} m`,
raw: last.sprint,
prev: prev ? prev.sprint : null,
higherIsBetter: true,
unit: "m",
extractor: (d) => d.sprint,
title: "Distance sprint (m)",
},
{
key: "vmax",
label: "Vitesse max",
value: last.vmax != null ? `${last.vmax} m/s` : "-",
raw: last.vmax,
prev: prev ? prev.vmax : null,
higherIsBetter: true,
unit: "m/s",
extractor: (d) => d.vmax,
title: "Vitesse maximale (m/s)",
},
];

metrics.forEach((m) => {
const btn = document.createElement("button");
btn.type = "button";
btn.className = "bubble-pill";

const trendHtml =
m.prev != null && m.raw != null
? buildPerfTrendIcon(m.raw, m.prev, m.higherIsBetter)
: "";

btn.innerHTML = `
<span class="bubble-main-value">
${m.value} ${trendHtml}
</span>
<span class="bubble-label">${m.label}</span>
`;

btn.addEventListener("click", () => {
const series = data
.map((d) => ({
label: d.date,
value: m.extractor(d),
}))
.filter((s) => s.value != null);

const tableRows = data.map((d) => [
d.date,
m.extractor(d) != null ? `${m.extractor(d)} ${m.unit}` : "-",
d.match ? "Match" : "Entraînement",
]);

openHistoryModal({
title: `GPS – ${m.title}`,
sub: `${joueur.prenom} ${joueur.nom}`,
series,
tableColumns: ["Date", m.title, "Contexte"],
tableRows,
});
});

bubbles.appendChild(btn);
});

section.appendChild(bubbles);
root.appendChild(section);
}

/* ===========================
SECTION ANTECEDENTS BLESSURES
=========================== */

function daysBetween(d1, d2) {
const a = new Date(d1);
const b = new Date(d2);
const diff = (b - a) / (1000 * 60 * 60 * 24);
return Math.max(Math.round(diff), 0);
}

function renderSectionBlessures(root, joueur) {
const section = document.createElement("div");
section.className = "section-block";

const list = blessures
.filter((b) => b.joueurId === joueur.id)
.sort((a, b) => (a.dateBlessure > b.dateBlessure ? 1 : -1));

section.innerHTML = `
<div class="section-title">Antécédents de blessures</div>
<div class="section-sub">${
list.length
? `Dernière blessure : ${list[list.length - 1].diagnostic} (${list[list.length - 1].dateBlessure})`
: "Aucune blessure enregistrée dans le système"
}</div>
`;

if (!list.length) {
const p = document.createElement("p");
p.className = "section-content";
const commotion = (joueur.antecedents || "").toLowerCase().includes("commotion");
p.textContent = commotion
? "Antécédent de commotion mentionné mais pas renseigné dans le détail."
: "Pas d'antécédents de blessure renseignés.";
section.appendChild(p);
root.appendChild(section);
return;
}

// cumul jours d’absence
let totalDays = 0;
const rows = list.map((b) => {
const endDate =
b.rtpEffective || b.rtpEstimee || b.rttEstimee || new Date().toISOString().slice(0, 10);
const d = daysBetween(b.dateBlessure, endDate);
totalDays += d;
return {
...b,
days: d,
};
});

const bubbles = document.createElement("div");
bubbles.className = "performance-bubbles";

// Bulle: charge lésionnelle globale
const last = rows[rows.length - 1];

const btn = document.createElement("button");
btn.type = "button";
btn.className = "bubble-pill";
btn.innerHTML = `
<span class="bubble-main-value">
${totalDays} j
</span>
<span class="bubble-label">Jours d'absence cumulés</span>
`;

btn.addEventListener("click", () => {
const series = rows.map((b) => ({
label: b.dateBlessure,
value: b.days,
}));

const tableRows = rows.map((b) => [
b.dateBlessure,
b.diagnostic,
b.localisation,
`${b.days} j`,
]);

openHistoryModal({
title: `Antécédents – ${joueur.prenom} ${joueur.nom}`,
sub: `Dernière blessure : ${last.diagnostic} (${last.dateBlessure})`,
series,
tableColumns: ["Date", "Diagnostic", "Localisation", "Jours d'absence"],
tableRows,
});
});

bubbles.appendChild(btn);
section.appendChild(bubbles);

root.appendChild(section);
}

/* ===========================
HISTORIQUE SYNTHETIQUE FONCTIONNEL
=========================== */

function getFunctionalHistorySynthetic(joueur) {
const base = testsFonctionnels.find((t) => t.joueurId === joueur.id);
if (!base) return [];

const baseDate = new Date(joueur.dernierTest || "2025-11-01");
const offsets = [-90, -60, -30, 0];

return offsets.map((d, idx) => {
const dt = new Date(baseDate);
dt.setDate(dt.getDate() + d);
const dateStr = dt.toISOString().slice(0, 10);
const factor = 1 - (3 - idx) * 0.03; // progression légère

return {
date: dateStr,
dc1rm: Math.round(base.dc1rm * factor),
tirage1rm: Math.round(base.tirage1rm * factor),
tractions: Math.round(base.tractions * factor),
grip: Math.round(base.grip * factor),
squat1rm: Math.round(base.squat1rm * factor),
imtp: Math.round(base.imtp * factor),
vmax: +(base.vmax * factor).toFixed(2),
};
}).map((h, i, arr) => {
if (i === arr.length - 1) {
// dernier point = valeur actuelle exacte
return { ...h, ...base };
}
return h;
});
}

/* ===========================
SECTION TESTS FONCTIONNELS GLOBAUX
=========================== */

function renderSectionFonctionnel(root, joueur) {
const data = testsFonctionnels.find((t) => t.joueurId === joueur.id);
const history = getFunctionalHistorySynthetic(joueur);

const section = document.createElement("div");
section.className = "section-block";

section.innerHTML = `
<div class="section-title">Tests fonctionnels globaux</div>
<div class="section-sub">Force haut / bas du corps</div>
`;

if (!data || !history.length) {
const p = document.createElement("p");
p.className = "section-content";
p.textContent = "Tests fonctionnels à compléter.";
section.appendChild(p);
root.appendChild(section);
return;
}

const current = history[history.length - 1];
const previous = history.length > 1 ? history[history.length - 2] : null;

const bubbles = document.createElement("div");
bubbles.className = "performance-bubbles";

const metrics = [
{
key: "dc1rm",
label: "DC 1RM",
shortLabel: "DC 1RM",
value: `${current.dc1rm} kg`,
current: current.dc1rm,
previous: previous?.dc1rm ?? null,
unit: "kg",
},
{
key: "squat1rm",
label: "Squat 1RM",
shortLabel: "Squat 1RM",
value: `${current.squat1rm} kg`,
current: current.squat1rm,
previous: previous?.squat1rm ?? null,
unit: "kg",
},
{
key: "imtp",
label: "IMTP",
shortLabel: "IMTP",
value: `${current.imtp} N`,
current: current.imtp,
previous: previous?.imtp ?? null,
unit: "N",
},
{
key: "vmax",
label: "Vitesse max",
shortLabel: "Vmax",
value: `${current.vmax} m/s`,
current: current.vmax,
previous: previous?.vmax ?? null,
unit: "m/s",
},
];

metrics.forEach((m) => {
const btn = document.createElement("button");
btn.type = "button";
btn.className = "bubble-pill";

const trendHtml =
m.previous != null && m.current != null
? buildPerfTrendIcon(m.current, m.previous, true)
: "";

btn.innerHTML = `
<span class="bubble-main-value">
${m.value} ${trendHtml}
</span>
<span class="bubble-label">${m.label}</span>
`;

btn.addEventListener("click", () => {
const series = history.map((h) => ({
label: h.date,
value: h[m.key],
}));

// moyenne groupe actuelle sur ce test
const peers = testsFonctionnels
.map((t) => t[m.key])
.filter((v) => typeof v === "number");
const mean =
peers.length > 0
? peers.reduce((a, b) => a + b, 0) / peers.length
: null;

const tableRows = history.map((h) => [
h.date,
`${h[m.key]} ${m.unit}`,
mean != null ? mean.toFixed(1) + " " + m.unit : "-",
]);

openHistoryModal({
title: `Test fonctionnel – ${m.shortLabel}`,
sub: `${joueur.prenom} ${joueur.nom}`,
series,
tableColumns: ["Date", "Valeur", "Moyenne groupe"],
tableRows,
});
});

bubbles.appendChild(btn);
});

section.appendChild(bubbles);
root.appendChild(section);
}

/* ===========================
ZONES ANATOMIQUES & TESTS
=========================== */

// Config de zones -> liste de tests spécifiques (pas de redite)
const anatomicalConfig = {
"Tête": [
{ key: "TETE_COG", label: "Cognition réaction", types: ["Cognition réaction"] },
],
"Rachis cervical": [
{ key: "CERVICAL_ISO", label: "Isométrie rachis cervical", types: ["Isométrie rachis cervical"] },
],
"Épaule": [
{ key: "SHOULDER_ASH", label: "ASH test", types: ["ASH test"] },
],
"Lombaire": [
{ key: "LOMBAIRE_ISO", label: "Extension lombaire iso", types: ["Extension lombaire iso"] },
],
"Hanche": [
{ key: "HIP_CMJ", label: "CMJ", types: ["CMJ"] },
{ key: "HIP_SJ", label: "Squat Jump", types: ["Squat Jump"] },
],
"Genou – Quadriceps": [
{ key: "KNEE_QUAD_ISO", label: "Isocinétique quadriceps", types: ["Isocinétique quadriceps"] },
{ key: "KNEE_HOP", label: "Single / Triple Hop", types: ["Single Hop", "Triple Hop"] },
],
"Genou – Ischio": [
{ key: "KNEE_ISCHIO_MCCALL", label: "McCall", types: ["McCall"] },
],
"Ischio": [
{ key: "HAM_NORDBOARD", label: "NordBoard", types: ["NordBoard"] },
],
"Cheville": [
{ key: "ANKLE_KTW", label: "KTW", types: ["KTW"] },
],
"Course": [
{ key: "RUN_SPRINT10", label: "Sprint 10m", types: ["Sprint 10m"] },
{ key: "RUN_SPRINT30", label: "Sprint 30m", types: ["Sprint 30m"] },
{ key: "RUN_BONCO", label: "Bonco", types: ["Bonco"] },
],
};

function renderSectionAnatomie(root, joueur) {
const section = document.createElement("div");
section.className = "section-block";

section.innerHTML = `
<div class="section-title">Zones anatomiques & tests</div>
<div class="section-sub">Visualise les tests spécifiques par zone (asymétries, %BW, groupe)</div>
`;

const tabs = document.createElement("div");
tabs.className = "segment-tabs";

const tableContainer = document.createElement("div");
tableContainer.className = "section-content";
tableContainer.style.marginTop = "8px";

section.appendChild(tabs);
section.appendChild(tableContainer);
root.appendChild(section);

const zones = Object.keys(anatomicalConfig);

zones.forEach((zone, index) => {
const btn = document.createElement("button");
btn.type = "button";
btn.className = "segment-tab";
if (index === 0) btn.classList.add("active");
btn.textContent = zone;

btn.addEventListener("click", () => {
tabs.querySelectorAll(".segment-tab").forEach((b) => b.classList.remove("active"));
btn.classList.add("active");
renderZoneTestsTable(joueur, zone, tableContainer);
});

tabs.appendChild(btn);
});

// zone par défaut
if (zones.length) {
renderZoneTestsTable(joueur, zones[0], tableContainer);
}
}

function renderZoneTestsTable(joueur, zoneLabel, container) {
const zoneConfig = anatomicalConfig[zoneLabel];
if (!zoneConfig) {
container.innerHTML = "<p class='section-content'>Configuration de zone manquante.</p>";
return;
}

const playerTests = testsPhysiques.filter((t) => t.joueurId === joueur.id);
const testsForZone = playerTests.filter((t) =>
zoneConfig.some((z) => z.types.includes(t.type))
);

if (!testsForZone.length) {
container.innerHTML = "<p class='section-content'>Aucun test enregistré pour cette zone.</p>";
return;
}

// on garde le dernier test par type/côté
const latestMap = {};
testsForZone
.sort((a, b) => (a.date > b.date ? -1 : 1))
.forEach((t) => {
const key = `${t.type}-${t.cote || "-"}`;
if (!latestMap[key]) latestMap[key] = t;
});

const latest = Object.values(latestMap);

const rowsHtml = latest
.map((t) => {
return `
<tr data-test-id="${t.id}">
<td>${t.date}</td>
<td>${t.type}</td>
<td>${t.cote || "-"}</td>
<td>${t.valeur} ${t.unite}</td>
<td>${t.ratio}</td>
<td><span class="${getZoneDotClass(t.zone)}"></span></td>
</tr>
`;
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
${rowsHtml}
</tbody>
</table>
`;

container.querySelectorAll("tbody tr").forEach((tr) => {
tr.addEventListener("click", () => {
const id = tr.getAttribute("data-test-id");
openAdvancedTestModal(joueur, id);
});
});
}

function getZoneDotClass(zone) {
if (!zone) return "flag-dot";
const z = zone.toLowerCase();
if (z.includes("vert")) return "flag-dot flag-vert";
if (z.includes("orange")) return "flag-dot flag-orange";
if (z.includes("rouge")) return "flag-dot flag-rouge";
return "flag-dot";
}

/* ===========================
MODALE AVANCÉE TEST : D/G, %BW, GROUPE
=========================== */

function openAdvancedTestModal(joueur, testId) {
const test = testsPhysiques.find((t) => t.id === testId);
if (!test) return;

// Historique du même type & même côté
const seriesAll = testsPhysiques
.filter((t) => t.joueurId === joueur.id && t.type === test.type)
.sort((a, b) => (a.date > b.date ? 1 : -1));

const sameSide = seriesAll.filter(
(t) => (t.cote || "-") === (test.cote || "-")
);

// Asymétrie D/G sur la date du test
const sameDateTests = seriesAll.filter((t) => t.date === test.date);
let asymValue = null;
if (sameDateTests.length >= 2) {
const d = sameDateTests.find((t) => t.cote === "Droit");
const g = sameDateTests.find((t) => t.cote === "Gauche");
if (d && g) {
asymValue =
(Math.abs(d.valeur - g.valeur) / Math.max(d.valeur, g.valeur)) * 100;
}
}

// Ratio / poids de corps
let bwRatio = null;
const playerData = joueurs.find((j) => j.id === joueur.id);
if (playerData && playerData.poids && ["N", "kg"].includes(test.unite)) {
bwRatio = test.valeur / playerData.poids;
}

// Moyenne groupe sur ce test / côté
const peers = testsPhysiques.filter(
(t) =>
t.type === test.type &&
t.segment === test.segment &&
(t.cote || "-") === (test.cote || "-")
);
let groupMeanRatio = null;
if (peers.length) {
groupMeanRatio =
peers.reduce((acc, t) => acc + (t.ratio || 0), 0) / peers.length;
}

const playerRatio = test.ratio || 0;
let deltaGroup = null;
if (groupMeanRatio != null && groupMeanRatio !== 0) {
let diff = ((playerRatio - groupMeanRatio) / groupMeanRatio) * 100;
if (isLowerBetter(test.type)) diff *= -1; // si plus bas = mieux, on inverse
deltaGroup = diff;
}

// Série pour la courbe (ratio)
const series = sameSide.map((t) => ({
label: t.date,
value: t.ratio,
}));

// Table détaillée : chaque ligne = une mesure
const rows = sameSide.map((t) => {
// asym D/G sur cette date
const pairs = seriesAll.filter((x) => x.date === t.date);
let asym = "-";
if (pairs.length >= 2) {
const d2 = pairs.find((x) => x.cote === "Droit");
const g2 = pairs.find((x) => x.cote === "Gauche");
if (d2 && g2) {
const v = (Math.abs(d2.valeur - g2.valeur) / Math.max(d2.valeur, g2.valeur)) * 100;
asym = `${v.toFixed(1)} %`;
}
}

let bw = "-";
if (playerData && playerData.poids && ["N", "kg"].includes(t.unite)) {
const r = t.valeur / playerData.poids;
bw = `${r.toFixed(2)} x BW`;
}

// position vs groupe
let deltaText = "-";
if (groupMeanRatio != null && groupMeanRatio !== 0) {
let diff = ((t.ratio - groupMeanRatio) / groupMeanRatio) * 100;
if (isLowerBetter(t.type)) diff *= -1;
deltaText = (diff >= 0 ? "+" : "") + diff.toFixed(1) + " %";
}

return [
t.date,
t.cote || "-",
`${t.valeur} ${t.unite}`,
t.ratio != null ? t.ratio.toFixed(2) : "-",
asym,
bw,
deltaText,
];
});

// Sous-titre résumant les trois infos clés
const infoParts = [];
if (asymValue != null) infoParts.push(`Asym D/G : ${asymValue.toFixed(1)} %`);
if (bwRatio != null) infoParts.push(`Ratio BW : ${bwRatio.toFixed(2)} x BW`);
if (deltaGroup != null) {
infoParts.push(
`vs groupe : ${(deltaGroup >= 0 ? "+" : "") + deltaGroup.toFixed(1)} %`
);
}

openHistoryModal({
title: `${test.type} – ${test.segment} (${test.cote || "-"})`,
sub: `${joueur.prenom} ${joueur.nom} · ${infoParts.join(" · ")}`,
series,
tableColumns: [
"Date",
"Côté",
"Valeur",
"Ratio",
"Asym D/G",
"Ratio BW",
"Δ groupe",
],
tableRows: rows,
});
}
/* ===========================
SECTION RÉÉDUCATION (BLESSURE EN COURS)
=========================== */

function renderSectionReeduc(root, joueur) {
const section = document.createElement("div");
section.className = "section-block";

const playerInjuries = blessures
.filter((b) => b.joueurId === joueur.id)
.sort((a, b) => (a.dateBlessure > b.dateBlessure ? 1 : -1));

section.innerHTML = `
<div class="section-title">Rééducation / Reconditionnement</div>
<div class="section-sub">Suivi de la blessure actuelle et des séances</div>
`;

if (!playerInjuries.length) {
const p = document.createElement("p");
p.className = "section-content";
p.textContent = "Aucune blessure en cours pour ce joueur.";
section.appendChild(p);
root.appendChild(section);
return;
}

// On prend la dernière blessure (supposée active / la plus récente)
const blessure = playerInjuries[playerInjuries.length - 1];

const infoGrid = document.createElement("div");
infoGrid.className = "two-col-grid";

const card1 = document.createElement("div");
card1.className = "info-card";
card1.innerHTML = `
<div class="info-label">Diagnostic</div>
<div class="info-value">${blessure.diagnostic}</div>
<div class="info-label" style="margin-top:4px;">Localisation</div>
<div class="info-value">${blessure.localisation}</div>
`;

const card2 = document.createElement("div");
card2.className = "info-card";

const phaseClass = getPhaseClass(blessure.phase);
const rtt = blessure.rttEstimee || "-";
const rtp = blessure.rtpEstimee || "-";

// progression RTT
let progress = 0;
if (blessure.rttEstimee) {
const d0 = new Date(blessure.dateBlessure);
const d1 = new Date(blessure.rttEstimee);
const now = new Date();
if (d1 > d0) {
const total = d1 - d0;
const done = Math.min(Math.max(now - d0, 0), total);
progress = Math.round((done / total) * 100);
}
}

card2.innerHTML = `
<div class="info-label">Dates clés</div>
<div class="info-value">
Début : ${blessure.dateBlessure}<br/>
RTT estimée : ${rtt}<br/>
RTP estimée : ${rtp}
</div>
<div class="info-label" style="margin-top:6px;">Phase actuelle</div>
<div class="info-value"><span class="${phaseClass}">${blessure.phase}</span></div>
`;

infoGrid.appendChild(card1);
infoGrid.appendChild(card2);
section.appendChild(infoGrid);

// Progress bar
const progressContainer = document.createElement("div");
progressContainer.className = "progress-container";
progressContainer.innerHTML = `
<div class="info-label">Progression vers la RTT</div>
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
`;
section.appendChild(progressContainer);

// Protocole résumé
if (blessure.protocole) {
const protoCard = document.createElement("div");
protoCard.className = "info-card";
protoCard.style.marginTop = "10px";

const weeks = Object.entries(blessure.protocole);

const weeksHtml = weeks
.map(([key, text], idx) => {
return `
<div class="calendar-week">
<div class="calendar-week-title">Semaine ${idx + 1}</div>
<div class="calendar-week-content">${text}</div>
</div>
`;
})
.join("");

protoCard.innerHTML = `
<div class="info-label">Protocole de rééducation</div>
<div class="rehab-agenda" style="margin-top:6px;">
<div class="rehab-agenda-days">
${weeksHtml}
</div>
</div>
`;

section.appendChild(protoCard);
}

// Séances de rééducation
const seancesBlessure = seances
.filter((s) => s.blessureId === blessure.id)
.sort((a, b) => (a.date > b.date ? 1 : -1));

const seancesCard = document.createElement("div");
seancesCard.className = "info-card";
seancesCard.style.marginTop = "10px";

seancesCard.innerHTML = `
<div class="info-label">Séances de rééducation</div>
`;

if (!seancesBlessure.length) {
const p = document.createElement("p");
p.className = "section-content";
p.style.marginTop = "4px";
p.textContent = "Aucune séance renseignée pour le moment.";
seancesCard.appendChild(p);
} else {
const rows = seancesBlessure
.map(
(s) => `
<tr>
<td>${s.date}</td>
<td>${s.type}</td>
<td>${s.resume}</td>
<td>${s.rpe}</td>
<td>${s.tolerance}</td>
</tr>
`
)
.join("");

seancesCard.innerHTML += `
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
<tbody>
${rows}
</tbody>
</table>
`;
}

section.appendChild(seancesCard);
root.appendChild(section);
}

/* ===========================
INIT GLOBAL
=========================== */

function renderStats() {
const dispo = joueurs.filter((j) => j.disponibilite === "Disponible").length;
const injured = joueurs.filter((j) => j.disponibilite === "Infirmerie").length;

const dispoEl = document.getElementById("stat-disponibles");
const injEl = document.getElementById("stat-infirmerie");

if (dispoEl) dispoEl.textContent = dispo;
if (injEl) injEl.textContent = injured;
}

function createAvatar(joueur, baseClass) {
const avatar = document.createElement("div");
avatar.className = baseClass;
if (joueur.photoUrl) {
const img = document.createElement("img");
img.src = joueur.photoUrl;
img.alt = `${joueur.prenom} ${joueur.nom}`;
avatar.appendChild(img);
} else {
avatar.textContent = `${(joueur.prenom[0] || "").toUpperCase()}${(joueur.nom[0] || "").toUpperCase()}`;
}
return avatar;
}

function renderPlayersList() {
const container = document.getElementById("playersList");
if (!container) return;

container.innerHTML = "";

const filter = document.getElementById("filterSelect")
? document.getElementById("filterSelect").value
: "all";

let list = [...joueurs];

if (filter === "available") {
list = list.filter((j) => j.disponibilite === "Disponible");
} else if (filter === "injury") {
list = list.filter((j) => j.disponibilite === "Infirmerie");
}

if (searchTerm && searchTerm.trim() !== "") {
const q = searchTerm.toLowerCase();
list = list.filter((j) => {
const full = `${j.prenom} ${j.nom}`.toLowerCase();
const poste = `poste ${j.poste}`.toLowerCase();
const ligne = (j.ligne || "").toLowerCase();
return full.includes(q) || poste.includes(q) || ligne.includes(q);
});
}

list.forEach((j) => {
const card = document.createElement("div");
card.className = "player-card" + (currentPlayerId === j.id ? " active" : "");

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

card.addEventListener("click", () => {
currentPlayerId = j.id;
renderPlayersList();
renderPlayerDetail(j.id);
});

container.appendChild(card);
});

if (!list.length) {
const p = document.createElement("p");
p.className = "section-content";
p.style.color = "#cbd5f5";
p.textContent = "Aucun joueur ne correspond à ce filtre.";
container.appendChild(p);
}
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

function resetDetailWelcome() {
const detail = document.getElementById("playerDetail");
if (!detail) return;
detail.classList.add("empty-state");
detail.innerHTML = `
<div class="empty-welcome">
<img src="Image/SFP.png" class="empty-logo" alt="Logo Stade Français">
<h2 class="empty-title">U21 Stade Français Paris</h2>
<p class="empty-subtitle">Centre de suivi – Performance &amp; Médecine</p>
<p class="empty-hint">Sélectionne un joueur dans la liste pour commencer.</p>
</div>
`;
}

function init() {
// stats header
renderStats();

// liste joueurs
renderPlayersList();

// filtre
const filterSelect = document.getElementById("filterSelect");
if (filterSelect) {
filterSelect.addEventListener("change", () => {
currentPlayerId = null;
renderPlayersList();
resetDetailWelcome();
});
}

// recherche
const searchInput = document.getElementById("searchInput");
if (searchInput) {
searchInput.addEventListener("input", (e) => {
searchTerm = e.target.value || "";
renderPlayersList();
});
}

// état d'accueil déjà géré par le HTML, mais on s'assure qu'il soit propre
resetDetailWelcome();
}

document.addEventListener("DOMContentLoaded", init);
