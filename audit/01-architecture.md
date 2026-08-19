# Stage 1 -- Architecture & Route Map

## Layout Nesting

Single root layout only: `src/app/layout.tsx`. No nested layouts, no route groups.

The root layout provides:
- `<html lang="en">` with font CSS variables
- ThemeProvider (next-themes)
- Google Analytics scripts (afterInteractive)
- Google AdSense script (lazyOnload)
- Navbar component
- {children}
- Footer component

## Server vs Client Component Split

**Client component count:** 62 files with `"use client"` across `/src`.

### CRITICAL: Page-level client components

| Route | Page file | Server or Client | Issue |
|-------|-----------|-------------------|-------|
| `/` | `app/page.tsx:1` | **CLIENT** | Entire homepage is `"use client"`. All content (tool grid, SEO sections, links) is client-rendered. Crawlers see empty shell. |
| `/color-converter` | `app/color-converter/page.tsx:1` | **CLIENT** | Full page is client component. Uses `next/head` which does NOT work in App Router. **No metadata rendered at all.** |
| `/electricity-consumption` | `app/electricity-consumption/page.tsx:1` | **CLIENT** | Full page is client component. Has NO `export const metadata`. **No metadata.** |

### Server pages delegating to client components (correct pattern)

| Route | Server page exports metadata | Client component |
|-------|------------------------------|------------------|
| `/unit-converter` | Yes | `UnitConverterClient` |
| `/json` | Yes | `JsonToolsClient` |
| `/encoding` | Yes | `EncodingToolsClient` |
| `/text` | Yes | `TextToolsClient` |
| `/csv` | Yes | `CsvToolsClient` |
| `/xml` | Yes | `XmlToolsClient` |
| `/yaml` | Yes | `YamlToolsClient` |
| `/hash-generator` | Yes | `HashGeneratorClient` |
| `/ai-tools` | Yes | `AiToolsClient` |
| `/ocr-scanner` | Yes | `OCRScannerClient` |
| `/developer` | Yes | `DeveloperPageClient` |
| `/aws-practice-exam` | Yes | `AwsPracticeExamClient` |
| `/cooking` | Yes | `ConverterPageClient` |
| `/power` | Yes | `ConverterPageClient` |
| `/fitness` | Yes | `FitnessPageClient` |
| `/fuel-economy` | Yes | `FuelEconomyPageClient` |
| `/blog` | Yes | `BlogListPageClient` |
| `/blog/[slug]` | Yes (generateMetadata) | `BlogPostContent` |

### Static server pages (no client component)

`/about`, `/privacy`, `/terms`, `/contact`, `/blog/ai-prompt-engineering`, `/blog/unit-conversion-best-practices`

## Dynamic Routes & generateStaticParams

| Route | Dynamic? | generateStaticParams? | Issue |
|-------|----------|----------------------|-------|
| `/blog/[slug]` | Yes (f) | **NO** | No `generateStaticParams` found anywhere. Blog posts from `blog-posts.json` (13 posts) are only rendered on-demand. Only 2 static blog pages exist. 11 blog posts are **missing from sitemap** and rendered dynamically. |
| `/cooking` | Yes (f) | No | Dynamic due to `searchParams` usage |
| `/power` | Yes (f) | No | Dynamic due to `searchParams` usage |
| `/api` | Yes (f) | N/A | API route |

## Reusable Components

| Component | Used by | Purpose |
|-----------|---------|---------|
| `ConverterPageClient` | `/cooking`, `/power` | Shared converter layout with SEO content slots |
| `FitnessPageClient` | `/fitness` | Fitness-specific layout |
| `FuelEconomyPageClient` | `/fuel-economy` | Fuel economy layout |
| `DeveloperPageClient` | `/developer` | Developer hub with tool grid |
| `DeveloperToolsNav` | `/color-converter`, `/electricity-consumption`, several others | Cross-links 9 developer tools |
| `AdBanner` | Homepage, tool pages | AdSense ad with lazy loading |
| `Navbar` | Root layout | Navigation (6 tools linked) |
| `Footer` | Root layout | Footer links (6 tools + legal) |
| `StructuredData` | Some pages | Reusable FAQ schema component |

## Analytics & AdSense Injection

