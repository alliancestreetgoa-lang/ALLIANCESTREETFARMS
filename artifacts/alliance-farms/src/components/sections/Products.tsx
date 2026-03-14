import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PRODUCTS = [
  {
    name: "Desi Chicken",
    tag: "Native Breed",
    desc: "Free-range native breeds raised on clean feed and open grazing.",
    image: "/images/desi_chicken.jpg",
    color: "from-[#3d2b1a] to-[#1a3a14]",
    fullDesc: "Our desi chickens are raised in free-range conditions on natural feed, without antibiotics or hormones. Native breeds like Kadaknath, Srinidhi, and Sonali are selected for their superior meat quality and nutritional content. The result is flavorful, protein-rich meat that's perfect for health-conscious families.",
  },
  {
    name: "Desi Eggs",
    tag: "Vitamin-Rich",
    desc: "Country chicken eggs — hormone-free and naturally nutritious.",
    image: "/images/desi_eggs.jpg",
    color: "from-[#5c3d1e] to-[#8a6010]",
    fullDesc: "Our desi eggs come from free-range country chickens living in natural conditions. These eggs are 3x richer in omega-3 fatty acids and have significantly higher vitamin E compared to commercial eggs. The deep orange yolks indicate superior nutritional density and clean, natural feeding practices.",
  },
  {
    name: "Goat Meat",
    tag: "High Protein",
    desc: "Tender meat from Osmanabadi & Konkan Kanyal breeds.",
    image: "/images/goat_meat.jpg",
    color: "from-[#1a3a14] to-[#2d5a27]",
    fullDesc: "Premium goat meat from indigenous Indian breeds — Osmanabadi and Konkan Kanyal. These breeds are naturally adapted to Goa's climate and produce tender, lean meat with exceptional flavor. Low in fat and cholesterol, it's ideal for health-conscious diets while maintaining authentic taste.",
  },
  {
    name: "Goat Milk",
    tag: "A2 Protein",
    desc: "Chemical-free, nutrient-dense milk from happy, healthy goats.",
    image: "/images/goat_milk.jpg",
    color: "from-[#2d5a27] to-[#7a9e6d]",
    fullDesc: "Our goat milk is naturally rich in A2 protein, making it easier to digest than cow's milk. Sourced daily from free-grazing goats raised without chemicals, it's packed with calcium, vitamins, and essential nutrients. Perfect for families seeking alternatives to conventional dairy.",
  },
  {
    name: "Rabbit Meat",
    tag: "Low Cholesterol",
    desc: "Lean, low-cholesterol protein from premium rabbit breeds.",
    image: "/images/product_rabbit.png",
    color: "from-[#5c3d1e] to-[#3d2b1a]",
    fullDesc: "Rabbit meat is among the leanest meats available, with minimal cholesterol and maximum protein efficiency. Our premium rabbit breeds (Californian, New Zealand White, and Grey Giant) produce fine-textured, delicate meat ideal for gourmet cooking and therapeutic diets.",
  },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const product = selectedProduct ? PRODUCTS.find(p => p.name === selectedProduct) : null;

  return (
    <section id="products" className="py-28 bg-[#faf6ef] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(45deg, #1a3a14 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              onClick={() => setSelectedProduct(prod.name)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${prod.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-secondary/90 text-white px-3 py-1 rounded-full">
                    Click for Details
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-black/50 text-white px-2 py-1 rounded-full">
                    {prod.tag}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-heading text-lg font-bold mb-1 drop-shadow">{prod.name}</h3>
                <p className="text-white/75 text-xs leading-relaxed">{prod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {product && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full p-2 transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-heading text-4xl font-bold text-[#1a3a14] mb-2">
                      {product.name}
                    </h2>
                    <span className="text-xs font-bold tracking-widest uppercase bg-secondary/15 text-secondary px-3 py-1 rounded-full inline-block">
                      {product.tag}
                    </span>
                  </div>
                </div>

                <p className="text-[#5c3d1e]/70 text-lg leading-relaxed mb-6">
                  {product.fullDesc}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#faf6ef] rounded-xl p-4 border border-[#1a3a14]/10">
                    <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Quality</div>
                    <p className="text-[#1a3a14] text-sm">100% Organic & Natural</p>
                  </div>
                  <div className="bg-[#faf6ef] rounded-xl p-4 border border-[#1a3a14]/10">
                    <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Source</div>
                    <p className="text-[#1a3a14] text-sm">Goa, India — Direct from Farm</p>
                  </div>
                </div>

                <motion.a
                  href="#contact"
                  onClick={() => setSelectedProduct(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block mt-8 w-full py-4 bg-gradient-to-r from-secondary to-[#a37920] text-white font-bold text-center rounded-xl transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/40"
                >
                  Order {product.name}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
