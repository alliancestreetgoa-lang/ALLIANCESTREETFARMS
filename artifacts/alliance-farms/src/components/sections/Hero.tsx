import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "100%", label: "Certified Organic" },
  { value: "15+", label: "Native Breeds" },
  { value: "0", label: "Antibiotics Used" },
  { value: "5", label: "Premium Products" },
];

export function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 15}s`,
    }));
    setParticles(arr);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_farm.png"
          alt="Alliance Street Organic Farm"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f08]/80 via-[#1a3a14]/70 to-[#0d2409]/90" />
        {/* Vignette edges */}
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-[#c8962a]/30"
            style={{
              left: p.left,
              animation: `particleDrift ${p.duration} linear ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content — centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 pt-24 pb-12 text-center">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-secondary/70" />
          <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">
            Goa, India — Est. 2024
          </span>
          <span className="h-px w-12 bg-secondary/70" />
        </motion.div>

        {/* Script tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-script text-3xl md:text-4xl text-secondary mb-4 drop-shadow-lg"
        >
          Welcome to Alliance Street Organic Farms
        </motion.h2>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight max-w-5xl"
        >
          Where Ethical Farming
          <br />
          <span className="text-secondary italic">Meets Excellence</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent my-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
        >
          Premium desi chicken, goat meat, farm-fresh eggs &amp; nutritious goat milk —
          raised without antibiotics, hormones, or artificial chemicals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap gap-4 mt-10 justify-center"
        >
          <a
            href="#products"
            className="group px-9 py-4 rounded-full bg-gradient-to-r from-secondary to-[#a37920] text-white font-semibold text-base shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1 transition-all duration-300 tracking-wide"
          >
            Explore Products
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#about"
            className="px-9 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-base backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 tracking-wide"
          >
            Our Story
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="flex flex-wrap gap-2 mt-8 justify-center"
        >
          {["🌿 100% Organic", "🐓 Native Breeds", "🚫 No Antibiotics", "🐐 Free Range"].map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70 text-xs font-medium backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center px-6 py-2">
              <div className="text-secondary font-heading text-3xl font-bold">{stat.value}</div>
              <div className="text-white/60 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
