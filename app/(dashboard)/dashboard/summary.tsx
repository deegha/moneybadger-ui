import { SummaryCard } from "@/components";

export const Summary = () => {
  const summary = {
    total_income: 12450.0,
    total_expenses: 4120.5,
    income_trend: 12.5,
    expense_trend: -3.2,
    budget_limit: 8000,
  };

  const incomeRetention =
    ((summary.total_income - summary.total_expenses) / summary.total_income) *
    100;

  const expenseBurn = (summary.total_expenses / summary.budget_limit) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SummaryCard
        label="Total Income"
        amount={summary.total_income}
        type="income"
        percentageChange={summary.income_trend}
        progress={incomeRetention}
      />

      <SummaryCard
        label="Total Expenses"
        amount={summary.total_expenses}
        type="expense"
        percentageChange={summary.expense_trend}
        progress={expenseBurn}
      />
    </div>
  );
};
