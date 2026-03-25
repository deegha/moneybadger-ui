"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MOCK_MONTHLY_DATA = [
  { day: "OCT 01", amount: 1200 },
  { day: "OCT 04", amount: 1800 },
  { day: "OCT 08", amount: 3200 },
  { day: "OCT 12", amount: 4500 },
  { day: "OCT 15", amount: 3800 },
  { day: "OCT 20", amount: 2100 },
  { day: "OCT 22", amount: 1800 },
  { day: "OCT 28", amount: 5100 },
  { day: "OCT 31", amount: 4800 },
];

const MOCK_WEEKLY_DATA = [
  { day: "Week 1", amount: 8500 },
  { day: "Week 2", amount: 12000 },
  { day: "Week 3", amount: 9800 },
  { day: "Week 4", amount: 14000 },
];

export const SpendingChart = () => {
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const data = view === "monthly" ? MOCK_MONTHLY_DATA : MOCK_WEEKLY_DATA;

  return (
    <div className="bg-white p-8 rounded-lg border border-neutral-100 shadow-sm w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl font-bold text-neutral-800 tracking-tight">
            Spending Overview
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Daily transaction volume for October
          </p>
        </div>

        <div className="flex p-1 bg-neutral-100 rounded-xl">
          <button
            onClick={() => setView("monthly")}
            className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${
              view === "monthly"
                ? "bg-white text-neutral-800 shadow-sm"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${
              view === "weekly"
                ? "bg-white text-neutral-800 shadow-sm"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 700 }}
              dy={20}
            />

            <YAxis hide domain={["auto", "auto"]} />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#374151" }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#065f46" // Deep emerald stroke
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
              dot={{ r: 3, fill: "#065f46", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
