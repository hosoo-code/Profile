import SectionHeader from "./SectionHeader";
import { TagIcon, WarningIcon } from "./icons";

export default function Fees() {
  return (
    <section id="pricing" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          icon={<TagIcon className="w-3.5 h-3.5" />}
          eyebrow="Үнэ"
          heading="Үнийн мэдээлэл"
        />

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card 1 — Switch/Replace */}
          <div className="group relative rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs uppercase tracking-wider">
                Switch / Replace
              </div>

              <h3 className="text-white font-semibold text-base leading-tight max-w-xs mx-auto">
                Аккаунт солилцоо
                <br />
                (Switch / Replace)
              </h3>

              <div>
                <div className="text-5xl font-bold text-white tracking-tight">
                  7,000₮
                </div>
                <p className="text-white/40 text-sm mt-1">/ хүн</p>
              </div>

              <p className="text-white/40 text-sm leading-relaxed">
                Хоёр талын аккаунтыг аюулгүй солилцох middleman үйлчилгээ
              </p>
            </div>
          </div>

          {/* Card 2 — Buy/Sell */}
          <div className="group relative rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs uppercase tracking-wider">
                Buy / Sell
              </div>

              <h3 className="text-white font-semibold text-base leading-tight">
                Buy / Sell Middleman
              </h3>

              <div>
                <div className="text-5xl font-bold text-white tracking-tight">
                  5,000₮
                </div>
                <p className="text-white/40 text-sm mt-1">/ deal</p>
              </div>

              <p className="text-white/40 text-sm leading-relaxed">
                Худалдан авалт / борлуулалтын үед аюулгүй middleman үйлчилгээ
              </p>
            </div>
          </div>
        </div>

        {/* Payment section */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white/60 text-sm uppercase tracking-widest mb-3">
                Төлбөр хийх
              </h3>
              <div className="inline-flex items-center gap-3 bg-white/[0.03] rounded-xl px-5 py-3 border border-white/10">
                <span className="text-white/40 text-sm">MonPay:</span>
                <span className="text-white font-mono text-lg tracking-wide select-all">
                  99106925689
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20 max-w-xs">
              <WarningIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300/80 text-sm">
                Зөвхөн энэ данс руу төлбөр хийнэ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
