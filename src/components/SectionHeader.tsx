import { ReactNode } from "react";

export default function SectionHeader({
  icon,
  eyebrow,
  heading,
  description,
}: {
  icon?: ReactNode;
  eyebrow: string;
  heading: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-14 sm:mb-16">
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className="text-white/45 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
