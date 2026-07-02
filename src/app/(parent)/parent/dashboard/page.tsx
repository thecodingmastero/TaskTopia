import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ParentShell } from "@/components/parent/ParentShell";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";

// Mock data
const TODAY_CHORES = [
  { id: "1", title: "Make Your Bed", assignee: "Alex", status: "approved", dueLabel: "Morning" },
  { id: "2", title: "Feed the Pet", assignee: "Alex", status: "approved", dueLabel: "Morning" },
  { id: "3", title: "Clean Room", assignee: "Alex", status: "in_review", dueLabel: "Afternoon" },
  { id: "4", title: "Set the Table", assignee: "Sam", status: "pending", dueLabel: "Dinner" },
  { id: "5", title: "Take Out Trash", assignee: "Sam", status: "pending", dueLabel: "Evening" },
];

const PENDING_APPROVALS = [
  { id: "1", kid: "Alex", chore: "Clean Your Room", submittedAt: "2 hours ago", xp: 40, coins: 20 },
  { id: "2", kid: "Sam", chore: "Fold Laundry", submittedAt: "3 hours ago", xp: 30, coins: 15 },
];

const KIDS = [
  { id: "1", name: "Alex", level: 4, xp: 320, xpMax: 500, completedToday: 2, totalToday: 4, streak: 5, emoji: "🧙" },
  { id: "2", name: "Sam", level: 2, xp: 90, xpMax: 200, completedToday: 0, totalToday: 3, streak: 2, emoji: "🧝" },
];

const RECENT_ACTIVITY = [
  { id: "1", text: "Alex completed \"Make Your Bed\"", time: "1h ago", type: "completed" },
  { id: "2", text: "You approved Alex's \"Feed the Pet\"", time: "1h ago", type: "approved" },
  { id: "3", text: "Sam joined TaskTopia", time: "Yesterday", type: "joined" },
  { id: "4", text: "Alex earned 🪙 20 coins", time: "Yesterday", type: "coins" },
];

const STATUS_CONFIG = {
  approved: { label: "Done", badge: "approved" as const, icon: CheckCircle, iconColor: "text-green-500" },
  in_review: { label: "Review", badge: "review" as const, icon: Clock, iconColor: "text-blue-500" },
  pending: { label: "Pending", badge: "pending" as const, icon: AlertCircle, iconColor: "text-yellow-500" },
};

