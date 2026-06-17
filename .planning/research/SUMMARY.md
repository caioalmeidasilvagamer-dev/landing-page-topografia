# Project Research Summary

**Project:** Topografia LP Demo
**Domain:** Config-driven Next.js landing page template for topography/surveying professionals
**Researched:** 2026-06-17
**Confidence:** HIGH

## Executive Summary

This project is a landing page template where a single `site.config.ts` file customizes 18 section components for different topography/surveying businesses. The standard 2025 approach combines TypeScript config objects with Zod runtime validation — a pattern used by major open-source templates (CoolAssPuppy/landing-pages, landing-kit, launch-kit-app). The config lives at the project root, components import their data directly, and Zod schemas validate at build time with clear error messages.

The recommended architecture uses a flat config object with section-specific sub-objects, direct imports in components (no React Context, no prop drilling), and CSS variables for theme customization. The critical risk is the "7 WhatsApp Numbers" problem — hardcoded data scattered across 7+ files that must all be migrated to config in a single atomic phase. Additionally, `ignoreBuildErrors: true` in `next.config.mjs` must be removed before config refactoring begins, or type errors will accumulate silently.

The biggest pitfall is the monolithic config explosion — a single file growing to 500+ lines becomes harder to navigate than the original hardcoded components. The flat structure with clear section naming and JSDoc comments prevents this. Color migration from inline hex to CSS variables must happen BEFORE content refactoring, otherwise the config's color section becomes decorative rather than functional.

## Key Findings

### Recommended Stack

The project already uses Next.js 16.2.6, React 19, and TypeScript 5.7.3. The only new dependency is **Zod 3.24.x** for runtime schema validation — the industry standard for TypeScript config validation, used by t3-oss, Vercel, and every major Next.js template.

**Core technologies:**
- **Next.js 16.2.6**: Framework — App Router, SSG for landing pages, already in use
- **React 19**: UI library — Server Components available but not needed for this config pattern
- **TypeScript 5.7.3**: Type safety — strict typing for config objects with autocomplete
- **Zod 3.24.x**: Runtime schema validation — validates config at import time, fails fast with clear error messages
- **Lucide React**: Icon library — icons referenced by string name in config, mapped via `lib/icons.ts`

### Expected Features

**Must have (table stakes):**
- Centralized `site.config.ts` — the core value proposition, single file to customize everything
- Type-safe config with `SiteConfig` interface — prevents runtime errors, enables IDE autocomplete
- Hero section configurable — headline, subheadline, CTAs, badge, stats
- Services section configurable — array of service objects with code, name, description, icon
- Contact form configurable — phone, email, services list, WhatsApp number
- WhatsApp floating button — configurable number and pre-filled message (primary conversion channel in Brazil)
- SEO metadata configurable — title, description, OG image, Schema.org JSON-LD
- Footer configurable — company info, CNPJ, social links, certifications
- Responsive design maintained — 60%+ traffic is mobile
- Section ordering preserved — conversion-optimized sequence

**Should have (competitive):**
- Section toggle (enable/disable via config) — not every topographer needs all 18 sections
- Topographic visual identity — hypsometric colors, contour overlays, engineering grid
- Coverage map with configurable states — surveying is location-specific
- Equipment showcase with specs — technical clients evaluate by equipment quality
- Cost calculator with configurable pricing — instant estimation = higher engagement
- Process timeline, testimonials, Google rating, client logos, FAQ, blog preview, project gallery

**Defer (v2+):**
- Blog preview — static cards, lowest priority for a surveying template
- Calculator pricing config extraction — already works, polish not necessity
- Analytics integration — user adds their own via `layout.tsx`

### Architecture Approach

The architecture uses a flat `SiteConfig` object with section-specific sub-schemas. Each of the 18 components imports its own config slice directly — no React Context, no prop drilling from `page.tsx`. The config file is pure data (no React imports), ensuring it works in both Server Components (`layout.tsx` for metadata/JSON-LD) and client components. An icon mapping layer (`lib/icons.ts`) translates string icon names from config to actual Lucide icon components.

