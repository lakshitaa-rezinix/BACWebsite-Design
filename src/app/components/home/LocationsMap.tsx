import { motion } from "motion/react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { LOCATIONS } from "../../data/constants";
import { SplitTextReveal } from "../animations/AnimatedText";

export function LocationsMap() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].id);

  const activeLocation = LOCATIONS.find((l) => l.id === selectedLocation) ?? LOCATIONS[0];

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <SplitTextReveal splitBy="word" staggerDelay={0.07}>
              Our Locations
            </SplitTextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            7 centers across India for your convenience
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Google Maps Embed with border animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className="relative"
          >
            <div className="relative aspect-square bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(198,167,94,0.3)",
                }}
                animate={{
                  boxShadow: [
                    "inset 0 0 0 1px rgba(198,167,94,0.1)",
                    "inset 0 0 0 2px rgba(198,167,94,0.3)",
                    "inset 0 0 0 1px rgba(198,167,94,0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <iframe
                key={activeLocation.id}
                src={activeLocation.mapEmbedUrl}
                title={`${activeLocation.city} - BAC Location`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className="space-y-3 max-h-[600px] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin"
          >
            {LOCATIONS.map((location, index) => (
              <Link
                key={location.id}
                to={`/locations/${location.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: index * 0.06,
                  }}
                  whileHover={{ x: -3 }}
                  className={`p-5 bg-card/50 backdrop-blur-sm border rounded-xl transition-all cursor-pointer mb-3 ${
                    selectedLocation === location.id
                      ? "border-primary bg-primary/5"
                      : "border-primary/20 hover:border-primary/50"
                  }`}
                  onMouseEnter={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-2.5 bg-primary/10 rounded-lg shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <MapPin className="text-primary" size={20} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {location.city}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {location.address}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone size={12} className="text-primary" />
                          {location.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail size={12} className="text-primary" />
                          {location.email}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className="text-primary/50 shrink-0 mt-1"
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
