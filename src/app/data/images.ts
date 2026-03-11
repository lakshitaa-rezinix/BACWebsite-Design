export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: "Lab" | "Process" | "Equipment" | "QC" | "Recognition";
}

export const FACILITY_IMAGES: GalleryImage[] = [
  {
    src: "/images/facility/lab.jpeg",
    alt: "BAC analytical workstation with precision assay balance, draft shield, and computer",
    title: "Analytical Workstation",
    caption: "Precision assay balance, draft shield, and purity reference charts — the core analytical station at every BAC center.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-2.jpeg",
    alt: "BAC fire assay laboratory with cupellation furnaces and hallmarking machines",
    title: "Fire Assay Laboratory",
    caption: "Fully-equipped cupellation furnace room with dedicated fume extraction and BIS-compliant hallmarking stamping machines.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-3.jpeg",
    alt: "Chemical processing room with fume hoods and acid storage",
    title: "Chemical Processing Room",
    caption: "Fume hoods, scrubbers, and acid handling stations for wet chemistry and silver parting operations.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-4.jpeg",
    alt: "Wide view of the fire assay hall with multiple furnaces",
    title: "Fire Assay Hall — Overview",
    caption: "Panoramic view of the fire assay hall housing multiple cupellation, annealing, and melting furnaces.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-5.jpeg",
    alt: "Cupellation, annealing, and melting furnaces labeled on the lab wall",
    title: "Furnace Suite",
    caption: "Cupellation, annealing, and melting furnaces — precisely calibrated high-temperature equipment for gold purity analysis.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-6.jpeg",
    alt: "Four-panel composite showing assay balance precision weighing of gold samples",
    title: "Assay Balance Operations",
    caption: "Four-stage precision weighing of gold samples — before and after cupellation — ensuring gravimetric accuracy.",
    category: "Lab",
  },
  {
    src: "/images/facility/lab-7.jpeg",
    alt: "Composite showing fire assay cupellation firing — technician loading tray and empty cupellation molds",
    title: "Cupellation Firing",
    caption: "Technician loading a cupellation board into the furnace — a defining step in the fire assay purity determination process.",
    category: "Process",
  },
  {
    src: "/images/facility/lab-8.jpeg",
    alt: "Technician operating Kalyani hydraulic hallmark stamping press with tray of cupels",
    title: "Hydraulic Hallmark Stamping Press",
    caption: "Kalyani HCP press applies BIS hallmarks directly onto jewelry articles with consistent, certified force.",
    category: "Equipment",
  },
  {
    src: "/images/facility/lab-process.jpeg",
    alt: "Composite of acid parting wet chemistry process — hot plate, silver nitrate, technician under fume hood",
    title: "Acid Parting — Wet Chemistry",
    caption: "Silver-from-gold separation using nitric acid under controlled fume-hood conditions — part of the fire assay method.",
    category: "Process",
  },
  {
    src: "/images/facility/lab-process-1.jpeg",
    alt: "Composite showing silver parting needles on cupellation mold, glowing furnace, and finished needles",
    title: "Silver Parting Strip Preparation",
    caption: "Silver needles formed on cupellation molds, annealed at high temperature, and prepared for acid parting.",
    category: "Process",
  },
  {
    src: "/images/facility/working-in-lab.jpeg",
    alt: "Composite of assayer in full PPE removing hot cupellation tray from furnace",
    title: "Fire Assay in Action",
    caption: "Fully PPE-equipped assayer — face shield, respirator, heat-resistant gloves — working the cupellation furnace with precision.",
    category: "Process",
  },
  {
    src: "/images/facility/laser-marking.jpeg",
    alt: "Starlaser HUID laser marking machine with marking positions reference chart on the wall",
    title: "HUID Laser Marking Station",
    caption: "Starlaser machine alongside a detailed marking-position reference chart — ensuring correct HUID placement on every jewelry type.",
    category: "Equipment",
  },
  {
    src: "/images/facility/laser-marking-1.jpeg",
    alt: "Wide view of marking bay with multiple Starlaser machines and operators",
    title: "Marking Bay",
    caption: "Dedicated Marking Bay housing multiple Starlaser machines operated by trained technicians — high-throughput HUID engraving.",
    category: "Equipment",
  },
  {
    src: "/images/facility/laser-marking-2.jpeg",
    alt: "Technician programming Starlaser system at XRF bay for HUID engraving",
    title: "Laser Engraving in Progress",
    caption: "Technician programs the Starlaser system for precise HUID engraving — traceable, tamper-proof hallmarking.",
    category: "Equipment",
  },
  {
    src: "/images/facility/xrf.jpeg",
    alt: "Operator using SpectroCube XRF spectrometer at Station 3 with periodic table poster on wall",
    title: "XRF Spectrometer — Station 3",
    caption: "SpectroCube XRF analyzer performs non-destructive elemental purity analysis on gold, silver, and platinum jewelry.",
    category: "Equipment",
  },
  {
    src: "/images/facility/xrf-2.jpeg",
    alt: "Operator loading samples into SpectroCube XRF analyzer in the XRF bay",
    title: "XRF Analysis Bay",
    caption: "Operator loads jewelry samples into the SpectroCube for rapid, non-destructive elemental analysis — no damage to the piece.",
    category: "Equipment",
  },
  {
    src: "/images/facility/qc.jpeg",
    alt: "QC inspector using digital microscopy and laptop in the QC inspection room",
    title: "QC Inspection Room",
    caption: "Quality Control inspector verifies hallmarked articles under digital microscopy before dispatch — final check before certification.",
    category: "QC",
  },
  {
    src: "/images/facility/receiving-dispatch.jpeg",
    alt: "Staff member inspecting incoming jewelry consignments at receiving and dispatch desk",
    title: "Receiving & Dispatch",
    caption: "Every consignment is carefully verified, logged, and labeled upon arrival before entering the testing workflow.",
    category: "Process",
  },
  {
    src: "/images/facility/sampling.jpeg",
    alt: "Operator at sampling station using BAC management software with color-coded tracking display",
    title: "Sample Tracking System",
    caption: "BAC's real-time management software tracks every sample through the full hallmarking workflow — complete chain of custody.",
    category: "Process",
  },
];

