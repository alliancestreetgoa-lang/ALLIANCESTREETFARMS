import { useState, useEffect } from "react";
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from "@/lib/adminAuth";
import { loadSettings, saveSettings, resetSettings, applySettingsPreview, DEFAULT_SETTINGS, type SiteSettings } from "@/lib/siteSettings";

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await loginAdmin(username, password);
    if (ok) {
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1e0c] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-[#1a3a14] px-8 pt-10 pb-8 text-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto mx-auto mb-4 object-contain" />
          <h1 className="text-white font-bold text-xl tracking-wide">Admin Panel</h1>
          <p className="text-white/50 text-xs mt-1">Alliance Street Organic Farms</p>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14] uppercase tracking-wider mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14] uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
              placeholder="••••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2d5a27] hover:bg-[#1a3a14] text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1a3a14] uppercase tracking-wider mb-1">
        {label}
      </label>
      {hint && <p className="text-[#5c3d1e]/60 text-xs mb-1.5">{hint}</p>}
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent"
        />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-black/6 bg-[#faf6ef]">
        <h2 className="font-bold text-[#1a3a14] text-sm uppercase tracking-wider">{title}</h2>
      </div>
      <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [settings, setSettings] = useState<SiteSettings>(loadSettings());
  const [saved, setSaved] = useState(false);

  const update = (key: keyof SiteSettings) => (value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSettings(settings);
    applySettingsPreview(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all settings to defaults?")) {
      resetSettings();
      const def = { ...DEFAULT_SETTINGS };
      setSettings(def);
      applySettingsPreview(def);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <header className="bg-[#1a3a14] sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
            <div>
              <p className="text-white font-bold text-sm leading-none">Admin Panel</p>
              <p className="text-white/50 text-[10px] leading-none mt-0.5">Site Settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-white/60 hover:text-white text-xs font-medium transition-colors"
            >
              View Site ↗
            </a>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        <Section title="🔍 Google / SEO Settings">
          <Field
            label="Page Title (Browser Tab)"
            hint="Shows in the browser tab and Google search results headline"
            value={settings.pageTitle}
            onChange={update("pageTitle")}
          />
          <Field
            label="Meta Description"
            hint="The short description Google shows under your site link in search results (150–160 chars)"
            value={settings.metaDescription}
            onChange={update("metaDescription")}
            multiline
          />
          <Field
            label="Meta Keywords"
            hint="Comma-separated keywords that describe your farm (helps Google understand your content)"
            value={settings.metaKeywords}
            onChange={update("metaKeywords")}
          />
          <Field
            label="Social Share Title (OG Title)"
            hint="Title shown when someone shares your site on WhatsApp, Facebook, Instagram etc."
            value={settings.ogTitle}
            onChange={update("ogTitle")}
          />
        </Section>

        <Section title="🌿 Hero Section">
          <Field
            label="Tagline (small text above headline)"
            value={settings.heroTagline}
            onChange={update("heroTagline")}
          />
          <Field
            label="Headline (line 1)"
            value={settings.heroHeadline}
            onChange={update("heroHeadline")}
          />
          <Field
            label="Headline (line 2 — gold italic)"
            value={settings.heroSubheadline}
            onChange={update("heroSubheadline")}
          />
        </Section>

        <Section title="📞 Contact Details">
          <Field
            label="Phone Number"
            value={settings.phone}
            onChange={update("phone")}
          />
          <Field
            label="Email Address"
            value={settings.email}
            onChange={update("email")}
          />
        </Section>

        <Section title="📱 Social Media Links">
          <Field
            label="Instagram URL"
            value={settings.instagramUrl}
            onChange={update("instagramUrl")}
          />
          <Field
            label="Facebook URL"
            value={settings.facebookUrl}
            onChange={update("facebookUrl")}
          />
          <Field
            label="WhatsApp Link"
            hint="e.g. https://wa.me/917375096163"
            value={settings.whatsappUrl}
            onChange={update("whatsappUrl")}
          />
        </Section>

        <div className="flex items-center gap-4 pb-10">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#2d5a27] hover:bg-[#1a3a14] text-white font-bold py-4 rounded-2xl transition-colors duration-200 text-sm shadow-lg"
          >
            {saved ? "✓ Saved!" : "Save All Settings"}
          </button>
          <button
            onClick={handleReset}
            className="bg-white border border-black/15 hover:bg-red-50 hover:border-red-300 text-[#5c3d1e]/70 hover:text-red-600 font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 text-sm"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  useEffect(() => {
    if (loggedIn) {
      const settings = loadSettings();
      applySettingsPreview(settings);
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
