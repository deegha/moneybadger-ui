import { ICONS } from "@/lib/constants";

export const IconPicker = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (id: string) => void;
}) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Select Icon
    </label>
    <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-xl border border-neutral-100 flex-wrap">
      {ICONS.map(({ id, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`p-3 rounded-lg transition-all ${
            selected === id
              ? "bg-white shadow-sm text-emerald-600 ring-1 ring-black/5"
              : "text-neutral-400 hover:bg-white hover:text-neutral-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  </div>
);
