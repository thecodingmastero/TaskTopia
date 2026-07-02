"use client";

import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0–100
  max?: number;
  color?: "purple" | "blue" | "green" | "gold" | "pink";
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
}

const colorClasses = {
  purple: "bg-gradient-to-r from-purple-500 to-purple-600",
  blue: "bg-gradient-to-r from-blue-400 to-blue-600",
  green: "bg-gradient-to-r from-green-400 to-emerald-500",
  gold: "bg-gradient-to-r from-amber-400 to-yellow-500",
  pink: "bg-gradient-to-r from-pink-400 to-pink-600",
};

const trackClasses = {
  purple: "bg-purple-100 dark:bg-purple-900/30",
  blue: "bg-blue-100 dark:bg-blue-900/30",
  green: "bg-green-100 dark:bg-green-900/30",
  gold: "bg-amber-100 dark:bg-amber-900/30",
  pink: "bg-pink-100 dark:bg-pink-900/30",
};

const sizeClasses = {
  xs: "h-1 rounded-full",
  sm: "h-2 rounded-full",
  md: "h-3 rounded-full",
  lg: "h-4 rounded-full",
};

export function ProgressBar({
  value,
  max = 100,
  color = "purple",
  size = "md",
  label,
  showValue = false,
  animated = true,
  striped = false,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx("w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progress"}
        className={clsx(
          "w-full overflow-hidden",
          trackClasses[color],
          sizeClasses[size]
        )}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-[width] duration-700 ease-out",
            colorClasses[color],
            animated && "shadow-sm",
            striped &&
              "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.15)_10px,rgba(255,255,255,0.15)_20px)]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
