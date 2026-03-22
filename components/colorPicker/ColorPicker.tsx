// components/ui/ColorPicker.tsx
import { Check } from "lucide-react";

const COLORS = [
  { id: "emerald", hex: "bg-emerald-800" },
  { id: "rose", hex: "bg-rose-600" },
  { id: "slate", hex: "bg-slate-600" },
  { id: "maroon", hex: "bg-red-950" },
];

export const ColorPicker = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (id: string) => void;
}) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Category Tag Color
    </label>
    <div className="flex items-center gap-4">
      {COLORS.map((color) => (
        <button
          key={color.id}
          type="button"
          onClick={() => onChange(color.id)}
          className={`w-10 h-10 rounded-full ${color.hex} flex items-center justify-center transition-transform hover:scale-110 relative`}
        >
          {selected === color.id && (
            <>
              <div className="absolute inset-[-4px] border-2 border-emerald-800 rounded-full" />
              <Check className="w-5 h-5 text-white" />
            </>
          )}
        </button>
      ))}
    </div>
  </div>
);
