import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { BlogNavbar } from "@/components/BlogNavbar";
import { PageFooter } from "@/components/PageFooter";
import { getCmsProducts, getCmsSettings } from "@/lib/cms";
import { applyMetaTags } from "@/lib/siteSettings";
import { fadeUp, fadeUpSoft, staggerContainer } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-40px" };

export default function ProductDetail() {
  const [catalog, setCatalog] = useState(getCmsProducts);

  useEffect(() => {
    const refresh = () => setCatalog(getCmsProducts());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const { slug } = useParams<{ slug: string }>();
  const product = catalog.items.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) return;
    applyMetaTags({
      fullTitle: product.metaTitle,
      title: product.metaTitle,
      description: product.metaDescription,
      keywords: `${product.name.toLowerCase()} goa, organic ${product.name.toLowerCase()}, alliance street organic farms`,
      ogTitle: product.metaTitle,
      ogDescription: product.metaDescription,
      ogImage: product.images[0] ?? product.image,
      ogType: "product",
      twitterCard: "summary_large_image",
    });
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6ef] font-sans">
        <BlogNavbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
          <span className="text-6xl">🌿</span>
          <h1 className="font-heading text-3xl text-[#1a3a14]">
            Product not found
          </h1>
          <p className="text-[#5c3d1e]/70">
            This product doesn't exist or may have been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a3a14] text-white font-semibold hover:bg-secondary transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            All Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = catalog.items
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf6ef] font-sans">
      <BlogNavbar />

      {/* Product Hero */}
      <div className="pt-24 pb-0 bg-[#1a3a14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-end"
          >
            {/* Text */}
            <div className="py-10 md:py-16 pr-0 md:pr-10">
              <motion.span
                variants={fadeUpSoft}
                className="inline-block text-[10px] font-bold tracking-widest uppercase bg-secondary/20 text-secondary px-3 py-1 rounded-full mb-4"
              >
                {product.tag}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-heading text-4xl md:text-5xl text-white mb-4 leading-tight"
              >
                {product.name}
              </motion.h1>
              <motion.div
                variants={fadeUpSoft}
                className="flex items-center gap-3 mb-6"
              >
                <span className="text-2xl font-bold text-secondary">
                  {product.price}
                </span>
                <span className="text-white/40 text-sm">· Fresh from farm</span>
              </motion.div>
              <motion.p
                variants={fadeUpSoft}
                className="text-white/70 leading-relaxed text-base font-normal mb-8"
              >
                {product.desc}
              </motion.p>
              <motion.a
                variants={fadeUpSoft}
                href={getCmsSettings().whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-white font-semibold hover:bg-[#A87A0F] transition-colors duration-300 shadow-lg shadow-secondary/30"
              >
                <ShoppingBag size={17} />
                Order on WhatsApp
              </motion.a>
            </div>

            {/* Image */}
            <motion.div
              variants={fadeUp}
              className="relative h-72 md:h-96 rounded-t-2xl overflow-hidden self-end"
            >
              <img
                src={product.images[0] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  el.parentElement!.style.background = `linear-gradient(135deg, #2d5a27 0%, #1a3a14 100%)`;
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-40`}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.4 }}
            className="font-heading text-[#1a3a14] text-2xl mb-4"
          >
            About This Product
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="text-[#5c3d1e] text-base leading-relaxed font-normal"
          >
            {product.description}
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a3a14]/5 self-start"
        >
          <h3 className="font-heading text-[#1a3a14] text-lg mb-4">
            Why Choose This
          </h3>
          <ul className="space-y-3">
            {product.highlights.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#5c3d1e] text-sm leading-snug">
                <Check
                  size={15}
                  className="text-secondary flex-shrink-0 mt-0.5"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-[#1a3a14]/8">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-[#5c3d1e]/60 font-medium">Price</span>
              <span className="font-bold text-secondary">{product.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5c3d1e]/60 font-medium">Source</span>
              <span className="text-[#1a3a14] font-medium">{getCmsSettings().location}</span>
            </div>
          </div>

          <a
            href={getCmsSettings().whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-5 w-full py-3 text-center rounded-xl bg-[#1a3a14] text-white text-sm font-semibold hover:bg-secondary transition-colors duration-300"
          >
            Order Now
          </a>
        </motion.div>
      </div>

      {/* Farm Promise */}
      <div className="bg-[#1a3a14]/5 border-t border-[#1a3a14]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "🌿", label: "100% Organic", sub: "No synthetic inputs" },
            { icon: "🚫", label: "Zero Antibiotics", sub: "Never, ever" },
            { icon: "🐾", label: "Free-Range Raised", sub: "Open land, natural life" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-[#1a3a14] text-sm">{item.label}</p>
                <p className="text-[#5c3d1e]/60 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading text-[#1a3a14] text-2xl mb-7">
              Other Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((related) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#faf6ef] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        el.parentElement!.style.background =
                          "linear-gradient(135deg, #1a3a14, #2d5a27)";
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${related.color} opacity-50`}
                    />
                    <span className="absolute bottom-2 right-2 text-xs font-bold text-white bg-secondary/90 px-2.5 py-0.5 rounded-full">
                      {related.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-heading text-[#1a3a14] text-base mb-1 group-hover:text-secondary transition-colors duration-200">
                      {related.name}
                    </p>
                    <Link
                      href={`/products/${related.slug}`}
                      className="inline-flex items-center gap-1 text-secondary text-xs font-semibold hover:gap-2 transition-all duration-200"
                    >
                      View <ArrowLeft size={11} className="rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageFooter />
    </div>
  );
}
