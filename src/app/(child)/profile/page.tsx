import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

const ACHIEVEMENTS = [
  { id: "1", title: "First Quest", emoji: "🗡️", description: "Completed your first chore", unlocked: true },
  { id: "2", title: "Streak Starter", emoji: "🔥", description: "3-day streak!", unlocked: true },
  { id: "3", title: "Team Player", emoji: "🤝", description: "Helped with a family chore", unlocked: true },
  { id: "4", title: "Early Bird", emoji: "🌅", description: "Finish all chores before noon", unlocked: false },
  { id: "5", title: "World Builder", emoji: "🏗️", description: "Unlock 5 world items", unlocked: false },
  { id: "6", title: "Champion", emoji: "🏆", description: "100 total chores", unlocked: false },
];

const STATS = [
  { label: "Total Chores", value: "47", emoji: "✅" },
  { label: "Current Streak", value: "5 days", emoji: "🔥" },
  { label: "Coins Earned", value: "2,840", emoji: "🪙" },
  { label: "World Items", value: "3/12", emoji: "🌍" },
];

export default function ProfilePage() {
  return (
    <>
      {/* Hero */}
      <div
        className="px-4 pt-10 pb-8 text-center"
        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)" }}
      >
        <div className="flex justify-center mb-3">
          <Avatar
            name="Alex"
            size="2xl"
            ring
            ringColor="gold"
            emoji="🧙"
          />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Alex</h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Badge variant="level" size="lg">⭐ Level 4 Explorer</Badge>
        </div>

        {/* XP */}
        <div className="mt-4 bg-white/15 rounded-2xl p-3">
          <div className="flex justify-between text-xs text-purple-200 mb-1.5">
            <span>XP Progress</span>
            <span className="font-bold">320 / 500 XP</span>
          </div>
          <ProgressBar value={320} max={500} color="blue" size="md" />
        </div>
      </div>

      <div className="px-4 mt-5 space-y-5">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#1e1e35] rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center"
            >
              <span className="text-3xl" role="img" aria-label={stat.label}>{stat.emoji}</span>
              <p className="font-black text-2xl text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3">🏆 Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="rounded-2xl border p-3 flex flex-col items-center gap-1.5 text-center transition-all duration-200"
                style={{
                  borderColor: ach.unlocked ? undefined : "transparent",
                  background: ach.unlocked ? undefined : "rgba(0,0,0,0.03)",
                  opacity: ach.unlocked ? 1 : 0.4,
                }}
              >
                <span
                  className="text-3xl"
                  role="img"
                  aria-label={ach.title}
                >
                  {ach.unlocked ? ach.emoji : "🔒"}
                </span>
                <p className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {ach.title}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings section */}
        <div className="bg-white dark:bg-[#1e1e35] rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm">⚙️ Settings</h2>
          </div>
          {[
            { icon: "🎨", label: "Change Avatar" },
            { icon: "🔔", label: "Notifications" },
            { icon: "🌙", label: "Dark Mode" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
                {item.label}
              </span>
              <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">›</span>
            </button>
          ))}
        </div>

        {/* Sign out */}
        <div className="pb-4">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl border-2 border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
