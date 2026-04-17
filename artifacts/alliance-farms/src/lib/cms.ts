import settingsData from "@/data/settings.json";
import seoData from "@/data/seo.json";
import pagesData from "@/data/pages.json";
import productsData from "@/data/products.json";
import breedsData from "@/data/breeds.json";
import goatsData from "@/data/goats.json";
import faqData from "@/data/faq.json";
import testimonialsData from "@/data/testimonials.json";
import blogData from "@/data/blog.json";

const STORAGE_KEY = "asof_site_settings";

function getStoredOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCmsSettings() {
  const o = getStoredOverrides();
  return {
    ...settingsData,
    phone: o.phone || settingsData.phone,
    email: o.email || settingsData.email,
    whatsappUrl: o.whatsappUrl || settingsData.whatsappUrl,
    instagramUrl: o.instagramUrl || settingsData.instagramUrl,
    facebookUrl: o.facebookUrl ?? settingsData.facebookUrl,
  };
}

export function getCmsSeo() {
  const o = getStoredOverrides();
  return {
    ...seoData,
    pageTitle: o.pageTitle || seoData.pageTitle,
    metaDescription: o.metaDescription || seoData.metaDescription,
    metaKeywords: o.metaKeywords || seoData.metaKeywords,
    ogTitle: o.ogTitle || seoData.ogTitle,
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
