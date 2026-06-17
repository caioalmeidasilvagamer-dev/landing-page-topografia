# Architecture: Config-Driven Landing Page

**Domain:** Landing page template configuration
**Researched:** 2026-06-17

## Problem Statement

The current codebase has 18 components with hardcoded data scattered across each file. The WhatsApp number appears in 7+ places, services/pricing/texts are duplicated, and editing content requires touching source code. The goal: a single `site.config.ts` file that, when edited, customizes the entire landing page.

## Recommended Architecture

### Config Location and Structure

**File:** `site.config.ts` (project root)

This is the single source of truth. All component data lives here. The file is imported directly by components — no React Context, no prop drilling, no API calls.

**Rationale for direct import over Context:**
- Landing page content is static (no runtime updates)
- React Context adds unnecessary complexity for read-only data
- Direct imports give TypeScript autocomplete at the component level
- Build-time inlining means zero runtime overhead

### Config Structure

```typescript
// site.config.ts

// ─── TYPES ────────────────────────────────────────────
export interface SiteConfig {
  // Company identity
  company: CompanyConfig
  // SEO metadata
  seo: SEOConfig
  // WhatsApp
  whatsapp: WhatsAppConfig
  // Navigation
  nav: NavConfig
  // Sections (one per component)
  hero: HeroConfig
  clientLogos: ClientLogosConfig
  services: ServiceConfig[]
  equipment: EquipmentConfig[]
  differentials: DifferentialConfig[]
  about: AboutConfig
  projects: ProjectConfig[]
  testimonials: TestimonialConfig[]
  faq: FAQConfig[]
  process: ProcessConfig[]
  coverage: CoverageConfig
  calculator: CalculatorConfig
  blog: BlogConfig[]
  contact: ContactConfig
}

// ─── CONFIG ───────────────────────────────────────────
export const siteConfig: SiteConfig = {
  company: {
    name: 'GeoTech Topografia',
    tagline: 'Precisão em Topografia para Seu Projeto',
    cnpj: '12.345.678/0001-90',
    phone: '+55-11-99999-9999',
    email: 'contato@geotech.com.br',
    address: { city: 'São Paulo', state: 'SP', country: 'BR' },
    coordinates: { lat: -23.5505, lng: -46.6333 },
    social: {
      instagram: 'https://instagram.com/geotech',
      linkedin: 'https://linkedin.com/company/geotech',
    },
    hours: 'Seg-Sex 08:00-18:00',
  },

  seo: {
    title: 'GeoTech | Topografia & Georreferenciamento',
    description: 'Soluções precisas em topografia...',
    keywords: ['topografia', 'georreferenciamento', ...],
    ogImage: '/images/og-default.png',
  },

  whatsapp: {
    number: '5511999999999',
    message: 'Olá! Gostaria de um orçamento para serviços topográficos.',
  },

  nav: {
    links: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contato', href: '#contato' },
    ],
  },

  hero: {
    badge: 'Precisão GNSS Certificada',
    headline: { line1: 'Precisão em', highlight: 'Topografia', line2: 'para Seu Projeto' },
    subheadline: 'Soluções completas em levantamento topográfico...',
    services: [
      { icon: 'Target', label: 'Levantamentos Topográficos' },
      { icon: 'Layers', label: 'Georreferenciamento' },
      { icon: 'Home', label: 'Locação de Obras' },
      { icon: 'FileText', label: 'Regularização Fundiária' },
    ],
    cta: { primary: 'Solicitar Orçamento', secondary: 'Falar no WhatsApp' },
    stats: [
      { value: 850, suffix: '+', label: 'Projetos Realizados' },
      { value: 15, suffix: ' anos', label: 'De Experiência' },
      { value: 620, suffix: '+', label: 'Clientes Atendidos' },
    ],
    certifications: [
      { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
      { code: 'INCRA 572', label: 'Georreferenciamento Rural' },
      { code: 'ISO 9001', label: 'Gestão da Qualidade' },
      { code: 'CREA/CAU', label: 'Habilitação Profissional' },
    ],
  },

  services: [
    {
      icon: 'Compass',
      code: 'SRV-01',
      title: 'Levantamento Topográfico',
      description: 'Levantamentos planialtimétricos...',
      specs: ['Precisão ±5mm', 'Entrega em DWG/DXF', 'Relatório NBR 13.133'],
    },
    // ... more services
  ],

  // ... other sections
}

export default siteConfig
```

### How Components Receive Data

**Pattern: Direct Import (not props, not Context)**

Each component imports what it needs directly from `site.config.ts`:

```typescript
// components/hero.tsx
'use client'
import { siteConfig } from '@/site.config'

export function Hero() {
  const { hero, whatsapp, company } = siteConfig

  // Use hero.badge, hero.headline, hero.stats, etc.
  // Use whatsapp.number for the WhatsApp link
  return (
    <section>
      <h1>{hero.headline.line1} <span>{hero.headline.highlight}</span></h1>
      {/* ... */}
    </section>
  )
}
```

**Why not props from page.tsx?**
- `page.tsx` would need to pass 18+ different config sections to 18 components
- Creates a massive prop-drilling chain that's hard to maintain
- Components are still self-contained — they just read from config instead of hardcoded arrays

**Why not React Context?**
- Content is static — no runtime updates needed
- Context adds re-render complexity for zero benefit
- Direct imports are simpler and tree-shake better

### Data Flow

