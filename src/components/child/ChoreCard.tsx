"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ChoreCardProps {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  xp: number;
  coins: number;
  difficulty?: "easy" | "medium" | "hard";
  status?: "pending" | "in_review" | "approved";
  dueLabel?: string;
  color?: "purple" | "blue" | "green" | "gold" | "pink";
  onComplete?: (id: string) => void;
}

const difficultyConfig = {
  easy: { label: "Easy", badge: "green" as const, stars: 1 },
  medium: { label: "Medium", badge: "gold" as const, stars: 2 },
  hard: { label: "Hard", badge: "pink" as const, stars: 3 },
};

const colorGradients = {
  purple: "from-purple-500 to-purple-700",
  blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-emerald-600",
  gold: "from-amber-400 to-yellow-600",
  pink: "from-pink-400 to-rose-600",
};

const colorLight = {
  purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800",
  blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
  green: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
  gold: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800",
  pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800",
};

export function ChoreCard({
  id,
  title,
  description,
  emoji = "✨",
  xp,
  coins,
  difficulty = "medium",
  status = "pending",
  dueLabel,
  color = "purple",
  onComplete,
}: ChoreCardProps) {
  const [pressed, setPressed] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [done, setDone] = useState(status === "approved");

  const diff = difficultyConfig[difficulty];
  const isReview = status === "in_review";
  const isApproved = done || status === "approved";

  const handleComplete = () => {
    if (isApproved || isReview || completing) return;
    setCompleting(true);
    setTimeout(() => {
      setDone(true);
      setCompleting(false);
      onComplete?.(id);
    }, 600);
  };

  return (
    <div
      className={clsx(
        "rounded-2xl border overflow-hidden",
        "transition-transform duration-200",
        pressed && !isApproved && "scale-[0.98]",
        isApproved
          ? "opacity-75"
          : colorLight[color],
        !isApproved && "shadow-sm hover:shadow-md"
      )}
      onPointerDown={() => !isApproved && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      {/* Color stripe */}
      <div className={clsx("h-1.5 w-full bg-gradient-to-r", colorGradients[color])} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Emoji icon */}
          <div
            className={clsx(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
              `bg-gradient-to-br ${colorGradients[color]}`
            )}
            aria-hidden="true"
          >
            {isApproved ? "✅" : emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={clsx(
                  "font-bold text-base leading-tight",
                  isApproved
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-gray-100"
                )}
              >
                {title}
              </h3>
              <Badge variant={diff.badge} size="sm">
                {"⭐".repeat(diff.stars)} {diff.label}
              </Badge>
            </div>

            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {description}
              </p>
            )}

            {/* Rewards */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="xp" size="sm" icon={<span>⚡</span>}>
                +{xp} XP
              </Badge>
              <Badge variant="coins" size="sm" icon={<span>🪙</span>}>
                +{coins}
              </Badge>
              {dueLabel && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  📅 {dueLabel}
                </span>
              )}
            </div>
          </div>

          {/* Complete button */}
          <div className="shrink-0 ml-1">
            {isApproved ? (
              <div
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-sm"
                aria-label="Completed"
              >
                <Check className="w-5 h-5 text-white" />
              </div>
            ) : isReview ? (
              <div
                className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center"
                aria-label="In review"
              >
                <span className="text-lg">👀</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                disabled={completing}
                aria-label={`Mark "${title}" as done`}
                className={clsx(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                  "transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-500",
                  completing
                    ? "border-green-400 bg-green-400 scale-125"
                    : "border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                )}
              >
                {completing ? (
                  <Check className="w-5 h-5 text-white animate-bounce-in" />
                ) : (
                  <span className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
