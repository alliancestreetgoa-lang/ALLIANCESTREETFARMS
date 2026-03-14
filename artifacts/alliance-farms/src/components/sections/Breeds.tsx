import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Breed = {
  name: string;
  image: string;
  grad: string;
  desc: string;
  fullDesc: string;
  badge?: string;
  tags: string[];
  objectPosition?: string;
};

const CHICKEN_BREEDS: Breed[] = [
  {
    name: "Srinidhi",
    image: "/images/breed_srinidhi_chicken.jpg",
    grad: "from-[#7a9e6d] to-[#2d5a27]",
    desc: "A scientifically developed dual-purpose variety known for high-quality meat and nutrient-dense eggs.",
    fullDesc: "A scientifically developed dual-purpose variety known for its high-quality meat and nutrient-dense eggs. The meat is tender, rich in complete proteins, and lower in excess fat, making it ideal for active and health-conscious individuals. Eggs provide essential amino acids, vitamins, and minerals that support immunity, muscle health, and daily energy.",
    tags: ["🧬 High Protein", "❤️ Heart-Friendly", "🛡️ Immunity Support", "🥚 Nutrient-Rich Eggs"],
  },
  {
    name: "Sonali",
    image: "/images/breed_sonali_chicken.jpg",
    grad: "from-[#c8962a] to-[#8a6010]",
    desc: "Offers lean, easily digestible meat suitable for balanced diets. Eggs are rich in iron and B12.",
    fullDesc: "Sonali chicken offers lean, easily digestible meat suitable for balanced and low-fat diets. Its eggs are rich in protein, iron, and vitamin B12, supporting red blood cell formation, metabolism, and cardiovascular health. A reliable choice for families seeking affordable nutrition without compromising quality.",
    tags: ["💪 Lean Protein", "🔥 Low Fat", "❤️ Heart Health", "⚡ Energy Boosting Eggs"],
  },
  {
    name: "Kadaknath",
    image: "/images/breed_kadaknath_chicken.jpg",
    grad: "from-[#2c2c2c] to-[#1a1a1a]",
    desc: "Rare indigenous breed recognized for its distinctive black meat — rich in antioxidants.",
    fullDesc: "Kadaknath chicken is a rare indigenous breed globally recognized for its distinctive black meat. Scientifically valued for high protein, low fat, and low cholesterol, it is rich in antioxidants and bioactive compounds. Kadaknath meat supports heart health, diabetes management, and muscle recovery.",
    badge: "⭐ Premium Superfood",
    tags: ["🧬 Very High Protein", "🔥 Very Low Fat", "❤️ Low Cholesterol", "🛡️ Antioxidant-Rich"],
  },
  {
    name: "Gramapriya",
    image: "/images/breed_gramapriya_chicken.jpg",
    grad: "from-[#e8a050] to-[#c47b3a]",
    desc: "Widely preferred for superior egg quality. Rich in high-biological-value protein and calcium.",
    fullDesc: "Gramapriya chicken is widely preferred for its superior egg quality. The eggs are rich in high-biological-value protein, calcium, and essential vitamins that promote bone strength, brain function, and immunity. Meat quality is wholesome and suitable for natural, free-range consumption.",
    tags: ["🥚 High-Protein Eggs", "🦴 Bone Health", "🧠 Brain Nutrition", "🛡️ Immunity Support"],
  },
  {
    name: "Brahma",
    image: "/images/breed_brahma_chicken.png",
    grad: "from-[#6b5a3a] to-[#3d2e1a]",
    desc: "Produces flavorful, nutrient-dense meat with a robust protein profile supporting muscle development.",
    fullDesc: "Brahma chicken produces flavorful, nutrient-dense meat with a robust protein profile that supports muscle development and long-lasting energy. Eggs provide essential nutrients that complement a natural, protein-focused diet. Ideal for those seeking traditional, hearty nutrition.",
    tags: ["💪 Muscle-Building Protein", "⚡ Sustained Energy", "❤️ Balanced Nutrition"],
    objectPosition: "center 30%",
  },
  {
    name: "Frizzle Feather",
    image: "/images/breed_frizzle_chicken.png",
    grad: "from-[#a0c878] to-[#5a8040]",
    desc: "Naturally raised, protein-rich meat free from intensive farming stress.",
    fullDesc: "While primarily ornamental, Frizzle feather chickens provide meat and eggs comparable to traditional country chickens. Their naturally raised meat is protein-rich and free from intensive farming stress, making it suitable for clean, home-grown nutrition.",
    tags: ["🧬 Natural Protein", "🌿 Clean Nutrition", "🥚 Essential Nutrients"],
  },
  {
    name: "Kaveri",
    image: "/images/breed_kaveri_chicken.jpg",
    grad: "from-[#7a9e6d] to-[#3d6030]",
    desc: "Improved backyard variety offering lean meat and nutritious eggs that strengthen immunity.",
    fullDesc: "Kaveri chicken is an improved backyard variety offering lean meat and nutritious eggs. The meat supports healthy weight management, while the eggs are rich in proteins, minerals, and vitamins that strengthen immunity and bone health. Well-suited for sustainable and organic lifestyles.",
    tags: ["🔥 Lean Meat", "🛡️ Immunity Boost", "🦴 Bone Strength", "🥚 High Nutrition Eggs"],
  },
  {
    name: "Aseel Peruvudai",
    image: "/images/breed_aseel_chicken.jpg",
    grad: "from-[#8b4513] to-[#5c2d0a]",
    desc: "Powerful indigenous breed valued for firm, flavorful meat — improves strength and endurance.",
    fullDesc: "Aseel Peruvudai chicken is a powerful indigenous breed valued for its firm, flavorful meat. Traditionally consumed to improve strength, endurance, and recovery, the meat is high in protein and dense nutrition. Though egg production is limited, the eggs are considered nutrient-rich and restorative.",
    tags: ["💪 High Protein", "⚡ Strength & Endurance", "🧬 Dense Nutrition"],
  },
];

