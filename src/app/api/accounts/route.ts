import { NextResponse } from "next/server";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// GET all accounts (public)
export async function GET() {
  try {
    const allAccounts = await db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt));

    return NextResponse.json(allAccounts);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Аккаунтуудыг авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// POST create account (admin only - auth checked in middleware or admin page)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, rank, skins, price, imageUrl, cloudinaryPublicId } = body;

    if (!title || !rank || !skins || !price || !imageUrl) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    const [newAccount] = await db
      .insert(accounts)
      .values({
        title,
        rank,
        skins,
        price,
        imageUrl,
        cloudinaryPublicId: cloudinaryPublicId || null,
      })
      .returning();

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Аккаунт үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

// DELETE account (admin only)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID олдсонгүй" },
        { status: 400 }
      );
    }

    // Get the account first to know the cloudinary public id
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, id));

    if (!account) {
      return NextResponse.json(
        { error: "Аккаунт олдсонгүй" },
        { status: 404 }
      );
    }

    // Delete from database
    await db.delete(accounts).where(eq(accounts.id, id));

    return NextResponse.json({
      success: true,
      cloudinaryPublicId: account.cloudinaryPublicId,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Аккаунт устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
