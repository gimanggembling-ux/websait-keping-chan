import { useState, useRef, useCallback, useEffect } from "react";
import { Monitor, Shield, Wifi, Server, Cpu } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const highlights = [
  { icon: Monitor, label: "Hardware & Software", sound: 261.63 },
  { icon: Wifi, label: "Network Cabling", sound: 293.66 },
  { icon: Shield, label: "Network Security", sound: 329.63 },
  { icon: Server, label: "System Maintenance", sound: 349.23 },
  { icon: Cpu, label: "IT Infrastructure", sound: 392.00 },
  { icon: Monitor, label: "OS Administration", sound: 440.00 },
  { icon: Shield, label: "Data Backup", sound: 493.88 },
  { icon: Server, label: "Cloud Services", sound: 523.25 },
];

const playElectricSound = (freq: number) => {
  try {
    const ctx = new AudioContext();
    const duration = 0.4;
    // Layer 1: filtered noise for crackle
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = freq * 3;
    noiseFilter.Q.value = 2;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + duration);
    // Layer 2: subtle tone
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.03);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + 0.15);
    oscGain.gain.setValueAtTime(0.03, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(oscGain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
};

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  color: string;
}

const COLORS = ["#fff", "#ff69b4", "#a855f7", "#f0abfc", "#e879f9", "#d946ef"];

const ElectricArcs = ({ sparks }: { sparks: Spark[] }) => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]">
    {sparks.map((s) => {
      const segments = 4 + Math.floor(Math.random() * 3);
      let path = `M ${s.x} ${s.y}`;
      let cx = s.x, cy = s.y;
      for (let i = 1; i <= segments; i++) {
        const progress = i / segments;
        const jitterX = (Math.random() - 0.5) * 30;
        const jitterY = (Math.random() - 0.5) * 30;
        cx = s.x + Math.cos(s.angle) * s.length * progress + jitterX;
        cy = s.y + Math.sin(s.angle) * s.length * progress + jitterY;
        path += ` L ${cx} ${cy}`;
      }
      return (
        <path
          key={s.id}
          d={path}
          stroke={s.color}
          strokeWidth={1.5 + Math.random() * 1.5}
          fill="none"
          opacity={0.8}
          filter="url(#glow)"
        />
      );
    })}
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

const AboutSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sparkIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { ref: sectionRef, isVisible } = useScrollFadeIn();

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const startSparks = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const { x, y } = mouseRef.current;
      const newSparks: Spark[] = Array.from({ length: 6 + Math.floor(Math.random() * 5) }, () => ({
        id: sparkIdRef.current++,
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        length: 30 + Math.random() * 60,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      setSparks(newSparks);
    }, 60);
  }, []);

  const stopSparks = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSparks([]);
  }, []);

  const handleClick = useCallback((idx: number, freq: number) => {
    playElectricSound(freq);
    setActiveIdx(idx);
    startSparks();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(null);
      stopSparks();
    }, 600);
  }, [startSparks, stopSparks]);

  return (
    <>
      <ElectricArcs sparks={sparks} />
      <section ref={sectionRef} className={`py-24 px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-14 max-w-2xl mx-auto">
            I'm an IT Specialist dedicated to ensuring technology works seamlessly. From troubleshooting hardware issues to managing networks and securing systems — I handle the tech so you can focus on what matters.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Mastered <span className="text-primary">Skills</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, label, sound }, idx) => (
              <button
                key={label}
                onClick={() => handleClick(idx, sound)}
                className={`relative flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border card-hover cursor-pointer transition-all duration-200 overflow-hidden ${
                  activeIdx === idx ? "ring-2 ring-primary shadow-[0_0_20px_hsl(330,80%,60%/0.4)]" : ""
                }`}
              >
                <div className="relative z-10 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className={`w-6 h-6 text-primary transition-all ${activeIdx === idx ? "scale-125 drop-shadow-[0_0_8px_hsl(330,80%,60%)]" : ""}`} />
                </div>
                <span className="relative z-10 text-sm font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
