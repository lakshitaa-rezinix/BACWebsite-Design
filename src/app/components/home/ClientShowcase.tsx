import { motion } from "motion/react";
import { CLIENTS } from "../../data/constants";
import { SplitTextReveal } from "../animations/AnimatedText";
import { useState } from "react";

// Duplicate clients for seamless loop
const MARQUEE_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export function ClientShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-2"
          >
            Trusted Partners
          </motion.p>
          <h2 className="text-3xl font-bold text-foreground">
            <SplitTextReveal splitBy="word" staggerDelay={0.06}>
              Trusted by India's Leading Jewelry Brands
            </SplitTextReveal>
          </h2>
        </div>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Infinite marquee */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-8"
              animate={isPaused ? {} : { x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {MARQUEE_CLIENTS.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="group flex-shrink-0"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl px-10 py-8 flex flex-col items-center gap-3 min-w-[220px] transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(198,167,94,0.15)]">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-14 w-auto object-contain dark:invert transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                    <p className="text-muted-foreground text-sm">{client.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
