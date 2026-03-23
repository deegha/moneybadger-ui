// components/modals/NewTransactionModal.tsx
"use client";
import { X, Settings2, CheckCircle2 } from "lucide-react";
import { Button, DatePicker, FrequencySelector, Input } from "@/components";
import { useState, useEffect } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onClose,
}: NewTransactionModalProps) => {
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-neutral-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg ">
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

        {/* Content */}
        <form className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Amount Section */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
              Amount
            </span>
            <div className="flex items-center gap-2">
              <span className="text-4xl text-neutral-300 font-light">$</span>

              <input
                name="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                autoFocus
                className="text-6xl font-semibold text-neutral-800 placeholder:text-neutral-100 w-full text-center 
             bg-transparent border-none focus:ring-0 transition-transform duration-300
             focus:scale-105"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Primary Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Description
              </label>
              <input
                placeholder="e.g., Monthly Subscription"
                className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Category
              </label>
              <div className="relative">
                <select className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-indigo-500/10 outline-none">
                  <option>Select Category</option>
                  <option>Food & Drink</option>
                  <option>Shopping</option>
                  <option>Housing</option>
                </select>
              </div>
            </div>
          </div>

          {/* New Reusable Components */}
          <div className="grid grid-cols-2 gap-6">
            <DatePicker
              label="Transaction Date"
              value={date}
              onChange={setDate}
            />
            <FrequencySelector
              isRecurring={isRecurring}
              onChange={setIsRecurring}
            />
          </div>

          <div className="pt-4 flex items-center gap-2 text-neutral-400 border-t border-neutral-100">
            <Settings2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Advanced Details
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Additional Notes
            </label>
            <textarea
              rows={3}
              placeholder="Add details or project reference..."
              className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-indigo-500/10 outline-none"
            />
          </div>
        </form>

        <div className="p-6 bg-neutral-50/50 flex items-center justify-end gap-4 border-t border-neutral-50">
          <Button type="button" onClick={onClose} variant="ghost">
            Cancel
          </Button>

          <Button type="submit">
            <CheckCircle2 className="w-4 h-4" /> Save Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};
