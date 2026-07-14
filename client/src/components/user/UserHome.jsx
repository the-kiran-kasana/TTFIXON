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
    <div className="mx-auto max-w-[1400px] space-y-24 px-4 py-10">
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
