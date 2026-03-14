import { motion } from "framer-motion";

export function Goats() {
  return (
    <section id="goats" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">
            Our Goat Breeds
          </span>
          <h2 className="text-4xl md:text-5xl text-foreground font-heading">
            Premium Goat Breeds, Born for Goa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl overflow-hidden shadow-lg border border-black/5 relative group"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-secondary to-[#8a6010]" />
            <div className="p-8 sm:p-10">
              <div className="text-5xl mb-6">🐐</div>
              <span className="text-xs font-bold bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Premium Meat Breed
              </span>
              <h3 className="font-heading text-3xl font-bold text-foreground mb-4">Osmanabadi Goat</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The Osmanabadi is a hardy, indigenous breed from Maharashtra known for its high-quality meat, adaptability, and excellent disease resistance. Highly valued across western India for its rich, flavorful, and lean meat that is lower in fat compared to exotic breeds.
              </p>
              <ul className="space-y-3">
                {[
                  "High-protein, lean meat",
                  "Low fat, low cholesterol",
                  "Excellent disease resistance",
                  "Raised free-range, stress-free",
                  "Rich, authentic desi flavor"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background rounded-2xl overflow-hidden shadow-lg border border-black/5 relative group"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#a0c878] to-accent" />
            <div className="p-8 sm:p-10">
              <div className="text-5xl mb-6">🌿</div>
              <span className="text-xs font-bold bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Goa's Native Breed
              </span>
              <h3 className="font-heading text-3xl font-bold text-foreground mb-4">Konkan Kanyal</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The Konkan Kanyal is the primary, well-adapted goat breed in Goa — perfectly suited to the coastal climate and local terrain. Known for producing nutritious milk and quality meat, it thrives on natural grazing and requires minimal external inputs, making it ideal for organic farming.
              </p>
              <ul className="space-y-3">
                {[
                  "Native to Goa's coastal climate",
                  "Nutritious, chemical-free milk",
                  "Naturally adapted — low maintenance",
                  "Supports biodiversity conservation",
                  "Tender, naturally flavored meat"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Goat Milk Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-muted rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="text-8xl animate-float">🥛</div>
          <div className="flex-1">
            <h3 className="font-heading text-3xl font-bold text-primary mb-4">The Goodness of Goat Milk</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Easier to digest than cow's milk and naturally rich in A2 protein, calcium, and essential vitamins. Sourced daily from our free-grazing, chemical-free goats.
            </p>
            <div className="flex flex-wrap gap-2">
              {["🦴 Calcium-Rich", "💊 Easier to Digest", "🛡️ Immunity Building", "❤️ Heart-Healthy", "🧒 Great for Kids", "🌿 Zero Chemicals"].map((tag, i) => (
                <span key={i} className="bg-white text-primary text-sm font-bold px-4 py-2 rounded-full shadow-sm">
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
