import { useEffect } from "react";
import { getSectionSeo, getCmsSeo, type SectionId } from "@/lib/cms";
import { applyMetaTags } from "@/lib/siteSettings";

const SECTION_ORDER: SectionId[] = [
  "home",
  "products",
  "breeds",
  "eggs",
  "philosophy",
  "about",
  "team",
  "contact",
];

const SECTION_DOM_IDS: Record<SectionId, string> = {
  home: "hero",
  products: "products",
  breeds: "breeds",
  eggs: "eggs",
  philosophy: "philosophy",
  about: "about",
  team: "team",
  contact: "contact",
};

export function useSectionSeo() {
  useEffect(() => {
    const applySection = (sectionId: SectionId) => {
      const seo = getSectionSeo(sectionId);
      applyMetaTags(seo);
    };

    const applyFromOverrides = () => {
      const activeSection = getCurrentActiveSection();
      if (activeSection) {
        applySection(activeSection);
      } else {
        applyMetaTags(getCmsSeo());
      }
    };

    function getCurrentActiveSection(): SectionId | null {
      for (const sectionId of SECTION_ORDER) {
        const domId = SECTION_DOM_IDS[sectionId];
        const el = document.getElementById(domId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight > viewportHeight * 0.4) {
          return sectionId;
        }
      }
      return null;
    }

    applySection("home");

    const observers: IntersectionObserver[] = [];

    for (const sectionId of SECTION_ORDER) {
      const domId = SECTION_DOM_IDS[sectionId];
      const el = document.getElementById(domId);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              applySection(sectionId);
            }
          }
        },
        { threshold: [0.3], rootMargin: "0px" }
      );

      observer.observe(el);
      observers.push(observer);
    }

    window.addEventListener("storage", applyFromOverrides);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("storage", applyFromOverrides);
    };
  }, []);
}
