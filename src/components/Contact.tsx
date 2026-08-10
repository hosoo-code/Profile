import { MessengerIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6">
          Холбогдох
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
          Асуух зүйл байна уу?
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          Ямар нэгэн асуулт байвал Messenger-ээр холбогдоно уу.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://m.me/websitearhat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
          >
            <MessengerIcon className="w-5 h-5" />
            Messenger Chat
          </a>
          <a
            href="https://www.facebook.com/websitearhat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 active:scale-[0.97]"
          >
            Facebook Profile
          </a>
        </div>
      </div>
    </section>
  );
}
