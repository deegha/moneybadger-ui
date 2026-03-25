"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  X,
  Settings2,
  CheckCircle2,
  ArrowDownToLine,
  ArrowRightFromLine,
  ChevronDown,
} from "lucide-react";

import { Button, DatePicker, FrequencySelector } from "@/components";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { useCategories } from "@/hooks/useCategories";
import { createTransaction } from "@/lib/services/transactionService";
import { useNotificationStore } from "@/store/notificationStore";

/**
 * Helper: Formats a raw numeric string into a human-readable string with commas.
 * Example: "1000.5" -> "1,000.5"
 */
const formatDisplayAmount = (value: string) => {
  if (!value) return "";
  const cleanValue = value.replace(/[^\d.]/g, "");
  const parts = cleanValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts[1]) parts[1] = parts[1].slice(0, 2);
  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

/**
 * Helper: Strips commas from a formatted string to get a raw numeric string.
 */
const getRawValue = (value: string) => value.replace(/,/g, "");

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(3, "Description is too short"),
  categoryId: z.string().min(1, "Please select a category"),
  date: z.string(),
  isRecurring: z.boolean(),
  merchantName: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onClose,
}: NewTransactionModalProps) => {
  const { categories } = useCategories();
  const { showNotification } = useNotificationStore();
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: "",
      description: "",
      categoryId: "",
      date: new Date().toISOString().split("T")[0],
      isRecurring: false,
      merchantName: "",
    },
  });

  const transactionType = watch("type");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      reset();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, reset]);

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      console.log("Submitting Clean Data:", {
        ...data,
        amount: parseFloat(data.amount),
      });

      const formattedDate = new Date(data.date).toISOString().split("T")[0];

      await createTransaction({
        ...data,
        date: formattedDate,
        amount: parseFloat(data.amount),
      });

      showNotification({
        message: "Successfully created transaction",
        type: "success",
      });

      reset();

      onClose();
    } catch (error) {
      console.error("Failed to save transaction:", error);

      showNotification({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-neutral-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <Settings2 className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-neutral-800">New Transaction</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Transaction Type Toggle */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                Transaction Type
              </span>
              <div className="flex p-1 bg-neutral-100 rounded-xl w-full max-w-[320px]">
                {/* Expense (Going Out) */}
                <label
                  className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    transactionType === "expense"
                      ? "bg-white shadow-sm text-rose-600"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <input
                    {...register("type")}
                    type="radio"
                    value="expense"
                    className="hidden"
                  />
                  <ArrowRightFromLine className="w-4 h-4 rotate-45" />
                  <span className="text-sm font-bold">Expense</span>
                </label>

                {/* Income (Coming In) */}
                <label
                  className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    transactionType === "income"
                      ? "bg-white shadow-sm text-emerald-600"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <input
                    {...register("type")}
                    type="radio"
                    value="income"
                    className="hidden"
                  />
                  <ArrowDownToLine className="w-4 h-4" />
                  <span className="text-sm font-bold">Income</span>
                </label>
              </div>
            </div>

            {/* Amount Section (Human Readable) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                Amount
              </span>
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-center gap-2 w-full">
                  <span
                    className={`text-4xl font-light transition-colors ${
                      transactionType === "income"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {CURRENCY_SYMBOL}
                  </span>

                  <Controller
                    name="amount"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <input
                        {...field}
                        value={formatDisplayAmount(value)}
                        onChange={(e) => onChange(getRawValue(e.target.value))}
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        autoFocus
                        className={`text-6xl font-semibold w-full text-center bg-transparent border-none focus:ring-0 transition-all duration-300 focus:scale-105 outline-none ${
                          transactionType === "income"
                            ? "text-emerald-600"
                            : "text-neutral-800"
                        }`}
                      />
                    )}
                  />
                </div>
                {errors.amount && (
                  <span className="text-rose-500 text-xs mt-2 font-medium">
                    {errors.amount.message}
                  </span>
                )}
              </div>
            </div>

            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Merchant Name
                </label>
                <input
                  {...register("merchantName")}
                  placeholder="e.g. Starbucks"
                  className="input-atelier px-4 py-3 rounded-xl text-sm bg-neutral-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Category
                </label>
                <div className="relative">
                  <select
                    {...register("categoryId")}
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                {errors.categoryId && (
                  <span className="text-rose-500 text-[10px] font-bold">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>
            </div>

            {/* Secondary Details */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Description
              </label>
              <input
                {...register("description")}
                placeholder="Short note about this transaction"
                className={`input-atelier px-4 py-3 rounded-xl text-sm bg-neutral-50 ${
                  errors.description ? "border-rose-200" : ""
                }`}
              />
              {errors.description && (
                <span className="text-rose-500 text-[10px] font-bold">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Date and Frequency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Transaction Date"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="isRecurring"
                control={control}
                render={({ field }) => (
                  <FrequencySelector
                    isRecurring={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-neutral-50/50 flex items-center justify-end gap-4 border-t border-neutral-50">
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`transition-colors ${
                transactionType === "income"
                  ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                  : ""
              }`}
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Save Transaction
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
