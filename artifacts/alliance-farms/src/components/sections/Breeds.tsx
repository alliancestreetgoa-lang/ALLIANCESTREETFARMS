import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CHICKEN_BREEDS = [
  { name: "Srinidhi", emoji: "🐓", grad: "from-[#7a9e6d] to-[#2d5a27]", desc: "A scientifically developed dual-purpose variety known for high-quality meat and nutrient-dense eggs.", tags: ["🧬 High Protein", "❤️ Heart-Friendly", "🛡️ Immunity Support"] },
  { name: "Sonali", emoji: "🐔", grad: "from-[#c8962a] to-[#8a6010]", desc: "Offers lean, easily digestible meat suitable for balanced diets. Eggs are rich in iron and B12.", tags: ["💪 Lean Protein", "🔥 Low Fat", "⚡ Energy Eggs"] },
  { name: "Kadaknath", emoji: "🐓", grad: "from-[#2c2c2c] to-[#1a1a1a]", desc: "Rare indigenous breed recognized for its black meat. Scientifically valued for high protein and low fat.", badge: "⭐ Premium Superfood", tags: ["🧬 Very High Protein", "🔥 Very Low Fat", "❤️ Low Cholesterol"] },
  { name: "Gramapriya", emoji: "🥚", grad: "from-[#e8a050] to-[#c47b3a]", desc: "Widely preferred for superior egg quality. Rich in high-biological-value protein and calcium.", tags: ["🥚 High-Protein Eggs", "🦴 Bone Health", "🧠 Brain Nutrition"] },
  { name: "Brahma", emoji: "🐦", grad: "from-[#6b5a3a] to-[#3d2e1a]", desc: "Produces flavorful, nutrient-dense meat with a robust protein profile supporting muscle development.", tags: ["💪 Muscle-Building", "⚡ Sustained Energy"] },
  { name: "Frizzle Feather", emoji: "🌿", grad: "from-[#a0c878] to-[#5a8040]", desc: "Naturally raised meat that is protein-rich and free from intensive farming stress.", tags: ["🧬 Natural Protein", "🌿 Clean Nutrition"] },
  { name: "Kaveri", emoji: "🏡", grad: "from-[#7a9e6d] to-[#3d6030]", desc: "Improved backyard variety offering lean meat and nutritious eggs that strengthen immunity.", tags: ["🔥 Lean Meat", "🛡️ Immunity Boost"] },
  { name: "Aseel Peruvudai", emoji: "⚔️", grad: "from-[#8b4513] to-[#5c2d0a]", desc: "Powerful indigenous breed valued for firm, flavorful meat. Improves strength and endurance.", tags: ["💪 High Protein", "⚡ Strength"] },
];

const RABBIT_BREEDS = [
  { name: "Californian", emoji: "🐰", grad: "from-[#8ea3a6] to-[#4e6063]", desc: "Lean, therapeutic-quality meat ideal for cardiovascular health.", tags: ["🥩 High Protein", "🫀 Low Cholesterol", "🔥 Low Fat"] },
  { name: "Grey Giant", emoji: "🐇", grad: "from-[#9a9a9a] to-[#5a5a5a]", desc: "High-volume nutrient-rich meat supporting physical performance.", tags: ["🥩 High Protein", "⚡ Energy Support", "💪 Muscle Growth"] },
  { name: "New Zealand White", emoji: "🐇", grad: "from-[#e8e4dc] to-[#b0aca4]", desc: "The gold standard worldwide for premium, tender, white meat.", badge: "⭐ Gold Standard", tags: ["🥩 Premium Protein", "🔥 Very Low Fat", "⚖️ Weight Management"] },
  { name: "Black Giant", emoji: "🐰", grad: "from-[#3a3a3a] to-[#111111]", desc: "Dense, high-yield meat with valuable minerals. Supports active lifestyles.", tags: ["🥩 Protein-Rich", "⚡ Energy Boost", "🦴 Mineral Support"] },
  { name: "Soviet Chinchilla", emoji: "🐇", grad: "from-[#7a8b99] to-[#3c4a56]", desc: "Tender, iron-rich meat known for supporting blood health and immunity.", tags: ["🛡️ Immunity Support", "🩸 Iron-Rich", "🫀 Circulation"] },
  { name: "New Zealand Black", emoji: "🐰", grad: "from-[#2a2a2a] to-[#0a0a0a]", desc: "Lean, clean meat with excellent digestibility. Ideal for families.", tags: ["🥩 Lean Protein", "🫀 Heart-Friendly", "👨‍👩‍👧 Family Nutrition"] },
  { name: "Dutch", emoji: "🐇", grad: "from-[#c2b29f] to-[#7a6a58]", desc: "Produces light, easily digestible meat in smaller portions.", tags: ["🥩 Light Protein", "🍽️ Easy Digestion", "🌿 Clean Nutrition"] },
];

export function Breeds() {
  const [activeTab, setActiveTab] = useState<"chicken" | "rabbit">("chicken");

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

          <div className="flex bg-white rounded-full p-1.5 shadow-md shadow-black/5 border border-black/5">
            <button
              onClick={() => setActiveTab("chicken")}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-bold transition-all duration-300",
                activeTab === "chicken" ? "bg-secondary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              )}
            >
              🐓 Chicken Breeds
            </button>
            <button
              onClick={() => setActiveTab("rabbit")}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-bold transition-all duration-300",
                activeTab === "rabbit" ? "bg-secondary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              )}
            >
              🐰 Rabbit Breeds
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "rabbit" && (
              <div className="bg-primary/5 border border-primary/20 text-primary rounded-xl p-4 mb-8 text-center max-w-3xl mx-auto text-sm font-medium">
                Rabbit meat is a clinically recognized lean protein — valued for its low fat, low cholesterol, and high nutritional density.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(activeTab === "chicken" ? CHICKEN_BREEDS : RABBIT_BREEDS).map((breed, i) => (
                <motion.div
                  key={breed.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn("h-32 bg-gradient-to-br flex items-center justify-center relative", breed.grad)}>
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {breed.emoji}
                    </span>
                    {breed.badge && (
                      <span className="absolute top-3 right-3 bg-white/90 text-yellow-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        {breed.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                      {breed.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {breed.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {breed.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
