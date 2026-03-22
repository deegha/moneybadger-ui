"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showForgot?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, showForgot, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center px-1">
          {label && (
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
              {label}
            </label>
          )}
          {showForgot && (
            <button
              type="button"
              className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full px-4 py-4 rounded-xl bg-neutral-50 border border-neutral-100",
              "text-sm text-primary placeholder:text-neutral-300 pr-12",
              "focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all",
              className,
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
