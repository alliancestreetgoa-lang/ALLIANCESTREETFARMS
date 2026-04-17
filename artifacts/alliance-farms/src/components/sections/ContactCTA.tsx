import { motion } from "framer-motion";
import { getCmsSettings } from "@/lib/cms";

export function ContactCTA() {
  const settings = getCmsSettings();

  const phone = settings.phone || "+91 73750 96163";
  const email = settings.email || "alliancestreetorganicfarms@gmail.com";
  const whatsapp = settings.whatsappUrl || "https://wa.me/qr/ORVOCVVT3QJOJ1";

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

          <p className="text-white/90 text-lg mb-12 max-w-xl mx-auto font-normal leading-relaxed">
            Order directly from Alliance Street Organic Farms — Goa's most trusted source for organic desi chicken, eggs, goat meat, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              href={`tel:${phone.replace(/\s/g, "")}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-full font-semibold text-base shadow-xl shadow-secondary/30 hover:shadow-secondary/50 transition-shadow duration-300 whitespace-nowrap"
            >
              Call {phone}
            </motion.a>
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold text-base backdrop-blur-sm hover:bg-white/15 transition-colors duration-300 whitespace-nowrap"
            >
              {email}
            </motion.a>
            <motion.a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] rounded-full font-semibold text-base hover:bg-[#25D366]/30 transition-colors duration-300 whitespace-nowrap"
            >
              Message us on WhatsApp
            </motion.a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-10 text-white/35 text-sm">
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
