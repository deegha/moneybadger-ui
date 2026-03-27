"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const MOCK_CATEGORIES_DATA = {
  totalAmount: 4120.5,
  breakdown: [
    { name: "Housing", value: 45, hex: "#5d6273" },
    { name: "Investment", value: 25, hex: "#067958" },
    { name: "Lifestyle", value: 12, hex: "#b91c1c" },
    { name: "Other", value: 18, hex: "#f1f5f9" },
  ],
};

export const CategoriesChart = () => {
  const [chartData, setChartData] = useState(MOCK_CATEGORIES_DATA);

  const formatTotalK = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 flex flex-col w-full">
      {/* 3. Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-800 tracking-tight">
          Categories
        </h2>
      </div>

      <div className="relative w-full h-55 flex items-center justify-center mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={chartData.breakdown}
              cx="50%"
              cy="50%"
              innerRadius={70} // This makes it a donut (hole size)
              outerRadius={100} // The chart's size
              paddingAngle={2} // Small gap between slices
              dataKey="value"
              startAngle={90} // Start drawing from the top
              endAngle={-270} // and go clockwise
            >
              {chartData.breakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hex}
                  stroke="none" // Remove the outline
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 5. The Central Label (The Hole) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
            Total
          </span>
          <span className="text-4xl font-extrabold text-neutral-800 tracking-tight">
            {formatTotalK(chartData.totalAmount)}
          </span>
        </div>
      </div>

      {/* 6. Dynamic Legend */}
      <div className="space-y-4 px-2">
        {chartData.breakdown.map(
          (item) =>
            // Skip rendering the 'Other' light-grey slice in the legend
            item.hex !== "#f1f5f9" && (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm font-medium"
              >
                <div className="flex items-center gap-3 text-neutral-600">
                  {/* Colored Dot Indicator */}
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="tracking-tight text-neutral-700 font-semibold">
                    {item.name}
                  </span>
                </div>

                {/* Percentage Value */}
                <span className="text-sm font-extrabold text-neutral-800 w-12 text-right">
                  {item.value}%
                </span>
              </div>
            ),
        )}
      </div>
    </div>
  );
};
