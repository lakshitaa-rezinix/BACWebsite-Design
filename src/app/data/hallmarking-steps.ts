export interface HallmarkingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  facts: string[];
  posterImage: string;
  bgAccent: string;
}

export const HALLMARKING_STEPS: HallmarkingStep[] = [
  {
    id: 1,
    title: "Security Check",
    subtitle: "Stop, Drop and Walk",
    description:
      "Every journey begins at the security checkpoint. Visitors and staff must deposit all personal belongings — phones, laptops, jewelry, wallets, and metallic items — before entering the assay center. Walking through the metal detector metal-free ensures the integrity of the testing environment and prevents contamination of samples.",
    facts: [
      "All electronics must be deposited at entry",
      "Metal detector screening for every person",
      "Jewelry handling requires a sterile environment",
      "Security protocols match international assay standards",
    ],
    posterImage: "/images/posters/work-instruction-6.jpg",
    bgAccent: "from-blue-500/5 to-transparent",
  },
  {
    id: 2,
    title: "Receiving & Cataloguing",
    subtitle: "Here It Begins",
    description:
      "Jewelry items arrive at the receiving counter — rings, bangles, pendants, chains, and more. Each piece is carefully catalogued, tagged with a unique identifier, and logged into the system. This meticulous documentation ensures complete traceability throughout the entire hallmarking process.",
    facts: [
      "Each piece gets a unique tracking ID",
      "Items catalogued by type: rings, bangles, pendants, chains",
      "Weight recorded to 0.001g precision",
      "Digital logging for complete traceability",
    ],
    posterImage: "/images/posters/work-instruction-1.jpg",
    bgAccent: "from-amber-500/5 to-transparent",
  },
  {
    id: 3,
    title: "XRF Purity Testing",
    subtitle: "Purity Guaranteed Right Here",
    description:
      "Using the Spectro Cube XRF (X-Ray Fluorescence) machine, each piece undergoes non-destructive purity analysis. The machine fires X-rays at the sample and measures the fluorescent response to determine exact metal composition. Results show karatage for gold (24K, 22K, 18K, 14K) and fineness for silver (990 to 800).",
    facts: [
      "Non-destructive XRF testing with Spectro Cube",
      "Gold grades: 24K (999), 22K (916), 18K (750), 14K (585)",
      "Silver grades: 990, 925, 900, 835, 800",
      "Results in under 60 seconds per sample",
    ],
    posterImage: "/images/posters/work-instruction-2.jpg",
    bgAccent: "from-emerald-500/5 to-transparent",
  },
  {
    id: 4,
    title: "Fire Assay",
    subtitle: "Purity Unleashed!",
    description:
      "For the most precise determination of gold purity, Fire Assay remains the gold standard. Samples are placed in a high-temperature furnace where base metals (Nickel, Lead, Copper) are separated from precious metals (Gold, Silver). This ancient yet highly accurate method requires full PPE — gloves, goggles, mask, boots, and helmet.",
    facts: [
      "Furnace temperatures exceed 1,100°C",
      "Separates Au from Ag, Ni, Pb, Cu impurities",
      "Most accurate method for gold purity testing",
      "Full PPE required: gloves, goggles, mask, boots, helmet",
    ],
    posterImage: "/images/posters/work-instruction-4.jpg",
    bgAccent: "from-orange-500/5 to-transparent",
  },
  {
    id: 5,
    title: "Quality Control",
    subtitle: "Cut, Weigh, Test, Confirm!",
    description:
      "The QC stage is where precision meets trust. Pieces are weighed on calibrated scales — an initial weight of 1000 units compared against the final weight of 916 for 22K gold confirms the purity grade. The gold alloy composition chart breaks down exactly how much Au, Ag, Cu, Ni, and Pd is present in each karat grade.",
    facts: [
      "Calibrated scales accurate to 0.001g",
      "22K gold: 91.6% Au, remaining Ag/Cu alloy",
      "18K gold: 75.0% Au with varied alloy compositions",
      "White gold contains Ni or Pd for color",
    ],
    posterImage: "/images/posters/work-instruction-5.jpg",
    bgAccent: "from-violet-500/5 to-transparent",
  },
  {
    id: 6,
    title: "Hallmarking & Certification",
    subtitle: "The Mark of Trust Begins Here!",
    description:
      "The final and most critical step — the HUID (Hallmark Unique Identification) is laser-stamped onto each piece. The hallmark includes four components: the BIS Standard Mark, the Purity Grade (22K916 for gold, 925 for silver), the Assay Center's identification mark, and the Jeweler's identification mark. This mark is your guarantee of purity.",
    facts: [
      "HUID: 6-digit alphanumeric unique code",
      "BIS Standard Mark certifies government approval",
      "Purity grade: 22K916 (gold), 925 (silver)",
      "Laser marking ensures permanent, tamper-proof identification",
    ],
    posterImage: "/images/posters/work-instruction-3.jpg",
    bgAccent: "from-primary/5 to-transparent",
  },
];
