import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: "Admin secret тохируулаагүй байна" },
        { status: 500 }
      );
    }

    if (password !== adminSecret) {
      return NextResponse.json(
        { error: "Нууц үг буруу байна" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_token", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Нэвтрэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
