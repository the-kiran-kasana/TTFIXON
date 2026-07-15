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
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8">
      <HeroSection />
      <SpotlightSection />

      <PromoBanner id="emergency-plumbing" />

      <NewAndNoteworthy />
      <MostBookedSection />

      <PromoBanner id="electrical-safety" />

      <CategoryRailSection railKey="plumbing-services" />
      <PromoBanner id="bathroom-plumbing" />

      <CategoryRailSection railKey="electrical-services" />
      <CategoryRailSection railKey="emergency-help" />

      <PromoBanner id="electrical-installation" />
    </div>
  );
}
