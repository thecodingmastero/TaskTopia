import { ProgressBar } from "@/components/ui/ProgressBar";
import { clsx } from "clsx";

interface XPHudProps {
  name: string;
  level: number;
  xp: number;
  xpMax: number;
  coins: number;
  streak: number;
  className?: string;
}

export function XPHud({ name, level, xp, xpMax, coins, streak, className }: XPHudProps) {
  return (
    <div className={clsx("space-y-3", className)}>
      {/* Level + Name */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            Level {level} Explorer
          </p>
          <h2 className="text-xl font-bold text-white leading-tight">{name}</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Coins */}
          <div className="flex items-center gap-1.5 bg-amber-400/20 rounded-xl px-3 py-1.5">
            <span className="text-lg" role="img" aria-label="coins">🪙</span>
            <span className="text-amber-200 font-bold text-sm">{coins.toLocaleString()}</span>
          </div>
          {/* Streak */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-orange-400/20 rounded-xl px-3 py-1.5">
              <span className="text-lg" role="img" aria-label="streak">🔥</span>
              <span className="text-orange-200 font-bold text-sm">{streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-purple-200 font-medium">XP Progress</span>
          <span className="text-xs text-purple-200 font-bold">
            {xp} / {xpMax} XP
          </span>
        </div>
        <ProgressBar
          value={xp}
          max={xpMax}
          color="blue"
          size="md"
          animated
        />
      </div>
    </div>
  );
}
