import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { BlogNavbar } from "@/components/BlogNavbar";
import { PageFooter } from "@/components/PageFooter";
import { getCmsBlog, getCmsSettings } from "@/lib/cms";
import { applyMetaTags } from "@/lib/siteSettings";
import { fadeUp, fadeUpSoft, staggerContainer } from "@/lib/animations";

const VIEWPORT = { once: true, margin: "-40px" };

type ContentBlock =
  | { type: "intro" | "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ContentRenderer({ block, index }: { block: ContentBlock; index: number }) {
  const base = { once: true, margin: "-30px" };

  if (block.type === "intro") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={base}
        transition={{ duration: 0.5, delay: index * 0.04 }}
        className="text-[#3a2510] text-lg md:text-xl leading-relaxed font-normal border-l-4 border-secondary/40 pl-6 mb-8 italic"
      >
        {block.text}
      </motion.p>
    );
  }

  if (block.type === "h2") {
    return (
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={base}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="font-heading text-[#1a3a14] text-2xl md:text-3xl mt-12 mb-4 leading-snug"
      >
        {block.text}
      </motion.h2>
    );
  }

  if (block.type === "p") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={base}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="text-[#5c3d1e] text-base leading-relaxed mb-5 font-normal"
      >
        {block.text}
      </motion.p>
    );
  }

  if (block.type === "ul") {
    return (
      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={base}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="mb-6 space-y-3"
      >
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#5c3d1e] text-sm leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </motion.ul>
    );
  }

  if (block.type === "quote") {
    return (
      <motion.blockquote
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={base}
        transition={{ duration: 0.5, delay: index * 0.04 }}
        className="my-10 bg-[#1a3a14]/5 border-l-4 border-secondary rounded-r-xl px-6 py-5"
      >
        <p className="font-heading text-[#1a3a14] text-xl italic leading-snug mb-2">
          "{block.text}"
        </p>
        {block.attribution && (
          <cite className="text-secondary text-sm font-semibold not-italic">
            — {block.attribution}
          </cite>
        )}
      </motion.blockquote>
    );
  }

  return null;
}

const CATEGORY_COLORS: Record<string, string> = {
  Nutrition: "bg-emerald-100 text-emerald-800",
  Breeds: "bg-amber-100 text-amber-800",
  Farming: "bg-purple-100 text-purple-800",
};

function PlainTextRenderer({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return (
    <>
      {paragraphs.map((para, i) => {
        if (para.startsWith("## ")) {
          return (
            <h2 key={i} className="font-heading text-[#1a3a14] text-2xl md:text-3xl mt-12 mb-4 leading-snug">
              {para.slice(3)}
            </h2>
          );
        }
        if (para.startsWith("> ")) {
          const body = para.slice(2);
          const [quote, attr] = body.split(" — ");
          return (
            <blockquote key={i} className="my-10 bg-[#1a3a14]/5 border-l-4 border-secondary rounded-r-xl px-6 py-5">
              <p className="font-heading text-[#1a3a14] text-xl italic leading-snug mb-2">"{quote.trim()}"</p>
              {attr && <cite className="text-secondary text-sm font-semibold not-italic">— {attr.trim()}</cite>}
            </blockquote>
          );
        }
        const lines = para.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="mb-6 space-y-3">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 text-[#5c3d1e] text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>{l.slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[#5c3d1e] text-base leading-relaxed mb-5 font-normal">
            {para}
          </p>
        );
      })}
    </>
  );
}

export default function BlogPost() {
  const [cmsData, setCmsData] = useState(getCmsBlog);

  useEffect(() => {
    const refresh = () => setCmsData(getCmsBlog());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const { slug } = useParams<{ slug: string }>();
  const post = cmsData.posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    applyMetaTags({
      fullTitle: post.metaTitle,
      title: post.metaTitle,
      description: post.metaDescription,
      keywords: `${post.category.toLowerCase()}, organic farm goa, alliance street organic farms`,
      ogTitle: post.metaTitle,
      ogDescription: post.metaDescription,
      ogImage: post.featuredImage,
      ogType: "article",
      twitterCard: "summary_large_image",
    });
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#faf6ef] font-sans">
        <BlogNavbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
          <span className="text-6xl">🌿</span>
          <h1 className="font-heading text-3xl text-[#1a3a14]">Post not found</h1>
          <p className="text-[#5c3d1e]/70">
            This article doesn't exist or may have been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a3a14] text-white font-semibold hover:bg-secondary transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = cmsData.posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#faf6ef] font-sans">
      <BlogNavbar />

      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[360px] bg-[#1a3a14] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e0c]/90 via-[#0f1e0c]/40 to-transparent" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.08)}
        >
          <motion.span
            variants={fadeUpSoft}
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
              CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {post.category}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl md:text-5xl text-white leading-tight mb-4 max-w-3xl"
          >
            {post.title}
          </motion.h1>
          <motion.div
            variants={fadeUpSoft}
            className="flex flex-wrap items-center gap-4 text-white/60 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={13} />
              {post.author}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {post.contentText
          ? <PlainTextRenderer text={post.contentText} />
          : post.content
            ? (post.content as ContentBlock[]).map((block, i) => (
                <ContentRenderer key={i} block={block} index={i} />
              ))
            : null
        }
      </article>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#1a3a14]/10" />
      </div>

      {/* Author card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-[#1a3a14]/5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a3a14] to-secondary flex items-center justify-center text-white font-heading text-lg flex-shrink-0">
            A
          </div>
          <div>
            <p className="font-semibold text-[#1a3a14] text-sm">{post.author}</p>
            <p className="text-[#5c3d1e]/60 text-xs mt-0.5">
              Organic farmers in {getCmsSettings().location} — raising native breeds ethically since {getCmsSettings().established}.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading text-[#1a3a14] text-2xl mb-8">More From the Farm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((related) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4 }}
                  className="group flex gap-4 bg-[#faf6ef] rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#1a3a14]/10">
                    <img
                      src={related.featuredImage}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        (e.currentTarget as HTMLImageElement).parentElement!.style.background =
                          "linear-gradient(135deg, #1a3a14, #2d5a27)";
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <p className="font-heading text-[#1a3a14] text-sm leading-snug group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                      {related.title}
                    </p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="inline-flex items-center gap-1 text-secondary text-xs font-semibold mt-2 hover:gap-2 transition-all duration-200"
                    >
                      Read <ArrowRight size={12} />
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
