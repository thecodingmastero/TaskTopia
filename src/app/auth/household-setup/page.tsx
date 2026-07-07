"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface HouseholdOption {
  id: string;
  name: string;
  memberCount: number;
}

export default function HouseholdSetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [households, setHouseholds] = useState<HouseholdOption[]>([]);
  const [selectedHouseholdId, setSelectedHouseholdId] = useState<string>("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"email" | "select">("email");

  // Redirect if already has household
  useEffect(() => {
    if (session?.user?.householdId) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSearchHouseholds = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/households/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Household not found");
        return;
      }

      if (data.households.length === 0) {
        setError("No households found for this email");
        return;
      }

      setHouseholds(data.households);
      setStep("select");
    } catch (err) {
      setError("Failed to search households. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHousehold = async () => {
    if (!selectedHouseholdId) {
      setError("Please select a household");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/households/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          householdId: selectedHouseholdId,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to join household");
        return;
      }

      // Redirect to dashboard or age selection based on response
      if (data.redirect) {
        router.push(data.redirect);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to join household. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="animate-spin">⏳</div>
      </div>
    );
  }

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
              Task<span className="text-purple-600 dark:text-purple-400">Topia</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Join your family's kingdom
            </p>
          </div>

          {step === "email" ? (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700" />
              <form onSubmit={handleSearchHouseholds} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Enter your email to find your household
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
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
                  className="mt-4"
                >
                  Find Household
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700" />
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Select your household:
                </p>
                <div className="space-y-2 mb-4">
                  {households.map((household) => (
                    <label
                      key={household.id}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all"
                      style={{
                        borderColor: selectedHouseholdId === household.id ? "#7c3aed" : "#e5e7eb",
                        backgroundColor:
                          selectedHouseholdId === household.id
                            ? "#f3e8ff"
                            : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="household"
                        value={household.id}
                        checked={selectedHouseholdId === household.id}
                        onChange={(e) => setSelectedHouseholdId(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {household.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {household.memberCount} members
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm mb-4">
                    ⚠️ {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      setStep("email");
                      setEmail("");
                      setHouseholds([]);
                      setSelectedHouseholdId("");
                      setError("");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    fullWidth
                    loading={loading}
                    onClick={handleSelectHousehold}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
