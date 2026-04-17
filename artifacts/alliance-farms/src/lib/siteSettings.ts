import type { ResolvedSeo } from "@/lib/cms";

const STORAGE_KEY = "asof_site_settings";

export interface SiteSettings {
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;
  phone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  pageTitle: "Real Eggs. Real Farm. Real Goa.",
  metaDescription: "Alliance Street Organic Farms — Premium desi chicken, goat meat, farm-fresh eggs & nutritious goat milk raised without antibiotics in Goa, India.",
  metaKeywords: "organic farm goa, desi chicken, goat meat, fresh eggs, goat milk, organic food india",
  ogTitle: "Alliance Street Organic Farms — Pure. Honest. Always Fresh.",
  heroHeadline: "Where Ethical Farming",
  heroSubheadline: "Meets Excellence",
  heroTagline: "Welcome to Alliance Street Organic Farms",
  phone: "+91 73750 96163",
  email: "alliancestreetorganicfarms@gmail.com",
  instagramUrl: "https://www.instagram.com/alliancestreetorganicfarms/",
  facebookUrl: "",
  whatsappUrl: "https://wa.me/qr/ORVOCVVT3QJOJ1",
};

export function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

export function resetSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
}

function setMeta(name: string, content: string): void {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOgMeta(property: string, content: string): void {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applySettingsPreview(settings: SiteSettings): void {
  applyMetaTags({
    fullTitle: `${settings.pageTitle} | Alliance Street Organic Farms`,
    title: settings.pageTitle,
    description: settings.metaDescription,
    keywords: settings.metaKeywords,
    ogTitle: settings.ogTitle,
    ogDescription: settings.metaDescription,
    ogImage: "/images/og_default.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
  });
}

export function applyMetaTags(seo: ResolvedSeo): void {
  document.title = seo.fullTitle;

  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords);

  setOgMeta("og:title", seo.ogTitle);
  setOgMeta("og:description", seo.ogDescription);
  setOgMeta("og:image", seo.ogImage);
  setOgMeta("og:type", seo.ogType);
  setOgMeta("og:site_name", "Alliance Street Organic Farms");

  setMeta("twitter:card", seo.twitterCard);
  setMeta("twitter:title", seo.ogTitle);
  setMeta("twitter:description", seo.ogDescription);
  setMeta("twitter:image", seo.ogImage);
}
