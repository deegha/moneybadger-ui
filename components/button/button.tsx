import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "social";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-[#4B5563] text-white hover:bg-[#374151] shadow-lg shadow-primary/5 active:scale-[0.98]",
      secondary:
        "bg-secondary text-white hover:bg-secondary/90 active:scale-[0.98]",
      outline:
        "bg-transparent border border-neutral-200 text-primary hover:bg-neutral-50 active:scale-[0.98]",
      ghost:
        "bg-transparent text-neutral-400 hover:text-primary transition-colors",
      social:
        "bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 text-primary font-bold active:scale-[0.97]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-md",
      md: "px-4 py-2.5 text-sm rounded-lg",
      lg: "px-6 py-3.5 text-sm rounded-xl",
      xl: "px-8 py-4.5 text-base rounded-2xl font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          /* Changed inline-flex to flex + items-center + justify-center */
          "flex items-center justify-center gap-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === "left" && <span>{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
