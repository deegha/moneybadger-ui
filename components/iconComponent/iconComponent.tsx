import { ICONS } from "@/lib/constants";
import { CircleHelp } from "lucide-react";

export function IconComponent({
  name,
  className,
  style,
}: {
  name: string;
  className: string;
  style: Record<string, string>;
}) {
  const iconEntry = ICONS.find((i) => i.id === name);

  const Icon = iconEntry ? iconEntry.icon : CircleHelp;

  return (
    <div style={style} className={className}>
      <Icon size={24} />
    </div>
  );
}