**Major components:**
1. `site.config.ts` — single source of truth, flat structure with Zod validation
2. `app/layout.tsx` — Server Component, imports config for metadata + JSON-LD Schema.org
3. `app/page.tsx` — composes all 18 section components
4. `lib/icons.ts` — maps string icon names to Lucide components
5. `lib/config-helpers.ts` — computed values (WhatsApp URL, JSON-LD) derived from config

**Component boundaries (18 components):**
- `layout.tsx` → `seo`, `company`
- `navbar.tsx` → `nav`, `company`
- `hero.tsx` → `hero`, `whatsapp`
- `services.tsx` → `services`
- `contact-form.tsx` → `contact`, `whatsapp`
- `calculator.tsx` → `calculator`, `services`
- `footer.tsx` → `company`, `seo`
- (plus 11 more section components, each owning its config slice)

### Critical Pitfalls

1. **Data Duplication ("7 WhatsApp Numbers" Problem)** — Hardcoded phone numbers, services, and emails exist in 7+ files. After partial refactoring, some components read config while others keep hardcoded copies. **Prevention:** Audit ALL hardcoded values first with grep, refactor all 18 components in a single atomic phase, verify zero hardcoded copies remain post-refactor.

2. **Server/Client Component Boundary Violation** — `layout.tsx` is a Server Component. If `site.config.ts` imports anything client-side (React components, icons), the build breaks. **Prevention:** Config file must be pure data — no imports of React components, no `'use client'` modules. Test with `npx tsc --noEmit`.

3. **Type Safety Collapse (`ignoreBuildErrors`)** — `next.config.mjs` has `typescript: { ignoreBuildErrors: true }`. Config type errors accumulate silently. **Prevention:** Remove `ignoreBuildErrors` before starting config refactoring. Add Zod runtime validation as backup.

4. **Incomplete Color Migration** — Components refactored for content but hardcoded hex colors (`#1F3A5F`) remain inline. Config has `colors` section but components ignore it. **Prevention:** Do color migration FIRST, before content refactoring. Replace every `style={{ color: '...' }}` with Tailwind classes referencing CSS custom properties.

5. **Monolithic Config Explosion** — Single config file grows to 500+ lines, becoming harder to navigate than the original hardcoded components. **Prevention:** Flatten into logical top-level sections with clear naming. Keep each section under 50 lines. Add JSDoc comments.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Config Types
**Rationale:** Must establish the config schema and type system before touching any component. Also must remove `ignoreBuildErrors` (Pitfall 6) and extract shared components like `<Logo>` (Pitfall 7) first.
**Delivers:** `site.config.ts` with full Zod schema + TypeScript types, `lib/icons.ts` icon mapping, removed `ignoreBuildErrors`, extracted `<Logo>` component
**Addresses:** Table stakes — centralized config, type-safe config
**Avoids:** Pitfalls 1, 4, 6, 7 (config explosion, server/client boundary, type safety, logo duplication)

### Phase 2: Color Migration
**Rationale:** Must happen BEFORE content refactoring (Pitfall 5). Config colors drive CSS variables, components consume CSS variables — this makes subsequent content refactoring meaningful.
**Delivers:** All 18 components using CSS variables instead of inline hex colors, `globals.css` updated with config-driven variables
**Addresses:** Theme customization (config `theme` section drives `--primary`, `--accent`)
**Avoids:** Pitfall 5 (incomplete color migration)

### Phase 3: Core Components Refactor
**Rationale:** Highest-impact components first — hero, services, contact form, WhatsApp button, footer, navbar. These are the conversion-critical sections.
**Delivers:** 6 core components reading from config instead of hardcoded data
**Addresses:** Table stakes — hero configurable, services configurable, contact form configurable, WhatsApp configurable, footer configurable, SEO configurable
**Avoids:** Pitfall 2 (data duplication — doing all-or-nothing in this phase), Pitfall 8 (contact form services drift), Pitfall 13 (WhatsApp number duplication), Pitfall 9 (Schema.org stale data)

