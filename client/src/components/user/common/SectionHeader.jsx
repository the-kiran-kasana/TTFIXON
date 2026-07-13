import Link from "next/link";

/**
 * SectionHeader — section title (+ optional subtitle) with a "See all" link.
 */
export default function SectionHeader({ title, subtitle, seeAllHref }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="shrink-0 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline"
        >
          See all
        </Link>
      )}
    </div>
  );
}
