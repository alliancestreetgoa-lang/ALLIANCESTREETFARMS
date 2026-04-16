import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Breeds", href: "#breeds" },
  { name: "Eggs", href: "#eggs" },
  { name: "Goats", href: "#goats" },
  { name: "Why Organic", href: "#philosophy" },
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0f1e0c]/96 backdrop-blur-xl py-3 shadow-xl shadow-black/30 border-b border-white/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" onClick={(e) => handleNavClick(e, "#")} className="flex items-center gap-3 group">
          <motion.img
            src="/logo.png"
            alt="Alliance Street Organic Farms Logo"
            className="h-11 w-auto object-contain drop-shadow-md"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
          <div className="flex flex-col items-start">
            <span className="font-heading text-base md:text-lg text-white group-hover:text-secondary transition-colors duration-300 leading-tight tracking-wide">
              Alliance Street Organic Farms
            </span>
            <span className="text-[9px] tracking-[0.3em] text-secondary/80 uppercase font-semibold">
              Goa, India
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200 group",
                  isActive ? "text-secondary" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-3 right-3 h-px bg-secondary origin-left"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <span className="absolute bottom-0 left-3 right-3 h-px bg-secondary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.05, backgroundColor: "#DBA319", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            className="ml-4 px-5 py-2 rounded-full border border-secondary text-secondary text-sm font-semibold transition-colors duration-300"
          >
            Order Now
          </motion.a>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#0a1508]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={cn(
                    "w-full text-center py-3 text-base tracking-wide transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-secondary font-semibold"
                      : "text-white/80 hover:text-secondary"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-8 py-3 rounded-full border border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Order Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
