"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Lock } from "lucide-react";

export default function ParentAccessPage() {
  const [showPINPrompt, setShowPINPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccessParent = async () => {
    if (pin.length < 4) {
      setError("Please enter a valid PIN");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Incorrect PIN");
        return;
      }

      // Redirect to parent dashboard
      window.location.href = "/parent/dashboard";
    } catch (err) {
      setError("Failed to verify PIN. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!showPINPrompt) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowPINPrompt(true)}
          variant="secondary"
          size="lg"
          icon={<Lock className="w-4 h-4" />}
        >
          Parent Account
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <Card variant="elevated" padding="lg" className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Parent Access
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter the PIN to access parent settings
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder="••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
            autoFocus
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                setShowPINPrompt(false);
                setPin("");
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              loading={loading}
              disabled={pin.length < 4}
              onClick={handleAccessParent}
            >
              Unlock
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
