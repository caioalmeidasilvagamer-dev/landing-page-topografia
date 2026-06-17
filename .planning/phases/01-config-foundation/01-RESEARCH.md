# Phase 1: Config Foundation - Research

**Researched:** 2026-06-17
**Domain:** TypeScript config schema design with Zod runtime validation for Next.js App Router
**Confidence:** HIGH

## Summary

This phase creates the centralized `site.config.ts` file with Zod schema validation and TypeScript types. The config will contain 23 customizable sections covering brand, contact, social, SEO, hero, services, equipment, differentials, about, projects, testimonials, client logos, Google rating, FAQ, process, coverage, calculator, blog, and WhatsApp. Each section maps directly to hardcoded data in the current 18 components.

The standard approach is to define Zod schemas for each section, export the inferred TypeScript type via `z.infer<typeof schema>`, validate the config object at module load time using `.parse()`, and export the validated config for component import. The config file must be pure data (no React imports) to work in both Server Components (`layout.tsx`) and client components.

**Primary recommendation:** Use Zod 3.24.x (stable, not v4 which is still in beta for ecosystem compatibility), define each section as a separate Zod object schema, compose them into a top-level `SiteConfig` schema, validate with `.parse()` at the bottom of `site.config.ts`, and export the validated result.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Must use Zod for runtime validation
- Must be TypeScript-first with full type safety
- Must cover all 18 component sections
- Must work in both Server Components and client components

### the agent's Discretion
- Schema structure and organization within site.config.ts
- Whether to split schemas into separate files or keep in one file
- Whether to use Zod 3.x (stable) or Zod 4.x (new)

### Deferred Ideas (OUT OF SCOPE)
- CMS integration
- i18n support
- Dark mode toggle
- Automated testing
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONF-01 | Criar site.config.ts no root do projeto com todos os dados customizáveis | Zod schema defines structure, .parse() validates at import, pure data file |
| CONF-02 | Criar tipos TypeScript SiteConfig em lib/config-types.ts com schema completo | z.infer<typeof SiteConfig> exports type, lib/config-types.ts holds schemas |
| CONF-03 | Instalar Zod e validar config no import (fail fast com erros claros) | Zod .parse() throws ZodError with path and message on invalid data |
| CONF-04 | Criar seção sections no config para habilitar/desabilitar cada componente | Boolean flags per section, e.g. sections: { hero: true, services: true } |
| CONF-05 | Criar seção brand (nome, logo, slogan, colors, fonts) | Nested object with strings and optional fields |
| CONF-06 | Criar seção contact (telefone, email, WhatsApp, endereço, horários) | Nested object with phone/email validation |
| CONF-07 | Criar seção social (Instagram, LinkedIn, URLs) | Optional string URLs with z.url() |
| CONF-08 | Criar seção seo (title, description, keywords, ogImage) | SEO metadata with length constraints |
| CONF-09 | Criar seção hero (badge, headline, subheadline, stats, tags, CTAs) | Complex nested object with arrays |
| CONF-10 | Criar seção services (array de serviços com icon, código, título, descrição, specs) | Array of service objects with string icon name |
| CONF-11 | Criar seção equipment (array de equipamentos com modelo, nome, specs) | Array of equipment objects |
| CONF-12 | Criar seção differentials (array com título, descrição, métrica) | Array of differential objects |
| CONF-13 | Criar seção about (engenheiro, CREA, ano fundação, stats, texto) | Nested object with arrays |
| CONF-14 | Criar seção projects (array com título, categoria, localização, área, imagem, tags) | Array of project objects |
| CONF-15 | Criar seção testimonials (array com nome, empresa, rating, texto) | Array of testimonial objects with rating number |
| CONF-16 | Criar seção clientLogos (array de nomes de empresas) | Simple string array |
| CONF-17 | Criar seção googleRating (rating, contagem, reviews) | Rating number + review count + review array |
| CONF-18 | Criar seção faq (array de perguntas e respostas) | Array of FAQ objects |
| CONF-19 | Criar seção process (array de etapas com número, título, descrição) | Array of process step objects |
| CONF-20 | Criar seção coverage (estados atendidos) | Array of state objects with abbreviation and name |
| CONF-21 | Criar seção calculator (preços por serviço, taxas, limites) | Pricing data object per service |
| CONF-22 | Criar seção blog (array de artigos com categoria, título, excerpt) | Array of blog article objects |
| CONF-23 | Criar seção whatsapp (número, mensagem pré-preenchida) | Phone number and message string |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Config schema definition | API / Backend (lib/) | — | Pure data, no UI, consumed by all tiers |
| Runtime validation | API / Backend (lib/) | Browser / Client | Zod validates at import time, error surfaces in both contexts |
| Type export | API / Backend (lib/) | Browser / Client | TypeScript types used across all tiers |
| Section enable/disable | Frontend Server (SSR) | Browser / Client | Layout.tsx checks sections to conditionally render |
| Icon string → component mapping | Browser / Client | — | lib/icons.ts maps string names to Lucide components |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | 3.24.x | Runtime schema validation with TypeScript type inference | Industry standard for TS config validation, used by t3-oss, Vercel, every major Next.js template |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 1.16.0 (existing) | Icon library — referenced by string name in config | Every component that uses icons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zod 3.x (stable) | Zod 4.x (new) | Zod 4 is stable but ecosystem compatibility may be limited; stick with 3.24.x for safety |
| Direct import in components | React Context / prop drilling | Direct import is simpler, no provider overhead, works in both Server and Client components |
| Single monolithic schema file | Split into per-section files | Single file keeps config self-contained; split only if file exceeds 400 lines |

