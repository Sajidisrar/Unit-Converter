# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application providing free online unit conversion tools and developer utilities. The site offers two main categories: **Unit Converters** (length, weight, temperature, area, speed, power, cooking) and **Developer Tools** (JSON formatter, Base64 encoder/decoder, JWT decoder, regex validator, etc.).

The application uses:
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict type checking
- **Tailwind CSS v4** with custom design token system
- **Turbopack** for faster development and builds
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

# Pre-commit validation (runs both)
npm run check-all         # Runs type-check + lint:check
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
- The `useConverter` hook provides a unified interface for all converter pages

**Component Patterns**:
- `ConverterLayout` is the shared layout wrapper for all converter pages
- Converter pages follow a consistent pattern: use `useConverter` hook + `ConverterLayout` component
- Shared components in `components/shared/` are designed to be reusable across tools
- Ad banner placement is handled via the `AdBanner` component with positioning props

**Tool Registration**:
- All tools are registered in `src/constants/tools.ts` in the `allTools` array
- Each tool requires: name, url, icon, category, description
- Tools are automatically categorized and displayed on the homepage
- Adding a new tool requires: creating the page + adding entry to `allTools`

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
1. Run `npm run check-all` to validate both types and linting
2. Pre-commit hooks will enforce this automatically
3. Build the project with `npm run build` to catch build-time issues

## Deployment

The application is configured for standalone deployment (Vercel recommended):
- `output: "standalone"` in `next.config.ts`
- Sitemap automatically generated to `/sitemap.xml`
- Environment variable `SITE_URL` can override the base URL
