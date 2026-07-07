import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { householdId, kidId, role } = await request.json();

    if (!householdId || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["KID", "PARENT", "CAREGIVER"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // If it's a kid role with kidId, update the kid profile
    if (role === "KID" && kidId) {
      await prisma.kid.update({
        where: { id: kidId },
        data: { loginUserId: session.user.id },
      });
    } else {
      // For parent/caregiver, add as household member
      const existingMember = await prisma.householdMember.findUnique({
        where: {
          householdId_userId: {
            householdId,
            userId: session.user.id,
          },
        },
      });

      if (!existingMember) {
        await prisma.householdMember.create({
          data: {
            householdId,
            userId: session.user.id,
            memberRole: role,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assign role error:", error);
    return NextResponse.json(
      { error: "Failed to assign role" },
      { status: 500 }
    );
  }
}
