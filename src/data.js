// ── data.js ──────────────────────────────────────────────────────────────────
// Edit this file to update course content, quiz questions, and flashcards.
// Do NOT import React here — this is pure data.
// ─────────────────────────────────────────────────────────────────────────────

const DENR_LOGO = "data:image/png;base64,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";

// ─────────────────────────────────────────────────────────────────────────────
// MODULES — Course Content
// Interactive hints use these prefixes in content:
//   ❓ = did-you-know callout
//   📌 = key fact to remember
//   ⚖️  = legal provision
//   💡 = practical insight
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
        content: `The 2030 Agenda for Sustainable Development was adopted by all 193 UN Member States in September 2015. It represents a universal call to action to end poverty, protect the planet, and ensure prosperity for all by the year 2030.

At its core, the agenda is structured around five dimensions known as the '5 P's':

• People — End all forms of poverty and hunger, and ensure that all human beings can fulfill their potential in dignity, equality, and a healthy environment.
• Planet — Protect the planet from degradation, manage natural resources sustainably, and take urgent action on climate change so it can support the needs of present and future generations.
• Prosperity — Ensure that all human beings can enjoy prosperous and fulfilling lives, and that economic, social, and technological progress occurs in harmony with nature.
• Peace — Foster peaceful, just, and inclusive societies which are free from fear and violence. There can be no sustainable development without peace, and no peace without sustainable development.
• Partnership — Mobilize the means required to implement the Agenda through a revitalized Global Partnership for Sustainable Development, involving governments, the private sector, civil society, and the United Nations.

📌 The Philippines is among the countries that officially committed to achieving all 17 SDGs by 2030 under this agenda.`,
      },
      {
        title: "The 17 Sustainable Development Goals",
        content: `The 2030 Agenda contains 17 Sustainable Development Goals (SDGs) and 169 associated targets. Together, they build on the earlier Millennium Development Goals (MDGs) and go further by addressing root causes of poverty and the universal need for sustainable development.

The 17 SDGs cover a wide range of interconnected issues:
SDG 1: No Poverty | SDG 2: Zero Hunger | SDG 3: Good Health and Well-being | SDG 4: Quality Education | SDG 5: Gender Equality | SDG 6: Clean Water and Sanitation | SDG 7: Affordable and Clean Energy | SDG 8: Decent Work | SDG 9: Industry and Innovation | SDG 10: Reduced Inequalities | SDG 11: Sustainable Cities | SDG 12: Responsible Consumption | SDG 13: Climate Action | SDG 14: Life Below Water | SDG 15: Life on Land | SDG 16: Peace and Justice | SDG 17: Partnerships for the Goals.

❓ Did you know? The SDGs are indivisible — progress on one goal can accelerate progress on others. For example, achieving SDG 6 (Clean Water) directly supports SDG 2 (Zero Hunger), SDG 3 (Health), and SDG 13 (Climate Action).

💡 The Philippines reports on its SDG progress through the Philippine Development Plan and the Philippine Statistics Authority's annual SDG Watch reports.`,
      },
      {
        title: "SDG 6 — Clean Water and Sanitation",
        content: `SDG 6 aims to ensure the availability and sustainable management of water and sanitation for all by 2030. It is one of the most cross-cutting goals, as water underpins virtually every aspect of human development.

SDG 6 has six main targets:

• 6.1 — Safe Drinking Water: Achieve universal and equitable access to safe and affordable drinking water for all.
• 6.2 — Sanitation and Hygiene: End open defecation, achieve access to adequate sanitation and hygiene for all, paying special attention to women, girls, and vulnerable groups.
• 6.3 — Water Quality: Improve water quality by reducing pollution, eliminating dumping of hazardous chemicals, and increasing safe water reuse.
• 6.4 — Water-Use Efficiency: Substantially increase water-use efficiency across all sectors to address the growing threat of water scarcity.
• 6.5 — Integrated Water Resources Management (IWRM): Implement IWRM at all levels, including through transboundary cooperation as appropriate.
• 6.6 — Water-Related Ecosystems: Protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers, and lakes.

📌 In the Philippines, the NWRB is the lead agency for implementing SDG 6 alongside the WRMO under EO 22 (2023).

❓ Did you know? As of 2023, around 87.7% of Filipinos report access to safe water, but fewer than half have piped water connections at home. Over 332 municipalities remain classified as 'water-less.'`,
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
        content: `The National Water Resources Board (NWRB) is the primary government agency responsible for the regulation, conservation, and management of all water resources in the Philippines. It coordinates activities that affect the physical environment and the national economy related to water use.

Its history spans five decades of legal evolution:

• 1974 — Created as the National Water Resources Council (NWRC) under PD 424, initially attached to the Department of Public Works, Transportation and Communications (DPWTC).
• 1976 — The Water Code of the Philippines (PD 1067) gave the NWRC broad authority to regulate all water appropriation and use in the country.
• 1987 — Executive Order 124-A renamed the NWRC to the National Water Resources Board (NWRB).
• 2002 — EO 123 reconstituted the Board and transferred the NWRB to the Department of Environment and Natural Resources (DENR).
• 2023 — EO 22 established the WRMO within DENR, with NWRB now 'attached' to DENR as a regulated body.

📌 The NWRB's jurisdiction covers all water resources across the Philippine archipelago — from groundwater to rivers, lakes, and even atmospheric water.

💡 Practical note: If you want to drill a deep well, construct an irrigation canal, or operate a water utility, you need the NWRB's authorization through a Water Permit or a Certificate of Public Convenience (CPC).`,
      },
      {
        title: "Vision, Mission, and Functions",
        content: `Vision: Sustainable Water for a Healthy Nation.

Mission: To allocate sufficient water for optimal beneficial use, ensure access to safe water and adequate sanitation, and preserve flow regimes for ecological integrity.

The NWRB carries out three core functional areas:

• Policy Formulation and Coordination
Drafts national plans including the Philippine IWRM Plan Framework and specific Groundwater Management Plans. Coordinates with government agencies, LGUs, and the private sector on water policy. Serves through deputized agencies such as NIA and DPWH for field-level coordination.

• Resource Regulation
Issues and monitors Water Permits for all water uses except family domestic use. Resolves conflicts between competing water users. Inspects facilities and enforces compliance. Manages the suspension or revocation of permits for violations such as waste, non-use, or unauthorized sale of water.

• Economic Regulation
Grants Certificates of Public Convenience (CPC) to private water service providers (WSPs). Sets water tariffs to protect consumers while ensuring the financial viability of utilities. Oversees the CPC Registration Program requiring unregistered WSPs to register within 180 days.

❓ Did you know? As of 2024, the NWRB requires WSPs with discharge ≥10 liters per second (LPS) to install telemetered water meters to improve real-time monitoring of water extraction.`,
      },
      {
        title: "The NWRB Board and Composition",
        content: `The NWRB is governed by a multi-agency Board ensuring coordinated oversight of the water sector:

• Chairperson: Secretary of the Department of Environment and Natural Resources (DENR)
• Vice-Chairperson: Secretary of DEPDev (formerly NEDA — the National Economic and Development Authority)
• Members:
  - Secretary of Justice
  - Secretary of Science and Technology
  - Executive Director of the UP-National Hydraulics Research Center

Deputized agencies help extend NWRB's reach at the regional and field level:
• National Irrigation Administration (NIA) — manages irrigation water permits
• Department of Public Works and Highways (DPWH) — coordinates on water infrastructure

⚖️ Legal basis: The current Board composition was set by EO 860 (2010), which redefined the composition and powers of the Board. EO 123 (2002) first transferred the agency to DENR.

📌 The NWRB Board meets regularly to approve water permits, resolve disputes, and set tariffs. It is supported by three divisions: Resource Regulation, Economic Regulation, and Policy and Planning.`,
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
        title: "The Legislative Timeline",
        content: `Philippine water law has developed through a series of presidential decrees and executive orders, each building on the last to strengthen water governance:

• 1974 — PD 424: Created the National Water Resources Council (NWRC), initially under the DPWTC, to coordinate water-related activities across the government.

• 1976 — PD 1067 (Water Code of the Philippines): The foundational law consolidating all water ownership, appropriation, and use regulations. It established the Regalian Doctrine for water and created the framework for water permits.

• 1977 — PD 1206: Transferred the residual functions of the old Board of Waterworks and Sewerage to the NWRB, expanding its regulatory scope.

• 1987 — EO 124-A: Officially renamed the National Water Resources Council (NWRC) to the National Water Resources Board (NWRB), reflecting its expanded mandate.

• 2002 — EO 123: Reconstituted the NWRB Board and transferred the agency to the DENR, aligning water resource management with environmental governance.

• 2010 — EO 860: Redefined the composition, powers, and functions of the NWRB Board to reflect current institutional needs and government priorities.

• 2023 — EO 22: Established the Water Resources Management Office (WRMO) within DENR, marking a major step toward the eventual creation of a Department of Water Resources.

📌 A proposed bill to create a standalone Department of Water Resources (DWR) has been pending in Congress for several years, and the WRMO is designed to pave the way for it.`,
      },
      {
        title: "Executive Order 22 and the WRMO",
        content: `Executive Order No. 22, signed by President Ferdinand R. Marcos Jr. on April 27, 2023, established the Water Resources Management Office (WRMO) within the DENR. It was issued in response to identified challenges in the water sector: fragmentation among agencies, growing demand due to population growth, climate change impacts, and inadequate infrastructure.

Key mandates of the WRMO under EO 22:

• Champion the passage of a law creating an apex body for water — such as a Department of Water Resources (DWR).
• Formulate and implement the Integrated Water Management Plan (IWMP) as a comprehensive national policy for water resources.
• Integrate plans from the Philippine Development Plan, the Philippine Water Supply and Sanitation Master Plan, and NWRB's Water Security Master Plan.
• Generate and maintain credible, timely water and sanitation data for evidence-based policy.
• Collaborate with all relevant agencies, LGUs, civil society, and the private sector.
• Submit quarterly status reports on implementation directly to the President.
• Chair the Sub-Committee on Water Resources (SCWR) under the NEDA Infrastructure Committee.

⚖️ Under Section 3 of EO 22, the following agencies are 'attached' to DENR: NWRB, MWSS (Metropolitan Waterworks and Sewerage System), LWUA (Local Water Utilities Administration), and LLDA (Laguna Lake Development Authority).

❓ Did you know? The WRMO is headed by an Undersecretary appointed by the President upon the recommendation of the DENR Secretary — it is one of the highest-level water governance bodies ever created in the Philippines.`,
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
    subtitle: "Integrated Water Management",
    icon: "🗂️",
    color: "#34d399",
    chapters: [
      {
        title: "The Philippine Water Sector Structure",
        content: `The Philippine water sector is governed by a complex but interconnected set of agencies, each with a specific mandate:

Watershed Management:
• Forest Management Bureau (FMB) — oversees watershed protection
• National Irrigation Administration (NIA) — manages irrigation water use
• Local Government Units (LGUs) — administer local water services

Data Collection and Monitoring:
• PAGASA — weather and climate monitoring affecting water supply
• Mines and Geosciences Bureau (MGB) — groundwater data and geology
• Department of Health (DOH) — prescribes parameters for water potability testing

Flood Management:
• Department of Public Works and Highways (DPWH) — flood control infrastructure
• MMDA — Metro Manila flood operations

Policy and Planning:
• DEPDev (formerly NEDA) — national development planning
• NWRB — water permits, tariffs, and water rights

Under EO 22, four agencies are now 'attached' to DENR for policy coordination:
NWRB · MWSS · LWUA · LLDA

💡 The WRMO acts as the central coordinator — not a replacement for these agencies — ensuring that all their plans are harmonized under one national framework.

❓ Did you know? The Philippines has 532 water districts, but a PIDS study (2025) found that annual demand consistently exceeds supply by about 3.6 million cubic meters — highlighting the urgency of the IWMP.`,
      },
      {
        title: "The Integrated Water Management Plan (IWMP)",
        content: `The IWMP is the flagship output of the WRMO and serves as the Philippines' comprehensive national policy for water resources management.

It was prepared by reviewing and integrating existing plans:
• National Water Security Roadmap (NWSSR)
• Philippine Water Supply and Sanitation Master Plan (PWSSMP) 2019–2030
• Philippine Development Plan
• NWRB's Water Security Master Plan

The IWMP focuses on four strategic objectives (per EO 22, Section 4):

1. Harness water supply to maximize benefit to society and the environment.
2. Harmonize plans and policies of all government agencies with water-related functions.
3. Ensure all programs — including water infrastructure — are resilient to extreme events and forecast changes in water availability.
4. Engage LGUs, the private sector, and civil society in crafting better water policies.

📌 The IWMP is co-led by DENR-WRMO and DEPDev. It is intended to be a living document, updated as conditions change.

⚖️ The WRMO is required under EO 22, Section 9 to submit a quarterly status report on implementation to the President through the Office of the Executive Secretary.

💡 A key component is the Decision Support System (DSS) — a central data repository and modeling platform to support evidence-based water management decisions.`,
      },
      {
        title: "Climate Change and Water Resources",
        content: `Climate change is the most significant long-term threat to Philippine water resources. The country is ranked among the most climate-vulnerable nations in the world due to its geography and weather patterns.

Key climate impacts on Philippine water systems:

• Extreme heat and prolonged drought — reduces river flows and groundwater recharge, threatens rainfed agriculture
• Intense rainfall and flooding — increases runoff and erosion, overwhelms drainage systems, and contaminates water supplies
• Sea level rise — causes saltwater intrusion into coastal aquifers, affecting freshwater availability in island communities
• Reduced wet season predictability — affects reservoir operations like Angat Dam, which supplies much of Metro Manila

❓ Did you know? Manila Bay's coastal aquifers have experienced saltwater intrusion since the late 1960s due to over-pumping of groundwater. This has worsened as population and water demand grew.

The Climate-Resilient Water Resources Management Program was designed to address these threats by:
• Incorporating long-term hydrological changes into operations
• Developing new reservoir operation rules (e.g., Angat Dam rules reviewed every 5 years)
• Using advanced technology for improved forecasting and water allocation

📌 Climate change is expected to significantly decrease the supply of both surface water and groundwater in most Philippine river basins, while also increasing the frequency and intensity of flood events.`,
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
        content: `Presidential Decree No. 1067, known as the Water Code of the Philippines, was signed on December 31, 1976. It consolidates all prior laws governing the ownership, appropriation, utilization, exploitation, development, conservation, and protection of water resources in the country.

The Code is built on five foundational principles (Article 3):

⚖️ a. All waters belong to the State.
⚖️ b. Waters belonging to the State cannot be the subject of acquisitive prescription — meaning no private person can claim ownership over water simply through long use or occupation.
⚖️ c. The State may allow the use or development of waters through administrative concessions (i.e., Water Permits).
⚖️ d. All utilization, exploitation, development, conservation, and protection of water resources shall be subject to government control through the NWRB (formerly NWRC).
⚖️ e. Preference in the use and development of waters shall consider current usages and respond to the changing needs of the country.

📌 'Waters' under the Code (Article 4) refers to:
• Water under the ground (groundwater)
• Water above the ground (surface water — rivers, lakes, streams)
• Water in the atmosphere
• The waters of the sea within Philippine territorial jurisdiction

❓ Did you know? Under Article 6, even water found on private land — such as springs, lakes, rainwater, and groundwater — belongs to the State. The landowner may only use it for domestic purposes without a permit, provided such use is registered when required.`,
      },
      {
        title: "Water Rights, Uses, and Priorities",
        content: `Water Right (Article 13) is the privilege granted by the government to a qualified person or entity to appropriate and use water from a specific source. The legal evidence of a water right is called a Water Permit.

⚖️ Eligible applicants (Article 15): Only Filipino citizens of legal age, as well as duly qualified juridical persons (corporations, cooperatives, government instrumentalities), may apply for water permits.

Permitted Purposes for Water Use (Article 10):
• Domestic — drinking, washing, cooking, home gardens, domestic animals
• Municipal — community water supply systems
• Irrigation — agricultural crop production
• Power Generation — electrical or mechanical power production
• Fisheries — commercial propagation and culture of fish
• Livestock Raising — large herds raised as a commercial enterprise
• Industrial — use in factories, plants, mines, or as a product ingredient
• Recreational — swimming pools, golf courses, boating, water ski facilities

⚖️ Priority Rule (Article 22): Between two or more appropriators from the same source, the one with the earlier permit has the better right (prior appropriation doctrine). However, in times of emergency, Domestic and Municipal uses take priority over all other uses.

📌 Water rights may be leased or transferred to another person with prior NWRB approval (Article 19).

❓ Did you know? Except for carrying water by hand or watering animals at a river, all other water uses require a Water Permit under the Code.`,
      },
      {
        title: "Water Permits, the CPC, and Compliance",
        content: `The Water Permit is the cornerstone of the regulatory system under PD 1067. Here is how it works from application to compliance:

Application and Issuance (Articles 16–18):
• Any person who desires to appropriate water must file an application with the NWRB.
• The NWRB makes the application public and considers protests before approval.
• Approved permits specify the maximum volume, rate of withdrawal, time period, point of diversion, place of use, and purpose.

⚖️ Within one year of permit approval, the grantee must submit plans and specifications for diversion works and distribution systems.

Certificate of Public Convenience (CPC):
If the grantee intends to operate a water system for public use, they must separately apply for a CPC. The NWRB uses this to perform Economic Regulation — ensuring utilities remain viable while protecting consumers.

CPC Registration Program Requirements:
• Unregistered Water Service Providers (WSPs) must register within 180 days from the program's effectivity.
• A Certificate of Potability — issued within 6 months prior to filing — is required.
• Physical and Chemical impurity tests must be conducted at least once per year.

Compliance and Monitoring:
• Permit holders must install measuring devices (water meters, flow gauges) to monitor levels and extraction.
• The NWRB's Monitoring and Enforcement Division tests and seals water meters.
• As of 2024, WSPs with discharge ≥10 LPS must install telemetered meters for real-time monitoring.

📌 Permits may be suspended or revoked for non-use, gross violations, unauthorized sale of water, or pollution of water bodies (Articles 28–29).

💡 Fun fact: Water permits are transferable — if a water right is no longer needed, it can be leased or sold to another eligible party with NWRB approval.`,
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
        title: "Philippine Water Resources",
        content: `Despite being an archipelago surrounded by water, the Philippines faces significant freshwater challenges. Here is a snapshot of the country's water resources:

Surface Water:
• 421 principal river basins with catchment areas over 40 km² — 18 are classified as major river basins (over 1,400 km²), occupying over a third of the country's total land area.
• 79 natural lakes — used mainly for fisheries, irrigation, and water supply.
• The longest river, Cagayan River in Northern Luzon, discharges approximately 53,943 million cubic meters annually.
• Major water supply dams: Angat Dam, Ipo Dam, and La Mesa Dam supply Metro Manila.

Groundwater:
• Groundwater reserves are estimated at 47,895 million cubic meters, replenished by rainfall and river seepage.
• The four major groundwater reservoirs are in Cagayan, Central Luzon, Agusan, and Cotabato.
• About 49% of groundwater use is for domestic purposes, 32% for agriculture, and 15% for industry.

Current Challenges:
• Annual per-capita water availability fell from 1,907 m³ in 2000 to just 1,400 m³ by 2016, driven by population growth.
• About 83–85% of Philippine water is used for agriculture, leaving a smaller share for households and industry.
• Over-pumping of groundwater in coastal Metro Manila has caused saltwater intrusion along the coast from Las Piñas to Malabon.

❓ Did you know? It is estimated that by 2025, water availability will be marginal in most major Philippine cities and in 8 of the 19 major river basins.`,
      },
      {
        title: "Global Water Facts",
        content: `Water is one of the Earth's most vital — and surprisingly scarce — resources. While the planet is called the 'Blue Planet,' the vast majority of its water is not directly usable by humans.

Global Distribution:
• 97.2% of all water on Earth is saltwater in the oceans.
• Only 2.8% is fresh water — and most of that is locked in glaciers, ice caps, and deep underground aquifers.
• Less than 1% of all Earth's water is accessible surface fresh water (rivers and lakes).

📌 The global water cycle replenishes fresh water through evaporation, condensation, and precipitation — but human activity, climate change, and population growth are disrupting this balance.

💡 Water stress occurs when demand exceeds available supply. In 2018, the Philippines' water stress index reached 28.21% — indicating a significant and growing pressure on water resources.

Water and the Human Body:
• Humans can survive only about 3 days without water, compared to about 21 days without food.
• Water makes up 83% of human blood, 75% of the brain and muscles, and 22% of bones.
• The human body is roughly 60% water on average.

❓ Did you know? A single faucet leaking at one drip per second can waste up to 3,000 gallons (about 11,356 liters) of water per year — enough to fill a small swimming pool.`,
      },
      {
        title: "Water Conservation and Responsibility",
        content: `Water is a shared resource, and efficient water management is everyone's responsibility — from government agencies to individual households.

Water is Unique:
• Water is the only naturally occurring substance that exists in all three physical states: solid (ice), liquid (water), and gas (water vapor) — at naturally occurring Earth temperatures.
• Unlike most resources, water cannot be substituted for its essential purposes.

'Water Smart' Behaviors:
• Fix leaks promptly — even a small drip adds up to thousands of liters per year.
• Take shorter showers — a 5-minute shower uses about 40–50 liters; a bath uses up to 150 liters.
• Use low-flow fixtures — they reduce consumption by 30–50% without sacrificing comfort.
• Report water waste in public spaces to your LGU or water district.
• Avoid pouring chemicals down drains — protect groundwater quality.

Priority in Emergencies:
⚖️ Under Article 22 of the Water Code, Domestic and Municipal uses are given priority over all other uses in times of water emergency or shortage.

📌 The Philippines' yearly rainfall averages 2,400 mm — about 146 billion m³ of freshwater annually — but uneven distribution, seasonal variability, and inadequate storage mean many communities still face shortages.

❓ Did you know? The NWRB issued Memorandum Order 2023–1 on Water Management and Conservation Measures, reminding all water users of their duty to use water efficiently and report violations.`,
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
// ─────────────────────────────────────────────────────────────────────────────
const FINAL_QUIZ = [
  // Module 1
  { type: "mc", q: "What is the target year for achieving the Sustainable Development Goals under the 2030 Agenda?", options: ["2025", "2030", "2035", "2040"], answer: 1 },
  { type: "tf", q: "SDG 6.2 specifically targets increasing water-use efficiency to address water scarcity.", answer: false },
  { type: "fitb", q: "The 2030 Agenda is built around five dimensions called the '5 _____'.", answer: "p's|p|ps" },
  { type: "multi", q: "Which of the following are among the 5 P's of the 2030 Agenda? (Select 3)", options: ["People", "Power", "Planet", "Prosperity", "Progress"], answer: [0, 2, 3] },
  // Module 2
  { type: "mc", q: "What is the official vision of the National Water Resources Board?", options: ["Clean Water for Every Filipino", "Sustainable Water for a Healthy Nation", "Water Security for Economic Growth", "Safe Water through Good Governance"], answer: 1 },
  { type: "tf", q: "The NWRB Board is chaired by the Secretary of the DENR.", answer: true },
  { type: "fitb", q: "The NWRB performs Economic Regulation by setting water _____ for private providers.", answer: "tariffs|tariff" },
  { type: "multi", q: "Which of the following are core functional areas of the NWRB? (Select 3)", options: ["Policy Formulation", "Flood Control & Infrastructure Management", "Resource Regulation", "Economic Regulation", "Environmental Impact Assessment & Compliance"], answer: [0, 2, 3] },
  // Module 3
  { type: "mc", q: "Which executive order established the Water Resources Management Office (WRMO) under DENR?", options: ["EO 123", "EO 860", "EO 22", "EO 124-A"], answer: 2 },
  { type: "tf", q: "Presidential Decree 424, which created the NWRC, was enacted in 1974.", answer: true },
  { type: "fitb", q: "EO 124-A renamed the National Water Resources Council to the National Water Resources _____.", answer: "board" },
  // Module 4
  { type: "mc", q: "Which agencies are responsible for leading reform in governance and regulations under the IWMP?", options: ["PAGASA and MGB", "DPWH and MMDA", "DENR-WRMO and DEPDev", "NIA and LWUA"], answer: 2 },
  { type: "tf", q: "The WRMO submits a quarterly status report on implementation to the President.", answer: true },
  { type: "multi", q: "Which of the following agencies are officially 'attached' to the DENR under EO 22? (Select 3)", options: ["NWRB", "PAGASA", "MWSS", "LLDA", "DPWH"], answer: [0, 2, 3] },
  // Module 5
  { type: "mc", q: "Presidential Decree 1067 enacted in 1976 is officially known as:", options: ["Clean Water Act", "Water Resources Code", "Water Code of the Philippines", "Environmental Management Act"], answer: 2 },
  { type: "tf", q: "Under the Water Code, all waters belong to the State and cannot be acquired through acquisitive prescription.", answer: true },
  { type: "multi", q: "'Waters' under the Code (Article 4) refers to:", options: ["groundwater", "bottled mineral water", "rivers", "recycled wastewater", "atmosphere"], answer: [0, 2, 4] },
  { type: "fitb", q: "The legal document that serves as evidence of a water right is called a Water _____.", answer: "permit|permits" },
  { type: "mc", q: "What does CPC stand for in the context of NWRB economic regulation?", options: ["Central Planning Coordination", "Certificate of Public Convenience", "Community Protection Charter", "Comprehensive Permit Clearance"], answer: 1 },
  // Module 6
  { type: "mc", q: "What percentage of global water is fresh water?", options: ["10.5%", "2.8%", "15.2%", "5.0%"], answer: 1 },
  { type: "fitb", q: "Humans can survive only _____ days without water.", answer: "3|three" },
  { type: "multi", q: "Which of the following are SDG 6 targets? (Select 3)", options: ["Safe drinking water", "Zero hunger", "End open defecation", "Renewable energy", "Protect water ecosystems"], answer: [0, 2, 4] },
];

const TOTAL_ITEMS = FINAL_QUIZ.length;

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARDS
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
  { q: "What is the longest river in the Philippines, and how much water does it discharge annually?", a: "Cagayan River — about 53,943 million cubic meters per year" },
  { q: "Approximately what percentage of Philippine water resources is used for agriculture?", a: "83–85%" },
  { q: "How many principal river basins does the Philippines have (over 40 km²)?", a: "421 river basins" },
  { q: "How many natural lakes are identified in the Philippines?", a: "79 natural lakes" },
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