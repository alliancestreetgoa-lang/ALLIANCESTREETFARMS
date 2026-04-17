import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";
import { products as cmsProducts } from "@/lib/cms";

const PRODUCTS = cmsProducts.items;

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const product = selectedProduct ? PRODUCTS.find(p => p.name === selectedProduct) : null;

  return (
    <section id="products" className="py-28 bg-[#faf6ef] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(45deg, #1a3a14 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpSoft} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">What We Offer</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-[#1a3a14]">
            Farm-Fresh Purity
          </motion.h2>
          <motion.p variants={fadeUpSoft} className="mt-4 text-[#5c3d1e] text-lg max-w-xl mx-auto font-normal">
            Every product raised without antibiotics, hormones, or artificial chemicals.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.name}
              variants={scalePop}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 24px 48px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              onClick={() => setSelectedProduct(prod.name)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md"
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
        </motion.div>
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

                <p className="text-[#5c3d1e] text-lg leading-relaxed mb-6">
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
                  className="block mt-8 w-full py-4 bg-gradient-to-r from-secondary to-[#A87A0F] text-white font-bold text-center rounded-xl transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/40"
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
