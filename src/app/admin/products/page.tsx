"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── types ── */
type PropertyRow = { prop: string; method?: string; value?: string };
type DownloadItem = { title: string; meta: string; url: string };
type SubProduct = { image: string; eyebrow: string; title: string; textHtml: string };
type ProductTypeItem = { title: string; desc: string };
type ComplianceItem = { title: string; desc: string };

type PortfolioProduct = {
  id?: string;
  name?: string;
  image?: string;
  overviewText?: string;
  applicationsList?: string[];
  applicationsLabel?: string;
  applicationsText?: string;
  properties?: PropertyRow[];
  properties2?: PropertyRow[];
  propertyTable2?: { property?: string; availability?: string };
  supplyFormsList?: string[];
  supplyFormsLabel?: string;
  supplyFormsFootnote?: string;
  designGuidanceList?: string[];
  installationNotesList?: string[];
  downloadsList?: DownloadItem[];
  subProducts?: SubProduct[];
  featuresLabel?: string;
  featuresList?: string[];
  complianceLabel?: string;
  complianceText1?: string;
  complianceText2?: string;
  complianceList?: ComplianceItem[];
  complianceImages?: string[];
  productTypesLabel?: string;
  productTypesList?: ProductTypeItem[];
  [key: string]: unknown;
};

type CardProduct = {
  name?: string;
  short?: string;
  description?: string;
  specs?: Record<string, string>;
  [key: string]: unknown;
};

type LocaleData = {
  portfolio: Record<string, PortfolioProduct>;
  cards: Record<string, CardProduct>;
};

const PRODUCT_KEYS = ["cellularGlass", "mineralWool", "stainlessAccessories", "coatings"];
const PRODUCT_LABELS: Record<string, string> = {
  cellularGlass: "Cellular Glass",
  mineralWool: "Mineral Wool",
  stainlessAccessories: "Stainless Accessories",
  coatings: "Coatings & Jacketing",
};
const LOCALES = ["en", "ru", "ar"] as const;
const LOCALE_LABELS: Record<string, string> = { en: "English", ru: "Russian", ar: "Arabic" };

/* ── shared input styles ── */
const inputCls = "w-full px-4 py-3 bg-background rounded-[12px] text-sm text-black outline-none border-2 border-transparent focus:border-black transition-colors";
const textareaCls = inputCls + " resize-none";
const labelCls = "block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3";
const sectionCls = "bg-background rounded-[16px] p-5 space-y-3";
const btnDanger = "w-8 h-8 flex items-center justify-center rounded-full bg-white text-type-third hover:bg-red-50 hover:text-red-600 transition-all shrink-0";
const addBtnCls = "text-xs font-bold text-type-third uppercase tracking-wider hover:text-black transition-colors";

