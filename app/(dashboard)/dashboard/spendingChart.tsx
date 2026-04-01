'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTransactionOverview } from '@/hooks/useTransactionOverview';

function formatDateLabel(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
}

export const SpendingChart = () => {
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');
  const { daily, weekly } = useTransactionOverview();

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long' });

  const monthlyData = daily.map((item) => ({
    day: formatDateLabel(item.day),
    amount: item.total_amount,
  }));

  const weeklyData = weekly.map((item) => ({
    day: formatDateLabel(item.week_start),
    amount: item.total_amount,
  }));

  const data = view === 'monthly' ? monthlyData : weeklyData;

  return (
    <div className="w-full rounded-lg border border-neutral-100 bg-white p-8 shadow-sm">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">Spending Overview</h2>
          <p className="mt-1 text-sm text-neutral-400">
            {view === 'monthly' ? 'Daily' : 'Weekly'} transaction volume for {monthName}
          </p>
        </div>

        <div className="flex rounded-xl bg-neutral-100 p-1">
          <button
            onClick={() => setView('monthly')}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition-all ${
              view === 'monthly'
                ? 'bg-white text-neutral-800 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition-all ${
              view === 'weekly'
                ? 'bg-white text-neutral-800 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
              dy={10}
              interval={view === 'monthly' ? 4 : 0}
            />

            <YAxis hide domain={['auto', 'auto']} />

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#374151' }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#065f46"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
              dot={{ r: 3, fill: '#065f46', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
