"use client";

import { CategoryCard } from "./categoryCard";
import { Plus } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

// --- Internal Skeleton Components ---

const CategorySkeleton = () => (
  <div className="bg-white p-6 rounded-md shadow-sm border border-neutral-50 animate-pulse">
    <div className="w-12 h-12 rounded-md bg-neutral-100 mb-6" />
    <div className="flex justify-between items-start mb-1">
      <div className="h-7 w-32 bg-neutral-100 rounded-lg" />
      <div className="h-7 w-20 bg-neutral-100 rounded-lg" />
    </div>
    <div className="h-4 w-24 bg-neutral-50 rounded-md mb-6" />
    <div className="flex justify-between items-end mb-2">
      <div className="h-4 w-28 bg-neutral-100 rounded-md" />
      <div className="h-5 w-10 bg-neutral-100 rounded-md" />
    </div>
    <div className="w-full h-2.5 bg-neutral-50 rounded-full" />
  </div>
);

const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <CategorySkeleton key={i} />
    ))}
  </div>
);

const parseNumeric = (val: any) => {
  if (!val) return 0;
  return typeof val === "number" ? val : parseFloat(val?.String || "0");
};

export function CategoryGrid() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <GridSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <button className="group border-2 border-dashed border-neutral-200 rounded-md p-6 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all min-h-55">
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <Plus size={20} />
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-700">Create New Category</p>
          <p className="text-xs text-neutral-400 mt-1">
            Define custom limits & icons
          </p>
        </div>
      </button>
    </div>
  );
}
