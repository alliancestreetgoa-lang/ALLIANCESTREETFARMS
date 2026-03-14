import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Shaukin",
    initials: "S",
    role: "Partner & Co-Founder",
    quote: "Good food begins with good farming. We're here to bring that promise to every family in Goa.",
    color: "from-[#1a3a14] to-[#2d5a27]",
  },
  {
    name: "Stallone Shaikh",
    initials: "SS",
    role: "Partner & Co-Founder",
    quote: "We didn't build a business. We built a farm that we'd be proud to feed our own children from.",
    color: "from-[#5c3d1e] to-[#c8962a]",
  },
];

export function Team() {
  return (
    <section id="team" className="py-28 bg-[#faf6ef] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #1a3a14 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Team</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-[#1a3a14] mb-6"
          >
            The Hands Behind the Harvest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5c3d1e]/65 text-base font-light italic max-w-2xl mx-auto leading-relaxed"
          >
            "Raised on Friendship, Built on Farming. Our mission is rooted in sustainable practices, native livestock, and full transparency. No hormones. No shortcuts. Just clean farming."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white border border-black/6 rounded-2xl p-10 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="font-heading text-2xl font-bold text-white">{member.initials}</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#1a3a14] mb-1">{member.name}</h3>
              <p className="text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6">{member.role}</p>
              <div className="w-10 h-px bg-secondary/40 mx-auto mb-6" />
              <p className="text-[#5c3d1e]/65 italic font-light text-sm leading-relaxed">
                "{member.quote}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
