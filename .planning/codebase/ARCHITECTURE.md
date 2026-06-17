<!-- refreshed: 2026-06-17 -->
# Architecture

**Analysis Date:** 2026-06-17

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                      │
│  `app/layout.tsx`  (Root Layout — fonts, metadata, SEO)     │
│  `app/page.tsx`    (Single Page — composes all sections)    │
├─────────────────────────────────────────────────────────────┤
│                  Landing Page Sections                       │
│  18 section components rendered sequentially in page.tsx     │
│  Each component is a self-contained 'use client' unit       │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐ ┌──────────────┐ ┌────────────────────┐
│  UI Layer   │ │  Animation   │ │   3D / Visual       │
│  shadcn/ui  │ │  framer-mtn  │ │   react-three       │
│  tailwind   │ │  scroll/env  │ │   procedural SVG    │
└─────────────┘ └──────────────┘ └────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              Static Data (hardcoded in components)           │
│  services, testimonials, projects, equipment, pricing        │
│  No API calls, no database, no external data sources         │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | HTML shell, fonts (IBM Plex Sans/Mono), metadata, SEO, JSON-LD, analytics | `app/layout.tsx` |
| HomePage | Composes all 18 sections in order | `app/page.tsx` |
| Navbar | Fixed header, scroll-aware styling, mobile menu, anchor navigation | `components/navbar.tsx` |
| Hero | Hero section with stats counter, certifications, CTAs | `components/hero.tsx` |
| ClientLogos | Animated scrolling logo marquee (two rows) | `components/client-logos.tsx` |
| Services | 6 service cards with codes (SRV-01 to SRV-06) | `components/services.tsx` |
| Equipment | 4 equipment cards with technical specs | `components/equipment.tsx` |
| Differentials | 5 differentiators in asymmetric grid layout | `components/differentials.tsx` |
| About | Company info, credentials, stats | `components/about.tsx` |
| CoverageMap | Interactive state grid showing 12 served states | `components/coverage-map.tsx` |
| Process | 5-step workflow timeline with animated progress line | `components/process.tsx` |
| Projects | 4 project cards with image hover effects | `components/projects.tsx` |
| GoogleRating | Google Reviews display with star ratings | `components/google-rating.tsx` |
| Testimonials | Carousel with 4 testimonials, sidebar list | `components/testimonials.tsx` |
| BlogPreview | 3 blog article preview cards | `components/blog-preview.tsx` |
| Calculator | Client-side cost estimator with pricing logic | `components/calculator.tsx` |
| FAQ | Accordion with 7 frequently asked questions | `components/faq.tsx` |
| ContactForm | CTA section + form with validation (simulated submit) | `components/contact-form.tsx` |
| Footer | 4-column footer with links, certifications, social | `components/footer.tsx` |
| WhatsAppButton | Fixed-position floating WhatsApp CTA (appears after 3s) | `components/whatsapp-button.tsx` |
| TopoPageBackground | Global fixed SVG background with hypsometric contour lines | `components/topo-page-background.tsx` |
| TopoBackground | Section-level overlay (grid, coordinates, background images) | `components/topo-background.tsx` |
| Brazil3D | Interactive 3D terrain model of Brazil (React Three Fiber) | `components/brazil-3d.tsx` |

## Pattern Overview

**Overall:** Single-Page Landing Page (Component Composition)

**Key Characteristics:**
- All UI is client-side rendered (`'use client'` directive on every component)
- No server-side data fetching, no API routes, no database
- All business data is hardcoded directly in component files
- Navigation uses anchor links with smooth scrolling
- Contact form and calculator simulate async operations with `setTimeout`
- Visual identity is "technical/cartographic" — engineering grid overlays, hypsometric colors, monospace metadata

## Layers

**App Router Layer:**
- Purpose: Next.js routing and layout scaffolding
- Location: `app/`
- Contains: `layout.tsx` (root layout), `page.tsx` (single route), `globals.css` (theme)
- Depends on: React, Next.js, Vercel Analytics
- Used by: Next.js framework

