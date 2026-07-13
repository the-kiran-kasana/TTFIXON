import CategoryTiles from "./CategoryTiles";
import NativeProducts from "./NativeProducts";
import TrustStats from "./TrustStats";
import { HERO_IMAGES } from "../data/homeData";


export default function HeroSection() {
  return (
    <section>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* left column — heading above the collage grid */}
        <div>
          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            Home services at your doorstep
          </h1>

          {/* small 2×2 collage */}
          <div className="grid grid-cols-2 gap-2.5">
            {HERO_IMAGES.map((img) => (
              <div
                key={img.id}
                className="aspect-square overflow-hidden rounded-xl bg-gray-100"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* right card — half width */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <CategoryTiles />
        </div>
      </div>
    </section>
  );
}
