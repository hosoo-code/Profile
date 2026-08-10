import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLBB Account Middleman | Найдвартай зуучлал",
  description:
    "Mobile Legends аккаунт солилцох (switch/replace) үед аюулгүй зуучлах үйлчилгээ. Хурдан, найдвартай, аюулгүй.",
  keywords: ["MLBB", "Mobile Legends", "аккаунт", "middleman", "зуучлал", "Mongolia"],
  openGraph: {
    title: "MLBB Account Middleman | Найдвартай зуучлал",
    description:
      "Mobile Legends аккаунт солилцох (switch/replace) үед аюулгүй зуучлах үйлчилгээ.",
    type: "website",
    locale: "mn_MN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
