import { CalendarDays, RefreshCw } from "lucide-react";

interface FrequencySelectorProps {
  isRecurring: boolean;
  onChange: (value: boolean) => void;
}

export const FrequencySelector = ({
  isRecurring,
  onChange,
}: FrequencySelectorProps) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
      Frequency
    </label>
    <div className="flex bg-neutral-100 p-1 rounded-lg">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-md transition-all ${
          !isRecurring
            ? "bg-white shadow-sm text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        <CalendarDays className="w-4 h-4" /> One-time
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-md transition-all ${
          isRecurring
            ? "bg-white shadow-sm text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        <RefreshCw className="w-4 h-4" /> Recurring
      </button>
    </div>
  </div>
);
