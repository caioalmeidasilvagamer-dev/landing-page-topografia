# Feature Landscape

**Domain:** Configurable landing page template for topography/surveying professionals
**Researched:** 2026-06-17
**Confidence:** HIGH (ecosystem patterns well-documented; surveying-specific features verified against 5+ industry marketing sources)

## Table Stakes

Features users expect. Missing = template fails or feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Centralized config file** (`site.config.ts`) | Core value proposition — one file to rule them all | Low | TypeScript for type safety + autocomplete. All competitor templates (landing-kit, launch-kit, next-mobile-landing) use this pattern. |
| **Type-safe config** (`SiteConfig` interface) | Prevents runtime errors, enables autocomplete in IDE | Low | Use TypeScript interfaces with JSDoc comments so non-devs understand fields. |
| **Color/brand customization** via config | Every business has different branding | Low | Map config values to CSS variables in `globals.css`. Already have the variable system in place (`--primary`, `--secondary`, etc.). |
| **Logo configuration** (light/dark variants) | Brand identity is non-negotiable | Low | Support `/images/logo.png` path in config; navbar and footer consume it. |
| **Hero section configurable** (headline, subheadline, CTAs, badge, stats) | First impression — must match business identity | Low | Headline, subheadline, primary/secondary CTA text+URL, stat counters, certification badges. |
| **Services section configurable** (array of service objects) | Core business offering — varies per topographer | Medium | Each service: code (SRV-01), name, description, icon. Array length should be flexible (3-8). |
| **Contact form configurable** (phone, email, services list, WhatsApp number) | Lead capture is the page's primary goal | Medium | Phone, email, pre-filled service options, WhatsApp number for floating button. |
| **WhatsApp floating button** with configurable number and pre-filled message | Primary conversion channel for Brazilian market | Low | Number, message template, delay before showing (default 3s). |
| **SEO metadata configurable** (title, description, OG image, Schema.org) | Discoverability — must rank for local searches | Medium | Title, description, canonical URL, OG image, JSON-LD LocalBusiness schema. Already in `layout.tsx`. |
| **Footer configurable** (company info, CNPJ, social links, certifications) | Legal requirements (CNPJ) + social proof | Low | Company name, CNPJ, address, social links (Instagram, LinkedIn, etc.), certification logos. |
| **Responsive design maintained** after config refactoring | 60%+ of traffic is mobile; losing responsiveness = losing leads | Medium | Must verify all 18 components remain responsive after config integration. |
| **Section ordering preserved** | Components render in a specific conversion-optimized sequence | Low | Config shouldn't change section order (yet) — keep current `page.tsx` composition. |

## Differentiators

