import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { breeds as cmsBreeds } from "@/lib/cms";

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

const CHICKEN_BREEDS: Breed[] = cmsBreeds.chicken as Breed[];
const RABBIT_BREEDS: Breed[] = cmsBreeds.rabbit as Breed[];

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
