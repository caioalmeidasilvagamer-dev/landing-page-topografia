# Technology Stack — Config-Driven Landing Page Template

**Project:** Topografia LP Demo
**Researched:** 2026-06-17
**Overall Confidence:** HIGH

## Executive Summary

The standard 2025 stack for config-driven Next.js landing pages combines **TypeScript config objects with Zod runtime validation**. This pattern is used by major open-source templates (CoolAssPuppy/landing-pages, landing-kit, launch-kit-app) and provides type safety, autocomplete, and fail-fast validation. The config lives in a single `site.config.ts` file that components import directly—no CMS, no database, no runtime fetching.

For 18+ components, the recommended approach is a **flat config object with nested section-specific sub-objects**, not deeply nested trees. Each component reads only its slice of the config. Zod schemas validate at import time (build/dev startup), not at runtime per render.

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2.6 | Framework | Already in use, App Router stable, SSG for landing pages |
| React | 19 | UI library | Already in use, Server Components available but not needed here |
| TypeScript | 5.7.3 | Type safety | Already in use, config objects need strict typing |

### Config Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Zod | 3.24.x | Runtime schema validation | Industry standard for TypeScript config validation; infers types from schemas; used by t3-oss, Vercel, and every major Next.js template |

**Why Zod over alternatives:**

| Alternative | Why Not |
|-------------|---------|
| JSON Schema | Verbose, no TypeScript inference, separate type definitions |
| Yup | Older, less TypeScript-native, smaller ecosystem |
| io-ts | Functional style has learning curve, less popular |
| Pure TypeScript (no validation) | No runtime safety—typos in config silently break |
| `as const` only | No validation, no defaults, no error messages |

### Config File Structure

**Pattern: Single flat config with section sub-objects**

```typescript
// site.config.ts
import { z } from 'zod';

// ─── Schema Definitions ─────────────────────────────────────
const HeroSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  ctas: z.array(z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['default', 'outline', 'ghost']).default('default'),
  })).min(1).max(2),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
});

const ServiceSchema = z.object({
  code: z.string(), // e.g., "SRV-01"
  title: z.string(),
  description: z.string(),
  icon: z.string(), // Lucide icon name
});

const SiteConfigSchema = z.object({
  // ─── Site Identity ─────────────────────────────────────
  name: z.string().min(1),
  tagline: z.string(),
  url: z.string().url(),
  logo: z.string().optional(), // path to logo SVG
  favicon: z.string().default('/favicon.svg'),

  // ─── Contact ───────────────────────────────────────────
  whatsapp: z.object({
    number: z.string(), // digits only, e.g., "5511999998888"
    message: z.string().default('Olá! Gostaria de um orçamento.'),
  }),
  email: z.string().email(),
  phone: z.string(),

  // ─── Sections ──────────────────────────────────────────
  hero: HeroSchema,
  services: z.array(ServiceSchema).min(1),
  equipment: z.array(z.object({
    name: z.string(),
    specs: z.array(z.string()),
    image: z.string().optional(),
  })),
  testimonials: z.array(z.object({
    name: z.string(),
    role: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5),
  })),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  process: z.array(z.object({
    step: z.number(),
    title: z.string(),
    description: z.string(),
  })),
  projects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })),
  coverage: z.array(z.string()), // state abbreviations
  blog: z.array(z.object({
    title: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    date: z.string(),
  })).optional(),

  // ─── Footer ────────────────────────────────────────────
  footer: z.object({
    company: z.string(),
    cnpj: z.string().optional(),
    social: z.object({
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    }).optional(),
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).optional(),
  }),

  // ─── Theme ─────────────────────────────────────────────
  theme: z.object({
    primary: z.string().default('#1F3A5F'),
    accent: z.string().default('#2E7D32'),
  }).optional(),
});

// ─── Type Inference ────────────────────────────────────────
export type SiteConfig = z.infer<typeof SiteConfigSchema>;

// ─── Config Export (validated at import time) ──────────────
const rawConfig = {
  name: 'Topografia LP',
  tagline: 'Soluções completas em topografia',
  url: 'https://topografia-lp.com',
  // ... all fields
} satisfies Partial<SiteConfig>;

// Validate at build/dev startup — fails fast with clear errors
export const siteConfig = SiteConfigSchema.parse(rawConfig);
```

