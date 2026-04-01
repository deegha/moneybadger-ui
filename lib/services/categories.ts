import { serviceHandler } from '../serviceHandler';

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
    method: 'POST',
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    resource: '/v1/categories',
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

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color_hex: string;
  created_at: string;
  budget_limit: number;
  total_spent: number;
  spent_percentage: number;
}

export function fetchCategories() {
  const res = serviceHandler<{
    data: Category[];
    message: string;
  }>({
    method: 'GET',
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    resource: '/v1/categories',
  });

  return res;
}
