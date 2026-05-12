import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../verify";
import { readMessages, writeMessages } from "@/lib/admin/messageStore";

const VALID_LOCALES = new Set(["en", "ru", "ar"]);
const VALID_PRODUCTS = new Set(["cellularGlass", "mineralWool", "stainlessAccessories", "coatings"]);

function validateLocale(locale: string): boolean {
  return VALID_LOCALES.has(locale);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const locales = ["en", "ru", "ar"];
    const result: Record<string, unknown> = {};

    for (const locale of locales) {
      const messages = await readMessages(locale);
      result[locale] = {
        // Products from productPortfolio (used on detail pages)
        portfolio: messages.productPortfolio?.products || {},
        // Products from products namespace (used on product grid/cards)
        cards: messages.products || {},
        // Top-level portfolio labels
        portfolioLabels: {
          productTypes: messages.productPortfolio?.productTypes,
          overview: messages.productPortfolio?.overview,
          applications: messages.productPortfolio?.applications,
          propertyTable: messages.productPortfolio?.propertyTable,
          supplyForms: messages.productPortfolio?.supplyForms,
          designGuidance: messages.productPortfolio?.designGuidance,
          installationNotes: messages.productPortfolio?.installationNotes,
          downloads: messages.productPortfolio?.downloads,
          title: messages.productPortfolio?.title,
        },
      };
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Failed to read products:", error);
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { locale, productKey, portfolioData, cardData } = await request.json();

    if (!locale || !productKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!validateLocale(locale) || !VALID_PRODUCTS.has(productKey)) {
      return NextResponse.json({ error: "Invalid locale or product key" }, { status: 400 });
    }

    const messages = await readMessages(locale);

    // Update productPortfolio.products (detail pages)
    if (portfolioData) {
      if (!messages.productPortfolio) messages.productPortfolio = {};
      if (!messages.productPortfolio.products) messages.productPortfolio.products = {};
      messages.productPortfolio.products[productKey] = portfolioData;
    }

    // Update products namespace (card grid)
    if (cardData) {
      if (!messages.products) messages.products = {};
      messages.products[productKey] = {
        ...messages.products[productKey],
        ...cardData,
      };
    }

    await writeMessages(locale, messages, `Update ${locale} product: ${productKey}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
