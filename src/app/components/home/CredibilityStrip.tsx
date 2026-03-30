import { motion } from "motion/react";
import { Building2, Briefcase } from "lucide-react";

export function CredibilityStrip() {
  const credentials = [
    { icon: Building2, text: "Titan Partnership", subtext: "Exclusive Partner" },
    { icon: Briefcase, text: "Corporate Jewelery Exclusiveship", subtext: "Industry Leader" },
  ];

  return (
    <section className="py-12 border-y border-primary/20 bg-card/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          {credentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: index * 0.08,
              }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                className="mb-3 p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2 + index * 0.08,
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <item.icon className="text-primary" size={24} />
              </motion.div>
              <div className="text-foreground font-semibold">{item.text}</div>
              <div className="text-primary/60 text-sm">{item.subtext}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