export const RECOGNITION_IMAGES: GalleryImage[] = [
  {
    src: "/images/awards/bis-award.jpeg",
    alt: "BAC representative receiving Titan ONE Legacy Team Vision award on stage",
    title: "Titan 'ONE' Award",
    caption: "BAC recognized at Titan Company's 'ONE: Legacy, Team, Vision' annual awards — celebrating excellence as their exclusive hallmarking partner.",
    category: "Recognition",
  },
  {
    src: "/images/awards/bis-award-2.jpeg",
    alt: "BAC staff receiving certificate at BIS Hallmark Carnival Mumbai",
    title: "BIS Hallmark Carnival Award",
    caption: "Certificate of recognition from the Bureau of Indian Standards, Mumbai branch, at the annual Hallmark Carnival event.",
    category: "Recognition",
  },
  {
    src: "/images/awards/bis-award-3.jpeg",
    alt: "BOMBAY ASSAY COMPANY receiving Certificate of Achievement on stage with dignitaries",
    title: "BIS Certificate of Achievement",
    caption: "Formal Certificate of Achievement presented to BOMBAY ASSAY COMPANY for outstanding performance in hallmarking operations.",
    category: "Recognition",
  },
  {
    src: "/images/awards/training.jpeg",
    alt: "BAC staff in team training session around a conference table with laptop and projector",
    title: "Internal Team Training",
    caption: "BAC staff engage in structured process review and compliance training — continuous learning is central to our quality culture.",
    category: "Recognition",
  },
  {
    src: "/images/awards/training-hods.jpeg",
    alt: "BAC Heads of Departments in strategy session at Titan boardroom",
    title: "HOD Strategy Session at Titan",
    caption: "Heads of Departments collaborate with Titan management in an executive boardroom — aligning on shared quality and growth goals.",
    category: "Recognition",
  },
  {
    src: "/images/awards/with-titan-team.jpeg",
    alt: "BAC team group photo at Titan DEI Week with Diversity Equity Inclusion banners",
    title: "BAC at Titan DEI Week",
    caption: "BAC's full team joins Titan Company's Diversity, Equity & Inclusion week — proud partners in building an inclusive industry.",
    category: "Recognition",
  },
  {
    src: "/images/awards/diwali-gift.jpeg",
    alt: "Manager distributing Diwali gifts to staff in nine-panel collage",
    title: "Diwali Employee Gifting",
    caption: "Management distributes Diwali gifts to team members across centers — celebrating the dedication of the people behind every hallmark.",
    category: "Recognition",
  },
];

export const ALL_GALLERY_IMAGES: GalleryImage[] = [
  ...FACILITY_IMAGES,
  ...RECOGNITION_IMAGES,
];

export const AWARD_IMAGES = [
  { src: "/images/awards/bis-award.jpeg", alt: "BAC recognized at Titan ONE awards ceremony" },
  { src: "/images/awards/bis-award-2.jpeg", alt: "BIS Hallmark Carnival Award" },
  { src: "/images/awards/bis-award-3.jpeg", alt: "BIS Certificate of Achievement — BOMBAY ASSAY COMPANY" },
  { src: "/images/awards/training.jpeg", alt: "Internal team training session" },
  { src: "/images/awards/training-hods.jpeg", alt: "HODs strategy session with Titan management" },
  { src: "/images/awards/with-titan-team.jpeg", alt: "BAC team at Titan DEI Week" },
  { src: "/images/awards/diwali-gift.jpeg", alt: "Diwali gift distribution to employees" },
];

export const TEAM_IMAGES = {
  bangalore: "/images/team/hods-with-titan.jpeg",
  mumbai: "/images/team/team-mumbai.jpeg",
  delhi: "/images/team/team-delhi.jpeg",
  kolkata: "/images/team/team-kolkata.jpeg",
  surat: "/images/team/team-surat.jpeg",
  hosur: "/images/team/team-hosur.jpeg",
  udupi: "/images/team/team-udupi.jpeg",
};

export const LOGOS = {
  symbol: "/images/logos/bac-logo-symbol.png",
  full: "/images/logos/bac-logo-full.png",
};
