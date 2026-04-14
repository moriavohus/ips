# IPS Middle East — Admin Panel Documentation

## Overview

Admin panel for managing all content on the IPS Middle East website: product detail pages, homepage product cards, and technical documents. The panel supports 3 languages (EN, RU, AR) and includes a one-click rebuild to push changes to production.

URL: `https://ips.abbit.kz/admin`

---

## Access & Authentication

| Field    | Value                   |
|----------|------------------------|
| URL      | `https://ips.abbit.kz/admin` |
| Username | `ips_admin`             |
| Password | `IPS@SecureAdmin2024!`  |

- Session lasts 8 hours (HTTP-only cookie)
- Page is hidden from search engines (`noindex, nofollow`)
- Change credentials via environment variables in `.env`:

```env
ADMIN_USERNAME=ips_admin
ADMIN_PASSWORD=IPS@SecureAdmin2024!
SESSION_SECRET=your-random-secret-key-here
```

---

## Dashboard (`/admin/dashboard`)

After login you see the dashboard with:
- **Products** — manage all 4 products (detail pages + homepage cards)
- **Documents** — manage 4 document sections
- **Rebuild & Deploy** — rebuild the site so changes appear on the live site

---

## Products (`/admin/products`)

### Two Tabs Per Product

Each product has two editing tabs:

#### 1. Detail Page Tab
Edits the **product detail page** (e.g. `/en/products/cellular-glass`). Fields vary by product — the form only shows fields that exist for that product.

#### 2. Homepage Card Tab
Edits the **product card on the homepage** — the preview card visitors see before clicking into the detail page. Fields:
- **Card Name** — title on the card
- **Short Description** — brief text under the title
- **Full Description** — (not shown on homepage, used in other contexts)

### Product-Specific Fields

#### Cellular Glass (Foam Glass)
| Field | Description |
|-------|-------------|
| Product Name | Display name on detail page |
| Image Path | Path to product image (e.g. `/images/products_cellular-glass.png`) |
| Overview Text | Main description paragraph |
| Applications List | Bullet list of use cases (e.g. "LNG terminals and cryogenic pipelines") |
| Properties Table (3-column) | Technical specs table with columns: Property, Test Method, Value |
| Supply Forms | List of available product forms |
| Design Guidance | List of design recommendations |
| Installation Notes | List of installation tips |
| Downloads | Downloadable documents (title + file meta + URL) |

#### Mineral Wool
| Field | Description |
|-------|-------------|
| Product Name, Image, Overview Text | Same as Cellular Glass |
| Applications List | Use cases |
| Properties Table (2-column) | Specs table with columns: Property, Availability (checkmark if no value) |
| Property Table Headers | Editable column headers for the 2-column table |
| Supply Forms Label | Custom label (e.g. "Available Forms") |
| Supply Forms | List of forms |
| Supply Forms Footnote | Text below the supply forms list |

#### Stainless Accessories
| Field | Description |
|-------|-------------|
| Product Name | Display name (no image or overview for this product) |
| Sub-Products | 4 sub-product blocks, each with: image path, eyebrow text, title, HTML description |
| Features Label + List | List of product features |
| Compliance & Standards | Section label, 2 text paragraphs, compliance items (title + description), compliance images |

#### Coatings & Jacketing
| Field | Description |
|-------|-------------|
| Product Name, Image, Overview Text | Standard fields |
| Product Types Label + List | List of product types (title + description each) |
| Applications Label | Section header |
| Applications Text | Paragraph describing applications |

### How to Edit Products

1. Go to `/admin/products`
2. Select language tab (EN / RU / AR)
3. Click **Edit** on a product
4. Switch between **Detail Page** and **Homepage Card** tabs
5. Edit fields. Use **+ Add** buttons to add rows/items, **X** buttons to remove
6. Click **Save Changes**
7. Repeat for other languages
8. Go to Dashboard and click **Rebuild & Deploy**

### Adding/Removing Table Rows

In properties tables:
- Click **+ Add Row** to add a new spec row at the bottom
- Click the **X** button on any row to remove it
- All cells are editable (property name, test method, value)

In lists (applications, supply forms, etc.):
- Click **+ Add Item** to add a new entry
- Click the **X** button to remove an entry
- Edit text directly in the input field

---

## Documents (`/admin/documents`)

Manages 4 document sections:
1. **Technical Datasheets** — product data sheets
2. **Product Brochures** — marketing brochures
3. **Installation Guidelines** — installation guides
4. **Company Presentation** — company overview

### Fields Per Section

| Field | Description |
|-------|-------------|
| Section Number | Display number (e.g. "01") |
| Section Title | Heading (e.g. "Technical Datasheets") |
| Subtitle | Description paragraph |
| Included Points | Bullet list (e.g. "Physical properties and thermal data") |
| Document Items | Individual documents with: title, meta (e.g. "PDF, 15 MB"), URL |

