import { getCmsSettings } from "@/lib/cms";

export function PageFooter() {
  const s = getCmsSettings();
  return (
    <footer className="py-8 bg-[#0f1e0c] text-center">
      <p className="text-white/40 text-sm">
        © {new Date().getFullYear()} {s.farmName}, {s.location}. All rights reserved.
      </p>
    </footer>
  );
}
