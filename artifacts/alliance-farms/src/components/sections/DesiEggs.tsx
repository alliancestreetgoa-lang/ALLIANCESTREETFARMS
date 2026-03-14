import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "", delay = 0 }: { end: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        let start = 0;
        const stepTime = Math.max(16, Math.floor(2000 / (end || 1)));
        const timer = setInterval(() => {
          start += Math.ceil(end / 40) || 1;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, stepTime);
        return () => clearInterval(timer);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [inView, end, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const BENEFITS = [
  "Higher Omega-3 Fatty Acids",
  "Rich in Vitamin D & A",
  "More Antioxidants",
  "Higher Protein Quality",
  "Better for Gut Health",
  "No Hormones or Antibiotics",
  "Supports Immunity",
  "Better for Children",
];

const STATS = [
  { end: 3, suffix: "×", label: "More Omega-3", delay: 0 },
  { end: 2, suffix: "×", label: "More Vitamin E", delay: 200 },
  { end: 0, suffix: "", label: "Antibiotics", delay: 400 },
  { end: 100, suffix: "%", label: "Free Range", delay: 600 },
];

export function DesiEggs() {
  return (
    <section id="eggs" className="py-28 bg-[#faf6ef] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #1a3a14 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-secondary/60" />
              <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Farm-Fresh Desi Eggs</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-[#1a3a14] mb-6 leading-tight">
              The Power of<br />Country Chicken Eggs
            </h2>
            <p className="text-[#5c3d1e]/70 text-base mb-10 leading-relaxed font-light">
              Our desi eggs are laid by free-range native breeds living in open spaces — vastly superior in nutrition to commercial cage-reared eggs.
            </p>

            <ul className="space-y-3">
              {BENEFITS.map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="flex items-center gap-3 text-[#1a3a14] font-medium text-sm"
                >
                  <span className="w-1 h-px bg-secondary flex-shrink-0" />
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-56 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/images/eggs_section.jpg"
                alt="Fresh farm desi eggs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-heading text-xl font-bold drop-shadow">Farm-fresh, every single day</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md border border-black/5 overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="p-6 bg-[#1a3a14]/5 border-r border-black/5">
                  <h4 className="text-[#1a3a14] font-bold text-sm mb-4 tracking-wide">✦ OUR DESI EGGS</h4>
                  <ul className="space-y-2.5 text-sm text-[#1a3a14]/80">
                    {["Deep orange yolk", "Thick, strong shell", "Rich natural diet", "Sunlight & exercise"].map((t, i) => (
                      <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary" />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 opacity-50">
                  <h4 className="text-gray-500 font-bold text-sm mb-4 tracking-wide">✗ COMMERCIAL EGGS</h4>
                  <ul className="space-y-2.5 text-sm text-gray-400">
                    {["Pale yellow yolk", "Thin, fragile shell", "Processed feed", "Caged, zero sunlight"].map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="bg-[#1a3a14] rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-heading font-bold text-secondary mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} delay={stat.delay} />
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-widest font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
