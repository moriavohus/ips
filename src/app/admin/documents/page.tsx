"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type DocItem = { title: string; meta: string; url?: string };

type DocSection = {
  num: string;
  title: string;
  subtitle: string;
  points: string[];
  items: DocItem[];
};

type DocumentsData = {
  sections: Record<string, DocSection>;
  [key: string]: unknown;
};

const SECTION_KEYS = ["datasheets", "brochures", "guidelines", "presentation"];
const LOCALES = ["en", "ru", "ar"] as const;
const LOCALE_LABELS: Record<string, string> = { en: "English", ru: "Russian", ar: "Arabic" };

export default function AdminDocuments() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [documents, setDocuments] = useState<Record<string, DocumentsData>>({});
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<DocSection | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState<DocItem>({ title: "", meta: "PDF, 15 MB", url: "" });
  const router = useRouter();

  const fetchDocuments = useCallback(async () => {
    const res = await fetch("/api/admin/documents");
    if (!res.ok) {
      router.push("/admin");
      return;
    }
    const data = await res.json();
    setDocuments(data.documents);
    setAuthenticated(true);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  function startEditing(key: string) {
    const current = documents[activeLocale]?.sections?.[key];
    if (current) {
      setEditingSection(key);
      setEditData({
        ...current,
        points: [...current.points],
        items: current.items.map((item: DocItem) => ({ ...item })),
      });
      setShowAddItem(false);
      setNewItem({ title: "", meta: "PDF, 15 MB", url: "" });
    }
  }

  function cancelEditing() {
    setEditingSection(null);
    setEditData(null);
    setShowAddItem(false);
  }

  async function saveSection() {
    if (!editingSection || !editData) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/documents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: activeLocale,
          sectionKey: editingSection,
          data: editData,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Section updated successfully!" });
        await fetchDocuments();
        cancelEditing();
      } else {
        setMessage({ type: "error", text: "Failed to save changes." });
      }
    } catch {
      setMessage({ type: "error", text: "Connection error." });
    } finally {
      setSaving(false);
    }
  }

  function addItem() {
    if (!editData || !newItem.title.trim()) return;
    setEditData({
      ...editData,
      items: [...editData.items, { ...newItem }],
    });
    setNewItem({ title: "", meta: "PDF, 15 MB", url: "" });
    setShowAddItem(false);
  }

  function removeItem(index: number) {
    if (!editData) return;
    setEditData({
      ...editData,
      items: editData.items.filter((_, i) => i !== index),
    });
  }

  function updateItem(index: number, field: keyof DocItem, value: string) {
    if (!editData) return;
    const updated = [...editData.items];
    updated[index] = { ...updated[index], [field]: value };
    setEditData({ ...editData, items: updated });
  }

  function updatePoint(index: number, value: string) {
    if (!editData) return;
    const updated = [...editData.points];
    updated[index] = value;
    setEditData({ ...editData, points: updated });
  }

  function addPoint() {
    if (!editData) return;
    setEditData({ ...editData, points: [...editData.points, ""] });
  }

  function removePoint(index: number) {
    if (!editData) return;
    setEditData({
      ...editData,
      points: editData.points.filter((_, i) => i !== index),
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-type-secondary">Loading...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  const currentDocs = documents[activeLocale]?.sections || {};

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
            <span className="text-base font-bold text-black">Documents</span>
          </div>
          <Link href="/admin/dashboard" className="text-sm font-bold text-type-third uppercase tracking-wider hover:text-black transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 md:px-10 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-h3 md:text-h3 font-normal tracking-tight text-black mb-2">
            Document Management
          </h1>
          <p className="text-base text-type-secondary">
            Edit document sections and items for each language
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 mb-8">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => {
                setActiveLocale(locale);
                cancelEditing();
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeLocale === locale
                  ? "bg-black text-white"
                  : "bg-white text-type-secondary hover:bg-border-subtle"
              }`}
            >
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 px-5 py-3.5 rounded-[16px] text-sm font-medium ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-type-brand"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Document Section Cards */}
        <div className="space-y-4">
          {SECTION_KEYS.map((key) => {
            const section = currentDocs[key];
            if (!section) return null;

            const isEditing = editingSection === key;

            return (
              <div key={key} className="bg-white rounded-[14px] overflow-hidden border border-transparent hover:border-border-subtle transition-all">
                {/* Section Header */}
                <div
                  className="p-8 md:p-10 cursor-pointer flex items-start justify-between"
                  onClick={() => !isEditing && startEditing(key)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-type-third">{section.num}</span>
                      <h3 className="text-xl font-bold text-black">{section.title}</h3>
                    </div>
                    <p className="text-sm text-type-secondary max-w-3xl mb-3">{section.subtitle}</p>
                    <span className="text-xs text-type-third font-bold uppercase tracking-wider">
                      {section.items?.length || 0} documents
                    </span>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(key);
                      }}
                      className="shrink-0 ml-4 px-5 py-2.5 bg-background rounded-full text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Edit Form */}
                {isEditing && editData && (
                  <div className="px-8 md:px-10 pb-8 md:pb-10 border-t border-background pt-8">
                    <div className="space-y-6">
                      {/* Section Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3">
                            Section Number
                          </label>
                          <input
                            type="text"
                            value={editData.num}
                            onChange={(e) => setEditData({ ...editData, num: e.target.value })}
                            className="w-full px-4 py-3.5 bg-background rounded-[12px] text-base text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="w-full px-4 py-3.5 bg-background rounded-[12px] text-base text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3">
                          Subtitle
                        </label>
                        <textarea
                          value={editData.subtitle}
                          onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-3.5 bg-background rounded-[12px] text-base text-black outline-none border-2 border-transparent focus:border-black transition-colors resize-none"
                        />
                      </div>

                      {/* Points */}
                      <div>
                        <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-4">
                          Included Points
                        </label>
                        <div className="bg-background rounded-[16px] p-5 space-y-3">
                          {editData.points.map((point, i) => (
                            <div key={i} className="flex gap-3 items-center">
                              <input
                                type="text"
                                value={point}
                                onChange={(e) => updatePoint(i, e.target.value)}
                                className="flex-1 px-3 py-2.5 bg-white rounded-[8px] text-sm text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                              />
                              <button
                                onClick={() => removePoint(i)}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-type-third hover:bg-red-50 hover:text-type-brand transition-all shrink-0"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addPoint}
                            className="text-xs font-bold text-type-third uppercase tracking-wider hover:text-black transition-colors"
                          >
                            + Add Point
                          </button>
                        </div>
                      </div>

                      {/* Document Items */}
                      <div>
                        <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-4">
                          Document Items
                        </label>
                        <div className="bg-background rounded-[16px] p-5 space-y-3">
                          {editData.items.map((item, i) => (
                            <div key={i} className="flex gap-3 items-center bg-white rounded-[12px] p-4">
                              <div className="flex-1 space-y-2">
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => updateItem(i, "title", e.target.value)}
                                  placeholder="Document title"
                                  className="w-full px-3 py-2 bg-background rounded-[8px] text-sm text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={item.meta}
                                    onChange={(e) => updateItem(i, "meta", e.target.value)}
                                    placeholder="e.g. PDF, 15 MB"
                                    className="w-1/3 px-3 py-2 bg-background rounded-[8px] text-xs text-type-secondary outline-none border-2 border-transparent focus:border-black transition-colors"
                                  />
                                  <input
                                    type="text"
                                    value={item.url || ""}
                                    onChange={(e) => updateItem(i, "url", e.target.value)}
                                    placeholder="/docs/filename.pdf"
                                    className="flex-1 px-3 py-2 bg-background rounded-[8px] text-xs text-type-secondary outline-none border-2 border-transparent focus:border-black transition-colors"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 shrink-0">
                                {item.url && item.url !== "#" && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-all"
                                    title="Preview PDF"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                  </a>
                                )}
                                <button
                                  onClick={() => removeItem(i)}
                                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background text-type-third hover:bg-red-50 hover:text-type-brand transition-all"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Add New Item */}
                          {showAddItem ? (
                            <div className="bg-white rounded-[12px] p-4 border-2 border-dashed border-black-thout">
                              <div className="space-y-2 mb-3">
                                <input
                                  type="text"
                                  value={newItem.title}
                                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                  placeholder="Document title"
                                  className="w-full px-3 py-2 bg-background rounded-[8px] text-sm text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={newItem.meta}
                                    onChange={(e) => setNewItem({ ...newItem, meta: e.target.value })}
                                    placeholder="e.g. PDF, 15 MB"
                                    className="w-1/3 px-3 py-2 bg-background rounded-[8px] text-xs text-type-secondary outline-none border-2 border-transparent focus:border-black transition-colors"
                                  />
                                  <input
                                    type="text"
                                    value={newItem.url || ""}
                                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                                    placeholder="/docs/filename.pdf"
                                    className="flex-1 px-3 py-2 bg-background rounded-[8px] text-xs text-type-secondary outline-none border-2 border-transparent focus:border-black transition-colors"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={addItem}
                                  className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-surface-darker transition-all"
                                >
                                  Add
                                </button>
                                <button
                                  onClick={() => setShowAddItem(false)}
                                  className="px-4 py-2 bg-background text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-border-subtle transition-all"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowAddItem(true)}
                              className="text-xs font-bold text-type-third uppercase tracking-wider hover:text-black transition-colors"
                            >
                              + Add Document
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={saveSection}
                          disabled={saving}
                          className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-surface-darker transition-all disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-8 py-3 bg-background text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-border-subtle transition-all"
                        >
                          Cancel
                        </button>
                      </div>
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
