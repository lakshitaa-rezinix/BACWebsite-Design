export const COMPANY = {
  name: "BOMBAY ASSAY COMPANY",
  shortName: "BAC",
  tagline: "BIS-Recognized Hallmarking Center",
  hq: "Head Office",
  whatsapp: "919999999999",
  email: "admin@bombayassay.com",
  phone: "+91-9606803916",
  about: `BOMBAY ASSAY COMPANY (BAC), a jewelry Quality Assurance firm creating new milestones in the field of assaying (testing) and hallmarking of precious metal items (gold, silver, platinum and palladium) in India. Being accredited to Bureau of Indian Standards (BIS), BAC aimed to bring a revolution in the Indian gold hallmarking industry. The process and facility of BAC matches and exceeds all the renowned global standards for the precious metal assessment.`,
  aboutExtended: `Having its HO at Bangalore and its branches at Indian economical capital Mumbai, another metro city Kolkata and Southern industrial hub Hosur, Western coast jewelry hub Udupi, the capital city Delhi, and Pantnagar, it can cover the vast Indian market. Machineries used in the assay centers, the highly skilled resources to handle the process and the guidance & backing of top notch think tanks of the industry, keeps the BAC an edge above the others.`,
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
    id: "head-office",
    city: "Head Office",
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
    id: "mumbai-1",
    city: "Mumbai-1",
    isHQ: false,
    address: "14 A, Paperbox, Ground Floor, Off Mahakali Caves Road, Andheri East, Mumbai, Maharashtra - 400093",
    phone: "+91-9606450305",
    email: "qm.bacm1@bombayassay.com",
    teamPhoto: "/images/team/team-mumbai.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mahakali+Caves+Road+Andheri+East+Mumbai+400093&zoom=14",
    mapPosition: { top: "54%", left: "22%" },
    description:
      "Serving Mumbai's thriving jewelry market from Andheri East.",
  },
  {
    id: "mumbai-2",
    city: "Mumbai-2",
    isHQ: false,
    address: "No. 103, 104, 105, 106, Floral Deck Plaza, 15A/15B, MIDC Central Road, Andheri East, Mumbai - 400093",
    phone: "+91-9606752916",
    email: "mumbai@bombayassay.com",
    teamPhoto: "/images/team/team-mumbai.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Floral+Deck+Plaza+MIDC+Central+Road+Andheri+East+Mumbai+400093&zoom=14",
    mapPosition: { top: "54%", left: "24%" },
    description:
      "Located in the heart of India's economic capital, serving Mumbai's thriving jewelry market.",
  },
  {
    id: "mumbai-qac",
    city: "Mumbai-QAC",
    isHQ: false,
    address: "E-219, 2nd Floor, Floral Deck, MIDC Central Road, Andheri East - 400093",
    phone: "+91-9606728916",
    email: "admin@qacenter.co.in",
    teamPhoto: "/images/team/team-mumbai.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=MIDC+Central+Road+Andheri+East+Mumbai+400093&zoom=14",
    mapPosition: { top: "54%", left: "20%" },
    description:
      "Quality Assurance Center serving Mumbai's jewelry industry.",
  },
  {
    id: "delhi",
    city: "Delhi",
    isHQ: false,
    address: "3rd Floor, #67, Phase 3, Okhla Industrial Estate, New Delhi - 110020",
    phone: "+91-9606752916",
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
    id: "pantnagar-ses",
    city: "Pantnagar-SES",
    isHQ: false,
    address: "CP-31, 3rd Floor, Sector City Park, Rudrapur, Udham Singh Nagar (Uttarakhand), Pin Code - 263153",
    phone: "+91-9606045205",
    email: "sesanalyticals@gmail.com",
    teamPhoto: "/images/team/hods-with-titan.jpeg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Rudrapur+Udham+Singh+Nagar+Uttarakhand+263153&zoom=14",
    mapPosition: { top: "18%", left: "40%" },
    description:
      "Serving the Uttarakhand region's precious metals industry.",
  },
  {
    id: "hosur",
    city: "Hosur",
    isHQ: false,
    address: "Plot No. 42/A4, 1st Floor, 5th Cross, Sipcot Industrial Complex, Phase-1, Mookandapalli Post, Hosur - 635126",
    phone: "+91-9606758916",
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
  { name: "CaratLane", description: "Trusted Partner", logo: "/images/clients/caratlane.jpg" },
  { name: "Tanishq", description: "Quality Partner", logo: "/images/clients/tanishq.svg" },
  { name: "Abharan", description: "Trusted Partner", logo: "/images/clients/abharan.svg" },
  { name: "Joyalukkas", description: "Retail Partner", logo: "/images/clients/joyalukkas.png" },
  { name: "Indriya", description: "Trusted Partner", logo: "/images/clients/indriya.svg" },
  { name: "H.K. Designs", description: "Design Partner", logo: "/images/clients/hk-logo.png" },
];

export const MILESTONES = [
  {
    year: "2020",
    title: "Company Founded",
    description:
      "BOMBAY ASSAY COMPANY established in Bangalore with a vision to revolutionize India's hallmarking industry. Launched digital Proficiency Testing Portal.",
  },
  {
    year: "2021",
    title: "BIS Recognition & Titan Partnership",
    description:
      "Received official accreditation from Bureau of Indian Standards (BIS) and became the exclusive hallmarking partner for Titan Company Limited.",
  },
  {
    year: "2023",
    title: "Pan-India Expansion",
    description:
      "Expanded operations across Mumbai, Delhi, Kolkata, Hosur, and Udupi, establishing a strong national presence.",
  },
  {
    year: "2024",
    title: "9 Centers & 10M+ Milestone",
    description:
      "Reached 9 operational centers and crossed 10 million pieces hallmarked annually.",
  },
  {
    year: "2025",
    title: "BIS Excellence Award",
    description:
      "Recognized by BIS for outstanding contribution to hallmarking standards in India.",
  },
];

export const SERVICES = [
  {
    id: "hallmarking",
    title: "Hallmarking",
    shortDesc: "BIS-certified hallmarking for gold, silver, and platinum jewelry",
    icon: "Shield",
  },
  {
    id: "testing",
    title: "NABL Testing & Assaying",
    shortDesc: "NABL-accredited XRF and Fire Assay methods for precise gold & silver analysis",
    icon: "FlaskConical",
  },
  {
    id: "destructive-testing",
    title: "Destructive Testing (DT)",
    shortDesc: "Fire Assay and acid parting for definitive metal purity determination",
    icon: "Flame",
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
  {
    id: "reference-materials",
    title: "Reference Materials",
    shortDesc: "Certified Reference Materials for Gold (375-999 PPT) & Silver (400-999 grade)",
    icon: "Gem",
  },
];
