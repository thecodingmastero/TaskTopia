import { type HTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

type BadgeVariant =
  | "xp"
  | "coins"
  | "streak"
  | "level"
  | "pending"
  | "approved"
  | "review"
  | "success"
  | "purple"
  | "blue"
  | "green"
  | "gold"
  | "pink"
  | "gray";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  xp: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  coins: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  streak: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  level: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  approved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  review: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  success: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  green: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  gold: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  pink: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs rounded-lg",
  md: "px-2.5 py-1 text-xs rounded-xl",
  lg: "px-3 py-1.5 text-sm rounded-xl",
};

export function Badge({
  variant = "gray",
  size = "md",
  icon,
  children,
  dot,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-semibold",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full bg-current")}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
