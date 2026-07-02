"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { clsx } from "clsx";

const REWARDS = [
  { id: "1", title: "Extra Screen Time", emoji: "📱", cost: 50, category: "Privileges", available: true },
  { id: "2", title: "Choose Dinner", emoji: "🍕", cost: 30, category: "Privileges", available: true },
  { id: "3", title: "Stay Up 30 Min Late", emoji: "🌙", cost: 75, category: "Privileges", available: true },
  { id: "4", title: "Skip One Chore", emoji: "🎫", cost: 100, category: "Privileges", available: false },
  { id: "5", title: "Ice Cream Trip", emoji: "🍦", cost: 60, category: "Treats", available: true },
  { id: "6", title: "Movie Night Pick", emoji: "🎬", cost: 40, category: "Treats", available: true },
  { id: "7", title: "New Book/Game", emoji: "🎮", cost: 150, category: "Prizes", available: true },
  { id: "8", title: "Toy of Your Choice", emoji: "🧸", cost: 300, category: "Prizes", available: false },
];

const CATEGORIES = ["All", "Privileges", "Treats", "Prizes"] as const;
type Category = typeof CATEGORIES[number];

const COINS = 1250;

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState<Set<string>>(new Set());

  const filtered = REWARDS.filter(
    (r) =>
      (selectedCategory === "All" || r.category === selectedCategory)
  );

  const handleRedeem = (id: string) => {
    setRedeemingId(id);
    setTimeout(() => {
      setRedeemed((prev) => new Set(prev).add(id));
      setRedeemingId(null);
    }, 1000);
  };

  return (
    <>
      {/* Header */}
      <div
        className="px-4 pt-10 pb-5"
        style={{ background: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)" }}
      >
        <h1 className="text-2xl font-extrabold text-amber-900 mb-1">🎁 Reward Shop</h1>
        <p className="text-amber-800 text-sm mb-4">
          Spend your coins on amazing rewards!
        </p>

        {/* Coin balance */}
        <div className="bg-amber-900/20 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-4xl" role="img" aria-label="coins">🪙</span>
          <div>
            <p className="text-amber-900/70 text-xs font-medium">Your Coins</p>
            <p className="text-3xl font-black text-amber-900">{COINS.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150",
                selectedCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reward grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((reward) => {
            const canAfford = COINS >= reward.cost;
            const isRedeemed = redeemed.has(reward.id);
            const isRedeeming = redeemingId === reward.id;

            return (
              <div
                key={reward.id}
                className={clsx(
                  "rounded-2xl border p-4 flex flex-col items-center text-center gap-2",
                  "transition-all duration-200",
                  isRedeemed
                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                    : reward.available
                    ? "border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e1e35]"
                    : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 opacity-60"
                )}
              >
                <span className="text-4xl" role="img" aria-label={reward.title}>
                  {reward.emoji}
                </span>
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-tight">
                  {reward.title}
                </p>

                <div className="flex items-center gap-1">
                  <span className="text-base">🪙</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    {reward.cost}
                  </span>
                </div>

                {isRedeemed ? (
                  <Badge variant="success" size="md">✓ Requested!</Badge>
                ) : !reward.available ? (
                  <Badge variant="gray" size="md">Unavailable</Badge>
                ) : (
                  <button
                    onClick={() => handleRedeem(reward.id)}
                    disabled={!canAfford || isRedeeming}
                    className={clsx(
                      "w-full py-2 rounded-xl text-sm font-bold transition-all duration-150",
                      canAfford
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {isRedeeming ? "⏳ Redeeming…" : canAfford ? "Redeem 🎉" : "Need More Coins"}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* How to earn more */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800/40 p-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-2">
            💡 Earn More Coins
          </h3>
          <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <li>⚔️ Complete daily quests for bonus coins</li>
            <li>🔥 Keep your streak going for multipliers</li>
            <li>⭐ Finish hard difficulty chores for big rewards</li>
          </ul>

          {/* XP to next reward */}
          <div className="mt-3">
            <ProgressBar
              value={COINS % 100}
              max={100}
              color="gold"
              size="sm"
              label="Progress to next bonus"
              showValue
            />
          </div>
        </div>
      </div>
    </>
  );
}
