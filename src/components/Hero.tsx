import Button from "./Button";
import { MessengerIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            MLBB Account
            <br />
            <span className="text-white/60">Найдвартай Middleman</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            Хурдан • Найдвартай • Аюулгүй
          </p>
          <div className="pt-4">
            <a
              href="https://m.me/websitearhat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="text-base px-8 py-4">
                <MessengerIcon className="w-4 h-4" />
                Чат эхлүүлэх
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