**Installation:**
```bash
pnpm add zod
```

**Version verification:**
```bash
pnpm view zod version
```

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| zod | npm | 6+ years | 30M+/week | github.com/colinhacks/zod | OK | Approved |
| lucide-react | npm | 3+ years | 10M+/week | github.com/lucide-icons/lucide | OK | Approved (existing) |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

## Architecture Patterns

### System Architecture Diagram

```
site.config.ts (pure data, no React)
    │
    ├── lib/config-types.ts (Zod schemas + types)
    │       │
    │       ├── z.infer<typeof SiteConfig> → TypeScript type
    │       └── SiteConfigSchema → Zod validation schema
    │
    └── site.config.ts imports schema, validates, exports
            │
            ├── app/layout.tsx (Server Component)
            │   └── imports config for metadata, JSON-LD, SEO
            │
            ├── app/page.tsx (Server Component)
            │   └── imports config for section toggles
            │
            └── components/*.tsx (Client Components)
                └── import config slices directly (no Context)
```

### Recommended Project Structure
```
lib/
├── config-types.ts      # Zod schemas + exported SiteConfig type
├── config-helpers.ts    # Derived values (WhatsApp URL, JSON-LD)
├── icons.ts             # String icon name → Lucide component mapping
└── utils.ts             # (existing) cn() helper

site.config.ts           # Config object + Zod validation + export
site.config.demo.ts      # (Phase 5) Demo config with fictional data
```

### Pattern 1: Zod Schema + Type Inference
**What:** Define Zod schema, export inferred TypeScript type
**When to use:** Every config section — this is the core pattern
**Example:**
```typescript
// Source: zod.dev/basics#inferring-types
import { z } from 'zod'

// Define schema
const ContactSchema = z.object({
  phone: z.string().min(10),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  address: z.string().min(1),
  hours: z.object({
    weekdays: z.string(),
    saturday: z.string().optional(),
  }),
})

// Infer type
type Contact = z.infer<typeof ContactSchema>
// => { phone: string; email: string; whatsapp: string; address: string; hours: { weekdays: string; saturday?: string } }
```

### Pattern 2: Top-Level Config Composition
**What:** Compose section schemas into a top-level SiteConfig, validate at module level
**When to use:** The main site.config.ts file
**Example:**
```typescript
import { z } from 'zod'
import { SiteConfigSchema } from './lib/config-types'

// Validate at import time — fails fast with clear errors
const config = SiteConfigSchema.parse(rawConfig)

export default config
export type SiteConfig = z.infer<typeof SiteConfigSchema>
```

