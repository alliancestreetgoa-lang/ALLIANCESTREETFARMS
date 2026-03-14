import { motion } from "framer-motion";

const PHILOSOPHY_CARDS = [
  { icon: "🚫", title: "Zero Synthetic Inputs", desc: "No antibiotics, no growth hormones, no artificial chemicals. Every product we raise is 100% free from synthetic interventions." },
  { icon: "🌾", title: "Animal Welfare First", desc: "Our animals roam freely on open land with fresh air, clean water, and natural feed. No stress, no crowding — just ethical care." },
  { icon: "🌍", title: "Local Sustainability", desc: "We protect Goa's biodiversity and soil health by farming with nature, not against it — preserving the land for future generations." },
  { icon: "🏘️", title: "Community-First", desc: "We put quality, not quantity, at the center. Our produce serves local families who deserve clean, honest food without compromise." },
  { icon: "🧬", title: "Native Breed Preservation", desc: "By raising indigenous breeds like Kadaknath, Osmanabadi, and Konkan Kanyal, we protect genetic heritage and biodiversity." },
  { icon: "🔬", title: "Nutritional Superiority", desc: "Organic, free-range produce is scientifically proven to contain higher omega-3s, vitamins, antioxidants, and minerals." },
];

export function WhyOrganic() {
  return (
    <section id="philosophy" className="py-24 bg-gradient-to-br from-[#0d2409] via-[#1a3a14] to-[#2d5a27] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-2 block">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mb-6">
            Why We Choose Organic Farming
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light italic">
            "This isn't industrial farming. This is real farming — done right, for you, your family, and future generations."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHILOSOPHY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">
                {card.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
