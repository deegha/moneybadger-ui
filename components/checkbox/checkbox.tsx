import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-start gap-3 group cursor-pointer w-fit">
        <div className="relative flex items-center mt-0.5">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-neutral-200 bg-neutral-50",
              "checked:bg-primary checked:border-primary transition-all duration-200",
              "focus:ring-4 focus:ring-primary/5 outline-none",
              className,
            )}
            {...props}
          />
          {/* Custom Checkmark Icon */}
          <Check className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 stroke-[3]" />
        </div>

        {(label || description) && (
          <label htmlFor={inputId} className="flex flex-col cursor-pointer">
            {label && (
              <span className="text-sm font-semibold text-neutral-600 group-hover:text-primary transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-neutral-400 font-medium leading-relaxed">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
