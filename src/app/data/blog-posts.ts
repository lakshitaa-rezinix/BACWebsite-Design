export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bis-award-recognition-2024",
    title: "BAC Receives BIS Award for Excellence in Hallmarking",
    excerpt:
      "BOMBAY ASSAY COMPANY was honored by the Bureau of Indian Standards for outstanding contribution to hallmarking standards and quality assurance in the Indian jewelry industry.",
    content: `
      <p>We are proud to announce that BOMBAY ASSAY COMPANY has been recognized by the Bureau of Indian Standards (BIS) with an Award for Excellence in Hallmarking. This prestigious recognition underscores our unwavering commitment to maintaining the highest standards of quality in precious metal testing and hallmarking.</p>

      <h3>A Testament to Quality</h3>
      <p>Since our founding in 2004, BAC has been at the forefront of the hallmarking revolution in India. This award recognizes our consistent efforts in ensuring that every piece of jewelry that passes through our centers meets the stringent BIS standards.</p>

      <h3>Our Commitment</h3>
      <p>With over 10 million pieces processed annually across our 7 centers, we remain committed to our mission of "Delivering and protecting the mark of trust." This award motivates us to continue raising the bar for quality assurance in the Indian jewelry industry.</p>

      <p>We extend our gratitude to our dedicated team, our partners at Titan Company, and the Bureau of Indian Standards for this recognition.</p>
    `,
    image: "/images/awards/bis-award.jpeg",
    date: "2024-12-15",
    author: "BAC Communications",
    category: "Awards",
  },
  {
    slug: "advanced-training-program-hods",
    title: "Advanced Training Program for Head of Departments",
    excerpt:
      "BAC conducted a comprehensive training program for all HODs to enhance quality control processes and implement the latest testing methodologies across all centers.",
    content: `
      <p>BOMBAY ASSAY COMPANY recently concluded an intensive training program designed for Head of Departments across all our operational centers. The program focused on advanced quality control methodologies, new BIS compliance requirements, and the latest developments in precious metal testing technology.</p>

      <h3>Program Highlights</h3>
      <p>The training covered XRF analysis techniques, fire assay best practices, and the implementation of digital workflows for certificate generation. HODs from all 7 centers participated, fostering cross-center collaboration and knowledge sharing.</p>

      <h3>Continuous Improvement</h3>
      <p>At BAC, we believe that continuous learning is the foundation of excellence. These training programs ensure that our team stays ahead of industry developments and maintains the highest standards of precision in hallmarking and assaying.</p>
    `,
    image: "/images/awards/training-hods.jpeg",
    date: "2024-10-20",
    author: "BAC Training Team",
    category: "Training",
  },
  {
    slug: "titan-partnership-milestone",
    title: "Celebrating Our Exclusive Partnership with Titan Company",
    excerpt:
      "A look back at the journey of BAC's exclusive partnership with Titan Company Limited, India's premier jewelry brand, and the milestones we've achieved together.",
    content: `
      <p>The partnership between BOMBAY ASSAY COMPANY and Titan Company Limited stands as a testament to shared values of quality, integrity, and excellence. As Titan's exclusive hallmarking partner, BAC has played a pivotal role in ensuring that every piece of Titan jewelry meets the highest quality standards.</p>

      <h3>A Shared Vision</h3>
      <p>Both BAC and Titan share a commitment to transparency and consumer trust. Together, we've processed millions of jewelry pieces, each bearing the mark of certified quality that consumers trust and rely upon.</p>

      <h3>Looking Ahead</h3>
      <p>As we continue to grow this partnership, we are expanding our capabilities with advanced testing technologies and digital certification systems. The future holds even greater possibilities for quality assurance in India's jewelry industry.</p>
    `,
    image: "/images/awards/with-titan-team.jpeg",
    date: "2024-08-05",
    author: "BAC Communications",
    category: "Partnership",
  },
  {
    slug: "expansion-to-seven-centers",
    title: "BAC Expands to 7 Operational Centers Across India",
    excerpt:
      "With the addition of our Surat center, BAC now operates 7 hallmarking and assaying centers, strengthening our pan-India presence in jewelry quality assurance.",
    content: `
      <p>BOMBAY ASSAY COMPANY is proud to announce the expansion of our operations to 7 centers across India. With our newest center in Surat — India's diamond capital — we are now strategically positioned to serve the country's major jewelry manufacturing and trading hubs.</p>

      <h3>Our Centers</h3>
      <p>BAC operates from Bangalore (Head Office), Mumbai, Delhi, Kolkata, Surat, Hosur, and Udupi. Each center is fully equipped with state-of-the-art testing equipment and staffed by highly trained professionals.</p>

      <h3>Serving the Nation</h3>
      <p>This expansion allows us to process over 10 million pieces annually, making us one of the largest hallmarking networks in India. Our presence in key jewelry hubs ensures quick turnaround times and accessible quality assurance services for jewelers across the country.</p>
    `,
    image: "/images/facility/lab.jpeg",
    date: "2024-05-18",
    author: "BAC Communications",
    category: "Company News",
  },
  {
    slug: "understanding-hallmarking-process",
    title: "Understanding the Hallmarking Process: A Complete Guide",
    excerpt:
      "Everything you need to know about how jewelry hallmarking works, why it matters, and how BAC ensures the highest standards of accuracy in every hallmark.",
    content: `
      <p>Hallmarking is the process of certifying the purity of precious metals used in jewelry. It is a guarantee to consumers that the jewelry they purchase meets the declared quality standards. Here's a comprehensive guide to understanding the hallmarking process at BAC.</p>

      <h3>Step 1: Receiving & Registration</h3>
      <p>Jewelry lots are received at our centers, carefully documented, and assigned a unique tracking number for complete traceability throughout the process.</p>

      <h3>Step 2: Testing</h3>
      <p>Our certified technicians use advanced XRF (X-Ray Fluorescence) testing and traditional Fire Assay methods to determine the exact purity of precious metals. XRF provides non-destructive rapid analysis, while Fire Assay is the gold standard for definitive purity measurement.</p>

      <h3>Step 3: Marking</h3>
      <p>Pieces that meet BIS standards receive the official hallmark using precision laser marking technology. The hallmark includes the BIS logo, purity grade, assaying center mark, and year of hallmarking.</p>

      <h3>Step 4: Quality Control & Dispatch</h3>
      <p>Every hallmarked piece undergoes a final quality check before being dispatched back to the jeweler with a detailed certificate of authenticity.</p>
    `,
    image: "/images/facility/laser-marking.jpeg",
    date: "2024-03-10",
    author: "BAC Quality Team",
    category: "Education",
  },
];
