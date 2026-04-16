import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-80px" };

const GOAT_BREEDS = [
  {
    name: "Osmanabadi Goat",
    tag: "Premium Meat Breed",
    tagColor: "bg-secondary/15 text-secondary",
    image: "/images/osmanabadi_goat.jpg",
    desc: "A hardy, indigenous breed from Maharashtra known for its high-quality meat, adaptability, and excellent disease resistance. Highly valued for its rich, flavorful, and lean meat that is lower in fat compared to exotic breeds.",
    fullDesc: "The Osmanabadi is one of India's most prized desi goat breeds, originating from the Osmanabad district of Maharashtra. Raised entirely free-range on natural forage, these goats develop lean, deeply flavourful meat with a rich protein profile. Their natural disease resistance means zero antibiotics — exactly the clean-label quality Alliance Street Organic Farms stands for.",
    origin: "Osmanabad, Maharashtra, India",
    weight: "25–40 kg (adult)",
    products: ["Goat Meat (Mutton)", "Offal Cuts"],
    whyWeChose: "We selected the Osmanabadi for its dual advantage of superior meat quality and exceptional hardiness in our Goan climate. Its naturally lean carcass, high feed-conversion efficiency, and complete absence of dependence on synthetic supplements make it the ideal breed for clean, ethical farming.",
    traits: ["High-protein, lean meat", "Low fat, low cholesterol", "Excellent disease resistance", "Raised free-range, stress-free", "Rich, authentic desi flavor"],
    nutrition: [
      { label: "Protein", value: "27g", per: "per 100g" },
      { label: "Fat", value: "3.5g", per: "per 100g" },
      { label: "Iron", value: "3.7mg", per: "per 100g" },
      { label: "Calories", value: "143 kcal", per: "per 100g" },
    ],
    facts: [
      { label: "Breed Type", value: "Desi / Indigenous" },
      { label: "Origin", value: "Maharashtra" },
      { label: "Primary Use", value: "Meat" },
      { label: "Raising Method", value: "Free-range, Natural Forage" },
    ],
    accentColor: "#DBA319",
    accentBg: "#fdf5e4",
  },
  {
    name: "Konkan Kanyal",
    tag: "Goa's Native Breed",
    tagColor: "bg-[#2d5a27]/15 text-[#2d5a27]",
    image: "/images/konkan_kanyal_goat.jpg",
    desc: "The primary, well-adapted goat breed in Goa — perfectly suited to the coastal climate and local terrain. Produces nutritious milk and quality meat, thriving on natural grazing with minimal external inputs.",
    fullDesc: "The Konkan Kanyal is Goa's own native goat breed, perfectly evolved for the coastal humidity, laterite terrain, and native vegetation of the Konkan region. Their milk is naturally rich in A2 protein and calcium, while the meat is tender and mildly flavoured — ideal for Goan cuisine. Thriving with minimal intervention, they are a cornerstone of sustainable, biodiversity-friendly farming.",
    origin: "Konkan Coast, Goa & Maharashtra",
    weight: "20–35 kg (adult)",
    products: ["Goat Milk", "Goat Meat (Chevon)", "Artisan Dairy"],
    whyWeChose: "The Konkan Kanyal is a living piece of Goa's agricultural heritage. We raise them to preserve a breed that's under threat from commercial crossbreeding, while providing our customers with the most locally authentic, chemical-free milk and meat available in the region.",
    traits: ["Native to Goa's coastal climate", "Nutritious, chemical-free milk", "Naturally adapted — low maintenance", "Supports biodiversity conservation", "Tender, naturally flavored meat"],
    nutrition: [
      { label: "Milk Protein", value: "3.8g", per: "per 100ml" },
      { label: "Calcium", value: "130mg", per: "per 100ml" },
      { label: "Fat", value: "4.2g", per: "per 100ml" },
      { label: "A2 Protein", value: "Yes", per: "naturally" },
    ],
    facts: [
      { label: "Breed Type", value: "Native / Heritage" },
      { label: "Origin", value: "Goa, Konkan Coast" },
      { label: "Primary Use", value: "Milk & Meat" },
      { label: "Raising Method", value: "Natural Grazing, No Inputs" },
    ],
    accentColor: "#2d5a27",
    accentBg: "#eef4ec",
  },
];

