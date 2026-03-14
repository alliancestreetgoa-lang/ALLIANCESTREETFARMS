export function Footer() {
  return (
    <footer className="bg-[#0f0a04] py-16 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl text-secondary mb-2">
          Alliance Street Organic Farms
        </h2>
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-10">
          Pure · Honest · Always Fresh · Goa
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {["Animals", "Eggs", "Goats", "Rabbits", "Why Organic", "About", "Team"].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-white/50 hover:text-secondary text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-8 mb-12">
          {["Instagram", "Facebook", "WhatsApp"].map((social) => (
            <a 
              key={social} 
              href="#" 
              className="text-white/70 hover:text-white font-medium text-sm transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-6 text-white/40 text-sm">
          <a href="tel:+917375096163" className="hover:text-secondary transition-colors duration-200">
            📞 +91 73750 96163
          </a>
          <a href="mailto:alliancestreetorganicfarms@gmail.com" className="hover:text-secondary transition-colors duration-200">
            ✉ alliancestreetorganicfarms@gmail.com
          </a>
        </div>

        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Alliance Street Organic Farms, Goa, India. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
