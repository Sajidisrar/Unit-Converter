# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application providing free online unit conversion tools. It covers measurement (length, weight, temperature, area, speed, volume, time, pressure, angle), energy and power, cooking, fitness, fuel economy and data storage, plus hand-written landing pages for high-intent conversion pairs such as `/kg-to-lbs`.

The developer tools that once lived here (JSON, YAML, XML, CSV, Base64, JWT, regex, colour, OCR, AWS exam) were removed to align with the freeunitconvertor.com domain. Their URLs are 301-redirected to `/` in `next.config.ts`; do not reintroduce them without revisiting that decision.

The application uses:
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict type checking
- **Tailwind CSS v4** with custom design token system
- **Turbopack** for development only. The production build uses webpack: a Turbopack production build emits server chunks that fail to instantiate under `next start` with `output: "standalone"`.
- Vercel Analytics for tracking
- Google AdSense for monetization

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production (includes sitemap generation)
npm run build

# Start production server
npm start

# Linting
npm run lint              # Run ESLint
npm run lint:fix          # Auto-fix linting issues
npm run lint:check        # Lint with zero warnings allowed (used in pre-commit)

# Type checking
npm run type-check        # Run TypeScript compiler check

# Tests (Vitest)
npm run test              # Run the conversion test suite
npm run test:watch        # Watch mode

# Pre-commit validation
npm run check-all         # type-check + lint:check + test
```

## Architecture & Code Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [tool]/page.tsx    # Individual tool pages
│   ├── blog/              # Blog posts (dynamic routes)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── globals.css        # Tailwind CSS + design tokens
├── components/            # React components
│   └── shared/            # Reusable components (Button, Card, InputField, etc.)
├── hooks/                 # Custom React hooks
│   └── useConverter.ts    # Core conversion logic hook
├── utils/                 # Utility functions
│   ├── conversions.ts     # All unit conversion logic
│   ├── validation.ts      # Input validation
│   └── errorHandling.ts   # Error handling utilities
├── types/                 # TypeScript type definitions
│   └── conversions.ts     # Conversion-related types
├── constants/             # Application constants
│   └── tools.ts           # Tool configurations and metadata
└── data/                  # Static data
    └── developerTools.ts  # Developer tools metadata
```

### Key Architectural Patterns

**Conversion System Architecture**:
- All conversion logic is centralized in `src/utils/conversions.ts`
- Each conversion type (length, weight, temperature, etc.) uses a base unit approach
- Conversions always go: `fromUnit → baseUnit → toUnit`
- Example: Converting inches to feet: `inches → meters → feet`
- `convertByType(conversionType, value, from, to)` is the single dispatch point. Both `Calculator` and the `useConverter` hook route through it, so a new converter is registered once
- Temperature is affine (slope and offset), not a plain ratio. Anything that assumes a single multiplication factor must special-case it
- Use exact definitional constants, not rounded ones: a foot is exactly 0.3048 m, a pound exactly 0.45359237 kg. `src/utils/conversions.test.ts` asserts these to ten decimal places
- `Calculator` is the live calculator component. `useConverter` currently has no consumer

**Component Patterns**:
- `ConverterLayout` is the shared layout wrapper for all converter pages
- Converter pages follow a consistent pattern: use `useConverter` hook + `ConverterLayout` component
- Shared components in `components/shared/` are designed to be reusable across tools
- Ad banner placement is handled via the `AdBanner` component with positioning props

**Tool Registration**:
- `src/constants/tools.ts` is the single source of truth. The navbar, footer, homepage grid, breadcrumbs and related-tool blocks all derive from it — never hardcode a tool list
- Each tool requires: name, url, icon, category, description, keywords. Optional: relatedPosts, featured
- `popularConversions` in the same file registers the conversion-pair landing pages so they are linked from the footer and homepage rather than orphaned
- Adding a new tool: create the page, add the entry to `allTools`

**Ad placement**:
- AdSense fills only the *first* occurrence of a slot ID on a page; later duplicates return `unfilled`. `AD_SLOTS` in `src/components/AdBanner.tsx` maps positions to IDs, and several positions currently share one
- Never render the same position twice on a page. `AdBanner` reference-counts mounted slots and warns, but the fix belongs at the call site
- Verify after changes: build, then check no page's HTML contains a repeated `data-ad-slot`

### Type System

The conversion system uses these core types (`src/types/conversions.ts`):
- `ConversionType`: Union type of all supported conversion types
- `ConversionResult`: Standard result shape with validation state
- `ToolConfig`: Configuration shape for tool metadata

### Styling & Design System

The project uses Tailwind CSS v4 with a custom design token system defined in `globals.css`:
- CSS custom properties for colors, spacing, typography, shadows, transitions
- Design tokens organized into semantic categories (primary, success, error, etc.)
- Utility classes for buttons (`.btn-*`), inputs (`.input`), cards (`.card-*`)
- Built-in dark mode support via `prefers-color-scheme`
- Accessibility features: reduced motion support, high contrast mode, focus states

## Adding New Features

### Adding a New Unit Converter

1. Add conversion functions to `src/utils/conversions.ts`:
   ```typescript
   export const myUnitConversions = { /* base unit conversions */ };
   export const myUnits = [/* unit options */];
   export function convertMyUnit(value: number, from: string, to: string): number {
     // Convert via base unit
   }
   ```

2. Add the type to `ConversionType` union in `src/types/conversions.ts`

3. Add conversion case in `useConverter.ts` hook's `convertValue` function

4. Create the page at `src/app/my-converter/page.tsx` using `ConverterLayout` pattern

5. Register the tool in `src/constants/tools.ts`

### Adding a New Developer Tool

1. Create the tool page at `src/app/my-tool/page.tsx`

2. Register in `src/constants/tools.ts` with `category: "developer"`

3. Optionally add to `src/data/developerTools.ts` if it needs separate listing

## Important Patterns & Conventions

**Path Aliases**: Use `@/*` imports for all internal modules (configured in `tsconfig.json`)

**ESLint Rules**:
- `@typescript-eslint/no-explicit-any`: Error - no `any` types allowed
- `@typescript-eslint/no-unused-vars`: Error - no unused variables
- React hooks exhaustive deps: Warning
- No var, prefer const

**Pre-commit Hooks**: Husky runs `lint:check` and `type-check` before every commit. Both must pass.

**SEO & Metadata**:
- All pages should have proper metadata (title, description, OpenGraph)
- Root layout defines site-wide metadata base
- Sitemap is auto-generated on build via `next-sitemap`
- Structured data (JSON-LD) is used throughout for SEO

**Build Configuration**:
- Turbopack enabled for dev and build
- Standalone output mode for optimized deployments
- Sitemap generation runs post-build

## Testing & Validation

Before committing:
1. Run `npm run check-all` — type-check, lint and the Vitest suite
2. Pre-commit hooks enforce this automatically
3. Build with `npm run build` to catch build-time issues
4. Any change to `src/utils/conversions.ts` needs test coverage. Assert against exact definitional values, not the current output

## Deployment

The application is configured for standalone deployment (Vercel recommended):
- `output: "standalone"` in `next.config.ts`
- Sitemap automatically generated to `/sitemap.xml`
- Environment variable `SITE_URL` can override the base URL
