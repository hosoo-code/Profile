"use client";

import Link from "next/link";
import { useTab } from "./TabProvider";

export default function Navbar() {
  const { activeTab, setActiveTab } = useTab();

  const tabButtonClass = (tab: "group" | "account" | "middleman") =>
    `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
      activeTab === tab
        ? "bg-white text-black"
        : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        <Link href="/" className="text-white font-semibold text-lg tracking-tight shrink-0">
          MLBB Shop
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("group")}
            className={tabButtonClass("group")}
          >
            Групп
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={tabButtonClass("account")}
          >
            Account
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("middleman")}
            className={tabButtonClass("middleman")}
          >
            Middleman
          </button>
        </div>
      </nav>
    </header>
  );
}
