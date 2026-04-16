import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSoft, slideLeft, slideRight, scalePop } from "@/lib/animations";

const VALUES = [
  { icon: "🌿", label: "100% Organic Methods" },
  { icon: "🐾", label: "Animal Welfare" },
  { icon: "🌍", label: "Local Sustainability" },
  { icon: "🏘️", label: "Community First" },
];

const VIEWPORT = { once: true, margin: "-80px" };

export function About() {
  return (
    <section id="about" className="py-28 bg-[#faf6ef] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #DBA319 10px, #DBA319 11px)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — Text */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeUpSoft} className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-secondary/60" />
              <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Story</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-[#1a3a14] mb-8 leading-tight">
              Pure. Honest.<br />Always Fresh.
            </motion.h2>

            <motion.div variants={staggerContainer(0.1)} className="space-y-5 text-[#5c3d1e] text-base mb-10 leading-relaxed font-light">
              {[
                "At Alliance Street Organic Farms, we are dedicated to producing premium-quality desi chicken, goat meat, farm-fresh desi eggs, and nutritious goat milk using ethical, eco-conscious farming practices in Goa.",
                "We specialize in raising native breeds carefully selected for Goa's climate — reared without antibiotics, growth hormones, or artificial chemicals. Every animal is raised on clean feed, open grazing, and natural care.",
                "Our products aren't just food — they're part of a healthier lifestyle, sourced with integrity and delivered with pride.",
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUpSoft}>{text}</motion.p>
              ))}
            </motion.div>

            <motion.div variants={staggerContainer(0.1)} className="grid grid-cols-2 gap-3">
              {VALUES.map((v) => (
                <motion.div
                  key={v.label}
                  variants={scalePop}
                  whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 24px rgba(26,58,20,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-3 bg-white border border-[#1a3a14]/10 rounded-xl p-4 shadow-sm cursor-default"
                >
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-sm font-semibold text-[#1a3a14]">{v.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] group">
              <img
                src="/images/about_farm.jpg"
                alt="Alliance Street Organic Farm"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2409]/50 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="absolute -bottom-6 -left-6 bg-[#1a3a14] p-6 rounded-2xl shadow-xl max-w-[200px] cursor-default"
            >
              <div className="text-secondary font-heading text-3xl font-bold">2024</div>
              <div className="text-white/70 text-xs tracking-widest uppercase mt-1">Est. in Goa</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.65, type: "spring", stiffness: 260, damping: 22 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="absolute -top-6 -right-6 bg-secondary p-6 rounded-2xl shadow-xl max-w-[200px] cursor-default"
            >
              <div className="text-white font-heading text-3xl font-bold">15+</div>
              <div className="text-white/80 text-xs tracking-widest uppercase mt-1">Native Breeds</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
