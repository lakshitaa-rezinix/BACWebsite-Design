export const COMPANY = {
  name: "Bombay Assay Company",
  shortName: "BAC",
  tagline: "BIS-Recognized Hallmarking Center",
  hq: "Bangalore",
  whatsapp: "919999999999",
  email: "admin@bombayassay.com",
  phone: "+91-9606803916",
  about: `Bombay Assay Company (BAC), a jewelry Quality Assurance firm creating new milestones in the field of assaying (testing) and hallmarking of precious metal items (gold, silver, platinum and palladium) in India. Being accredited to Bureau of Indian Standards (BIS), BAC aimed to bring a revolution in the Indian gold hallmarking industry. The process and facility of BAC matches and exceeds all the renowned global standards for the precious metal assessment.`,
  aboutExtended: `Having its HO at Bangalore and its branches at Indian economical capital Mumbai, another metro city Kolkata and Southern industrial hub Hosur, Western coast jewelry hub Udupi, the capital city Delhi and Diamond capital Surat, it can cover the vast Indian market. Machineries used in the assay centers, the highly skilled resources to handle the process and the guidance & backing of top notch think tanks of the industry, keeps the BAC an edge above the others.`,
  purpose:
    "To be a leader in the Indian Precious metal hallmarking & Quality Assurance through exclusive corporate Clientship",
  vision:
    "To be a model QA center and to showcase the new level of hallmarking and ensure the best quality to Indian Jewelry Corporates",
  mission: "Delivering and protecting the mark of trust",
};

export interface Location {
  id: string;
  city: string;
  isHQ: boolean;
  address: string;
  phone: string;
  email: string;
  teamPhoto: string;
  mapEmbedUrl: string;
  mapPosition: { top: string; left: string };
  description: string;
}

export const LOCATIONS: Location[] = [
  {
    id: "bangalore",
    city: "Bangalore",
    isHQ: true,
    address: "First Floor, No. 750, 33 Road, A Cross, 9th Main, Jayanagar 4th Block, Bangalore - 560011",
    phone: "+91-9606803916",
    email: "admin@bombayassay.com",
    teamPhoto: "/images/team/hods-with-titan.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Jayanagar+4th+Block+Bangalore+560011&zoom=14",
    mapPosition: { top: "74%", left: "44%" },
    description:
      "Our headquarters and primary quality assurance center, leading BAC's operations across India.",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    isHQ: false,
    address: "No. 103, 104, 105, 106, Floral Deck Plaza, 15A/15B, MIDC Central Road, Andheri East, Mumbai - 400093",
    phone: "+91-22-46036812",
    email: "mumbai@bombayassay.com",
    teamPhoto: "/images/team/team-mumbai.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Floral+Deck+Plaza+MIDC+Central+Road+Andheri+East+Mumbai+400093&zoom=14",
    mapPosition: { top: "54%", left: "22%" },
    description:
      "Located in the heart of India's economic capital, serving Mumbai's thriving jewelry market at Zaveri Bazaar.",
  },
  {
    id: "delhi",
    city: "Delhi",
    isHQ: false,
    address: "3rd Floor, #67, Phase 3, Okhla Industrial Estate, New Delhi - 110020",
    phone: "+91-9606450307",
    email: "delhi@bombayassay.com",
    teamPhoto: "/images/team/team-delhi.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Okhla+Industrial+Estate+Phase+3+New+Delhi+110020&zoom=14",
    mapPosition: { top: "22%", left: "42%" },
    description:
      "Serving the capital city's jewelry industry from the bustling Karol Bagh area.",
  },
  {
    id: "kolkata",
    city: "Kolkata",
    isHQ: false,
    address: "No. GJB 3C6, 3rd Floor of SDF B Block, Gems and Jewellery Park, Ankurhati, Howrah, West Bengal - 711409",
    phone: "+91-9606758916",
    email: "kolkata@bombayassay.com",
    teamPhoto: "/images/team/team-kolkata.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Gems+and+Jewellery+Park+Ankurhati+Howrah+West+Bengal+711409&zoom=14",
    mapPosition: { top: "42%", left: "67%" },
    description:
      "Our eastern India hub, catering to Kolkata's historic gold jewelry market.",
  },
  {
    id: "surat",
    city: "Surat",
    isHQ: false,
    address: "#501, 502 International Finance Center, Nr. Vesu Fire Station, VIP Road, Vesu, Surat - 395007",
    phone: "+91-9606494312",
    email: "surat@bombayassay.com",
    teamPhoto: "/images/team/team-surat.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=International+Finance+Center+Vesu+Surat+395007&zoom=14",
    mapPosition: { top: "47%", left: "21%" },
    description:
      "Strategically located in India's Diamond capital, serving the diamond and gold trade hub.",
  },
  {
    id: "hosur",
    city: "Hosur",
    isHQ: false,
    address: "Plot No. 42/A4, 1st Floor, 5th Cross, Sipcot Industrial Complex, Phase-1, Mookandapalli Post, Hosur - 635126",
    phone: "+91-4344295916",
    email: "hosur@bombayassay.com",
    teamPhoto: "/images/team/team-hosur.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Sipcot+Industrial+Complex+Hosur+635126&zoom=14",
    mapPosition: { top: "76%", left: "45%" },
    description:
      "Our southern industrial hub, serving the growing precious metals industry in Tamil Nadu.",
  },
  {
    id: "udupi",
    city: "Udupi",
    isHQ: false,
    address: "1st Floor, Abharan Foundation, 2-45D, Shivalli Village, Perampalli Ward, Shimbra Road, Udupi - 576104",
    phone: "+91-9606450308",
    email: "udupi@bombayassay.com",
    teamPhoto: "/images/team/team-udupi.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Shivalli+Village+Udupi+576104&zoom=14",
    mapPosition: { top: "73%", left: "29%" },
    description:
      "Covering the western coast jewelry hub, serving Karnataka's coastal jewelry market.",
  },
];

