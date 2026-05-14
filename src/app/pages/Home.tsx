import { HeroBackgroundPaths } from "../components/home/HeroBackgroundPaths";
import { CredibilityStrip } from "../components/home/CredibilityStrip";
import { ClientShowcase } from "../components/home/ClientShowcase";
import { ServicesGrid } from "../components/home/ServicesGrid";
import { ProficiencyHighlight } from "../components/home/ProficiencyHighlight";
import { StatisticsCounter } from "../components/home/StatisticsCounter";
import { LocationsMap } from "../components/home/LocationsMap";
import { CareersTeaser } from "../components/home/CareersTeaser";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { GoldDivider } from "../components/GoldDivider";

export function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroBackgroundPaths />
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
    </div>
  );
}
