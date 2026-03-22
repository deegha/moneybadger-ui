// components/ui/IconPicker.tsx
import {
  ShoppingCart,
  Utensils,
  Plane,
  Zap,
  Briefcase,
  Dumbbell,
  Banknote,
  Film,
  // New Icons
  Home,
  Car,
  GraduationCap,
  Heart,
  Dog,
  Gift,
  Coffee,
  Smartphone,
  Laptop,
  Shirt,
  Hammer,
  Shield,
  Baby,
  Gamepad2,
  Palette,
  Globe,
  Landmark,
  ReceiptText,
  PiggyBank,
  Truck,
} from "lucide-react";

const ICONS = [
  { id: "shopping", icon: ShoppingCart },
  { id: "food", icon: Utensils },
  { id: "travel", icon: Plane },
  { id: "utilities", icon: Zap },
  { id: "work", icon: Briefcase },
  { id: "health", icon: Dumbbell },
  { id: "finance", icon: Banknote },
  { id: "entertainment", icon: Film },
  // --- 20 New Icons ---
  { id: "housing", icon: Home },
  { id: "transport", icon: Car },
  { id: "education", icon: GraduationCap },
  { id: "insurance", icon: Shield },
  { id: "wellness", icon: Heart },
  { id: "pets", icon: Dog },
  { id: "gifts", icon: Gift },
  { id: "cafe", icon: Coffee },
  { id: "mobile", icon: Smartphone },
  { id: "tech", icon: Laptop },
  { id: "clothing", icon: Shirt },
  { id: "maintenance", icon: Hammer },
  { id: "family", icon: Baby },
  { id: "gaming", icon: Gamepad2 },
  { id: "hobbies", icon: Palette },
  { id: "subscriptions", icon: ReceiptText },
  { id: "savings", icon: PiggyBank },
  { id: "shipping", icon: Truck },
  { id: "government", icon: Landmark },
  { id: "international", icon: Globe },
];
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
