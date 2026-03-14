import { motion } from "framer-motion";

const PRODUCTS = [
  { emoji: "🐓", name: "Desi Chicken", desc: "Free-range native breeds raised on clean feed and open grazing." },
  { emoji: "🥚", name: "Desi Eggs", desc: "Vitamin-rich country chicken eggs — hormone-free and naturally nutritious." },
  { emoji: "🐐", name: "Goat Meat", desc: "High-protein, tender meat from Osmanabadi & Konkan Kanyal breeds." },
  { emoji: "🥛", name: "Goat Milk", desc: "Chemical-free, nutrient-dense milk straight from happy, healthy goats." },
  { emoji: "🐰", name: "Rabbit Meat", desc: "Lean, low-cholesterol protein from premium rabbit breeds." },
];

export function Products() {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-2 block">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl text-foreground font-heading">
            Farm-Fresh Purity
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg shadow-black/5 border border-black/5 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group cursor-default"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                {prod.emoji}
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {prod.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {prod.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
