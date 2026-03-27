// components/ui/ColorPicker.tsx
import { Check } from "lucide-react";
import { COLORS } from "@/lib/constants";

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
    <div className="flex items-center gap-4 flex-wrap">
      {COLORS.map((color) => (
        <button
          key={color.id}
          type="button"
          onClick={() => onChange(color.id)}
          className={`w-10 h-10 rounded-full ${color.hex} flex items-center justify-center transition-transform hover:scale-110 relative`}
        >
          {selected === color.id && (
            <>
              <div className="absolute -inset-1 border-2 border-emerald-800 rounded-full" />
              <Check className="w-5 h-5 text-white" />
            </>
          )}
        </button>
      ))}
    </div>
  </div>
);
