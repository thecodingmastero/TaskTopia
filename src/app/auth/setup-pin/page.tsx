"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ParentPINPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [confirmedPin, setConfirmedPin] = useState("");
  const [step, setStep] = useState<"create" | "verify">("create");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePIN = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    if (pin !== confirmedPin) {
      setError("PINs do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/setup-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to set PIN");
        return;
      }

      router.push("/home");
    } catch (err) {
      setError("Failed to set PIN. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-dvh flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #4c1d95 0%, #5b21b6 30%, #4338ca 70%, #1d4ed8 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        <Card variant="elevated" padding="lg" className="space-y-6">
          {/* Logo */}
          <div className="text-center">
            <span className="text-5xl" role="img" aria-label="PIN lock">
              🔐
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">
              Parent PIN
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Secure your parent account
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          <form onSubmit={handleCreatePIN} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Create a PIN (4+ digits)
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="••••"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Kids will need this PIN to access parent settings
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={confirmedPin}
                onChange={(e) => setConfirmedPin(e.target.value.replace(/\D/g, ""))}
                placeholder="••••"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
                ⚠️ {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={pin.length < 4 || confirmedPin.length < 4}
            >
              Set PIN
            </Button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              You can change this PIN in settings anytime
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}