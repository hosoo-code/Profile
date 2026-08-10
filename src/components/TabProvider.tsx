"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Tab = "group" | "account" | "middleman" | null;

interface TabContextValue {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<Tab>(null);

  const setActiveTab = (tab: Tab) => {
    setActiveTabState((prev) => (prev === tab ? null : tab));
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return ctx;
}
