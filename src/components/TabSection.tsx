"use client";

import { ReactNode } from "react";
import { useTab } from "./TabProvider";

export default function TabSection({
  tab,
  children,
}: {
  tab: "group" | "account" | "middleman";
  children: ReactNode;
}) {
  const { activeTab } = useTab();

  return (
    <div className={activeTab === tab ? "block" : "hidden"}>{children}</div>
  );
}
