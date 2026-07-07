"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SelectRolePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const householdId = searchParams.get("householdId");
  const kidId = searchParams.get("kidId");
  const ageStr = searchParams.get("age");
  const age = ageStr ? parseInt(ageStr, 10) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState<"KID" | "PARENT" | null>(null);

  // Auto-select role based on age if provided
  useEffect(() => {
    if (age !== null && age < 13) {
      setSelectedRole("KID");
    }
  }, [age]);

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/assign-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          householdId,
          kidId,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to set role");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Failed to continue. Please try again.");
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
            <span className="text-5xl" role="img" aria-label="TaskTopia castle">
              🏰
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">
              Almost there!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tell us about you
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Are you a parent or a kid?
            </p>

            <div className="space-y-3 mb-4">
              {/* Parent Option */}
              <button
                onClick={() => setSelectedRole("PARENT")}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedRole === "PARENT"
                    ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">👨‍👩‍👧</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Parent/Guardian
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Manage chores, approve tasks, and track progress
                    </p>
                  </div>
                </div>
              </button>

              {/* Kid Option */}
              <button
                onClick={() => setSelectedRole("KID")}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedRole === "KID"
                    ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">👦</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Kid
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Complete chores and build your fantasy world
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {age !== null && age < 13 && selectedRole !== "KID" && (
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm mb-4">
                💡 Based on your age, the kid view is recommended
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm mb-4">
                ⚠️ {error}
              </div>
            )}

            <Button
              fullWidth
              loading={loading}
              disabled={!selectedRole}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}