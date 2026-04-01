"use client";

import { SummaryCard } from "@/components";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";

export const Summary = () => {
  const { totalIncome, totalExpenses, isLoading } = useTransactionSummary();


  console.log(totalExpenses, "===")

  const incomeRetention =
    totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : 0;

  const expenseBurn = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 h-40 animate-pulse" />
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
        label="Total Income"
        amount={totalIncome}
        type="income"
        percentageChange={0}
        progress={incomeRetention}
      />

      <SummaryCard
        label="Total Expenses"
        amount={totalExpenses}
        type="expense"
        percentageChange={0}
        progress={expenseBurn}
      />
    </div>
  );
};
