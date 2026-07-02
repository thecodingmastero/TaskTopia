import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ParentShell } from "@/components/parent/ParentShell";
import { PlusCircle } from "lucide-react";

const KIDS = [
  {
    id: "1", name: "Alex", age: 9, level: 4, xp: 320, xpMax: 500,
    coins: 1250, streak: 5, totalChores: 47, emoji: "🧙",
    recentChores: ["Make Your Bed", "Feed the Pet", "Clean Room"],
  },
  {
    id: "2", name: "Sam", age: 7, level: 2, xp: 90, xpMax: 200,
    coins: 340, streak: 2, totalChores: 18, emoji: "🧝",
    recentChores: ["Set the Table"],
  },
];

export default function ParentKidsPage() {
  return (
    <ParentShell currentPath="/parent/kids">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-800 px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">👨‍👩‍👧‍👦 Kids</h1>
            <p className="text-green-200 text-sm mt-0.5">{KIDS.length} kids in your household</p>
          </div>
          <a
            href="/parent/kids/new"
            className="flex items-center gap-2 bg-white text-green-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-50 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Kid
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-4 pb-8">
        {KIDS.map((kid) => (
          <Card key={kid.id} variant="elevated" padding="lg">
            <div className="flex items-start gap-4">
              <Avatar name={kid.name} size="xl" ring ringColor="purple" emoji={kid.emoji} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                    {kid.name}
                  </h2>
                  <Badge variant="level" size="md">⭐ Level {kid.level}</Badge>
                  <Badge variant="streak" size="md">🔥 {kid.streak} days</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Age {kid.age} · {kid.totalChores} total chores
                </p>

                {/* XP bar */}
                <div className="mt-3">
                  <ProgressBar
                    value={kid.xp}
                    max={kid.xpMax}
                    color="purple"
                    size="sm"
                    label={`XP: ${kid.xp}/${kid.xpMax}`}
                  />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🪙</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                      {kid.coins.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Recent: {kid.recentChores.slice(0, 2).join(", ")}
                    {kid.recentChores.length > 2 && "…"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={`/parent/kids/${kid.id}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-center"
                >
                  View
                </a>
                <a
                  href={`/parent/kids/${kid.id}/edit`}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Edit
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ParentShell>
  );
}