```
site.config.ts (single source of truth)
       │
       ├──→ app/layout.tsx (imports seo, company for metadata + JSON-LD)
       │
       └──→ components/*.tsx (each imports its own section from config)
              │
              ├── hero.tsx imports siteConfig.hero + siteConfig.whatsapp
              ├── services.tsx imports siteConfig.services
              ├── faq.tsx imports siteConfig.faq
              ├── calculator.tsx imports siteConfig.calculator + siteConfig.services
              ├── contact-form.tsx imports siteConfig.contact + siteConfig.whatsapp
              ├── footer.tsx imports siteConfig.company + siteConfig.seo
              ├── navbar.tsx imports siteConfig.nav + siteConfig.company
              └── ... (each component owns its config slice)
```

**Key principle:** Each component is responsible for exactly one config section. No component reaches into another component's config slice (except `company` and `whatsapp` which are cross-cutting concerns).

### Component Boundaries

| Component | Config Section(s) | Notes |
|-----------|-------------------|-------|
| `layout.tsx` | `seo`, `company` | Server component — handles metadata export + JSON-LD |
| `navbar.tsx` | `nav`, `company` | Logo text from company.name, nav links from nav |
| `hero.tsx` | `hero`, `whatsapp` | Stats, badges, CTAs, certifications |
| `client-logos.tsx` | `clientLogos` | Logo array with image paths and alt text |
| `services.tsx` | `services` | Array of service objects |
| `equipment.tsx` | `equipment` | Array of equipment with specs |
| `differentials.tsx` | `differentials` | Array of differentiator items |
| `about.tsx` | `about` | Engineer info, company credentials |
| `coverage-map.tsx` | `coverage` | States served, color mapping |
| `process.tsx` | `process` | Workflow steps |
| `projects.tsx` | `projects` | Project cards with images |
| `google-rating.tsx` | `googleRating` | Rating score, review count |
| `testimonials.tsx` | `testimonials` | Testimonial carousel data |
| `blog-preview.tsx` | `blog` | Article preview cards |
| `calculator.tsx` | `calculator`, `services` | Pricing data + service selection |
| `faq.tsx` | `faq` | Question/answer pairs |
| `contact-form.tsx` | `contact`, `whatsapp` | Form fields, WhatsApp fallback |
| `footer.tsx` | `company`, `seo` | Company info, social links, legal |
| `whatsapp-button.tsx` | `whatsapp` | Phone number, pre-filled message |

### Icon Mapping

Config stores icon names as strings (e.g., `"Compass"`, `"Satellite"`). Components map strings to actual Lucide icon components:

```typescript
// lib/icons.ts
import { Compass, Satellite, Building2, FileCheck, Plane, Map, Target, Layers, Home, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Compass, Satellite, Building2, FileCheck, Plane, Map, Target, Layers, Home, FileText,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Compass // fallback
}
```

This keeps the config file clean (no React imports in config) while giving components access to actual icon components.

### CSS Variables Integration

The config should also include theme overrides:

```typescript
// In SiteConfig
theme?: {
  primary?: string    // maps to --primary CSS variable
  background?: string // maps to --background
}
```

Components already use CSS variables (`bg-primary`, `text-foreground`). The config can override these by injecting CSS variables in `layout.tsx`:

```typescript
// app/layout.tsx
<html style={{
  '--primary': siteConfig.theme?.primary ?? undefined,
} as React.CSSProperties}>
```

This replaces the hardcoded hex values scattered across components.

### Build Order Implications

1. **First:** Create `site.config.ts` with types and default values
2. **Second:** Create `lib/icons.ts` for icon mapping
3. **Third:** Refactor `app/layout.tsx` to use config for metadata + JSON-LD
4. **Fourth:** Refactor components one by one (no dependencies between them)
5. **Fifth:** Unify inline hex colors to use CSS variables
6. **Last:** Create demo config with fictional data + manual testing

**Why this order:**
- Layout must be done first because it's a Server Component that exports `metadata` — this is the only component that can't use `'use client'`
- Components can be refactored in any order after layout
- CSS variable unification is cosmetic and can happen last

## Anti-Patterns to Avoid

### Don't Use a Config Provider/Context

```typescript
// ❌ DON'T — adds complexity for no benefit
const ConfigContext = createContext<SiteConfig>(siteConfig)
export function ConfigProvider({ children }) {
  return <ConfigContext.Provider value={siteConfig}>{children}</ConfigContext.Provider>
}
```

Content is static. Context is for dynamic state. Using Context here adds re-render overhead and boilerplate.

### Don't Split Config into Multiple Files

```typescript
// ❌ DON'T — defeats the purpose of "one file to edit"
// config/hero.ts
// config/services.ts
// config/faq.ts
```

The whole point is that a non-technical user opens ONE file and edits it. Splitting defeats this.

### Don't Use Environment Variables for Content

```typescript
// ❌ DON'T — env vars are for secrets, not content
NEXT_PUBLIC_COMPANY_NAME=GeoTech
NEXT_PUBLIC_HERO_HEADLINE=Precisão em Topografia
```

Content belongs in the config file where it's visible and editable.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Config structure | HIGH | Proven pattern across landing page templates |
| Direct import over Context | HIGH | Standard for static content in React |
| Icon mapping pattern | HIGH | Common solution for config-driven icon rendering |
| Build order | HIGH | Dependencies are clear and linear |
| CSS variable integration | MEDIUM | Need to verify Tailwind v4 variable injection |

## Sources

- Current codebase analysis: `app/page.tsx`, `app/layout.tsx`, `components/*.tsx`
- Config-driven approach patterns: Medium article on config-driven systems (2025)
- Next.js landing page templates: GitHub repos (ixartz/Next-JS-Landing-Page-Starter-Template, kinfuy/landingPage)
- Modular React landing page: Vivid Labs Medium article on component architecture
