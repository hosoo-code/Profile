import SectionHeader from "./SectionHeader";

const steps = [
  {
    number: "01",
    title: "2 тал аккаунтаа тохиролцоно",
    description: "Худалдагч болон худалдан авагч хоорондоо аккаунтаа тохиролцоно.",
  },
  {
    number: "02",
    title: "Messenger-ээр надтай холбогдоно",
    description: "Хоёр тал Messenger-ээр надтай холбогдож, гэрээ баталгаажуулна.",
  },
  {
    number: "03",
    title: "2 тал төлбөрөө хийнэ",
    description: "Хоёр тал middleman-д төлбөрөө байршуулна.",
  },
  {
    number: "04",
    title: "Би аккаунтуудыг шалгана",
    description: "Аккаунтуудыг нягт шалгаж, тохиролцсон нөхцөлтэй тохирч байгааг баталгаажуулна.",
  },
  {
    number: "05",
    title: "Амжилттай солилцоо хийгдэнэ",
    description: "Бүх зүйл баталгаажсаны дараа аккаунтуудыг сольж, төлбөрийг шилжүүлнэ.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader eyebrow="Үйл явц" heading="Хэрхэн ажилладаг вэ?" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="bg-black p-6 sm:p-8 hover:bg-white/[0.03] transition-colors duration-300"
            >
              <span className="text-4xl font-bold text-white/15 tabular-nums">
                {step.number}
              </span>
              <h3 className="text-white font-semibold mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
          {/* Empty cell for 5th item to keep it centered */}
          {steps.length === 5 && (
            <div className="hidden lg:block bg-black" />
          )}
        </div>
      </div>
    </section>
  );
}
