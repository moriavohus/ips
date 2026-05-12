import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../verify";
import { readMessages, writeMessages } from "@/lib/admin/messageStore";

const VALID_LOCALES = new Set(["en", "ru", "ar"]);
const VALID_SECTIONS = new Set(["datasheets", "brochures", "guidelines", "presentation"]);

function validateLocale(locale: string): boolean {
  return VALID_LOCALES.has(locale);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const locales = ["en", "ru", "ar"];
    const documents: Record<string, unknown> = {};

    for (const locale of locales) {
      const messages = await readMessages(locale);
      documents[locale] = messages.documents || {};
    }

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Failed to read documents:", error);
    return NextResponse.json({ error: "Failed to read documents" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { locale, sectionKey, data } = await request.json();

    if (!locale || !sectionKey || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!validateLocale(locale) || !VALID_SECTIONS.has(sectionKey)) {
      return NextResponse.json({ error: "Invalid locale or section key" }, { status: 400 });
    }

    const messages = await readMessages(locale);

    if (!messages.documents) {
      messages.documents = {};
    }
    if (!messages.documents.sections) {
      messages.documents.sections = {};
    }

    messages.documents.sections[sectionKey] = {
      ...messages.documents.sections[sectionKey],
      ...data,
    };

    await writeMessages(locale, messages, `Update ${locale} document section: ${sectionKey}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update documents:", error);
    return NextResponse.json({ error: "Failed to update documents" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { locale, sectionKey, item } = await request.json();

    if (!locale || !sectionKey || !item) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!validateLocale(locale) || !VALID_SECTIONS.has(sectionKey)) {
      return NextResponse.json({ error: "Invalid locale or section key" }, { status: 400 });
    }

    const messages = await readMessages(locale);

    if (!messages.documents?.sections?.[sectionKey]?.items) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    messages.documents.sections[sectionKey].items.push(item);
    await writeMessages(locale, messages, `Add ${locale} document item: ${sectionKey}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to add document item:", error);
    return NextResponse.json({ error: "Failed to add document item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { locale, sectionKey, itemIndex } = await request.json();

    if (!locale || !sectionKey || itemIndex === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!validateLocale(locale) || !VALID_SECTIONS.has(sectionKey)) {
      return NextResponse.json({ error: "Invalid locale or section key" }, { status: 400 });
    }

    const messages = await readMessages(locale);

    if (!messages.documents?.sections?.[sectionKey]?.items) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    messages.documents.sections[sectionKey].items.splice(itemIndex, 1);
    await writeMessages(locale, messages, `Remove ${locale} document item: ${sectionKey}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete document item:", error);
    return NextResponse.json({ error: "Failed to delete document item" }, { status: 500 });
  }
}
