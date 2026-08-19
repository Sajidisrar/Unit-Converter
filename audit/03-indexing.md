# Stage 3 -- Sitemap, Robots & Indexing

## Sitemap Configuration

**File:** `next-sitemap.config.js`

```javascript
siteUrl: 'https://freeunitconvertor.com'  // non-www, no trailing slash
generateRobotsTxt: true
generateIndexSitemap: false
exclude: ['/api/*']
sitemapSize: 5000
```

The config uses a custom `transform` function that assigns per-route priority and changefreq. All `lastmod` values are set to `new Date().toISOString()` -- i.e. the **build timestamp**, not the actual content modification date.

## Sitemap Analysis

### URLs in sitemap (26 total, from `public/sitemap.xml` after build)

| URL | Priority | Changefreq | In code? | Issue |
|-----|----------|------------|----------|-------|
| `https://freeunitconvertor.com` | 1.0 | daily | Yes | OK |
| `/unit-converter` | 0.95 | weekly | Yes | OK |
| `/blog` | 0.9 | daily | Yes | OK |
| `/encoding` | 0.9 | weekly | Yes | OK |
| `/json` | 0.9 | weekly | Yes | OK |
| `/text` | 0.9 | weekly | Yes | OK |
| `/xml` | 0.9 | weekly | Yes | OK |
| `/yaml` | 0.9 | weekly | Yes | OK |
| `/csv` | 0.9 | weekly | Yes | OK |
| `/hash-generator` | 0.9 | weekly | Yes | OK |
| `/ai-tools` | 0.9 | weekly | Yes | OK |
| `/aws-practice-exam` | 0.9 | weekly | Yes | OK |
| `/electricity-consumption` | 0.9 | weekly | Yes | OK |
| `/fitness` | 0.9 | weekly | Yes | OK |
| `/fuel-economy` | 0.9 | weekly | Yes | OK |
| `/developer` | 0.8 | weekly | Yes | OK |
| `/color-converter` | 0.8 | weekly | Yes | OK (but page has no metadata) |
| `/blog/ai-prompt-engineering` | 0.85 | weekly | Yes | OK |
| `/blog/unit-conversion-best-practices` | 0.85 | weekly | Yes | OK |
| `/about` | 0.5 | monthly | Yes | OK |
| `/contact` | 0.3 | yearly | Yes | OK |
| `/privacy` | 0.3 | yearly | Yes | OK |
| `/terms` | 0.3 | yearly | Yes | OK |
| `/ocr-scanner` | 0.6 | monthly | Yes | Low priority -- should be higher |

### Missing from sitemap (CRITICAL)

**11 blog posts** from `src/data/blog-posts.json` are NOT in the sitemap:

1. `/blog/claude-ai-for-developers`
2. `/blog/intro-to-machine-learning`
3. `/blog/neural-networks-explained`
4. `/blog/data-science-for-business`
5. `/blog/developer-tools-trends-2025`
6. `/blog/json-to-csv`
7. `/blog/jwt-decoder`
8. `/blog/base64-encoding-decoding`
9. `/blog/regex-validator`
10. `/blog/xml-formatting`
11. `/blog/url-encoding-decoding`
12. `/blog/power-wattage-consumption`
13. `/blog/unit-conversion-software`

**Root cause:** The `/blog/[slug]` route has no `generateStaticParams`. The next-sitemap generator only includes routes that Next.js reports at build time. Without `generateStaticParams`, the dynamic `[slug]` route is not expanded into individual URLs. Only the 2 static blog pages (`/blog/ai-prompt-engineering`, `/blog/unit-conversion-best-practices`) appear.

**Impact:** 11 content-rich blog posts are invisible to search engines via sitemap. They are only discoverable if a crawler follows links from the `/blog` index page.

### URL Consistency Check

| Aspect | Sitemap | Canonical | Match? |
|--------|---------|-----------|--------|
| Protocol | https | https | Yes |
| Host | freeunitconvertor.com | freeunitconvertor.com | Yes |
| Trailing slash | No | No (root has `/`) | Yes |
| www | No | No | Yes |

Root canonical is `https://freeunitconvertor.com/` (with trailing slash) while sitemap has `https://freeunitconvertor.com` (without). This is a minor inconsistency but Next.js normalises both.

## Robots.txt Analysis

**File:** `public/robots.txt` (regenerated at build)

```
User-agent: *
Allow: /
Disallow: /*?from=
Disallow: /*?to=
Disallow: /*?*=

User-agent: Googlebot
Allow: /
Disallow: /*?from=
Disallow: /*?to=
Disallow: /*?*=

User-agent: Bingbot
Allow: /
Disallow: /*?from=
Disallow: /*?to=
Disallow: /*?*=

Host: https://freeunitconvertor.com
Sitemap: https://freeunitconvertor.com/sitemap.xml
```

### Issues

1. **`Disallow: /*?*=` is overly aggressive** -- This pattern blocks ANY URL with ANY query parameter. This means if Google appends tracking parameters (e.g., `?utm_source=`) or if any page legitimately uses query params, those URLs are blocked. The `/cooking` and `/power` pages use `?from=` query params for default unit selection, which are correctly blocked, but the wildcard `/*?*=` goes much further than intended.

2. **Redundant user-agent blocks** -- The Googlebot and Bingbot sections are identical to the wildcard section. This adds no value.

3. **`Host` directive** -- Non-standard. Google ignores it; Yandex uses it. Harmless but unnecessary.

## Scalability Assessment

The current approach (static public/sitemap.xml regenerated at build) works for 26 URLs but has limitations:

- Adding converter-specific pages (e.g., `/meters-to-feet`) would require `generateStaticParams` on dynamic routes
- Blog posts already demonstrate the failure mode: without `generateStaticParams`, dynamic routes are excluded
- `sitemapSize: 5000` suggests awareness of scaling, but the architecture doesn't support it yet
- No sitemap index is generated (`generateIndexSitemap: false`)

## Recommended Fixes

### P0: Add generateStaticParams to blog/[slug]

```typescript
export async function generateStaticParams() {
  const { posts } = blogData;
  return posts.map((post) => ({ slug: post.id }));
}
```

This will:
- Include all 13 blog posts in the build output as static pages
- Include them in the sitemap automatically
- Improve page load performance (static vs dynamic)

### P1: Fix lastmod values

Replace `new Date().toISOString()` with actual content dates. For blog posts, use the post's date. For tool pages, consider using git commit dates or a manual date map.

### P1: Remove overly broad robots.txt rule

Change `Disallow: /*?*=` to more specific rules:
```
Disallow: /*?from=
Disallow: /*?to=
Disallow: /*?tab=
```

### P2: Add sitemap index

When the site scales to 50+ pages, split into multiple sitemaps:
- `sitemap-tools.xml`
- `sitemap-blog.xml`
- `sitemap-conversions.xml` (future)

## UNVERIFIED

- Whether `/robots.txt` and `/sitemap.xml` are accessible on the live site (requires network access)
- Whether Google has actually crawled and indexed the sitemap URLs (requires Google Search Console)
- Whether there is drift between what the code generates and what is currently deployed
