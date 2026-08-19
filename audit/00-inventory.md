# Stage 0 -- Ground Truth Inventory

## Framework & Versions

| Item | Value | Source |
|------|-------|--------|
| Next.js | 15.5.12 | `package.json:24` |
| React | 19.1.0 | `package.json:27` |
| Router | App Router (`src/app/`) | directory structure |
| Build tool | Turbopack | `package.json:7` |
| Output mode | `standalone` | `next.config.ts:4` |
| Sitemap generator | `next-sitemap` 4.2.3 | `package.json:25` |
| CSS | Tailwind CSS v4 | `package.json:47` |
| Analytics | Vercel Analytics + Google Analytics (G-YXYR0FKNSK) | `layout.tsx:126-136` |
| AdSense | ca-pub-3759958145886276 | `layout.tsx:138-143` |
| Middleware | None | no middleware.ts found |
| Environment files | None in repo | verified via glob |

## next.config.ts (full)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: '/length', destination: '/unit-converter', permanent: true },
      { source: '/weight', destination: '/unit-converter', permanent: true },
      { source: '/temperature', destination: '/unit-converter', permanent: true },
      { source: '/area', destination: '/unit-converter', permanent: true },
      { source: '/speed', destination: '/unit-converter', permanent: true },
      { source: '/base64-encoder-decoder', destination: '/encoding', permanent: true },
      { source: '/jwt-decoder', destination: '/encoding', permanent: true },
      { source: '/url-encoder-decoder', destination: '/encoding', permanent: true },
      { source: '/regex-validator', destination: '/text', permanent: true },
      { source: '/text-compare', destination: '/text', permanent: true },
      { source: '/json-prettier', destination: '/json', permanent: true },
      { source: '/xml-formatter', destination: '/xml', permanent: true },
    ];
  },
};
```

**Notes:** No `trailingSlash`, no `images` config, no `headers`, no `rewrites`. 12 permanent (301) redirects consolidating old tool URLs.

## Build Output -- Route Table (verbatim)

```
Route (app)                                  Size  First Load JS
+-- * /                                     5.97 kB         136 kB
+-- * /_not-found                               0 B         130 kB
+-- * /about                                    0 B         130 kB
+-- * /ai-tools                             7.51 kB         138 kB
+-- f /api                                      0 B            0 B
+-- * /aws-practice-exam                     218 kB         348 kB
+-- * /blog                                 2.96 kB         133 kB
+-- f /blog/[slug]                          45.2 kB         175 kB
+-- * /blog/ai-prompt-engineering               0 B         132 kB
+-- * /blog/unit-conversion-best-practices      0 B         132 kB
+-- * /color-converter                      6.42 kB         137 kB
+-- * /contact                                  0 B         130 kB
+-- f /cooking                                  0 B         135 kB
+-- * /csv                                  7.79 kB         138 kB
+-- * /developer                            2.52 kB         133 kB
+-- * /electricity-consumption              4.63 kB         135 kB
+-- * /encoding                             9.84 kB         140 kB
+-- * /fitness                              4.68 kB         135 kB
+-- * /fuel-economy                         4.62 kB         135 kB
+-- * /hash-generator                       5.76 kB         136 kB
+-- * /json                                 9.87 kB         140 kB
+-- * /ocr-scanner                          11.5 kB         142 kB
+-- f /power                                    0 B         135 kB
+-- * /privacy                                  0 B         130 kB
+-- * /terms                                    0 B         130 kB
+-- * /text                                  8.2 kB         138 kB
+-- * /unit-converter                       7.52 kB         138 kB
+-- * /xml                                  8.95 kB         139 kB
+-- * /yaml                                 18.6 kB         149 kB
+ First Load JS shared by all              153 kB
  +-- chunks/076c1b03f28fa33d.js            17.2 kB
  +-- chunks/11a84e139b2e914f.js            58.9 kB
  +-- chunks/add2fe5f713e07df.js            21.9 kB
  +-- chunks/aeb06c61ef09f9cb.css           21.8 kB
  +-- other shared chunks (total)           33.1 kB

* (Static)   prerendered as static content
f (Dynamic)  server-rendered on demand
```

## Route Summary

| Marker | Count | Routes |
|--------|-------|--------|
| Static (*) | 25 | All tool/page routes except dynamic ones |
| Dynamic (f) | 4 | `/api`, `/blog/[slug]`, `/cooking`, `/power` |
| **Total** | **29** (excluding `_not-found`) | |

## Sitemap & Robots Files

- `public/sitemap.xml` -- 26 URLs (regenerated at build time by next-sitemap)
- `public/robots.txt` -- Allow all, disallow query params, references sitemap
- `next-sitemap.config.js` -- Custom transform function with per-route priority/changefreq

## Notable Dependencies

| Package | Purpose | Size concern |
|---------|---------|--------------|
| `tesseract.js` ^7.0.0 | OCR Scanner | Very heavy (~2-4MB WASM); only used on /ocr-scanner |
| `axios` ^1.12.2 | HTTP client | Only used for API route; could be fetch |
| `cheerio` ^1.1.2 | HTML parsing | Server-side only |
| `js-yaml` ^4.1.1 | YAML parsing | Used on /yaml page |
| `xml2js` ^0.6.2 | XML parsing | Used on /xml page |
| `react-markdown` ^10.1.0 | Blog content rendering | Used on blog pages |
| `remark-gfm` ^4.0.1 | GFM markdown support | Blog pages |
| `stopword` ^3.1.5 | Word filtering | Unclear usage |
