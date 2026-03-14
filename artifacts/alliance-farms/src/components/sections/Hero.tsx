import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const arr = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 15}s`,
    }));
    setParticles(arr);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Real farm background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_farm.png"
          alt="Alliance Street Organic Farm"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2409]/88 via-[#1a3a14]/80 to-[#2d5a27]/75" />
      </div>
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-white/20 blur-[1px]"
            style={{
              left: p.left,
              animation: `particleDrift ${p.duration} linear ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 text-white space-y-6 pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-script text-3xl md:text-5xl text-secondary mb-4 drop-shadow-md">
              Welcome to Alliance Street Organic Farms
            </h2>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight text-shadow-md">
              Where Ethical Farming Meets <br />
              <span className="text-secondary italic">Nutritional Excellence</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed"
          >
            Premium desi chicken, goat meat, farm-fresh eggs & nutritious goat milk — 
            raised without antibiotics, hormones, or artificial chemicals in the heart of Goa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 py-4"
          >
            {["🌿 100% Organic", "🐓 Native Breeds", "🚫 No Antibiotics", "🐐 Free Range", "📍 Goa, India"].map((badge, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm shadow-sm"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#products"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-[#a37920] text-white font-bold shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Products
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/50 text-white font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Animated Farm Scene */}
        <motion.div
          style={{ y: yParallax }}
          className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c3a4f] to-[#e8a050] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/50">
            <svg viewBox="0 0 480 480" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Sun */}
              <circle cx="380" cy="100" r="40" fill="#facc15" className="animate-pulse-soft" />
              <circle cx="380" cy="100" r="60" fill="#facc15" opacity="0.2" className="animate-pulse-soft" style={{ animationDelay: "0.5s" }} />

              {/* Clouds */}
              <text x="0" y="120" fontSize="50" className="animate-cloud opacity-80">☁️</text>
              <text x="-150" y="80" fontSize="40" className="animate-cloud-slow opacity-60">☁️</text>

              {/* Stars / Twinkles */}
              <circle cx="80" cy="60" r="2" fill="white" className="animate-twinkle" />
              <circle cx="200" cy="40" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: "1s" }} />
              <circle cx="300" cy="120" r="2" fill="white" className="animate-twinkle" style={{ animationDelay: "0.5s" }} />

              {/* Hills */}
              <path d="M-50 300 Q 100 200 250 300 T 550 300 L 550 500 L -50 500 Z" fill="#2d5a27" />
              <path d="M150 350 Q 300 250 550 350 L 550 500 L 150 500 Z" fill="#1a3a14" opacity="0.8" />

              {/* Animals via text/emojis for performance and style as requested */}
              <g transform="translate(120, 260)">
                <text fontSize="60" className="animate-peck origin-center">🐓</text>
              </g>

              <g transform="translate(260, 220)">
                <text fontSize="70">🐐</text>
              </g>

              <g transform="translate(50, 310)">
                <text fontSize="40">🐰</text>
              </g>

              <g transform="translate(190, 330)">
                <text fontSize="25" className="animate-hop">🐥</text>
              </g>

              {/* Butterflies */}
              <text x="0" y="0" fontSize="20" className="animate-butterfly">🦋</text>
              <text x="0" y="0" fontSize="15" className="animate-butterfly" style={{ animationDelay: "6s", animationDuration: "15s" }}>🦋</text>

              {/* Grass details */}
              <text x="100" y="400" fontSize="24" className="animate-grass">🌾</text>
              <text x="250" y="420" fontSize="30" className="animate-grass" style={{ animationDelay: "0.5s" }}>🌾</text>
              <text x="380" y="380" fontSize="20" className="animate-grass" style={{ animationDelay: "1s" }}>🌾</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
