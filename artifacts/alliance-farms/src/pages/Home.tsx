import { Navbar } from "@/components/Navbar";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-white">
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
