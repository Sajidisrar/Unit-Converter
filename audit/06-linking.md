# Stage 6 -- Internal Linking

## Link Sources

### Navbar (`src/components/Navbar.tsx`)

Desktop navigation links (6 tools):
- Home `/`
- Blog `/blog`
- Unit Converter `/unit-converter`
- Encoding `/encoding`
- JSON `/json`
- Text `/text`

Mobile navigation adds 2 more:
- AI Tools `/ai-tools`
- Power `/power`

**Missing from navbar:** `/xml`, `/yaml`, `/csv`, `/hash-generator`, `/color-converter`, `/ocr-scanner`, `/cooking`, `/electricity-consumption`, `/fitness`, `/fuel-economy`, `/aws-practice-exam`, `/developer`, `/about`

### Footer (`src/components/Footer.tsx`)

Tools section (6 links):
- Unit Converter `/unit-converter`
- Encoding Tools `/encoding`
- JSON Tools `/json`
- Text Tools `/text`
- AI Tools `/ai-tools`
- Power Converter `/power`

Quick Links section (5 links):
- Home `/`
- About `/about`
- Contact `/contact`
- Privacy `/privacy`
- Terms `/terms`

**Missing from footer:** `/xml`, `/yaml`, `/csv`, `/hash-generator`, `/color-converter`, `/ocr-scanner`, `/cooking`, `/electricity-consumption`, `/fitness`, `/fuel-economy`, `/aws-practice-exam`, `/developer`, `/blog`

### Homepage (`src/app/page.tsx`)

The homepage links to all 14 tools via the `allTools` grid (line 39-57). Additional contextual links in the "Tools for Different Fields" section and "Popular Tool Categories" section.

**Tools linked from homepage:** All 14 registered tools, plus category links to specific tool sub-features.

### DeveloperToolsNav (`src/components/DeveloperToolsNav.tsx`)

Cross-links 9 developer tools (excluding current page):
- JSON `/json`, XML `/xml`, YAML `/yaml`, CSV `/csv`
- Hash Generator `/hash-generator`, Encoding `/encoding`, Text `/text`
- Color Converter `/color-converter`, AI Tools `/ai-tools`
- "View All Developer Tools" link to `/developer`

**Used on:** `/color-converter`, `/electricity-consumption`, and likely other tool pages.

### Blog cross-linking

- Blog index links to all posts
- Blog posts link to related posts (same category)
- Blog posts link back to relevant tools in content (e.g., "use our JSON to CSV Converter")

## Click Depth From Homepage

| Depth | Routes |
|-------|--------|
| **0** | `/` (homepage) |
| **1** | All 14 tools (via allTools grid), `/blog`, `/about`, `/contact`, `/privacy`, `/terms`, `/developer` (via footer/nav) |
| **2** | `/blog/ai-prompt-engineering`, `/blog/unit-conversion-best-practices` (via blog index), individual blog posts (via blog index) |
| **3+** | None identified -- all pages are within 2 clicks |

## Orphan Pages

| Page | Linked from | Status |
|------|-------------|--------|
| 11 dynamic blog posts | Blog index only | **Semi-orphaned** -- linked from `/blog` but not from sitemap, not from any tool page, not from navbar/footer |
| `/aws-practice-exam` | Homepage allTools grid | OK -- linked from homepage |
| `/ocr-scanner` | Homepage allTools grid | OK -- linked from homepage |

## Internal Link Graph

```
Homepage (/)
  +-- 14 tool pages (allTools grid)
  |     +-- Each developer tool --> DeveloperToolsNav (8 other dev tools)
  |     +-- /developer --> links to /json, /csv, /encoding, /unit-converter
  |     +-- /cooking --> /unit-converter, /fitness
  |     +-- /power --> /electricity-consumption, /unit-converter
  |     +-- /electricity-consumption --> /power, /unit-converter
  |     +-- /fitness --> /unit-converter, /developer
  |     +-- /fuel-economy --> /unit-converter, /developer
  +-- /blog
  |     +-- /blog/[slug] (13 posts, via blog index)
  |           +-- related posts (2 per post, same category)
  |           +-- tool links in content
  +-- /about --> /, /developer, /power, /unit-converter, /encoding, /json, /electricity-consumption, /cooking
  +-- /contact (no outbound links)
  +-- /privacy (no outbound links)
  +-- /terms (no outbound links)
```

## Assessment

### Strengths
1. **All tools are 1 click from homepage** -- The allTools grid ensures every tool is directly accessible.
2. **DeveloperToolsNav provides good cross-linking** between developer tools (9 tools interlinked).
3. **Click depth is excellent** -- No page is more than 2 clicks from the homepage.
4. **Tool pages link to related tools** contextually in their SEO content sections.

### Weaknesses

1. **Navbar links only 4-6 tools** (desktop) out of 14+ available. Eight tools are only reachable via the homepage grid or DeveloperToolsNav. If a user navigates to any page other than the homepage, they lose access to most tools unless they use the browser back button.

2. **Footer is incomplete** -- Missing `/blog`, `/developer`, and 8 tool pages. The footer should be the last-resort navigation to every important page.

3. **No converter-specific cross-links** -- The unit converter page doesn't link to cooking, power, fitness, or fuel-economy converters directly. These are related conversion tools that should cross-reference each other.

4. **Blog posts are weakly linked** -- Blog posts link to tools in their content (good), but tool pages never link to relevant blog posts (bad). For example, `/json` should link to the "Convert JSON to CSV" blog post.

5. **No breadcrumb navigation** -- Despite having a BreadcrumbList schema in the root layout, there are no visible breadcrumbs on any page. Breadcrumbs would help both navigation and SEO.

6. **Contact form has no action** -- The contact page form (`contact/page.tsx:27`) renders a `<form>` with no `action` or `onSubmit` handler. It's non-functional.

## Recommendations

### P1: Expand navbar to include all tool categories
Add a dropdown or mega-menu that groups tools by category (Converters, Developer Tools, Learning).

### P1: Add blog link to footer
The blog is a content asset that should be discoverable from every page.

### P2: Add "Related Tools" section to converter pages
Each converter should link to 3-4 related converters (e.g., power --> electricity, unit-converter; cooking --> fitness, unit-converter).

### P2: Add "Related Articles" to tool pages
Link from tool pages to relevant blog posts to distribute page authority and provide user value.

### P3: Add visible breadcrumbs
Implement breadcrumb navigation on all non-homepage pages using the existing BreadcrumbList schema pattern.