const RABBIT_BREEDS: Breed[] = [
  {
    name: "Californian",
    image: "/images/breed_californian_rabbit.png",
    grad: "from-[#8ea3a6] to-[#4e6063]",
    desc: "Lean, therapeutic-quality meat ideal for cardiovascular health.",
    fullDesc: "Lean, therapeutic-quality meat with excellent protein absorption. Ideal for heart-conscious diets and recovery nutrition. The Californian rabbit's meat is known for its fine texture and clean flavour profile.",
    tags: ["🥩 High Protein", "🫀 Low Cholesterol", "🔥 Low Fat", "💪 Muscle Support"],
  },
  {
    name: "Grey Giant",
    image: "/images/breed_grey_giant_rabbit.png",
    grad: "from-[#9a9a9a] to-[#5a5a5a]",
    desc: "High-volume nutrient-rich meat supporting physical performance.",
    fullDesc: "Produces a high volume of nutrient-rich meat packed with essential amino acids. Supports muscle development and long-term vitality. The Grey Giant is one of the most productive meat rabbit breeds.",
    tags: ["🥩 High Protein", "⚡ Energy Support", "💪 Muscle Growth", "🦴 Strength"],
  },
  {
    name: "New Zealand White",
    image: "/images/breed_nz_white_rabbit.png",
    grad: "from-[#e8e4dc] to-[#b0aca4]",
    desc: "The gold standard worldwide for premium, tender, white meat.",
    fullDesc: "Considered the gold standard of healthy rabbit meat worldwide. Extremely low in fat and calories, making it ideal for weight control and clinical diets. Its meat is white, tender and has a mild, pleasant flavour.",
    badge: "⭐ Gold Standard",
    tags: ["🥩 Premium Protein", "🔥 Very Low Fat", "🫀 Heart Health", "⚖️ Weight Management"],
  },
  {
    name: "Black Giant",
    image: "/images/breed_black_giant_rabbit.png",
    grad: "from-[#3a3a3a] to-[#111111]",
    desc: "Dense, high-yield meat with valuable minerals. Supports active lifestyles.",
    fullDesc: "Dense, high-yield meat with valuable minerals. Supports active lifestyles and sustained physical performance. The Black Giant is prized for its large frame and excellent meat-to-bone ratio.",
    tags: ["🥩 Protein-Rich", "⚡ Energy Boost", "🦴 Mineral Support", "💪 Strength"],
  },
  {
    name: "Soviet Chinchilla",
    image: "/images/breed_soviet_chinchilla_rabbit.png",
    grad: "from-[#7a8b99] to-[#3c4a56]",
    desc: "Tender, iron-rich meat known for supporting blood health and immunity.",
    fullDesc: "Tender, iron-rich meat known for supporting blood health and immunity. Suitable for balanced nutrition and recovery diets. The Soviet Chinchilla combines excellent meat quality with a calm temperament.",
    tags: ["🥩 High Protein", "🛡️ Immunity Support", "🩸 Iron-Rich", "🫀 Circulation Health"],
  },
  {
    name: "New Zealand Black",
    image: "/images/breed_nz_black_rabbit.png",
    grad: "from-[#2a2a2a] to-[#0a0a0a]",
    desc: "Lean, clean meat with excellent digestibility. Ideal for families.",
    fullDesc: "Lean, clean meat with excellent digestibility. Ideal for families, athletes, and wellness-focused consumers. Similar in production quality to the New Zealand White but with a distinctive colouring.",
    tags: ["🥩 Lean Protein", "🔥 Low Fat", "🫀 Heart-Friendly", "👨‍👩‍👧 Family Nutrition"],
  },
  {
    name: "Dutch",
    image: "/images/breed_dutch_rabbit.png",
    grad: "from-[#c2b29f] to-[#7a6a58]",
    desc: "Produces light, easily digestible meat in smaller portions.",
    fullDesc: "Produces light, easily digestible meat in smaller portions. Suitable for gentle diets and health-sensitive individuals. The Dutch rabbit is one of the oldest domestic breeds, valued for its manageable size.",
    tags: ["🥩 Light Protein", "🍽️ Easy Digestion", "🔥 Low Fat", "🌿 Clean Nutrition"],
  },
];

