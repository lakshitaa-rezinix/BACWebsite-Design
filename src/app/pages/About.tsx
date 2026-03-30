import { motion } from "motion/react";
import { Award, Target, Eye, Users, Building2, TrendingUp, Compass, FileText, Download } from "lucide-react";
import { COMPANY, MILESTONES } from "../data/constants";
import { AWARD_IMAGES } from "../data/images";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";


export function About() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "Unwavering commitment to quality and precision in every service",
    },
    {
      icon: Target,
      title: "Integrity",
      description:
        "Fair, honest, transparent and ethical practices across all operations",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Dedicated to meeting and exceeding client expectations",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "Embracing technology and continuous improvement in hallmarking",
    },
  ];

  const bisCertificates = [
    { name: "Anupam Das", file: "/certificates/Anupam Das (1).pdf" },
    { name: "Ayan Dutta", file: "/certificates/Ayan Dutta (1).pdf" },
    { name: "Ayan Dutta (Advanced)", file: "/certificates/Ayan Dutta.pdf" },
    { name: "Ishwar Jha", file: "/certificates/Ishwar Jha.pdf" },
    { name: "Raju Das", file: "/certificates/Raju Das.pdf" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, #C6A75E 1px, transparent 1px),
              linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.08} animate>
                About Us
              </SplitTextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-xl"
            >
              <GoldShimmerText>
                India's trusted partner in jewelry quality assurance and
                hallmarking excellence
              </GoldShimmerText>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Setting the Standard for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  Quality & Trust
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>{COMPANY.about}</p>
                <p>{COMPANY.aboutExtended}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Building2, label: "9 Centers", desc: "Across India" },
                  {
                    icon: Users,
                    label: "100+ Experts",
                    desc: "Certified Professionals",
                  },
                  {
                    icon: Award,
                    label: "BIS Certified",
                    desc: "Recognized Authority",
                  },
                  {
                    icon: TrendingUp,
                    label: "5+ Years",
                    desc: "Industry Experience",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl text-center"
                  >
                    <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                      <stat.icon className="text-primary" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purpose, Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl"
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <Compass className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Purpose
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {COMPANY.purpose}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl"
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <Target className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {COMPANY.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl"
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <Eye className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {COMPANY.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/50 transition-all text-center"
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                  <value.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BIS Certified Staff */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              BIS Certified Staff
            </h2>
            <p className="text-muted-foreground text-lg">
              Our certified professionals across 9 centers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bisCertificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-xl border border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="aspect-video bg-card/50 flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <FileText className="text-primary" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {cert.name}
                  </h3>
                  <span className="text-xs text-primary/60 uppercase tracking-wider">BIS Certificate</span>
                </div>
                <div className="p-4 bg-card/50 flex items-center justify-center">
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <Download size={16} />
                    View Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Awards & Recognition
            </h2>
            <p className="text-muted-foreground text-lg">
              Recognized for excellence in hallmarking
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {AWARD_IMAGES.slice(0, 3).map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-xl border border-primary/20"
              >
                <img
                  src={award.src}
                  alt={award.alt}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-card/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Our journey of excellence and growth
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden lg:block" />

            <div className="space-y-12">
              {MILESTONES.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="inline-block p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-foreground text-lg font-semibold mb-1">
                        {milestone.title}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {milestone.description}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
