"use client";

import { getTransactionSummary } from "@/lib/services/transactionService";
import useSWR from "swr";

export function useTransactionSummary() {
  const { data, isLoading, error } = useSWR(
    "fetch-transaction-summary",
    () => getTransactionSummary(),
  );

  const summary = data?.data;

  return {
    totalIncome: summary?.total_income ?? 0,
    totalExpenses: summary?.total_expense ?? 0,
    net: 0,
    isLoading,
    error,
  };
}
