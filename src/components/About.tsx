import Image from "next/image";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getProfileImage() {
  try {
    const [row] = await db
      .select()
      .from(profile)
      .where(eq(profile.id, "main"));
    return row?.imageUrl || null;
  } catch {
    return null;
  }
}

export default async function About() {
  const imageUrl = await getProfileImage();

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8">
          Бидний тухай
        </div>

        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full overflow-hidden ring-1 ring-white/15 bg-white/10">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Зуучлагч"
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-3xl font-semibold">
              ?
            </div>
          )}
        </div>

        <p className="text-white font-medium mb-1">Зуучлагч</p>

        <p className="text-xl sm:text-2xl text-white/70 leading-relaxed">
          Энэхүү үйлчилгээ нь Mobile Legends аккаунт солилцох (switch/replace)
          үед аюулгүй зуучлах зорилготой.
        </p>
      </div>
    </section>
  );
}
