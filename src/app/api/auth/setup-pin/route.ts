import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { pin } = await request.json();

    if (!pin || pin.length < 4) {
      return NextResponse.json(
        { error: "PIN must be at least 4 digits" },
        { status: 400 }
      );
    }

    // Hash the PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    // Update user with hashed PIN
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Add parentPin field to User model if it doesn't exist
        // For now, we'll store it in a separate table
      },
    });

    // Store PIN in a secure way (you might want to create a separate ParentPIN model)
    // For now, this is a placeholder - you should add proper PIN storage to your schema

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Setup PIN error:", error);
    return NextResponse.json(
      { error: "Failed to setup PIN" },
      { status: 500 }
    );
  }
}

export async function POST_verify(request: NextRequest) {
  try {
    const { userId, pin } = await request.json();

    if (!userId || !pin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify PIN (fetch from database and compare)
    // This is a placeholder

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("Verify PIN error:", error);
    return NextResponse.json(
      { error: "Failed to verify PIN" },
      { status: 500 }
    );
  }
}
