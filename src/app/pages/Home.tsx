import { useState } from "react";
import { LayoutTemplate, Sparkles, BookOpen, EyeOff, Eye } from "lucide-react";
import { HeroSection } from "../components/home/HeroSection";
import { HeroBackgroundPaths } from "../components/home/HeroBackgroundPaths";
import { HeroEditorial } from "../components/home/HeroEditorial";
import { CredibilityStrip } from "../components/home/CredibilityStrip";
import { ClientShowcase } from "../components/home/ClientShowcase";
import { ServicesGrid } from "../components/home/ServicesGrid";
import { ProficiencyHighlight } from "../components/home/ProficiencyHighlight";
import { StatisticsCounter } from "../components/home/StatisticsCounter";
import { LocationsMap } from "../components/home/LocationsMap";
import { CareersTeaser } from "../components/home/CareersTeaser";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { GoldDivider } from "../components/GoldDivider";

type HeroVariant = "showcase" | "paths" | "editorial";

const VARIANTS: { id: HeroVariant; label: string; icon: typeof LayoutTemplate; title: string }[] = [
  { id: "showcase", label: "Classic", icon: LayoutTemplate, title: "Classic hero with team showcase" },
  { id: "paths", label: "Animated", icon: Sparkles, title: "Animated paths hero" },
  { id: "editorial", label: "Editorial", icon: BookOpen, title: "Editorial luxury hero" },
];

export function Home() {
  const [heroVariant, setHeroVariant] = useState<HeroVariant>("showcase");
  const [toggleVisible, setToggleVisible] = useState(true);

  return (
    <div className="overflow-x-hidden">
      {heroVariant === "showcase" && <HeroSection />}
      {heroVariant === "paths" && <HeroBackgroundPaths />}
      {heroVariant === "editorial" && <HeroEditorial />}
      <CredibilityStrip />
      <ClientShowcase />
      <GoldDivider />
      <ServicesGrid />
      <ProficiencyHighlight />
      <StatisticsCounter />
      <CareersTeaser />
      <NewsletterSection />
      <GoldDivider />
      <LocationsMap />

      {/* Hero Variant Toggle */}
      <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2">
        {toggleVisible && (
          <div className="flex items-center bg-card/80 backdrop-blur-xl border border-primary/30 rounded-full p-1 shadow-lg shadow-black/20">
            {VARIANTS.map(({ id, label, icon: Icon, title }) => (
              <button
                key={id}
                onClick={() => setHeroVariant(id)}
                title={title}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  heroVariant === id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setToggleVisible((v) => !v)}
          title={toggleVisible ? "Hide hero switcher" : "Show hero switcher"}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-card/80 backdrop-blur-xl border border-primary/20 text-foreground/40 hover:text-foreground/70 shadow shadow-black/20 transition-all duration-200"
        >
          {toggleVisible ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>
    </div>
  );
}