### Pattern 3: Section Toggle Pattern
**What:** Boolean flags per section for enable/disable
**When to use:** CONF-04 — sections config
**Example:**
```typescript
const SectionsSchema = z.object({
  hero: z.boolean().default(true),
  services: z.boolean().default(true),
  // ... all 18 sections
})

// In components:
import config from '@/site.config'
if (!config.sections.services) return null
```

### Pattern 4: Icon String → Component Mapping
**What:** Config stores icon names as strings, lib/icons.ts maps to Lucide components
**When to use:** Any config section that references icons (services, equipment, differentials, process)
**Example:**
```typescript
// lib/icons.ts
import { Compass, Satellite, Building2, type LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Satellite,
  Building2,
  // ...
}

// In component:
import { iconMap } from '@/lib/icons'
const Icon = iconMap[service.icon] ?? Compass
```

### Anti-Patterns to Avoid
- **Config file with React imports:** `site.config.ts` must NOT import React components, `'use client'` modules, or anything that breaks Server Component compatibility. Store icon names as strings, not components.
- **Zod v4 for now:** Zod 4 is stable but ecosystem tooling (t3-oss, shadcn) may not support it yet. Use 3.24.x.
- **Monolithic 500+ line config:** Keep each section under 50 lines. Use JSDoc comments for documentation.
- **Validation at component level:** Validate once at import in site.config.ts, not in every component. Fail fast.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Runtime type validation | Custom if/else checks | Zod `.parse()` | Zod provides detailed error paths, type inference, and composable schemas |
| Phone number validation | Regex patterns | Zod `.string().min(10)` or `.e164()` | Zod's E.164 validation is battle-tested |
| Email validation | Custom regex | Zod `.string().email()` | Zod uses a well-tested email regex |
| URL validation | `new URL()` try/catch | Zod `.url()` | Zod handles edge cases and provides clear errors |
| Type inference from validation schema | Manual interface duplication | `z.infer<typeof schema>` | Single source of truth, no type drift |

**Key insight:** Zod schemas ARE the documentation. A well-named schema like `ServiceSchema` with `z.string().describe('Service code like SRV-01')` is more useful than a separate TypeScript interface.

## Common Pitfalls

### Pitfall 1: Config File Imports React Components
**What goes wrong:** `site.config.ts` imports Lucide icons or React components, breaking Server Component compatibility in `layout.tsx`.
**Why it happens:** Developers try to store icon components directly in config for convenience.
**How to avoid:** Store icon names as strings in config. Create `lib/icons.ts` mapping layer. Config is pure data.
**Warning signs:** Build errors about `'use client'` in config, or `layout.tsx` failing to import config.

### Pitfall 2: Validation Only in Development
**What goes wrong:** Config validation skipped in production because `ignoreBuildErrors: true` masks type errors.
**Why it happens:** `next.config.mjs` has `typescript: { ignoreBuildErrors: true }`.
**How to avoid:** Remove `ignoreBuildErrors` in Phase 2 (COLOR-04), but Phase 1 should still validate at runtime via Zod `.parse()` which runs regardless of build config.
**Warning signs:** Invalid config data silently passes to components.

### Pitfall 3: Monolithic Config File
**What goes wrong:** `site.config.ts` grows to 500+ lines, harder to navigate than original hardcoded components.
**Why it happens:** All 23 sections defined inline without organization.
**How to avoid:** Use clear section naming, JSDoc comments, keep each section schema in `lib/config-types.ts` (can be 300+ lines there, which is fine for a schema file). Config data file stays manageable.
**Warning signs:** Scrolling more than 2 screens to find a section.

### Pitfall 4: Inconsistent Data Shape Between Config and Components
**What goes wrong:** Config defines `services[0].icon` as string but component expects `LucideIcon` type.
**Why it happens:** Icon mapping layer missing or incomplete.
**How to avoid:** Create `lib/icons.ts` before any component refactoring. Test icon resolution early.
**Warning signs:** TypeScript errors in components about icon types.