export default function ParentDashboardPage() {
  const doneCount = TODAY_CHORES.filter((c) => c.status === "approved").length;

  return (
    <ParentShell currentPath="/parent/dashboard">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Good morning 👋</p>
              <h1 className="text-2xl font-extrabold text-white mt-0.5">Family Dashboard</h1>
            </div>
            <a
              href="/parent/chores/new"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              New Chore
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "Done Today", value: `${doneCount}/${TODAY_CHORES.length}`, icon: "✅" },
              { label: "Approvals", value: PENDING_APPROVALS.length, icon: "⏳" },
              { label: "Kids Active", value: KIDS.length, icon: "👦" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 rounded-2xl p-3 text-center">
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-purple-200 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6 pb-8">
        {/* Pending approvals — highest priority */}
        {PENDING_APPROVALS.length > 0 && (
          <section aria-labelledby="approvals-heading">
            <div className="flex items-center gap-2 mb-3">
              <h2 id="approvals-heading" className="font-bold text-gray-900 dark:text-gray-100">
                ⏳ Pending Approvals
              </h2>
              <Badge variant="pending" dot>
                {PENDING_APPROVALS.length} waiting
              </Badge>
            </div>
            <div className="space-y-3">
              {PENDING_APPROVALS.map((item) => (
                <Card key={item.id} variant="elevated" padding="md">
                  <div className="flex items-center gap-4">
                    <Avatar name={item.kid} size="md" ring ringColor="blue" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                        {item.kid} — {item.chore}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="xp" size="sm">+{item.xp} XP</Badge>
                        <Badge variant="coins" size="sm">+{item.coins} 🪙</Badge>
                        <span className="text-xs text-gray-400">{item.submittedAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors"
                        aria-label={`Approve ${item.kid}'s ${item.chore}`}
                      >
                        ✓ Approve
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        aria-label={`Reject ${item.kid}'s ${item.chore}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Kids progress */}
        <section aria-labelledby="kids-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="kids-heading" className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              Kids Progress
            </h2>
            <a href="/parent/kids" className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
              Manage →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {KIDS.map((kid) => (
              <Card key={kid.id} variant="elevated" padding="md">
                <div className="flex items-start gap-3">
                  <Avatar name={kid.name} size="lg" ring ringColor="purple" emoji={kid.emoji} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 dark:text-gray-100">{kid.name}</p>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="level" size="sm">Lvl {kid.level}</Badge>
                        {kid.streak > 0 && (
                          <Badge variant="streak" size="sm">🔥 {kid.streak}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-2">
                      <ProgressBar
                        value={kid.xp}
                        max={kid.xpMax}
                        color="purple"
                        size="sm"
                        label={`XP: ${kid.xp}/${kid.xpMax}`}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Today: {kid.completedToday}/{kid.totalToday} chores
                      </span>
                      <div className="h-2 w-20 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-400 transition-[width]"
                          style={{
                            width: kid.totalToday > 0
                              ? `${(kid.completedToday / kid.totalToday) * 100}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's chores */}
          <section aria-labelledby="today-heading">
            <div className="flex items-center justify-between mb-3">
              <h2 id="today-heading" className="font-bold text-gray-900 dark:text-gray-100">
                📋 Today&apos;s Chores
              </h2>
              <span className="text-xs text-gray-400">{doneCount}/{TODAY_CHORES.length} done</span>
            </div>
            <Card variant="elevated" padding="none">
              <ul>
                {TODAY_CHORES.map((chore, idx) => {
                  const cfg = STATUS_CONFIG[chore.status as keyof typeof STATUS_CONFIG];
                  const Icon = cfg.icon;
                  return (
                    <li
                      key={chore.id}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        idx < TODAY_CHORES.length - 1
                          ? "border-b border-gray-50 dark:border-gray-800"
                          : ""
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${cfg.iconColor}`} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {chore.title}
                        </p>
                        <p className="text-xs text-gray-400">{chore.assignee} · {chore.dueLabel}</p>
                      </div>
                      <Badge variant={cfg.badge} size="sm">{cfg.label}</Badge>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>

          {/* Recent activity */}
          <section aria-labelledby="activity-heading">
            <div className="flex items-center gap-2 mb-3">
              <h2 id="activity-heading" className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Recent Activity
              </h2>
            </div>
            <Card variant="elevated" padding="none">
              <ul>
                {RECENT_ACTIVITY.map((item, idx) => (
                  <li
                    key={item.id}
                    className={`flex items-start gap-3 px-4 py-3 ${
                      idx < RECENT_ACTIVITY.length - 1
                        ? "border-b border-gray-50 dark:border-gray-800"
                        : ""
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-100">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>

        {/* Quick actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading" className="font-bold text-gray-900 dark:text-gray-100 mb-3">
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: "➕", label: "Create Chore", href: "/parent/chores/new", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
              { icon: "🎁", label: "Add Reward", href: "/parent/rewards/new", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
              { icon: "👦", label: "Add Kid", href: "/parent/kids/new", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
              { icon: "📊", label: "Reports", href: "/parent/reports", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${action.color}`}
              >
                <span className="text-2xl" role="img" aria-label={action.label}>
                  {action.icon}
                </span>
                {action.label}
              </a>
            ))}
          </div>
        </section>

        {/* Weekly summary */}
        <section aria-labelledby="weekly-heading">
          <h2 id="weekly-heading" className="font-bold text-gray-900 dark:text-gray-100 mb-3">
            📅 This Week
          </h2>
          <Card variant="gradient" padding="lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Chores Done", value: "23" },
                { label: "XP Earned", value: "680" },
                { label: "Rewards Given", value: "3" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="text-xs text-purple-200 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </ParentShell>
  );
}