function BreedModal({ breed, onClose }: { breed: Breed; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-full object-cover"
              style={breed.objectPosition ? { objectPosition: breed.objectPosition } : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {breed.badge && (
              <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {breed.badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
            >
              <X size={18} />
            </button>
            <h2 className="absolute bottom-4 left-5 font-heading text-white text-2xl font-bold drop-shadow">
              {breed.name}
            </h2>
          </div>

          <div className="p-6">
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
              {breed.fullDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {breed.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Breeds() {
  const [activeTab, setActiveTab] = useState<"chicken" | "rabbit">("chicken");
  const [selected, setSelected] = useState<Breed | null>(null);

  return (
    <section id="breeds" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-2">
            Our Breeds
          </span>
          <h2 className="text-4xl text-foreground font-heading text-center mb-10">
            Heritage & Native Breeds
          </h2>

          <div className="flex bg-white rounded-full p-1.5 shadow-md shadow-black/5 border border-black/5 relative">
            {["chicken", "rabbit"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "chicken" | "rabbit")}
                className={cn(
                  "relative px-6 py-3 rounded-full text-sm font-bold transition-colors duration-300 z-10",
                  activeTab === tab ? "text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-secondary rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "chicken" ? "🐓 Chicken Breeds" : "🐰 Rabbit Breeds"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "rabbit" && (
              <div className="bg-primary/5 border border-primary/20 text-primary rounded-xl p-4 mb-8 text-center max-w-3xl mx-auto text-sm font-medium">
                Rabbit meat is a clinically recognized lean protein — valued for its low fat, low cholesterol, and high nutritional density.
              </div>
            )}

            <p className="text-center text-muted-foreground text-sm mb-6 italic">
              Click any card to learn more
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(activeTab === "chicken" ? CHICKEN_BREEDS : RABBIT_BREEDS).map((breed, i) => (
                <motion.div
                  key={breed.name}
                  initial={{ opacity: 0, y: 30, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 280, damping: 24 }}
                  onClick={() => setSelected(breed)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5 group hover:-translate-y-2 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={breed.objectPosition ? { objectPosition: breed.objectPosition } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {breed.badge && (
                      <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        {breed.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium border border-white/30">
                      Tap for details
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {breed.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {breed.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {breed.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                      {breed.tags.length > 2 && (
                        <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded-md font-medium">
                          +{breed.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      {selected && <BreedModal breed={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
