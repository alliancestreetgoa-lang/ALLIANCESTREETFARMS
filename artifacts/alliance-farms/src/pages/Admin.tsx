import { useState } from "react";
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from "@/lib/adminAuth";
import {
  getCmsSettings, getCmsPages, saveCmsPages, type CmsPage,
  getCmsBlog, saveCmsBlog, type CmsBlogPost,
  getCmsProducts, saveCmsProducts, type CmsProduct,
  getCmsSeoPages, saveCmsSeoPages, getSectionSeo,
  type CmsSeoPage, type SectionId,
} from "@/lib/cms";
import { loadSettings, saveSettings, applySettingsPreview, type SiteSettings } from "@/lib/siteSettings";

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
  const posts = getCmsBlog().posts;
  const prods = getCmsProducts().items;

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

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const BLANK_PAGE: Omit<CmsPage, "id"> = {
  title: "",
  slug: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
};

function PageForm({
  initial,
  onSave,
  onCancel,
  isNew,
}: {
  initial: CmsPage | typeof BLANK_PAGE;
  onSave: (p: CmsPage | typeof BLANK_PAGE) => void;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [draft, setDraft] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof BLANK_PAGE, val: string) => {
    setDraft((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "title" && !slugTouched) {
        next.slug = slugify(val);
      }
      return next;
    });
    if (val.trim()) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const inputCls =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";
  const errCls = "border-red-400 focus:ring-red-400/40 focus:border-red-400";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm font-medium text-black/40 hover:text-black/70 transition-colors"
        >
          ← Back
        </button>
        <span className="text-black/20">/</span>
        <h1 className="text-xl font-bold text-[#1a3a14]">
          {isNew ? "New Page" : `Edit: ${(initial as CmsPage).title || "Page"}`}
        </h1>
      </div>

      <Card title="Page Content">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. About Us"
            className={`${inputCls} ${errors.title ? errCls : ""}`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Slug
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case tracking-normal">
              {!slugTouched && "auto-generated from title"}
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-black/30 select-none">/</span>
            <input
              type="text"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
              }}
              placeholder="page-url"
              className={`${inputCls} pl-7`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Content</label>
          <textarea
            rows={6}
            value={draft.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder="Page body text or description…"
            className={`${inputCls} resize-none`}
          />
        </div>
      </Card>

      <Card title="SEO">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Meta Title
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case">shown in browser tab &amp; Google</span>
          </label>
          <input
            type="text"
            value={draft.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            placeholder="Page Title | Alliance Street Organic Farms"
            className={inputCls}
          />
          <p className={`text-xs mt-1 ${draft.metaTitle.length > 60 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaTitle.length}/60 characters recommended
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Meta Description
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case">shown in Google search results</span>
          </label>
          <textarea
            rows={3}
            value={draft.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            placeholder="A short description of this page for search engines (150–160 chars)…"
            className={`${inputCls} resize-none`}
          />
          <p className={`text-xs mt-1 ${draft.metaDescription.length > 160 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaDescription.length}/160 characters recommended
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn
          variant="primary"
          onClick={() => {
            if (!draft.title.trim()) {
              setErrors({ title: "Title is required" });
              return;
            }
            setErrors({});
            onSave(draft);
          }}
        >
          {isNew ? "Create Page" : "Save Changes"}
        </Btn>
      </div>
    </div>
  );
}

function PagesView() {
  const [pages, setPages] = useState<CmsPage[]>(getCmsPages);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<CmsPage | null>(null);
  const [toast, setToast] = useState("");

  const persist = (updated: CmsPage[]) => {
    setPages(updated);
    saveCmsPages(updated);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSaveNew = (draft: CmsPage | typeof BLANK_PAGE) => {
    const newPage: CmsPage = {
      ...(draft as CmsPage),
      id: draft.slug || `page-${Date.now()}`,
    };
    persist([...pages, newPage]);
    showToast("Page created");
    setView("list");
  };

  const handleSaveEdit = (draft: CmsPage | typeof BLANK_PAGE) => {
    persist(pages.map((p) => (p.id === editing!.id ? { ...(draft as CmsPage), id: editing!.id } : p)));
    showToast("Changes saved");
    setView("list");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this page? This cannot be undone.")) return;
    persist(pages.filter((p) => p.id !== id));
    showToast("Page deleted");
  };

  if (view === "add") {
    return <PageForm initial={BLANK_PAGE} onSave={handleSaveNew} onCancel={() => setView("list")} isNew />;
  }

  if (view === "edit" && editing) {
    return <PageForm initial={editing} onSave={handleSaveEdit} onCancel={() => setView("list")} isNew={false} />;
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a14]">Pages</h1>
          <p className="text-sm text-black/40 mt-0.5">{pages.length} page{pages.length !== 1 ? "s" : ""}</p>
        </div>
        <Btn variant="primary" onClick={() => setView("add")}>+ New Page</Btn>
      </div>

      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
        {pages.length === 0 ? (
          <div className="py-16 text-center text-black/30">
            <p className="text-4xl mb-3">□</p>
            <p className="text-sm font-medium">No pages yet</p>
            <p className="text-xs mt-1">Click "+ New Page" to create one</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/6 bg-black/2">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Meta Title</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-black/[0.015] transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1a3a14]">{page.title}</p>
                    <p className="text-xs text-black/30 mt-0.5 line-clamp-1 md:hidden">{page.metaDescription}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <code className="text-xs bg-black/5 px-2 py-1 rounded-lg text-black/50">/{page.slug}</code>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-xs text-black/40 truncate max-w-xs">{page.metaTitle}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Btn onClick={() => { setEditing(page); setView("edit"); }}>Edit</Btn>
                      <Btn variant="danger" onClick={() => handleDelete(page.id)}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function slugifyBlog(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blocksToText(content: Array<Record<string, unknown>>): string {
  return content.map((block) => {
    if (block.type === "h2") return `## ${block.text}`;
    if (block.type === "ul") return (block.items as string[]).map((i) => `- ${i}`).join("\n");
    if (block.type === "quote") {
      return `> ${block.text}${block.attribution ? ` — ${block.attribution}` : ""}`;
    }
    return (block.text as string) ?? "";
  }).join("\n\n");
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

const BLANK_POST: CmsBlogPost = {
  id: "",
  slug: "",
  title: "",
  date: new Date().toISOString().split("T")[0],
  author: "Alliance Street Organic Farms",
  readTime: "",
  category: "",
  excerpt: "",
  featuredImage: "",
  metaTitle: "",
  metaDescription: "",
  contentText: "",
};

function BlogForm({
  initial,
  onSave,
  onCancel,
  isNew,
}: {
  initial: CmsBlogPost;
  onSave: (p: CmsBlogPost) => void;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [draft, setDraft] = useState<CmsBlogPost>(() => ({
    ...initial,
    contentText: initial.contentText ?? (initial.content ? blocksToText(initial.content) : ""),
  }));
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputCls =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";
  const errCls = "border-red-400 focus:ring-red-400/40 focus:border-red-400";

  const set = (field: keyof CmsBlogPost, val: string) => {
    setDraft((d) => {
      const next: CmsBlogPost = { ...d, [field]: val };
      if (field === "title" && !slugTouched) next.slug = slugifyBlog(val);
      if (field === "contentText") next.readTime = estimateReadTime(val);
      return next;
    });
    if (field === "slug") setSlugTouched(true);
    if (val.trim()) setErrors((e) => { const n = { ...e }; delete n[field as string]; return n; });
  };

  const handleSave = () => {
    if (!draft.title.trim()) {
      setErrors({ title: "Post title is required" });
      return;
    }
    setErrors({});
    onSave({
      ...draft,
      id: draft.id || Date.now(),
      readTime: draft.readTime || estimateReadTime(draft.contentText ?? ""),
      content: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm font-medium text-black/40 hover:text-black/70 transition-colors"
        >
          ← Back
        </button>
        <span className="text-black/20">/</span>
        <h1 className="text-xl font-bold text-[#1a3a14]">
          {isNew ? "New Post" : `Edit: ${draft.title || "Post"}`}
        </h1>
      </div>

      <Card title="Post Details">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Why Desi Eggs Are Superior"
            className={`${inputCls} ${errors.title ? errCls : ""}`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Slug
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case tracking-normal">
              {!slugTouched && "auto-generated from title"}
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-black/30 select-none">/blog/</span>
            <input
              type="text"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
              }}
              placeholder="post-url-here"
              className={`${inputCls} pl-14`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Date</label>
            <input
              type="date"
              value={draft.date}
              onChange={(e) => set("date", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Category</label>
            <input
              type="text"
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="e.g. Nutrition, Breeds, Farming"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Author</label>
            <input
              type="text"
              value={draft.author}
              onChange={(e) => set("author", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
              Read Time
              <span className="ml-2 text-[10px] font-normal text-black/30 normal-case tracking-normal">auto-estimated from content</span>
            </label>
            <input
              type="text"
              value={draft.readTime}
              onChange={(e) => set("readTime", e.target.value)}
              placeholder="e.g. 5 min read"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Excerpt</label>
          <textarea
            rows={3}
            value={draft.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            placeholder="Short description shown in blog cards…"
            className={`${inputCls} resize-none`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Featured Image URL</label>
          <input
            type="text"
            value={draft.featuredImage}
            onChange={(e) => set("featuredImage", e.target.value)}
            placeholder="/images/your-photo.jpg"
            className={inputCls}
          />
          {draft.featuredImage && (
            <div className="mt-2 h-32 w-full max-w-xs rounded-xl overflow-hidden border border-black/8">
              <img
                src={draft.featuredImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>
      </Card>

      <Card title="Content">
        <div>
          <p className="text-xs text-black/40 mb-3 leading-relaxed">
            Use <code className="bg-black/6 px-1.5 py-0.5 rounded-md font-mono">## Heading</code> for section headings,{" "}
            <code className="bg-black/6 px-1.5 py-0.5 rounded-md font-mono">- item</code> for bullet lists
            (one per line, grouped together),{" "}
            <code className="bg-black/6 px-1.5 py-0.5 rounded-md font-mono">&gt; quote text — Author</code> for pull quotes.
            Separate paragraphs and sections with a blank line.
          </p>
          <textarea
            rows={20}
            value={draft.contentText}
            onChange={(e) => set("contentText", e.target.value)}
            placeholder={"Write your article here...\n\n## A Section Heading\n\nA paragraph of text.\n\n- Bullet point one\n- Bullet point two\n\n> A great quote — Author Name"}
            className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
          />
          {draft.contentText && (
            <p className="text-xs text-black/30 mt-1">
              ~{estimateReadTime(draft.contentText)} · {draft.contentText.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          )}
        </div>
      </Card>

      <Card title="SEO">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Meta Title</label>
          <input
            type="text"
            value={draft.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            placeholder="Post Title | Alliance Street Organic Farms"
            className={inputCls}
          />
          <p className={`text-xs mt-1 ${draft.metaTitle.length > 60 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaTitle.length}/60 characters recommended
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Meta Description</label>
          <textarea
            rows={3}
            value={draft.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            placeholder="Short description for Google search results (150–160 chars)…"
            className={`${inputCls} resize-none`}
          />
          <p className={`text-xs mt-1 ${draft.metaDescription.length > 160 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaDescription.length}/160 characters recommended
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn variant="primary" onClick={handleSave}>
          {isNew ? "Publish Post" : "Save Changes"}
        </Btn>
      </div>
    </div>
  );
}

function BlogView() {
  const [posts, setPosts] = useState<CmsBlogPost[]>(() => getCmsBlog().posts);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<CmsBlogPost | null>(null);
  const [toast, setToast] = useState("");

  const persist = (updated: CmsBlogPost[]) => {
    saveCmsBlog(updated);
    setPosts(updated);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSaveNew = (post: CmsBlogPost) => {
    persist([...posts, post]);
    showToast("Post published");
    setView("list");
  };

  const handleSaveEdit = (post: CmsBlogPost) => {
    persist(posts.map((p) => (String(p.id) === String(post.id) ? post : p)));
    showToast("Post saved");
    setView("list");
  };

  const handleDelete = (id: number | string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    persist(posts.filter((p) => String(p.id) !== String(id)));
    showToast("Post deleted");
  };

  if (view === "add") {
    return <BlogForm initial={BLANK_POST} onSave={handleSaveNew} onCancel={() => setView("list")} isNew />;
  }

  if (view === "edit" && editing) {
    return <BlogForm initial={editing} onSave={handleSaveEdit} onCancel={() => setView("list")} isNew={false} />;
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a14]">Blog</h1>
          <p className="text-sm text-black/40 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        </div>
        <Btn variant="primary" onClick={() => setView("add")}>+ New Post</Btn>
      </div>

      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="py-16 text-center text-black/30">
            <p className="text-4xl mb-3">✏️</p>
            <p className="text-sm font-medium">No posts yet</p>
            <p className="text-xs mt-1">Click "+ New Post" to write your first article</p>
          </div>
        ) : (
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
                <tr key={String(post.id)} className="hover:bg-black/[0.015] transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1a3a14]">{post.title}</p>
                    <p className="text-xs text-black/30 mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <Badge color="green">{post.category || "—"}</Badge>
                  </td>
                  <td className="px-5 py-4 text-black/50 hidden md:table-cell">{post.date}</td>
                  <td className="px-5 py-4 text-black/50 hidden sm:table-cell">{post.readTime}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Btn onClick={() => { setEditing(post); setView("edit"); }}>Edit</Btn>
                      <Btn variant="danger" onClick={() => handleDelete(post.id)}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

const COLOR_PRESETS = [
  { label: "Dark Brown → Forest Green", value: "from-[#3d2b1a] to-[#1a3a14]" },
  { label: "Brown → Gold", value: "from-[#5c3d1e] to-[#A87A0F]" },
  { label: "Forest → Medium Green", value: "from-[#1a3a14] to-[#2d5a27]" },
  { label: "Medium → Light Green", value: "from-[#2d5a27] to-[#7a9e6d]" },
  { label: "Brown → Dark Brown", value: "from-[#5c3d1e] to-[#3d2b1a]" },
];

const BLANK_PRODUCT: CmsProduct = {
  name: "",
  slug: "",
  tag: "",
  price: "",
  desc: "",
  image: "",
  images: [],
  color: COLOR_PRESETS[0].value,
  description: "",
  highlights: [],
  metaTitle: "",
  metaDescription: "",
};

function slugifyProduct(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ProductForm({
  initial,
  onSave,
  onCancel,
  isNew,
}: {
  initial: CmsProduct;
  onSave: (p: CmsProduct) => void;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [draft, setDraft] = useState<CmsProduct & { highlightsText: string }>(() => ({
    ...initial,
    highlightsText: (initial.highlights ?? []).join("\n"),
  }));
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputCls =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";
  const errCls = "border-red-400 focus:ring-red-400/40 focus:border-red-400";

  const set = (field: string, val: string) => {
    setDraft((d) => {
      const next = { ...d, [field]: val };
      if (field === "name" && !slugTouched) next.slug = slugifyProduct(val);
      return next;
    });
    if (field === "slug") setSlugTouched(true);
    if (val.trim()) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!draft.name.trim()) errs.name = "Product name is required";
    if (!draft.price.trim()) errs.price = "Price is required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const highlights = draft.highlightsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const imageUrl = draft.image.trim();
    onSave({
      name: draft.name,
      slug: draft.slug || slugifyProduct(draft.name),
      tag: draft.tag,
      price: draft.price,
      desc: draft.desc,
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      color: draft.color,
      description: draft.description,
      highlights,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm font-medium text-black/40 hover:text-black/70 transition-colors"
        >
          ← Back
        </button>
        <span className="text-black/20">/</span>
        <h1 className="text-xl font-bold text-[#1a3a14]">
          {isNew ? "New Product" : `Edit: ${draft.name || "Product"}`}
        </h1>
      </div>

      <Card title="Product Details">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Desi Chicken"
            className={`${inputCls} ${errors.name ? errCls : ""}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Slug
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case tracking-normal">
              {!slugTouched && "auto-generated from name"}
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-black/30 select-none">/products/</span>
            <input
              type="text"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
              }}
              placeholder="product-url"
              className={`${inputCls} pl-[5.5rem]`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Tag / Badge</label>
            <input
              type="text"
              value={draft.tag}
              onChange={(e) => set("tag", e.target.value)}
              placeholder="e.g. Native Breed, A2 Protein"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
              Price <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={draft.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="e.g. ₹450 / kg"
              className={`${inputCls} ${errors.price ? errCls : ""}`}
            />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Short Description (card preview)</label>
          <input
            type="text"
            value={draft.desc}
            onChange={(e) => set("desc", e.target.value)}
            placeholder="One-line description shown on product cards"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Image URL</label>
          <input
            type="text"
            value={draft.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/images/your-photo.jpg"
            className={inputCls}
          />
          {draft.image && (
            <div className="mt-2 h-24 w-32 rounded-xl overflow-hidden border border-black/8">
              <img
                src={draft.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Card Gradient Color</label>
          <select
            value={draft.color}
            onChange={(e) => set("color", e.target.value)}
            className={inputCls}
          >
            {COLOR_PRESETS.map((preset) => (
              <option key={preset.value} value={preset.value}>{preset.label}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card title="Full Description & Highlights">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Full Description</label>
          <textarea
            rows={5}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Detailed description shown on the product detail page…"
            className={`${inputCls} resize-none`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">
            Key Highlights
            <span className="ml-2 text-[10px] font-normal text-black/30 normal-case tracking-normal">one per line</span>
          </label>
          <textarea
            rows={7}
            value={draft.highlightsText}
            onChange={(e) => set("highlightsText", e.target.value)}
            placeholder={"Zero antibiotics or hormones\nFree-range, open-land raised\nHigher protein than commercial chicken"}
            className={`${inputCls} resize-y`}
          />
        </div>
      </Card>

      <Card title="SEO">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Meta Title</label>
          <input
            type="text"
            value={draft.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            placeholder="Product Name | Alliance Street Organic Farms"
            className={inputCls}
          />
          <p className={`text-xs mt-1 ${draft.metaTitle.length > 60 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaTitle.length}/60 characters recommended
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Meta Description</label>
          <textarea
            rows={3}
            value={draft.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            placeholder="Short description for Google search results (150–160 chars)…"
            className={`${inputCls} resize-none`}
          />
          <p className={`text-xs mt-1 ${draft.metaDescription.length > 160 ? "text-orange-500" : "text-black/30"}`}>
            {draft.metaDescription.length}/160 characters recommended
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn variant="primary" onClick={handleSave}>
          {isNew ? "Add Product" : "Save Changes"}
        </Btn>
      </div>
    </div>
  );
}

function ProductsView() {
  const [items, setItems] = useState<CmsProduct[]>(() => getCmsProducts().items);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<CmsProduct | null>(null);
  const [toast, setToast] = useState("");

  const persist = (updated: CmsProduct[]) => {
    saveCmsProducts(updated);
    setItems(updated);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSaveNew = (product: CmsProduct) => {
    persist([...items, product]);
    showToast("Product added");
    setView("list");
  };

  const handleSaveEdit = (product: CmsProduct) => {
    persist(items.map((p) => (p.slug === product.slug ? product : p)));
    showToast("Product saved");
    setView("list");
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    persist(items.filter((p) => p.slug !== slug));
    showToast("Product deleted");
  };

  if (view === "add") {
    return <ProductForm initial={BLANK_PRODUCT} onSave={handleSaveNew} onCancel={() => setView("list")} isNew />;
  }

  if (view === "edit" && editing) {
    return <ProductForm initial={editing} onSave={handleSaveEdit} onCancel={() => setView("list")} isNew={false} />;
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a14]">Products</h1>
          <p className="text-sm text-black/40 mt-0.5">{items.length} product{items.length !== 1 ? "s" : ""} listed</p>
        </div>
        <Btn variant="primary" onClick={() => setView("add")}>+ New Product</Btn>
      </div>

      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <div className="py-16 text-center text-black/30">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-sm font-medium">No products yet</p>
            <p className="text-xs mt-1">Click "+ New Product" to add your first item</p>
          </div>
        ) : (
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
              {items.map((p) => (
                <tr key={p.slug} className="hover:bg-black/[0.015] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#1a3a14]/8 flex-shrink-0">
                        <img
                          src={p.images?.[0] || p.image || ""}
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
                    <Badge color="gold">{p.tag || "—"}</Badge>
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#A87A0F]">{p.price}</td>
                  <td className="px-5 py-4 text-black/40 font-mono text-xs hidden md:table-cell">{p.slug}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Btn onClick={() => { setEditing(p); setView("edit"); }}>Edit</Btn>
                      <Btn variant="danger" onClick={() => handleDelete(p.slug)}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsView() {
  const s = getCmsSettings();
  const [draft, setDraft] = useState<SiteSettings>(loadSettings);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const set = (key: keyof SiteSettings, val: string) =>
    setDraft((d) => ({ ...d, [key]: val }));

  const handleSave = () => {
    saveSettings(draft);
    applySettingsPreview(draft);
    showToast("Settings saved");
  };

  const inputCls =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">Settings</h1>
        <p className="text-sm text-black/40 mt-0.5">Site identity, contact details and social links</p>
      </div>

      <Card title="Site Identity">
        <Field label="Farm / Business name" value={s.farmName} readOnly />
        <Field label="Tagline" value={s.tagline} readOnly />
        <Field label="Location" value={s.location} readOnly />
        <Field label="Established year" value={s.established} readOnly />
        <p className="text-xs text-black/30">Site name, tagline, location and year are configured in the codebase and cannot be changed here.</p>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Logo</label>
          <div className="flex items-center gap-4 p-4 border border-black/12 rounded-xl bg-[#faf6ef]">
            <img
              src={s.logoUrl}
              alt={s.logoAlt}
              className="h-12 w-auto object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1a3a14] truncate">{s.logoUrl}</p>
              <p className="text-xs text-black/40 mt-0.5">{s.logoAlt}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Contact Details">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Phone number</label>
          <input type="tel" value={draft.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Email address</label>
          <input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">WhatsApp URL</label>
          <p className="text-black/40 text-xs mb-1.5">e.g. https://wa.me/917375096163 or a QR link</p>
          <input type="text" value={draft.whatsappUrl} onChange={(e) => set("whatsappUrl", e.target.value)} className={inputCls} />
        </div>
      </Card>

      <Card title="Social Media">
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Instagram URL</label>
          <input type="text" value={draft.instagramUrl} onChange={(e) => set("instagramUrl", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">Facebook URL</label>
          <p className="text-black/40 text-xs mb-1.5">Leave blank to hide the Facebook link</p>
          <input type="text" value={draft.facebookUrl} onChange={(e) => set("facebookUrl", e.target.value)} className={inputCls} />
        </div>
      </Card>

      <div className="flex gap-3 justify-end">
        <Btn variant="primary" onClick={handleSave}>Save Changes</Btn>
      </div>
    </div>
  );
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

const SEO_PAGE_IDS: SectionId[] = [
  "home", "products", "breeds", "eggs", "goats", "philosophy", "about", "team", "contact",
];
const SEO_PAGE_LABELS: Record<SectionId, string> = {
  home: "Home",
  products: "Products",
  breeds: "Chicken Breeds",
  eggs: "Farm Eggs",
  goats: "Goats & Milk",
  philosophy: "Philosophy",
  about: "About Us",
  team: "Our Team",
  contact: "Contact / Order",
};
const BLANK_SEO_PAGE: CmsSeoPage = {
  title: "", description: "", keywords: "", ogTitle: "", ogDescription: "", ogImage: "",
};

function SeoView() {
  const inputCls =
    "w-full border border-black/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/40 focus:border-[#2d5a27] bg-white transition-colors";

  const [editingPage, setEditingPage] = useState<SectionId | null>(null);
  const [globalDraft, setGlobalDraft] = useState(() => loadSettings());
  const [pageOverrides, setPageOverrides] = useState(() => getCmsSeoPages());
  const [pageDraft, setPageDraft] = useState<CmsSeoPage>(BLANK_SEO_PAGE);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function setG(key: keyof ReturnType<typeof loadSettings>, val: string) {
    setGlobalDraft(d => ({ ...d, [key]: val }));
  }

  function saveGlobal() {
    saveSettings(globalDraft);
    applySettingsPreview(globalDraft);
    showToast("Global SEO saved & applied");
  }

  function startEditPage(id: SectionId) {
    const override = pageOverrides[id];
    if (override) {
      setPageDraft(override);
    } else {
      const eff = getSectionSeo(id);
      setPageDraft({
        title: eff.title,
        description: eff.description,
        keywords: eff.keywords,
        ogTitle: eff.ogTitle,
        ogDescription: eff.ogDescription,
        ogImage: eff.ogImage,
      });
    }
    setEditingPage(id);
  }

  function savePage() {
    if (!editingPage) return;
    const updated = { ...pageOverrides, [editingPage]: pageDraft };
    saveCmsSeoPages(updated);
    setPageOverrides(updated);
    showToast(`SEO saved for "${SEO_PAGE_LABELS[editingPage]}"`);
    setEditingPage(null);
  }

  function resetPage(id: SectionId) {
    if (!confirm(`Reset "${SEO_PAGE_LABELS[id]}" SEO to defaults?`)) return;
    const updated = { ...pageOverrides };
    delete updated[id];
    saveCmsSeoPages(updated);
    setPageOverrides({ ...updated });
    showToast("Reset to defaults");
  }

  function SeoField({
    label, hint, value, onChange, rows, limit,
  }: {
    label: string; hint?: string; value: string;
    onChange: (v: string) => void; rows?: number; limit?: number;
  }) {
    return (
      <div>
        <label className="block text-xs font-semibold text-[#1a3a14]/80 uppercase tracking-wider mb-1">{label}</label>
        {hint && <p className="text-black/40 text-xs mb-1.5">{hint}</p>}
        {rows ? (
          <textarea
            rows={rows}
            className={`${inputCls} resize-none`}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        ) : (
          <input className={inputCls} value={value} onChange={e => onChange(e.target.value)} />
        )}
        {limit !== undefined && (
          <p className={`text-right text-xs mt-1 ${value.length > limit ? "text-red-500" : "text-black/30"}`}>
            {value.length} / {limit}
          </p>
        )}
      </div>
    );
  }

  // ── Per-page edit view ──────────────────────────────────────────────────────
  if (editingPage) {
    const label = SEO_PAGE_LABELS[editingPage];
    return (
      <div className="space-y-6">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
            {toast}
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditingPage(null)}
            className="text-sm text-black/40 hover:text-black/70 transition-colors"
          >
            ← SEO
          </button>
          <span className="text-black/20">/</span>
          <h1 className="text-xl font-bold text-[#1a3a14]">{label}</h1>
        </div>

        <Card title="Search Engine">
          <SeoField
            label="Meta Title"
            hint="60 chars recommended"
            value={pageDraft.title}
            onChange={v => setPageDraft(d => ({ ...d, title: v }))}
            limit={60}
          />
          <SeoField
            label="Meta Description"
            hint="150–160 chars recommended"
            value={pageDraft.description}
            onChange={v => setPageDraft(d => ({ ...d, description: v }))}
            rows={3}
            limit={160}
          />
          <SeoField
            label="Keywords"
            hint="Comma-separated"
            value={pageDraft.keywords}
            onChange={v => setPageDraft(d => ({ ...d, keywords: v }))}
          />
        </Card>

        <Card title="Open Graph / Social Sharing">
          <SeoField
            label="OG Title"
            hint="Title shown on WhatsApp, Facebook, Twitter share cards"
            value={pageDraft.ogTitle}
            onChange={v => setPageDraft(d => ({ ...d, ogTitle: v }))}
            limit={60}
          />
          <SeoField
            label="OG Description"
            value={pageDraft.ogDescription}
            onChange={v => setPageDraft(d => ({ ...d, ogDescription: v }))}
            rows={3}
            limit={200}
          />
          <SeoField
            label="OG Image URL"
            hint="Recommended: 1200 × 630 px"
            value={pageDraft.ogImage}
            onChange={v => setPageDraft(d => ({ ...d, ogImage: v }))}
          />
          {pageDraft.ogImage && (
            <img
              src={pageDraft.ogImage}
              alt="OG preview"
              className="h-20 rounded-xl border border-black/10 object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
        </Card>

        <div className="flex gap-3 justify-end">
          <Btn onClick={() => setEditingPage(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={savePage}>Save Page SEO</Btn>
        </div>
      </div>
    );
  }

  // ── Global list view ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a3a14] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-xl font-bold text-[#1a3a14]">SEO</h1>
        <p className="text-sm text-black/40 mt-0.5">Search engine and social sharing metadata</p>
      </div>

      <Card title="Global Defaults">
        <div className="px-4 py-3 bg-black/[0.02] rounded-xl border border-black/6">
          <p className="text-xs text-black/50">
            <span className="font-semibold text-black/70">Site Name:</span>{" "}
            Alliance Street Organic Farms
            <span className="ml-2 text-black/30">— appended to every page title</span>
          </p>
        </div>
        <SeoField
          label="Home Page Title"
          hint="60 chars recommended — shown in browser tab & Google search result"
          value={globalDraft.pageTitle}
          onChange={v => setG("pageTitle", v)}
          limit={60}
        />
        <SeoField
          label="Default Meta Description"
          hint="150–160 chars — used for pages without a specific description"
          value={globalDraft.metaDescription}
          onChange={v => setG("metaDescription", v)}
          rows={3}
          limit={160}
        />
        <SeoField
          label="Default Keywords"
          hint="Comma-separated"
          value={globalDraft.metaKeywords}
          onChange={v => setG("metaKeywords", v)}
        />
      </Card>

      <Card title="Open Graph / Social Sharing">
        <SeoField
          label="OG Title"
          hint="Title shown when someone shares your site on WhatsApp, Facebook, Twitter"
          value={globalDraft.ogTitle}
          onChange={v => setG("ogTitle", v)}
          limit={60}
        />
        <SeoField
          label="OG Description"
          hint="Description shown in social share preview cards"
          value={globalDraft.ogDescription}
          onChange={v => setG("ogDescription", v)}
          rows={3}
          limit={200}
        />
        <SeoField
          label="OG Image URL"
          hint="Recommended: 1200 × 630 px — shown as thumbnail when the link is shared"
          value={globalDraft.ogImage}
          onChange={v => setG("ogImage", v)}
        />
        {globalDraft.ogImage && (
          <img
            src={globalDraft.ogImage}
            alt="OG image preview"
            className="h-20 rounded-xl border border-black/10 object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}
      </Card>

      <Card title="Per-Page SEO">
        <div className="rounded-xl border border-black/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/2 border-b border-black/6">
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/40 uppercase tracking-wider">Page</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-black/40 uppercase tracking-wider hidden md:table-cell">Title in browser</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {SEO_PAGE_IDS.map(id => {
                const override = pageOverrides[id];
                const effective = getSectionSeo(id);
                return (
                  <tr key={id} className="hover:bg-black/[0.02]">
                    <td className="px-4 py-3.5">
                      <span className="font-medium text-[#1a3a14]">{SEO_PAGE_LABELS[id]}</span>
                      {override && (
                        <span className="ml-2 text-[10px] bg-[#DBA319]/15 text-[#A87A0F] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          custom
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-black/45 hidden md:table-cell text-xs truncate max-w-xs">
                      {effective.fullTitle}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {override && (
                          <Btn onClick={() => resetPage(id)}>Reset</Btn>
                        )}
                        <Btn onClick={() => startEditPage(id)}>Edit</Btn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-black/40">
          Blog posts and individual products have SEO settings editable from the Blog and Products sections.
        </p>
      </Card>

      <div className="flex gap-3 justify-end">
        <Btn variant="primary" onClick={saveGlobal}>Save & Apply Global SEO</Btn>
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
  open = false,
  onClose = () => {},
}: {
  active: Section;
  onNavigate: (s: Section) => void;
  onLogout: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const navigate = (id: Section) => { onNavigate(id); onClose(); };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 md:static md:z-auto md:inset-auto
          w-64 md:w-56 flex-shrink-0 bg-[#0f1e0c] flex flex-col
          transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-white text-xs font-bold leading-tight truncate">Alliance Street</p>
              <p className="text-white/40 text-[10px] leading-tight">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-white/40 hover:text-white/70 transition-colors p-1 ml-2 flex-shrink-0"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
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
    </>
  );
}

// ─── Admin shell ──────────────────────────────────────────────────────────────

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (s: Section) => {
    setSection(s);
    setSidebarOpen(false);
  };

  const views: Record<Section, React.ReactNode> = {
    dashboard: <DashboardView onNavigate={navigate} />,
    pages:     <PagesView />,
    blog:      <BlogView />,
    products:  <ProductsView />,
    settings:  <SettingsView />,
    seo:       <SeoView />,
  };

  return (
    <div className="flex min-h-screen bg-[#f2ede4]">
      <Sidebar
        active={section}
        onNavigate={navigate}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-auto min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#f2ede4]/90 backdrop-blur-md border-b border-black/6 px-4 sm:px-8 py-3.5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-black/8 transition-colors"
              aria-label="Open menu"
            >
              <span className="block w-5 h-0.5 bg-black/60 rounded-full" />
              <span className="block w-5 h-0.5 bg-black/60 rounded-full" />
              <span className="block w-4 h-0.5 bg-black/60 rounded-full" />
            </button>
            <p className="text-xs font-semibold text-black/30 uppercase tracking-widest">
              {NAV.find((n) => n.id === section)?.label}
            </p>
          </div>
        </header>

        <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-4xl">
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
