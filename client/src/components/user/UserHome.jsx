import HeroSection from "./home/HeroSection";
import SpotlightSection from "./home/SpotlightSection";
import NewAndNoteworthy from "./home/NewAndNoteworthy";
import MostBookedSection from "./home/MostBookedSection";
import CategoryRailSection from "./home/CategoryRailSection";
import PromoBanner from "./home/PromoBanner";

/**
 * UserHome — the customer landing page. Composes homepage sections in order,
 * mirroring the Urban Company Delhi-NCR layout.
 */
export default function UserHome() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-12 px-4 py-6">
      <HeroSection />
      <SpotlightSection />
      <NewAndNoteworthy />
      <MostBookedSection />

      <PromoBanner id="wall-panels" />
      <PromoBanner id="native-locks" />

      <CategoryRailSection railKey="cleaning-essentials" />
      <PromoBanner id="home-painting" />

      <CategoryRailSection railKey="appliance-repair" />
      <CategoryRailSection railKey="home-repair" />
      <CategoryRailSection railKey="massage-men" />

      <PromoBanner id="ro-purifier" />
    </div>
  );
}
