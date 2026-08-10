import SectionHeader from "./SectionHeader";
import { GlobeIcon, UsersIcon, ShieldIcon } from "./icons";

const groups = [
  {
    name: "MLBB Mongolia Official",
    members: "511,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/1MCwk7fZRE/",
  },
  {
    name: "Mobile Legends Mongolia",
    members: "302,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/1Cw8bUo5jg/",
  },
  {
    name: "MLBB Trading Mongolia",
    members: "144,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/1PKQQcEvXG/",
  },
  {
    name: "MLBB Marketplace MN",
    members: "93,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/1JQMif9if5/",
  },
  {
    name: "MLBB Community Hub",
    members: "92,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/1C5VFXZDrq/",
  },
  {
    name: "MLBB Buy & Sell MN",
    members: "31,000+",
    role: "Moderator",
    link: "https://www.facebook.com/share/g/19Fh3Qwnm6/",
  },
];

export default function Community() {
  return (
    <section id="community" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          icon={<GlobeIcon className="w-3.5 h-3.5" />}
          eyebrow="Community"
          heading="Миний Community"
          description="Би дараах том MLBB group-ууд дээр moderator хийдэг"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, i) => (
            <div
              key={i}
              className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg leading-tight tracking-tight">
                  {group.name}
                </h3>

                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-white/35" />
                  <span className="text-white font-medium tabular-nums">
                    {group.members}
                  </span>
                  <span className="text-white/30 text-sm">гишүүн</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-blue-400 text-xs font-medium">
                    {group.role}
                  </span>
                </div>

                <a
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Group үзэх →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
            <ShieldIcon className="w-5 h-5 text-white/50" />
            <span className="text-white/60 text-sm">
              Нийт <span className="text-white font-semibold">1.1 сая+</span> гишүүнтэй group-ууд
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
