import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/**
 * Notes:
 * - This file includes an Email provider skeleton (requires SMTP env vars).
 * - No environment variables are required to commit this change; the Email provider
 *   will remain harmless until you set EMAIL_SERVER_* and EMAIL_FROM.
 * - When NextAuth creates a new user (first sign-in), the createUser event will
 *   create a default Household and add the user as a PARENT member. You can change
 *   this behavior later (invite-only flow, kid vs parent mapping, etc.).
 *
 * Required env vars for a full auth setup (local/dev/production):
 * - DATABASE_URL (Postgres)
 * - NEXTAUTH_SECRET
 * - NEXTAUTH_URL
 * - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
 * - For email provider (optional): EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM
 */

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    // Email provider skeleton — disabled until SMTP env vars are set
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? "",
        port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER ?? "",
          pass: process.env.EMAIL_SERVER_PASSWORD ?? "",
        },
      },
      from: process.env.EMAIL_FROM ?? "",
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },

  // Event: when NextAuth creates a user in the DB for the first time,
  // create a default Household and a HouseholdMember (PARENT) for them.
  // This is a convenience default; later we can switch to an invite (recommended).
  events: {
    async createUser({ user }) {
      try {
        if (!user?.id) return;
        await prisma.household.create({
          data: {
            name: `${user.name ?? "My"} Household`,
            createdById: user.id,
            members: {
              create: {
                userId: user.id,
                memberRole: "PARENT",
              },
            },
          },
        });
      } catch (err) {
        // don't block auth on housekeeping errors, but log for later debugging
        // (server-side logs only)
        // eslint-disable-next-line no-console
        console.error("createUser event failed:", err);
      }
    },
  },
});
