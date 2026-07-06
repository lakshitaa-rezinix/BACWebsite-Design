import { motion } from "motion/react";

interface IndiaLocationsMapProps {
  className?: string;
}

/**
 * Gold India map showing every BAC center. The pins and labels are baked
 * into the artwork (public/images/map/map.jpg), so this simply presents it
 * responsively with a soft themed glow.
 */
export function IndiaLocationsMap({ className = "" }: IndiaLocationsMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      {/* Soft gold glow behind the map */}
      <div className="absolute -inset-6 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <img
        src="/images/map/map.jpg"
        alt="Map of India showing Bombay Assay Company centers — Head Office (Bangalore), Mumbai, Delhi, Kolkata, Hosur, Udupi and Panthnagar-SES"
        className="relative w-full h-auto rounded-2xl select-none"
        draggable={false}
        loading="lazy"
      />
    </motion.div>
  );
}
