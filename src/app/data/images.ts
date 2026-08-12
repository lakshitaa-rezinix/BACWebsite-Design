export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: "Lab" | "Process" | "Equipment" | "QC" | "Recognition";
}

export const FACILITY_IMAGES: GalleryImage[] = [
  {
    src: "/images/facility/receiving.jpeg",
    alt: "BAC receiving desk with operators registering incoming jewelry lots beside a live workflow status board",
    title: "Receiving & Registration",
    caption: "\"Here it begins\" — every incoming lot is registered here, with a live status board tracking counts across receiving, XRF, sampling, fire assay, marking, and dispatch.",
    category: "Process",
  },
  {
    src: "/images/facility/receiving-dispatch.jpeg",
    alt: "Three BAC staff members verifying and sealing packed jewelry consignments at the dispatch table",
    title: "Dispatch Packing",
    caption: "Hallmarked consignments are re-verified, sealed, and labeled at the dispatch bay before returning to the jeweler — closing the chain of custody.",
    category: "QC",
  },
  {
    src: "/images/facility/sampling-counter.jpeg",
    alt: "Operators at the BAC sampling counter with a precision balance behind a glass draft shield",
    title: "Sampling Counter",
    caption: "Samples are drawn and weighed on a draft-shielded precision balance at the secure Sample In/Out counter, under continuous CCTV coverage.",
    category: "Process",
  },
  {
    src: "/images/facility/sampling.jpeg",
    alt: "Wide view of the BAC sampling room with technicians, colour-coded trays, and the sampling window",
    title: "Sampling Room",
    caption: "Colour-coded trays route every lot through its correct test path — a simple, visual system that prevents mix-ups at scale.",
    category: "Process",
  },
  {
    src: "/images/facility/sorting-table.jpeg",
    alt: "Three BAC technicians laying out gold jewelry on velvet trays at the sorting and inspection table",
    title: "Sorting & Inspection",
    caption: "Articles are laid out on velvet trays, counted, and inspected piece by piece before testing begins — nothing enters the workflow uncounted.",
    category: "QC",
  },
  {
    src: "/images/facility/xrf-bay.jpeg",
    alt: "Two operators working at the XRF-1 and XRF-2 analysis stations in the BAC testing bay",
    title: "XRF Testing Bay",
    caption: "Parallel XRF stations keep throughput high without compromising accuracy — non-destructive purity screening on every article received.",
    category: "Equipment",
  },
  {
    src: "/images/facility/xrf-spectrocube.jpeg",
    alt: "Operator loading jewelry samples into an Ametek SpectroCube XRF analyzer beside trays of gold articles",
    title: "SpectroCube XRF Analyzer",
    caption: "The Ametek SpectroCube reports full elemental composition in seconds — gold, silver, and platinum measured without damaging the piece.",
    category: "Equipment",
  },
  {
    src: "/images/facility/xrf-iedx.jpeg",
    alt: "Technician placing a jewelry sample into an iEDX-100A XRF spectrometer with results on screen",
    title: "iEDX-100A Spectrometer",
    caption: "Live purity readings appear on screen as each article is scanned — results logged directly against the lot's tracking number.",
    category: "Equipment",
  },
  {
    src: "/images/facility/xrf-analysis.jpeg",
    alt: "Operator running XRF analysis on a tray of gold jewelry in the BAC testing room",
    title: "Non-Destructive Analysis",
    caption: "Full trays of finished jewelry are screened article by article — every piece verified, none altered or damaged in the process.",
    category: "QC",
  },
  {
    src: "/images/facility/laser-marking.jpeg",
    alt: "Technician operating a Sparts Laser HUID marking machine below a jewelry marking-position chart",
    title: "HUID Laser Marking",
    caption: "The six-digit HUID is engraved under microscope guidance, positioned to the marking chart above the station so the mark never spoils the design.",
    category: "Equipment",
  },
  {
    src: "/images/facility/marking-bay.jpeg",
    alt: "Wide view of the BAC marking bay with a large marking-positions and Tag ID sequence reference chart",
    title: "Marking Bay",
    caption: "Marking positions for bangles, rings, earrings, pendants, nose pins, and chains are standardised on the wall chart — consistent placement, every operator, every shift.",
    category: "Equipment",
  },
  {
    src: "/images/facility/fire-assay-hall.jpeg",
    alt: "Assayer in protective face shield working a glowing cupellation furnace in the BAC fire assay hall",
    title: "Fire Assay Hall",
    caption: "Fire assay remains the definitive purity method. Here an assayer works the cupellation furnace at over 1000°C in full protective gear.",
    category: "Lab",
  },
  {
    src: "/images/facility/furnace-area.jpeg",
    alt: "Wide view of the BAC furnace area with cupellation, melting, and annealing furnaces",
    title: "Furnace Area",
    caption: "Cupellation, melting, and annealing furnaces run side by side under dedicated fume extraction — the high-temperature heart of the assay lab.",
    category: "Lab",
  },
  {
    src: "/images/facility/cupellation-furnace.jpeg",
    alt: "Technician in face shield and heat-resistant gloves loading a cupel tray into a glowing cupellation furnace",
    title: "Cupellation",
    caption: "Cupels enter the furnace and base metals are absorbed away, leaving only the precious metal bead — the step that makes fire assay definitive.",
    category: "Process",
  },
  {
    src: "/images/facility/assay-prep.jpeg",
    alt: "Assayer in lab coat and respirator preparing a cupel tray at the fire assay prep bench",
    title: "Assay Preparation",
    caption: "Samples are wrapped, arranged, and logged on the daily board before firing — traceability is established before a single cupel goes in.",
    category: "Process",
  },
  {
    src: "/images/facility/cupel-preparation.jpeg",
    alt: "Gloved technician preparing cupels in a moulding tray at the BAC assay lab",
    title: "Cupel Preparation",
    caption: "Cupels are pressed and prepared in-house for every batch — a fresh, uncontaminated vessel behind each individual assay result.",
    category: "Process",
  },
  {
    src: "/images/facility/rolling-mill.jpeg",
    alt: "Technician flattening assay beads on a hand-operated rolling mill beside cupel moulding trays",
    title: "Bead Rolling",
    caption: "The recovered bead is rolled flat and coiled to maximise surface area — preparing it for clean, complete acid parting.",
    category: "Process",
  },
  {
    src: "/images/facility/parting-zone.jpeg",
    alt: "Assayer recording batch details on a whiteboard in the BAC parting zone beside an annealing furnace",
    title: "Parting Zone",
    caption: "A controlled, segregated zone for acid parting operations, with batch details recorded at every handover between stages.",
    category: "Lab",
  },
  {
    src: "/images/facility/acid-parting.jpeg",
    alt: "Technician in face shield and acid-resistant gloves performing acid parting inside a fume hood",
    title: "Acid Parting",
    caption: "Silver is dissolved away from gold with nitric acid inside the fume hood — full PPE, scrubbed extraction, and an emergency shower within reach.",
    category: "Process",
  },
  {
    src: "/images/facility/assay-weighing.jpeg",
    alt: "Assayer recording microbalance readings at the weighing bench with stacks of cupels alongside",
    title: "Gravimetric Weighing",
    caption: "Before and after firing, each bead is weighed on a microbalance and recorded by hand — the gravimetric difference gives the final purity figure.",
    category: "Lab",
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
  hosur: "/images/team/team-hosur.jpeg",
  udupi: "/images/team/team-udupi.jpeg",
};

export const LOGOS = {
  symbol: "/images/logos/bac-logo-symbol.png",
  full: "/images/logos/bac-logo-full.png",
};
