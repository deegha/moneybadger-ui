/**
 * TransactionSkeleton Component
 * Renders a placeholder row with a pulse animation.
 */

const TransactionRowSkeleton = () => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-50 last:border-0 animate-pulse">
    {/* Date Skeleton */}
    <div className="w-20 h-3 bg-neutral-100 rounded-md" />

    {/* Description Skeleton (Icon + Text) */}
    <div className="flex items-center gap-3 flex-1 px-12">
      <div className="w-6 h-6 bg-neutral-100 rounded-full" />
      <div className="w-32 h-3 bg-neutral-100 rounded-md" />
    </div>

    {/* Category Badge Skeleton */}
    <div className="flex-1 flex justify-center">
      <div className="w-16 h-5 bg-neutral-100 rounded-md" />
    </div>

    {/* Amount Skeleton */}
    <div className="w-24 h-4 bg-neutral-100 rounded-md" />
  </div>
);

export const TransactionTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-neutral-100 w-full">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-48 h-6 bg-neutral-100 rounded-md animate-pulse" />
        <div className="w-24 h-3 bg-neutral-100 rounded-md animate-pulse" />
      </div>

      {/* Column Titles Skeleton */}
      <div className="flex justify-between mb-4 px-1">
        {["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT"].map((title) => (
          <div
            key={title}
            className="w-16 h-2 bg-neutral-50 rounded-md animate-pulse"
          />
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-1">
        {Array.from({ length: rows }).map((_, i) => (
          <TransactionRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
