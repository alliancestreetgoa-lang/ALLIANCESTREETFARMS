import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { Breeds } from "@/components/sections/Breeds";
import { DesiEggs } from "@/components/sections/DesiEggs";
import { Goats } from "@/components/sections/Goats";
import { WhyOrganic } from "@/components/sections/WhyOrganic";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/layout/Footer";
import { loadSettings, applyMetaTags } from "@/lib/siteSettings";

export default function Home() {
  useEffect(() => {
    const apply = () => applyMetaTags(loadSettings());
    apply();
    window.addEventListener("storage", apply);
    return () => window.removeEventListener("storage", apply);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Breeds />
        <DesiEggs />
        <Goats />
        <WhyOrganic />
        <About />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
