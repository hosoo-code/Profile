import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Зураг олдсонгүй" }, { status: 400 });
    }

    const result = await uploadImage(file);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Зураг upload хийхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