const MILK_TAGS = ["🦴 Calcium-Rich", "💊 Easy to Digest", "🛡️ Immunity Building", "❤️ Heart-Healthy", "🧒 Great for Kids", "🌿 Zero Chemicals"];

type GoatBreed = typeof GOAT_BREEDS[number];

function GoatModal({ breed, onClose }: { breed: GoatBreed; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.88, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-56 flex-shrink-0 overflow-hidden">
            <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow ${breed.tagColor} bg-white`}>
              {breed.tag}
            </span>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-5 left-6 right-6">
              <h3 className="font-heading text-3xl text-white font-bold drop-shadow mb-1">{breed.name}</h3>
              <p className="text-white/70 text-xs tracking-widest uppercase">{breed.origin}</p>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-7 py-6 space-y-6">

            <p className="text-[#5c3d1e]/75 text-sm leading-relaxed">{breed.fullDesc}</p>

            <div className="grid grid-cols-2 gap-3">
              {breed.facts.map((f, i) => (
                <div key={i} className="rounded-xl p-3.5" style={{ backgroundColor: breed.accentBg }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5" style={{ color: breed.accentColor }}>{f.label}</p>
                  <p className="text-[#1a3a14] font-semibold text-sm">{f.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-heading text-base font-bold text-[#1a3a14] mb-3">Nutritional Highlights</h4>
              <div className="grid grid-cols-4 gap-2">
                {breed.nutrition.map((n, i) => (
                  <div key={i} className="text-center rounded-xl py-3 px-2 border border-black/6">
                    <p className="font-heading text-lg font-bold" style={{ color: breed.accentColor }}>{n.value}</p>
                    <p className="text-[#1a3a14] text-xs font-semibold mt-0.5">{n.label}</p>
                    <p className="text-[#5c3d1e]/50 text-[10px]">{n.per}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-base font-bold text-[#1a3a14] mb-3">Breed Traits</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {breed.traits.map((trait, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#1a3a14] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: breed.accentColor }} />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-base font-bold text-[#1a3a14] mb-2">Products We Offer</h4>
              <div className="flex flex-wrap gap-2">
                {breed.products.map((p, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ borderColor: breed.accentColor + "40", color: breed.accentColor, backgroundColor: breed.accentBg }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ backgroundColor: breed.accentBg }}>
              <h4 className="font-heading text-sm font-bold mb-2" style={{ color: breed.accentColor }}>Why We Chose This Breed</h4>
              <p className="text-[#1a3a14]/75 text-sm leading-relaxed">{breed.whyWeChose}</p>
            </div>

          </div>

          <div className="flex-shrink-0 px-7 py-4 border-t border-black/6">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: breed.accentColor }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Goats() {
  const [selected, setSelected] = useState<GoatBreed | null>(null);

  return (
    <section id="goats" className="py-28 bg-white relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(90deg, #1a3a14 1px, transparent 1px), linear-gradient(#1a3a14 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpSoft} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Goat Breeds</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-[#1a3a14]">
            Premium Goat Breeds, Born for Goa
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {GOAT_BREEDS.map((breed) => (
            <motion.div
              key={breed.name}
              variants={scalePop}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group rounded-2xl overflow-hidden border border-black/6 shadow-lg cursor-pointer"
              onClick={() => setSelected(breed)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${breed.tagColor}`}>
                    {breed.tag}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <span className="text-white font-heading text-lg font-bold">Learn More</span>
                </div>
                <h3 className="absolute bottom-4 left-5 font-heading text-2xl text-white font-bold drop-shadow">
                  {breed.name}
                </h3>
              </div>
              <div className="p-7 bg-[#faf6ef]">
                <p className="text-[#5c3d1e]/70 text-sm leading-relaxed mb-6">{breed.desc}</p>
                <ul className="space-y-2.5">
                  {breed.traits.map((trait, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium text-[#1a3a14]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: breed.accentColor }} />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="bg-[#1a3a14] rounded-3xl p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary/50 shadow-xl ring-4 ring-secondary/10">
            <img src="/images/goat_milk.jpg" alt="Fresh Goat Milk" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">The Goodness of Goat Milk</h3>
            <p className="text-white/60 mb-7 text-base leading-relaxed">
              Easier to digest than cow's milk and naturally rich in A2 protein, calcium, and essential vitamins. Sourced daily from our free-grazing, chemical-free goats.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {MILK_TAGS.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.06 }}
                  className="bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {selected && <GoatModal breed={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
