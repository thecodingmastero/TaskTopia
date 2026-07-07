import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { householdId, email } = await request.json();

    if (!householdId) {
      return NextResponse.json(
        { error: "Household ID is required" },
        { status: 400 }
      );
    }

    // Check if household exists
    const household = await prisma.household.findUnique({
      where: { id: householdId },
      include: {
        kids: true,
      },
    });

    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }

    // Get or create the user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      });
    }

    // Check if there's a kid profile for this email in this household
    const kidProfile = household.kids.find(
      (k) => k.loginUserId === null // Unassigned kid profile
    );

    if (kidProfile) {
      // Assign user to kid profile
      await prisma.kid.update({
        where: { id: kidProfile.id },
        data: { loginUserId: user.id },
      });

      return NextResponse.json({
        redirect: `/auth/select-role?householdId=${householdId}&kidId=${kidProfile.id}&age=${kidProfile.age || ""}`,
      });
    }

    // Check if user is already a member
    const existingMember = await prisma.householdMember.findUnique({
      where: {
        householdId_userId: {
          householdId,
          userId: user.id,
        },
      },
    });

    if (!existingMember) {
      // Add as parent by default
      await prisma.householdMember.create({
        data: {
          householdId,
          userId: user.id,
          memberRole: "PARENT",
        },
      });
    }

    return NextResponse.json({
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error("Household join error:", error);
    return NextResponse.json(
      { error: "Failed to join household" },
      { status: 500 }
    );
  }
}