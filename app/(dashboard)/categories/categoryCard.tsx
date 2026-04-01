'use client';
import { CURRENCY_SYMBOL } from '@/lib/constants';
import { IconComponent } from '@/components';

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
  colorHex = 'emerald',
}: CategoryCardProps) => {
  const isOverBudget = totalSpent > budgetLimit;

  return (
    <div className="group rounded-lg border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Icon Header */}

      <div className="relative mb-6 h-12 w-12">
        {/* The Background Layer */}
        <div
          className="absolute inset-0 rounded-2xl opacity-15"
          style={{
            backgroundColor: isOverBudget ? 'var(--tertiary)' : `var(--cat-${colorHex})`,
          }}
        />
        {/* The Icon Layer */}
        <IconComponent
          name={iconName}
          className="relative flex h-full w-full items-center justify-center"
          style={{
            color: isOverBudget ? 'var(--tertiary)' : `var(--cat-${colorHex})`,
          }}
        />
      </div>
      {/* Info Section */}
      <div className="mb-1 flex items-start justify-between">
        <h3 className="text-xl font-bold text-slate-800">{name}</h3>
        <span className="text-lg font-bold text-slate-800">
          {CURRENCY_SYMBOL}
          {budgetLimit.toLocaleString()}
        </span>
      </div>
      <p className="mb-6 text-sm font-medium text-neutral-400">Monthly Budget</p>
      {/* Stats Section */}
      <div className="mb-2 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-neutral-500">
            Spent: {CURRENCY_SYMBOL}
            {totalSpent.toLocaleString()}
          </span>
          {isOverBudget && (
            <span className="mt-1 text-[10px] font-bold text-rose-500 uppercase">
              ⚠ Exceeded by {CURRENCY_SYMBOL}
              {(totalSpent - budgetLimit).toLocaleString()}
            </span>
          )}
        </div>
        <span
          className={`text-sm font-bold ${isOverBudget ? 'text-rose-500' : 'text-emerald-600'}`}
        >
          {isOverBudget ? 'Over budget' : `${Math.round(spentPercentage)}%`}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-50">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min(spentPercentage, 100)}%`,
            backgroundColor: isOverBudget ? 'var(--tertiary)' : `var(--cat-${colorHex})`,
          }}
        />
      </div>
    </div>
  );
};
