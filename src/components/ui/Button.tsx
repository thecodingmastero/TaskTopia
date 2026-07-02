"use client";

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { clsx } from "clsx";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "gold"
  | "green"
  | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg",
  ghost:
    "bg-transparent hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-700 dark:text-purple-300",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md",
  gold:
    "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-amber-900 font-bold shadow-md hover:shadow-lg",
  green:
    "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold shadow-md hover:shadow-lg",
  outline:
    "border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 text-purple-700 dark:text-purple-300 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-950",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-2xl gap-2",
  xl: "px-8 py-4 text-lg rounded-2xl gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={clsx(
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-[120ms] ease-in-out",
          "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          "select-none cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {iconRight && !loading && (
          <span className="shrink-0">{iconRight}</span>
        )}
      </button>
    );
  }
);