/* ── tiny X icon ── */
function XIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ──────── COMPONENT ──────── */
export default function AdminProducts() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [data, setData] = useState<Record<string, LocaleData>>({});
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editPortfolio, setEditPortfolio] = useState<PortfolioProduct | null>(null);
  const [editCard, setEditCard] = useState<CardProduct | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"detail" | "card">("detail");
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    if (!res.ok) { router.push("/admin"); return; }
    const json = await res.json();
    setData(json.data);
    setAuthenticated(true);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function startEditing(key: string) {
    const locale = data[activeLocale];
    if (!locale) return;
    const p = locale.portfolio[key] || {};
    const c = locale.cards[key] || {};
    setEditingProduct(key);
    setEditPortfolio(JSON.parse(JSON.stringify(p)));
    setEditCard(JSON.parse(JSON.stringify(c)));
    setActiveTab("detail");
  }

  function cancelEditing() {
    setEditingProduct(null);
    setEditPortfolio(null);
    setEditCard(null);
  }

  async function save() {
    if (!editingProduct) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: activeLocale,
          productKey: editingProduct,
          portfolioData: editPortfolio,
          cardData: editCard,
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Product updated!" });
        await fetchProducts();
        cancelEditing();
      } else {
        setMessage({ type: "error", text: "Failed to save." });
      }
    } catch {
      setMessage({ type: "error", text: "Connection error." });
    } finally {
      setSaving(false);
    }
  }

  /* ── helpers to mutate editPortfolio ── */
  function setP(patch: Partial<PortfolioProduct>) {
    setEditPortfolio((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  /* ── string list helpers ── */
  function renderStringList(
    field: keyof PortfolioProduct,
    label: string,
  ) {
    if (!editPortfolio) return null;
    const list = (editPortfolio[field] as string[] | undefined) || [];
    return (
      <div>
        <label className={labelCls}>{label}</label>
        <div className={sectionCls}>
          {list.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls}
                value={item}
                onChange={(e) => {
                  const u = [...list];
                  u[i] = e.target.value;
                  setP({ [field]: u });
                }}
              />
              <button className={btnDanger} onClick={() => setP({ [field]: list.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ [field]: [...list, ""] })}>
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  /* ── properties table (3-col: prop / method / value) ── */
  function renderProperties() {
    if (!editPortfolio || !editPortfolio.properties) return null;
    const rows = editPortfolio.properties;
    return (
      <div>
        <label className={labelCls}>Properties Table (3-column)</label>
        <div className={sectionCls}>
          <div className="grid grid-cols-[1fr_1fr_1fr_32px] gap-2 text-xs font-bold text-type-third uppercase mb-1">
            <span>Property</span><span>Test Method</span><span>Value</span><span />
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_32px] gap-2">
              <input className={inputCls} value={row.prop} onChange={(e) => {
                const u = [...rows]; u[i] = { ...u[i], prop: e.target.value }; setP({ properties: u });
              }} />
              <input className={inputCls} value={row.method || ""} onChange={(e) => {
                const u = [...rows]; u[i] = { ...u[i], method: e.target.value }; setP({ properties: u });
              }} />
              <input className={inputCls} value={row.value || ""} onChange={(e) => {
                const u = [...rows]; u[i] = { ...u[i], value: e.target.value }; setP({ properties: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ properties: rows.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ properties: [...rows, { prop: "", method: "—", value: "" }] })}>
            + Add Row
          </button>
        </div>
      </div>
    );
  }

  /* ── properties2 table (2-col: prop / value) ── */
  function renderProperties2() {
    if (!editPortfolio || !editPortfolio.properties2) return null;
    const rows = editPortfolio.properties2;
    return (
      <div>
        <label className={labelCls}>Properties Table (2-column)</label>
        {editPortfolio.propertyTable2 && (
          <div className="flex gap-2 mb-2">
            <input className={inputCls} placeholder="Property header" value={editPortfolio.propertyTable2.property || ""}
              onChange={(e) => setP({ propertyTable2: { ...editPortfolio.propertyTable2, property: e.target.value } })} />
            <input className={inputCls} placeholder="Availability header" value={editPortfolio.propertyTable2.availability || ""}
              onChange={(e) => setP({ propertyTable2: { ...editPortfolio.propertyTable2, availability: e.target.value } })} />
          </div>
        )}
        <div className={sectionCls}>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_32px] gap-2">
              <input className={inputCls} value={row.prop} onChange={(e) => {
                const u = [...rows]; u[i] = { ...u[i], prop: e.target.value }; setP({ properties2: u });
              }} />
              <input className={inputCls} value={row.value || ""} placeholder="(checkmark if empty)" onChange={(e) => {
                const u = [...rows]; u[i] = { ...u[i], value: e.target.value }; setP({ properties2: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ properties2: rows.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ properties2: [...rows, { prop: "", value: "" }] })}>
            + Add Row
          </button>
        </div>
      </div>
    );
  }

  /* ── downloads list ── */
  function renderDownloads() {
    if (!editPortfolio || !editPortfolio.downloadsList) return null;
    const items = editPortfolio.downloadsList;
    return (
      <div>
        <label className={labelCls}>Downloads</label>
        <div className={sectionCls}>
          {items.map((dl, i) => (
            <div key={i} className="flex gap-2 items-center bg-white rounded-[12px] p-3">
              <input className={inputCls} placeholder="Title" value={dl.title} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], title: e.target.value }; setP({ downloadsList: u });
              }} />
              <input className={inputCls + " !w-28"} placeholder="PDF, 15 MB" value={dl.meta} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], meta: e.target.value }; setP({ downloadsList: u });
              }} />
              <input className={inputCls} placeholder="/docs/file.pdf" value={dl.url} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], url: e.target.value }; setP({ downloadsList: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ downloadsList: items.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ downloadsList: [...items, { title: "", meta: "PDF, 15 MB", url: "#" }] })}>
            + Add Download
          </button>
        </div>
      </div>
    );
  }

  /* ── subProducts ── */
  function renderSubProducts() {
    if (!editPortfolio || !editPortfolio.subProducts) return null;
    const items = editPortfolio.subProducts;
    return (
      <div>
        <label className={labelCls}>Sub-Products</label>
        <div className="space-y-4">
          {items.map((sub, i) => (
            <div key={i} className="bg-white rounded-[12px] p-4 space-y-2 border border-background">
              <div className="flex gap-2">
                <input className={inputCls} placeholder="Image path" value={sub.image} onChange={(e) => {
                  const u = [...items]; u[i] = { ...u[i], image: e.target.value }; setP({ subProducts: u });
                }} />
                <input className={inputCls} placeholder="Eyebrow" value={sub.eyebrow} onChange={(e) => {
                  const u = [...items]; u[i] = { ...u[i], eyebrow: e.target.value }; setP({ subProducts: u });
                }} />
                <button className={btnDanger} onClick={() => setP({ subProducts: items.filter((_, j) => j !== i) })}>
                  <XIcon />
                </button>
              </div>
              <input className={inputCls} placeholder="Title" value={sub.title} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], title: e.target.value }; setP({ subProducts: u });
              }} />
              <textarea className={textareaCls} rows={3} placeholder="Text (HTML)" value={sub.textHtml} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], textHtml: e.target.value }; setP({ subProducts: u });
              }} />
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ subProducts: [...items, { image: "", eyebrow: "", title: "", textHtml: "" }] })}>
            + Add Sub-Product
          </button>
        </div>
      </div>
    );
  }

  /* ── productTypesList ── */
  function renderProductTypes() {
    if (!editPortfolio || !editPortfolio.productTypesList) return null;
    const items = editPortfolio.productTypesList;
    return (
      <div>
        <label className={labelCls}>Product Types</label>
        {editPortfolio.productTypesLabel !== undefined && (
          <input className={inputCls + " mb-2"} placeholder="Label" value={editPortfolio.productTypesLabel || ""}
            onChange={(e) => setP({ productTypesLabel: e.target.value })} />
        )}
        <div className={sectionCls}>
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={inputCls + " !w-1/3"} placeholder="Title" value={item.title} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], title: e.target.value }; setP({ productTypesList: u });
              }} />
              <input className={inputCls} placeholder="Description" value={item.desc} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], desc: e.target.value }; setP({ productTypesList: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ productTypesList: items.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ productTypesList: [...items, { title: "", desc: "" }] })}>
            + Add Type
          </button>
        </div>
      </div>
    );
  }

  /* ── compliance ── */
  function renderCompliance() {
    if (!editPortfolio || !editPortfolio.complianceLabel) return null;
    const items = editPortfolio.complianceList || [];
    const images = editPortfolio.complianceImages || [];
    return (
      <div className="space-y-4">
        <label className={labelCls}>Compliance & Standards</label>
        <input className={inputCls} placeholder="Section label" value={editPortfolio.complianceLabel || ""}
          onChange={(e) => setP({ complianceLabel: e.target.value })} />
        <textarea className={textareaCls} rows={3} placeholder="Text paragraph 1" value={editPortfolio.complianceText1 || ""}
          onChange={(e) => setP({ complianceText1: e.target.value })} />

        <div className={sectionCls}>
          <span className="text-xs font-bold text-type-third uppercase">Compliance Items</span>
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={inputCls + " !w-1/3"} placeholder="Title" value={item.title} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], title: e.target.value }; setP({ complianceList: u });
              }} />
              <input className={inputCls} placeholder="Description" value={item.desc} onChange={(e) => {
                const u = [...items]; u[i] = { ...u[i], desc: e.target.value }; setP({ complianceList: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ complianceList: items.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ complianceList: [...items, { title: "", desc: "" }] })}>
            + Add Item
          </button>
        </div>

        <textarea className={textareaCls} rows={3} placeholder="Text paragraph 2" value={editPortfolio.complianceText2 || ""}
          onChange={(e) => setP({ complianceText2: e.target.value })} />

        <div className={sectionCls}>
          <span className="text-xs font-bold text-type-third uppercase">Compliance Images</span>
          {images.map((img, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={inputCls} placeholder="/images/compliance.png" value={img} onChange={(e) => {
                const u = [...images]; u[i] = e.target.value; setP({ complianceImages: u });
              }} />
              <button className={btnDanger} onClick={() => setP({ complianceImages: images.filter((_, j) => j !== i) })}>
                <XIcon />
              </button>
            </div>
          ))}
          <button className={addBtnCls} onClick={() => setP({ complianceImages: [...images, ""] })}>
            + Add Image
          </button>
        </div>
      </div>
    );
  }

  /* ── card tab ── */
  function renderCardTab() {
    if (!editCard) return null;
    return (
      <div className="space-y-5">
        <p className="text-xs text-type-secondary bg-background rounded-[12px] px-4 py-3">
          These fields appear on the homepage product grid cards.
        </p>
        <div>
          <label className={labelCls}>Card Name</label>
          <input className={inputCls} value={editCard.name || ""} onChange={(e) => setEditCard({ ...editCard, name: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Short Description</label>
          <textarea className={textareaCls} rows={3} value={editCard.short || ""} onChange={(e) => setEditCard({ ...editCard, short: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Full Description</label>
          <textarea className={textareaCls} rows={4} value={editCard.description || ""} onChange={(e) => setEditCard({ ...editCard, description: e.target.value })} />
        </div>
      </div>
    );
  }

  /* ── loading / auth ── */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-lg text-type-secondary">Loading...</div>
    </div>
  );
  if (!authenticated) return null;

  const localeData = data[activeLocale];
  const portfolio = localeData?.portfolio || {};
  const cards = localeData?.cards || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border-subtle">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">IPS</span>
              </div>
              <svg className="w-5 h-5 text-black-thout" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
            <span className="text-base font-bold text-black">Products</span>
          </div>
          <Link href="/admin/dashboard" className="text-sm font-bold text-type-third uppercase tracking-wider hover:text-black transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 md:px-10 py-10">
        <div className="mb-8">
          <h1 className="font-display text-h3 md:text-h3 font-normal tracking-tight text-black mb-2">Product Management</h1>
          <p className="text-base text-type-secondary">Edit product detail pages and homepage cards for each language</p>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 mb-8">
          {LOCALES.map((locale) => (
            <button key={locale} onClick={() => { setActiveLocale(locale); cancelEditing(); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${activeLocale === locale ? "bg-black text-white" : "bg-white text-type-secondary hover:bg-border-subtle"}`}>
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>

        {message && (
          <div className={`mb-6 px-5 py-3.5 rounded-[16px] text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-type-brand"}`}>
            {message.text}
          </div>
        )}

        {/* Product Cards */}
        <div className="space-y-4">
          {PRODUCT_KEYS.map((key, index) => {
            const p = portfolio[key];
            const c = cards[key];
            const name = p?.name || c?.name || PRODUCT_LABELS[key];
            const isEditing = editingProduct === key;

            return (
              <div key={key} className="bg-white rounded-[14px] overflow-hidden border border-transparent hover:border-border-subtle transition-all">
                {/* Header */}
                <div className="p-8 md:p-10 cursor-pointer flex items-start justify-between" onClick={() => !isEditing && startEditing(key)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-type-third">0{index + 1}</span>
                      <h3 className="text-xl font-bold text-black">{name}</h3>
                    </div>
                    <p className="text-sm text-type-secondary max-w-3xl">{c?.short || p?.overviewText?.slice(0, 120) || "—"}</p>
                  </div>
                  {!isEditing && (
                    <button onClick={(e) => { e.stopPropagation(); startEditing(key); }}
                      className="shrink-0 ml-4 px-5 py-2.5 bg-background rounded-full text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all">
                      Edit
                    </button>
                  )}
                </div>

                {/* Edit Form */}
                {isEditing && editPortfolio && editCard && (
                  <div className="px-8 md:px-10 pb-8 md:pb-10 border-t border-background pt-6">
                    {/* Detail / Card tabs */}
                    <div className="flex gap-2 mb-6">
                      <button onClick={() => setActiveTab("detail")}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "detail" ? "bg-black text-white" : "bg-background text-type-secondary"}`}>
                        Detail Page
                      </button>
                      <button onClick={() => setActiveTab("card")}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "card" ? "bg-black text-white" : "bg-background text-type-secondary"}`}>
                        Homepage Card
                      </button>
                    </div>

                    {activeTab === "card" ? renderCardTab() : (
                      <div className="space-y-6">
                        {/* Basic info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={labelCls}>Product Name</label>
                            <input className={inputCls} value={editPortfolio.name || ""} onChange={(e) => setP({ name: e.target.value })} />
                          </div>
                          <div>
                            <label className={labelCls}>Image Path</label>
                            <input className={inputCls} value={editPortfolio.image || ""} onChange={(e) => setP({ image: e.target.value })} />
                          </div>
                        </div>

                        {editPortfolio.overviewText !== undefined && (
                          <div>
                            <label className={labelCls}>Overview Text</label>
                            <textarea className={textareaCls} rows={4} value={editPortfolio.overviewText || ""}
                              onChange={(e) => setP({ overviewText: e.target.value })} />
                          </div>
                        )}

                        {/* Dynamic sections based on what data exists */}
                        {editPortfolio.applicationsList && renderStringList("applicationsList", "Applications List")}
                        {editPortfolio.applicationsText !== undefined && (
                          <div>
                            <label className={labelCls}>Applications Text</label>
                            <textarea className={textareaCls} rows={3} value={editPortfolio.applicationsText || ""}
                              onChange={(e) => setP({ applicationsText: e.target.value })} />
                          </div>
                        )}
                        {editPortfolio.applicationsLabel !== undefined && (
                          <div>
                            <label className={labelCls}>Applications Label</label>
                            <input className={inputCls} value={editPortfolio.applicationsLabel || ""}
                              onChange={(e) => setP({ applicationsLabel: e.target.value })} />
                          </div>
                        )}

                        {renderProperties()}
                        {renderProperties2()}
                        {renderSubProducts()}
                        {renderProductTypes()}

                        {editPortfolio.featuresList && (
                          <>
                            {editPortfolio.featuresLabel !== undefined && (
                              <div>
                                <label className={labelCls}>Features Label</label>
                                <input className={inputCls} value={editPortfolio.featuresLabel || ""}
                                  onChange={(e) => setP({ featuresLabel: e.target.value })} />
                              </div>
                            )}
                            {renderStringList("featuresList", "Features List")}
                          </>
                        )}

                        {renderCompliance()}

                        {editPortfolio.supplyFormsList && (
                          <>
                            {editPortfolio.supplyFormsLabel !== undefined && (
                              <div>
                                <label className={labelCls}>Supply Forms Label</label>
                                <input className={inputCls} value={editPortfolio.supplyFormsLabel || ""}
                                  onChange={(e) => setP({ supplyFormsLabel: e.target.value })} />
                              </div>
                            )}
                            {renderStringList("supplyFormsList", "Supply Forms")}
                            {editPortfolio.supplyFormsFootnote !== undefined && (
                              <div>
                                <label className={labelCls}>Supply Forms Footnote</label>
                                <input className={inputCls} value={editPortfolio.supplyFormsFootnote || ""}
                                  onChange={(e) => setP({ supplyFormsFootnote: e.target.value })} />
                              </div>
                            )}
                          </>
                        )}

                        {editPortfolio.designGuidanceList && renderStringList("designGuidanceList", "Design Guidance")}
                        {editPortfolio.installationNotesList && renderStringList("installationNotesList", "Installation Notes")}
                        {renderDownloads()}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-6">
                      <button onClick={save} disabled={saving}
                        className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-surface-darker transition-all disabled:opacity-50">
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button onClick={cancelEditing}
                        className="px-8 py-3 bg-background text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-border-subtle transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
