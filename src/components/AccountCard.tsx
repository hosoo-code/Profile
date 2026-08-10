import Image from "next/image";
import Button from "./Button";
import { MessengerIcon } from "./icons";

interface Account {
  id: string;
  title: string;
  rank: string;
  skins: string;
  price: string;
  imageUrl: string;
}

export default function AccountCard({ account }: { account: Account }) {
  return (
    <div className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 hover:border-white/20">
      <div className="aspect-[4/3] relative overflow-hidden bg-black">
        <Image
          src={account.imageUrl}
          alt={account.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="text-white font-semibold text-lg leading-tight tracking-tight">
          {account.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <p className="text-white/60 text-sm">
            <span className="text-white/35">Ранк</span> · {account.rank}
          </p>
          <p className="text-white/60 text-sm">
            <span className="text-white/35">Скин</span> · {account.skins}
          </p>
        </div>
        <p className="text-white font-bold text-2xl tracking-tight">{account.price}</p>
        <div className="pt-1">
          <a
            href="https://m.me/websitearhat"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button variant="primary" className="w-full">
              <MessengerIcon className="w-4 h-4" />
              Авах
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
