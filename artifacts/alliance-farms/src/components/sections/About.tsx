import { motion } from "framer-motion";

const VALUES = [
  { icon: "🌿", label: "100% Organic Methods" },
  { icon: "🐾", label: "Animal Welfare" },
  { icon: "🌍", label: "Local Sustainability" },
  { icon: "🏘️", label: "Community First" },
];

export function About() {
  return (
    <section id="about" className="py-28 bg-[#faf6ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-secondary/60" />
              <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Story</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-[#1a3a14] mb-8 leading-tight">
              Pure. Honest.<br />Always Fresh.
            </h2>

            <div className="space-y-5 text-[#5c3d1e]/75 text-base mb-10 leading-relaxed font-light">
              <p>
                At Alliance Street Organic Farms, we are dedicated to producing premium-quality desi chicken, goat meat, farm-fresh desi eggs, and nutritious goat milk using ethical, eco-conscious farming practices in Goa.
              </p>
              <p>
                We specialize in raising native breeds carefully selected for Goa's climate — reared without antibiotics, growth hormones, or artificial chemicals. Every animal is raised on clean feed, open grazing, and natural care.
              </p>
              <p>
                Our products aren't just food — they're part of a healthier lifestyle, sourced with integrity and delivered with pride.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white border border-[#1a3a14]/10 rounded-xl p-4 shadow-sm"
                >
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-sm font-semibold text-[#1a3a14]">{v.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] group">
              <img
                src="/images/about_farm.jpg"
                alt="Alliance Street Organic Farm"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2409]/50 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-[#1a3a14] p-6 rounded-2xl shadow-xl max-w-[200px]"
            >
              <div className="text-secondary font-heading text-3xl font-bold">2020</div>
              <div className="text-white/70 text-xs tracking-widest uppercase mt-1">Est. in Goa</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-secondary p-6 rounded-2xl shadow-xl max-w-[200px]"
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
