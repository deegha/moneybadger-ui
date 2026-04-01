import { serviceHandler } from "../serviceHandler";

export type TransactionType = "income" | "expense";

export interface TransactionRow {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  merchant_name: string;
  date: string;
  is_recurring: boolean;
  category_name: string;
  category_icon: string;
  category_color: "emerald" | "rose" | "slate" | string;
}

export interface TransactionResponse {
  data: {
    transactions: TransactionRow[];
    total_count: number;
  };
  message: string;
}

export interface Transaction {
  categoryId: string;
  amount: number;
  type: TransactionType;
  description: string;
  merchantName?: string;
  date: string;
  isRecurring: boolean;
  createdAt?: string;
}

export interface CreateTransactionPayload {
  category_id: string;
  amount: number;
  type: TransactionType;
  description: string;
  merchant_name?: string;
  date: string;
  is_recurring: boolean;
  created_at?: string;
}

export interface ListTransactionFilters {
  limit: string;
  offset: string;
  startDate: string;
  endDate: string;
}

export function createTransaction(data: Transaction) {
  return serviceHandler<{}, CreateTransactionPayload>({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: "/v1/transactions",
    body: {
      category_id: data.categoryId,
      amount: data.amount,
      type: data.type,
      description: data.description,
      merchant_name: data.merchantName,
      date: data.date,
      is_recurring: data.isRecurring,
    },
  });
}

export function listTransactions(filter: ListTransactionFilters) {
  const queryParams = new URLSearchParams({
    limit: filter.limit,
    offset: filter.offset,
    start_date: filter.startDate,
    end_date: filter.endDate,
  }).toString();

  return serviceHandler<TransactionResponse>({
    method: "GET",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: `/v1/transactions?${queryParams}`,
  });
}

export interface TransactionSummary {
  total_income: number;
  total_expense: number;
}

export interface TransactionSummaryResponse {
  data: TransactionSummary;
  message: string;
}

export function getTransactionSummary() {
  return serviceHandler<TransactionSummaryResponse>({
    method: "GET",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: `/v1/transactions/summary`,
  });
}



