import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find all households that have invited this email
    // For now, search by finding parent users with similar email domain or explicit invites
    const households = await prisma.household.findMany({
      include: {
        members: true,
      },
      where: {
        members: {
          some: {
            user: {
              email: {
                contains: email.split("@")[1], // Find households with users from same domain
              },
            },
          },
        },
      },
    });

    // Also check if email is associated with any kid profiles
    const kidHouseholds = await prisma.kid.findMany({
      where: {
        loginUser: {
          email,
        },
      },
      include: {
        household: true,
      },
    });

    // Combine results
    const allHouseholds = [
      ...households.map((h) => ({
        id: h.id,
        name: h.name,
        memberCount: h.members.length,
      })),
      ...kidHouseholds.map((k) => ({
        id: k.household.id,
        name: k.household.name,
        memberCount: 0, // Will be updated if needed
      })),
    ];

    // Remove duplicates
    const uniqueHouseholds = Array.from(
      new Map(allHouseholds.map((h) => [h.id, h])).values()
    );

    return NextResponse.json({
      households: uniqueHouseholds,
    });
  } catch (error) {
    console.error("Household search error:", error);
    return NextResponse.json(
      { error: "Failed to search households" },
      { status: 500 }
    );
  }
}