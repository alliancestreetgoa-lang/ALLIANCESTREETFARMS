import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-60px" };

const CARDS = [
  {
    num: "01",
    title: "Zero Synthetic Inputs",
    desc: "No antibiotics, no growth hormones, no artificial chemicals. Every product we raise is 100% free from synthetic interventions.",
    image: "/images/about_farm.jpg",
    detail: "At Alliance Street Organic Farms, we have made an unwavering commitment to keep every living thing on our land completely free from synthetic inputs. This means:\n\n• Zero antibiotics — ever. Our animals build immunity naturally through open pastures and stress-free living.\n• No growth hormones or steroids that accelerate unnatural development.\n• No artificial feeds, preservatives, or coloring in any of our products.\n• Our soil is nourished only through composting, natural mulching, and crop rotation.\n\nWhat you eat is exactly what nature intended — nothing more, nothing less.",
  },
  {
    num: "02",
    title: "Animal Welfare First",
    desc: "Our animals roam freely on open land with fresh air, clean water, and natural feed. No stress, no crowding — just ethical care.",
    image: "/images/desi_chicken.jpg",
    detail: "We believe the quality of what you eat is a direct reflection of how it was raised. Stressed animals produce inferior, less nutritious food — and that's simply not acceptable to us.\n\n• All chickens are free-range across over 2 acres of open land.\n• Goats graze on natural Goan vegetation, not manufactured pellets.\n• No cages, no cramped enclosures, no unnecessary handling.\n• Animals are given space, shade, and community — just as nature intended.\n• Our rabbits are raised in colony-style setups, not isolated wire cages.\n\nHappy, healthy animals produce nutritionally superior food. That is the foundation of everything we do.",
  },
  {
    num: "03",
    title: "Local Sustainability",
    desc: "We protect Goa's biodiversity and soil health by farming with nature, not against it — preserving the land for future generations.",
    image: "/images/farm_scene_about.jpg",
    detail: "Goa's unique coastal ecosystem is irreplaceable — and deeply vulnerable. Conventional farming erodes its rich, laterite-rich soils, depletes water tables, and pushes native species toward extinction.\n\n• We use zero chemical pesticides or synthetic fertilizers that contaminate soil and groundwater.\n• All organic waste from the farm is composted and returned to enrich the land.\n• Native trees and shrubs are planted to maintain habitat for local birds and insects.\n• Water is harvested through traditional khazan methods to reduce dependency on borewells.\n• Our farming practices actively improve soil health season after season.\n\nFarming here isn't just a livelihood — it's a responsibility to this land.",
  },
  {
    num: "04",
    title: "Community-First",
    desc: "Quality, not quantity, is at the center. Our produce serves local families who deserve clean, honest food without compromise.",
    image: "/images/desi_eggs.jpg",
    detail: "Alliance Street Organic Farms was built for one purpose — to give local Goan families access to honest, clean food that you simply cannot find in a supermarket.\n\n• We sell directly to families, cutting out middlemen and keeping prices fair.\n• All produce is fresh — harvested or processed within 24–48 hours of delivery.\n• We never sacrifice quality for volume. Our herd and flock sizes are deliberately small.\n• Local employment — everyone who works here is from the surrounding villages.\n• We share farming knowledge openly with neighboring farmers who want to transition to organic.\n\nFood is community. When the community thrives, the farm thrives.",
  },
  {
    num: "05",
    title: "Native Breed Preservation",
    desc: "By raising indigenous breeds like Kadaknath, Osmanabadi, and Konkan Kanyal, we protect genetic heritage and biodiversity.",
    image: "/images/breed_kadaknath_chicken.jpg",
    detail: "India's indigenous livestock breeds are among the world's most genetically resilient and nutritionally superior animals — yet many face extinction because industrial farming favors foreign hybrid breeds optimized purely for volume.\n\n• Kadaknath chicken: native to Madhya Pradesh, its black meat contains 25% more protein and double the iron of commercial breeds.\n• Osmanabadi goat: Marathwada-origin breed perfectly adapted to the Deccan climate, producing exceptionally lean, flavorful meat.\n• Konkan Kanyal goat: native to coastal Maharashtra and Goa — critically rare and uniquely suited to our terrain.\n• Aseel and Gramapriya chickens: ancient desi breeds with disease resistance built over centuries of natural selection.\n\nBy raising these breeds, we protect India's agricultural heritage for generations ahead.",
  },
  {
    num: "06",
    title: "Nutritional Superiority",
    desc: "Organic, free-range produce is scientifically proven to contain higher omega-3s, vitamins, antioxidants, and minerals.",
    image: "/images/goat_milk.jpg",
    detail: "The nutritional gap between organic free-range produce and commercially farmed alternatives is not subtle — it's dramatic and scientifically documented.\n\n• Free-range eggs contain up to 6x more Vitamin D, 2x more omega-3 fatty acids, and significantly less saturated fat than caged eggs.\n• Grass-fed goat milk has 3–5x more CLA (conjugated linoleic acid), a cancer-fighting fatty acid, versus grain-fed alternatives.\n• Desi chicken meat contains more iron, zinc, and B-vitamins than commercial broiler varieties.\n• Organic meats have 47% more omega-3s and higher antioxidant levels across all tested products.\n• No synthetic hormones means your body processes these foods exactly as nature designed.\n\nYou are not just buying food. You are buying health.",
  },
];

