"use client";

import { useSearchParams } from "next/navigation";
import { listTransactions } from "@/lib/services/transactionService";
import useSWR from "swr";

interface IProps {
  limit: number;
  forceOffcet?: string;
}

export function useTransaction(props: IProps) {
  const searchParams = useSearchParams();
  const today: string = new Date().toISOString().split("T")[0];

  const limit = props.limit;
  const page = searchParams.get("page") || "1";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate") || today;
  const offsetBase = parseInt(page) - 1;

  const { data, isLoading, error } = useSWR(
    `fetch-transaction-${limit}-${page}-${startDate}-${endDate}`,
    async () => {
      return await listTransactions({
        limit: limit.toString(),
        offset: props.forceOffcet ? props.forceOffcet : `${offsetBase * 10}`,
        startDate: startDate as string,
        endDate: endDate as string,
      });
    },
  );

  const totalCount = data?.data.total_count || 0;

  return {
    tranactions: data?.data.transactions || [],
    totalCount: totalCount,
    totalPages: props.forceOffcet ? 0 : Math.ceil(totalCount / limit),
    isLoading,
    error,
  };
}
