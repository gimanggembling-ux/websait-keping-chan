import { Linkedin, Instagram, Youtube } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useCallback } from "react";

const playCuteClick = () => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
};

const socials = [
  {
    label: "My LinkedIn 👀",
    href: "https://www.linkedin.com/in/kevinch67",
    icon: Linkedin,
    className: "bg-primary text-primary-foreground hover:opacity-90 border-glow",
  },
  {
    label: "My Insta💕🥰",
    href: "https://www.instagram.com/kepinganterakhir34?igsh=MWx3d3kxMmN2ZnRocA==",
    icon: Instagram,
    className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90",
  },
  {
    label: "MyTokTok 😍😍",
    href: "https://www.tiktok.com/@anomie4x",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
      </svg>
    ),
    className: "bg-foreground text-background hover:opacity-90",
  },
  {
    label: "My Youtube‼️🥀",
    href: "https://youtube.com/@anomie4x",
    icon: Youtube,
    className: "bg-red-600 text-white hover:opacity-90",
  },
];

const SocialSection = () => {
  const { ref, isVisible } = useScrollFadeIn();
  const handleClick = useCallback(() => playCuteClick(), []);

  return (
    <section ref={ref} className={`py-20 px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Don't Forget, <span className="text-primary">Me Okay?</span> ⛓️
        </h2>
        <p className="text-muted-foreground mb-10">
          ご主人様/ごしゅじんさま? 😶‍🌫️
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map(({ label, href, icon: Icon, className }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all ${className}`}
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