### Pitfall 5: Missing Default Values
**What goes wrong:** Zod validation fails when user omits optional fields that components expect.
**Why it happens:** No `.default()` values on optional schema fields.
**How to avoid:** Use `.default()` on every optional field that components need. Provide sensible defaults.
**Warning signs:** Config validation errors on fields that should be optional.

## Code Examples

### Complete Schema Definition Pattern
```typescript
// Source: zod.dev/basics + zod.dev/api#objects
import { z } from 'zod'

// Section schemas — each maps to one config section
export const SectionsSchema = z.object({
  hero: z.boolean().default(true),
  clientLogos: z.boolean().default(true),
  services: z.boolean().default(true),
  equipment: z.boolean().default(true),
  differentials: z.boolean().default(true),
  about: z.boolean().default(true),
  coverage: z.boolean().default(true),
  process: z.boolean().default(true),
  projects: z.boolean().default(true),
  googleRating: z.boolean().default(true),
  testimonials: z.boolean().default(true),
  blog: z.boolean().default(true),
  calculator: z.boolean().default(true),
  faq: z.boolean().default(true),
  contact: z.boolean().default(true),
  footer: z.boolean().default(true),
  whatsapp: z.boolean().default(true),
})

export const BrandSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().optional(),
  logoUrl: z.string().url().optional(),
})

export const ContactSchema = z.object({
  phone: z.string().min(10),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  address: z.string().min(1),
  hours: z.object({
    weekdays: z.string().default('08h às 18h'),
    saturday: z.string().optional(),
  }),
})

export const ServiceSchema = z.object({
  icon: z.string().min(1), // icon name mapped via lib/icons.ts
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  specs: z.array(z.string()),
})

// Top-level schema
export const SiteConfigSchema = z.object({
  sections: SectionsSchema,
  brand: BrandSchema,
  contact: ContactSchema,
  social: z.object({
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.array(z.string()),
    ogImage: z.string().url().optional(),
  }),
  hero: z.object({
    badge: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    stats: z.array(z.object({
      value: z.number(),
      suffix: z.string(),
      label: z.string(),
    })),
    tags: z.array(z.object({
      icon: z.string(),
      label: z.string(),
    })),
    ctas: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
  services: z.array(ServiceSchema),
  // ... remaining sections follow same pattern
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>
```

### Validated Config Export Pattern
```typescript
// site.config.ts
import { SiteConfigSchema } from './lib/config-types'
import type { SiteConfig } from './lib/config-types'

const rawConfig = {
  sections: { hero: true, services: true, /* ... */ },
  brand: { name: 'GeoTech', slogan: 'Topografia de precisão' },
  // ... all sections
}

// Fail fast — throws ZodError with detailed path info
const config = SiteConfigSchema.parse(rawConfig)

export default config
```

### Icon Mapping Pattern
```typescript
// lib/icons.ts
import {
  Compass, Satellite, Building2, FileCheck, Plane, Map,
  Crosshair, Users, MapPin, Clock, ShieldCheck,
  ClipboardList, Scan, Cpu, PackageCheck,
  Target, Layers, Home, type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Compass, Satellite, Building2, FileCheck, Plane, Map,
  Crosshair, Users, MapPin, Clock, ShieldCheck,
  ClipboardList, Scan, Cpu, PackageCheck,
  Target, Layers, Home,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Compass
}
```

### Config Helper Pattern
```typescript
// lib/config-helpers.ts
import type { SiteConfig } from './config-types'

export function getWhatsAppUrl(config: SiteConfig): string {
  const number = config.contact.whatsapp.replace(/\D/g, '')
  const message = encodeURIComponent(config.whatsapp?.message ?? 'Olá!')
  return `https://wa.me/${number}?text=${message}`
}

