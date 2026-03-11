import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Award, FlaskConical, Zap, ShieldCheck, Layers } from "lucide-react";
import { ALL_GALLERY_IMAGES, type GalleryImage } from "../data/images";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";

type Category = "All" | "Lab" | "Process" | "Equipment" | "QC" | "Recognition";

const CATEGORIES: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "All", label: "All", icon: Layers },
  { id: "Lab", label: "Fire Assay Lab", icon: FlaskConical },
  { id: "Process", label: "Process", icon: Zap },
  { id: "Equipment", label: "Equipment", icon: ShieldCheck },
  { id: "QC", label: "Quality Control", icon: ShieldCheck },
  { id: "Recognition", label: "Recognition", icon: Award },
];

const CATEGORY_COUNTS = CATEGORIES.map((c) => ({
  id: c.id,
  count: c.id === "All" ? ALL_GALLERY_IMAGES.length : ALL_GALLERY_IMAGES.filter((img) => img.category === c.id).length,
}));

function CategoryBadge({ category }: { category: GalleryImage["category"] }) {
  const colours: Record<GalleryImage["category"], string> = {
    Lab: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Process: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Equipment: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    QC: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Recognition: "bg-primary/20 text-primary border-primary/30",
  };
  const labels: Record<GalleryImage["category"], string> = {
    Lab: "Lab",
    Process: "Process",
    Equipment: "Equipment",
    QC: "QC",
    Recognition: "Recognition",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${colours[category]}`}>
      {labels[category]}
    </span>
  );
}

function GalleryCard({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      onClick={onClick}
      className="group cursor-pointer break-inside-avoid mb-5 relative rounded-2xl overflow-hidden border border-primary/15 hover:border-primary/50 bg-card/20 shadow-[0_2px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_40px_rgba(198,167,94,0.15)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Gold mask — covers image by default, lifts on hover to reveal full color */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-amber-700/45 to-amber-950/85 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

        {/* Gradient overlay — always slightly present for readability, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CategoryBadge category={image.category} />
        </div>

        {/* Expand hint — top right */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
            <path d="M1 1h4M1 1v4M11 1H7M11 1v4M1 11h4M1 11V7M11 11H7M11 11V7" />
          </svg>
        </div>

        {/* Title + caption slide up */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-foreground font-semibold text-sm leading-tight mb-1">{image.title}</p>
          <p className="text-foreground/60 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {image.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}) {
  const image = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-2xl flex flex-col"
      onClick={onClose}
    >
      {/* Top bar — counter + close, always above image */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="px-3 py-1 rounded-full bg-card/60 border border-primary/20 text-xs text-foreground/50">
          {index + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-card/60 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/60 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav — prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
        disabled={index === 0}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/70 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/60 disabled:opacity-20 disabled:cursor-not-allowed transition-all z-10"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Nav — next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
        disabled={index === images.length - 1}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/70 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/60 disabled:opacity-20 disabled:cursor-not-allowed transition-all z-10"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main content */}
      <div
        className="flex-1 flex flex-col items-center justify-center gap-5 px-16 pb-6 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl object-contain shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            style={{ maxHeight: "65vh", width: "auto", maxWidth: "100%" }}
          />
        </AnimatePresence>

        {/* Caption card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={image.src + "-caption"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="w-full max-w-xl bg-card/50 backdrop-blur-sm border border-primary/15 rounded-2xl px-6 py-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <CategoryBadge category={image.category} />
            </div>
            <h3 className="text-foreground font-semibold text-base mb-1.5">{image.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{image.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? ALL_GALLERY_IMAGES
      : ALL_GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigateLightbox = useCallback((direction: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const next = prev + direction;
      return next >= 0 && next < filtered.length ? next : prev;
    });
  }, [filtered.length]);

  // Lock scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        {/* Gold grid bg */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #C6A75E 1px, transparent 1px), linear-gradient(to bottom, #C6A75E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.08} animate>
                Our Facilities
              </SplitTextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-xl"
            >
              <GoldShimmerText>
                State-of-the-art laboratories, precision equipment, and the people behind every hallmark
              </GoldShimmerText>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Thin gold rule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────── */}
      <section className="py-8 sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = CATEGORY_COUNTS.find((c) => c.id === cat.id)?.count ?? 0;
              const isActive = activeCategory === cat.id;
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_2px_16px_rgba(198,167,94,0.4)]"
                      : "bg-card/50 text-foreground/60 border border-primary/20 hover:border-primary/50 hover:text-foreground/90"
                  }`}
                >
                  {cat.id !== "All" && <Icon size={13} className={isActive ? "text-primary-foreground/80" : "text-primary/60"} />}
                  {cat.label}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-primary/10 text-primary/60"}`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid (CSS masonry) ───────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-5"
              >
                {filtered.map((image, index) => (
                  <GalleryCard
                    key={image.src}
                    image={image}
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-muted-foreground text-lg">No images in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Stats footer ────────────────────────────────────── */}
      <section className="py-16 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "7", label: "Locations" },
              { value: "19", label: "Facility Images" },
              { value: "7", label: "Recognition Moments" },
              { value: "10M+", label: "Pieces Annually" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