**Section Components Layer:**
- Purpose: Each component renders one landing page section
- Location: `components/`
- Contains: 18 section components, each self-contained with data + UI
- Depends on: framer-motion, lucide-react, shadcn/ui primitives
- Used by: `app/page.tsx`

**UI Primitives Layer:**
- Purpose: Reusable shadcn/ui components (base-nova style)
- Location: `components/ui/`
- Contains: `accordion.tsx`, `badge.tsx`, `button.tsx`, `separator.tsx`
- Depends on: `@base-ui/react`, `class-variance-authority`, `@/lib/utils`
- Used by: Section components (e.g., `faq.tsx` uses Accordion)

**Utilities Layer:**
- Purpose: Shared utility functions
- Location: `lib/`
- Contains: `utils.ts` (cn helper for Tailwind class merging)
- Depends on: `clsx`, `tailwind-merge`
- Used by: All UI primitives and some section components

**Background / Visual Layer:**
- Purpose: Global and section-level visual decorations
- Location: `components/topo-page-background.tsx`, `components/topo-background.tsx`, `components/brazil-3d.tsx`
- Contains: SVG hypsometric contour generation, engineering grid overlays, 3D terrain
- Depends on: React Three Fiber, Three.js, procedural math
- Used by: `app/layout.tsx` (page background), section components (local overlays)

## Data Flow

### Primary Request Path (Page Load)

1. Browser requests `/` → Next.js serves `app/layout.tsx` (`app/layout.tsx:61`)
2. Layout renders `<html>`, fonts, `<TopoPageBackground />`, and `{children}` (`app/layout.tsx:118-127`)
3. `app/page.tsx` composes 18 section components in order (`app/page.tsx:20-42`)
4. Each section renders its own hardcoded data and framer-motion animations
5. No data fetching occurs — everything is static/client-rendered

### Contact Form Submission Flow

1. User fills form in `ContactForm` (`components/contact-form.tsx:244`)
2. `handleSubmit` validates fields client-side (`components/contact-form.tsx:77-83`)
3. Simulated async: `await new Promise((r) => setTimeout(r, 1500))` (`components/contact-form.tsx:81`)
4. Status transitions: `idle` → `loading` → `success`
5. No actual API call — form data is discarded

### Calculator Estimation Flow

1. User selects service type and area in `Calculator` (`components/calculator.tsx:62`)
2. `handleCalculate` validates input and triggers loading state (`components/calculator.tsx:69-81`)
3. `calculate()` function applies pricing formula from hardcoded `serviceBase` data (`components/calculator.tsx:44-56`)
4. Result displayed with price range and estimated timeline
5. "Solicitar proposta formal" button scrolls to contact form

**State Management:**
- All state is local React `useState` within each component
- No global state, no context providers, no state management library
- Navigation state managed by `document.querySelector` + `scrollIntoView`
- Scroll position detected via `window.addEventListener('scroll', ...)` in Navbar

## Key Abstractions

**Section Component Pattern:**
- Purpose: Each section is a self-contained unit with data, layout, and animations
- Examples: `components/services.tsx`, `components/differentials.tsx`, `components/process.tsx`
- Pattern: `'use client'` → define data array → define VP viewport config → render with framer-motion

**Animation Viewport Config (VP):**
- Purpose: Standardized scroll-triggered animation config
- Examples: `const VP = { once: true, amount: 0.05 } as const` (found in nearly every component)
- Pattern: Components use `whileInView` with this shared viewport config for consistent reveal animations

**Section Numbering Convention:**
- Purpose: Visual section identifiers in the UI
- Examples: `Serviços / 01`, `Diferenciais / 02`, `Processo / 03`, `Contato / 07`
- Pattern: Each section header includes a monospace label with sequential numbering

