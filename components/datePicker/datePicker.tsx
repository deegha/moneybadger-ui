// components/ui/DatePicker.tsx
import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const DatePicker = ({ value, onChange, label }: DatePickerProps) => (
  <div className="flex flex-col gap-2 w-full">
    {label && (
      <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all appearance-none"
      />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
    </div>
  </div>
);
