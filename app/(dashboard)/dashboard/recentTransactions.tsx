"use client";
import { DataTable, Column } from "@/components";
import { Apple, Briefcase, Utensils } from "lucide-react";
import { useTransaction } from "@/hooks/useTransaction";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  Icon: any;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "Oct 14, 2026",
    description: "Apple Store",
    category: "Technology",
    amount: 1299.0,
    type: "expense",
    Icon: Apple,
  },
  {
    id: "2",
    date: "Oct 12, 2026",
    description: "Consulting Fee",
    category: "Income",
    amount: 3400.0,
    type: "income",
    Icon: Briefcase,
  },
  {
    id: "3",
    date: "Oct 10, 2026",
    description: "L'Atelier Paris",
    category: "Lifestyle",
    amount: 245.8,
    type: "expense",
    Icon: Utensils,
  },
];

export function RecentTransactions() {
  const { tranactions, totalCount } = useTransaction({ limit: 4 });
  console.log(tranactions, totalCount);
  const columns: Column<Transaction>[] = [
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
            <item.Icon size={18} />
          </div>
          <span className="font-bold text-neutral-800">{item.description}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (item) => {
        const isIncome = item.category === "Income";
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isIncome
                ? "bg-emerald-50 text-emerald-600"
                : item.category === "Technology"
                  ? "bg-slate-50 text-slate-500"
                  : "bg-rose-50 text-rose-500"
            }`}
          >
            {item.category}
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
  return (
    <DataTable
      title="Recent Transactions"
      actionText="View All History"
      columns={columns}
      data={MOCK_TRANSACTIONS}
    />
  );
}
