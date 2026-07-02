import { clsx } from "clsx";

interface WorldItem {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  requiredChores?: number;
}

interface WorldMapProps {
  completedChores: number;
  totalChores: number;
  items?: WorldItem[];
  className?: string;
}

const defaultItems: WorldItem[] = [
  { id: "cottage", name: "Cozy Cottage", emoji: "🏡", unlocked: true },
  { id: "garden", name: "Magical Garden", emoji: "🌸", unlocked: true },
  { id: "fountain", name: "Crystal Fountain", emoji: "⛲", unlocked: true, requiredChores: 3 },
  { id: "treehouse", name: "Treehouse", emoji: "🌳", unlocked: false, requiredChores: 5 },
  { id: "tower", name: "Wizard Tower", emoji: "🗼", unlocked: false, requiredChores: 8 },
  { id: "castle", name: "Grand Castle", emoji: "🏰", unlocked: false, requiredChores: 12 },
  { id: "dragon", name: "Friendly Dragon", emoji: "🐉", unlocked: false, requiredChores: 15 },
  { id: "stars", name: "Star Observatory", emoji: "🔭", unlocked: false, requiredChores: 20 },
];

export function WorldMap({
  completedChores,
  totalChores,
  items,
  className,
}: WorldMapProps) {
  const worldItems = items ?? defaultItems;
  const unlocked = worldItems.filter((i) => i.unlocked || (i.requiredChores && completedChores >= i.requiredChores));

  return (
    <div className={clsx("rounded-2xl overflow-hidden", className)}>
      {/* Sky gradient background */}
      <div
        className="relative p-4"
        style={{
          background:
            "linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 30%, #3b82f6 60%, #7dd3fc 85%, #86efac 100%)",
        }}
      >
        {/* Stars */}
        <div className="absolute top-2 left-4 right-4 flex justify-between pointer-events-none" aria-hidden="true">
          {["✨", "⭐", "✨", "💫", "⭐"].map((s, i) => (
            <span key={i} className="text-xs animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
              {s}
            </span>
          ))}
        </div>

        {/* World title */}
        <div className="text-center mb-3 mt-2">
          <h3 className="text-white font-bold text-lg drop-shadow">🌍 Your Fantasy World</h3>
          <p className="text-blue-100 text-xs mt-0.5">
            {unlocked.length} / {worldItems.length} areas unlocked
          </p>
        </div>

        {/* World grid */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {worldItems.map((item) => {
            const isUnlocked =
              item.unlocked ||
              (item.requiredChores !== undefined && completedChores >= item.requiredChores);

            return (
              <div
                key={item.id}
                className={clsx(
                  "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 p-1 transition-all duration-300",
                  isUnlocked
                    ? "bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 hover:scale-105"
                    : "bg-black/25 backdrop-blur-sm cursor-not-allowed"
                )}
                title={
                  isUnlocked
                    ? item.name
                    : `Unlock at ${item.requiredChores} chores completed`
                }
              >
                <span
                  className={clsx(
                    "text-2xl transition-all duration-300",
                    isUnlocked ? "opacity-100" : "opacity-30 grayscale"
                  )}
                  role="img"
                  aria-label={isUnlocked ? item.name : "Locked"}
                >
                  {isUnlocked ? item.emoji : "🔒"}
                </span>
                {!isUnlocked && item.requiredChores && (
                  <span className="text-[8px] text-white/60 text-center leading-tight">
                    {item.requiredChores} chores
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Ground */}
        <div className="mt-3 rounded-xl bg-green-400/30 backdrop-blur-sm py-2 px-3 flex items-center justify-between">
          <span className="text-xs text-green-100 font-medium">
            🌿 {completedChores} chores → world grows
          </span>
          <span className="text-xs text-green-100">
            {totalChores - completedChores} left today
          </span>
        </div>
      </div>
    </div>
  );
}
