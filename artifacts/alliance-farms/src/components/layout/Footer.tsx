import { getCmsSettings } from "@/lib/cms";

export function Footer() {
  const settings = getCmsSettings();

  const instagram = settings.instagramUrl;
  const facebook = settings.facebookUrl || null;
  const whatsapp = settings.whatsappUrl;
  const phone = settings.phone;
  const email = settings.email;

  const socialLinks = [
    { label: "Instagram", url: instagram },
    ...(facebook ? [{ label: "Facebook", url: facebook }] : []),
    { label: "WhatsApp", url: whatsapp },
  ];

  return (
    <footer className="bg-[#0f0a04] py-16 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl text-secondary mb-2">
          {settings.farmName}
        </h2>
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-10">
          {settings.footerTagline} · {settings.location}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: "Products",    href: "/#products"   },
            { label: "Breeds",      href: "/#breeds"     },
            { label: "Eggs",        href: "/#eggs"       },
            { label: "Rabbits",     href: "/#rabbit-breeds" },
            { label: "Why Organic", href: "/#philosophy" },
            { label: "About",       href: "/#about"      },
            { label: "Team",        href: "/#team"       },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/50 hover:text-secondary text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-8 mb-12">
          {socialLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white font-medium text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-6 text-white/60 text-sm">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hover:text-secondary transition-colors duration-200"
          >
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:text-secondary transition-colors duration-200"
          >
            {email}
          </a>
        </div>

        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} {settings.farmName}, {settings.location}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
