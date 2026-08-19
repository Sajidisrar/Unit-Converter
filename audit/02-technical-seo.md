# Stage 2 -- Technical SEO Per Route

## Metadata Implementation Overview

- `metadataBase` set in root layout: `https://freeunitconvertor.com` (`layout.tsx:20`)
- 22 pages use `export const metadata`
- 1 page uses `generateMetadata` (`blog/[slug]/page.tsx:10`)
- 2 pages have **NO metadata at all** (see Critical Issues below)

## Per-Route SEO Table

| Route | Title | Description (truncated) | Canonical | H1 | OG | Twitter | Robots | Issues |
|-------|-------|------------------------|-----------|----|----|---------|--------|--------|
| `/` | Free Online Tools & Calculators 2025 \| JSON, Base64, Unit Converters | Best free online developer tools...Trusted by 100K+ | `https://freeunitconvertor.com/` | "Free Online Tools & Calculators 2025" | Yes | Yes (summary) | default | **Client page; H1 not in server HTML. Title says "2025" (outdated).** |
| `/unit-converter` | Unit Converter - Length, Weight, Temperature, Area, Speed \| Free Online Tool | Free online unit converter... | **MISSING** | Inside UnitConverterClient (client) | Yes (no URL) | No | default | No canonical. No OG URL. H1 client-side. |
| `/json` | Free JSON Tools Online \| Format, Parse, Compare & Convert JSON | All-in-one free JSON toolkit... | `https://freeunitconvertor.com/json` | Inside JsonToolsClient (client) | Yes | No | default | Good metadata. H1 client-side. |
| `/encoding` | Encoding Tools Online - Base64, URL Encoder, JWT Decoder... | Free online encoding... | **MISSING** | Inside EncodingToolsClient (client) | Yes (no URL) | No | default | No canonical. No OG URL. |
| `/text` | Text Tools Online - Compare, Regex Validator, String Helpers... | Free online text processing... | **MISSING** | Inside TextToolsClient (client) | Yes (no URL) | No | default | No canonical. No OG URL. |
| `/xml` | Free XML Tools Online \| Format, Parse & Compare XML | All-in-one free XML toolkit... | `https://freeunitconvertor.com/xml` | Inside XmlToolsClient (client) | Yes | No | default | Good. |
| `/yaml` | Free YAML Tools Online \| Format, Validate & Convert YAML | All-in-one free YAML toolkit... | `https://freeunitconvertor.com/yaml` | Inside YamlToolsClient (client) | Yes | No | default | Good. |
| `/csv` | Free CSV Tools Online \| Format, Convert & View CSV Data | All-in-one free CSV toolkit... | `https://freeunitconvertor.com/csv` | Inside CsvToolsClient (client) | Yes | No | default | Good. |
| `/hash-generator` | Free Hash Generator Online \| MD5, SHA-256, SHA-512 & More | Generate cryptographic hashes... | `https://freeunitconvertor.com/hash-generator` | Inside HashGeneratorClient (client) | Yes | No | default | Good. |
| `/ai-tools` | AI Development Tools - Cheat Sheet & Prompt Engineering... | Free AI development tools... | **MISSING** | Inside AiToolsClient (client) | Yes (no URL) | No | default | No canonical. |
| `/color-converter` | **NONE (next/head broken)** | **NONE** | **BROKEN** (via next/head) | "Color Converter Tool" (line 273) | **BROKEN** | No | **BROKEN** (meta tag via next/head) | **CRITICAL: Entire page is "use client". Uses next/head which does NOT work in App Router. Zero metadata rendered.** |
| `/ocr-scanner` | Free OCR Scanner Online \| Extract Text from Images | Extract text from images... | `https://freeunitconvertor.com/ocr-scanner` | Inside OCRScannerClient (client) | Yes | No | default | Good. |
| `/developer` | 15+ Free Online Developer Tools for 2025 \| JSON, Regex, AI & More | Best free online developer tools for 2025. Trusted by 100K+ | `https://freeunitconvertor.com/developer` | Inside DeveloperPageClient (client) | Yes | No | `index, follow` | Title says "2025". "100K+" claim. |
| `/power` | Power Converter - Convert Watts, Horsepower, BTU/h & More | Convert between different power units... | `https://freeunitconvertor.com/power` | Inside ConverterPageClient (client) | Yes (no URL) | No | default | Good. |
| `/electricity-consumption` | **NONE** | **NONE** | **NONE** | "Electricity Consumption Calculator" (line 112) | **NONE** | No | **NONE** | **CRITICAL: Full "use client" page with NO metadata export. Falls back to root layout metadata only.** |
| `/cooking` | Cooking Unit Converter - Cups to Grams \| Free Online Tool | Convert cooking measurements... | `https://freeunitconvertor.com/cooking` | Inside ConverterPageClient (client) | Yes | No | default | Good. |
| `/fitness` | Fitness Converter - Height, Weight & BMI Calculator | Easily convert between fitness-related... | `https://freeunitconvertor.com/fitness` | Inside FitnessPageClient (client) | Yes | No | default | **OG URL is `https://yourdomain.com/fitness` (placeholder!)**. `fitness/page.tsx:28` |
| `/fuel-economy` | Fuel Economy Converter - MPG to L/100km \| Free Online Tool | Convert MPG to L/100km... | `https://freeunitconvertor.com/fuel-economy` | Inside FuelEconomyPageClient (client) | Yes | No | default | Good. |
| `/aws-practice-exam` | AWS AI Practitioner Practice Exam 2025 \| AIF-C01 Free Practice Test (800+ Questions) | Free AWS Certified AI Practitioner... | `https://freeunitconvertor.com/aws-practice-exam` | Inside AwsPracticeExamClient (client) | Yes | Yes (summary_large_image) | `index, follow` | Good metadata. Title says "2025". |
| `/blog` | Blog - Unit Conversion Tips, Tools & Guides \| Unit Converter | Expert guides on unit conversion... | `https://freeunitconvertor.com/blog` | Inside BlogListPageClient (client) | Yes | No | default | Good. |
| `/blog/[slug]` | {post.title} \| Unit Converter Blog (dynamic) | {post.excerpt} | `https://freeunitconvertor.com/blog/{slug}` | Inside BlogPostContent (client) | Yes (article) | No | default | Article schema hardcodes datePublished: "2025-01-15". |
| `/about` | About Us - Free Online Unit Converter & Developer Tools | Learn about our comprehensive... | `https://freeunitconvertor.com/about` | "About Unit Converter" | Yes | No | default | Good. |
| `/privacy` | Privacy Policy \| Unit Converter | Read the Privacy Policy... | `https://freeunitconvertor.com/privacy` | "Privacy Policy" | Yes (article) | No | default | Good. |
| `/terms` | Terms of Service \| Unit Converter | Read the Terms of Service... | `https://freeunitconvertor.com/terms` | "Terms of Service" | Yes (article) | No | default | Good. |
| `/contact` | Contact Us \| Unit Converter | Get in touch with the Unit Converter team... | `https://freeunitconvertor.com/contact` | "Contact Us" | Yes (article) | No | default | Good. |

