import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  const adminSecret = process.env.ADMIN_SECRET;
  return Boolean(adminSecret && token && token.value === adminSecret);
}

// GET current profile image (public)
export async function GET() {
  try {
    const [row] = await db
      .select()
      .from(profile)
      .where(eq(profile.id, "main"));

    return NextResponse.json({
      imageUrl: row?.imageUrl || null,
      cloudinaryPublicId: row?.cloudinaryPublicId || null,
    });
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      { error: "Профайл авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// PUT update profile image (admin only)
export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { imageUrl, cloudinaryPublicId } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Зураг олдсонгүй" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(profile)
      .where(eq(profile.id, "main"));

    const oldPublicId = existing?.cloudinaryPublicId || null;

    if (existing) {
      await db
        .update(profile)
        .set({
          imageUrl,
          cloudinaryPublicId: cloudinaryPublicId || null,
          updatedAt: new Date(),
        })
        .where(eq(profile.id, "main"));
    } else {
      await db.insert(profile).values({
        id: "main",
        imageUrl,
        cloudinaryPublicId: cloudinaryPublicId || null,
      });
    }

    return NextResponse.json({ success: true, oldPublicId });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Профайл шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
