"use client";
import useSWR from "swr";
import { fetchCategories } from "@/lib/services/categories";

export function useCategories() {
  const { data, error, isLoading } = useSWR("fetch-categories", async () => {
    return await fetchCategories();
  });

  return {
    categories: data?.data || [],
    error,
    isLoading,
  };
}
