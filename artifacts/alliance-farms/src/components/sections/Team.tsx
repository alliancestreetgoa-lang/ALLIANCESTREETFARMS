import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TEAM = [
  { 
    name: "Shaukin", 
    role: "Partner", 
    emoji: "🧑‍🌾", 
    grad: "from-[#2d5a27] to-[#7a9e6d]", 
    delay: 0,
    quote: "Good food begins with good farming. We're here to bring that promise to every family in Goa." 
  },
  { 
    name: "Stallone Shaikh", 
    role: "Partner", 
    emoji: "👨‍🌾", 
    grad: "from-[#7a9e6d] to-[#c8962a]", 
    delay: 1.5,
    quote: "We didn't build a business. We built a farm that we'd be proud to feed our own children from." 
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-[#5c3d1e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-2 block">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mb-6">
            The Hands Behind the Harvest
          </h2>
          <p className="text-white/80 text-lg font-light italic">
            "Raised on Friendship, Built on Farming. Our mission is rooted in sustainable practices, native livestock, and full transparency. No hormones. No shortcuts. Just clean farming that respects both animals and the land."
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-16 md:gap-24">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center max-w-sm text-center"
            >
              <div 
                className={cn(
                  "w-[140px] h-[140px] rounded-full mb-6 border-4 border-secondary flex items-center justify-center bg-gradient-to-br shadow-xl shadow-black/20 animate-pulse-soft",
                  member.grad
                )}
                style={{ animationDelay: `${member.delay}s` }}
              >
                <span className="text-6xl">{member.emoji}</span>
              </div>
              <h3 className="font-heading text-3xl font-bold mb-1">{member.name}</h3>
              <p className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4">
                {member.role}
              </p>
              <p className="text-white/65 italic font-light">
                "{member.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
