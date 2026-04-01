"use client";
import { DataTable, Column } from "@/components";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionRow } from "@/lib/services/transactionService";

const categoryColorMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-500",
  slate: "bg-slate-50 text-slate-500",
};

export function RecentTransactions() {
  const { tranactions } = useTransaction({ limit: 5, forceOffcet: "0" });

  const columns: Column<TransactionRow>[] = [
    {
      header: "Date",
      accessor: "date",
      className: "w-[120px] text-neutral-400",
    },
    {
      header: "Description",
      accessor: "description",
      render: (item) => (
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-md bg-neutral-100 text-neutral-500 text-base leading-none">
            {item.category_icon}
          </div>
          <span className="font-bold text-neutral-800">{item.description}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category_name",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            categoryColorMap[item.category_color] ?? "bg-slate-50 text-slate-500"
          }`}
        >
          {item.category_name}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      className: "text-right",
      render: (item) => (
        <span
          className={`font-extrabold text-base ${
            item.type === "income" ? "text-emerald-600" : "text-neutral-800"
          }`}
        >
          {item.type === "income" ? "+" : "-"}$
          {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      title="Recent Transactions"
      actionText="View All History"
      columns={columns}
      data={tranactions}
    />
  );
}
