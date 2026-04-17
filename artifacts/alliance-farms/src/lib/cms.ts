import settingsData from "@/data/settings.json";
import seoData from "@/data/seo.json";
import pagesData from "@/data/pages.json";
import cmsPagesData from "@/data/cms_pages.json";
import productsData from "@/data/products.json";
import breedsData from "@/data/breeds.json";
import goatsData from "@/data/goats.json";
import faqData from "@/data/faq.json";
import testimonialsData from "@/data/testimonials.json";
import blogData from "@/data/blog.json";

const STORAGE_KEY = "asof_site_settings";
const PAGES_STORAGE_KEY = "asof_cms_pages";

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
}

export function getCmsPages(): CmsPage[] {
  try {
    const raw = localStorage.getItem(PAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : (cmsPagesData as CmsPage[]);
  } catch {
    return cmsPagesData as CmsPage[];
  }
}

export function saveCmsPages(pages: CmsPage[]): void {
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
}

// ─── Blog CMS ─────────────────────────────────────────────────────────────────

const BLOG_STORAGE_KEY = "asof_cms_blog";

export interface CmsBlogPost {
  id: number | string;
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  content?: Array<Record<string, unknown>>;
  contentText?: string;
}

export function getCmsBlog(): { heading: string; subheading: string; posts: CmsBlogPost[] } {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      return {
        heading: blogData.heading,
        subheading: blogData.subheading,
        posts: stored,
      };
    }
  } catch { /* fall through */ }
  return blogData as { heading: string; subheading: string; posts: CmsBlogPost[] };
}

export function saveCmsBlog(posts: CmsBlogPost[]): void {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event("storage"));
}

export type SectionId = keyof typeof seoData.pages;

export interface ResolvedSeo {
  fullTitle: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
}

function getStoredOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function buildFullTitle(title: string): string {
  return `${title} | ${seoData.siteName}`;
}

export function getCmsSettings() {
  const o = getStoredOverrides();
  return {
    farmName:     settingsData.farmName,
    tagline:      settingsData.tagline,
    footerTagline: settingsData.footerTagline,
    location:     settingsData.location,
    established:  settingsData.established,
    logoUrl:      settingsData.logoUrl,
    logoAlt:      settingsData.logoAlt,
    phone:        o.phone        || settingsData.phone,
    email:        o.email        || settingsData.email,
    whatsappUrl:  o.whatsappUrl  || settingsData.whatsappUrl,
    instagramUrl: o.instagramUrl || settingsData.instagramUrl,
    facebookUrl:  o.facebookUrl  ?? settingsData.facebookUrl,
  };
}

export function getCmsSeo(): ResolvedSeo {
  const o = getStoredOverrides();
  const def = seoData.default;
  const title = o.pageTitle || def.title;
  const description = o.metaDescription || def.description;
  const ogTitle = o.ogTitle || def.ogTitle;
  return {
    fullTitle: buildFullTitle(title),
    title,
    description,
    keywords: o.metaKeywords || def.keywords,
    ogTitle,
    ogDescription: def.ogDescription,
    ogImage: def.ogImage,
    ogType: def.ogType,
    twitterCard: def.twitterCard,
  };
}

export function getSectionSeo(sectionId: SectionId): ResolvedSeo {
  const o = getStoredOverrides();
  const def = seoData.default;
  const page = seoData.pages[sectionId];
  const title = page.title;
  const description = page.description;
  const ogTitle = page.ogTitle;
  const ogDescription = page.ogDescription;
  const ogImage = page.ogImage;

  return {
    fullTitle: sectionId === "home"
      ? buildFullTitle(o.pageTitle || title)
      : buildFullTitle(title),
    title,
    description: sectionId === "home" ? (o.metaDescription || description) : description,
    keywords: page.keywords,
    ogTitle: sectionId === "home" ? (o.ogTitle || ogTitle) : ogTitle,
    ogDescription,
    ogImage,
    ogType: def.ogType,
    twitterCard: def.twitterCard,
  };
}

export function getCmsHero() {
  const o = getStoredOverrides();
  return {
    ...pagesData.hero,
    tagline: o.heroTagline || pagesData.hero.tagline,
    headline: o.heroHeadline || pagesData.hero.headline,
    subheadline: o.heroSubheadline || pagesData.hero.subheadline,
  };
}

export const pages = pagesData;
export const products = productsData;
export const breeds = breedsData;
export const goats = goatsData;
export const faq = faqData;
export const testimonials = testimonialsData;
export const blog = blogData;
