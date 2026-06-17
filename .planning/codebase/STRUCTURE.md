# Codebase Structure

**Analysis Date:** 2026-06-17

## Directory Layout

```
topografia-lp-demo/
├── app/                        # Next.js App Router
│   ├── globals.css             # Tailwind theme, CSS variables, custom utilities
│   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD, analytics)
│   └── page.tsx                # Single route — composes all sections
├── components/                 # All landing page section components
│   ├── ui/                     # shadcn/ui primitives (base-nova style)
│   │   ├── accordion.tsx       # Accordion, AccordionItem, AccordionTrigger, AccordionContent
│   │   ├── badge.tsx           # Badge with CVA variants
│   │   ├── button.tsx          # Button with CVA variants (default/outline/secondary/ghost/destructive/link)
│   │   └── separator.tsx       # Horizontal/vertical separator
│   ├── about.tsx               # Company info, credentials, stats
│   ├── blog-preview.tsx        # 3 blog article preview cards
│   ├── brazil-3d.tsx           # Interactive 3D Brazil terrain (React Three Fiber)
│   ├── calculator.tsx          # Client-side cost estimator
│   ├── client-logos.tsx        # Animated scrolling logo marquee
│   ├── contact-form.tsx        # CTA section + form with validation
│   ├── coverage-map.tsx        # Interactive state grid (12 served states)
│   ├── differentials.tsx       # 5 differentiators in asymmetric grid
│   ├── equipment.tsx           # 4 equipment cards with specs
│   ├── faq.tsx                 # 7 FAQ accordion items
│   ├── footer.tsx              # 4-column footer
│   ├── google-rating.tsx       # Google Reviews display
│   ├── hero.tsx                # Hero with stats, certifications, CTAs
│   ├── navbar.tsx              # Fixed header with scroll-aware styling
│   ├── process.tsx             # 5-step workflow timeline
│   ├── projects.tsx            # 4 project cards with images
│   ├── services.tsx            # 6 service cards (SRV-01 to SRV-06)
│   ├── testimonials.tsx        # Carousel with 4 testimonials
│   ├── topo-background.tsx     # Section-level overlay (grid, coordinates)
│   ├── topo-page-background.tsx # Global fixed SVG hypsometric background
│   └── whatsapp-button.tsx     # Floating WhatsApp CTA
├── lib/                        # Shared utilities
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
├── public/                     # Static assets
│   └── images/                 # Image assets (referenced but not all present)
├── .gitignore                  # Git ignore rules
├── .planning/                  # Planning documents (this directory)
│   └── codebase/               # Codebase analysis documents
├── components.json             # shadcn/ui configuration (base-nova style)
├── next.config.mjs             # Next.js config (ignoreBuildErrors, unoptimized images)
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── pnpm-workspace.yaml         # pnpm workspace config
├── postcss.config.mjs          # PostCSS config (@tailwindcss/postcss)
├── tsconfig.json               # TypeScript config (strict, ES6, bundler resolution)
└── README.md                   # Project readme
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router — routing and layout
- Contains: `layout.tsx` (root layout), `page.tsx` (single route), `globals.css` (theme)
- Key files: `app/layout.tsx` (HTML shell, fonts, SEO), `app/page.tsx` (section composition), `app/globals.css` (design tokens)

**`components/`:**
- Purpose: All UI components — each file is one landing page section
- Contains: 22 component files (18 sections + 2 backgrounds + 1 3D visual + 1 floating CTA)
- Key files: `components/hero.tsx` (above-fold), `components/contact-form.tsx` (conversion), `components/navbar.tsx` (navigation)

**`components/ui/`:**
- Purpose: shadcn/ui primitive components (base-nova style with @base-ui/react)
- Contains: 4 reusable primitives — accordion, badge, button, separator
- Key files: `components/ui/button.tsx` (primary interactive element), `components/ui/accordion.tsx` (used by FAQ)

**`lib/`:**
- Purpose: Shared utility functions
- Contains: `utils.ts` — the `cn()` class name merger
- Key files: `lib/utils.ts` (used by all UI primitives)

**`public/images/`:**
- Purpose: Static image assets referenced by components
- Contains: Background images, project photos (some referenced in code may be missing)

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout — sets up HTML, fonts, metadata, JSON-LD, analytics
- `app/page.tsx`: Single route — composes all 18 section components

**Configuration:**
- `package.json`: Dependencies and scripts (`dev`, `build`, `start`, `lint`)
- `tsconfig.json`: TypeScript strict mode, ES6 target, bundler resolution, `@/*` path alias
- `next.config.mjs`: `ignoreBuildErrors: true`, `images.unoptimized: true`
- `components.json`: shadcn/ui config — base-nova style, RSC enabled, lucide icons
- `postcss.config.mjs`: Tailwind CSS v4 PostCSS plugin

**Core Logic:**
- `components/calculator.tsx`: Client-side pricing calculator with `serviceBase` data and `calculate()` function
- `components/contact-form.tsx`: Form validation logic, phone formatting, submission simulation
- `components/topo-page-background.tsx`: Procedural SVG generation for hypsometric contour lines
- `components/brazil-3d.tsx`: Procedural 3D terrain generation with elevation functions

**Theme & Design Tokens:**
- `app/globals.css`: All CSS custom properties, Tailwind theme tokens, custom utilities (technical-grid, petroleum-accent, topo-animate)

## Naming Conventions

**Files:**
- Kebab-case for all files: `hero.tsx`, `contact-form.tsx`, `topo-background.tsx`
- UI primitives match shadcn convention: `button.tsx`, `accordion.tsx`, `badge.tsx`
- Config files use library conventions: `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`

**Components:**
- Named exports (not default): `export function Hero()`, `export function ContactForm()`
- PascalCase function names matching file names: `hero.tsx` → `Hero`
- Internal sub-components use PascalCase: `ServiceCard`, `CountUp`, `StarRating`
- UI primitives use shadcn pattern: `Button`, `Accordion`, `Badge`

**Variables & Constants:**
- `UPPER_SNAKE_CASE` for module-level constants: `VP`, `HYPS`, `FEATS`, `serviceBase`
- `camelCase` for functions and state: `scrollToContact`, `handleCalculate`, `formatPhone`
- Interface names: PascalCase with descriptive suffixes: `FormData`, `FormErrors`, `CountUpProps`, `Service`

**CSS Classes:**
- Tailwind utility classes for layout and spacing
- CSS custom properties for brand colors: `bg-primary`, `text-foreground`, `border-border`
- Custom utility classes defined in `globals.css`: `petroleum-accent`, `technical-grid`, `topo-animate`
- Inline `style={{ borderRadius: '8px' }}` used frequently for border-radius (bypasses Tailwind)

## Where to Add New Code

**New Landing Page Section:**
1. Create `components/new-section.tsx` following the pattern:
   - `'use client'` directive
   - Import `motion` from `framer-motion`
   - Define `const VP = { once: true, amount: 0.05 } as const`
   - Define data array as `const` within the file
   - Export named function component
2. Import and add to `app/page.tsx` in the desired position

**New UI Primitive:**
- Location: `components/ui/new-component.tsx`
- Follow shadcn/base-nova pattern: import from `@base-ui/react`, use `cn()` from `@/lib/utils`
- Register in `components.json` if needed

**New Shared Utility:**
- Location: `lib/new-util.ts`
- Import via `@/lib/new-util` (path alias configured in `tsconfig.json`)

**New Static Data:**
- For service/pricing data: Define at top of component file or create `lib/data/` directory
- For images: Place in `public/images/` and reference via `/images/filename.ext`

**New Configuration:**
- Environment variables: Add to `.env.local` (gitignored)
- Next.js config: Edit `next.config.mjs`
- TypeScript config: Edit `tsconfig.json`

## Special Directories

**`.next/`:**
- Purpose: Next.js build output (dev and production)
- Generated: Yes
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes
- Committed: No (in `.gitignore`)

**`.planning/`:**
- Purpose: GSD planning documents and codebase analysis
- Generated: Yes (by GSD tools)
- Committed: Yes (by orchestrator)

**`public/images/`:**
- Purpose: Static assets served at root URL
- Generated: No (manual)
- Committed: Yes (partially — some images referenced in code may be missing)

---

*Structure analysis: 2026-06-17*
