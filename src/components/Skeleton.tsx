export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-10 bg-white/10 rounded-full mt-4" />
      </div>
    </div>
  );
}

export function MarketplaceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
