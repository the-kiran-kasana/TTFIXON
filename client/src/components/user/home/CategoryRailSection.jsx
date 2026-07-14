import SectionHeader from "../common/SectionHeader";
import ServiceCardRail from "../catalog/ServiceCardRail";
import { RAILS } from "../data/homeData";

/**
 * CategoryRailSection — reusable "title + See all + horizontal card rail".
 * Drives Electrical, Plumbing, Home Repair, and Emergency service rails.
 *
 * @param {object} props
 * @param {string} props.railKey  key into RAILS (homeData)
 */
export default function CategoryRailSection({ railKey }) {
  const rail = RAILS[railKey];
  if (!rail) return null;

  return (
    <section>
      <SectionHeader
        title={rail.title}
        subtitle={rail.subtitle}
        seeAllHref={`/user/delhi-ncr/${railKey}`}
      />
      <ServiceCardRail items={rail.items} />
    </section>
  );
}
