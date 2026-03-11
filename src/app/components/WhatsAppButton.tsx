import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { COMPANY } from "../data/constants";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-green-500 rounded-full"
      />
      <MessageCircle className="relative text-white" size={28} />
    </motion.a>
  );
}
