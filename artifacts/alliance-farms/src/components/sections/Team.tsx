import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";

const TEAM = [
  {
    name: "Shaukin Phaterpekar",
    initials: "SP",
    image: "/images/team_shaukin.jpg",
    role: "Partner & Co-Founder",
    quote: "Good food begins with good farming. We're here to bring that promise to every family in Goa.",
    color: "from-[#1a3a14] to-[#2d5a27]",
  },
  {
    name: "Stallone Shaikh",
    initials: "SS",
    image: "/images/team_stallone.jpg",
    role: "Partner & Co-Founder",
    quote: "We didn't build a business. We built a farm that we'd be proud to feed our own children from.",
    color: "from-[#5c3d1e] to-[#DBA319]",
  },
];

const VIEWPORT = { once: true, margin: "-80px" };

export function Team() {
  return (
    <section id="team" className="py-28 bg-[#faf6ef] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #1a3a14 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpSoft} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary/50" />
            <span className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">Our Team</span>
            <span className="h-px w-10 bg-secondary/50" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-[#1a3a14] mb-6">
            The Hands Behind the Harvest
          </motion.h2>
          <motion.p variants={fadeUpSoft} className="text-[#5c3d1e] text-base font-light italic max-w-2xl mx-auto leading-relaxed">
            "Raised on Friendship, Built on Farming. Our mission is rooted in sustainable practices, native livestock, and full transparency. No hormones. No shortcuts. Just clean farming."
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={scalePop}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(26,58,20,0.12)" }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="bg-white border border-black/6 rounded-2xl p-10 text-center shadow-md cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 360, damping: 18 }}
                className="mx-auto mb-6 w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-secondary/20"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                    <span className="font-heading text-2xl font-bold text-white">{member.initials}</span>
                  </div>
                )}
              </motion.div>

              <h3 className="font-heading text-2xl font-bold text-[#1a3a14] mb-1">{member.name}</h3>
              <p className="text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6">{member.role}</p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: "center" }}
                className="w-10 h-px bg-secondary/40 mx-auto mb-6"
              />

              <p className="text-[#5c3d1e] italic font-light text-sm leading-relaxed">
                "{member.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
