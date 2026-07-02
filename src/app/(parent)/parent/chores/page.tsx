import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ParentShell } from "@/components/parent/ParentShell";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

const CHORES = [
  { id: "1", title: "Make Your Bed", assignee: "Alex", difficulty: "easy", xp: 20, coins: 5, recurrence: "Daily", active: true },
  { id: "2", title: "Feed the Pet", assignee: "Alex", difficulty: "easy", xp: 15, coins: 10, recurrence: "Twice Daily", active: true },
  { id: "3", title: "Clean Your Room", assignee: "Alex", difficulty: "medium", xp: 40, coins: 20, recurrence: "Weekly", active: true },
  { id: "4", title: "Set the Table", assignee: "Sam", difficulty: "easy", xp: 10, coins: 5, recurrence: "Daily", active: true },
  { id: "5", title: "Take Out Trash", assignee: "Sam", difficulty: "easy", xp: 25, coins: 12, recurrence: "Weekly", active: true },
  { id: "6", title: "Do Homework", assignee: "Alex", difficulty: "hard", xp: 60, coins: 30, recurrence: "Daily", active: false },
];

const DIFF_BADGE = {
  easy: "green" as const,
  medium: "gold" as const,
  hard: "pink" as const,
};

export default function ParentChoresPage() {
  return (
    <ParentShell currentPath="/parent/chores">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">🗂️ Manage Chores</h1>
            <p className="text-blue-200 text-sm mt-0.5">{CHORES.length} chores configured</p>
          </div>
          <a
            href="/parent/chores/new"
            className="flex items-center gap-2 bg-white text-blue-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Chore
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-4 pb-8">
        <div className="space-y-3">
          {CHORES.map((chore) => (
            <Card key={chore.id} variant="elevated" padding="md">
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900 dark:text-gray-100">{chore.title}</p>
                    <Badge variant={DIFF_BADGE[chore.difficulty as keyof typeof DIFF_BADGE]} size="sm">
                      {chore.difficulty}
                    </Badge>
                    {!chore.active && <Badge variant="gray" size="sm">Inactive</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs text-gray-500">👤 {chore.assignee}</span>
                    <span className="text-xs text-gray-500">🔄 {chore.recurrence}</span>
                    <Badge variant="xp" size="sm">+{chore.xp} XP</Badge>
                    <Badge variant="coins" size="sm">🪙 {chore.coins}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    aria-label={`Edit ${chore.title}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    aria-label={`Delete ${chore.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ParentShell>
  );
}
