// ── data.js ──────────────────────────────────────────────────────────────────
// Edit this file to update course content, quiz questions, and flashcards.
// Do NOT import React here — this is pure data.
// ─────────────────────────────────────────────────────────────────────────────

const DENR_LOGO = "data:image/png;base64,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";

// ─────────────────────────────────────────────────────────────────────────────
// MODULES — Course Content (all content derived from the CSV flashcard source)
// Interactive hints use these prefixes in content:
//   ❓ = did-you-know callout
//   📌 = key fact to remember
//   ⚖️  = legal provision
//   💡 = practical insight
// ─────────────────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    title: "NWRB Overview",
    subtitle: "Mandate, Board & Functions",
    icon: "🏛️",
    color: "#0ea5e9",
    chapters: [
      {
        title: "Mandate and Identity of the NWRB",
        content: `The National Water Resources Board (NWRB) is the national coordinating and regulating body for water resources management in the Philippines.

📌 Under Executive Order No. 123 (2002), the NWRB was transferred to the Department of Environment and Natural Resources (DENR). This transfer aligned water governance with environmental policy.

❓ Did you know? Despite its name, the NWRB is NOT the same entity as Maynilad or Manila Water. Those are private water concessionaires that serve consumers. The NWRB is purely a regulatory and coordinating body.

The NWRB's official vision is: Sustainable Water for a Healthy Nation.

Under Economic Regulation, the NWRB sets water tariffs for private water providers, ensuring those tariffs are just and reasonable — this is how consumers are protected from arbitrary pricing.`,
      },
      {
        title: "Board Composition",
        content: `The NWRB is governed by a multi-agency Board that ensures coordinated national oversight:

• Chairperson: Secretary of the Department of Environment and Natural Resources (DENR)
• Vice-Chairperson: Secretary of Department of Economy, Planning and Development (DEPDev)
• Member: Secretary of the Department of Science and Technology (DOST)

⚖️ According to the Water Code, the two entities currently deputized as agents of the NWRB are:
• DPWH (Department of Public Works and Highways)
• NIA (National Irrigation Administration)

💡 The NWRB also approves monthly water releases from Angat Dam for Metro Manila's water supply and irrigation needs. This is one of its most operationally critical functions.`,
      },
      {
        title: "Three Major Functions of the NWRB",
        content: `The NWRB carries out three core functional areas:

1. Policy Formulation and Coordination
Develops national water plans, including frameworks for Integrated Water Resources Management (IWRM). IWRM stands for Integrated Water Resources Management — a coordinated approach to managing water, land, and related resources to maximize economic and social welfare equitably without compromising ecosystem sustainability.

2. Resource Regulation
Issues and monitors Water Permits for all water uses. Resolves conflicts between water users. Manages permit suspensions and revocations. Permit holders must submit a Record of Water Withdrawal to the NWRB on a quarterly basis.

3. Economic Regulation
Grants Certificates of Public Convenience (CPC) to private water service providers. Sets water tariffs to protect consumers. Requires Annual Reports of Operations to be submitted on or before May 30th of every year.

📌 In 2023, the Water Resources Management Office (WRMO) was created under the DENR to strengthen national water management coordination.`,
      },
    ],
    quiz: [
      {
        q: "Which government agency is the national coordinating and regulating body for water resources management in the Philippines?",
        options: [
          "Metropolitan Waterworks and Sewerage System (MWSS)",
          "National Water Resources Board (NWRB)",
          "Department of Public Works and Highways (DPWH)",
          "Local Water Utilities Administration (LWUA)",
        ],
        answer: 1,
      },
      {
        q: "Under Executive Order No. 123 (2002), the NWRB was transferred to which executive department?",
        options: [
          "Department of Agriculture",
          "Department of Science and Technology",
          "Department of Environment and Natural Resources (DENR)",
          "Department of Public Works and Highways",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: 2,
    title: "Water Code",
    subtitle: "Presidential Decree 1067 (1976)",
    icon: "⚖️",
    color: "#fbbf24",
    chapters: [
      {
        title: "The Regalian Doctrine and Water Ownership",
        content: `Presidential Decree No. 1067, commonly known as the Water Code of the Philippines, is the foundational law governing water ownership, appropriation, utilization, and management in the country.

⚖️ Article 3 establishes the Regalian Doctrine for water: all waters belong to the State. The Regalian Doctrine refers to the State's ownership of all natural resources — water is one of the most fundamental of these.

⚖️ Article 6: A landowner may use water found on their land for domestic purposes without a permit. However, all other uses require a Water Permit from the NWRB.

📌 Under the Water Code, the State has the power to declare certain waters exempt from appropriation for public policy reasons.

❓ Did you know? The term 'Appropriation of Water' means the acquisition of rights over the use of waters, or the taking of waters from a natural source for law-allowed purposes.

⚖️ Presidential Decree No. 1206 assigned the residual functions of the defunct Public Service Commission to the NWRB, expanding its regulatory scope over water utilities.`,
      },
      {
        title: "Water Rights, Uses, and Permit Process",
        content: `Key definitions under the Water Code:

• Water Permit — The formal document that serves as evidence of a 'water right' granted by the government. A water right is the privilege to appropriate and use water.
• Beneficial Use — The utilization of water in the right amount during the period needed to produce benefits. This is the measure and limit of all water appropriation.

Water Use Categories (require a Water Permit):
Domestic use · Municipal use (community piped distribution) · Irrigation · Power Generation · Fisheries · Livestock Raising (large commercial herds/flocks) · Industrial use · Recreational use

📌 Livestock Raising as a permitted water use specifically involves large herds or flocks of animals raised as a commercial enterprise — not simple backyard farming.

💡 To qualify for a water permit, a corporation must have at least 60% of its capital owned by Philippine citizens.

⚖️ The '15-day posting' period in the Water Permit Application process exists to allow for potential protests or objections from other parties before a permit is granted.`,
      },
      {
        title: "Legal Easements, Fees, and Compliance",
        content: `Legal Easement Distances (public use along river banks):
• Urban areas: 3 meters
• Agricultural areas: 20 meters
• Forest areas: 40 meters

Filing Fees for Water Permit Applications:
• Level I and II Municipal use: P 550.00
• Most Industrial or Power Generation purposes: P 7,200.00

⚖️ A 'Conditional Water Permit' (CWP) is typically valid for 1 year before a permanent permit is issued. The applicant must submit plans and specifications for construction works within this period.

⚖️ Non-use of water for the purpose stipulated in a permit for three consecutive years renders the permit null and void.

📌 Before constructing a dam for water diversion, approval of plans and specifications by the NWRB is required — except in emergencies.

💡 A 'Certificate of Potability' verifies that the water is safe for human consumption. It is a required document in the CPC application process.

⚖️ The establishment of cemeteries or waste disposal areas requires approval from the Department of Health if they may affect water sources.`,
      },
    ],
    quiz: [
      {
        q: "What is the common name for Presidential Decree No. 1067?",
        options: [
          "Clean Water Act of the Philippines",
          "National Water Resources Act",
          "The Water Code of the Philippines",
          "Water Appropriation Act",
        ],
        answer: 2,
      },
      {
        q: "Under Article 6 of the Water Code, a landowner may use water found on their land for _____ purposes without a permit.",
        options: ["Irrigation", "Domestic", "Municipal", "Commercial"],
        answer: 1,
      },
    ],
  },

  {
    id: 3,
    title: "Water Permits & CPC",
    subtitle: "Regulation, Compliance & Fees",
    icon: "📋",
    color: "#34d399",
    chapters: [
      {
        title: "Certificate of Public Convenience (CPC)",
        content: `A Certificate of Public Convenience (CPC) is the formal authority that private water utilities must obtain from the NWRB to operate, maintain systems, and charge water rates to the public.

📌 Standard validity period: 5 years.

The CPC is how the NWRB exercises Economic Regulation — ensuring utilities remain financially viable while protecting consumers from unreasonable pricing.

NWRB protects consumers by ensuring water tariffs are just and reasonable. This consumer protection mandate is central to the Economic Regulation function.

⚖️ Annual Report of Operations must be submitted to the NWRB on or before May 30th of every year by CPC holders.

💡 A Certificate of Potability verifies that the water is safe for human consumption — this is a key submission requirement in the CPC application process.`,
      },
      {
        title: "Water Permit Types and Transfer",
        content: `Types of Water Permits:

• Conditional Water Permit (CWP) — Valid for 1 year. Issued while the applicant prepares construction plans and specs for water diversion works. Converts to a permanent permit once requirements are met.
• Permanent Water Permit — The standard permit issued after compliance with all conditions.

⚖️ Non-use of water for three consecutive years renders a water permit null and void.

Transfer of Water Permits:
A verified petition for the Transfer of a water permit must be filed if the permit holder changes. This ensures that water rights are properly tracked and assigned through official NWRB processes.

Permit holders must submit a Record of Water Withdrawal to the NWRB on a quarterly basis to monitor actual water use versus allocated amounts.

📌 Under the Water Code, the State has the power to declare certain waters exempt from appropriation for public policy reasons — for example, to protect critical water sources or ecosystems.`,
      },
      {
        title: "Streamflow Measurement Methods",
        content: `Accurate stream flow measurement is essential for water permit enforcement and resource monitoring. The NWRB uses two primary field methods:

1. Current Meter Method (Primary Method)
The primary method used by NWRB staff for stream flow calculation. Uses a current meter device to measure water velocity at multiple points across the channel cross-section.
• More accurate than the float method
• Standard for official permit compliance monitoring

2. Float Method (Simple Estimation)
Uses an object like an orange peel to estimate water velocity.
• Formula: Q = AV(Coef)
  - Q = Flow rate (Discharge)
  - A = Cross-sectional area of the channel
  - V = Velocity measured by the float
  - Coef = 0.85 (standard correction coefficient)

3. V-Notch Weir Method
Uses a notched weir structure to measure the discharge of small streams.

📌 In the stream flow equation Q = AV(Coef), Q represents flow rate or discharge. The coefficient of 0.85 corrects for the fact that surface velocity is faster than average cross-sectional velocity.

💡 Water sources are classified by type: Deepwells (DW) are Groundwater sources; Rivers or Creeks are Surface Water sources.`,
      },
    ],
    quiz: [
      {
        q: "What formal authority must private water utilities obtain from the NWRB to operate and charge rates?",
        options: [
          "Water Permit",
          "Environmental Compliance Certificate",
          "Certificate of Public Convenience (CPC)",
          "Certificate of Potability",
        ],
        answer: 2,
      },
      {
        q: "What is the primary method used by NWRB staff for stream flow calculation?",
        options: [
          "Float Method",
          "V-Notch Weir Method",
          "Current Meter Method",
          "Acoustic Doppler Method",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: 4,
    title: "Philippine Water Resources",
    subtitle: "Supply, Demand & Hydrologic Facts",
    icon: "🇵🇭",
    color: "#fb7185",
    chapters: [
      {
        title: "Rainfall, River Basins, and Planning Regions",
        content: `The Philippines is endowed with significant water resources, though distribution is uneven across the archipelago.

📌 Average Annual Rainfall: 2,400 mm — one of the highest in Asia.

📌 Total Water Resources Potential: 146 billion m³ per year.

📌 Water Resources Regions: The Philippines is divided into 12 Water Resources Regions for planning and management purposes.

Principal River Basins:
• 421 principal river basins identified in the Philippines
• The largest by drainage area: Cagayan River Basin
• The second largest: Mindanao River Basin
• The third largest: Agusan River Basin at 10,921 sq.km.

❓ Did you know? The NWRB approves monthly water releases from Angat Dam, which is the critical surface water source supplying Metro Manila's domestic water and surrounding irrigation systems.`,
      },
      {
        title: "Water Use and Threats",
        content: `Water Use by Sector:
According to 2016 data, Agriculture (Irrigation) is the largest consumer of allocated water resources in the Philippines — consuming the majority of the country's water allocation.

Water-stressed cities in the Philippines (per JICA study):
Metro Manila, Cebu, Davao, and other major urban centers face chronic water stress where demand increasingly exceeds available supply.

Key Threats to Philippine Water Resources:

1. Population Growth
The main threat related to population growth is increased pressure on resource supply and service delivery systems — more people means more demand for the same limited supply.

2. Water Quality Deterioration
Pollution from agricultural runoff, domestic sewage, and industrial discharge reduces usable supply.

3. Over-extraction of Groundwater
Excessive pumping causes aquifer depletion and saltwater intrusion in coastal areas.

📌 The primary objective of Integrated Water Resources Management (IWRM) is to maximize economic and social welfare equitably without compromising ecosystem sustainability.`,
      },
    ],
    quiz: [
      {
        q: "How many principal river basins are identified in the Philippines?",
        options: ["211", "321", "421", "521"],
        answer: 2,
      },
      {
        q: "According to 2016 data, which sector is the largest consumer of allocated water resources in the Philippines?",
        options: [
          "Municipal water supply",
          "Industrial use",
          "Agriculture (Irrigation)",
          "Domestic household use",
        ],
        answer: 2,
      },
    ],
  },

  {
    id: 5,
    title: "Water Facts",
    subtitle: "Global Hydrology & Conservation",
    icon: "💧",
    color: "#38bdf8",
    chapters: [
      {
        title: "Global Water Distribution",
        content: `Water covers about 71% of the Earth's surface, yet most of it is not directly usable by humans.

📌 Approximately 2.8% of the Earth's total water is freshwater. The rest — about 97.2% — is saltwater in the oceans.

📌 Of the total freshwater on Earth, the vast majority is locked in ice caps and glaciers. Only a small fraction is accessible as groundwater or surface water.

❓ Did you know? The Philippines has a total water resources potential of 146 billion m³ per year — but uneven seasonal distribution means many areas still face water shortages despite this abundance.

Global water scarcity is a growing challenge. Population growth, climate change, and pollution reduce available freshwater faster than it can be replenished. This is why frameworks like IWRM (Integrated Water Resources Management) exist — to maximize social welfare from water use without degrading ecosystems.`,
      },
      {
        title: "Water Conservation and Priority",
        content: `Water conservation is everyone's responsibility — from government to individual households.

Why conservation matters:
• Freshwater is only about 2.8% of all water on Earth
• Demand exceeds supply in many Philippine cities (Metro Manila, Cebu, Davao)
• Population growth increases pressure on existing water sources

⚖️ Under the Water Code, Domestic and Municipal uses are given priority over all other water uses in times of emergency — these two categories take absolute precedence.

Water Smart Behaviors:
• Fix leaks — even small drips waste significant volumes annually
• Report unauthorized water use to your LGU or water district
• Avoid pouring chemicals down drains — protect groundwater quality

📌 A verified petition for the Transfer of a water permit must be filed when a permit holder changes — this prevents informal or unauthorized trading of water rights.

💡 IWRM — Integrated Water Resources Management — coordinates the management of water and land to maximize economic and social welfare equitably without compromising ecosystem sustainability. This is the primary policy framework for addressing water challenges in the Philippines.`,
      },
    ],
    quiz: [
      {
        q: "Approximately what percentage of the Earth's total water is freshwater?",
        options: ["10.5%", "2.8%", "15.2%", "5.0%"],
        answer: 1,
      },
      {
        q: "What is the primary objective of Integrated Water Resources Management (IWRM)?",
        options: [
          "To build more water dams and reservoirs",
          "To privatize water distribution systems",
          "To maximize economic and social welfare equitably without compromising ecosystem sustainability",
          "To ensure the NWRB controls all water in the Philippines",
        ],
        answer: 2,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FINAL QUIZ — 22 questions; all multi-type have exactly 3 correct answers
// ─────────────────────────────────────────────────────────────────────────────
const FINAL_QUIZ = [
  // ── Module 1: NWRB Overview ──────────────────────────────────────────────
  {
    type: "mc",
    q: "Which government agency is the national coordinating and regulating body for water resources management in the Philippines?",
    options: [
      "Metropolitan Waterworks and Sewerage System (MWSS)",
      "National Water Resources Board (NWRB)",
      "Local Water Utilities Administration (LWUA)",
      "Department of Public Works and Highways (DPWH)",
    ],
    answer: 1,
  },
  {
    type: "tf",
    q: "The NWRB is the same entity as Maynilad or Manila Water.",
    answer: false,
  },
  {
    type: "fitb",
    q: "The NWRB's vision is 'Sustainable Water for a _____ Nation.'",
    answer: "healthy",
  },
  {
    type: "mc",
    q: "Who serves as the Chair of the NWRB Board?",
    options: [
      "Secretary of DEPDev",
      "Secretary of DOST",
      "Secretary of the DENR",
      "Executive Director of UP-NHRC",
    ],
    answer: 2,
  },
  {
    type: "multi",
    q: "Which of the following are among the three major functions of the NWRB? (Select 3)",
    options: [
      "Policy Formulation and Coordination",
      "Flood Control and Infrastructure Construction",
      "Resource Regulation",
      "Economic Regulation",
      "Environmental Impact Assessment",
    ],
    answer: [0, 2, 3],
  },
  {
    type: "mc",
    q: "Under economic regulation, the NWRB sets water _____ for private water providers.",
    options: ["Quotas", "Tariffs", "Licenses", "Zones"],
    answer: 1,
  },
  {
    type: "fitb",
    q: "In the context of the NWRB, 'IWRM' stands for Integrated Water _____ Management.",
    answer: "resources",
  },

  // ── Module 2: Water Code ─────────────────────────────────────────────────
  {
    type: "mc",
    q: "What is the common name for Presidential Decree No. 1067?",
    options: [
      "Clean Water Act of the Philippines",
      "National Water Resources Act",
      "The Water Code of the Philippines",
      "Water Appropriation Decree",
    ],
    answer: 2,
  },
  {
    type: "tf",
    q: "According to Article 3 of the Water Code, all waters belong to the State.",
    answer: true,
  },
  {
    type: "fitb",
    q: "The utilization of water in the right amount during the period needed to produce benefits is called _____ Use.",
    answer: "beneficial",
  },
  {
    type: "multi",
    q: "Which of the following are correct legal easement distances for public use along Philippine river banks? (Select 3)",
    options: [
      "Urban areas — 3 meters",
      "Urban areas — 10 meters",
      "Agricultural areas — 20 meters",
      "Forest areas — 40 meters",
      "Forest areas — 60 meters",
    ],
    answer: [0, 2, 3],
  },
  {
    type: "mc",
    q: "Non-use of water for the purpose stipulated in a permit for _____ consecutive years renders the permit null and void.",
    options: ["One", "Two", "Three", "Five"],
    answer: 2,
  },
  {
    type: "tf",
    q: "A Conditional Water Permit (CWP) is typically valid for 1 year before a permanent permit is issued.",
    answer: true,
  },

  // ── Module 3: Water Permits & CPC ────────────────────────────────────────
  {
    type: "mc",
    q: "What formal authority must private water utilities obtain from the NWRB to operate and charge rates?",
    options: [
      "Water Permit",
      "Environmental Compliance Certificate",
      "Certificate of Public Convenience (CPC)",
      "Certificate of Potability",
    ],
    answer: 2,
  },
  {
    type: "mc",
    q: "How many years is a Certificate of Public Convenience (CPC) typically valid for?",
    options: ["1 year", "3 years", "5 years", "10 years"],
    answer: 2,
  },
  {
    type: "fitb",
    q: "A verified petition for the _____ of a water permit must be filed if the permit holder changes.",
    answer: "transfer",
  },
  {
    type: "mc",
    q: "In the stream flow equation Q = AV(Coef), what does 'Q' represent?",
    options: [
      "Cross-sectional area",
      "Flow rate (Discharge)",
      "Velocity of water",
      "Correction coefficient",
    ],
    answer: 1,
  },
  {
    type: "multi",
    q: "Which of the following are correctly matched stream flow measurement tools or methods? (Select 3)",
    options: [
      "Float Method — uses an orange peel to estimate velocity",
      "Current Meter Method — primary NWRB field method",
      "V-notch weir — measures discharge of large rivers",
      "V-notch weir — measures discharge of small streams",
      "Float Method — uses a pressure sensor",
    ],
    answer: [0, 1, 3],
  },

  // ── Module 4: Philippine Water Resources ─────────────────────────────────
  {
    type: "mc",
    q: "What is the average annual rainfall in the Philippines?",
    options: ["1,200 mm", "1,800 mm", "2,400 mm", "3,000 mm"],
    answer: 2,
  },
  {
    type: "mc",
    q: "Which river basin is the largest in the Philippines by drainage area?",
    options: [
      "Mindanao River Basin",
      "Cagayan River Basin",
      "Pampanga River Basin",
      "Agusan River Basin",
    ],
    answer: 1,
  },
  {
    type: "tf",
    q: "According to 2016 data, Agriculture (Irrigation) is the largest consumer of allocated water resources in the Philippines.",
    answer: true,
  },

  // ── Module 5: Water Facts ─────────────────────────────────────────────────
  {
    type: "mc",
    q: "Approximately what percentage of the Earth's total water is freshwater?",
    options: ["10.5%", "2.8%", "15.2%", "5.0%"],
    answer: 1,
  },
];

const TOTAL_ITEMS = FINAL_QUIZ.length;

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARDS — Directly sourced from flashcards__2_.csv
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARDS = [
  // NWRB Identity & Board
  { q: "Which government agency is the national coordinating and regulating body for water resources management in the Philippines?", a: "National Water Resources Board (NWRB)." },
  { q: "Under Executive Order No. 123 (2002), the NWRB was transferred to which executive department?", a: "Department of Environment and Natural Resources (DENR)." },
  { q: "True or False: The NWRB is the same entity as Maynilad or Manila Water.", a: "False — the NWRB is a regulatory/coordinating body, not a water service provider." },
  { q: "Who serves as the Chair of the NWRB Board?", a: "The Secretary of the Department of Environment and Natural Resources (DENR)." },
  { q: "Which official serves as the Vice Chair of the NWRB Board?", a: "The Secretary of Department of Economy, Planning, and Development (DEPDev)." },
  { q: "In the NWRB Board, which agency head represents science and technology?", a: "Secretary of the Department of Science and Technology (DOST)." },
  { q: "According to the Water Code, which two entities are currently deputized agents of the NWRB?", a: "The DPWH (Department of Public Works and Highways) and the NIA (National Irrigation Administration)." },
  { q: "Complete the vision: The NWRB's vision is 'Sustainable Water for a _____ Nation.'", a: "Healthy." },
  { q: "What are the three major functions of the NWRB?", a: "Policy Formulation and Coordination, Resource Regulation, and Economic Regulation." },
  { q: "In the context of the NWRB, what does 'IWRM' stand for?", a: "Integrated Water Resources Management." },
  { q: "Which specific dam's monthly water releases are approved by the NWRB for Metro Manila's supply and irrigation?", a: "Angat Dam." },
  { q: "Under economic regulation, the NWRB sets water _____ for private water providers.", a: "Tariffs." },
  { q: "The NWRB protects consumers by ensuring water tariffs are 'just and _____ '.", a: "Reasonable." },
  { q: "What is the name of the office created in 2023 under the DENR to manage water resources?", a: "Water Resources Management Office (WRMO)." },

  // Philippine Water Resources
  { q: "What is the average annual rainfall in the Philippines in millimeters?", a: "2,400 mm." },
  { q: "How many principal river basins are identified in the Philippines?", a: "421." },
  { q: "What is the total Philippine water resources potential in billion m³?", a: "146 billion m³." },
  { q: "Into how many Water Resources Regions is the Philippines divided for planning purposes?", a: "12." },
  { q: "Which river basin is the largest in the Philippines by drainage area?", a: "Cagayan River Basin." },
  { q: "What is the second largest river basin in the Philippines?", a: "Mindanao River Basin." },
  { q: "What is the drainage area of the Agusan River Basin, the 3rd largest in the country?", a: "10,921 sq.km." },
  { q: "According to 2016 data, which sector is the largest consumer of allocated water resources in the Philippines?", a: "Agriculture (Irrigation)." },
  { q: "Which city is listed as a 'water-stressed' city in the Philippines according to the JICA study?", a: "Metro Manila (also: Cebu, Davao, etc.)." },
  { q: "What is the main threat to water resources mentioned regarding population growth?", a: "Increased pressure on resource supply and service delivery systems." },

  // Global Water
  { q: "Approximately what percentage of the Earth's total water is freshwater?", a: "2.8%." },

  // Water Code — Principles and Definitions
  { q: "What is the common name for Presidential Decree No. 1067?", a: "The Water Code of the Philippines." },
  { q: "According to Article 3 of the Water Code, all waters belong to the _____.", a: "State." },
  { q: "The utilization of water in the right amount during the period needed to produce benefits is called _____ Use.", a: "Beneficial." },
  { q: "What document serves as the formal evidence of a 'water right' granted by the government?", a: "Water Permit." },
  { q: "Under Article 6, a landowner may use water found on their land for _____ purposes without a permit.", a: "Domestic." },
  { q: "Term: Appropriation of Water", a: "The acquisition of rights over the use of waters or the taking of waters from a natural source for law-allowed purposes." },
  { q: "Which water use category involves supplying community requirements via piped distribution?", a: "Municipal Use." },
  { q: "Which type of water use involves large herds or flocks of animals raised as a commercial enterprise?", a: "Livestock Raising." },
  { q: "What is the specific easement distance for public use along river banks in urban areas?", a: "3 meters." },
  { q: "What is the specific easement distance for public use along river banks in agricultural areas?", a: "20 meters." },
  { q: "What is the specific easement distance for public use along river banks in forest areas?", a: "40 meters." },
  { q: "To qualify for a water permit, a corporation must have at least _____% of its capital owned by Philippine citizens.", a: "60%." },
  { q: "What is the standard filing fee for a water permit for most industrial or power generation purposes?", a: "P 7,200.00." },
  { q: "What is the filing fee for a water permit for Level I and II municipal use?", a: "P 550.00." },
  { q: "What is the purpose of the '15-day posting' period in the Water Permit Application process?", a: "To allow for potential protests or objections from other parties." },
  { q: "Non-use of water for _____ consecutive years renders a water permit null and void.", a: "Three (3)." },
  { q: "Under the Water Code, who has the power to declare certain waters exempt from appropriation?", a: "The State." },
  { q: "What is required before constructing a dam for water diversion, except in emergencies?", a: "Approval of plans and specifications by the NWRB (proper government agency)." },
  { q: "The 'Regalian Doctrine' refers to the State's ownership of all _____ resources.", a: "Natural." },
  { q: "Which law assigned the residual functions of the defunct Public Service Commission to the NWRB?", a: "Presidential Decree No. 1206." },

  // CPC and Compliance
  { q: "What formal authority must private water utilities obtain from the NWRB to operate and charge rates?", a: "Certificate of Public Convenience (CPC)." },
  { q: "How many years is a Certificate of Public Convenience (CPC) typically valid for?", a: "5 years." },
  { q: "A 'Conditional Water Permit' (CWP) is typically valid for how long?", a: "1 year." },
  { q: "Under CPC rules, when must the Annual Report of Operations be submitted to the NWRB?", a: "On or before May 30th of every year." },
  { q: "What does a 'Certificate of Potability' verify?", a: "That the water is safe for human consumption." },
  { q: "A verified petition for the _____ of a water permit must be filed if the permit holder changes.", a: "Transfer." },
  { q: "What document must be submitted to the NWRB on a quarterly basis by permit holders?", a: "Record of Water Withdrawal." },

  // Streamflow
  { q: "What is the primary method used by NWRB staff for stream flow calculation?", a: "Current Meter Method." },
  { q: "In the stream flow equation Q = AV(Coef), what does 'Q' represent?", a: "Flow rate (Discharge)." },
  { q: "In the stream flow equation Q = AV(Coef), what value is typically used for the coefficient (Coef)?", a: "0.85." },
  { q: "What simple measurement method uses an object like an orange peel to estimate water velocity?", a: "Float Method." },
  { q: "Which measurement device is specifically used to measure the discharge of small streams using a notch?", a: "V-notch weir." },
  { q: "Which water source is categorized as a 'Groundwater Source'?", a: "Deepwell (DW)." },
  { q: "Which water source is categorized as a 'Surface Water Source'?", a: "River or Creek." },

  // IWRM
  { q: "What is the primary objective of Integrated Water Resources Management (IWRM)?", a: "To maximize economic and social welfare equitably without compromising ecosystem sustainability." },
  { q: "The establishment of cemeteries or waste disposal areas requires approval from the _____ if they affect water sources.", a: "Department of Health." },
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
    url: "https://lawphil.net/executive/execord/eo1982/eo_860_1982.html",
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