Features that set this template apart from generic landing page templates. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Section toggle** (enable/disable sections via config) | Not every topographer needs all 18 sections. A solo surveyor may skip "Client Logos" or "Blog Preview". | Medium | Add `sections: { hero: true, services: true, ... }` to config. Components conditionally render in `page.tsx`. |
| **Topographic visual identity** (hypsometric colors, contour overlays, engineering grid) | Instantly communicates "this is for surveyors" — not a generic template | Low | Already built (`topo-page-background.tsx`, `topo-background.tsx`). Make colors configurable via CSS variables. |
| **Coverage map** with configurable states/regions | Surveying is location-specific — clients need to know you serve their area | Low | Config: array of states/regions served. Component renders interactive grid. |
| **Equipment showcase** with configurable specs | Technical clients (developers, engineers) evaluate by equipment quality | Low | Config: array of equipment objects (name, brand, specs, image). |
| **Cost calculator** with configurable pricing and services | Instant estimation = higher engagement + qualified leads | Medium | Config: service base prices, area multipliers, formula parameters. Already built, just needs config extraction. |
| **Process timeline** with configurable steps | Shows professionalism and sets expectations | Low | Config: array of step objects (title, description, icon). Already built. |
| **Testimonials** with configurable entries (name, role, company, text, rating) | Social proof from real clients builds trust | Low | Config: array of testimonial objects. Already built with carousel. |
| **Google rating display** with configurable rating and review count | Third-party validation (Google reviews carry weight in Brazil) | Low | Config: rating number, review count, profile URL. |
| **Client logos** marquee with configurable logo paths | Visual proof of client base | Low | Config: array of image paths. Already built with animation. |
| **FAQ section** with configurable questions/answers | Handles objections before they become blockers | Low | Config: array of Q&A objects. Already built with accordion. |
| **Blog preview** with configurable article cards | SEO + thought leadership (even as static preview) | Low | Config: array of article objects (title, excerpt, image, date, URL). |
| **Project gallery** with configurable project cards | Shows real work outcomes | Low | Config: array of project objects (title, description, image, tags). |
| **About section** with configurable engineer data + credentials | Trust through credentials (CREA, CNPJ, experience) | Low | Config: engineer name, title, bio, credentials, company name, stats. |
| **Pricing section** (implicit via calculator) | Transparency on pricing increases conversion | Low | Pricing data flows from config to calculator. Not a separate section. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **CMS or admin panel** | Target user is a developer/technical professional who edits code. CMS adds complexity, hosting requirements, and security surface. | Config file (`site.config.ts`) is the single source of truth. Document clearly. |
| **i18n / internationalization** | Template is for Brazilian market only (Portuguese). Adding i18n doubles translation work for zero benefit. | Hardcode `lang="pt-BR"` and Portuguese content. |
| **Authentication / protected routes** | Landing page is public. Auth adds backend dependency. | Not applicable. |
| **Backend / database** | Pure frontend project. No server-side logic needed. | Contact form simulates submission. Calculator is client-side. |
| **A/B testing framework** | Overkill for a template demo. Requires analytics infrastructure. | Manual testing only. User can add their own analytics later. |
| **Visual drag-and-drop editor** | Massive engineering effort. Conflicts with the "edit config file" philosophy. | Config file with clear TypeScript types + JSDoc is the "editor". |
| **Multi-page routing** | Single-page landing page. Multi-page adds routing complexity. | One route (`/`). All sections scroll. |
| **Dynamic blog system** | Blog preview is static preview cards only. Real blog needs CMS, RSS, pagination. | Static preview cards link to external blog (if user has one). |
| **Real form submission** | Would require backend service (Formspree, Resend, etc.). Adds external dependency. | Simulated submission with visual feedback. User integrates their own service. |
| **Dark mode toggle** | Topographic visual identity is light-themed (engineering drawings are white background). Dark mode conflicts with the cartographic aesthetic. | Single theme. Colors configurable via CSS variables. |
| **Multi-tenant / white-label system** | This IS the white-label system (one config file per deployment). Multi-tenant adds auth, data isolation, routing. | One deployment = one business. Fork repo for each client. |
| **Analytics integration** | Adds external dependency (GA4, Plausible). User can add their own `<script>` tag. | User adds analytics via `layout.tsx` or config. |

## Feature Dependencies

```
site.config.ts (central config)
├── SiteConfig TypeScript interface (defines shape)
├── CSS variables system (already exists in globals.css)
│   └── Color customization flows through CSS vars
├── All 18 section components (each reads from config)
│   ├── layout.tsx → metadata, Schema.org, fonts
│   ├── navbar.tsx → logo, nav links, WhatsApp
│   ├── hero.tsx → headline, subheadline, CTAs, stats, badges
│   ├── services.tsx → services array
│   ├── equipment.tsx → equipment array
│   ├── differentials.tsx → differentials array
│   ├── about.tsx → engineer data, company info
│   ├── projects.tsx → projects array
│   ├── testimonials.tsx → testimonials array
│   ├── client-logos.tsx → logo paths array
│   ├── google-rating.tsx → rating, review count
│   ├── contact-form.tsx → phone, email, services, WhatsApp
│   ├── calculator.tsx → pricing data, service prices
│   ├── faq.tsx → Q&A array
│   ├── process.tsx → steps array
│   ├── coverage-map.tsx → states served array
│   ├── blog-preview.tsx → articles array
│   ├── footer.tsx → company info, social links, CNPJ
│   └── whatsapp-button.tsx → phone number, message
└── page.tsx → composes all sections, passes config props
```

