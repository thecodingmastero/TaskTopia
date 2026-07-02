"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main
      className="min-h-dvh flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #4c1d95 0%, #5b21b6 30%, #4338ca 70%, #1d4ed8 100%)",
      }}
    >
      {/* Floating decorations */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-5xl animate-float pointer-events-none"
        aria-hidden="true"
      >
        🏰
      </div>

      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white dark:bg-[#1e1e35] rounded-3xl shadow-2xl overflow-hidden">
          {/* Color top stripe */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600" />

          <div className="p-8 space-y-6">
            {/* Logo */}
            <div className="text-center">
              <span className="text-5xl" role="img" aria-label="TaskTopia castle">
                🏰
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">
                Task<span className="text-purple-600 dark:text-purple-400">Topia</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your family&apos;s chore adventure begins here
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-700" />

            {/* Sign in */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                Sign in to your kingdom
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold hover:border-purple-400 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                type="button"
                aria-label="Continue with Google"
              >
                {/* Google SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              By signing in you agree to our terms of service
            </p>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="mt-6 flex flex-col gap-2">
          {[
            "🎮 Game-like experience for kids",
            "📋 Simple management for parents",
            "🏆 Real rewards for real chores",
          ].map((bullet) => (
            <p key={bullet} className="text-sm text-purple-200 text-center">
              {bullet}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}