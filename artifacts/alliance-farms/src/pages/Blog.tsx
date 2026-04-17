import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { BlogNavbar } from "@/components/BlogNavbar";
import { blog } from "@/lib/cms";
import { applyMetaTags } from "@/lib/siteSettings";
import { staggerContainer, fadeUp, fadeUpSoft } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-60px" };

const CATEGORY_COLORS: Record<string, string> = {
  Nutrition: "bg-emerald-100 text-emerald-800",
  Breeds: "bg-amber-100 text-amber-800",
  "Goat Milk": "bg-sky-100 text-sky-800",
  Farming: "bg-purple-100 text-purple-800",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  useEffect(() => {
    applyMetaTags({
      fullTitle: "From the Farm — Blog | Alliance Street Organic Farms",
      title: "From the Farm — Blog",
      description:
        "Stories, insights and honest knowledge from Alliance Street Organic Farms in Goa — covering desi eggs, native breeds, goat milk and organic farming.",
      keywords:
        "organic farming blog goa, desi eggs blog, kadaknath chicken, goat milk benefits, alliance street organic farms blog",
      ogTitle: "From the Farm — Blog | Alliance Street Organic Farms",
      ogDescription:
        "Honest stories and farm knowledge from our fields in Goa — nutrition, native breeds, and why organic farming matters.",
      ogImage: "/images/og_default.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
    });
  }, []);

  const posts = blog.posts;

  return (
    <div className="min-h-screen bg-[#faf6ef] font-sans">
      <BlogNavbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#1a3a14] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #DBA319 0%, transparent 60%)" }}
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
            ✦ {blog.heading}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl md:text-6xl text-white mb-5 leading-tight"
          >
            {blog.heading}
          </motion.h1>
          <motion.p
            variants={fadeUpSoft}
            className="text-white/70 text-lg max-w-xl mx-auto font-normal leading-relaxed"
          >
            {blog.subheading}
          </motion.p>
        </motion.div>
      </section>

      {/* Post Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24 text-[#5c3d1e]/50 text-lg">
              No posts yet — check back soon.
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={staggerContainer(0.1)}
            >
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col"
                >
                  {/* Featured Image */}
                  <div className="relative overflow-hidden h-52 bg-[#1a3a14]/10">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        el.parentElement!.style.background = "linear-gradient(135deg, #1a3a14 0%, #2d5a27 100%)";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${
                        CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-[#5c3d1e]/60 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading text-[#1a3a14] text-xl leading-snug mb-3 group-hover:text-secondary transition-colors duration-200">
                      {post.title}
                    </h2>

                    <p className="text-[#5c3d1e]/75 text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:gap-3 transition-all duration-200"
                    >
                      Read Article
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer strip */}
      <footer className="py-8 bg-[#1a3a14] text-center">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Alliance Street Organic Farms, Goa, India
        </p>
      </footer>
    </div>
  );
}
