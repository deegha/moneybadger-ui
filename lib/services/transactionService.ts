import { serviceHandler } from "../serviceHandler";

export type TransactionType = "income" | "expense";

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
