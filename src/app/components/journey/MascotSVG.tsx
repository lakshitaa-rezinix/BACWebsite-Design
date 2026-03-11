import { motion } from "motion/react";

interface MascotSVGProps {
  pose: "security" | "receiving" | "testing" | "furnace" | "weighing" | "stamping";
  className?: string;
}

export function MascotSVG({ pose, className = "" }: MascotSVGProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <g>
          {/* Lab coat / uniform */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            d="M 100 180 L 100 320 Q 100 340 120 340 L 180 340 Q 200 340 200 320 L 200 180 Q 200 160 180 155 L 160 150 L 140 150 L 120 155 Q 100 160 100 180 Z"
            fill="#8B95A5"
            stroke="#6B7585"
            strokeWidth="2"
          />
          {/* Coat lapels */}
          <path d="M 140 150 L 148 200 L 150 340" stroke="#6B7585" strokeWidth="1.5" fill="none" />
          <path d="M 160 150 L 152 200 L 150 340" stroke="#6B7585" strokeWidth="1.5" fill="none" />

          {/* ID Badge */}
          <motion.g
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "150px 180px" }}
          >
            <line x1="150" y1="155" x2="150" y2="185" stroke="#4A90D9" strokeWidth="2" />
            <rect x="135" y="185" width="30" height="22" rx="3" fill="#4A90D9" />
            <rect x="140" y="190" width="20" height="4" rx="1" fill="white" opacity="0.6" />
            <rect x="142" y="197" width="16" height="3" rx="1" fill="white" opacity="0.4" />
          </motion.g>
        </g>

        {/* Head */}
        <g>
          {/* Neck */}
          <rect x="138" y="135" width="24" height="20" rx="5" fill="#D4A574" />

          {/* Face */}
          <motion.ellipse
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            cx="150" cy="110" rx="45" ry="50" fill="#D4A574"
          />

          {/* Hair - spiky black */}
          <path d="M 105 100 Q 108 55 130 50 Q 140 45 150 42 Q 160 45 170 50 Q 192 55 195 100 Q 185 75 170 70 Q 155 65 150 60 Q 145 65 130 70 Q 115 75 105 100 Z" fill="#1a1a1a" />
          {/* Extra spiky bits */}
          <path d="M 120 70 L 115 50 L 130 65 Z" fill="#1a1a1a" />
          <path d="M 145 60 L 140 38 L 155 55 Z" fill="#1a1a1a" />
          <path d="M 165 62 L 170 40 L 175 60 Z" fill="#1a1a1a" />
          <path d="M 180 70 L 188 48 L 185 68 Z" fill="#1a1a1a" />

          {/* Beard/stubble */}
          <path d="M 118 120 Q 120 145 135 155 Q 145 160 150 162 Q 155 160 165 155 Q 180 145 182 120" fill="#3a3a3a" opacity="0.4" />

          {/* Eyes */}
          <motion.g
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
          >
            <ellipse cx="133" cy="105" rx="8" ry="9" fill="white" />
            <ellipse cx="167" cy="105" rx="8" ry="9" fill="white" />
            <circle cx="135" cy="105" r="4" fill="#2a2a2a" />
            <circle cx="169" cy="105" r="4" fill="#2a2a2a" />
            <circle cx="136" cy="103" r="1.5" fill="white" />
            <circle cx="170" cy="103" r="1.5" fill="white" />
          </motion.g>

          {/* Eyebrows */}
          <path d="M 122 92 Q 130 88 142 92" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 158 92 Q 170 88 178 92" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Friendly smile */}
          <motion.path
            animate={{ d: ["M 135 128 Q 150 142 165 128", "M 135 130 Q 150 145 165 130"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            stroke="#8B4513"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Nose */}
          <path d="M 148 112 Q 150 120 152 112" stroke="#C4956A" strokeWidth="1.5" fill="none" />
        </g>

        {/* Arms - pose dependent */}
        {pose === "security" && (
          <g>
            {/* Right arm raised - stop gesture */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              d="M 200 180 Q 230 160 240 130 Q 245 115 250 110"
              stroke="#8B95A5" strokeWidth="22" fill="none" strokeLinecap="round"
            />
            <circle cx="250" cy="105" r="16" fill="#D4A574" />
            {/* Open palm lines */}
            <line x1="242" y1="98" x2="242" y2="90" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" />
            <line x1="248" y1="96" x2="248" y2="87" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" />
            <line x1="254" y1="98" x2="254" y2="90" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" />
            <line x1="259" y1="100" x2="259" y2="94" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" />
            {/* Left arm on hip */}
            <path d="M 100 180 Q 70 200 65 230 Q 62 250 80 260" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
          </g>
        )}

        {pose === "receiving" && (
          <g>
            {/* Both arms extended - receiving */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              d="M 200 190 Q 230 200 250 195"
              stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round"
            />
            <motion.path
              d="M 100 190 Q 70 200 50 195"
              stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round"
            />
            {/* Hands cupped */}
            <circle cx="255" cy="195" r="12" fill="#D4A574" />
            <circle cx="45" cy="195" r="12" fill="#D4A574" />
            {/* Jewelry items floating */}
            <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <circle cx="150" cy="185" r="8" fill="none" stroke="#C6A75E" strokeWidth="2" />
              <ellipse cx="130" cy="190" rx="12" ry="6" fill="none" stroke="#C6A75E" strokeWidth="2" />
              <path d="M 170 182 L 175 175 L 180 182 L 175 195 Z" fill="none" stroke="#C6A75E" strokeWidth="2" />
            </motion.g>
          </g>
        )}

        {pose === "testing" && (
          <g>
            {/* Right arm operating machine */}
            <motion.path
              animate={{ rotate: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "200px 190px" }}
              d="M 200 190 Q 230 180 245 170"
              stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round"
            />
            <circle cx="248" cy="168" r="10" fill="#D4A574" />
            {/* Left arm on desk */}
            <path d="M 100 190 Q 80 210 75 240" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            <circle cx="73" cy="245" r="10" fill="#D4A574" />
            {/* XRF Machine hint */}
            <rect x="225" y="140" width="50" height="40" rx="5" fill="#6B7585" opacity="0.5" />
            <motion.rect
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              x="235" y="148" width="30" height="24" rx="2" fill="#4ADE80" opacity="0.4"
            />
          </g>
        )}

        {pose === "furnace" && (
          <g>
            {/* Arms with protective gloves */}
            <path d="M 200 190 Q 225 200 240 210" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            <path d="M 100 190 Q 75 200 60 210" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            {/* Thick gloves */}
            <ellipse cx="245" cy="215" rx="14" ry="12" fill="#F59E0B" />
            <ellipse cx="55" cy="215" rx="14" ry="12" fill="#F59E0B" />
            {/* Goggles on head */}
            <rect x="120" y="95" width="60" height="22" rx="11" fill="none" stroke="#6B7585" strokeWidth="3" />
            <circle cx="137" cy="106" r="9" fill="#88CCFF" opacity="0.4" stroke="#6B7585" strokeWidth="2" />
            <circle cx="163" cy="106" r="9" fill="#88CCFF" opacity="0.4" stroke="#6B7585" strokeWidth="2" />
            {/* Fire particles */}
            <motion.g animate={{ y: [0, -15], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <circle cx="150" cy="370" r="4" fill="#F97316" />
              <circle cx="140" cy="365" r="3" fill="#FBBF24" />
              <circle cx="160" cy="368" r="3" fill="#EF4444" />
            </motion.g>
          </g>
        )}

        {pose === "weighing" && (
          <g>
            {/* Right arm holding down on scale */}
            <path d="M 200 190 Q 220 220 235 240" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            <circle cx="238" cy="245" r="10" fill="#D4A574" />
            {/* Left arm with clipboard */}
            <path d="M 100 190 Q 75 200 65 220" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            <circle cx="63" cy="225" r="10" fill="#D4A574" />
            <rect x="48" y="215" width="25" height="35" rx="2" fill="white" opacity="0.7" />
            <line x1="53" y1="225" x2="68" y2="225" stroke="#666" strokeWidth="1" />
            <line x1="53" y1="230" x2="68" y2="230" stroke="#666" strokeWidth="1" />
            <line x1="53" y1="235" x2="65" y2="235" stroke="#666" strokeWidth="1" />
            {/* Scale hint */}
            <motion.g animate={{ rotate: [0, -2, 2, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: "240px 270px" }}>
              <rect x="215" y="265" width="50" height="8" rx="2" fill="#6B7585" />
              <rect x="225" y="255" width="30" height="10" rx="2" fill="#8B95A5" />
            </motion.g>
          </g>
        )}

        {pose === "stamping" && (
          <g>
            {/* Right arm with stamp tool */}
            <motion.g
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M 200 190 Q 225 195 240 200" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
              <circle cx="245" cy="202" r="10" fill="#D4A574" />
              {/* Laser tool */}
              <rect x="240" y="195" width="8" height="30" rx="2" fill="#6B7585" />
              <motion.circle
                animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                cx="244" cy="228" fill="#EF4444"
              />
            </motion.g>
            {/* Left arm holding piece */}
            <path d="M 100 190 Q 80 210 75 235" stroke="#8B95A5" strokeWidth="20" fill="none" strokeLinecap="round" />
            <circle cx="73" cy="240" r="10" fill="#D4A574" />
            {/* HUID text floating */}
            <motion.text
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              x="170" y="260" fill="#C6A75E" fontSize="10" fontFamily="monospace" fontWeight="bold"
            >
              HUID
            </motion.text>
          </g>
        )}

        {/* Legs */}
        <rect x="118" y="340" width="24" height="50" rx="5" fill="#4A5568" />
        <rect x="158" y="340" width="24" height="50" rx="5" fill="#4A5568" />
        {/* Shoes */}
        <ellipse cx="130" cy="392" rx="18" ry="8" fill="#2D3748" />
        <ellipse cx="170" cy="392" rx="18" ry="8" fill="#2D3748" />
      </svg>
    </div>
  );
}
