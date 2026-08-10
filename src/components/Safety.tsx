import SectionHeader from "./SectionHeader";
import { LockIcon, CheckCircleIcon, WarningIcon, FacebookIcon, MessengerIcon } from "./icons";

const safeChecks = [
  "Зөвхөн энэ Facebook profile ашиглана",
  "Group moderator хүн",
  "Олон мянган гишүүнтэй community",
  "Шууд Messenger чат ашиглана",
];

const warnings = [
  "Fake middleman-с болгоомжил",
  "Өөр хүн таныг дуурайж болно",
  "Зөвхөн доорх profile-оор холбогдоно",
];

export default function Safety() {
  return (
    <section id="safety" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          icon={<LockIcon className="w-3.5 h-3.5" />}
          eyebrow="Аюулгүй байдал"
          heading="Хэн safe middleman вэ?"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Safe checks — left column */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircleIcon className="w-4 h-4" />
              </span>
              <h3 className="text-white font-semibold">Найдвартай шинж</h3>
            </div>

            <div className="space-y-3">
              {safeChecks.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-green-500/20 hover:bg-green-500/[0.03] transition-all duration-300"
                >
                  <CheckCircleIcon className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings — right column */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <WarningIcon className="w-4 h-4" />
              </span>
              <h3 className="text-white font-semibold">Анхааруулга</h3>
            </div>

            <div className="space-y-3">
              {warnings.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-red-500/[0.03] rounded-xl p-4 border border-red-500/10"
                >
                  <WarningIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300/80 text-sm">{item}</p>
                </div>
              ))}
            </div>

            {/* Facebook profile card */}
            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <FacebookIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  websitearhat
                </p>
                <p className="text-white/40 text-xs">Facebook Profile</p>
              </div>
              <a
                href="https://www.facebook.com/websitearhat"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-blue-400 text-xs hover:underline"
              >
                Үзэх →
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <a
            href="https://m.me/websitearhat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
          >
            <MessengerIcon className="w-5 h-5" />
            Messenger чат
          </a>
        </div>
      </div>
    </section>
  );
}
