import { serviceHandler } from "../serviceHandler";

interface CreateTransactionPayload {
  name: string;
  icon: string;
  colorHex: string;
  month: number;
  year: number;
  limitAmount: string;
}

export function createCategory(data: CreateTransactionPayload) {
  return serviceHandler({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: "/v1/transaction",
    body: {
      name: data.name,
      icon: data.icon,
      color_hex: data.colorHex,
      month: data.month,
      year: data.year,
      limit_amount: parseFloat(data.limitAmount),
    },
  });
}
