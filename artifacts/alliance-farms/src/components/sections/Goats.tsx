import { motion } from "framer-motion";

const GOAT_BREEDS = [
  {
    name: "Osmanabadi Goat",
    tag: "Premium Meat Breed",
    tagColor: "bg-secondary/15 text-secondary",
    image: "/images/osmanabadi_goat.jpg",
    desc: "A hardy, indigenous breed from Maharashtra known for its high-quality meat, adaptability, and excellent disease resistance. Highly valued for its rich, flavorful, and lean meat that is lower in fat compared to exotic breeds.",
    traits: ["High-protein, lean meat", "Low fat, low cholesterol", "Excellent disease resistance", "Raised free-range, stress-free", "Rich, authentic desi flavor"],
    accentColor: "#c8962a",
  },
  {
    name: "Konkan Kanyal",
    tag: "Goa's Native Breed",
    tagColor: "bg-[#2d5a27]/15 text-[#2d5a27]",
    image: "/images/konkan_kanyal_goat.jpg",
    desc: "The primary, well-adapted goat breed in Goa — perfectly suited to the coastal climate and local terrain. Produces nutritious milk and quality meat, thriving on natural grazing with minimal external inputs.",
    traits: ["Native to Goa's coastal climate", "Nutritious, chemical-free milk", "Naturally adapted — low maintenance", "Supports biodiversity conservation", "Tender, naturally flavored meat"],
    accentColor: "#2d5a27",
  },
];

const MILK_TAGS = ["🦴 Calcium-Rich", "💊 Easy to Digest", "🛡️ Immunity Building", "❤️ Heart-Healthy", "🧒 Great for Kids", "🌿 Zero Chemicals"];

export function Goats() {
  return (
    <section id="goats" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Goat Breeds</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-[#1a3a14]"
          >
            Premium Goat Breeds, Born for Goa
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {GOAT_BREEDS.map((breed, i) => (
            <motion.div
              key={breed.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-2xl overflow-hidden border border-black/6 shadow-lg hover:shadow-xl transition-all duration-400"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a3a14] rounded-3xl p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="text-7xl animate-float flex-shrink-0">🥛</div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              The Goodness of Goat Milk
            </h3>
            <p className="text-white/60 mb-7 text-base leading-relaxed">
              Easier to digest than cow's milk and naturally rich in A2 protein, calcium, and essential vitamins. Sourced daily from our free-grazing, chemical-free goats.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {MILK_TAGS.map((tag, i) => (
                <span key={i} className="bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
