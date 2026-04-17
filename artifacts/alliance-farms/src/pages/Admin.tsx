import { useState } from "react";
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from "@/lib/adminAuth";
import { getCmsSettings } from "@/lib/cms";
import { blog, products } from "@/lib/cms";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "dashboard" | "pages" | "blog" | "products" | "settings" | "seo";

// ─── Login Page ───────────────────────────────────────────────────────────────

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
          {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
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

// ─── Shared field components ───────────────────────────────────────────────────

function Field({
  label,
  hint,
  value,
  type = "text",
  multiline = false,
  readOnly = false,
}: {
  label: string;
  hint?: string;
  value: string;
  type?: string;
  multiline?: boolean;
  readOnly?: boolean;
}) {
  const base =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
        {label}
      </label>
      {hint && <p className="text-black/40 text-xs mb-1.5">{hint}</p>}
      {multiline ? (
        <textarea
          rows={3}
          defaultValue={value}
          readOnly={readOnly}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          defaultValue={value}
          readOnly={readOnly}
          className={base}
        />
      )}
    </div>
  );
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-black/6 flex items-center justify-between">
        <h2 className="font-bold text-[#1a3a14] text-sm">{title}</h2>
        {action}
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 shadow-sm px-6 py-5">
      <p className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#1a3a14]">{value}</p>
      {sub && <p className="text-xs text-black/40 mt-0.5">{sub}</p>}
    </div>
  );
}