## Critical Issues

### 1. Broken Metadata on `/color-converter` (CRITICAL)
**File:** `src/app/color-converter/page.tsx:1,258-268`
**Problem:** Page is `"use client"` and uses `next/head` to set metadata. In Next.js App Router, `next/head` is a Pages Router API and **does not work**. The page renders with **zero metadata** -- no title, no description, no canonical, no OG tags.
**Impact:** Page cannot rank. Crawlers see only the root layout's generic metadata.

### 2. No Metadata on `/electricity-consumption` (CRITICAL)
**File:** `src/app/electricity-consumption/page.tsx:1`
**Problem:** Entire page is `"use client"` with no metadata export. Falls back to root layout title "Free Online Tools & Calculators 2025" for every aspect.
**Impact:** Page has wrong title/description for its content. Cannot rank for electricity-related queries.

### 3. Homepage is "use client" (CRITICAL)
**File:** `src/app/page.tsx:1`
**Problem:** The homepage starts with `"use client"`. While the metadata from `layout.tsx` still renders, the page **body content** (tool grid, SEO sections, internal links) is entirely client-rendered JavaScript. Crawlers may see an empty page body.
**Impact:** The most important page on the site may be invisible to search engines. All internal links from the homepage may not be followed.

### 4. Missing Canonicals (HIGH)
Routes without `alternates.canonical`:
- `/unit-converter` (`unit-converter/page.tsx`)
- `/encoding` (`encoding/page.tsx`)
- `/text` (`text/page.tsx`)
- `/ai-tools` (`ai-tools/page.tsx`)

These pages rely on `metadataBase` but don't set an explicit canonical, risking duplicate content from query parameters.

### 5. Wrong OG URL on `/fitness` (MEDIUM)
**File:** `src/app/fitness/page.tsx:28`
**Value:** `url: "https://yourdomain.com/fitness"` -- this is a placeholder domain that was never updated.

### 6. Heading Hierarchy
Most tool pages have H1 inside client components. While React SSR can render these, the server component wrapper pages (json, encoding, text, etc.) render only `<script type="application/ld+json">` tags server-side and delegate all visible HTML to client components. The H1s are therefore client-rendered.

Several pages have multiple H2s but no clear content hierarchy between the tool UI and SEO content below.

### 7. Outdated Year References
- Root layout title: "2025" (`layout.tsx:21`)
- Homepage H1: "2025" (`page.tsx:22`)
- Developer page title: "2025" (`developer/page.tsx:7`)
- AWS exam title: "2025" (`aws-practice-exam/page.tsx:5`)
- All blog article schemas: `datePublished: "2025-01-15"` (`blog/[slug]/page.tsx:47-48`)

Current date is 2026-08-12. All "2025" references are outdated.

### 8. No Accidental noindex
No pages have `noindex` set. Three pages explicitly set `robots: "index, follow"` (developer, aws-practice-exam, color-converter via next/head). This is redundant but not harmful (except color-converter where it's broken).

### 9. Trailing Slash / www Handling
- No `trailingSlash` config in `next.config.ts` (defaults to false -- no trailing slashes)
- No www/non-www redirect configured at framework level
- `robots.txt` Host directive set to `https://freeunitconvertor.com` (non-www, no trailing slash) -- consistent
- Canonical URLs use non-www, no trailing slash -- consistent

**UNVERIFIED:** Whether the hosting platform (Vercel) handles www-to-non-www and HTTP-to-HTTPS redirects. This must be verified at the DNS/CDN level.

### 10. Breadcrumb Support
Root layout has a BreadcrumbList schema (`layout.tsx:69-75`) but it contains only "Home". No page-specific breadcrumbs are generated. This is a missed opportunity for rich results.

### 11. Soft-404 Risk
The `/blog/[slug]` route calls `notFound()` for unknown slugs (`blog/[slug]/page.tsx:60`), which correctly returns a 404. No soft-404 risk identified.
