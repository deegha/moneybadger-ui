import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1 block">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full px-4 py-4 rounded-xl bg-neutral-50 border border-neutral-100",
            "text-sm text-primary placeholder:text-neutral-300",
            "focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all",
            error &&
              "border-tertiary focus:border-tertiary focus:ring-tertiary/5",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-tertiary uppercase px-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
