// ── WaterResourcesPresentation.jsx ───────────────────────────────────────────
// Reads theme from the global <html data-theme="..."> attribute (set by App.jsx)
// so it always stays in sync with the app's theme cycle.
// The in-presentation theme button cycles the SAME global theme — updates both
// the app and the presentation simultaneously, persisted in localStorage.
//
// Theme cycle: (default) → light → dark → sepia → pink → mint → (repeat)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { TTSButton, TTSToolbar } from "../TextToSpeech.jsx";
import "./WaterResourcesPresentation.css";

// ── Theme cycle — mirrors App.jsx exactly ─────────────────────────────────────
const THEME_CYCLE = {
  light: { next: "dark",  icon: "🌙", label: "Dark"  },
  dark:  { next: "sepia", icon: "📜", label: "Sepia" },
  sepia: { next: "pink",  icon: "🌸", label: "Pink"  },
  pink:  { next: "mint",  icon: "🌿", label: "Mint"  },
  mint:  { next: "light", icon: "☀️", label: "Light" },
};

const THEME_KEY    = "wrm_theme";
const VALID_THEMES = ["light", "dark", "sepia", "pink", "mint"];

function readTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(t) ? t : "light";
  } catch { return "light"; }
}

function writeTheme(t) {
  try { localStorage.setItem(THEME_KEY, t); } catch {}
  // Also update the <html> attribute so global.css picks it up
  document.documentElement.setAttribute("data-theme", t);
}

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1, section: "Introduction",
    title: "Water Resources Management Services",
    content: `By: LMO IV Carmen Hizelle M. Garcia-Velasco\nChief, Water Resources Utilization Section, LPDD\nDENR – National Capital Region\n\nENRA Basic Course 2026\n20 April 2026 | Sotogrande Neopolitan Hotel, Quezon City`,
    type: "cover",
  },
  {
    id: 2, section: "Introduction",
    title: "Outline of Presentation",
    bullets: [
      "About NWRB: Mandates / Mission / Vision.",
      "Relevant Policies / Enabling Laws.",
      "Frontline Services / Functions.",
      "Earth's & Philippine Water Resources.",
      "Salient Points of the Water Code of the Philippines.",
      "Trivia that Matters on Water.",
      "TIPID TIPS on Water Consumption.",
    ],
    type: "outline",
  },
  {
    id: 3, section: "NWRB",
    title: "What is NWRB?",
    subtitle: "Water Management in the Philippines",
    content: "The National Water Resources Board is:",
    bullets: [
      "NOT Maynilad or Manila Water.",
      "NOT MWSS.",
      "NOT LWUA.",
      "NOT NAWASA.",
    ],
    type: "clarification",
  },
  {
    id: 4, section: "NWRB",
    title: "The National Water Resources Board",
    content: "The NWRB is the government agency that is responsible for all the water resources in the Philippines.",
    type: "statement",
  },
  {
    id: 5, section: "NWRB",
    title: "What is NWRB?",
    subtitle: "Water Management in the Philippines",
    content: "National coordinating and regulating agency on water resources management and development of the government.",
    type: "statement",
  },
  {
    id: 6, section: "NWRB",
    title: "The National Water Resources Board",
    content: "National coordinating and regulating agency on water resources management and development.",
    bullets: [
      "Policy Formulation and Coordination — PD 424 creating the NWRC (March 28, 1974); EO 124-A renamed NWRC to NWRB; transferred technical function to DPWH (1987).",
      "Resource Regulation — PD 1067 The Water Code of the Philippines (1976); EO 123 reconstituted the NWRB Board; transferring NWRB to DENR and transferring regulatory functions of LWUA to NWRB (2002).",
      "Economic Regulation — PD 1206 assigned residual functions to NWRB (1977); EO 860 redefining composition and powers of NWRB (2010); EO 22 Creating the WRMO under DENR (April 27, 2023).",
    ],
    type: "bullets",
  },
  {
    id: 7, section: "Legal Mandates",
    title: "Legal Mandates — Timeline",
    timeline: [
      { year: "1974", law: "PD 424",   desc: "Creating the National Water Resources Council" },
      { year: "1976", law: "PD 1067",  desc: "Also known as the Water Code of the Philippines" },
      { year: "1977", law: "PD 1206",  desc: "Assigned residual functions of the Board of Waterworks and the defunct Public Service Commission to NWRB" },
      { year: "1987", law: "EO 124-A", desc: "Renamed NWRC to NWRB; Transferred technical function to DPWH" },
      { year: "2002", law: "EO 123",   desc: "Reconstituted the NWRB Board; transferring NWRB to DENR and transferring regulatory functions of LWUA to NWRB" },
      { year: "2010", law: "EO 860",   desc: "Redefining the composition and powers of the NWRB; Change the membership of the NWRB Board; regulatory function to DENR" },
      { year: "2023", law: "EO 22",    desc: "Creating/Establishing the new Water Resources Management Office (WRMO) under the DENR" },
    ],
    type: "timeline",
  },
  {
    id: 8, section: "NWRB",
    title: "The NWRB Board",
    table: {
      headers: ["Role", "Position"],
      rows: [
        ["Chair",      "Secretary, Department of Environment and Natural Resources."],
        ["Vice Chair", "Secretary, Department of Economy, Planning, and Development."],
        ["Member",     "Secretary, Department of Justice."],
        ["Member",     "Secretary, Department of Science and Technology."],
        ["Member",     "Executive Director, U.P. – National Hydraulics Research Center."],
      ],
    },
    content: "Supported by NWRB Staff, Deputized Agents, and NWRB Employees.",
    type: "table",
  },
  {
    id: 9, section: "Deputation",
    title: "NWRB Resolution No. 15 - 1116",
    subtitle: "Deputation of DENR Regional Offices on Certain Functions of Water Use Regulation",
    content: "The NWRB under Article 80 of the Water Code (P.D. 1067) is empowered to deputize any official or agency of the government to perform any of its specific functions or activities. The DENR Regional Offices (WRUS, LPDD) shall:",
    bullets: [
      "Accept/verify water permit applications (WPAs).",
      "Conduct continuing inventory of water users.",
      "Identify water sources and make a water sources inventory map.",
      "Conduct IEC campaign on the Water Code of the Philippines and its IRR to key stakeholders.",
      "Conduct re-echo training for PENROs/CENROs and coordination meetings with other deputized agents.",
      "Perform such other related activities as may be specifically assigned.",
    ],
    type: "bullets",
  },
  {
    id: 10, section: "Deputation",
    title: "The NWRB Shall:",
    bullets: [
      "Continually provide training and technical support to DENR representatives relative to processing of WPAs.",
      "Regularly provide deputies with updated water policies, issuances, water permit grantees and related information.",
      "Conduct periodic monitoring and evaluation to assess performance of the deputy.",
    ],
    content: "As deputized agents, the DENR Regional Offices (WRUS, LPDD) shall submit monthly reports of accomplishment every 2nd day of the ensuing month:",
    subBullets: [
      "Investigation Report on Water Use Conflict referred by the Board.",
      "Inspection & Monitoring Reports on Water Permittees referred by the Board.",
      "Report on Water Permit Applications facilitated and investigated.",
      "Inventory of illegal drilling/water users (legal and illegal).",
      "Inventory of Water Resources Development Activities/Projects.",
      "Report on identified and mapped water sources.",
    ],
    type: "bullets-double",
  },
  {
    id: 11, section: "NWRB",
    title: "Mandate, Vision & Mission",
    subtitle: "The National Water Resources Board",
    cards: [
      { label: "Mandate.", text: "The NWRB is the government agency responsible for all the water resources in the Philippines. It coordinates and regulates all water-related activities in the country that has impact on the physical environment and the economy." },
      { label: "Vision.",  text: "Sustainable Water for a Healthy Nation" },
      { label: "Mission.", text: "To allocate sufficient water for optimal beneficial use; To ensure access to safe water supply and adequate sanitation services; and To preserve flow regimes for ecological integrity." },
    ],
    type: "cards",
  },
  {
    id: 12, section: "NWRB",
    title: "Major Functions and Activities of the Board",
    bullets: [
      "Deliberates and approves policies of the Board for implementation.",
      "Approves water permit applications and application for Certificate of Public Conveniences.",
      "Approves monthly allocation for water releases from the Angat Dam for water supply, irrigation/power.",
      "Deliberates on issues/concerns submitted for decision by the Board e.g. water use conflicts.",
    ],
    type: "bullets",
  },
  {
    id: 13, section: "NWRB",
    title: "3 Major Functions of NWRB",
    cards: [
      { label: "1.", text: "Policy Formulation and Coordination." },
      { label: "2.", text: "Resource Regulation." },
      { label: "3.", text: "Economic Regulation." },
    ],
    type: "cards-numbered",
  },
  {
    id: 14, section: "NWRB",
    title: "1. Policy Formulation and Coordination",
    content: "Formulate policies and plans within the framework of Integrated Water Resources Management (IWRM).",
    type: "statement",
  },
  {
    id: 15, section: "NWRB",
    title: "Functions and Programs/Activities",
    subtitle: "1. Policy Formulation and Coordination",
    bullets: [
      "Formulate policies and plans within the framework of Integrated Water Resources Management (IWRM).",
      "Amendment to the 1976 Water Code of the Philippines (on-going) — NWRB conducts Focus Group Discussions and writeshops for further enhancement of proposed amendments.",
    ],
    type: "bullets",
  },
  {
    id: 16, section: "Angat Reservoir",
    title: "Regulation of Angat Reservoir",
    bullets: [
      "Flood control to Bulacan Province.",
      "Water supply to Metro Manila, with 15 million population.",
      "Irrigation to 27,000 hectares of farm lands in Bulacan and Pampanga Provinces.",
      "Power generation for Luzon Power Grid",
    ],
    note: "Angat Dam was constructed in 1967; 60 km northeast of Metro Manila with a catchment area of 543 km².",
    type: "bullets",
  },
  {
    id: 17, section: "Angat Reservoir",
    title: "Utilization of Water Supply from Angat Reservoir",
    content: "The Angat Reservoir is a critical multipurpose dam supplying water to Metro Manila, irrigation to 27,000 hectares of farm lands in Bulacan and Pampanga, as well as power generation. During dry season, the country experiences shortage of water supply, especially in Metro Manila which is highly dependent on its major supply from the Angat Reservoir.",
    type: "statement",
  },
  {
    id: 18, section: "NWRB",
    title: "2. Resource Regulation & 3. Economic Regulation",
    cards: [
      { label: "Resource Regulation.", text: "Issues Water Permit • Resolves Water Use Conflicts • Monitors compliance of conditions of water permit/conditional water permit and other policies." },
      { label: "Economic Regulation.", text: "Protects consumers and safeguards the economic viability of water utilities: LGU-run water utilities, Rural Waterworks Associations, Water Cooperatives, Private Water Utilities, Bulk Water Suppliers, Water Peddlers • Grants Certificate of Public Convenience (CPC) • Sets water tariffs of private water providers • Inspects and tests water meters." },
    ],
    type: "cards",
  },
  {
    id: 19, section: "Philippine Water Resources",
    title: "Philippine Water Resources",
    stats: [
      { value: "2,400 mm.", label: "Average Rainfall per year." },
      { value: "421.",      label: "Principal Rivers." },
      { value: "79.",       label: "Lakes." },
      { value: "125.8B m³.",label: "Surface Water." },
      { value: "20.2B m³.", label: "Groundwater." },
      { value: "146B m³.",  label: "Total Water Resources Potential." },
    ],
    content: "Around 58% are allocated for different purposes based on the water permit issued.",
    type: "stats",
  },
  {
    id: 20, section: "Philippine Water Resources",
    title: "Water Resources to Manage",
    stats: [
      { value: "2,400 mm/yr.", label: "Average Rainfall." },
      { value: "421.",         label: "Rivers." },
      { value: "79.",          label: "Lakes." },
      { value: "126,000 MCM.", label: "Surface Water." },
      { value: "20,000 MCM.",  label: "Groundwater." },
      { value: "146,000 MCM.", label: "Total Water Resources." },
    ],
    type: "stats",
  },
  {
    id: 21, section: "Philippine Water Resources",
    title: "Philippine Waters",
    content: "Total Water Resources — 146 billion cubic meter",
    bullets: [
      "Groundwater - 20.2 billion cubic meter",
      "Average Rainfall — 2,400 mm per year",
      "421 Rivers", "79 lakes",
      "Surface water - 128.5 billion cubic meter",
      "Around 58% are allocated for different purposes based on the water permit issued",
    ],
    type: "bullets",
  },
  {
    id: 22, section: "Philippine Water Resources",
    title: "12 Water Resources Regions",
    content: "The Philippines is divided into 12 water resources regions based on hydrological boundaries, physiographic features and climate homogeneity.",
    bullets: [
      "I: Ilocos.", "II: Cagayan Valley.", "III: Central Luzon.", "IV: Southern Tagalog.",
      "V: Bicol.", "VI: Western Visayas.", "VII: Central Visayas.", "VIII: Eastern Visayas.",
      "IX: Southwestern Mindanao.", "X: Northern Mindanao.", "XI: Southeastern Mindanao.", "XII: Southern Mindanao.",
    ],
    stats: [
      { value: "300,000 km².",  label: "Land Area." },
      { value: "1,830 km².",   label: "Rivers & Lakes." },
      { value: "266,000 km².", label: "Bays & Coastal Waters." },
      { value: "421.",         label: "Principal River Basins." },
    ],
    type: "bullets-stats",
  },
  {
    id: 23, section: "Philippine Water Resources",
    title: "Administrative vs Water Resources Regions",
    content: "For more comprehensive planning, the country is divided into 12 water resources regions based on hydrological boundaries — these may differ from administrative regions.",
    type: "statement",
  },
  {
    id: 24, section: "Philippine Water Resources",
    title: "Major River Basins in the Philippines",
    bullets: [
      "Cagayan River Basin — the largest, 25,649 sq.km drainage area.",
      "Mindanao River Basin — the 2nd largest, 23,169 sq.km drainage area.",
      "Agusan River Basin — the 3rd largest, 10,921 sq.km drainage area.",
    ],
    note: "There are 18 major river basins in the country: 7 in Luzon, 3 in Visayas, and 8 in Mindanao.",
    type: "bullets",
  },
  {
    id: 25, section: "Philippine Water Resources",
    title: "Water-Stressed Areas",
    content: "Although the country is theoretically assured of adequate water supply, seasonal variations are considerable and geographic distribution is biased, often resulting in water shortages especially during dry season.",
    bullets: [
      "Water-stressed rivers: Pampanga, Bago and Jalaur Rivers.",
      "9 highly urbanized groundwater constraint areas: Metro Manila, Metro Cebu, Baguio, Bacolod, Angeles, Zamboanga, Davao, Cagayan de Oro, and Iloilo.",
      "Parts of Cavite and Laguna where water withdrawal already exceeded safe yield or recharge rate.",
    ],
    type: "bullets",
  },
  { id: 26, section: "Philippine Water Resources", title: "Major River Basins (Luzon & Visayas)", bullets: ["1. Abra–Ilocos (5,125 sq.km).","2. Cagayan–Cagayan Valley (25,649 sq.km).","3. Abulug–Cagayan Valley (3,372 sq.km).","4. Agno–Central Luzon (5,972 sq.km).","5. Pampanga–Central Luzon (9,759 sq.km).","6. Pasig-Laguna Bay–Southern Luzon (4,678 sq.km).","7. Bicol–Bicol (3,771 sq.km).","8. Panay–Western Visayas (1,843 sq.km).","9. Jalaur–Western Visayas (1,503 sq.km).","10. Ilog Hilabangan–Western Visayas (1,945 sq.km)."], type: "bullets" },
  { id: 27, section: "Philippine Water Resources", title: "Major River Basins (Mindanao)", bullets: ["11. Agusan–Northern Mindanao (10,921 sq.km).","12. Tagoloan–Northern Mindanao (1,704 sq.km).","13. Cagayan de Oro–Northern Mindanao (1,521 sq.km).","14. Tagum-Libuganon–SE Mindanao (3,064 sq.km).","15. Davao–SE Mindanao (1,623 sq.km).","16. Buayan-Malungon–SE Mindanao (1,434 sq.km).","17. Agus–Southern Mindanao (1,890 sq.km).","18. Mindanao (23,169 sq.km).","19. Laoag–Ilocos (1,353 sq.km).","20. Amnay-Patrick–Southern Tagalog (993 sq.km)."], type: "bullets" },
  {
    id: 28, section: "Earth's Water",
    title: "Earth's Water Distribution",
    stats: [
      { value: "97.2%.", label: "Salt Water." },
      { value: "2.8%.",  label: "Fresh Water." },
      { value: "2.2%.",  label: "Glaciers & Icecaps." },
      { value: "0.6%.",  label: "Groundwater." },
      { value: "0.01%.", label: "Lakes & Streams." },
    ],
    content: "Of the total supply of freshwater on Earth, most is locked in glaciers and icecaps. Only a tiny fraction is accessible as drinking water.",
    note: "Source: UNESCO",
    type: "stats",
  },
  {
    id: 29, section: "Earth's Water",
    title: "Total Volume of Earth's Water",
    content: "The volume of all water would be about 332.5 million cubic miles (mi³), or 1,386 million cubic kilometers (km³).",
    bullets: [
      "A cubic mile of water equals more than 1.1 trillion gallons.",
      "A cubic kilometer of water equals about 264 billion gallons.",
      "This is being shared by 7.5 billion world population.",
    ],
    note: "Source: US Geological Survey",
    type: "bullets",
  },
  { id: 30, section: "Water Code", title: "PD 1067 – The Water Code of the Philippines", content: "Presidential Decree 1067, signed December 31, 1976, is the foundational law governing all water resources in the Philippines.", type: "section-intro" },
  {
    id: 31, section: "Water Code",
    title: "Objectives of the Water Code",
    bullets: [
      "a. To establish the basic principles and framework relating to the appropriation, control and conservation of water resources.",
      "b. To define the extent of the rights and obligation of water users and owners.",
      "c. To adopt a basic law governing the ownership, appropriation, utilization, exploitation, development, conservation and protection of water resources.",
      "d. To identify the administrative agencies which will enforce this Code.",
    ],
    type: "bullets",
  },
  {
    id: 32, section: "Water Code",
    title: "Salient Features of the Water Code (P.D. 1067)",
    bullets: [
      "Who is tasked to implement", "Waters as used in the Code", "Underlying Principles.",
      "Appropriation of Waters", "Uses of Water", "Measure and Limit of Appropriation.",
      "Instances where permit/authority must be secured from the NWRB.",
      "Revocation, Modification, Cancellation of Water Permit.",
      "Transfer of Water Permit", "Conflict Resolution", "Penal Provisions.",
    ],
    type: "bullets",
  },
  {
    id: 33, section: "Water Code",
    title: "Appropriation of Waters — Definition",
    content: "As used in the Water Code, is the acquisition of rights over the use of waters or the taking or diverting of waters from a natural source in the manner and for any purpose allowed by law.",
    type: "definition",
  },
  {
    id: 34, section: "Water Code",
    title: "Waters — Definition",
    content: "As used in the Water Code, refers to water under the ground, water above the ground, water in the atmosphere and the waters of the sea within the territorial jurisdiction of the Philippines.",
    type: "definition",
  },
  {
    id: 35, section: "Water Code",
    title: "Ownership of Waters — Part 1",
    content: "The following waters belong to the State:",
    bullets: [
      "a. Rivers and their natural beds.",
      "b. Continuous or intermittent waters of springs and brooks running in their natural beds.",
      "c. Natural lakes and lagoons.",
      "d. All other categories of surface waters (water flowing over lands, rainfall, agricultural runoff, seepage and drainage).",
      "e. Atmospheric water.",
      "f. Subterranean or ground water.",
      "g. Seawater.",
    ],
    type: "bullets",
  },
  {
    id: 36, section: "Water Code",
    title: "Ownership of Waters — Part 2",
    content: "The following waters found on private lands also belong to the State:",
    bullets: [
      "a. Continuous or intermittent waters rising on such lands.",
      "b. Lakes and lagoons naturally formed on such lands.",
      "c. Rain water falling on such lands.",
      "d. Subterranean or groundwaters.",
      "e. Waters in swamps and marshes.",
    ],
    highlight: '"All waters belong to the State."',
    type: "bullets",
  },
  {
    id: 37, section: "Water Code",
    title: "Underlying Principles (Article 3)",
    bullets: [
      "a. All waters belong to the State.",
      "b. All waters that belong to the state cannot be the subject to acquisitive prescription.",
      "c. The state may allow the use or development of waters by administrative concession.",
      "d. Utilization, exploitation, development, conservation and protection of water resources shall be subject to the control and regulation of the government through the NWRB.",
      "e. Preference in the use and development of waters shall consider current usages and most responsive to the changing needs of the country.",
    ],
    type: "bullets",
  },
  { id: 38, section: "Water Code", title: "Article 6 — Domestic Use Without Permit", content: "The owner of the land where the water is found may use the same for domestic purposes without securing a permit, provided that such use shall be registered, when required by the National Water Resources Council.\n\nThe Council, however, may regulate such use when there is (1) wastage, or (2) in times of emergency.", type: "article", articleNo: "Art. 6" },
  { id: 39, section: "Water Code", title: "Article 7 — Cisterns, Tanks or Pools", content: "Subject to the provisions of the Water Code, any person who captures or collects water by means of cisterns, tanks or pools shall have exclusive control over such water and the right to dispose of the same.", type: "article", articleNo: "Art. 7" },
  { id: 40, section: "Water Code", title: "Appropriation of Waters", content: "As used in the Water Code, is the acquisition of rights over the use of waters or the taking or diverting of waters from a natural source in the manner and for any purpose allowed by law.", type: "definition" },
  { id: 41, section: "Water Code", title: "Appropriation of Waters — Uses (I)",   bullets: ["a. Domestic.", "b. Municipal.", "c. Irrigation."], type: "bullets" },
  { id: 42, section: "Water Code", title: "Appropriation of Waters — Uses (II)",  bullets: ["d. Power Generation.", "e. Fisheries.", "f. Livestock Raising."], type: "bullets" },
  { id: 43, section: "Water Code", title: "Appropriation of Waters — Uses (III)", bullets: ["g. Industrial.", "h. Recreational.", "i. Other purposes."], type: "bullets" },
  {
    id: 44, section: "Water Code",
    title: "Regalian Doctrine",
    content: "The doctrine recognized in our constitution whereby ownership of minerals and all forces of potential energy and other natural resources are reserved for the State.\n\n(See Article XII, Section 2, 1987 Constitution).",
    type: "definition",
  },
  {
    id: 45, section: "Water Code",
    title: "Water Right & Water Permit",
    cards: [
      { label: "Water Right.",  text: "The privilege granted by the government to appropriate and use water." },
      { label: "Water Permit.", text: "The document evidencing the water right." },
    ],
    type: "cards",
  },
  {
    id: 46, section: "Water Code",
    title: "General Rule & Exception on Water Permits",
    cards: [
      { label: "General Rule.", text: "No person, including government instrumentalities or government-owned corporations, shall appropriate water without a water right, which shall be evidenced by a document known as a water permit." },
      { label: "Exception.",    text: "Any person may appropriate or use natural bodies of water without securing a water permit for: (1) Appropriation of water by means of hand-carried receptacles; and (2) Bathing or washing, watering or dipping of domestic or farm animals, and navigation of watercrafts or transportation of logs and other objects by floatation." },
    ],
    type: "cards",
  },
  { id: 47, section: "Water Code", title: "Utilization of Waters — Part 1", bullets: ["Development of water resources shall consider security of the State, multiple use, beneficial effects, adverse effects and cost of development.","The utilization of subterranean or ground water shall be coordinated with that of surface waters so that a superior right in one is not adversely affected by an inferior right in the other.","Water contained in open canals, aqueducts or reservoirs of private persons may be used by any person for domestic purpose or for watering plants.","Works for the storage, diversion, distribution and utilization of water resources shall contain adequate provision for the prevention and control of diseases."], type: "bullets" },
  { id: 48, section: "Water Code", title: "Utilization of Waters — Part 2", bullets: ["When the reuse of waste water is feasible, it shall be limited as much as possible to uses other than direct human consumption.","Drainage systems shall be so constructed that their outlets are rivers, lakes, the sea, natural bodies of water, or other water courses as may be approved by the proper government agency.","Lower estates are obliged to receive the waters which naturally and without the intervention of man flow from the higher estates.","The banks of rivers and streams and shores of seas and lakes, within a zone of 3 meters in urban areas, 20 meters in agricultural areas, and 40 meters in forest areas are subject to the easement of public use."], type: "bullets" },
  { id: 49, section: "Water Code", title: "Control of Waters", bullets: ["To promote the best interest and coordinated protection of flood plain lands.","The government may construct necessary flood control structures in declared flood control areas.","River beds, sand bars and tidal flats may not be cultivated except upon prior permission.","The impounding of water in ponds or reservoirs may be prohibited by the Council upon consultation with the Department of Health if it is dangerous to public health."], type: "bullets" },
  { id: 50, section: "Water Code", title: "Other Provisions", bullets: ["Article 11: The State may declare waters not previously appropriated, in whole or in part, exempt from appropriation for any or all purposes.","Article 12: Waters appropriated for a particular purpose may be applied for another purpose only upon approval of the Council and on condition that the new use does not unduly prejudice the rights of other permittees.","Article 15: Only citizens of the Philippines, of legal age, as well as juridical persons who are duly qualified by law to exploit and develop water resources, may apply for water permits."], type: "bullets" },
  { id: 51, section: "Water Code", title: "Article 20 — Beneficial Use of Water", content: "The measure and limit of appropriation of water shall be beneficial use.", cards: [{ label: "Beneficial Use of Water", text: "The utilization of water in the right amount during the period that the water is needed for producing the benefits for which the water is appropriated." }], type: "article-card", articleNo: "Art. 20" },
  { id: 52, section: "Water Code", title: "Article 25 — Easements for Water Permit Holders", content: "A holder of a water permit may demand the establishment of easements necessary for the construction and maintenance of the works and facilities needed for the beneficial use of the waters to be appropriated, subject to the requirements of just compensation and to the following conditions:", bullets: ["1. That he is the owner, lessee, mortgagee or one having real right over the land upon which he proposes to use water; and.","2. That the proposed easement is the most convenient and the least onerous to the servient estate."], type: "article", articleNo: "Art. 25" },
  { id: 53, section: "Water Code", title: "Article 39 — Construction of Works", content: "Except in cases of emergency to save life or property, the construction or repair of the following works shall be undertaken only after the plans and specifications are approved by the proper government agency:", bullets: ["1. Dams for the diversion or storage of water.","2. Structures for the use of water power.","3. Installation for the utilization of subterranean or ground water.","4. Other structures for utilization of water resources."], type: "article", articleNo: "Art. 39" },
  { id: 54, section: "Water Code", title: "Articles 76 & 79", bullets: ["Article 76: The establishment of cemeteries and waste disposal areas that may affect the source of a water supply or a reservoir for domestic or municipal use shall be subject to the rules and regulations promulgated by the Department of Health.","Article 79: The administration and enforcement of the provisions of this Code, including the granting of permits and the imposition of penalties for administrative violation thereof, are hereby vested in the Council."], type: "bullets" },
  { id: 55, section: "Water Code", title: "Uses of Water", bullets: ["Domestic.","Municipal.","Irrigation.","Power Generation.","Fisheries.","Livestock Raising.","Industrial.","Recreational.","Other Purposes."], type: "bullets" },
  { id: 56, section: "Water Code", title: "Uses of Waters (I)",   bullets: ["1. Domestic.","2. Municipal.","3. Irrigation."], type: "bullets" },
  { id: 57, section: "Water Code", title: "Uses of Waters (II)",  bullets: ["4. Power Generation.","5. Fisheries.","6. Livestock Raising."], type: "bullets" },
  { id: 58, section: "Water Code", title: "Uses of Waters (III)", bullets: ["7. Industrial.","8. Recreational.","9. Other Purposes."], type: "bullets" },
  { id: 59, section: "Water Code", title: "Classification of Water Use — Part 1", bullets: ["Domestic Use/Purpose — utilization of water directly drawn from a source by a household for drinking, washing, bathing, cooking or other household needs, home gardens, and watering of lawns or domestic animals. Ex: Single family household.","Municipal Use/Purpose — utilization of water for supplying the water requirements of the community, whether by piped or bulk distribution. Ex: Public utilities, water districts, subdivisions, cooperatives.","Irrigation Use/Purpose — utilization of water for producing agricultural crops. Ex: Farms, orchard, nursery, garden.","Power Generation Use/Purpose — utilization of water for producing electrical or mechanical power. Ex: Hydropower plants.","Fisheries Use/Purpose — utilization of water for the propagation and culture of fish, crabs, prawns as a commercial enterprise."], type: "bullets" },
  { id: 60, section: "Water Code", title: "Classification of Water Use — Part 2", bullets: ["Livestock Raising Use/Purpose — utilization of water for large herds or flocks of animals raised as a commercial enterprise. Ex: Poultry farms, chicken hatcheries.","Industrial Use/Purpose — utilization of water in factories, industrial plants and mines, including the use of water as an ingredient of a finished product. Ex: Cooling system, factories, ice plants, quarrying.","Recreational Use/Purpose — utilization of water for swimming pools, bath houses, boating, water skiing, golf courses and similar facilities in resorts.","Other Uses/Purpose — commercial (bottled water, peddlers, bulk selling), automotive washing, fruit washing, construction/road maintenance, memorial parks, environmental and others."], type: "bullets" },
  { id: 61, section: "Water Permit", title: "Requirements — Municipal Use", bullets: ["Duly accomplished Water Permit Application and Notices.","Proof of Land Ownership (Certificate of Title, Tax Declaration, Lease Agreement, etc.).","Certificate of Registration from relevant agencies (DTI, SEC with Articles of Incorporation, CDA).","Certificate of Conformance from LWUA (for Water District).","Certificate of Registration (for Barangay Waterworks Association, RWSA).","Vicinity Map/Location Plan with scale 1:10,000 or 1:50,000.","Subdivision Plan (if applicable).","Well Drilling Data (in case of existing groundwater source).","Physical and Chemical Analysis / Bacteriological Test.","Sangguniang Bayan/Regional Development Council endorsement (for LGU-managed facilities).","Environment Compliance Certificate or Certificate of Non-coverage from DENR-Regional Office.","Such other documents as may be required by the Board."], type: "bullets" },
  { id: 62, section: "Water Permit", title: "Requirements — Irrigation Purpose", bullets: ["Duly accomplished Water Permit Application and Notices.","Proof of Land Ownership (Certificate of Title, Tax Declaration, Lease Agreement, etc.).","Certificate of Registration from SEC, DTI, CDA.","Vicinity map/Location Plan with 1:50,000.","General layout of the System (including delineation of area indicating hectarage and adjoining lands).","Well Drilling Data (in case of existing deepwell).","Environment Compliance Certificate or Certificate of Non-coverage from DENR-Regional Office.","Such other documents as may be required by the Board."], type: "bullets" },
  { id: 63, section: "Water Permit", title: "Requirements — Power / Industrial / Fisheries / Livestock / Recreation / Others", bullets: ["Duly accomplished Water Permit Application and Notices.","Proof of Land Ownership (Certificate of Title, Tax Declaration, Lease Agreement, etc.).","Certificate of Registration from SEC with Articles of Incorporation / Corporate Secretary's Certificate.","Vicinity Map/Location Map showing the exact location of point of diversion.","Brief Description of the project (how water will be used, amount needed, power to be generated).","Environmental Compliance Certificate or Certificate of Exemption from DENR (if available).","Clearance from existing dam/reservoir operated by NIA, NPC and other government entities (for Fisheries).","Well drilling data (in case of existing deepwell).","Physical and Chemical Analysis of water / Bacteriological test."], type: "bullets" },
  { id: 64, section: "Water Permit", title: "Additional Requirements", bullets: ["For Bulk Water Supply: Memorandum of Agreement or Joint Venture Agreement between the water supplier and the buyer.","For Power Generation: Certificate of Registration from DOE; Endorsement of the Project; Ecological study and Sustainability Plan (for Hydropower Projects requiring more than 80%-dependable flow)."], type: "bullets" },
  { id: 65, section: "Water Permit", title: "Other Requirements — Transfer & Lease", bullets: ["For Transfer of a Water Permit — a verified petition for the transfer shall state the reasons for the transfer and shall attach the contract or agreement for the transfer.","For Lease of a Water Permit — a verified petition for the lease shall be accompanied by a duly executed contract of lease. No contract of lease shall be for a continuous period exceeding five (5) years; otherwise, the contract shall be treated as a transfer of permit in favor of the lessee."], type: "bullets" },
  { id: 66, section: "Water Permit", title: "Water Resources Allocated by Purpose (as of December 2016)", content: "Considering hydropower use as non-consumptive: Agriculture is the major user compared to domestic/municipal, industrial and other uses.", note: "As of December 2016, the 21,961 water right grantees represent legal water users and do not include unregistered and illegal water appropriators. Amount of water withdrawals excluding power generation is estimated as 86,102 MCM/year. Irrigation is the biggest user accounting for 67,011 MCM/year.", type: "statement" },
  { id: 67, section: "Water Permit", title: "Water Allocation by Purpose", table: { headers: ["Purpose","Amount (%)"], rows: [["Irrigation.","78.354%."],["Industrial.","11.33%."],["Domestic / Municipal.","8.45%."],["Others.","1.853%."]] }, type: "table" },
  { id: 68, section: "Water Permit", title: "When Water Permit Must Be Secured from NWRB", bullets: ["Appropriation of water for any purpose.","Change in purpose of appropriation.","Amendment of an existing permit.","Transfer/Lease of water permit.","Temporary permit to appropriate and use water.","Developing a stream, lake, or spring for recreational purpose.","Such other instances as determined by the Board."], type: "bullets" },
  { id: 69, section: "Water Permit", title: "Qualifications of Applicants for Permit/Authority", bullets: ["Citizens of the Philippines.","Associations, duly registered cooperatives or corporations organized under Philippine laws, at least 60% of the capital of which is owned by citizens of the Philippines.","Government entities and instrumentalities, including government-owned or controlled corporations."], type: "bullets" },
  { id: 70, section: "Water Permit", title: "Requirements (General)", bullets: ["Proof of Land Ownership, legal title to, or right to use, the property on which the water source is situated.","Certificate of Registration from relevant agencies.","Vicinity Map/Location Plan showing the exact diversion point.","Well Drilling Data (in case of existing well).","Actual discharge of the spring.","Certificate of Potability.","ECC / Certificate of Non-Coverage.","Such other documents as may be required by the Board."], type: "bullets" },
  { id: 71, section: "Water Permit", title: "WPA Submission — 6 Copies",   content: "Water Permit Application forms must be submitted in 6 copies for certain permit types.", type: "statement" },
  { id: 72, section: "Water Permit", title: "WPA Submission — 11 Copies",  content: "Water Permit Application forms must be submitted in 11 copies for certain permit types.", type: "statement" },
  { id: 73, section: "Water Permit", title: "Conditional Water Permit (CWP)", content: "Upon approval of the Water Permit Application and compliance with requirements, a Conditional Water Permit (CWP) is issued pending full compliance with all conditions set by the NWRB.", type: "statement" },
  { id: 74, section: "Water Permit", title: "WPA Processing Summary", cards: [{ label: "Acceptance.", text: "Only WPAs with basic requirements will be accepted: Proof of ownership, Vicinity map, Certificate of Registration." },{ label: "Fees.", text: "₱7,200.00 — All other purposes\n₱550.00 — Level 1 and 2 Irrigation (Communal)." },{ label: "Evaluation Factors.", text: "Prior permits granted • Availability of water • Water requirement • Protest filed, if any • Possible adverse effect." },{ label: "Process.", text: "15-day posting • 15-day waiting period • E-mail of notices • DPWH Report • Tracer Letter • NWRB Staff to conduct investigation • Submit compliance • Valid for 1 year (may be extended)." },{ label: "Final Steps.", text: "Conduct hearing and investigation → Resolution / decision." }], type: "cards" },
  { id: 75, section: "Water Permit", title: "Fees and Charges — Part 1", content: "NWRB fees and charges schedule for Water Permit Applications and related services.", type: "statement" },
  { id: 76, section: "Water Permit", title: "Fees and Charges — Part 2", content: "Additional NWRB fees and charges for other water-related applications and services.", type: "statement" },
  { id: 77, section: "Water Permit", title: "Conditional Water Permit (CWP) — Conditions Part 1", bullets: ["Upon receipt of the CWP, the grantee shall manifest in writing his acceptance thereof with all its terms and conditions.","Within 1 year from the date of approval, the grantee shall submit a copy of the plans and specifications for the diversion works, pump structure, water measuring device and water distribution system.","File an application for a Certificate of Public Convenience (CPC), if applicable."], type: "bullets" },
  { id: 78, section: "Water Permit", title: "Conditional Water Permit (CWP) — Conditions Part 2", bullets: ["The grantee shall install and maintain water control and measuring devices to monitor water level and releases/extraction, and water meters duly tested and sealed by the Monitoring & Enforcement Division of the NWRB; keep records of withdrawals to be submitted quarterly (monthly).","The grantee shall pay the appropriate Annual Water Charges during the validity of the CWP."], type: "bullets" },
  { id: 79, section: "Water Permit", title: "Water Permit Conditions", bullets: ["Payment of Annual Water Charges.","Quarterly Record of Water Withdrawal.","Non-Use of Water for the purpose stipulated in the water permit for a period of three consecutive years from the date of issuance or completion of diversion works and necessary structures shall render the permit null and void."], type: "bullets" },
  { id: 80, section: "CPC", title: "Certificate of Public Convenience (CPC)", content: "A CPC is a formal written authority issued by the NWRB authorizing private water utilities to operate and maintain water supply system, provide water supply service and charge rates therefore. (PD 1206)", type: "definition" },
  { id: 81, section: "CPC", title: "Qualifications of Applicants for CPC", bullets: ["Applicant must be a citizen of the Republic of the Philippines or a corporation, or partnership, association, cooperative, duly organized under the laws of the Philippines, at least 60% of the capital stock of which belongs to citizens of the Philippines.","Applicant must prove that the operation of the public service proposed and that the authority to do business will promote the public interest in a proper and suitable manner.","The applicant must be technically capable of undertaking the proposed service and must meet the responsibilities incident to its operation."], type: "bullets" },
  { id: 82, section: "CPC", title: "How to Apply for a CPC", bullets: ["Any person/entity desiring to operate a waterworks utility may file for an application for CPC at the NWRB.","Applicant must meet the qualifications required for a CPC applicant.","Applicant must submit the documentary requirements.","Applicant must be a grantee of a water permit (Exceptions: WSPs whose source is bulk water purchased from another utility).","Tariff shall be just and reasonable both to the customers and to the water service providers; it should conform to the NWRB 5-year Tariff Methodology."], type: "bullets" },
  { id: 83, section: "CPC", title: "Documentary Requirements for CPC and Approval of Tariff", bullets: ["Articles of Incorporation/Partnership/DTI Registration.","Board resolution or special power of attorney authorizing the signatory.","Approved Conditional/Water Permit(s) (copy).","Official Receipt/s of Annual Water Charges (copy).","Latest Certificate of Potability.","Plan of Water Distribution System.","Plan, Elevation of Cross-sectional Views of Tank/Reservoir and Pump House, Machinery & Equipment."], type: "bullets" },
  {
    id: 84, section: "CPC",
    title: "Approval Process Flow for CPC",
    timeline: [
      { year: "Step 1.", law: "Filing of Application.", desc: "" },
      { year: "Step 2.", law: "Publication.", desc: "" },
      { year: "Step 3.", law: "Initial Review.", desc: "" },
      { year: "Step 4.", law: "Hearing.", desc: "" },
      { year: "Step 5.", law: "Financial and Technical Evaluation.", desc: "" },
      { year: "Step 6.", law: "Approval.", desc: "" },
      { year: "Step 7.", law: "Issuance of CPC", desc: "CPC validity — 5 years counted from approval." },
    ],
    type: "timeline",
  },
  { id: 85, section: "CPC", title: "CPC Validity", content: "CPC validity — 5 years counted from approval.", type: "statement" },
  { id: 86, section: "CPC", title: "Other CPC-Related Applications/Petitions Filed Before NWRB", bullets: ["CPC Validity Extensions and Subsequent Tariff Adjustments.","Approval of Sale/Transfer/Lease of Water System with CPC.","Approval of Donation of Water System with CPC.","Authority for Extension of Service.","Re-appraisal/Re-evaluation of Assets."], type: "bullets" },
  { id: 87, section: "CPC", title: "NWRB Standard Rules and Regulations in Waterworks Operation", bullets: ["Adequate and continuous service.","Imposition of water rates in accordance with the NWRB approved rates.","Service area within the defined territory.","Water must be chlorinated.","Monthly submission of Bacteriological Test.","Submission of Annual Report on or before May 30th of every year.","Payment of Supervision and Regulation Fee.","Testing and sealing of water meters.","Compliance with NWRB Rules and Regulations.","CPC validity — 5 years counted from approval."], type: "bullets" },
  { id: 88, section: "CPC", title: "Regular Reporting Requirements", bullets: ["Submission of Annual Report of Operations.","Monthly Submission of Bacteriological Test.","Annual Submission of Physical & Chemical Test.","Performance Review & Audit (every 5 Years)."], type: "bullets" },
  { id: 89, section: "CPC", title: "Advantages of Having a CPC", bullets: ["CPC holders operate legally.","CPC holders are assured of investment recovery through the 5-year tariff methodology.","Depreciation Reserve Fund will be set aside (improvement and rehabilitation of water system).","Consumers' interest will be protected by regulation."], type: "bullets" },
  { id: 90, section: "Water Issues", title: "Issues on Philippines' Water Resources", content: "Overview of key water resource challenges facing the Philippines.", type: "section-intro" },
  { id: 91, section: "Water Issues", title: "Issues on Philippines' Water Resources", bullets: ["Deterioration of water quality and availability.","Threats of climate change (droughts, flooding, sea level rise).","Sectoral approach in water resources management.","Lack of science-based and updated information."], type: "bullets" },
  { id: 92, section: "Water Issues", title: "Human-Induced & Climate Challenges", content: "Human-induced challenges are aggravated by the impacts of extreme climate variability such as too little and too much water. The approximate combined cost of damages caused by tropical storms Ondoy and Pepeng (2009) amounted to PhP 38 Billion, left thousands of deaths and affected more than 9 million people.", type: "statement" },
  { id: 93, section: "Water Issues", title: "Key Impacts of Climate Change in the Philippines Ecosystems", content: "Climate change poses significant threats to Philippine ecosystems, affecting biodiversity, water availability, coastal resources, and overall environmental stability.", type: "statement" },
  { id: 94, section: "IWRM", title: "Integrated Water Resources Management (IWRM) for Water Security", content: "IWRM is a process which promotes the coordinated development and management of water, land, and related resources in order to maximize resultant economic and social welfare in an equitable manner without compromising the sustainability of vital ecosystem.", note: "Source: Global Water Partnership", type: "definition" },
  { id: 95, section: "IWRM", title: "Why Manage Water Resources? — Water Stressed Cities", content: "The following cities were identified in the 1998 JICA Master Plan Study as water stressed:", bullets: ["Baguio City.","Angeles City.","Metro Manila.","Metro Iloilo.","Bacolod City.","Metro Cebu.","Davao City.","Cagayan de Oro City.","Zamboanga City."], note: "Master Plan Study on Water Resources Management for the Philippines, JICA Study 1998", type: "bullets" },
  { id: 96, section: "IWRM", title: "What Water Sources Are Being Monitored?", content: "NWRB and its deputized agents monitor both surface and groundwater sources.", type: "section-intro" },
  { id: 97, section: "Monitoring", title: "Surface Water Sources (Part 1)", bullets: ["Diversion Dam.","River.","Dam Reservoir.","Small Water Impounding Project.","Creek.","Fish Ponds."], type: "bullets" },
  { id: 98, section: "Monitoring", title: "Surface Water Sources (Part 2)", bullets: ["Irrigation Canal Structures"], type: "bullets" },
  { id: 99, section: "Monitoring", title: "Groundwater Sources", bullets: ["Deepwell Source (DW).","Spring Source.","Shallow Tubewell (STW)."], type: "bullets" },
  { id: 100, section: "Monitoring", title: "Spring Source Monitoring", content: "Inspection and monitoring of natural spring sources including determination of coordinates via GPS, measurement of actual discharge, and assessment of water quality.", type: "statement" },
  { id: 101, section: "Monitoring", title: "Stream Flow Measurement Using Current Meter", content: "Correct position during the conduct of discharge measurement. The current meter method provides accurate streamflow data for water resource assessment and water permit compliance monitoring.", type: "statement" },
  { id: 102, section: "Monitoring", title: "Stream Flow Calculation — Current Meter Method", content: "Method Used: Current Meter Method\nRiver Cross Section — The cross-sectional area is divided into segments, and velocity is measured at each segment using a current meter. Flow rate is calculated as Q = A × V.", type: "statement" },
  { id: 103, section: "Monitoring", title: "Float Method for Stream Flow Measurement", content: "The float method uses floating objects to measure surface velocity, which is then used to estimate flow rate using the formula: Q = A × V × Coefficient (0.85).", type: "statement" },
  { id: 104, section: "Monitoring", title: "Equipment for Discharge Measurement", bullets: ["Measuring tape / marked tag line.","Meter stick / marked wading rod.","Current meter / flow meter.","Stop watch"], type: "bullets" },
  { id: 105, section: "Monitoring", title: "Float Method — Equipment and Formula", content: "Equipment necessary: measuring tape, timer/stopwatch, floats (orange peel, water soaked block of wood, or other material that sinks at least halfway into the water), meter stick or marked wading rod.", cards: [{ label: "Formula.", text: "Q = AV(Coef)\nWhere: Q = flow rate, V = velocity (mean), A = area, Coef = 0.85." }], type: "article-card", articleNo: "Float" },
  { id: 106, section: "Monitoring", title: "River Cross Section — Measurement Example", content: "Total width: 7.50 m — divided into segments of varying widths. Depth measurements are taken at each segment to calculate cross-sectional area, which is then multiplied by velocity to determine flow rate.", type: "statement" },
  { id: 107, section: "Monitoring", title: "Weir Methods for Flow Measurement", cards: [{ label: "90° V-Notch Weir.", text: "Q = 0.0505 h²·⁵ m³/hr\nWhere: h = depth of flow (cm), Q = flow rate (m³/hr)." },{ label: "Rectangular Sharp-Crested Weir.", text: "Q = 0.0662 h¹·⁵(L − 0.2h) m³/hr\nWhere: Q = flow rate (m³/hr), h = head above the weir crest (cm), L = length of weir crest (cm)." }], type: "cards" },
  { id: 108, section: "Monitoring", title: "How Do We Monitor? — Surface Water", content: "For Surface Water Sources — Instruments/methods used:", bullets: ["Conduct ocular inspection on water user's facilities.","Conduct actual discharge measurements on water user's source/s.","Determination of Water Source's Coordinates through GPS.","Method 1: Current Meter Measurement.","Method 2: Floatation Method Measurement.","Method 3: Measurement through the use of weirs (V-notch Weir or Rectangular Weir)."], type: "bullets" },
  { id: 109, section: "Monitoring", title: "How Do We Monitor? — Groundwater", bullets: ["Conduct of Discharge through use of: Flow meter/production meter, or Volumetric measurement.","Water Level Measurement through use of: Water Level Instrument.","Determination of Water Source's Coordinates through: Global Positioning System (GPS).","Installation of NWRB Identification Tag."], type: "bullets" },
  { id: 110, section: "Monitoring", title: "Discharge Measurement Through a Flow Meter", content: "A flow meter (production meter) is used to measure the discharge rate of groundwater sources, especially deepwells. The reading is recorded in the quarterly water withdrawal report submitted to NWRB.", type: "statement" },
  { id: 111, section: "Monitoring", title: "Discharge Measurement Through Volumetric Method", content: "The volumetric method measures discharge by timing how long it takes to fill a container of known volume.", type: "statement" },
  { id: 112, section: "Monitoring", title: "Volumetric Method — Calculation Example", content: "Equipment necessary: Stopwatch, Container with known volume (e.g., drum).", cards: [{ label: "Sample Calculation.", text: "diameter (d) = 2 m, height (h) = 3 m, time (t) = 8 min = 480 sec\nV = π r²h = π (d/2)²h\nRate of flow (Q) = Volume / time = π (2²/4)(3) / 480 sec = 0.0196 m³/sec × 1000 = 19.6 liters/sec." }], type: "article-card", articleNo: "Vol." },
  { id: 113, section: "Monitoring", title: "Determination of Water Level Using a Water Level Instrument", content: "Water level instruments are used to measure the depth of water in deepwells. This data is recorded and submitted quarterly to monitor compliance with water permit conditions.", type: "statement" },
  { id: 114, section: "Monitoring", title: "Installation of NWRB Well ID Tag", content: "After monitoring, a permanent NWRB Well Identification Tag is installed on each water source to facilitate future inspections and monitoring.", type: "statement" },
  { id: 115, section: "Monitoring", title: "Installed NWRB Well Identification Tag", content: "Example well ID tags with GPS coordinates:\n• Lat.: 14°07'15\" Long.: 121°16'56\"\n• Lat.: 14°05'19.9\" Long.: 121°20'37.9\"", type: "statement" },
  { id: 116, section: "Monitoring", title: "What NWRB Forms Are Needed?", bullets: ["Notice of Inspection.","Technical Inspection Report (Surface Water/Ground Water).","Water Permit Status Report.","CPC Operation Report.","Quarterly Water Withdrawal Report.","Site Verification Report.","Summary of Establishments."], type: "bullets" },
  { id: 117, section: "Monitoring", title: "Notice of Ocular Inspection", content: "The Notice of Ocular Inspection is served to water permit holders prior to the conduct of inspection by NWRB/DENR field personnel.", type: "statement" },
  { id: 118, section: "Monitoring", title: "Technical Inspection Report", content: "The Technical Inspection Report documents findings from ocular inspections of water sources, including discharge measurements, water level readings, and compliance status.", type: "statement" },
  { id: 119, section: "Water Issues", title: "Groundwater Contamination", bullets: ["Leaching of industrial, agrochemicals and animal wastes in agro-industrial areas.","Sub-surface discharges from latrines and septic systems and infiltration of polluted urban run-off."], type: "bullets" },
  { id: 120, section: "Water Issues", title: "Surface Water Pollution", bullets: ["Direct dumping of domestic solid waste in rivers and lakes creating adverse impact on water quality and availability.","Wastewater discharges from domestic and industries that contaminate water bodies."], type: "bullets" },
  { id: 121, section: "Water Issues", title: "Deforestation and Sedimentation", bullets: ["Deforestation that causes soil erosion and siltation.","Sedimentation of rivers, lakes including reservoirs affecting the water quality and limiting the flow capacity of these water bodies."], type: "bullets" },
  { id: 122, section: "Water Issues", title: "Threats of Climate Change", bullets: ["Increased intensity and frequency of storms (La Niña) and drought (El Niño).","Variation in stream flow and groundwater recharge affecting water quality and seasonal water availability.","Higher temperatures affecting water quality (such as eutrophication).","Sea level rise causing saltwater intrusion into surface and ground water, affecting the amount and quality of water supplies."], content: "Seven extreme tropical cyclone/southwest monsoon induced extreme events occurred in 1991 to late 2004. The worst drought occurred in 1997–1998 El Niño, resulting in severe water shortage in Metro Manila.", type: "bullets" },
  { id: 123, section: "SDG", title: "The 2030 Agenda", content: "In September 2015, the United Nations Member States adopted a new framework — the 2030 Sustainable Development Agenda — defining international, regional and national development priorities. It includes 17 Sustainable Development Goals (SDGs) and 169 targets covering economic, social and environmental dimensions of development.", type: "statement" },
  { id: 124, section: "SDG", title: "Sustainable Development Goals and Targets", content: "The 17 SDGs and 169 Targets are integrated and indivisible, global in nature and universally applicable. Each government sets nationally-owned targets guided by the global level of ambition while taking into account country-level circumstances.", type: "statement" },
  { id: 125, section: "SDG", title: "SDG Goal 6", highlight: "Ensure access to clean water and sanitation for all", type: "highlight" },
  { id: 126, section: "SDG", title: "Sustainable Development Goal 6", highlight: "Ensure availability and sustainable management of water and sanitation for all by 2030.", type: "highlight" },
  { id: 127, section: "DENR", title: "The Big Picture — DENR's Vast and Complex Concerns", bullets: ["Lands.","ENR Research.","Protected Areas & Biodiversity, Coastal & Marine.","Air, Water, Solid Waste.","Minerals & Geo-hazard.","Forests."], type: "bullets" },
  { id: 128, section: "DENR", title: "Institutional Structure of the Water Sector", content: "There are thirty government agencies and offices concerned with water resources development and management. Key agencies include:", bullets: ["Policy Making: DEPDev (formerly NEDA).","Coordination / Regulation: NWRB.","Water Quality & Sanitation: EMB, DOH, BRL, EHS, LGUs, MWSS.","Flood Management: DPWH-PMO, OCD-NDCC, PAGASA, MMDA","Data Collection: NWRB, BRS, NAMRIA, LWUA, MGB, PAGASA, MWSS, NIA.","Watershed Management: FMB, BSWM, NIA, NPC, BMB (PAWB), LGUs.","Water Supply: DPWH, MWSS, LWUA-WDs, DILG-PMO, PEZA, LGUs.","Irrigation: NIA, DA, BSWM.","Hydro Power: DOE, PSALM, NPC, PEMC."], type: "bullets" },
  { id: 129, section: "WRMO", title: "E.O. 22, S. 2023 — April 27, 2023: Created the WRMO", bullets: ["Presage the Department of Water Resources.","Draft the Integrated Water Resources Management Plan (IWMP).","Generate and Maintain Water and Sanitation Data.","Collaborate with all Sectors: DENR Family + MWSS, LWUA, WD, NWRB, LLDA, RBCO, FMB, MGB, EMB (close coordination with NIA, DPWH, DOH, DEPDev, DOF, DILG)."], highlight: '"…MWSS, LWUA, and the Water Board (NWRB), DENR and this new Water Resources Management Office, it has to be cohesive…" – President Ferdinand R. Marcos, Jr.', type: "bullets" },
  { id: 130, section: "WRMO", title: "Integrated Water Resources Management Plan", content: "Department of Environment and Natural Resources - Water Resources Management Office", type: "statement" },
  { id: 131, section: "WRMO", title: "WRMO — Organizational Setup and Coordination", bullets: ["The WRMO, through the DENR Secretary, is directed to submit to the Office of the President a quarterly status report on the implementation of EO 22.","Administrative Oversight: MWSS, LWUA, and local water districts.","Coordination Functions: Other relevant national government agencies.","Establishment of a Decision Support System: Inter-sectoral, inter-agency, inter-departmental.","IWMP — Integrated Water Resources Management Plan."], type: "bullets" },
  { id: 132, section: "IWMP", title: "How the IWMP Was Prepared", content: "The IWMP was prepared through a review of existing plans and a consultation workshop with key implementing agencies.", bullets: ["Review of: National Water Security Roadmap (NWSR), Philippine Development Plan 2023-2028, Philippine Water Supply and Sanitation Master Plan (PWSSMP) 2019-2030, National Sewerage and Septage Management Program, National Irrigation Master Plan (NIMP) 2020-2030, Philippine Master Plan for Climate Resilient Forest Development 2023-2028, National Climate Change Action Plan 2011-2028.","Consultation Workshop with Key Implementing Agencies: DENR (NWRB, FMB, RBCO), DEPDev, DILG, DPWH, LWUA, MWSS, LLDA."], type: "bullets" },
  { id: 133, section: "IWMP", title: "IWMP — Lead Responsible Agencies for PPAs", bullets: ["(1) Reform governance and regulations — DENR-WRMO, DEPDev: National WSS Program, NEDA Board Resolution, River basin planning and implementation following IWRM approach, Land-use and water availability studies per RBO, Resource allocation plans.","Local level water security planning — DENR-WRMO, DEPDev, DPWH, DILG, LWUA, DBM: Implementing guidelines integrating water security planning, LGU ordinances strengthening provincial LGU oversight on WSS and WRM.","Improve oversight and regulation of water for efficient services — DEPDev, DENR-WRMO: Databases/tracking systems, Policy guidelines on JMCs, Tariff setting policies, KPIs and standards per type and level of utility."], type: "bullets" },
  { id: 134, section: "Trivia", title: "Did You Know?", content: "You can survive for… 3 minutes without air, 3 days without water, 3 weeks without food", type: "trivia-intro" },
  { id: 135, section: "Trivia", title: "Survival Without Food vs Water", cards: [{ label: "Without FOOD", text: "21 DAYS" },{ label: "Without WATER", text: "3 DAYS" }], content: "Water is far more critical to survival than food.", type: "cards" },
  { id: 136, section: "Trivia", title: "Water Composition and Role in the Body", bullets: ["Composes 75% of your brain.","Regulates your body temperature.","Makes up 83% of your blood.","Removes waste.","Composes 22% of your bones.","Cushions your joints.","Helps carry nutrients and oxygen to your cells.","Moistens oxygen for breathing.","Protects and cushions your vital organs.","Helps your body absorb nutrients.","Makes up 75% of your muscles."], type: "bullets" },
  { id: 137, section: "Trivia", title: "Alam mo ba?", bullets: ["Kung ang 15 milyong Pilipino sa Metro Manila ay magtitipid ng kahit 4 na litrong tubig kada araw.","Makaiipon tayo ng 60 milyong litro ng tubig sa isang araw.","Katumbas ng 24 na olympic-sized swimming pool."], type: "bullets" },
  { id: 138, section: "Trivia", title: "Water Trivia", bullets: ["2nd leading cause of death among children is diarrhea.","4,100 kids under 5 die every day from unclean drinking water.","1 billion people have no access to clean drinking water."], type: "bullets" },
  { id: 139, section: "Trivia", title: "Did You Know? Water makes up…", bullets: ["83% of brain.","83% of kidneys.","85% of lungs.","94% of blood.","95% of eyes.","75% of heart.","75% of muscles."], type: "bullets" },
  { id: 140, section: "Trivia", title: "Water Fact", content: "Additional water-related trivia and awareness information.", type: "trivia-intro" },
  { id: 141, section: "Trivia", title: "Water Fact", content: "More water conservation trivia.", type: "trivia-intro" },
  { id: 142, section: "Tipid Tubig", title: "Tipid Tubig Tips", content: "Nagawa mo na ba ang mga ito, kung hindi pa, try mo!", type: "trivia-intro" },
  { id: 143, section: "Tipid Tubig", title: "Tipid Tubig Tips #1", content: "Patayin ang gripo o shower habang nag-sha-shampoo.", cards: [{ label: "Tubig na natipid", text: "18 litro kada araw." }], type: "cards" },
  { id: 144, section: "Tipid Tubig", title: "Tipid Tubig Tips #2", content: "Patayin ang gripo habang nagsisipilyo.", cards: [{ label: "Tubig na natipid", text: "15 litro kada minuto." }], type: "cards" },
  { id: 145, section: "Tipid Tubig", title: "Tipid Tubig Tips #3", content: "Panatilihing walang basura sa toilet bowl kapag nag-flush.", cards: [{ label: "Tubig na natipid", text: "18-26 litro." }], type: "cards" },
  { id: 146, section: "Tipid Tubig", title: "Tipid Tubig Tips #4", content: "Ayusin o palitan ang sirang tubo o gripo.", cards: [{ label: "Tubig na natipid", text: "19 litro kada araw." }], type: "cards" },
  { id: 147, section: "Tipid Tubig", title: "Tipid Tubig Tips #5", content: "Kaya mo bang magshower nang hanggang 5 minuto lamang.", cards: [{ label: "Tubig na natipid", text: "126 litro kada araw." }], type: "cards" },
  { id: 148, section: "Tipid Tubig", title: "Tipid Tubig Tips #6", content: "Sa paglilinis ng kotse, patayin ang hose habang hindi ginagamit.", cards: [{ label: "Tubig na natipid", text: "378 na litro." }], type: "cards" },
  { id: 149, section: "Tipid Tubig", title: "Tipid Tubig Tips #7", content: "Magtanim ng halamang kaunti lang ang tubig na kailangan katulad ng cactus at succulents.", cards: [{ label: "Tubig na natipid", text: "378 na litro." }], type: "cards" },
  { id: 150, section: "Tipid Tubig", title: "Bulletin 003 — Water Conservation at Home", content: "Practices.", type: "trivia-intro" },
  { id: 151, section: "Tipid Tubig", title: "Tip 1", content: "During late at night or early in the morning, check your water meter for activity when no one is using water inside the house. This will detect any unobserved leaks which can account for 15-40% of water used every month.", type: "trivia-intro" },
  { id: 152, section: "Tipid Tubig", title: "Tip 2", content: "Wash dishes right away. Food waste is easier to remove before it dries out. If not, soak plates prior to washing. Savings: 500 to 1,000 Liters every month.", type: "trivia-intro" },
  { id: 153, section: "Tipid Tubig", title: "Tip 3", content: "Take out frozen food in advance to avoid using running water to thaw them.", type: "trivia-intro" },
  { id: 154, section: "Tipid Tubig", title: "Tip 4", content: "Water plants only when necessary. If needed, do this early in the morning or in the late afternoon to reduce evaporation.", type: "trivia-intro" },
  { id: 155, section: "Closing",    title: "Tip 5", content: "As much as possible, always run the washing machine at full load. Savings: 5-10 Liters every load. Use the proper amount of detergent when washing clothes. Less water for rinsing will be used.", type: "trivia-intro" },
  { id: 156, section: "Closing",    title: "Tip 6", content: "Take shorter shower. Shortening your shower time by a minute or two will save up to 568 liters per month", type: "trivia-intro" },
  { id: 157, section: "Closing",    title: "Tip 7", content: "Dispose of tissue paper in the trash and not in the toilet bowl. Flushing it consumes 6 Liters of water.", type: "trivia-intro" },
  { id: 158, section: "Closing",    title: "Tip 8", content: "Share your water conservation hacks, practices, and tips to others.", type: "trivia-intro" },
  { id: 159, section: "Closing",    title: "Play your part, be water smart!", content: "Wise Water Use.", type: "trivia-intro" },
  { id: 160, section: "Closing",    title: "Water Management is a Shared Responsibility", content: "Water management is a shared responsibility that requires everyone to be \"water smart\" to ensure sustainable water for a healthy nation.", type: "closing" },
  { id: 161, section: "Closing",    title: "Thank You!", content: "DENR – National Capital Region\nWater Resources Utilization Section, LPDD", type: "cover" },
];

