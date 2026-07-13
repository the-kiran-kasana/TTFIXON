import CategoryTiles from "./CategoryTiles";
import NativeProducts from "./NativeProducts";
import TrustStats from "./TrustStats";
import { HERO_IMAGES } from "../data/homeData";

/**
 * HeroSection — the top block:
 *   left  = white card with heading + category tiles + native products + trust stats
 *   right = image collage
 */
export default function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-stretch">
      {/* left card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Home services at
          <br /> your doorstep
        </h1>

        <div className="space-y-4">
          <CategoryTiles />
          <NativeProducts />
        </div>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <TrustStats />
        </div>
      </div>

      {/* right collage */}
      <div className="hidden grid-cols-2 grid-rows-2 gap-3 lg:grid">
        {HERO_IMAGES.map((img) => (
          <div
            key={img.id}
            className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${img.tone} text-6xl`}
          >
            {img.emoji}
          </div>
        ))}
      </div>
    </section>
  );
}
