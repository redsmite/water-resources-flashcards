// ── data.js ──────────────────────────────────────────────────────────────────
// Edit this file to update course content, quiz questions, and flashcards.
// Do NOT import React here — this is pure data.
// ─────────────────────────────────────────────────────────────────────────────

const DENR_LOGO = "data:image/png;base64,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";

// ─────────────────────────────────────────────────────────────────────────────
// MODULES — Course Content
// Each module has: id, title, subtitle, icon, color, chapters[], quiz[]
// chapters: title + content (use \n for line breaks, • for bullets)
// quiz: q (question), options[], answer (0-based index of correct option)
// ─────────────────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    title: "The 2030 Agenda",
    subtitle: "Sustainable Development Goals",
    icon: "🌍",
    color: "#0ea5e9",
    chapters: [
      {
        title: "The 5 P's of the 2030 Agenda",
        content: "The 2030 Agenda for Sustainable Development, adopted by all United Nations Member States in 2015, is structured around five critical dimensions known as the '5 P's':\n\n• People — End poverty and hunger in all forms and ensure dignity and equality.\n• Planet — Protect natural resources and combat climate change for future generations.\n• Prosperity — Ensure fulfilling and productive lives in harmony with nature.\n• Peace — Foster peaceful, just, and inclusive societies free from violence.\n• Partnership — Implement the agenda through global solidarity, mobilizing all resources and means.",
      },
      {
        title: "The 17 Sustainable Development Goals",
        content: "The 2030 Agenda contains 17 Sustainable Development Goals (SDGs) and 169 associated targets. Together, they provide a universal blueprint for peace and prosperity for people and the planet, to be achieved by the year 2030.\n\nThe SDGs build on the Millennium Development Goals (MDGs) and go further by addressing the root causes of poverty and the universal need for development that works for all people.",
      },
      {
        title: "SDG 6 — Clean Water and Sanitation",
        content: "SDG 6 aims to ensure the availability and sustainable management of water and sanitation for all by 2030. It has six main targets:\n\n• 6.1 — Achieve universal and equitable access to safe and affordable drinking water for all.\n• 6.2 — End open defecation; achieve access to adequate sanitation and hygiene for all.\n• 6.3 — Improve water quality by reducing pollution, eliminating dumping, and increasing safe water reuse.\n• 6.4 — Substantially increase water-use efficiency to address water scarcity.\n• 6.5 — Implement Integrated Water Resources Management (IWRM) at all levels.\n• 6.6 — Protect and restore water-related ecosystems, including mountains, forests, wetlands, and lakes.",
      },
    ],
    quiz: [
      { q: "Which of the 5 P's focuses on protecting natural resources and combating climate change?", options: ["People", "Planet", "Prosperity", "Partnership"], answer: 1 },
      { q: "What does SDG Target 6.5 specifically call for?", options: ["Universal access to safe drinking water", "End open defecation and provide sanitation", "Implementation of IWRM at all levels", "Protection and restoration of water ecosystems"], answer: 2 },
    ],
  },
  {
    id: 2,
    title: "NWRB Overview",
    subtitle: "Mandate, Vision & Mission",
    icon: "🏛️",
    color: "#38bdf8",
    chapters: [
      {
        title: "What is the NWRB?",
        content: "The National Water Resources Board (NWRB) is the primary government agency responsible for the regulation, conservation, and management of all water resources in the Philippines. It coordinates activities that affect the physical environment and the national economy related to water.\n\nInitially created as the National Water Resources Council (NWRC) under Presidential Decree 424 in 1974 and attached to the Department of Public Works, Transportation and Communications (DPWTC), it was renamed the NWRB through Executive Order 124-A in 1987 and later transferred to the DENR under EO 123 in 2002.",
      },
      {
        title: "Vision, Mission, and Functions",
        content: "Vision: Sustainable Water for a Healthy Nation.\n\nMission: To allocate sufficient water for optimal beneficial use, ensure access to safe water and adequate sanitation, and preserve flow regimes for ecological integrity.\n\nThe NWRB carries out three core functional areas:\n\n• Policy Formulation and Coordination — Drafting national plans such as the Philippine IWRM Plan Framework and Groundwater Management Plans.\n• Resource Regulation — Issuing water permits, resolving conflicts between water users, and monitoring compliance.\n• Economic Regulation — Granting Certificates of Public Convenience (CPC) to private water service providers, setting water tariffs, and protecting consumers while ensuring utility viability.",
      },
      {
        title: "The NWRB Board and Composition",
        content: "The NWRB is governed by a Board with the following composition:\n\n• Chairperson: Secretary of the Department of Environment and Natural Resources (DENR)\n• Vice-Chairperson: Secretary of DEPDev (formerly NEDA)\n• Members: Secretary of Justice, Secretary of Science and Technology, and the Executive Director of the UP-National Hydraulics Research Center\n\nDeputized agencies such as the National Irrigation Administration (NIA) and the Department of Public Works and Highways (DPWH) assist the NWRB in coordinating and regulating water-related activities across the country.",
      },
    ],
    quiz: [
      { q: "What is the official vision of the National Water Resources Board?", options: ["Clean Water for Every Filipino", "Sustainable Water for a Healthy Nation", "Water Security for Economic Growth", "Safe Water through Good Governance"], answer: 1 },
      { q: "Which NWRB function involves resolving conflicts between water users?", options: ["Economic Regulation", "Policy Formulation and Coordination", "Resource Regulation", "Environmental Monitoring"], answer: 2 },
    ],
  },
  {
    id: 3,
    title: "Legal Mandates",
    subtitle: "Key Legislation and History",
    icon: "📜",
    color: "#818cf8",
    chapters: [
      {
        title: "Historical Legislation Timeline",
        content: "Philippine water law has evolved through a series of presidential decrees and executive orders:\n\n• 1974 (PD 424) — Created the National Water Resources Council (NWRC), initially attached to the DPWTC.\n• 1976 (PD 1067) — Enacted the Water Code of the Philippines, the principal law governing water ownership and use.\n• 1977 (PD 1206) — Transferred residual functions of the Board of Waterworks to the NWRB.\n• 1987 (EO 124-A) — Renamed the NWRC to the National Water Resources Board (NWRB).\n• 2002 (EO 123) — Reconstituted the Board and transferred the NWRB to the DENR.\n• 2010 (EO 860) — Redefined the composition, powers, and functions of the NWRB Board.\n• 2023 (EO 22) — Established the Water Resources Management Office (WRMO) under DENR.",
      },
      {
        title: "Executive Order 22 and the WRMO",
        content: "Executive Order 22, signed in April 2023, established the Water Resources Management Office (WRMO) under the DENR. Its key mandates include:\n\n• Draft the Integrated Water Management Plan (IWMP) by coordinating with DENR-WRMO and NEDA.\n• Generate and maintain water and sanitation data for evidence-based planning.\n• Submit quarterly status reports on implementation directly to the President.\n• Collaborate with the private sector in pursuing its mandate.\n• Chair the Sub-Committee on Water Resources (SCWR) under the NEDA Infrastructure Committee.\n\nThe WRMO presages the eventual creation of a full Department of Water Resources.",
      },
    ],
    quiz: [
      { q: "Which executive order renamed the National Water Resources Council to the NWRB?", options: ["EO 123", "EO 860", "EO 124-A", "EO 22"], answer: 2 },
      { q: "Who serves as Chairperson of the NWRB Board?", options: ["Secretary of Justice", "Secretary of DEPDev (formerly NEDA)", "Secretary of the DENR", "Executive Director of UP-NHRC"], answer: 2 },
    ],
  },
  {
    id: 4,
    title: "WRMO & IWMP",
    subtitle: "Water Resources Management Office",
    icon: "🗂️",
    color: "#34d399",
    chapters: [
      {
        title: "Institutional Structure of the Water Sector",
        content: "The Philippine water sector involves a complex institutional framework. Key agencies and their roles include:\n\n• Watershed Management — FMB, NIA, LGUs\n• Data Collection — PAGASA, MGB\n• Flood Management — DPWH, MMDA\n• Policy Making — DEPDev (formerly NEDA), NWRB\n\nUnder EO 22, the following agencies are 'attached' to the DENR: NWRB, MWSS (Metropolitan Waterworks and Sewerage System), LWUA (Local Water Utilities Administration), and LLDA (Laguna Lake Development Authority).\n\nWater quality testing for potability is prescribed by the Department of Health (DOH).",
      },
      {
        title: "The Integrated Water Management Plan (IWMP)",
        content: "The IWMP is the flagship output of the WRMO. It was prepared by reviewing existing plans including the National Water Security Roadmap and the Philippine Water Supply and Sanitation Master Plan (2019–2030).\n\nThe IWMP focuses on:\n• Reforming water governance and regulatory instruments.\n• Integrating water security planning across all sectors.\n• Establishing resource allocation plans for equitable water distribution.\n\nGood water governance requires empowered institutions and strong regulatory frameworks. The IWMP is led jointly by DENR-WRMO and DEPDev.",
      },
      {
        title: "Climate Change Impacts on Water",
        content: "Climate change poses significant threats to water resources in the Philippines. The Climate-Resilient Water Resources Management Program aims to incorporate long-term hydrological changes using advanced technology for improved operations (e.g., new reservoir operation rules for Angat Dam every five years).\n\nKey climate impacts on Philippine ecosystems include:\n• Extreme heat and prolonged drought\n• Extreme rainfall events and flooding\n• Sea level rise affecting coastal freshwater\n• Crop damage, soil deterioration, and loss of biodiversity\n\nThese changes are expected to significantly decrease the supply of both surface water and groundwater.",
      },
    ],
    quiz: [
      { q: "What was the WRMO primarily established to draft?", options: ["National Climate Adaptation Plan", "Integrated Water Management Plan (IWMP)", "Philippine Water Tariff Framework", "National Sanitation Roadmap"], answer: 1 },
      { q: "Which agency is primarily responsible for flood management in the Philippines?", options: ["PAGASA and MGB", "FMB and NIA", "DPWH and MMDA", "DEPDev and NWRB"], answer: 2 },
    ],
  },
  {
    id: 5,
    title: "Water Code",
    subtitle: "Presidential Decree 1067 (1976)",
    icon: "⚖️",
    color: "#fbbf24",
    chapters: [
      {
        title: "The Regalian Doctrine and Water Ownership",
        content: "Presidential Decree 1067, the Water Code of the Philippines (1976), consolidates all laws governing the ownership, appropriation, utilization, and protection of water resources.\n\nUnder the Regalian Doctrine, all waters belong to the State and cannot be acquired through acquisitive prescription — meaning no private person can claim ownership of water through long use.\n\n'Waters' under the Code refers to:\n• Water under the ground (groundwater)\n• Water above the ground (surface water)\n• Water in the atmosphere\n• The waters of the sea within Philippine territorial jurisdiction\n\nThe State allows use of water through administrative concessions in the form of Water Permits.",
      },
      {
        title: "Water Rights, Uses, and Priorities",
        content: "A Water Right is the privilege granted by the government to a qualified person to appropriate and use water from a specific source. The legal evidence of a water right is called a Water Permit.\n\nPermitted purposes for water use include:\n• Domestic (household needs)\n• Municipal (community water supply)\n• Irrigation\n• Power Generation\n• Fisheries\n• Livestock Raising\n• Industrial\n• Recreational\n\nIn times of emergency or water scarcity, Domestic and Municipal uses are given priority over all other uses.\n\nEligible applicants for water permits include: Philippine citizens and government entities or instrumentalities.",
      },
      {
        title: "Water Permits and the CPC",
        content: "Appropriation of water — except for family domestic use — requires a Water Permit from the NWRB Council. Within one year of approval, the permit grantee must submit plans and specifications for diversion works and distribution systems.\n\nIf the grantee intends to operate a water system for public use, they must also file for a Certificate of Public Convenience (CPC). The NWRB performs economic regulation by granting CPCs to private water service providers (WSPs) to ensure they remain economically viable while protecting consumers.\n\nUnder the CPC Registration Program, unregistered WSPs must register with the NWRB within 180 days from the effectivity of the program. A Certificate of Potability — issued within six months prior to application — is required, with Physical and Chemical impurity tests conducted at least once per year.\n\nPermit holders must install measuring devices to monitor water levels and extraction. Testing and sealing of meters is done by the NWRB's Monitoring and Enforcement Division.",
      },
    ],
    quiz: [
      { q: "Under the Regalian Doctrine, who do all waters in the Philippines belong to?", options: ["Local Government Units", "The State", "Private Landowners", "The NWRB"], answer: 1 },
      { q: "Which water use does NOT require a water permit under the Water Code?", options: ["Irrigation", "Industrial use", "Family domestic use", "Power generation"], answer: 2 },
    ],
  },
  {
    id: 6,
    title: "Water Facts",
    subtitle: "Global & Local Insights",
    icon: "💧",
    color: "#fb7185",
    chapters: [
      {
        title: "Global Water Resources",
        content: "Water is one of the Earth's most vital resources, yet it is surprisingly scarce in usable form:\n\n• 97.2% of all global water is salt water found in the oceans.\n• Only 2.8% is fresh water — and most of that is locked in glaciers and icecaps.\n• A very small fraction is accessible as surface water (rivers and lakes) or groundwater.\n\nThe Philippines has a total surface water potential of 125.8 billion m³ across 421 rivers and 79 lakes. Groundwater potential is estimated at 20.2 billion m³. Approximately 58% of water resources are currently allocated based on issued water permits.",
      },
      {
        title: "Water and the Human Body",
        content: "Water is essential to human survival. Key facts:\n\n• Humans can survive only 3 days without water, compared to about 21 days without food.\n• Water makes up 83% of human blood.\n• 75% of the brain and muscles are composed of water.\n• 22% of human bones are water.\n\nThese facts underscore why access to safe water is a fundamental human right and a development priority under SDG 6.",
      },
      {
        title: "H₂O Facts and Shared Responsibility",
        content: "Water has unique physical properties that support all life on Earth:\n\n• Water is the only naturally occurring substance that exists in all three physical states: solid (ice), liquid (water), and gas (water vapor).\n• A single faucet leaking at just one drip per second can waste up to 3,000 gallons of water per year.\n\nEfficient water management is a shared responsibility that requires collaboration across all sectors. 'Water smart' behaviors include:\n• Fixing leaks promptly\n• Taking shorter showers\n• Using low-flow fixtures\n• Reporting water waste in public spaces\n\nIn the Philippines, two water uses are given priority in emergencies: Domestic and Municipal use.",
      },
    ],
    quiz: [
      { q: "What percentage of global water is fresh water?", options: ["10.5%", "2.8%", "15.2%", "5.0%"], answer: 1 },
      { q: "Water makes up what percentage of human blood?", options: ["75%", "22%", "83%", "90%"], answer: 2 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FINAL QUIZ
// Types: "mc" (multiple choice), "tf" (true/false), "fitb" (fill in the blank),
//        "multi" (select exactly 3 correct answers from 5 options)
// Grouped by module coverage for balanced assessment.
// ─────────────────────────────────────────────────────────────────────────────
const FINAL_QUIZ = [

  // ── MODULE 1: The 2030 Agenda ─────────────────────────────────────────────
  { type: "mc",
    q: "What is the target year for achieving the Sustainable Development Goals under the 2030 Agenda?",
    options: ["2025", "2030", "2035", "2040"],
    answer: 1 },

  { type: "tf",
    q: "SDG 6.2 specifically targets increasing water-use efficiency to address water scarcity.",
    answer: false },

  { type: "fitb",
    q: "The 2030 Agenda is built around five dimensions called the '5 _____'.",
    answer: "p's" },

  { type: "multi",
    q: "Which of the following are among the 5 P's of the 2030 Agenda? (Select 3)",
    options: ["People", "Power", "Planet", "Prosperity", "Progress"],
    answer: [0, 2, 3] },

  // ── MODULE 2: NWRB Overview ───────────────────────────────────────────────
  { type: "mc",
    q: "What is the official vision of the National Water Resources Board?",
    options: ["Clean Water for Every Filipino", "Sustainable Water for a Healthy Nation", "Water Security for Economic Growth", "Safe Water through Good Governance"],
    answer: 1 },

  { type: "tf",
    q: "The NWRB Board is chaired by the Secretary of the DENR.",
    answer: true },

  { type: "fitb",
    q: "The NWRB performs Economic Regulation by setting water _____ for private providers.",
    answer: "tariffs" },

  { type: "multi",
    q: "Which of the following are core functional areas of the NWRB? (Select 3)",
    options: ["Policy Formulation", "Military Coordination", "Resource Regulation", "Economic Regulation", "Land Surveying"],
    answer: [0, 2, 3] },

  // ── MODULE 3: Legal Mandates ──────────────────────────────────────────────
  { type: "mc",
    q: "Which executive order established the Water Resources Management Office (WRMO) under DENR?",
    options: ["EO 123", "EO 860", "EO 22", "EO 124-A"],
    answer: 2 },

  { type: "tf",
    q: "Presidential Decree 424, which created the NWRC, was enacted in 1974.",
    answer: true },

  { type: "fitb",
    q: "EO 124-A renamed the National Water Resources Council to the National Water Resources _____.",
    answer: "board" },

  // ── MODULE 4: WRMO & IWMP ─────────────────────────────────────────────────
  { type: "mc",
    q: "Which agencies are responsible for leading reform in governance and regulations under the IWMP?",
    options: ["PAGASA and MGB", "DPWH and MMDA", "DENR-WRMO and DEPDev", "NIA and LWUA"],
    answer: 2 },

  { type: "tf",
    q: "The WRMO submits a quarterly status report on implementation to the President.",
    answer: true },

  { type: "multi",
    q: "Which of the following agencies are officially 'attached' to the DENR under EO 22? (Select 3)",
    options: ["NWRB", "PAGASA", "MWSS", "LLDA", "DPWH"],
    answer: [0, 2, 3] },

  // ── MODULE 5: Water Code ──────────────────────────────────────────────────
  { type: "mc",
    q: "Presidential Decree 1067 enacted in 1976 is officially known as:",
    options: ["Clean Water Act", "Water Resources Code", "Water Code of the Philippines", "Environmental Management Act"],
    answer: 2 },

  { type: "tf",
    q: "Under the Water Code, all waters belong to the State and cannot be acquired through acquisitive prescription.",
    answer: true },

  { type: "fitb",
    q: "The legal document that serves as evidence of a water right is called a Water _____.",
    answer: "permit" },

  { type: "mc",
    q: "What does CPC stand for in the context of NWRB economic regulation?",
    options: ["Central Planning Coordination", "Certificate of Public Convenience", "Community Protection Charter", "Comprehensive Permit Clearance"],
    answer: 1 },

  // ── MODULE 6: Water Facts ─────────────────────────────────────────────────
  { type: "mc",
    q: "What percentage of global water is fresh water?",
    options: ["10.5%", "2.8%", "15.2%", "5.0%"],
    answer: 1 },

  { type: "tf",
    q: "Water is the only substance found naturally in three physical forms: solid, liquid, and gas.",
    answer: true },

  { type: "fitb",
    q: "Humans can survive only _____ days without water.",
    answer: "3" },

  { type: "multi",
    q: "Which of the following are SDG 6 targets? (Select 3)",
    options: ["Safe drinking water", "Zero hunger", "End open defecation", "Renewable energy", "Protect water ecosystems"],
    answer: [0, 2, 4] },
];

const TOTAL_ITEMS = FINAL_QUIZ.length;

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARDS
// Each card: { q: "question or fill-in-the-blank", a: "answer" }
// Organized to match module content and final quiz topics.
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARDS = [

  // Module 1 — The 2030 Agenda
  { q: "What year is the target for achieving the Sustainable Development Goals?", a: "2030" },
  { q: "How many Sustainable Development Goals are in the 2030 Agenda?", a: "17 SDGs" },
  { q: "The 2030 Agenda is built around five dimensions known as the '5 _____'.", a: "P's (People, Planet, Prosperity, Peace, Partnership)" },
  { q: "Which SDG specifically targets clean water and sanitation for all?", a: "SDG Goal 6" },
  { q: "SDG 6.1 focuses on universal access to safe and _____ drinking water.", a: "Affordable" },
  { q: "SDG 6.2 aims to end _____ and provide access to sanitation and hygiene.", a: "Open defecation" },
  { q: "SDG 6.3 aims to improve water quality by reducing pollution and increasing safe _____.", a: "Reuse" },
  { q: "SDG 6.4 specifically focuses on increasing water-use _____ to address water scarcity.", a: "Efficiency" },
  { q: "SDG 6.5 calls for the implementation of _____ at all levels.", a: "Integrated Water Resources Management (IWRM)" },
  { q: "SDG 6.6 focuses on the protection and restoration of water-related _____.", a: "Ecosystems" },

  // Module 2 — NWRB Overview
  { q: "What government agency is primarily responsible for managing all water resources in the Philippines?", a: "National Water Resources Board (NWRB)" },
  { q: "What is the official vision of the NWRB?", a: "Sustainable Water for a Healthy Nation" },
  { q: "The NWRB performs Economic Regulation by setting water _____ for private water providers.", a: "Tariffs" },
  { q: "Which NWRB function involves issuing water permits and monitoring compliance?", a: "Resource Regulation" },
  { q: "Who serves as the Chairperson of the NWRB Board?", a: "Secretary of the DENR" },
  { q: "Who serves as the Vice-Chairperson of the NWRB Board?", a: "Secretary of DEPDev (formerly NEDA)" },
  { q: "What are the three core functional areas of the NWRB?", a: "Policy Formulation and Coordination, Resource Regulation, and Economic Regulation" },
  { q: "PD 424 created the NWRC and initially attached it to which department?", a: "Department of Public Works, Transportation and Communications (DPWTC)" },

  // Module 3 — Legal Mandates
  { q: "Which executive order renamed the NWRC to the NWRB in 1987?", a: "Executive Order 124-A" },
  { q: "Which executive order transferred the NWRB to the DENR in 2002?", a: "Executive Order 123" },
  { q: "Which 2023 executive order created the Water Resources Management Office (WRMO)?", a: "Executive Order 22 (EO 22)" },
  { q: "EO 22 mandates the WRMO to collaborate with which sector in pursuing its mandate?", a: "The private sector" },
  { q: "The WRMO submits implementation reports to the President every _____.", a: "Quarter (quarterly)" },
  { q: "The WRMO serves as chair for which committee under the NEDA Infrastructure Committee?", a: "Sub-Committee on Water Resources (SCWR)" },
  { q: "Presidential Decree 1067, enacted in 1976, is also known as the _____.", a: "Water Code of the Philippines" },

  // Module 4 — WRMO & IWMP
  { q: "What is the flagship output of the WRMO that guides national water management?", a: "Integrated Water Management Plan (IWMP)" },
  { q: "Which agencies are attached to the DENR under EO 22? (name three)", a: "NWRB, MWSS, LWUA, and LLDA" },
  { q: "Climate change is expected to significantly decrease the supply of renewable _____ resources.", a: "Surface water and groundwater" },
  { q: "Which agency prescribes parameters for water quality testing to ensure potability?", a: "Department of Health (DOH)" },
  { q: "Which agency is primarily responsible for flood management in Metro Manila?", a: "DPWH and MMDA" },
  { q: "IWRM coordinates the management of water, land, and _____ to maximize social welfare.", a: "Related resources" },
  { q: "What process aims to maximize economic and social welfare without compromising ecosystem sustainability?", a: "Integrated Water Resources Management (IWRM)" },

  // Module 5 — Water Code
  { q: "Under the Regalian Doctrine, all waters belong to the _____.", a: "State" },
  { q: "Waters belonging to the State cannot be the subject of _____ prescription.", a: "Acquisitive" },
  { q: "A water right is a privilege granted by the government to appropriate and use _____.", a: "Water" },
  { q: "The legal document that serves as evidence of a water right is called a Water _____.", a: "Permit" },
  { q: "Which two water uses are given priority during times of emergency or water scarcity?", a: "Domestic and Municipal use" },
  { q: "What document must a water system operator file to serve the public?", a: "Certificate of Public Convenience (CPC)" },
  { q: "What does CPC stand for in water service regulation?", a: "Certificate of Public Convenience" },
  { q: "Under the CPC Registration Program, unregistered WSPs must register within _____ days.", a: "180 days from the effectivity of the program" },
  { q: "A Certificate of Potability for a CPC application must be issued within _____ months prior to filing.", a: "Six (6) months" },
  { q: "Physical and Chemical impurity tests for a CPC application must be conducted at least _____ per year.", a: "Once (one year)" },
  { q: "What must a water permit grantee submit within one year of approval?", a: "Plans and specifications for diversion works and distribution systems" },

  // Module 6 — Water Facts
  { q: "What percentage of global water is salt water?", a: "97.2%" },
  { q: "What percentage of global water is fresh water?", a: "2.8%" },
  { q: "Humans can survive only _____ days without water.", a: "3 days" },
  { q: "Water makes up what percentage of human blood?", a: "83%" },
  { q: "Water is the only substance naturally found in _____ physical forms.", a: "Three (solid, liquid, and gas)" },
  { q: "A faucet leaking at one drip per second can waste how many gallons per year?", a: "3,000 gallons" },
  { q: "What is the estimated surface water potential of the Philippines?", a: "125.8 billion m³" },
  { q: "What is the estimated groundwater potential of the Philippines?", a: "20.2 billion m³" },
  { q: "Approximately what percentage of Philippine water resources are currently allocated?", a: "58% (based on issued water permits)" },
  { q: "How many rivers are identified as part of the Philippines' water resources potential?", a: "421 rivers" },
  { q: "How many lakes are identified in the Philippines' water resources potential?", a: "79 lakes" },
];

// ─────────────────────────────────────────────────────────────────────────────
// LEGAL REFERENCES
// ─────────────────────────────────────────────────────────────────────────────
const LEGAL_REFS = [
  {
    code: "PD 424", year: "1974",
    title: "Creating the National Water Resources Council",
    desc: "Established the National Water Resources Council (NWRC), the precursor to the NWRB, initially attached to the Department of Public Works, Transportation and Communications.",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/26/25290",
    color: "#0ea5e9",
  },
  {
    code: "PD 1067", year: "1976",
    title: "Water Code of the Philippines",
    desc: "The principal law governing the ownership, appropriation, utilization, exploitation, development, conservation, and protection of water resources in the Philippines.",
    url: "https://lawphil.net/statutes/presdecs/pd1976/pd_1067_1976.html",
    color: "#34d399",
  },
  {
    code: "PD 1206", year: "1977",
    title: "Assigning Residual Functions to NWRB",
    desc: "Transferred the residual functions and powers of the Board of Waterworks and Sewerage to the National Water Resources Board.",
    url: "https://lawphil.net/statutes/presdecs/pd1977/pd_1206_1977.html",
    color: "#818cf8",
  },
  {
    code: "EO 124-A", year: "1987",
    title: "Renaming NWRC to NWRB",
    desc: "Officially renamed the National Water Resources Council (NWRC) to the National Water Resources Board (NWRB).",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/5/7753",
    color: "#a78bfa",
  },
  {
    code: "EO 123", year: "2002",
    title: "Reconstituting the NWRB Board",
    desc: "Reconstituted the NWRB Board and transferred the agency to the Department of Environment and Natural Resources (DENR).",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/50199",
    color: "#fbbf24",
  },
  {
    code: "EO 860", year: "2010",
    title: "Redefining NWRB Composition and Powers",
    desc: "Redefined the composition, powers, and functions of the National Water Resources Board to strengthen water governance.",
    url: "http://www.b.lawphil.net/executive/execord/eo2010/eo_860_2010.html",
    color: "#fb7185",
  },
  {
    code: "EO 22", year: "2023",
    title: "Establishing the WRMO",
    desc: "Created the Water Resources Management Office (WRMO) under DENR, tasked with drafting the Integrated Water Management Plan (IWMP) and generating water and sanitation data.",
    url: "https://lawphil.net/executive/execord/eo2023/eo_22_2023.html",
    color: "#4ade80",
  },
];

export {
  DENR_LOGO,
  MODULES,
  FINAL_QUIZ,
  TOTAL_ITEMS,
  FLASHCARDS,
  LEGAL_REFS,
};