### How to Edit Documents

1. Go to `/admin/documents`
2. Select language tab (EN / RU / AR)
3. Click **Edit** on a section
4. Edit section info (number, title, subtitle)
5. Edit/add/remove points using **+ Add Point** and **X** buttons
6. Edit/add/remove documents:
   - Change title, meta, or URL directly
   - Click **+ Add Document** for a new entry
   - Click **X** to remove a document
   - Click the green link icon to preview a PDF
7. Click **Save Changes**
8. Go to Dashboard and click **Rebuild & Deploy**

---

## Rebuild & Deploy

**Important:** The site uses Static Site Generation (SSG). Changes saved through the admin panel update the JSON data files, but the live site serves pre-built HTML pages. You must rebuild to make changes visible.

### How to Rebuild

1. Go to Dashboard (`/admin/dashboard`)
2. Click **Rebuild & Deploy**
3. Wait 20-30 seconds (spinner shows progress)
4. Green message = success, changes are live
5. Red message = build failed, check with developer

### What Happens During Rebuild

1. `next build` runs — generates all static pages from updated JSON data
2. `pm2 reload` runs — restarts the server with zero downtime
3. New pages are served to visitors

### When to Rebuild

- After editing any product (detail page or card)
- After editing any document section
- After changing content in any language
- You can batch multiple changes before rebuilding (edit everything, then rebuild once)

---

## Languages

The site supports 3 languages. Each is edited independently:
- **EN** (English) — default
- **RU** (Russian)
- **AR** (Arabic) — right-to-left layout

**Important:** Changing content in English does NOT change Russian or Arabic. You must switch to each language tab and edit separately.

---

## Data Structure

All content is stored in JSON translation files:

```
messages/
├── en.json    # English
├── ru.json    # Russian
└── ar.json    # Arabic
```

Inside each file:
- `products.*` — homepage product cards (name, short, description, specs)
- `productPortfolio.products.*` — product detail pages (all fields)
- `documents.sections.*` — document sections

The admin panel reads and writes these files directly via API endpoints.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth` | Login (body: `{username, password}`) |
| GET | `/api/admin/auth` | Check auth status |
| DELETE | `/api/admin/auth` | Logout |
| GET | `/api/admin/products` | Get all products (all locales, portfolio + cards) |
| PUT | `/api/admin/products` | Update product (body: `{locale, productKey, portfolioData, cardData}`) |
| GET | `/api/admin/documents` | Get all documents (all locales) |
| PUT | `/api/admin/documents` | Update section (body: `{locale, sectionKey, data}`) |
| POST | `/api/admin/documents` | Add document item (body: `{locale, sectionKey, item}`) |
| DELETE | `/api/admin/documents` | Remove document item (body: `{locale, sectionKey, itemIndex}`) |
| POST | `/api/admin/rebuild` | Trigger site rebuild + deploy |

---

## File Structure

```
src/app/
├── admin/
│   ├── layout.tsx              # Admin layout (no site header/footer)
│   ├���─ page.tsx                # Login page
│   ├── dashboard/page.tsx      # Dashboard + Rebuild button
│   ├── products/page.tsx       # Product editor (detail + card tabs)
│   └��─ documents/page.tsx      # Document section editor
└── api/admin/
    ├── auth/route.ts           # Authentication (POST/GET/DELETE)
    ├── products/route.ts       # Products API (GET/PUT)
    ├─��� documents/route.ts      # Documents API (GET/PUT/POST/DELETE)
    └── rebuild/route.ts        # Rebuild & Deploy API (POST)
```

---

## Security

1. Admin page not linked from public site
2. `robots: noindex, nofollow` prevents indexing
3. HTTP-only, Secure, SameSite=strict cookies
4. All API routes verify session before processing
5. Rebuild API only accessible to authenticated admins
6. **Always change default credentials in production**

---

## Troubleshooting

### Changes don't appear on the site
Click **Rebuild & Deploy** on the dashboard. The site uses SSG — changes only appear after rebuild.

### Rebuild fails
Check server logs. Common causes:
- TypeScript/lint errors in code (not from admin edits)
- Disk space full
- PM2 not running

### Can't log in
- Check credentials in `.env` file
- Clear browser cookies and try again
- Session expires after 8 hours — re-login

### Fields missing in product editor
The form only shows fields that exist in the JSON data for that product. If a product doesn't have `properties` (like Stainless Accessories), that section won't appear. This is by design — each product type has its own structure.

### Arabic text looks wrong
Make sure you're editing in the AR tab. Arabic text renders right-to-left on the live site automatically.
