import ServiceCardRail from "../catalog/ServiceCardRail";
import { MOST_BOOKED } from "../data/homeData";

/**
 * MostBookedSection — "Most booked services" rail.
 */
export default function MostBookedSection() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Most booked services
      </h2>
      <ServiceCardRail items={MOST_BOOKED} />
    </section>
  );
}
