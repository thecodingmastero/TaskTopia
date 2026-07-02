import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  // Route to parent or child view based on role
  // For now, route to parent dashboard (role detection can be added later)
  redirect("/parent/dashboard");
}