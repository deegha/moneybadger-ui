"use client";

import { Column, DataTable, Pagination } from "@/components";
import { TransactionRow } from "@/lib/services/transactionService";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionTableSkeleton } from "./transactionsTableSkeleton";

const itemLimit = 10;

export function TransactionTable() {
  const { tranactions, totalCount, totalPages, isLoading } = useTransaction({
    limit: itemLimit,
  });

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
          <div className="p-2 rounded-md bg-neutral-100 text-neutral-500">
            {/* <item.category_icon size={18} /> */}
          </div>
          <span className="font-bold text-neutral-800">{item.description}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category_name",
      render: (item) => {
        const isIncome = item.type === "income";
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isIncome
                ? "bg-emerald-50 text-emerald-600"
                : item.category_name === "Technology"
                  ? "bg-slate-50 text-slate-500"
                  : "bg-rose-50 text-rose-500"
            }`}
          >
            {item.category_name}
          </span>
        );
      },
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

  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  return (
    <div>
      <DataTable
        title="Recent Transactions"
        actionText="View All History"
        columns={columns}
        data={tranactions}
      />
      <Pagination
        totalCount={totalCount}
        totalPages={totalPages}
        limit={itemLimit}
      />
    </div>
  );
}
