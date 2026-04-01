'use client';

import { CategoryCard } from './categoryCard';
import { Plus } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

// --- Internal Skeleton Components ---

const CategorySkeleton = () => (
  <div className="animate-pulse rounded-md border border-neutral-50 bg-white p-6 shadow-sm">
    <div className="mb-6 h-12 w-12 rounded-md bg-neutral-100" />
    <div className="mb-1 flex items-start justify-between">
      <div className="h-7 w-32 rounded-lg bg-neutral-100" />
      <div className="h-7 w-20 rounded-lg bg-neutral-100" />
    </div>
    <div className="mb-6 h-4 w-24 rounded-md bg-neutral-50" />
    <div className="mb-2 flex items-end justify-between">
      <div className="h-4 w-28 rounded-md bg-neutral-100" />
      <div className="h-5 w-10 rounded-md bg-neutral-100" />
    </div>
    <div className="h-2.5 w-full rounded-full bg-neutral-50" />
  </div>
);

const GridSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <CategorySkeleton key={i} />
    ))}
  </div>
);

const parseNumeric = (val: any) => {
  if (!val) return 0;
  return typeof val === 'number' ? val : parseFloat(val?.String || '0');
};

export function CategoryGrid() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <GridSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories?.map((cat) => (
        <CategoryCard
          key={cat.id}
          name={cat.name}
          iconName={cat.icon} //
          budgetLimit={parseNumeric(cat.budget_limit)}
          totalSpent={parseNumeric(cat.total_spent)}
          spentPercentage={Number(cat.spent_percentage) || 0}
          colorHex={cat.color_hex} //
        />
      ))}

      {/* 3. Create New Category Placeholder */}
      <button className="group flex min-h-55 flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-neutral-200 p-6 transition-all hover:border-emerald-500/50 hover:bg-emerald-50/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
          <Plus size={20} />
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-700">Create New Category</p>
          <p className="mt-1 text-xs text-neutral-400">Define custom limits & icons</p>
        </div>
      </button>
    </div>
  );
}
