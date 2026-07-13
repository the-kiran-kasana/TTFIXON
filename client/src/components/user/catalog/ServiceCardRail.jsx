import Carousel from "../common/Carousel";
import ServiceCard from "./ServiceCard";

/**
 * ServiceCardRail — a horizontal, scrollable row of ServiceCards.
 *
 * @param {object} props
 * @param {Array}  props.items  service objects
 */
export default function ServiceCardRail({ items = [] }) {
  return (
    <Carousel>
      {items.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </Carousel>
  );
}
