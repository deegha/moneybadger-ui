import React from "react";

interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  currency?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export const InputCurrency = ({
  label,
  currency = "$",
  value,
  onValueChange,
  ...props
}: InputCurrencyProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onValueChange(val);
    }
  };

  const paddingLeft =
    currency.length > 1 ? `${currency.length + 2}ch` : "2.5rem";

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm transition-colors group-focus-within:text-indigo-500 z-10">
          {currency}
        </span>
        <input
          {...props}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          style={{ paddingLeft: paddingLeft }} // Inline style to handle dynamic width
          className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pr-4 py-3 text-sm input-atelier"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};
