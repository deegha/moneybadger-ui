import { serviceHandler } from "../serviceHandler";

interface CreateCategoryPayload {
  name: string;
  icon: string;
  colorHex: string;
  month: number;
  year: number;
  limitAmount: string;
}

export function createCategory(data: CreateCategoryPayload) {
  return serviceHandler({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: "/v1/categories",
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
