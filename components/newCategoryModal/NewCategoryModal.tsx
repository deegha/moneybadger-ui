"use client";

import { useForm, Controller } from "react-hook-form";
import { X } from "lucide-react";
import { IconPicker, ColorPicker, InputCurrency, Button } from "@/components";
import { CURRENCY_SYMBOL } from "@/lib/contants";
import { useState } from "react";
import { createCategory } from "@/lib/services/categories";
import { useNotificationStore } from "@/store/notificationStore";

interface CategoryForm {
  name: string;
  budget: string;
  icon: string;
  color: string;
}

export const NewCategoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showNotification } = useNotificationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control } = useForm<CategoryForm>({
    defaultValues: {
      name: "",
      budget: "",
      icon: "shopping",
      color: "emerald",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: CategoryForm) => {
    console.log("Saving Category:", data);

    try {
      setIsSubmitting(true);
      const response = await createCategory({
        name: data.name,
        colorHex: data.color,
        icon: data.color,
        month: 3,
        year: 2026,
        limitAmount: data.budget,
      });
      console.log("dafsdfdsfsd", response);
      showNotification({
        message: "Category created successfully",
        type: "success",
      });

      setIsSubmitting(false);
    } catch {
      showNotification({
        message: "couldn't create the category",
        type: "error",
      });
      setIsSubmitting(false);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-md p-8 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Add New Category
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {/* Category Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Category Name
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Groceries"
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 text-sm input-atelier"
              />
            </div>

            {/* Monthly Budget using InputCurrency */}
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <InputCurrency
                  label="Monthly Budget"
                  currency={CURRENCY_SYMBOL}
                  placeholder="500.00"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Icon Selection */}
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <IconPicker selected={field.value} onChange={field.onChange} />
            )}
          />

          {/* Color Selection */}
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker selected={field.value} onChange={field.onChange} />
            )}
          />

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4 justify-end">
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Create Category</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