**Why this structure:**

1. **Flat top-level keys** — `hero`, `services`, `faq` are siblings, not nested under a `sections` object. This keeps imports simple: `siteConfig.hero.title` not `siteConfig.sections.hero.title`.

2. **Section-specific sub-schemas** — Each section's data is a separate Zod object. This makes schemas composable and testable in isolation.

3. **`satisfies Partial<SiteConfig>`** — Allows partial config (fill in defaults) while still catching type errors at compile time.

4. **`SiteConfigSchema.parse()`** — Validates at import time. If config is invalid, the app fails to start with a clear Zod error message. No silent failures.

5. **`export type SiteConfig`** — Single source of truth for the type. Components import `SiteConfig` for props, never define their own.

### Component Integration Pattern

**Pattern: Direct import, destructure at top of component**

```typescript
// components/hero.tsx
'use client';

import { siteConfig } from '@/site.config';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const { title, subtitle, badge, ctas, stats } = siteConfig.hero;

  return (
    <section>
      {badge && <Badge>{badge}</Badge>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {/* ... */}
    </section>
  );
}
```

**Why direct import (not props from page.tsx):**

| Approach | Pros | Cons |
|----------|------|------|
| Direct import (`siteConfig` in component) | Simple, no prop drilling, each component owns its data | Components are coupled to config shape |
| Props from `page.tsx` | Pure components, easy to test | 18+ prop chains, `page.tsx` becomes massive, refactoring is painful |
| React Context | Dynamic config possible | Overkill for static config, adds runtime overhead |
| Server Component props | Type-safe across server/client boundary | All components are `'use client'` already |

**Recommendation:** Direct import. For a static landing page template, the coupling is acceptable. The config IS the product—the components are just renderers.

### Config File Location

**Pattern: Root-level `site.config.ts`**

```
topografia-lp-demo/
├── site.config.ts          # ← HERE (root level, not src/)
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── hero.tsx
│   └── ...
└── lib/
    └── utils.ts
```

**Why root-level:**

1. **First thing users see** — When opening the project, `site.config.ts` is immediately visible
2. **Convention** — CoolAssPuppy/landing-pages, AeroLaunch, and other templates use this pattern
3. **Import simplicity** — `import { siteConfig } from '@/site.config'` is cleaner than `@/config/site`

### Validation Strategy

**When to validate:**

| Moment | What | How |
|--------|------|-----|
| Build time | Full config validation | `SiteConfigSchema.parse(rawConfig)` in `site.config.ts` |
| Dev startup | Full config validation | Same as build — import triggers parse |
| Runtime | Nothing | Config is static, imported once, never changes |

**Why validate at import time (not runtime):**

- Config is a static TypeScript file, not fetched data
- Zod's `parse()` throws on invalid data — app won't start
- Clear error messages: `siteConfig.hero.ctas[0].label: Required`
- No performance cost — validation runs once at startup

### Handling Defaults and Optional Fields

**Pattern: Zod `.default()` for optional values**

```typescript
const HeroSchema = z.object({
  title: z.string().min(1),
  badge: z.string().optional(),           // truly optional (can be undefined)
  stats: z.array(StatSchema).default([]), // defaults to empty array
  ctas: z.array(CtaSchema).min(1).max(2),
});
```

**Why this matters for the user:**

- User only fills in what they need
- `siteConfig.hero.badge` is `string | undefined` — components handle the undefined case
- `siteConfig.hero.stats` is always `Stat[]` — no null checks needed

### Theme Integration

**Pattern: CSS variables + config values**

```typescript
// site.config.ts
theme: {
  primary: '#1F3A5F',    // maps to --primary in CSS
  accent: '#2E7D32',     // maps to --accent in CSS
}
```

```css
/* globals.css */
:root {
  --primary: var(--config-primary, #1F3A5F);
  --accent: var(--config-accent, #2E7D32);
}
```

