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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0f1e0c]/96 backdrop-blur-xl py-3 shadow-xl shadow-black/30 border-b border-white/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Alliance Street Organic Farms Logo"
            className="h-11 w-auto object-contain drop-shadow-md"
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-3 right-3 h-px bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-5 py-2 rounded-full border border-secondary text-secondary text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Order Now
          </a>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a1508]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 text-base hover:text-secondary transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-8 py-3 rounded-full border border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
