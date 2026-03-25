import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface SummaryCardProps {
  label: string;
  amount: number;
  type: "income" | "expense";
  percentageChange: number;
  /** Value from 0 to 100 representing the progress bar fill */
  progress: number;
}

export const SummaryCard = ({
  label,
  amount,
  type,
  percentageChange,
  progress,
}: SummaryCardProps) => {
  const isIncome = type === "income";

  const config = {
    income: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      bar: "bg-emerald-700",
      pillBg: "bg-emerald-50",
      pillText: "text-emerald-700",
      Icon: TrendingUp,
    },
    expense: {
      text: "text-rose-600",
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      bar: "bg-rose-800",
      pillBg: "bg-rose-50",
      pillText: "text-rose-700",
      Icon: TrendingDown,
    },
  }[type];

  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 flex flex-col gap-6 group hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        {/* Icon Container */}
        <div className={`p-2.5 rounded-xl ${config.iconBg} ${config.text}`}>
          <config.Icon className="w-5 h-5" />
        </div>

        {/* Trend Percentage Pill */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${config.pillBg} ${config.pillText}`}
        >
          {percentageChange > 0 ? "+" : ""}
          {percentageChange}%
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-1">
          {label}
        </h3>
        <p className="text-3xl font-bold text-neutral-800 tracking-tight">
          <span className="text-neutral-400 font-medium mr-1">
            {CURRENCY_SYMBOL}
          </span>
          {formattedAmount}
        </p>
      </div>

      {/* Progress Bar Section */}
      <div className="space-y-2">
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.bar} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {/* Optional: Add a subtle text indicator for the bar */}
        <div className="flex justify-between text-[10px] text-neutral-400 font-medium uppercase tracking-tighter mt-[20px]">
          <span>{isIncome ? "Target Retention" : "Budget Spent"}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
