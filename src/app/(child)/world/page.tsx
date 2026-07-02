"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

const WORLD_ITEMS = [
  { id: "cottage", name: "Cozy Cottage", emoji: "🏡", category: "Buildings", unlocked: true, completedAt: 0 },
  { id: "garden", name: "Magical Garden", emoji: "🌸", category: "Decorations", unlocked: true, completedAt: 2 },
  { id: "fountain", name: "Crystal Fountain", emoji: "⛲", category: "Decorations", unlocked: true, completedAt: 3, requiredChores: 3 },
  { id: "treehouse", name: "Treehouse", emoji: "🌳", category: "Buildings", unlocked: false, requiredChores: 5 },
  { id: "tower", name: "Wizard Tower", emoji: "🗼", category: "Buildings", unlocked: false, requiredChores: 8 },
  { id: "castle", name: "Grand Castle", emoji: "🏰", category: "Buildings", unlocked: false, requiredChores: 12 },
  { id: "unicorn", name: "Unicorn Companion", emoji: "🦄", category: "Creatures", unlocked: false, requiredChores: 10 },
  { id: "dragon", name: "Friendly Dragon", emoji: "🐉", category: "Creatures", unlocked: false, requiredChores: 15 },
  { id: "phoenix", name: "Phoenix Egg", emoji: "🥚", category: "Creatures", unlocked: false, requiredChores: 18 },
  { id: "observatory", name: "Star Observatory", emoji: "🔭", category: "New Areas", unlocked: false, requiredChores: 20 },
  { id: "dungeon", name: "Secret Dungeon", emoji: "🏚️", category: "New Areas", unlocked: false, requiredChores: 25 },
  { id: "clouds", name: "Cloud Kingdom", emoji: "☁️", category: "New Areas", unlocked: false, requiredChores: 30 },
];

const CATEGORIES = ["All", "Buildings", "Decorations", "Creatures", "New Areas"] as const;
type Category = typeof CATEGORIES[number];

const COMPLETED_CHORES = 6; // mock value

export default function WorldPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<(typeof WORLD_ITEMS)[0] | null>(null);

  const filtered = WORLD_ITEMS.filter(
    (i) => selectedCategory === "All" || i.category === selectedCategory
  );

  const unlockedCount = WORLD_ITEMS.filter(
    (i) => i.unlocked || (i.requiredChores && COMPLETED_CHORES >= i.requiredChores)
  ).length;

  const nextUnlock = WORLD_ITEMS.find(
    (i) => !i.unlocked && i.requiredChores && COMPLETED_CHORES < i.requiredChores
  );

  return (
    <>
      {/* Header */}
      <div
        className="px-4 pt-10 pb-5"
        style={{
          background: "linear-gradient(180deg, #1e1b4b 0%, #1e3a8a 40%, #1d4ed8 70%, #3b82f6 100%)",
        }}
      >
        <h1 className="text-2xl font-extrabold text-white mb-1">🌍 Fantasy World</h1>
        <p className="text-blue-200 text-sm mb-4">
          Complete chores to unlock new places and creatures!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/15 rounded-2xl p-3 text-center">
            <p className="text-3xl font-black text-white">{unlockedCount}</p>
            <p className="text-xs text-blue-200">Areas Unlocked</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-3 text-center">
            <p className="text-3xl font-black text-amber-300">{COMPLETED_CHORES}</p>
            <p className="text-xs text-blue-200">Chores Done</p>
          </div>
        </div>

        {/* Next unlock progress */}
        {nextUnlock && (
          <div className="bg-white/10 rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl grayscale opacity-70" aria-hidden="true">
                {nextUnlock.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">
                  Next: {nextUnlock.name}
                </p>
                <p className="text-blue-200 text-xs">
                  {COMPLETED_CHORES} / {nextUnlock.requiredChores} chores
                </p>
              </div>
            </div>
            <ProgressBar
              value={COMPLETED_CHORES}
              max={nextUnlock.requiredChores}
              color="gold"
              size="sm"
            />
          </div>
        )}
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* World grid */}
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((item) => {
            const isUnlocked =
              item.unlocked ||
              (item.requiredChores !== undefined && COMPLETED_CHORES >= item.requiredChores);

            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(isUnlocked ? item : null)}
                className={clsx(
                  "rounded-2xl p-3 flex flex-col items-center gap-2 text-center border transition-all duration-200",
                  isUnlocked
                    ? "bg-white dark:bg-[#1e1e35] border-gray-100 dark:border-gray-700 hover:scale-105 hover:shadow-md cursor-pointer"
                    : "bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 cursor-default"
                )}
                disabled={!isUnlocked}
                aria-label={
                  isUnlocked
                    ? item.name
                    : `${item.name} — unlock at ${item.requiredChores} chores`
                }
              >
                <span
                  className={clsx(
                    "text-3xl",
                    isUnlocked ? "opacity-100" : "opacity-25 grayscale"
                  )}
                  role="img"
                  aria-hidden="true"
                >
                  {isUnlocked ? item.emoji : "🔒"}
                </span>
                <span
                  className={clsx(
                    "text-xs font-semibold leading-tight",
                    isUnlocked
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400 dark:text-gray-600"
                  )}
                >
                  {item.name}
                </span>
                {!isUnlocked && item.requiredChores && (
                  <Badge variant="gray" size="sm">
                    {item.requiredChores} chores
                  </Badge>
                )}
                {isUnlocked && (
                  <Badge variant="success" size="sm">✓ Unlocked</Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail sheet */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setSelectedItem(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1e1e35] rounded-t-3xl p-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="text-6xl">{selectedItem.emoji}</span>
              <h2 className="text-xl font-extrabold mt-2 text-gray-900 dark:text-gray-100">
                {selectedItem.name}
              </h2>
              <Badge variant="success" size="lg" className="mt-2">
                ✓ Unlocked
              </Badge>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              This beautiful landmark now decorates your world! Keep completing chores to unlock more.
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
            >
              Awesome! 🎉
            </button>
          </div>
        </div>
      )}
    </>
  );
}
