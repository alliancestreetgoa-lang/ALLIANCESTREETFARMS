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
