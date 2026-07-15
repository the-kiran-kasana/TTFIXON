import Image from "next/image";
import CategoryTiles from "./CategoryTiles";
import TrustStats from "./TrustStats";
import { HERO_IMAGES } from "../data/homeData";

export default function HeroSection() {
  return (
    <section className="py-4">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:items-stretch">
        {/* Left */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
            ⭐ Trusted by 50,000+ Customers
          </span>

          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight">
            Home services
            <br />
            at your doorstep
          </h1>

          <p className="mt-4 max-w-md text-gray-600 leading-7">
            Book trusted plumbing and electrical professionals for
            installations, repairs, and maintenance—delivered quickly,
            reliably, and right at your doorstep.
          </p>

          <div className="mt-6 rounded-3xl border border-gray-200 p-5">
            <CategoryTiles />
          </div>

          <div className="mt-6 flex gap-4">
            <button className="rounded-xl bg-black px-6 py-3 text-white font-semibold">
              Book a Service
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold">
              Explore Services
            </button>
          </div>

          <div className="mt-6">
            <TrustStats />
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="grid grid-rows-[35%_65%] gap-3">
            <div className="relative overflow-hidden rounded-tl-3xl">
              <Image
                src={HERO_IMAGES[0].image}
                alt={HERO_IMAGES[0].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-bl-3xl">
              <Image
                src={HERO_IMAGES[1].image}
                alt={HERO_IMAGES[1].title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-rows-[65%_35%] gap-3">
            <div className="relative overflow-hidden rounded-tr-3xl">
              <Image
                src={HERO_IMAGES[2].image}
                alt={HERO_IMAGES[2].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-br-3xl">
              <Image
                src={HERO_IMAGES[3].image}
                alt={HERO_IMAGES[3].title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}