## Config Schema (Recommended)

Based on ecosystem research, the `site.config.ts` should follow this structure:

```typescript
export const siteConfig = {
  // Brand identity
  brand: {
    name: string,           // "Eng. João Silva Topografia"
    logo: string,           // "/images/logo.png"
    logoDark?: string,      // "/images/logo-white.png" (optional)
    tagline?: string,       // "Precisão que transforma terrenos"
    description: string,    // SEO meta description
    url: string,            // "https://joaosilva.topografia.com.br"
  },

  // Theme customization
  theme: {
    primary: string,        // "#1F3A5F" — main brand color
    secondary: string,      // "#2E7D32" — accent color
    accent?: string,        // Additional accent (optional)
  },

  // SEO
  seo: {
    title: string,          // Page title
    description: string,    // Meta description
    ogImage?: string,       // OG image path
    jsonLd?: object,        // Schema.org structured data
  },

  // Contact / conversion
  contact: {
    phone: string,          // "+55 11 99999-0000"
    whatsapp: string,       // "5511999990000" (no spaces)
    whatsappMessage?: string, // Pre-filled message
    email: string,          // "contato@exemplo.com.br"
    address?: string,       // Full address
    cnpj?: string,          // "XX.XXX.XXX/0001-XX"
    hours?: string,         // "Seg-Sex: 8h-18h"
  },

  // Social links
  social?: {
    instagram?: string,
    linkedin?: string,
    youtube?: string,
    facebook?: string,
  },

  // Sections (content arrays)
  hero: {
    headline: string,
    subheadline: string,
    primaryCta: { text: string, url: string },
    secondaryCta?: { text: string, url: string },
    badge?: string,         // "CREA: XX-X XXXXX"
    stats?: Array<{ value: string, label: string }>,
  },

  services: Array<{
    code: string,           // "SRV-01"
    name: string,           // "Levantamento Topográfico"
    description: string,
    icon?: string,          // Lucide icon name
  }>,

  // ... (similar shape for each section)
  
  // Section toggles
  sections: {
    hero: boolean,
    services: boolean,
    equipment: boolean,
    differentials: boolean,
    about: boolean,
    projects: boolean,
    testimonials: boolean,
    clientLogos: boolean,
    googleRating: boolean,
    contactForm: boolean,
    calculator: boolean,
    faq: boolean,
    process: boolean,
    coverageMap: boolean,
    blogPreview: boolean,
  },
}
```

## MVP Recommendation

Prioritize for the template to be functional:

1. **`site.config.ts` + `SiteConfig` type** — The foundation everything else depends on
2. **Hero section configurable** — First thing users see, highest impact
3. **Contact form + WhatsApp configurable** — Conversion channels
4. **Services section configurable** — Core business offering
5. **Footer configurable** — Legal requirements (CNPJ, address)
6. **SEO metadata configurable** — Discoverability

Defer to after MVP:
- **Section toggles**: Nice-to-have, not blocking. Users can just remove components from `page.tsx` manually.
- **Blog preview**: Static cards, lowest priority for a surveying template.
- **Calculator pricing config**: Already works; extracting to config is polish, not necessity.

## Sources

- GitHub repos: landing-kit (enxtur), landing-page-kit-Devkit, launch-kit-app, next-mobile-landing — all use centralized config pattern
- Wix, HubSpot, Unfold CMS, ButterCMS documentation on section-based templates
- Land Surveyor Marketing, Gridline Marketing, Congero, Cannon eMarketing — surveying-specific website requirements
- 2026 landing page checklists (Wix, FastStrat, Plerdy, ScaleGrowth) — conversion best practices
- Shipixen blog: "10 Essential Features Every SaaS Landing Page Needs" — feature priority matrix