function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "gold" | "gray" }) {
  const colors = {
    green: "bg-[#1a3a14]/8 text-[#1a3a14]",
    gold: "bg-[#DBA319]/15 text-[#A87A0F]",
    gray: "bg-black/6 text-black/50",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
}

function Btn({
  children,
  variant = "ghost",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  onClick?: () => void;
}) {
  const styles = {
    primary: "bg-[#1a3a14] hover:bg-[#2d5a27] text-white",
    ghost: "bg-black/5 hover:bg-black/10 text-black/70",
    danger: "bg-red-50 hover:bg-red-100 text-red-600",
  };
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardView({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const s = getCmsSettings();
  const posts = blog.posts;
  const prods = products.items;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">Dashboard</h1>
        <p className="text-sm text-black/40 mt-0.5">Overview of your site content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Blog Posts" value={posts.length} sub="Published" />
        <StatCard label="Products" value={prods.length} sub="Listed" />
        <StatCard label="Location" value="Goa" sub={s.location} />
        <StatCard label="Est." value={s.established} sub="Year founded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Recent Blog Posts"
          action={<Btn onClick={() => onNavigate("blog")}>View all</Btn>}
        >
          <div className="divide-y divide-black/5">
            {posts.slice(0, 3).map((post) => (
              <div key={post.slug} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3a14] truncate">{post.title}</p>
                  <p className="text-xs text-black/40 mt-0.5">{post.date} · {post.readTime}</p>
                </div>
                <Badge color="green">{post.category}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Products"
          action={<Btn onClick={() => onNavigate("products")}>View all</Btn>}
        >
          <div className="divide-y divide-black/5">
            {prods.slice(0, 3).map((p) => (
              <div key={p.slug} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3a14] truncate">{p.name}</p>
                  <p className="text-xs text-black/40 mt-0.5">{p.tag}</p>
                </div>
                <Badge color="gold">{p.price}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Quick Links">
        <div className="flex flex-wrap gap-3">
          {[
            { label: "View Site", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Shop", href: "/products" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#1a3a14]/6 text-[#1a3a14] hover:bg-[#1a3a14]/12 transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function PagesView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">Pages</h1>
        <p className="text-sm text-black/40 mt-0.5">Edit the content sections of your homepage</p>
      </div>

      <Card title="Hero Section">
        <Field label="Eyebrow label" value="Welcome to Alliance Street Organic Farms" />
        <Field label="Headline — line 1" value="Where Ethical Farming" />
        <Field label="Headline — line 2 (gold italic)" value="Meets Excellence" />
        <Field
          label="Sub-copy"
          value="Premium desi chicken, goat meat, farm-fresh eggs & nutritious goat milk — raised without antibiotics, hormones, or artificial chemicals."
          multiline
        />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary button label" value="Explore Products" />
          <Field label="Secondary button label" value="Our Story" />
        </div>
      </Card>

      <Card title="About Section">
        <Field label="Section heading" value="Born from the Soil of Goa" />
        <Field
          label="Body text"
          value="Alliance Street Organic Farms was founded in 2024 with a single mission — to bring honestly raised, chemical-free food directly to Goan families."
          multiline
        />
        <Field label="Founded year" value="2024" />
      </Card>

      <Card title="Contact Section">
        <Field label="Heading" value="Ready for Real Farm-Fresh Food?" />
        <Field label="Sub-copy" value="Order directly from Alliance Street Organic Farms — Goa's most trusted source for organic desi chicken, eggs, goat meat, and more." multiline />
      </Card>

      <div className="flex gap-3 justify-end">
        <Btn variant="primary">Save Changes</Btn>
      </div>
    </div>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function BlogView() {
  const posts = blog.posts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a14]">Blog</h1>
          <p className="text-sm text-black/40 mt-0.5">{posts.length} posts published</p>
        </div>
        <Btn variant="primary">+ New Post</Btn>
      </div>

      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/6 bg-black/2">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden sm:table-cell">Read time</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {posts.map((post) => (
              <tr key={post.slug} className="hover:bg-black/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-[#1a3a14]">{post.title}</p>
                  <p className="text-xs text-black/40 mt-0.5 line-clamp-1">{post.excerpt}</p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <Badge color="green">{post.category}</Badge>
                </td>
                <td className="px-5 py-4 text-black/50 hidden md:table-cell">{post.date}</td>
                <td className="px-5 py-4 text-black/50 hidden sm:table-cell">{post.readTime}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Btn>Edit</Btn>
                    <Btn variant="danger">Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function ProductsView() {
  const prods = products.items;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a14]">Products</h1>
          <p className="text-sm text-black/40 mt-0.5">{prods.length} products listed</p>
        </div>
        <Btn variant="primary">+ New Product</Btn>
      </div>

      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/6 bg-black/2">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden sm:table-cell">Tag</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider">Price</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Slug</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {prods.map((p) => (
              <tr key={p.slug} className="hover:bg-black/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#1a3a14]/8 flex-shrink-0">
                      <img
                        src={p.images?.[0] || ""}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a3a14]">{p.name}</p>
                      <p className="text-xs text-black/40 mt-0.5 line-clamp-1 hidden md:block">{p.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <Badge color="gold">{p.tag}</Badge>
                </td>
                <td className="px-5 py-4 font-semibold text-[#A87A0F]">{p.price}</td>
                <td className="px-5 py-4 text-black/40 font-mono text-xs hidden md:table-cell">{p.slug}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Btn>Edit</Btn>
                    <Btn variant="danger">Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsView() {
  const s = getCmsSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">Settings</h1>
        <p className="text-sm text-black/40 mt-0.5">Site identity, contact details and social links</p>
      </div>

      <Card title="Site Identity">
        <Field label="Farm / Business name" value={s.farmName} />
        <Field label="Tagline" value={s.tagline} />
        <Field label="Location" value={s.location} />
        <Field label="Established year" value={s.established} />
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Logo</label>
          <div className="flex items-center gap-4 p-4 border border-black/12 rounded-xl bg-[#faf6ef]">
            <img src={s.logoUrl} alt={s.logoAlt} className="h-12 w-auto object-contain" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1a3a14]">{s.logoUrl}</p>
              <p className="text-xs text-black/40 mt-0.5">{s.logoAlt}</p>
            </div>
            <Btn>Replace</Btn>
          </div>
        </div>
      </Card>

      <Card title="Contact Details">
        <Field label="Phone number" value={s.phone} type="tel" />
        <Field label="Email address" value={s.email} type="email" />
        <Field label="WhatsApp URL" hint="e.g. https://wa.me/917375096163 or a QR link" value={s.whatsappUrl} />
      </Card>

      <Card title="Social Media">
        <Field label="Instagram URL" value={s.instagramUrl} />
        <Field label="Facebook URL" value={s.facebookUrl || ""} hint="Leave blank to hide" />
      </Card>

      <div className="flex gap-3 justify-end">
        <Btn variant="primary">Save Changes</Btn>
      </div>
    </div>
  );
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

function SeoView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">SEO</h1>
        <p className="text-sm text-black/40 mt-0.5">Search engine and social sharing metadata</p>
      </div>

      <Card title="Global Defaults">
        <Field
          label="Site name"
          hint="Used in the Page | Site Name title format"
          value="Alliance Street Organic Farms"
        />
        <Field
          label="Default meta description"
          hint="Shown in Google search results when no page-specific description is set (150–160 chars)"
          value="Alliance Street Organic Farms — Premium organic desi chicken, goat meat, country eggs & goat milk raised in Goa, India. Zero antibiotics. Zero shortcuts."
          multiline
        />
        <Field
          label="Default keywords"
          hint="Comma-separated"
          value="organic farm Goa, desi chicken Goa, country eggs Goa, goat meat Goa, organic meat India"
        />
      </Card>

      <Card title="Open Graph / Social Sharing">
        <Field
          label="OG title"
          hint="Title shown when someone shares your site on WhatsApp, Facebook, etc."
          value="Alliance Street Organic Farms — Pure, Honest, Always Fresh"
        />
        <Field
          label="OG description"
          value="Premium desi chicken, goat meat, country eggs & goat milk raised in Goa. No antibiotics. No shortcuts. Order fresh."
          multiline
        />
        <Field
          label="OG image URL"
          hint="Recommended: 1200 × 630 px"
          value="/og-image.jpg"
        />
      </Card>

      <Card title="Per-Page SEO">
        <div className="rounded-xl border border-black/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/2 border-b border-black/6">
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/40 uppercase tracking-wider">Page</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Meta Title</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                { page: "Home", title: "Alliance Street Organic Farms — Pure. Honest. Always Fresh." },
                { page: "Blog", title: "From the Farm — Blog | Alliance Street Organic Farms" },
                { page: "Products", title: "Our Products | Alliance Street Organic Farms" },
              ].map(({ page, title }) => (
                <tr key={page} className="hover:bg-black/[0.02]">
                  <td className="px-4 py-3.5 font-medium text-[#1a3a14]">{page}</td>
                  <td className="px-4 py-3.5 text-black/50 hidden md:table-cell text-xs truncate max-w-xs">{title}</td>
                  <td className="px-4 py-3.5 text-right">
                    <Btn>Edit</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-black/40">Blog posts and products have individual SEO settings editable from the Blog and Products sections.</p>
      </Card>

      <div className="flex gap-3 justify-end">
        <Btn variant="primary">Save Changes</Btn>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "pages",     label: "Pages",     icon: "□" },
  { id: "blog",      label: "Blog",      icon: "✎" },
  { id: "products",  label: "Products",  icon: "◈" },
  { id: "settings",  label: "Settings",  icon: "⚙" },
  { id: "seo",       label: "SEO",       icon: "◎" },
];

function Sidebar({
  active,
  onNavigate,
  onLogout,
}: {
  active: Section;
  onNavigate: (s: Section) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="w-56 flex-shrink-0 bg-[#0f1e0c] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          <div className="min-w-0">
            <p className="text-white text-xs font-bold leading-tight truncate">Alliance Street</p>
            <p className="text-white/40 text-[10px] leading-tight">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
              active === id
                ? "bg-[#DBA319]/15 text-[#DBA319]"
                : "text-white/50 hover:text-white/90 hover:bg-white/6"
            }`}
          >
            <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/8 pt-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors"
        >
          <span className="text-base w-5 text-center">↗</span>
          View Site
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/8 transition-colors"
        >
          <span className="text-base w-5 text-center">⏻</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}

// ─── Admin shell ──────────────────────────────────────────────────────────────

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");

  const views: Record<Section, React.ReactNode> = {
    dashboard: <DashboardView onNavigate={setSection} />,
    pages:     <PagesView />,
    blog:      <BlogView />,
    products:  <ProductsView />,
    settings:  <SettingsView />,
    seo:       <SeoView />,
  };

  return (
    <div className="flex min-h-screen bg-[#f2ede4]">
      <Sidebar active={section} onNavigate={setSection} onLogout={onLogout} />

      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#f2ede4]/80 backdrop-blur-md border-b border-black/6 px-8 py-4">
          <p className="text-xs font-semibold text-black/30 uppercase tracking-widest">
            {NAV.find((n) => n.id === section)?.label}
          </p>
        </header>

        <div className="px-8 py-8 max-w-4xl">
          {views[section]}
        </div>
      </main>
    </div>
  );
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;
  return <AdminShell onLogout={() => setLoggedIn(false)} />;
}