**Hypsometric Color System:**
- Purpose: Topographic elevation color palette used across backgrounds
- Examples: `components/topo-page-background.tsx:5-13`
- Pattern: 7-stop color ramp from dark green (lowland) to near-white (peak), with opacity variants

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Any page navigation (Next.js App Router)
- Responsibilities: Sets HTML lang (`pt-BR`), loads IBM Plex fonts, injects JSON-LD structured data, renders global background, conditionally loads Vercel Analytics

**Home Page:**
- Location: `app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Composes all 18 section components in display order

**WhatsApp Floating Button:**
- Location: `components/whatsapp-button.tsx`
- Triggers: Renders after 3-second delay on page load
- Responsibilities: Fixed-position CTA linking to WhatsApp with pre-filled message

## Architectural Constraints

- **Threading:** Single-threaded browser environment. All components are client-side rendered. React Three Fiber (`Brazil3D`) runs WebGL in the main thread with `powerPreference: 'high-performance'`.
- **Global state:** No module-level singletons or shared mutable state. Each component is fully isolated.
- **Circular imports:** None detected. Import tree is strictly: `page.tsx` → section components → `lib/utils` / `components/ui/*`.
- **No API layer:** The entire application has zero server-side logic. Contact form and calculator are simulated with `setTimeout`. There are no Next.js API routes (`app/api/` does not exist).
- **Static data:** All business data (services, pricing, testimonials, projects, equipment specs, FAQ) is hardcoded directly in component files. There is no CMS, no database, no data fetching.

## Anti-Patterns

### Hardcoded Data in Components

**What happens:** Business data (services, pricing, testimonials) is defined as `const` arrays directly inside component files.
**Why it's wrong:** Any content update requires editing source code and redeploying. Pricing changes in `calculator.tsx` require code changes.
**Do this instead:** Extract data to a `data/` directory or external JSON files. For a landing page this may be acceptable, but for maintainability consider `lib/data/services.ts`, `lib/data/pricing.ts`, etc.

### Simulated Async Operations

**What happens:** Contact form and calculator use `setTimeout` to fake API calls (`components/contact-form.tsx:81`, `components/calculator.tsx:76`).
**Why it's wrong:** Creates false impression of functionality. Form submissions silently discard data.
**Do this instead:** Either integrate a real form service (Formspree, Resend, etc.) or clearly mark as demo/placeholder with visual indicators.

### Inline Styles for Brand Colors

**What happens:** Many components use `style={{ backgroundColor: '#1F3A5F' }}` instead of Tailwind classes.
**Why it's wrong:** Bypasses Tailwind's design system. Makes theme changes harder. Inconsistent with the CSS variable approach defined in `globals.css`.
**Do this instead:** Use the CSS custom properties already defined (e.g., `bg-primary`, `text-primary`). The theme tokens in `app/globals.css` already map `--primary: #1F3A5F`.

## Error Handling

**Strategy:** Minimal — no error boundaries, no error UI, no try-catch blocks.

**Patterns:**
- Contact form validation uses client-side field validation with error state (`components/contact-form.tsx:55-75`)
- Calculator validates numeric input before processing (`components/calculator.tsx:70-71`)
- `Brazil3D` has WebGL support detection with graceful fallback (`components/brazil-3d.tsx:274-294`)
- No global error boundary component exists

## Cross-Cutting Concerns

**Logging:** None. No console.log, no error tracking service (only Vercel Analytics for page views).

**Validation:** Client-side only. Contact form validates required fields, phone format, and minimum message length (`components/contact-form.tsx:55-75`). Calculator validates positive area input (`components/calculator.tsx:70-71`).

**Authentication:** Not applicable. Public landing page with no user accounts.

**SEO:** Comprehensive. Root layout includes OpenGraph metadata, structured data (JSON-LD LocalBusiness schema), robots directives, and semantic HTML with `lang="pt-BR"` (`app/layout.tsx:21-52`).

---

*Architecture analysis: 2026-06-17*
