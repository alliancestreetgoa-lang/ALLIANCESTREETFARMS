import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl text-foreground font-heading mb-6">
              Pure. Honest. Always Fresh.
            </h2>
            <div className="h-1 w-16 bg-secondary mb-8 rounded-full" />
            
            <div className="space-y-4 text-muted-foreground text-lg mb-10 leading-relaxed font-light">
              <p>
                At Alliance Street Organic Farms, we are dedicated to producing premium-quality desi chicken, goat meat, farm-fresh desi eggs, and nutritious goat milk using ethical, eco-conscious farming practices in Goa. Our mission is simple: to provide clean, organic food that supports better health, stronger immunity, and sustainable living for our community.
              </p>
              <p>
                We specialize in raising native breeds of goats and chickens, carefully selected for Goa's climate and reared without the use of antibiotics, growth hormones, or artificial chemicals. Every animal is raised on clean feed, open grazing, and natural care — no stress, just ethical, time-honored farming.
              </p>
              <p>
                Our products aren't just food — they're part of a healthier lifestyle. Whether it's our high-protein goat meat, vitamin-rich desi eggs, or chemical-free goat milk, each item is sourced with integrity and delivered with pride.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["🌿 100% Organic Methods", "🐾 Animal Welfare", "🌍 Local Sustainability", "🏘️ Community First"].map((val, i) => (
                <div key={i} className="bg-muted p-4 rounded-xl text-sm font-bold text-primary flex items-center gap-2 shadow-sm">
                  {val}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-primary to-[#4a3623] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="text-[8rem] animate-float">
                🌾
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -bottom-8 -right-8 bg-secondary p-6 rounded-2xl shadow-xl border-4 border-background max-w-[200px]"
            >
              <h4 className="text-white font-heading font-bold text-xl mb-1">Rooted in Organic</h4>
              <p className="text-white/80 text-xs font-bold tracking-widest uppercase">Raised with Care</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