export const CLIENTS = [
  { name: "Titan Company", description: "Exclusive Partner", logo: "/images/clients/titan.svg" },
  { name: "Caratlane", description: "Trusted Partner", logo: "/images/clients/caratlane.svg" },
  { name: "Tanishq", description: "Quality Partner", logo: "/images/clients/tanishq.svg" },
];

export const MILESTONES = [
  {
    year: "2004",
    title: "Company Founded",
    description:
      "Bombay Assay Company established in Bangalore with a vision to revolutionize India's hallmarking industry.",
  },
  {
    year: "2008",
    title: "BIS Recognition",
    description:
      "Received official accreditation from Bureau of Indian Standards (BIS) as a recognized hallmarking center.",
  },
  {
    year: "2012",
    title: "Titan Partnership",
    description:
      "Became the exclusive hallmarking partner for Titan Company Limited, India's premier jewelry brand.",
  },
  {
    year: "2016",
    title: "Pan-India Expansion",
    description:
      "Expanded to 5 operational centers across Mumbai, Delhi, Kolkata, Hosur, and Udupi.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched the digital Proficiency Testing Portal for online registration and certificate management.",
  },
  {
    year: "2023",
    title: "7 Centers & 10M+ Milestone",
    description:
      "Reached 7 operational centers and crossed 10 million pieces hallmarked annually with Surat center.",
  },
  {
    year: "2024",
    title: "BIS Excellence Award",
    description:
      "Recognized by BIS for outstanding contribution to hallmarking standards in India.",
  },
];

export const SERVICES = [
  {
    id: "hallmarking",
    title: "Hallmarking Services",
    shortDesc: "BIS-certified hallmarking for gold, silver, and platinum jewelry",
    icon: "Shield",
  },
  {
    id: "testing",
    title: "Testing & Assaying",
    shortDesc: "XRF and Fire Assay methods for precise precious metal analysis",
    icon: "FlaskConical",
  },
  {
    id: "quality-control",
    title: "Total Quality Control",
    shortDesc: "Comprehensive quality audits, compliance, and training programs",
    icon: "CheckCircle",
  },
  {
    id: "diamond-certification",
    title: "Diamond Certification",
    shortDesc: "4C grading, authenticity verification, and laser inscription",
    icon: "Gem",
  },
];
