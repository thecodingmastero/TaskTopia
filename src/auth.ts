import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) return false;

        // Check if user exists in database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: {
            householdMembers: true,
            kidProfile: true,
          },
        });

        if (existingUser) {
          // User already has household assignment, allow sign in
          return true;
        }

        // New user - they need to be assigned to a household
        // This will be handled in the email verification/household selection flow
        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      try {
        // Check if user needs household setup
        if (url.includes("/auth/household-setup")) {
          return url;
        }

        // If it's a valid URL on our domain, allow it
        if (url.startsWith(baseUrl)) return url;
        return baseUrl;
      } catch (error) {
        console.error("Redirect callback error:", error);
        return baseUrl;
      }
    },

    async session({ session, user }) {
      try {
        if (session.user) {
          session.user.id = user.id;

          // Get user's role and household info
          const userWithHousehold = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
              householdMembers: {
                include: { household: true },
              },
              kidProfile: {
                include: { household: true },
              },
            },
          });

          if (userWithHousehold?.householdMembers?.length > 0) {
            session.user.role = userWithHousehold.householdMembers[0].memberRole;
            session.user.householdId = userWithHousehold.householdMembers[0].householdId;
          } else if (userWithHousehold?.kidProfile) {
            session.user.role = "KID";
            session.user.householdId = userWithHousehold.kidProfile.householdId;
            session.user.kidId = userWithHousehold.kidProfile.id;
          }
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  events: {
    async signIn({ user }) {
      try {
        // Log sign in for debugging
        console.log(`User signed in: ${user.email}`);
      } catch (error) {
        console.error("Sign in event error:", error);
      }
    },
    async error({ error }) {
      console.error("Auth error:", error);
    },
  },
});
