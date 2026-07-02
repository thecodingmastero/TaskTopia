import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col">
      {/* Hero */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16"
        style={{
          background:
            "linear-gradient(135deg, #4c1d95 0%, #5b21b6 25%, #4338ca 60%, #1d4ed8 100%)",
        }}
      >
        {/* Stars decoration */}
        <div className="text-4xl mb-4 animate-float" aria-hidden="true">
          ✨🏰✨
        </div>

        <h1 className="text-5xl font-extrabold text-white leading-tight max-w-sm">
          Task<span className="text-amber-300">Topia</span>
        </h1>
        <p className="mt-4 text-lg text-purple-200 max-w-xs leading-relaxed">
          Where real-life chores build an exciting fantasy world!
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {["🗡️ Complete Quests", "🌍 Build Your World", "🏆 Earn Rewards"].map(
            (pill) => (
              <span
                key={pill}
                className="bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full"
              >
                {pill}
              </span>
            )
          )}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/auth/login"
            className="w-full py-4 rounded-2xl bg-white text-purple-700 font-extrabold text-lg text-center hover:bg-purple-50 transition-colors shadow-xl"
          >
            Start Your Adventure 🚀
          </Link>
          <Link
            href="/home"
            className="w-full py-3.5 rounded-2xl border-2 border-white/40 text-white font-semibold text-base text-center hover:bg-white/10 transition-colors"
          >
            Preview Child View
          </Link>
          <Link
            href="/parent/dashboard"
            className="w-full py-3.5 rounded-2xl border-2 border-white/20 text-purple-200 font-semibold text-base text-center hover:bg-white/10 transition-colors"
          >
            Preview Parent View
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-[#0d0d1a] px-6 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
            How it works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                emoji: "⚔️",
                title: "Complete Quests",
                desc: "Kids check off chores to earn XP and coins",
              },
              {
                emoji: "🌍",
                title: "Build a World",
                desc: "Unlock buildings, creatures, and new areas",
              },
              {
                emoji: "🏆",
                title: "Earn Rewards",
                desc: "Redeem coins for real-world privileges and prizes",
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}