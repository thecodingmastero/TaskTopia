import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: string;
  level?: number;
  showLevel?: boolean;
  ring?: boolean;
  ringColor?: "purple" | "gold" | "blue" | "green";
  emoji?: string;
}

const sizeClasses = {
  xs: "w-7 h-7 text-xs",
  sm: "w-9 h-9 text-sm",
  md: "w-11 h-11 text-base",
  lg: "w-14 h-14 text-xl",
  xl: "w-20 h-20 text-3xl",
  "2xl": "w-28 h-28 text-4xl",
};

const ringClasses = {
  purple: "ring-4 ring-purple-400 ring-offset-2 ring-offset-white dark:ring-offset-[#0d0d1a]",
  gold: "ring-4 ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-[#0d0d1a]",
  blue: "ring-4 ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-[#0d0d1a]",
  green: "ring-4 ring-green-400 ring-offset-2 ring-offset-white dark:ring-offset-[#0d0d1a]",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function stringToColor(name?: string): string {
  if (!name) return "#7e22ce";
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#7e22ce", "#1d4ed8", "#16a34a", "#d97706",
    "#db2777", "#0891b2", "#9333ea", "#2563eb",
  ];
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({
  name,
  src,
  size = "md",
  color,
  level,
  showLevel = false,
  ring = false,
  ringColor = "purple",
  emoji,
  className,
  ...props
}: AvatarProps) {
  const bgColor = color ?? stringToColor(name);

  return (
    <div className={clsx("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={clsx(
          "rounded-full flex items-center justify-center font-bold overflow-hidden",
          sizeClasses[size],
          ring && ringClasses[ringColor]
        )}
        style={{ backgroundColor: src ? undefined : bgColor }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name ?? "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : emoji ? (
          <span role="img" aria-label={name ?? "Avatar"}>
            {emoji}
          </span>
        ) : (
          <span className="text-white select-none">{getInitials(name)}</span>
        )}
      </div>

      {showLevel && level !== undefined && (
        <span
          className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white dark:ring-[#0d0d1a]"
          aria-label={`Level ${level}`}
        >
          {level}
        </span>
      )}
    </div>
  );
}
