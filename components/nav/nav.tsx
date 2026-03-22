"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  CalendarClock,
  Tags,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "../notification/notification";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ReceiptText },
  { name: "Recurring Bills", href: "/recurring", icon: CalendarClock },
  { name: "Categories", href: "/categories", icon: Tags },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 h-screen border-r border-border px-4 py-8 sticky top-0">
      <div className="px-4 mb-10">
        <h1 className="text-xl font-bold text-primary tracking-tight">
          Fiscal Atelier
        </h1>
        <p className="text-xs text-neutral-400 font-medium">Premium Finance</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-primary",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-neutral-400",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-6 p-4 rounded-2xl bg-neutral-100/50 space-y-3">
        <div>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Current Tier
          </p>
          <p className="text-sm font-semibold text-primary">Atelier Pro</p>
        </div>
        <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-all">
          Upgrade Plan
        </button>
      </div>

      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 text-xs font-bold">JV</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-primary leading-none">
            Julian Vane
          </span>
          <span className="text-[11px] text-neutral-400 mt-1">
            Premium Member
          </span>
        </div>
      </div>
      <Notification />
    </aside>
  );
}