**Why CSS variables (not Tailwind classes):**

1. **Dynamic theming** — CSS variables can be updated at runtime if needed
2. **Existing pattern** — The project already uses CSS custom properties in `globals.css`
3. **Tailwind integration** — `bg-primary` works with CSS variables via `@theme`

### File Structure for Config

```
topografia-lp-demo/
├── site.config.ts              # Main config (user edits this)
├── site.config.types.ts        # Zod schemas + type exports (optional split)
├── app/
│   ├── layout.tsx              # Uses siteConfig for metadata, SEO
│   ├── page.tsx                # Composes components (may pass minimal props)
│   └── globals.css             # CSS variables for theme
├── components/
│   ├── hero.tsx                # Imports siteConfig.hero
│   ├── services.tsx            # Imports siteConfig.services
│   └── ...
└── lib/
    ├── utils.ts                # cn() helper
    └── config-helpers.ts       # Optional: computed values from config
```

**Optional split for complex configs:**

If `site.config.ts` exceeds ~300 lines, split into:
- `site.config.ts` — re-exports merged config
- `site.config.sections.ts` — section-specific schemas
- `site.config.types.ts` — type exports only

But for 18 components with moderate data, a single file is manageable.

### Computed Values from Config

**Pattern: Helper functions that derive values**

```typescript
// lib/config-helpers.ts
import { siteConfig } from '@/site.config';

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`;

export const schemaOrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
};
```

**Why separate helpers:**

1. **Clean components** — Components don't build URLs or JSON-LD inline
2. **Reusable** — `whatsappUrl` used by both `whatsapp-button.tsx` and `contact-form.tsx`
3. **Testable** — Helper functions can be tested independently

### Error Handling for Config

**Pattern: Fail-fast at import + helpful error messages**

```typescript
// site.config.ts
import { z } from 'zod';

const rawConfig = { /* ... */ };

const result = SiteConfigSchema.safeParse(rawConfig);

if (!result.success) {
  console.error('❌ Invalid site configuration:');
  console.error(result.error.format());
  throw new Error('site.config.ts has validation errors — see above');
}

export const siteConfig = result.data;
```

**Why `safeParse` + manual throw:**

1. **Readable errors** — `result.error.format()` gives nested, human-readable errors
2. **Fail-fast** — App won't start with invalid config
3. **No silent degradation** — Unlike `as const` which silently accepts invalid shapes

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Validation | Zod | JSON Schema | No TypeScript inference, verbose, separate type definitions |
| Validation | Zod | Yup | Less TypeScript-native, smaller ecosystem in 2025 |
| Config location | Root `site.config.ts` | `src/config/site.ts` | Root is more visible, simpler imports |
| Config format | Single file | Multiple files per section | Overkill for 18 components, adds import complexity |
| Component pattern | Direct import | Props from page.tsx | Prop drilling 18 components is painful |
| Theme | CSS variables | Tailwind config | Existing pattern uses CSS vars, more flexible |

## Installation

```bash
# Add Zod for config validation
pnpm add zod

# No other dependencies needed — config is pure TypeScript
```

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Zod for config validation | HIGH | Industry standard, used by t3-oss, Vercel, every major template |
| Single config file pattern | HIGH | Used by CoolAssPuppy, landing-kit, AeroLaunch, and others |
| Direct import in components | HIGH | Standard pattern for static config-driven UIs |
| CSS variables for theme | HIGH | Already in use in the project |
| Flat config structure | MEDIUM | Works for 18 components; might need split if config grows beyond ~400 lines |

## Sources

- CoolAssPuppy/landing-pages — Config-driven Next.js landing page template with `site.ts`
- landing-kit — TypeScript config-first framework for static landing pages
- Dev-Adnani/launch-kit-app — Centralized `app-config.ts` pattern
- AeroLaunch docs — `siteConfig` pattern with `as const` and Zod
- Zod documentation — Schema definition and type inference
- Next.js App Router best practices (2026) — Server Components, TypeScript patterns
- t3-oss/env-nextjs — Zod-based environment validation pattern
