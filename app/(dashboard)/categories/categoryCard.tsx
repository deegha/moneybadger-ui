"use client";
import { COLORS, CURRENCY_SYMBOL } from "@/lib/constants";
import { IconComponent } from "@/components";

interface CategoryCardProps {
  name: string;
  iconName: string;
  budgetLimit: number;
  totalSpent: number;
  spentPercentage: number;
  colorHex?: string;
}

export const CategoryCard = ({
  name,
  iconName,
  budgetLimit,
  totalSpent,
  spentPercentage,
  colorHex = "emerald",
}: CategoryCardProps) => {
  const isOverBudget = totalSpent > budgetLimit;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group">
      {/* Icon Header */}
      <div className="relative w-12 h-12 mb-6">
        {/* The Background Layer */}
        <div
          className="absolute inset-0 rounded-2xl opacity-15"
          style={{
            backgroundColor: isOverBudget
              ? "var(--tertiary)"
              : `var(--cat-${colorHex})`,
          }}
        />
        {/* The Icon Layer */}
        <IconComponent
          name={iconName}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            color: isOverBudget ? "var(--tertiary)" : `var(--cat-${colorHex})`,
          }}
        />
      </div>

      {/* Info Section */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-bold text-slate-800">{name}</h3>
        <span className="text-lg font-bold text-slate-800">
          {CURRENCY_SYMBOL}
          {budgetLimit.toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-neutral-400 font-medium mb-6">
        Monthly Budget
      </p>

      {/* Stats Section */}
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-neutral-500 font-semibold">
            Spent: {CURRENCY_SYMBOL}
            {totalSpent.toLocaleString()}
          </span>
          {isOverBudget && (
            <span className="text-[10px] text-rose-500 font-bold uppercase mt-1">
              ⚠ Exceeded by {CURRENCY_SYMBOL}
              {(totalSpent - budgetLimit).toLocaleString()}
            </span>
          )}
        </div>
        <span
          className={`text-sm font-bold ${isOverBudget ? "text-rose-500" : "text-emerald-600"}`}
        >
          {isOverBudget ? "Over budget" : `${Math.round(spentPercentage)}%`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-neutral-50 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${Math.min(spentPercentage, 100)}%`,
            backgroundColor: isOverBudget
              ? "var(--tertiary)"
              : `var(--cat-${colorHex})`,
          }}
        />
      </div>
    </div>
  );
};
