"use client";

import { useState } from "react";
import { ChoreCard } from "@/components/child/ChoreCard";
import { Confetti } from "@/components/ui/Confetti";
import { clsx } from "clsx";

const ALL_CHORES = [
  {
    id: "1", title: "Make Your Bed", emoji: "🛏️", xp: 20, coins: 5,
    difficulty: "easy" as const, status: "pending" as const,
    dueLabel: "Today", color: "blue" as const,
    description: "Straighten your sheets and fluff the pillows",
  },
  {
    id: "2", title: "Feed the Pet", emoji: "🐾", xp: 15, coins: 10,
    difficulty: "easy" as const, status: "approved" as const,
    dueLabel: "Done!", color: "green" as const,
    description: "Give food and fresh water to your furry friend",
  },
  {
    id: "3", title: "Clean Your Room", emoji: "🧹", xp: 40, coins: 20,
    difficulty: "medium" as const, status: "in_review" as const,
    dueLabel: "Today", color: "purple" as const,
    description: "Put toys away and tidy up your space",
  },
  {
    id: "4", title: "Help With Dishes", emoji: "🍽️", xp: 30, coins: 15,
    difficulty: "medium" as const, status: "pending" as const,
    dueLabel: "Tonight", color: "gold" as const,
    description: "Rinse and load the dishwasher after dinner",
  },
  {
    id: "5", title: "Take Out Trash", emoji: "🗑️", xp: 25, coins: 12,
    difficulty: "easy" as const, status: "pending" as const,
    dueLabel: "Today", color: "blue" as const,
    description: "Take out the bins before pickup day",
  },
  {
    id: "6", title: "Do Homework", emoji: "📚", xp: 60, coins: 30,
    difficulty: "hard" as const, status: "pending" as const,
    dueLabel: "By 6pm", color: "pink" as const,
    description: "Complete all assigned schoolwork",
  },
];

const TABS = ["All", "To Do", "In Review", "Done"] as const;
type TabType = typeof TABS[number];

export default function ChoresPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => new Set(prev).add(id));
    setShowConfetti(true);
  };

  const filtered = ALL_CHORES.filter((c) => {
    const status = completedIds.has(c.id) ? "in_review" : c.status;
    if (activeTab === "All") return true;
    if (activeTab === "To Do") return status === "pending";
    if (activeTab === "In Review") return status === "in_review";
    if (activeTab === "Done") return status === "approved";
    return true;
  });

  const todoPct =
    ALL_CHORES.length === 0
      ? 0
      : Math.round(
          (ALL_CHORES.filter((c) => c.status === "approved" || completedIds.has(c.id))
            .length /
            ALL_CHORES.length) *
            100
        );

  return (
    <>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <div
        className="px-4 pt-10 pb-5"
        style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
      >
        <h1 className="text-2xl font-extrabold text-white mb-1">⚔️ Quest Board</h1>
        <p className="text-blue-100 text-sm mb-4">Complete quests to grow your world!</p>

        {/* Progress summary */}
        <div className="bg-white/15 rounded-2xl p-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-white mb-1">
              <span className="font-medium">Today&apos;s progress</span>
              <span className="font-bold">{todoPct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-700"
                style={{ width: `${todoPct}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{todoPct}%</div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150",
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chore list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl">🎉</span>
              <p className="mt-3 font-bold text-gray-900 dark:text-gray-100">All done!</p>
              <p className="text-sm text-gray-500 mt-1">You crushed every quest in this category.</p>
            </div>
          ) : (
            filtered.map((chore) => (
              <ChoreCard
                key={chore.id}
                {...chore}
                status={completedIds.has(chore.id) ? "in_review" : chore.status}
                onComplete={handleComplete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
