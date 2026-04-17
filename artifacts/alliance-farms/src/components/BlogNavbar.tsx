import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isOnList = location === "/blog";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0f1e0c]/96 backdrop-blur-xl py-3 shadow-xl shadow-black/30 border-b border-white/5"
          : "bg-[#0f1e0c]/80 backdrop-blur-md py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.img
            src="/logo.png"
            alt="Alliance Street Organic Farms"
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
        </Link>

        <nav className="flex items-center gap-4">
          {!isOnList && (
            <Link
              href="/blog"
              className="flex items-center gap-2 text-white/70 hover:text-secondary text-sm font-medium transition-colors duration-200"
            >
              <ArrowLeft size={15} />
              All Posts
            </Link>
          )}
          <Link
            href="/"
            className="px-5 py-2 rounded-full border border-secondary text-secondary text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Back to Farm
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
