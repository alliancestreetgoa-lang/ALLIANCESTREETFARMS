import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <section id="contact" className="py-28 bg-[#1a3a14] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "48px 48px" }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Get in Touch</span>
            <span className="h-px w-10 bg-secondary/50" />
          </div>

          <h2 className="font-heading text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
            Ready for Real<br />
            <span className="text-secondary italic">Farm-Fresh Food?</span>
          </h2>

          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Order directly from Alliance Street Organic Farms — Goa's most trusted source for organic desi chicken, eggs, goat meat, and more.
          </p>

          <motion.a
            href="mailto:hello@alliancestreetfarms.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-secondary text-white rounded-full font-semibold text-base shadow-xl shadow-secondary/30 hover:shadow-secondary/50 transition-shadow duration-300"
          >
            <span>📞</span> Contact Us to Order
          </motion.a>

          <div className="mt-14 flex flex-wrap justify-center gap-10 text-white/35 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-secondary/60" />
              Goa, India
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-secondary/60" />
              100% Organic Certified
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-secondary/60" />
              No Antibiotics. No Shortcuts.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
