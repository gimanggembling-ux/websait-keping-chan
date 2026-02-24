import kevinPhoto from "@/assets/kevin-photo.jpeg";
import bgVideo from "@/assets/bg-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-widest uppercase animate-pulse-glow">
          IT Specialist
        </div>

        {/* Avatar with cute anime-style frame */}
        <div className="relative mb-8">
        <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/60 border-glow p-1 ring-4 ring-pink-400/20 ring-offset-2 ring-offset-background">
            <img
              src={kevinPhoto}
              alt="Kevin Christian"
              className="w-full h-full rounded-full object-cover object-center scale-[0.85]"
            />
          </div>
          {/* Decorative sparkles around avatar */}
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
          <div className="absolute -bottom-1 -left-2 text-xl animate-pulse">💖</div>
          <div className="absolute top-1/2 -right-4 text-lg animate-ping">⭐</div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-glow text-primary">
          Kevin Christian
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
          Solving tech problems, building reliable systems, and keeping everything running smoothly. 
          Passionate about IT infrastructure, networking, and cybersecurity.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-primary/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