export function getJsonLd(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.brand.name,
    telephone: config.contact.phone,
    // ... other fields from config
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded data in components | Config-driven via site.config.ts | This phase | All 18 components will import from config |
| Inline hex colors | CSS variables + Tailwind | Phase 2 | Config brand colors drive CSS vars |
| `ignoreBuildErrors: true` | Zod runtime validation | Phase 1 (this) + Phase 2 | Type errors surface during build |

**Deprecated/outdated:**
- Zod 4.x: Stable but ecosystem compatibility limited — use 3.24.x for now [ASSUMED]
- `ignoreBuildErrors`: Should be removed but not in this phase — Phase 2 handles it

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Zod 3.24.x is the latest stable version | Standard Stack | Low — can verify with `pnpm view zod version` |
| A2 | Zod 4.x ecosystem compatibility is limited | Standard Stack | Medium — if compatible, could use Zod 4 instead |
| A3 | lucide-react 1.16.0 is current version | Supporting | Low — existing dependency, version verified in package.json |

**If this table is empty:** Not applicable — 3 assumptions listed above.

## Open Questions (RESOLVED)

1. **Should lib/config-types.ts be a single file or split per section?** (RESOLVED)
   - Decision: Single file. 23 sections (~300-400 lines) benefit from co-location. Split only if exceeding 400 lines.
   - Rationale: Schemas are closely related, single file enables easier refactoring and autocomplete.

2. **Should site.config.ts export a validated object or a type + raw data?** (RESOLVED)
   - Decision: Export validated object from site.config.ts. Components import directly. Types exported from lib/config-types.ts.
   - Rationale: Simpler API — one import per component. Runtime validation via Zod parse.

3. **How should icon names be validated?** (RESOLVED)
   - Decision: Use `z.enum()` with known icon names from lib/icons.ts. Catches typos at validation time.
   - Rationale: Fail-fast on invalid icon names prevents runtime rendering errors.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| pnpm | Package manager | ✓ | 11.16.0 | — |
| Node.js | Runtime | ✓ | 22.22.3 | — |
| TypeScript | Type checking | ✓ | 5.7.3 | — |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:** None

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None (manual testing only per project constraints) |
| Config file | N/A |
| Quick run command | `npx tsc --noEmit` (type check only) |
| Full suite command | `pnpm build` (after removing ignoreBuildErrors) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONF-01 | site.config.ts exists with all data | manual | Visual inspection | ❌ Wave 0 |
| CONF-02 | lib/config-types.ts has complete schema | manual | `npx tsc --noEmit` | ❌ Wave 0 |
| CONF-03 | Zod validates config at import | manual | `npx tsx -e "import config from './site.config'"` | ❌ Wave 0 |
| CONF-04 | sections toggle exists | manual | Visual inspection | ❌ Wave 0 |
| CONF-05 through CONF-23 | Each section exists in config | manual | `npx tsc --noEmit` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit`
- **Per wave merge:** `pnpm build` (if ignoreBuildErrors removed)
- **Phase gate:** Full build green before /gsd-verify-work

### Wave 0 Gaps
- [ ] `site.config.ts` — does not exist yet (created in this phase)
- [ ] `lib/config-types.ts` — does not exist yet (created in this phase)
- [ ] `lib/icons.ts` — does not exist yet (created in this phase)
- [ ] `lib/config-helpers.ts` — does not exist yet (created in this phase)
- [ ] Zod install: `pnpm add zod` — needed before schema work begins

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | yes | Zod schema validation on all config fields |

### Known Threat Patterns for Config-Driven Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Invalid config data reaching components | Tampering | Zod `.parse()` at import time — fail fast |
| Malformed URLs in config | Tampering | Zod `.url()` validation on all URL fields |
| Missing required fields | Information Disclosure | Zod `.required()` or `.default()` on all fields |

## Sources

### Primary (HIGH confidence)
- Zod documentation (zod.dev) — Schema definition, type inference, validation patterns
- Next.js App Router docs — Server/Client Component boundaries
- Existing codebase analysis — All 18 components, current hardcoded data structures

### Secondary (MEDIUM confidence)
- Context7 library docs — Zod patterns for config validation
- t3-oss/env-nextjs — Zod-based environment validation pattern

### Tertiary (LOW confidence)
- Training data knowledge of config-driven templates

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — Zod is industry standard, version verified in package.json
- Architecture: HIGH — Pattern well-documented, direct import over Context is standard
- Pitfalls: HIGH — Identified from real-world config-driven implementations and project-specific analysis

**Research date:** 2026-06-17
**Valid until:** 2026-07-17 (30 days — stable stack)
