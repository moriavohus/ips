"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);
  const [rebuildMsg, setRebuildMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin");
          return;
        }
        setAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  async function handleRebuild() {
    setRebuilding(true);
    setRebuildMsg(null);
    try {
      const res = await fetch("/api/admin/rebuild", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setRebuildMsg({ type: "success", text: "Site rebuilt and deployed! Changes are now live." });
      } else {
        setRebuildMsg({ type: "error", text: data.error || "Build failed. Check logs." });
      }
    } catch {
      setRebuildMsg({ type: "error", text: "Connection error." });
    } finally {
      setRebuilding(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-type-secondary">Loading...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  const sections = [
    {
      title: "Products",
      description: "Manage product names, descriptions, and technical specifications across all languages (EN, RU, AR).",
      href: "/admin/products",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      count: "4 products",
    },
    {
      title: "Documents",
      description: "Manage technical datasheets, brochures, installation guidelines, and company presentations.",
      href: "/admin/documents",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      count: "4 sections",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border-subtle">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">IPS</span>
            </div>
            <div>
              <span className="text-base font-bold text-black">Admin Panel</span>
              <span className="text-xs text-type-third ml-3">IPS Middle East</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-bold text-type-third uppercase tracking-wider hover:text-type-brand transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1920px] mx-auto px-6 md:px-10 py-10">
        <div className="mb-10">
          <h1 className="font-display text-h3 md:text-h3 font-normal tracking-tight text-black mb-2">
            Dashboard
          </h1>
          <p className="text-base text-type-secondary">
            Manage your website content across all languages
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((section) => (
            <Link key={section.title} href={section.href} className="group">
              <div className="bg-white rounded-[14px] p-8 md:p-10 transition-all hover:shadow-md border border-transparent hover:border-border-subtle">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                    {section.icon}
                  </div>
                  <span className="text-xs font-bold text-type-third uppercase tracking-wider">
                    {section.count}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-black mb-2 group-hover:text-type-brand transition-colors">
                  {section.title}
                </h2>
                <p className="text-sm text-type-secondary leading-relaxed">
                  {section.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-black uppercase tracking-wider group-hover:text-type-brand transition-colors">
                  Manage
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rebuild & Deploy */}
        <div className="mt-8 bg-white rounded-[14px] p-8 md:p-10 border border-transparent">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Rebuild & Deploy</h3>
              <p className="text-sm text-type-secondary leading-relaxed max-w-xl">
                After editing products or documents, rebuild the site to make changes live. This takes about 20-30 seconds.
              </p>
            </div>
            <button
              onClick={handleRebuild}
              disabled={rebuilding}
              className="shrink-0 ml-6 px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-surface-darker transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {rebuilding ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Building...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  Rebuild & Deploy
                </>
              )}
            </button>
          </div>
          {rebuildMsg && (
            <div className={`mt-4 px-5 py-3.5 rounded-[12px] text-sm font-medium ${rebuildMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-type-brand"}`}>
              {rebuildMsg.text}
            </div>
          )}
        </div>

        {/* Info Block */}
        <div className="mt-8 bg-white rounded-[14px] p-8 md:p-10">
          <h3 className="text-lg font-bold text-black mb-4">How it works</h3>
          <div className="space-y-3 text-sm text-type-secondary leading-relaxed">
            <p>
              <span className="font-bold text-black">Products:</span> Edit product names, descriptions, and technical specifications. Changes apply to the selected language version of the site.
            </p>
            <p>
              <span className="font-bold text-black">Documents:</span> Manage document sections (datasheets, brochures, guidelines, presentations). Add, edit, or remove document entries.
            </p>
            <p>
              <span className="font-bold text-black">Languages:</span> Each change is saved per language (EN, RU, AR). Select the language tab before editing to modify that specific version.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
