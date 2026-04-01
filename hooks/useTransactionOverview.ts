"use client";

import { getTransactionOverview } from "@/lib/services/transactionService";
import useSWR from "swr";

export function useTransactionOverview() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { data, isLoading, error } = useSWR(
    `fetch-transaction-overview-${month}-${year}`,
    () => getTransactionOverview({ month, year }),
  );

  return {
    weekly: data?.data.Weekly ?? [],
    daily: data?.data.Daily ?? [],
    isLoading,
    error,
  };
}
