import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID олдсонгүй" },
        { status: 400 }
      );
    }

    await deleteImage(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Зураг устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