### Phase 4: Supporting Components Refactor
**Rationale:** Lower-impact sections that add richness but aren't conversion-critical. Can be done in parallel since no dependencies between them.
**Delivers:** Remaining 12 components reading from config (equipment, differentials, about, projects, testimonials, client logos, Google rating, FAQ, process, coverage map, blog preview, calculator)
**Addresses:** Differentiators — equipment showcase, testimonials, FAQ, coverage map, process timeline
**Avoids:** Pitfall 12 (breaking monolithic contact-form.tsx — split CTA and Form first)

### Phase 5: Integration & Polish
**Rationale:** Final integration testing, demo config with fictional data, manual testing checklist, documentation.
**Delivers:** `site.config.example.ts` with all fields documented, manual test checklist with grep validation, README explaining config customization
**Addresses:** Demo config creation, anti-feature confirmation (no CMS, no auth, no backend)
**Avoids:** Pitfall 15 (demo vs production config confusion)

### Phase Ordering Rationale

- **Config types FIRST** because every subsequent phase depends on the schema being correct
- **Color migration SECOND** because it's a prerequisite for config colors to actually work
- **Core components THIRD** because they're conversion-critical and demonstrate the pattern
- **Supporting components FOURTH** because they follow the same pattern established in Phase 3
- **Integration LAST** because it validates everything works together
- This order avoids the "7 WhatsApp Numbers" problem by doing core components atomically in Phase 3

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Color Migration):** Need to verify Tailwind v4 CSS variable injection pattern — current approach uses `globals.css` but Tailwind v4 `@theme` integration needs validation
- **Phase 3 (Core Components):** Contact form is 456 lines with two unrelated sections (CTA + Form) — need to plan the split carefully before adding config props

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Well-documented Zod + TypeScript config pattern, multiple reference implementations
- **Phase 4 (Supporting Components):** Same pattern as Phase 3, no new architectural decisions

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Zod + TypeScript config validation is industry standard, used by t3-oss, Vercel, and every major Next.js template |
| Features | HIGH | Surveying-specific features verified against 5+ industry marketing sources; ecosystem patterns well-documented |
| Architecture | HIGH | Direct import over Context is standard for static content; build order dependencies are clear and linear |
| Pitfalls | HIGH | 10 critical pitfalls identified from real-world config-driven landing page implementations; project-specific concerns documented in CONCERNS.md |

**Overall confidence:** HIGH

### Gaps to Address

- **Tailwind v4 CSS variable integration:** The `@theme` directive pattern needs validation during Phase 2 planning — current `globals.css` uses standard CSS variables but Tailwind v4 has new mechanisms
- **Contact form split strategy:** The 456-line `contact-form.tsx` needs careful decomposition — CTA and Form sections have different config dependencies and should become separate components
- **Framer Motion re-render mitigation:** Config-driven re-renders may cause animation glitches in dev mode — need to decide if `React.memo` is worth the complexity for a static landing page

## Sources

### Primary (HIGH confidence)
- CoolAssPuppy/landing-pages — Config-driven Next.js landing page template with `site.ts`
- landing-kit (enxtur) — TypeScript config-first framework for static landing pages
- Zod documentation — Schema definition and type inference patterns
- Next.js App Router best practices (2026) — Server Components, TypeScript patterns
- t3-oss/env-nextjs — Zod-based environment validation pattern

### Secondary (MEDIUM confidence)
- TechResolve: "How I architected a config-driven marketplace with Next.js 15 App Router" — prop drilling vs Context patterns
- Vivid Labs: "How I made a modular React landing page" — self-documenting component architecture
- Land Surveyor Marketing, Gridline Marketing, Congero — surveying-specific website requirements

### Tertiary (LOW confidence)
- Project CONCERNS.md — existing tech debt (ignoreBuildErrors, all client components, inline hex colors)
- 2026 landing page checklists (Wix, FastStrat, Plerdy) — conversion best practices

---
*Research completed: 2026-06-17*
*Ready for roadmap: yes*
