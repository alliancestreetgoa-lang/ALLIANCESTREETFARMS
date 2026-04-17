import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Tag } from "lucide-react";
import { BlogNavbar } from "@/components/BlogNavbar";
import { PageFooter } from "@/components/PageFooter";
import { getCmsProducts, getCmsSettings } from "@/lib/cms";
import { applyMetaTags } from "@/lib/siteSettings";
import { staggerContainer, fadeUp, fadeUpSoft, scalePop } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-60px" };

export default function ProductsPage() {
  const [catalog, setCatalog] = useState(getCmsProducts);

  useEffect(() => {
    const refresh = () => setCatalog(getCmsProducts());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  useEffect(() => {
    applyMetaTags({
      fullTitle: "Our Products | Alliance Street Organic Farms",
      title: "Our Products",
      description:
        "Shop farm-fresh desi chicken, country eggs and rabbit meat from Alliance Street Organic Farms, Goa. No antibiotics, no hormones — ever.",
      keywords:
        "buy desi chicken goa, fresh country eggs goa, rabbit meat goa, organic products india",
      ogTitle: "Farm-Fresh Products | Alliance Street Organic Farms",
      ogDescription:
        "Desi chicken, country eggs and rabbit meat — farmed ethically in Goa with no antibiotics or hormones.",
      ogImage: "/images/og_products.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#faf6ef] font-sans">
      <BlogNavbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#1a3a14] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #DBA319 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
        >
          <motion.span
            variants={fadeUpSoft}
            className="inline-block text-secondary font-semibold tracking-[0.2em] text-xs uppercase mb-4"
          >
            ✦ {catalog.sectionLabel}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl md:text-6xl text-white mb-5 leading-tight"
          >
            {catalog.heading}
          </motion.h1>
          <motion.p
            variants={fadeUpSoft}
            className="text-white/70 text-lg max-w-xl mx-auto font-normal leading-relaxed"
          >
            {catalog.description}
          </motion.p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer(0.09)}
          >
            {catalog.items.map((product, i) => (
              <motion.div
                key={product.slug}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.style.background = `linear-gradient(135deg, #1a3a14 0%, #2d5a27 100%)`;
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-50`}
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase bg-black/50 text-white px-2.5 py-1 rounded-full">
                    {product.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 text-sm font-bold text-white bg-secondary/90 px-3 py-1 rounded-full shadow-lg">
                    {product.price}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-heading text-[#1a3a14] text-xl mb-2 group-hover:text-secondary transition-colors duration-200">
                    {product.name}
                  </h2>
                  <p className="text-[#5c3d1e]/70 text-sm leading-relaxed mb-5 flex-1">
                    {product.desc}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    View Details
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-16 bg-[#1a3a14]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-white mb-3">
            Ready to Order?
          </h2>
          <p className="text-white/60 mb-7 font-normal">
            Contact us directly on WhatsApp for fresh daily availability and
            home delivery in Goa.
          </p>
          <a
            href={getCmsSettings().whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-white font-semibold hover:bg-[#A87A0F] transition-colors duration-300"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
