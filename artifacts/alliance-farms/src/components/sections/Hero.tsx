import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSoft, blurClear, EASE_OUT_EXPO } from "@/lib/animations";
import { getCmsHero } from "@/lib/cms";

const STATS = [
  { value: "100%", label: "Certified Organic" },
  { value: "15+",  label: "Native Breeds" },
  { value: "0",    label: "Antibiotics Used" },
  { value: "5",    label: "Premium Products" },
];

export function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);
  const [heroData, setHeroData] = useState(() => getCmsHero());
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax: background drifts at 40% scroll speed */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 15}s`,
    }));
    setParticles(arr);

    const onStorage = () => setHeroData(getCmsHero());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="/images/hero_farm.png"
          alt="Alliance Street Organic Farm"
          className="w-full h-[115%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f08]/80 via-[#1a3a14]/70 to-[#0d2409]/90" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-[#DBA319]/30"
            style={{ left: p.left, animation: `particleDrift ${p.duration} linear ${p.delay} infinite` }}
          />
        ))}
      </div>

      {/* Main content — stagger all children */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 pt-24 pb-12 text-center"
      >
        <motion.div
          variants={staggerContainer(0.12, 0.25)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Label */}
          <motion.div variants={fadeUpSoft} className="flex items-center gap-3 mb-6">
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: "left" }}
              className="h-px w-12 bg-secondary/70 block"
            />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">
              Goa, India — Est. 2024
            </span>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: "right" }}
              className="h-px w-12 bg-secondary/70 block"
            />
          </motion.div>

          {/* Script tagline */}
          <motion.h2 variants={blurClear} className="font-script text-3xl md:text-4xl text-secondary mb-4 drop-shadow-lg">
            {heroData.tagline}
          </motion.h2>

          {/* Main headline */}
          <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight max-w-5xl">
            {heroData.headline}
            <br />
            <span className="text-secondary italic">{heroData.subheadline}</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT_EXPO }}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent my-8"
          />

          {/* Description */}
          <motion.p variants={fadeUpSoft} className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed font-normal">
            Premium desi chicken, goat meat, farm-fresh eggs &amp; nutritious goat milk —
            raised without antibiotics, hormones, or artificial chemicals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10 justify-center">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group px-9 py-4 rounded-full bg-gradient-to-r from-secondary to-[#A87A0F] text-white font-semibold text-base shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-shadow duration-300 tracking-wide"
            >
              Explore Products
              <span className="inline-block ml-2 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-9 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-base backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 tracking-wide"
            >
              Our Story
            </motion.a>
          </motion.div>

          {/* Trust badges — staggered */}
          <motion.div variants={staggerContainer(0.08, 0.1)} initial="hidden" animate="show" className="flex flex-wrap gap-2 mt-8 justify-center">
            {["🌿 100% Organic", "🐓 Native Breeds", "🚫 No Antibiotics", "🐐 Free Range"].map((badge, i) => (
              <motion.span
                key={i}
                variants={fadeUpSoft}
                className="px-3 py-1 rounded-full bg-white/8 border border-white/20 text-white/85 text-xs font-medium backdrop-blur-sm"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT_EXPO }}
        className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.08, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="text-center px-6 py-2"
            >
              <div className="text-secondary font-heading text-3xl font-bold">{stat.value}</div>
              <div className="text-white/85 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
