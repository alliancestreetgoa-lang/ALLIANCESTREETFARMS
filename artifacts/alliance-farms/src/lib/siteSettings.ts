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
}

export function resetSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function applyMetaTags(settings: SiteSettings): void {
  document.title = settings.pageTitle;

  const setMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const setOgMeta = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", settings.metaDescription);
  setMeta("keywords", settings.metaKeywords);
  setOgMeta("og:title", settings.ogTitle);
  setOgMeta("og:description", settings.metaDescription);
}