| Script | Strategy | File:Line |
|--------|----------|-----------|
| Google Analytics (gtag.js) | `afterInteractive` | `layout.tsx:126-137` |
| Google AdSense | `lazyOnload` | `layout.tsx:138-143` |
| Vercel Analytics | Client component import | `page.tsx:5,14` (homepage only) |

All use Next.js `<Script>` component. AdSense uses `lazyOnload` (good for performance).

## Route Map Table

| Route | Static/Dynamic | Indexable | Primary Keyword Intent | First Load JS | Issues |
|-------|---------------|-----------|----------------------|---------------|--------|
| `/` | Static | Yes | free online tools, unit converter | 136 kB | **CLIENT PAGE -- crawlers see empty shell** |
| `/unit-converter` | Static | Yes | unit converter, length/weight/temp | 138 kB | Missing canonical |
| `/encoding` | Static | Yes | base64 encoder, jwt decoder | 140 kB | Missing canonical |
| `/json` | Static | Yes | json formatter, json validator | 140 kB | Has canonical |
| `/text` | Static | Yes | text compare, regex tester | 138 kB | Missing canonical |
| `/xml` | Static | Yes | xml formatter | 139 kB | Has canonical |
| `/yaml` | Static | Yes | yaml formatter, yaml to json | 149 kB | Has canonical |
| `/csv` | Static | Yes | csv tools, csv to json | 138 kB | Has canonical |
| `/hash-generator` | Static | Yes | hash generator, md5 sha256 | 136 kB | Has canonical |
| `/ai-tools` | Static | Yes | ai cheat sheet, prompt engineering | 138 kB | Missing canonical |
| `/color-converter` | Static | Yes | color converter, hex to rgb | 137 kB | **CLIENT PAGE, next/head broken, no metadata** |
| `/ocr-scanner` | Static | Yes | ocr scanner, image to text | 142 kB | Has canonical |
| `/developer` | Static | Yes | free developer tools | 133 kB | Has canonical |
| `/power` | Dynamic | Yes | power converter, watts to hp | 135 kB | Has canonical |
| `/electricity-consumption` | Static | Yes | electricity calculator | 135 kB | **CLIENT PAGE, no metadata** |
| `/cooking` | Dynamic | Yes | cooking converter, cups to grams | 135 kB | Has canonical |
| `/fitness` | Static | Yes | bmi calculator, fitness converter | 135 kB | Has canonical, **wrong OG URL** |
| `/fuel-economy` | Static | Yes | mpg to l/100km | 135 kB | Has canonical |
| `/aws-practice-exam` | Static | Yes | aws ai practitioner practice exam | **348 kB** | **Massive JS bundle** |
| `/blog` | Static | Yes | blog hub | 133 kB | Has canonical |
| `/blog/[slug]` | Dynamic | Yes | varies by post | 175 kB | Has canonical; **11 posts missing from sitemap** |
| `/blog/ai-prompt-engineering` | Static | Yes | ai prompt engineering guide | 132 kB | Static page (not using [slug]) |
| `/blog/unit-conversion-best-practices` | Static | Yes | unit conversion best practices | 132 kB | Static page (not using [slug]) |
| `/about` | Static | Yes | about unit converter | 130 kB | Has canonical |
| `/privacy` | Static | Yes | privacy policy | 130 kB | Has canonical |
| `/terms` | Static | Yes | terms of service | 130 kB | Has canonical |
| `/contact` | Static | Yes | contact | 130 kB | Has canonical |

## Flagged Issues

### Duplicates / Overlapping Intent
- `/blog/ai-prompt-engineering` (static) overlaps with posts in `/blog/[slug]` route
- `/blog/unit-conversion-best-practices` (static) overlaps with posts in `/blog/[slug]` route
- These 2 static blog pages may produce duplicate content with their dynamic [slug] equivalents if the same slug exists in `blog-posts.json`

### Orphan Pages
- 11 blog posts in `blog-posts.json` are only reachable via `/blog/[slug]` dynamic route. Without `generateStaticParams`, they are not in the sitemap and have no inbound links except from the blog index page.

### Missing Important Pages
- No dedicated pages for individual conversion types (e.g. `/meters-to-feet`, `/kg-to-lbs`). These are high-volume long-tail queries that competitors serve with dedicated pages.
- No `/tools` or category landing pages
- No 404 page (default Next.js `_not-found`)

### Thin / Placeholder Routes
- `/contact` -- has a form but no form action/handler (no API endpoint)
- `/api` -- exists but purpose unclear from route table
