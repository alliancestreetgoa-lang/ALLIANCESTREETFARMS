import { motion } from "framer-motion";

const PRODUCTS = [
  {
    emoji: "🐓",
    name: "Desi Chicken",
    desc: "Free-range native breeds raised on clean feed and open grazing.",
    image: "/images/desi_chicken.jpg",
  },
  {
    emoji: "🥚",
    name: "Desi Eggs",
    desc: "Vitamin-rich country chicken eggs — hormone-free and naturally nutritious.",
    image: "/images/desi_eggs.jpg",
  },
  {
    emoji: "🐐",
    name: "Goat Meat",
    desc: "High-protein, tender meat from Osmanabadi & Konkan Kanyal breeds.",
    image: "/images/goat_meat.jpg",
  },
  {
    emoji: "🥛",
    name: "Goat Milk",
    desc: "Chemical-free, nutrient-dense milk straight from happy, healthy goats.",
    image: "/images/goat_milk.jpg",
  },
  {
    emoji: "🐰",
    name: "Rabbit Meat",
    desc: "Lean, low-cholesterol protein from premium rabbit breeds.",
    image: "/images/product_rabbit.png",
  },
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
              className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-black/5 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group cursor-default"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-3xl drop-shadow-lg">
                  {prod.emoji}
                </span>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {prod.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prod.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
