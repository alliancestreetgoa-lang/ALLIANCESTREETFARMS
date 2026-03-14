import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "", delay = 0 }: { end: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        let start = 0;
        const duration = 2000;
        const stepTime = Math.max(16, Math.floor(duration / end));
        
        const timer = setInterval(() => {
          start += Math.ceil(end / 40) || 1;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, stepTime);
        return () => clearInterval(timer);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [inView, end, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function DesiEggs() {
  const benefits = [
    "Higher Omega-3 Fatty Acids",
    "Rich in Vitamin D & A",
    "More Antioxidants",
    "Higher Protein Quality",
    "Better for Gut Health",
    "No Hormones or Antibiotics",
    "Supports Immunity",
    "Better for Children",
  ];

  return (
    <section id="eggs" className="py-24 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Farm-Fresh Desi Eggs
            </span>
            <h2 className="text-4xl md:text-5xl text-foreground font-heading mb-6">
              The Power of Country Chicken Eggs
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our desi (country chicken) eggs are laid by free-range native breeds living in open spaces — making them vastly superior in nutrition to commercial cage-reared eggs.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-secondary mt-1">✦</span>
                  <span className="text-foreground font-medium">{text.split("—")[0]}</span>
                  {text.split("—")[1] && <span className="text-muted-foreground hidden sm:inline">—{text.split("—")[1]}</span>}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Real egg photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-52 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/images/eggs_section.jpg"
                alt="Fresh farm desi eggs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-5">
                <span className="text-white font-heading text-xl font-bold drop-shadow">Farm-fresh, every single day</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="p-6 sm:p-8 bg-primary/5 border-r border-black/5">
                  <h4 className="text-primary font-bold text-lg mb-4">✦ Our Desi Eggs</h4>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    <li>Deep orange yolk</li>
                    <li>Thick, strong shell</li>
                    <li>Rich natural diet</li>
                    <li>Sunlight & exercise</li>
                  </ul>
                </div>
                <div className="p-6 sm:p-8 opacity-60">
                  <h4 className="text-gray-500 font-bold text-lg mb-4">Commercial Eggs ✗</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li>Pale yellow yolk</li>
                    <li>Thin, fragile shell</li>
                    <li>Processed feed</li>
                    <li>Caged, zero sunlight</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { end: 3, suffix: "×", label: "More Omega-3", delay: 0 },
                { end: 2, suffix: "×", label: "More Vitamin E", delay: 200 },
                { end: 0, suffix: "", label: "Antibiotics", delay: 400 },
                { end: 100, suffix: "%", label: "Free Range", delay: 600 },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2">
                    <Counter end={stat.end} suffix={stat.suffix} delay={stat.delay} />
                  </div>
                  <div className="text-sm font-bold text-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
