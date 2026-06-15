export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-f1-card border border-f1 rounded-xl p-5 h-64">
          <div className="skeleton h-4 w-16 mb-4" />
          <div className="flex items-center gap-4 mb-6">
            <div className="skeleton w-16 h-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-6 w-32" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
