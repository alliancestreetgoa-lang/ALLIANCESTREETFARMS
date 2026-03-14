import { motion } from "framer-motion";

const CARDS = [
  { num: "01", title: "Zero Synthetic Inputs", desc: "No antibiotics, no growth hormones, no artificial chemicals. Every product we raise is 100% free from synthetic interventions." },
  { num: "02", title: "Animal Welfare First", desc: "Our animals roam freely on open land with fresh air, clean water, and natural feed. No stress, no crowding — just ethical care." },
  { num: "03", title: "Local Sustainability", desc: "We protect Goa's biodiversity and soil health by farming with nature, not against it — preserving the land for future generations." },
  { num: "04", title: "Community-First", desc: "Quality, not quantity, is at the center. Our produce serves local families who deserve clean, honest food without compromise." },
  { num: "05", title: "Native Breed Preservation", desc: "By raising indigenous breeds like Kadaknath, Osmanabadi, and Konkan Kanyal, we protect genetic heritage and biodiversity." },
  { num: "06", title: "Nutritional Superiority", desc: "Organic, free-range produce is scientifically proven to contain higher omega-3s, vitamins, antioxidants, and minerals." },
];

export function WhyOrganic() {
  return (
    <section id="philosophy" className="py-28 bg-[#1a3a14] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-secondary/60" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Philosophy</span>
            <span className="h-px w-10 bg-secondary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading mb-6"
          >
            Why We Choose Organic Farming
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg font-light italic leading-relaxed"
          >
            "This isn't industrial farming. This is real farming — done right, for you, your family, and future generations."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group border border-white/8 rounded-2xl p-8 hover:border-secondary/40 hover:bg-white/5 transition-all duration-300"
            >
              <div className="text-secondary/80 text-xs font-bold tracking-[0.3em] uppercase mb-4">
                {card.num}
              </div>
              <h3 className="font-heading text-lg font-bold mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
