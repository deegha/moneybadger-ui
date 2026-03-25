"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";

export const BalanceCard = () => {
  const [data, setData] = useState({
    amount: 8329.5,
    savingsGoalPercentage: 84,
    status: "STABLE",
  });

  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(data.amount);

  return (
    <div className="bg-[#585f70] p-6 rounded-lg shadow-sm flex flex-col gap-6 text-white w-full">
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-md bg-white/10 text-white/90">
          <Wallet className="w-5 h-5" />
        </div>

        <div className="px-3 py-1 rounded-md border border-white/20 bg-transparent text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          {data.status}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
          Net Balance
        </h3>
        <p className="text-4xl font-bold tracking-tight">
          <span className="text-white/30 font-medium mr-1.5">$</span>
          {formattedAmount}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
          <span>Savings Goal</span>
          <span className="text-white/90 text-xs tracking-normal">
            {data.savingsGoalPercentage}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-white/10 rounded-md overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{ width: `${Math.min(data.savingsGoalPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
