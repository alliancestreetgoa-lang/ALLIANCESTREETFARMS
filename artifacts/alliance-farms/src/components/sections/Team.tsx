import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";
import { pages } from "@/lib/cms";

const TEAM = pages.team.members;
const VIEWPORT = { once: true, margin: "-80px" };

export function Team() {
  return (
    <section id="team" className="py-28 bg-[#faf6ef] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #1a3a14 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
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
          <motion.p variants={fadeUpSoft} className="text-[#5c3d1e] text-base italic max-w-2xl mx-auto leading-relaxed">
            "Raised on Friendship, Built on Farming. Our mission is rooted in sustainable practices, native livestock, and full transparency. No hormones. No shortcuts. Just clean farming."
          </motion.p>
        </motion.div>

        {/* Cards */}
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
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_48px_rgba(26,58,20,0.14)] transition-shadow duration-500 cursor-default"
            >
              {/* Green header band */}
              <div className="relative h-28 bg-gradient-to-br from-[#1a3a14] to-[#2d5a22] overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -bottom-10 -left-4 w-24 h-24 rounded-full bg-white/5" />
                <div className="absolute top-3 right-5 w-2 h-2 rounded-full bg-secondary/60" />
                <div className="absolute top-8 right-14 w-1.5 h-1.5 rounded-full bg-secondary/40" />
                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
              </div>

              {/* Avatar — floats over the band */}
              <div className="relative flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  className="absolute -top-[84px] w-[168px] h-[168px] rounded-full overflow-hidden ring-4 ring-white shadow-xl"
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
              </div>

              {/* Body */}
              <div className="pt-[100px] pb-8 px-8 text-center">
                <h3 className="font-heading text-2xl font-bold text-[#1a3a14] mb-1">{member.name}</h3>
                <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full mb-6">
                  {member.role}
                </span>

                {/* Quote */}
                <div className="relative">
                  <span
                    className="absolute -top-4 left-0 text-6xl leading-none text-secondary/15 font-serif select-none"
                    aria-hidden
                  >"</span>
                  <p className="text-[#5c3d1e]/80 italic text-sm leading-relaxed pl-5 pr-2 text-left">
                    {member.quote}
                  </p>
                  <span
                    className="absolute -bottom-5 right-0 text-6xl leading-none text-secondary/15 font-serif select-none rotate-180 inline-block"
                    aria-hidden
                  >"</span>
                </div>

                {/* Bottom accent */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-secondary/25" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                  <span className="h-px w-8 bg-secondary/25" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