export function WhyOrganic() {
  const [selected, setSelected] = useState<number | null>(null);
  const card = selected !== null ? CARDS[selected] : null;

  return (
    <section id="philosophy" className="py-28 bg-[#1a3a14] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUpSoft} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary/60" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Philosophy</span>
            <span className="h-px w-10 bg-secondary/60" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading mb-6">
            Why We Choose Organic Farming
          </motion.h2>
          <motion.p variants={fadeUpSoft} className="text-white/90 text-lg font-normal italic leading-relaxed">
            "This isn't industrial farming. This is real farming — done right, for you, your family, and future generations."
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              variants={scalePop}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              onClick={() => setSelected(i)}
              className="group cursor-pointer border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/50 transition-[border-color] duration-300 relative"
              style={{ minHeight: 280 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2409]/95 via-[#1a3a14]/70 to-[#1a3a14]/30" />
              <div className="absolute inset-0 bg-[#1a3a14]/20 group-hover:bg-transparent transition-colors duration-400" />

              <div className="relative z-10 p-8 flex flex-col h-full justify-between" style={{ minHeight: 280 }}>
                <div>
                  <div className="text-secondary/90 text-xs font-bold tracking-[0.3em] uppercase mb-4">
                    {card.num}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-secondary/80 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Read More</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected !== null && card && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#122b0e] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122b0e] via-[#122b0e]/30 to-transparent" />
                <div className="absolute bottom-4 left-8">
                  <span className="text-secondary/80 text-xs font-bold tracking-[0.3em] uppercase">{card.num}</span>
                  <h3 className="font-heading text-2xl font-bold text-white mt-1">{card.title}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-8">
                <div className="space-y-3">
                  {card.detail.split("\n\n").map((para, idx) => (
                    <p key={idx} className={para.startsWith("•") ? "hidden" : para.includes("•") ? "hidden" : "text-white/90 text-sm leading-relaxed"}>
                      {para}
                    </p>
                  ))}
                  <ul className="space-y-2 mt-1">
                    {card.detail.split("\n").filter(l => l.startsWith("•")).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/90 leading-relaxed">
                        <span className="text-secondary mt-0.5 flex-shrink-0">✦</span>
                        <span>{point.replace("• ", "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex gap-3">
                  <a
                    href="#contact"
                    onClick={() => setSelected(null)}
                    className="flex-1 bg-secondary text-[#1a3a14] text-sm font-bold py-3 px-6 rounded-full text-center hover:bg-secondary/90 transition-colors"
                  >
                    Talk to Us
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
