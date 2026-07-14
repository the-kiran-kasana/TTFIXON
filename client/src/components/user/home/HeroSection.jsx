import CategoryTiles from "./CategoryTiles";
import TrustStats from "./TrustStats";
import { HERO_IMAGES } from "../data/homeData";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-4 lg:py-8">
      <div className="grid items-center gap-12 lg:grid-cols-[480px_1fr]">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
            ⭐ Trusted by 50,000+ Customers
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
            Home services
            <br />
            at your doorstep
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
            Book trusted plumbing and electrical professionals for
            installations, repairs, and maintenance—delivered quickly,
            reliably, and right at your doorstep.
          </p>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <CategoryTiles />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900">
              Book a Service
            </button>

            <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
              Explore Services
            </button>
          </div>

          <div className="mt-8">
            <TrustStats />
          </div>
        </div>

        {/* Right - Urban Company Style */}
       <div className="hidden lg:grid grid-cols-2 gap-2">
  {/* Left Column */}
  <div className="flex flex-col gap-2">
    {/* Small */}
    <div className="h-[280px] overflow-hidden">
      <Image
        src={HERO_IMAGES[0].image}
        alt={HERO_IMAGES[0].title}
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>

    {/* Large */}
    <div className="h-[440px] overflow-hidden">
      <Image
        src={HERO_IMAGES[1].image}
        alt={HERO_IMAGES[1].title}
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-col gap-2">
    {/* Large */}
    <div className="h-[440px] overflow-hidden">
      <Image
        src={HERO_IMAGES[2].image}
        alt={HERO_IMAGES[2].title}
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>

    {/* Small */}
    <div className="h-[280px] overflow-hidden">
      <Image
        src={HERO_IMAGES[3].image}
        alt={HERO_IMAGES[3].title}
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>
  </div>
</div>
      </div>
    </section>
  );
}