// ── Section accent colors ─────────────────────────────────────────────────────
const SECTION_COLORS = {
  "Introduction":               "#065A82",
  "NWRB":                       "#028090",
  "Legal Mandates":             "#02C39A",
  "Deputation":                 "#0A7C6E",
  "Angat Reservoir":            "#1A6B8A",
  "Philippine Water Resources": "#1565C0",
  "Earth's Water":              "#0288D1",
  "Water Code":                 "#00695C",
  "Water Permit":               "#2E7D32",
  "CPC":                        "#558B2F",
  "Water Issues":               "#B71C1C",
  "IWRM":                       "#4A148C",
  "Monitoring":                 "#37474F",
  "SDG":                        "#E65100",
  "DENR":                       "#1B5E20",
  "WRMO":                       "#004D40",
  "IWMP":                       "#006064",
  "Trivia":                     "#6A1B9A",
  "Tipid Tubig":                "#1565C0",
  "Closing":                    "#065A82",
};

const SECTIONS = [...new Set(SLIDES.map(s => s.section))];

// ── Build TTS text ────────────────────────────────────────────────────────────
function buildTTSText(slide) {
  const parts = [`Slide ${slide.id}. ${slide.title}.`];
  if (slide.subtitle)   parts.push(slide.subtitle + ".");
  if (slide.highlight)  parts.push(slide.highlight);
  if (slide.content)    parts.push(slide.content);
  if (slide.bullets)    slide.bullets.forEach(b => parts.push(b));
  if (slide.subBullets) slide.subBullets.forEach(b => parts.push(b));
  if (slide.cards)      slide.cards.forEach(c => parts.push(`${c.label}: ${c.text}`));
  if (slide.stats)      slide.stats.forEach(s => parts.push(`${s.label}: ${s.value}`));
  if (slide.timeline)   slide.timeline.forEach(t => parts.push(`${t.year}: ${t.law}. ${t.desc}`));
  if (slide.table)      slide.table.rows.forEach(r => parts.push(r.join(" — ")));
  if (slide.note)       parts.push("Note: " + slide.note);
  return parts.join(" ");
}

