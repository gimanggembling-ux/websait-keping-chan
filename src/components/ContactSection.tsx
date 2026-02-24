import { Phone, Mail } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const ContactSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section ref={ref} className={`py-16 px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          My Contact<span className="ml-1">🧏‍♀️🗣️</span>
        </h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone / WhatsApp</p>
              <a href="https://wa.me/6282176500036" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                +62 821-7650-0036
              </a>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <a href="mailto:kepinchr@gmail.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                kepinchr@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
