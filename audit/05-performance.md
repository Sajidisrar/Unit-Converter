# Stage 5 -- Performance & Core Web Vitals

## Bundle Size Analysis

### Shared JS (loaded on every page)

| Chunk | Size |
|-------|------|
| `chunks/11a84e139b2e914f.js` | 58.9 kB |
| `chunks/aeb06c61ef09f9cb.css` | 21.8 kB |
| `chunks/add2fe5f713e07df.js` | 21.9 kB |
| `chunks/076c1b03f28fa33d.js` | 17.2 kB |
| Other shared chunks | 33.1 kB |
| **Total shared** | **153 kB** |

### Largest First Load JS Routes

| Route | Page JS | First Load JS | Issue |
|-------|---------|---------------|-------|
| `/aws-practice-exam` | **218 kB** | **348 kB** | **CRITICAL: 800+ exam questions bundled client-side** |
| `/blog/[slug]` | 45.2 kB | 175 kB | react-markdown + remark-gfm |
| `/yaml` | 18.6 kB | 149 kB | js-yaml library |
| `/ocr-scanner` | 11.5 kB | 142 kB | tesseract.js loaded separately (WASM) |
| `/json` | 9.87 kB | 140 kB | Moderate |
| `/encoding` | 9.84 kB | 140 kB | Moderate |

### Heavy Dependencies (from package.json)

| Package | Size Impact | Used On | Concern |
|---------|-------------|---------|---------|
| `tesseract.js` ^7.0.0 | ~2-4 MB WASM at runtime | `/ocr-scanner` only | **Should be dynamically imported.** If bundled in shared chunks, it loads on every page. Verify with bundle analysis. |
| `axios` ^1.12.2 | ~14 kB | `/api` route only | Could use native `fetch`. Low priority. |
| `cheerio` ^1.1.2 | ~80 kB | Server-side only | OK (not in client bundle) |
| `js-yaml` ^4.1.1 | ~40 kB | `/yaml` only | Appropriately page-scoped |
| `xml2js` ^0.6.2 | ~30 kB | `/xml` only | Appropriately page-scoped |
| `react-markdown` ^10.1.0 + `remark-gfm` | ~50 kB | Blog pages | Appropriately page-scoped |
| `stopword` ^3.1.5 | ~30 kB | Usage unclear | **Investigate if actually imported.** |

## Unnecessary Client Components

### Homepage (`src/app/page.tsx`)
The entire homepage is a client component (`"use client"` at line 1). It uses:
- `memo` from React (line 7, 252)
- No other client-side hooks (no `useState`, `useEffect`)

**The homepage does NOT need to be a client component.** It renders a static tool grid from `allTools` constant and static SEO content. The only reason for `"use client"` might be the `memo` wrapper, but `memo` is unnecessary for a page component that doesn't re-render.

**Fix:** Remove `"use client"`, remove `memo`, and the homepage becomes a server component. All content will be in the initial HTML.

### `/electricity-consumption/page.tsx`
Full client component with interactive calculator. This is legitimately client-side, but it should be split:
- Server component for metadata + SEO content
- Client component for the calculator only

### `/color-converter/page.tsx`
Full client component. Same recommendation: split into server wrapper + client tool.

## Third-Party Scripts & Loading Strategy

| Script | Strategy | CLS Risk | Blocks paint? |
|--------|----------|----------|--------------|
| Google Analytics (gtag.js) | `afterInteractive` | None | No (deferred) |
| Google AdSense (adsbygoogle.js) | `lazyOnload` | **See below** | No (lazy) |
| Vercel Analytics | Client import (homepage only) | None | No |

### AdSense CLS Analysis (HIGH)

**File:** `src/components/AdBanner.tsx`

The `<ins>` element for AdSense ads:
```html
<ins
  className="adsbygoogle"
  data-ad-client="ca-pub-3759958145886276"
  data-ad-slot="{slot}"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

**Issues:**
1. **No explicit dimensions** -- The `<ins>` element has no `style` attribute setting `width` or `height`. The container div has CSS classes for positioning but no fixed height.
2. **`data-ad-format="auto"`** -- Auto-format means AdSense dynamically determines the ad size, which causes a layout shift when the ad loads.
3. **Container classes** -- `getContainerClasses()` (`AdBanner.tsx:160-171`) sets position-specific classes but only the `left`/`right` positions have explicit dimensions (`w-48 h-96 min-h-[250px]`). The `top` and `inline` positions have **no height reservation**.

**Impact:** When ads load on `top` or `inline` positions, they push content down, causing Cumulative Layout Shift (CLS). This directly harms Core Web Vitals scores.

**Recommended fix:** Add `min-height` to the container for `top` and `inline` positions:
```typescript
top: 'mx-auto mb-6 min-h-[90px]',    // leaderboard ad height
inline: 'mx-auto my-6 min-h-[250px]', // medium rectangle height
```

## Font Loading

**File:** `src/app/layout.tsx:5,9-17`

```typescript
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

**Assessment:** Excellent. Using `next/font/google` means:
- Fonts are self-hosted at build time (no external requests)
- Automatic font-display: swap
- No FOUT (Flash of Unstyled Text)
- `subsets: ["latin"]` limits download size

## Image Handling

**No `next/image` usage found anywhere in the codebase.**

The site uses:
- Inline SVGs for icons (Navbar, Footer)
- Emoji characters for tool icons
- Static SVGs in `/public/` for favicons

**Assessment:** Since the site is primarily text-based tools, the lack of images is not a performance issue. However, if images are added in future (blog posts, tutorials), they should use `next/image` for automatic optimisation.

## Caching & Revalidation

- **Static pages (25/29):** Fully prerendered at build time. Cached until next deployment. Good.
- **Dynamic pages (4):** `/blog/[slug]`, `/cooking`, `/power`, `/api` are server-rendered on demand with no explicit `revalidate` or caching headers.
- **No ISR (Incremental Static Regeneration):** No `revalidate` exports found anywhere.

**Recommendation:** Add `generateStaticParams` to `/blog/[slug]` to make blog posts static. For `/cooking` and `/power`, the `searchParams` usage is for default unit selection and could be handled client-side instead.

## Lazy Loading & Dynamic Imports

No `next/dynamic` or `React.lazy` usage found in the codebase.

**Recommendations:**
1. `/aws-practice-exam` (348 kB First Load) -- The 800+ questions should be loaded dynamically or paginated. Consider `next/dynamic` with `ssr: false` for the exam component.
2. `/ocr-scanner` -- Verify that `tesseract.js` is tree-shaken and only loaded when the OCR page is visited.

## Performance Summary

| Metric | Status | Details |
|--------|--------|---------|
| Shared JS | Moderate (153 kB) | Acceptable for a Next.js app |
| Largest page | Poor (348 kB) | aws-practice-exam needs splitting |
| Third-party scripts | Good | Deferred/lazy loading |
| Font loading | Excellent | Self-hosted via next/font |
| CLS from ads | **Poor** | No height reservation for top/inline ads |
| Images | N/A | No images used |
| Client components | **Poor** | Homepage unnecessarily client-rendered |
| Dynamic imports | None | Should be used for heavy pages |
