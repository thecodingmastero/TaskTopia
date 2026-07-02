import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { clsx } from "clsx";

type CardVariant = "default" | "elevated" | "glass" | "gradient" | "bordered";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white dark:bg-[#161629] border border-gray-100 dark:border-[#2d2d4a] shadow-sm",
  elevated: "bg-white dark:bg-[#1e1e35] shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]",
  glass:
    "bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-md",
  gradient:
    "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg",
  bordered:
    "bg-transparent border-2 border-purple-200 dark:border-purple-800",
};

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    padding = "md",
    interactive = false,
    children,
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "rounded-2xl overflow-hidden",
        variantClasses[variant],
        paddingClasses[padding],
        interactive &&
          "cursor-pointer transition-all duration-[220ms] hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
