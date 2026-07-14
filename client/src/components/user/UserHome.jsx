import HeroSection from "./home/HeroSection";
import SpotlightSection from "./home/SpotlightSection";
import NewAndNoteworthy from "./home/NewAndNoteworthy";
import MostBookedSection from "./home/MostBookedSection";
import CategoryRailSection from "./home/CategoryRailSection";
import PromoBanner from "./home/PromoBanner";

/**
 * UserHome — the customer landing page. Composes homepage sections in order,
 * for electrician and plumbing services.
 */
export default function UserHome() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-6">
      <HeroSection />
      <SpotlightSection />
      <NewAndNoteworthy />
      <MostBookedSection />

      <PromoBanner id="emergency-plumbing" />
      <PromoBanner id="electrical-safety" />

      <CategoryRailSection railKey="plumbing-services" />
      <PromoBanner id="bathroom-plumbing" />

      <CategoryRailSection railKey="electrical-services" />
      <CategoryRailSection railKey="home-repair" />
      <CategoryRailSection railKey="emergency-help" />

      <PromoBanner id="electrical-installation" />
    </div>
  );
}
