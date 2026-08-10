import { Suspense } from "react";
import AccountCard from "./AccountCard";
import { MarketplaceSkeleton } from "./Skeleton";
import SectionHeader from "./SectionHeader";
import { TagIcon } from "./icons";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { desc } from "drizzle-orm";

interface Account {
  id: string;
  title: string;
  rank: string;
  skins: string;
  price: string;
  imageUrl: string;
  createdAt: Date;
}

async function getAccounts(): Promise<Account[]> {
  try {
    return await db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt));
  } catch {
    return [];
  }
}

async function AccountList() {
  const accounts = await getAccounts();

  if (accounts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40 text-lg">Одоогоор аккаунт байхгүй байна.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}

export default function Marketplace() {
  return (
    <section id="marketplace" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          icon={<TagIcon className="w-3.5 h-3.5" />}
          eyebrow="Marketplace"
          heading="Аккаунт Marketplace"
          description="Худалдаж буй аккаунтуудыг харах. Сонирхсон аккаунтаа авах товч дээр дарж Messenger-ээр холбогдоно уу."
        />

        <Suspense fallback={<MarketplaceSkeleton />}>
          <AccountList />
        </Suspense>
      </div>
    </section>
  );
}