// ── SlideContent ──────────────────────────────────────────────────────────────
function SlideContent({ slide }) {
  const color = SECTION_COLORS[slide.section] || "#065A82";

  return (
    <div className="slide-content">
      <div className="slide-section-badge" style={{ background: color + "22", color, borderColor: color + "44" }}>
        {slide.section}
      </div>

      <h2 className="slide-title" style={{ borderLeftColor: color }}>
        {slide.title}
      </h2>

      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}

      {slide.highlight && (
        <div className="slide-highlight" style={{ borderColor: color, background: color + "12" }}>
          {slide.highlight}
        </div>
      )}

      {slide.content && (
        <p className="slide-body" style={{ whiteSpace: "pre-line" }}>{slide.content}</p>
      )}

      {slide.bullets && (
        <ul className="slide-bullets">
          {slide.bullets.map((b, i) => (
            <li key={i} style={{ "--dot": color }}>{b}</li>
          ))}
        </ul>
      )}

      {slide.subBullets && (
        <>
          <p className="slide-body" style={{ marginTop: 14, fontWeight: 600 }}>Additionally:</p>
          <ul className="slide-bullets slide-bullets--sub">
            {slide.subBullets.map((b, i) => (
              <li key={i} style={{ "--dot": color }}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {slide.stats && (
        <div className="slide-stats">
          {slide.stats.map((s, i) => (
            <div key={i} className="stat-item" style={{ borderTopColor: color, borderColor: color + "40" }}>
              <div className="stat-value" style={{ color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {slide.cards && (
        <div className="slide-cards">
          {slide.cards.map((c, i) => (
            <div key={i} className="slide-card" style={{ borderTopColor: color }}>
              <div className="card-label" style={{ color }}>{c.label}</div>
              <p style={{ whiteSpace: "pre-line", margin: 0 }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {slide.timeline && (
        <div className="slide-timeline">
          {slide.timeline.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year" style={{ background: color }}>{t.year}</div>
              <div className="timeline-body">
                <div className="timeline-law" style={{ color }}>{t.law}</div>
                {t.desc && <div className="timeline-desc">{t.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.table && (
        <div className="slide-table-wrap">
          <table className="slide-table">
            <thead>
              <tr style={{ background: color }}>
                {slide.table.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {slide.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slide.articleNo && (
        <div className="article-badge" style={{ background: color }}>{slide.articleNo}</div>
      )}

      {slide.note && <p className="slide-note">📌 {slide.note}</p>}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function WaterResourcesPresentation({ onBack }) {
  // Read theme from the global html attribute (set by App.jsx via localStorage)
  const [theme,    setTheme]    = useState(readTheme);
  const [current,  setCurrent]  = useState(0);
  const [navOpen,  setNavOpen]  = useState(false);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("All");
  const [slideKey, setSlideKey] = useState(0);

  // Keep local state in sync whenever another tab / the app changes theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      if (VALID_THEMES.includes(t)) setTheme(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Cycle theme globally — same as the app ThemeToggle
  const cycleTheme = () => {
    const next = THEME_CYCLE[theme]?.next ?? "light";
    writeTheme(next);
    setTheme(next);
  };

  const themeMeta = THEME_CYCLE[theme] ?? THEME_CYCLE.light;

  const slide   = SLIDES[current];
  const ttsText = buildTTSText(slide);

  const go = useCallback((idx) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setCurrent(next);
    setSlideKey(k => k + 1);
    setNavOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   go(current - 1);
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const filteredSlides = SLIDES.filter(s => {
    const matchSection = filter === "All" || s.section === filter;
    const matchSearch  = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.content ?? "").toLowerCase().includes(search.toLowerCase());
    return matchSection && matchSearch;
  });

  const progress = ((current + 1) / SLIDES.length) * 100;

  return (
    <div className="pres-root">

      {/* ── Header ── */}
      <header className="pres-header">
        <div className="pres-header-left">
          <button className="pres-back-btn" onClick={onBack}>
            ← <span>Home</span>
          </button>
          <div className="pres-logo">💧</div>
          <div>
            <div className="pres-agency">DENR – NCR | Water Resources Utilization Section</div>
            <div className="pres-event">Specialized Learning Event · 20 April 2026</div>
          </div>
        </div>

        <div className="pres-header-right">
          {/* Theme cycle button — same cycle as the app */}
          <button className="pres-theme-btn" onClick={cycleTheme} title="Switch theme">
            <span className="pres-theme-btn-icon">{themeMeta.icon}</span>
            <span>{themeMeta.label}</span>
          </button>
          <TTSButton text={ttsText} size={18} />
          <div className="pres-counter">
            <strong>{current + 1}</strong>/{SLIDES.length}
          </div>
          <button className="pres-nav-toggle" onClick={() => setNavOpen(n => !n)} aria-label="Open slide navigator">
            ☰
          </button>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="pres-progress">
        <div className="pres-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Main slide ── */}
      <main className="pres-main">
        <div className="pres-slide" key={slideKey}>
          <div className="slide-inner">
            <SlideContent slide={slide} />
            <div className="slide-tts-row">
              <TTSToolbar text={ttsText} label="🔊 Read Slide" />
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom nav ── */}
      <nav className="pres-arrows">
        <button
          className="pres-arrow pres-arrow--prev"
          onClick={() => go(current - 1)}
          disabled={current === 0}
        >← Prev</button>

        <div className="pres-jump">
          <input
            type="number" min={1} max={SLIDES.length}
            value={current + 1}
            onChange={e => go(+e.target.value - 1)}
          />
          <span>of {SLIDES.length}</span>
        </div>

        <button
          className="pres-arrow pres-arrow--next"
          onClick={() => go(current + 1)}
          disabled={current === SLIDES.length - 1}
        >Next →</button>
      </nav>

      {/* ── Nav panel ── */}
      {navOpen && (
        <aside className="pres-nav-panel">
          <div className="nav-panel-header">
            <span>All Slides ({SLIDES.length})</span>
            <button onClick={() => setNavOpen(false)}>✕</button>
          </div>

          <input
            className="nav-search"
            placeholder="Search slides…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="nav-filter">
            <button
              className={`nav-filter-btn${filter === "All" ? " active" : ""}`}
              onClick={() => setFilter("All")}
            >All</button>
            {SECTIONS.map(s => (
              <button
                key={s}
                className={`nav-filter-btn${filter === s ? " active" : ""}`}
                style={filter === s ? { background: SECTION_COLORS[s], color: "#fff", borderColor: SECTION_COLORS[s] } : {}}
                onClick={() => setFilter(s)}
              >{s}</button>
            ))}
          </div>

          <div className="nav-list">
            {filteredSlides.map(s => (
              <button
                key={s.id}
                className={`nav-item${s.id === slide.id ? " active" : ""}`}
                style={s.id === slide.id
                  ? { borderLeftColor: SECTION_COLORS[s.section], background: SECTION_COLORS[s.section] + "18" }
                  : {}
                }
                onClick={() => go(SLIDES.indexOf(s))}
              >
                <span className="nav-item-num" style={{ color: SECTION_COLORS[s.section] }}>{s.id}</span>
                <div>
                  <div className="nav-item-title">{s.title}</div>
                  <div className="nav-item-section">{s.section}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}