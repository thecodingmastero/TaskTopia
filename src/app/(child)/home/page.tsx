"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { XPHud } from "@/components/child/XPHud";
import { WorldMap } from "@/components/child/WorldMap";
import { ChoreCard } from "@/components/child/ChoreCard";
import { Confetti } from "@/components/ui/Confetti";
import { Bell } from "lucide-react";

// Mock data — replace with real data fetching
const MOCK_KID = {
  name: "Alex",
  level: 4,
  xp: 320,
  xpMax: 500,
  coins: 1250,
  streak: 5,
  completedChores: 6,
};

const MOCK_CHORES = [
  {
    id: "1",
    title: "Make Your Bed",
    description: "Straighten the sheets and fluff the pillows",
    emoji: "🛏️",
    xp: 20,
    coins: 5,
    difficulty: "easy" as const,
    status: "pending" as const,
    dueLabel: "Today",
    color: "blue" as const,
  },
  {
    id: "2",
    title: "Feed the Pet",
    description: "Give food and fresh water to the family pet",
    emoji: "🐾",
    xp: 15,
    coins: 10,
    difficulty: "easy" as const,
    status: "approved" as const,
    dueLabel: "Done!",
    color: "green" as const,
  },
  {
    id: "3",
    title: "Clean Your Room",
    description: "Put toys away and vacuum the floor",
    emoji: "🧹",
    xp: 40,
    coins: 20,
    difficulty: "medium" as const,
    status: "in_review" as const,
    dueLabel: "Today",
    color: "purple" as const,
  },
  {
    id: "4",
    title: "Help With Dishes",
    description: "Rinse and load the dishwasher after dinner",
    emoji: "🍽️",
    xp: 30,
    coins: 15,
    difficulty: "medium" as const,
    status: "pending" as const,
    dueLabel: "Tonight",
    color: "gold" as const,
  },
];

export default function ChildHomePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => new Set(prev).add(id));
    setShowConfetti(true);
  };

  const todayDone = MOCK_CHORES.filter(
    (c) => c.status === "approved" || completedIds.has(c.id)
  ).length;
  const todayTotal = MOCK_CHORES.length;

  return (
    <>
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Hero Header */}
      <div
        className="px-4 pt-10 pb-6"
        style={{
          background:
            "linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #2563eb 100%)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <Avatar
              name={MOCK_KID.name}
              size="lg"
              ring
              ringColor="gold"
              level={MOCK_KID.level}
              showLevel
              emoji="🧙"
            />
          </div>
          <button
            className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <XPHud
          name={MOCK_KID.name}
          level={MOCK_KID.level}
          xp={MOCK_KID.xp}
          xpMax={MOCK_KID.xpMax}
          coins={MOCK_KID.coins}
          streak={MOCK_KID.streak}
        />
      </div>

      <div className="px-4 space-y-5 mt-5 pb-4">
        {/* Daily progress banner */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-4 border border-purple-100 dark:border-purple-800/50">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">
              🗓️ Today&apos;s Adventure
            </p>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {todayDone}/{todayTotal}
            </span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-[width] duration-700"
              style={{ width: `${(todayDone / todayTotal) * 100}%` }}
            />
          </div>
          {todayDone === todayTotal && (
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-2 text-center animate-bounce-in">
              🎉 All done! Amazing work, adventurer!
            </p>
          )}
        </div>

        {/* World */}
        <WorldMap
          completedChores={MOCK_KID.completedChores}
          totalChores={todayTotal}
        />

        {/* Motivational copy */}
        <div className="text-center py-1">
          {MOCK_KID.streak > 0 && (
            <p className="text-sm font-semibold text-orange-500 dark:text-orange-400">
              🔥 {MOCK_KID.streak}-day streak! Keep it up!
            </p>
          )}
        </div>

        {/* Today's chores */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 dark:text-gray-100">
              Today&apos;s Quests
            </h2>
            <span className="text-xs text-gray-400">
              {todayDone} done ✓
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_CHORES.map((chore) => (
              <ChoreCard
                key={chore.id}
                {...chore}
                status={
                  completedIds.has(chore.id) ? "in_review" : chore.status
                }
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
