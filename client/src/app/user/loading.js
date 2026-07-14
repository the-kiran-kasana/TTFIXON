export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
        <div className="hidden grid-cols-2 grid-rows-2 gap-3 lg:grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
      <div className="mt-12 flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-56 w-[190px] animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
