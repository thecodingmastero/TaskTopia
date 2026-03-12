import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Signed in as: {session.user.email}
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/login" });
          }}
        >
          <button className="rounded-xl border px-4 py-2">Sign out</button>
        </form>
      </div>

      <section className="rounded-2xl border p-4">
        <h2 className="font-medium">Welcome</h2>
        <p className="text-sm text-gray-600 mt-1">
          You’re authenticated with Google + Prisma session storage.
        </p>
      </section>
    </main>
  );
}