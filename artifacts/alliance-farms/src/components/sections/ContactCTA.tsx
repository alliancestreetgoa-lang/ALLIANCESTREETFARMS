import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#c8962a] to-[#8a6010] relative overflow-hidden">
      {/* Background Shimmer Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmerGold_3s_infinite_linear]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready for Real Farm-Fresh Food?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Order directly from Alliance Street Organic Farms — Goa's most trusted source for organic desi chicken, eggs, goat meat, and more.
          </p>
          
          <button 
            onClick={() => window.location.href = "mailto:hello@alliancestreetfarms.com"}
            className="px-10 py-4 bg-white text-[#5c3d1e] rounded-xl font-bold text-lg shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            📞 Contact Us to Order
          </button>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/80 italic font-medium">
            <span>📍 Goa, India</span>
            <span>🌿 100% Organic Certified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
