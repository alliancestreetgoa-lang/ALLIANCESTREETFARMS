import { motion } from "framer-motion";

const PRODUCTS = [
  {
    emoji: "🐓",
    name: "Desi Chicken",
    tag: "Native Breed",
    desc: "Free-range native breeds raised on clean feed and open grazing.",
    image: "/images/desi_chicken.jpg",
    color: "from-[#3d2b1a] to-[#1a3a14]",
  },
  {
    emoji: "🥚",
    name: "Desi Eggs",
    tag: "Vitamin-Rich",
    desc: "Country chicken eggs — hormone-free and naturally nutritious.",
    image: "/images/desi_eggs.jpg",
    color: "from-[#5c3d1e] to-[#8a6010]",
  },
  {
    emoji: "🐐",
    name: "Goat Meat",
    tag: "High Protein",
    desc: "Tender meat from Osmanabadi & Konkan Kanyal breeds.",
    image: "/images/goat_meat.jpg",
    color: "from-[#1a3a14] to-[#2d5a27]",
  },
  {
    emoji: "🥛",
    name: "Goat Milk",
    tag: "A2 Protein",
    desc: "Chemical-free, nutrient-dense milk from happy, healthy goats.",
    image: "/images/goat_milk.jpg",
    color: "from-[#2d5a27] to-[#7a9e6d]",
  },
  {
    emoji: "🐰",
    name: "Rabbit Meat",
    tag: "Low Cholesterol",
    desc: "Lean, low-cholesterol protein from premium rabbit breeds.",
    image: "/images/product_rabbit.png",
    color: "from-[#5c3d1e] to-[#3d2b1a]",
  },
];

export function Products() {
  return (
    <section id="products" className="py-28 bg-[#faf6ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">What We Offer</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-[#1a3a14]"
          >
            Farm-Fresh Purity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#5c3d1e]/70 text-lg max-w-xl mx-auto font-light"
          >
            Every product raised without antibiotics, hormones, or artificial chemicals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden cursor-default shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${prod.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-secondary/90 text-white px-2 py-1 rounded-full">
                    {prod.tag}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-2xl mb-1">{prod.emoji}</div>
                <h3 className="font-heading text-lg font-bold mb-1 drop-shadow">{prod.name}</h3>
                <p className="text-white/75 text-xs leading-relaxed">{prod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
