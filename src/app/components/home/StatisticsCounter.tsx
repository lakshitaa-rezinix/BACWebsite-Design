import { motion, useMotionValue, animate, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Package, MapPin, CheckCircle } from "lucide-react";
import { SplitTextReveal } from "../animations/AnimatedText";
import { TiltCard } from "../animations/TiltCard";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const unsubscribe = count.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, isInView]);

  return (
    <span ref={ref} className="font-mono">
      {display}
      {suffix}
    </span>
  );
}

export function StatisticsCounter() {
  const stats = [
    {
      icon: Package,
      value: 10,
      suffix: "M+",
      label: "Annual Capacity",
      description: "Pieces processed yearly"
    },
    {
      icon: MapPin,
      value: 7,
      suffix: "",
      label: "Centers",
      description: "Across India"
    },
    {
      icon: CheckCircle,
      value: 100,
      suffix: "%",
      label: "Compliance",
      description: "Quality assurance"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <SplitTextReveal splitBy="word" staggerDelay={0.07}>
              By The Numbers
            </SplitTextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Trusted by thousands across the nation
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: index * 0.15,
              }}
              className="relative group"
            >
              <TiltCard className="rounded-2xl">
                <div className="relative p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl text-center overflow-hidden hover:border-primary/50 transition-all">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="text-primary" size={32} />
                    </div>

                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {stat.label}
                    </h3>

                    <p className="text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
