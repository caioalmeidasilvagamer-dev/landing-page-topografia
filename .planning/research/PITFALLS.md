# Domain Pitfalls

**Domain:** Config-driven Next.js landing page — converting hardcoded components to props-driven architecture
**Researched:** 2026-06-17

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: The Monolithic Config Explosion

**What goes wrong:** A single `site.config.ts` grows to 500+ lines with nested objects for 18 components, becoming harder to navigate than the original hardcoded components it replaced. Non-technical users (the target audience) can't find what to edit.

**Why it happens:** Developers default to "put everything in one file" because it's simple to implement. Each component refactor adds another section, and there's no natural stopping point.

**Consequences:** The config becomes the new bottleneck. Users editing the wrong section, breaking nested structures, or giving up entirely because the file is intimidating.

**Prevention:**
- Flatten the config into logical top-level sections with clear naming (`company`, `services`, `contact`, `seo`)
- Use TypeScript autocomplete and JSDoc comments to guide users
- Keep each section under 50 lines; split into `config/company.ts`, `config/services.ts` if needed and re-export from `site.config.ts`
- Provide a `config/README.md` explaining each section

**Detection:** Config file exceeds 200 lines, or users report "I can't find where to change X."

**Phase:** Should be designed in the config file creation phase (first active requirement). Fixing it later means refactoring every component that imports config.

---

### Pitfall 2: Data Duplication Across Components (The "7 WhatsApp Numbers" Problem)

**What goes wrong:** Services, phone numbers, email, and nav links are hardcoded in 7+ files. After refactoring, some components get config props while others keep their hardcoded copies. Users change the config but 3 components still show old data.

**Why it happens:** Refactoring 18 components one-by-one creates a window where half are config-driven and half are hardcoded. Developers forget which components were already refactored.

**Consequences:** Inconsistent data across the page. The footer shows one phone number, the contact form shows another, the navbar WhatsApp link points to a third. Users lose trust in the template.

**Prevention:**
- **Audit first:** Before writing any code, grep for every hardcoded value (`11999999999`, `geotech`, `contato@`, service names) and list every file that contains each value
- **Refactor all-or-nothing:** Do all 18 components in a single atomic phase, not spread across multiple phases
- **Post-refactor grep check:** After refactoring, verify zero hardcoded copies remain: `grep -r "99999-9999" components/` should return zero results
- **Config-driven components must never contain hardcoded business data** — only layout/styling constants (z-index, spacing)

**Detection:** `grep` for phone numbers, email, or service names across components shows matches outside the config file.

**Phase:** The refactoring phase itself. Build the grep check into the "Teste manual" requirement.

---

### Pitfall 3: Prop Drilling Hell (The Config Object Passed Everywhere)

**What goes wrong:** `page.tsx` passes the entire config object as a prop to every component. Each component only needs 2-3 fields but receives the whole 200-line config. Components become tightly coupled to the config shape — adding a field to `company` forces TypeScript to update every component's interface.

**Why it happens:** It's the simplest approach and works initially. The "Context & API" pattern seems overkill for a single-page landing page.

**Consequences:** Every config shape change requires updating 18 component interfaces. Components import the full config type even though they use 3 fields. TypeScript errors cascade across the entire codebase when config evolves.

**Prevention:**
- **Don't pass the full config.** Destructure in `page.tsx` and pass only the fields each component needs:
  ```tsx
  // page.tsx — GOOD: destructured
  <Navbar logo={config.company.logo} links={config.nav.links} whatsapp={config.contact.whatsapp} />
  <Services services={config.services} />
  <Footer company={config.company} services={config.services} contact={config.contact} />
  ```
- **Define component-specific prop types** that are subsets of the config, not the full config type
- **Don't use React Context for a single-page landing page** — it adds complexity without benefit since all data flows from one `page.tsx`

**Detection:** A component's props interface includes `config: SiteConfig` instead of specific fields. More than 5 components receive the same full config object.

**Phase:** Config type design phase. Get this right before touching any component.

---

### Pitfall 4: Server/Client Component Boundary Violation

**What goes wrong:** `layout.tsx` is a Server Component that exports `metadata` (static). When you import `site.config.ts` in `layout.tsx` to generate dynamic metadata, the config file gets pulled into the server bundle. If config imports anything client-side (like a React component for an icon), the build breaks or leaks client code into the server.

**Why it happens:** Developers don't realize that importing a `.ts` config file in a Server Component makes everything that config imports part of the server bundle. The config might import Lucide icons or other client-compatible code that fails on the server.

**Consequences:** Build errors, or worse — silent runtime failures where metadata renders incorrectly.

**Prevention:**
- **Config file must be pure data.** No imports of React components, no `'use client'` modules, no side effects. Only types, constants, and arrays.
- **Test the boundary:** After creating config, run `npx tsc --noEmit` to verify no client imports leak into the server path
- **Metadata generation:** Use `generateMetadata()` in `layout.tsx` that reads from the config file directly (server-side import is fine for pure data)

**Detection:** Build errors mentioning "Client component cannot be used in Server Component" or config file importing from `components/`.

**Phase:** Config file creation phase. Enforce the pure-data rule from day one.

---

### Pitfall 5: Incomplete Color Migration (Inline Hex to CSS Variables)

**What goes wrong:** Components are refactored to accept config props for content, but the hardcoded hex colors (`#1F3A5F`, `rgba(176,196,214,0.65)`) remain inline. The config has a `colors` section, but only 3 of 18 components use it. The rest still have `style={{ color: '#1F3A5F' }}`.

**Why it happens:** Color migration is listed as a separate requirement ("Unificar hex inline para usar CSS variables") but gets deprioritized because the content refactoring is the main focus. Developers think "I'll do colors later."

**Consequences:** Users change `colors.primary` in the config but the navbar, footer, and hero still show the old blue. The template is supposed to be customizable but colors are stuck.

**Prevention:**
- **Do color migration FIRST**, before content refactoring. It's a prerequisite for the config to actually work.
- **Replace every inline `style` with a Tailwind class** referencing CSS custom properties defined in `globals.css`
- **Config colors section should only define CSS variable values**, not be consumed by components directly:
  ```css
  /* globals.css — config drives these */
  :root {
    --color-primary: #1F3A5F;
    --color-primary-light: #315D8A;
    --color-text-muted: rgba(176,196,214,0.65);
  }
  ```
- **Config `colors` section updates CSS variables at runtime** (or better, generate `globals.css` from config at build time)

**Detection:** `grep -r "style={{" components/` returns more than 5 matches. Components use `style={{ color: '...' }}` instead of Tailwind classes.

**Phase:** Must happen in the same phase as config creation, or immediately before content refactoring.

---

### Pitfall 6: Type Safety Collapse (ignoreBuildErrors + Config)

**What goes wrong:** `next.config.mjs` has `typescript: { ignoreBuildErrors: true }`. The config TypeScript types are wrong or incomplete, but builds pass silently. A user deploys with a malformed config and gets runtime errors in production.

**Why it happens:** The project already ignores TypeScript errors. Adding a complex config type system without type checking means type errors accumulate undetected.

**Consequences:** Users edit the config, introduce a type error (e.g., `services` is an object instead of an array), and the page breaks at runtime with an unhelpful error.

**Prevention:**
- **Remove `ignoreBuildErrors: true` before starting config refactoring.** Fix all existing TypeScript errors first.
- **Use Zod or manual runtime validation** for the config file — TypeScript types are compile-time only and don't protect against user editing errors
- **Add a config validation script:** `npx tsx scripts/validate-config.ts` that checks the config at dev time
- **Provide a `site.config.example.ts`** with all fields filled and documented

**Detection:** `next.config.mjs` contains `ignoreBuildErrors: true`. No runtime validation of config values.

**Phase:** Must be addressed before the config refactoring phase. Removing `ignoreBuildErrors` is a prerequisite.

---

### Pitfall 7: The Logo SVG Duplication Becomes Triple

**What goes wrong:** The topographic crosshair SVG is duplicated in `navbar.tsx` and `footer.tsx` with different stroke colors. When refactoring to config-driven, developers extract the logo but forget that `hero.tsx` also uses a similar visual element, or the config's `company.logo` only covers one of the three locations.

**Why it happens:** Each component is refactored in isolation. The SVG duplication is documented but not systematically tracked across all usages.

**Consequences:** Three copies of the logo SVG exist, each slightly different. Config `company.logo` changes only one of them.

**Prevention:**
- **Extract a shared `<Logo>` component** that accepts `color` and `size` props before starting config refactoring
- **Search for ALL SVG usages:** `grep -r "viewBox=\"0 0 32 32\"" components/` to find every copy
- **Config `company.logo` should only store the company name and color**, not the SVG itself — the `<Logo>` component handles rendering

**Detection:** More than one file contains the crosshair SVG markup.

**Phase:** Should be extracted as a standalone task before the main refactoring phase.

---

### Pitfall 8: Contact Form Services List Drift

**What goes wrong:** The contact form has its own hardcoded `servicos` array (line 31-38 in `contact-form.tsx`). The services component has a different hardcoded array. The footer has a third. After refactoring, `config.services` updates the Services component but the contact form dropdown still shows old service names.

**Why it happens:** The contact form's service list is used as a `<select>` dropdown, which is a different data shape than the services component's display array. Developers refactor them separately and miss the connection.

**Consequences:** User adds "Cartografia" to config services, it appears in the Services section but not in the contact form dropdown. Leads to confusing UX.

**Prevention:**
- **Single source of truth:** `config.services` is the only place service names are defined
- **Contact form `servicos` prop should derive from config:** `servicos={config.services.map(s => s.title).concat(['Outro'])}`
- **Audit all service name usages** before refactoring: `grep -r "Levantamento Topográfico" components/`

**Detection:** Service names appear in more than one file outside the config.

**Phase:** Refactoring phase. Include the contact form in the services refactor.

---

### Pitfall 9: Schema.org Structured Data Stale After Config Change

**What goes wrong:** The JSON-LD block in `layout.tsx` is hardcoded with `GeoTech` data. After config refactoring, users change company name, phone, address in config, but the Schema.org data still shows the old values. Google indexes the wrong business information.

**Why it happens:** The Schema.org block is in `layout.tsx` (Server Component) and uses `dangerouslySetInnerHTML`. It's easy to forget that this static block needs to become dynamic.

**Consequences:** SEO damage — Google shows wrong business name, phone, or address in search results. Schema validation fails.

**Prevention:**
- **Convert the JSON-LD block to use `generateMetadata()`** or a server-side component that reads from config
- **Make the JSON-LD a function** that takes config as input:
  ```tsx
  function generateSchema(config: SiteConfig) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.company.name,
      telephone: config.contact.phone,
      // ... all fields from config
    }
  }
  ```
- **Test with Google Rich Results Test** after every config change

**Detection:** `layout.tsx` still has hardcoded `GeoTech` in the JSON-LD block after config refactoring.

**Phase:** Must be refactored in the same phase as `layout.tsx` metadata.

---

### Pitfall 10: Framer Motion Re-render Storm After Config Integration

**What goes wrong:** Config is passed as props to components. Every config change (even in dev) triggers re-renders of all 18 components because the config object reference changes. Framer Motion animations re-trigger on every re-render, causing visual glitches (elements fading in/out repeatedly).

**Why it happens:** The config object is re-created on every import. Components don't use `React.memo` (documented in CONCERNS.md). Framer Motion's `whileInView` and `animate` re-fire on re-render.

**Consequences:** In dev mode, saving `site.config.ts` causes the entire page to animate. In production, this doesn't happen (static build), but during development it's disorienting and masks real bugs.

**Prevention:**
- **Wrap config-consuming components in `React.memo`** with a custom comparator that only checks the specific props they use
- **Memoize the config object** in `page.tsx` using `useMemo` with stable references
- **Separate static config from derived data:** Config is static (never changes at runtime), so use module-level constants where possible instead of passing through props

**Detection:** Saving `site.config.ts` in dev causes all animations to re-trigger.

**Phase:** Should be addressed during the refactoring phase, not as a follow-up.

---

## Moderate Pitfalls

### Pitfall 11: Config Validation Gap

**What goes wrong:** Users edit `site.config.ts` and introduce a typo (e.g., `servces` instead of `services`). TypeScript might catch it if `ignoreBuildErrors` is off, but if it's on (current state), the page renders with missing services section.

**Prevention:**
- Remove `ignoreBuildErrors` (see Pitfall 6)
- Add runtime validation with Zod or manual checks
- Provide clear error messages: "Missing `services` array in config"

### Pitfall 12: Breaking the Monolithic contact-form.tsx

**What goes wrong:** `contact-form.tsx` is 456 lines with two unrelated sections (CTA + Form). When refactoring to accept config props, developers try to pass config to the whole component, but the CTA section needs `company.name` while the form needs `services` and `contact.phone`. The component becomes a config omnivore.

**Prevention:**
- Split into `ContactCTA.tsx` and `ContactFormSection.tsx` BEFORE adding config props
- Each sub-component receives only the config fields it needs

### Pitfall 13: WhatsApp Number in Multiple Locations

**What goes wrong:** WhatsApp button component has the number, hero section has a WhatsApp link, navbar has a WhatsApp link, and contact form has a WhatsApp link. After refactoring, some point to config and some still use hardcoded numbers.

**Prevention:**
- Grep for the WhatsApp number pattern: `grep -rn "99999" components/`
- Ensure ALL WhatsApp references come from `config.contact.whatsapp`
- Test by changing the number in config and verifying all 4+ locations update

### Pitfall 14: Static Export Incompatibility

**What goes wrong:** If the project ever needs `output: 'export'` (static HTML), config-driven dynamic metadata via `generateMetadata()` won't work because it requires a server. The current setup with static `export const metadata` works fine for static export.

**Prevention:**
- Keep metadata generation as a static export from the config file, not runtime
- If using `generateMetadata()`, ensure it only reads from imported config (which is static at build time)

### Pitfall 15: Demo Config vs Production Config Confusion

**What goes wrong:** The "example config with fictional data" (requirement: "Criar exemplo de config com dados fictícios para demo") gets committed as the default `site.config.ts`. Users clone the repo and deploy with demo data without realizing it.

**Prevention:**
- Name the demo file `site.config.example.ts` (never imported by the app)
- The actual `site.config.ts` should have a prominent header: `// EDIT THIS FILE — this is your site configuration`
- Add a README section explaining how to customize

---

## Minor Pitfalls

### Pitfall 16: Inconsistent Prop Naming

**What goes wrong:** Some components receive `data` prop, others receive `items`, others receive the config section name directly. No naming convention.

**Prevention:** Establish naming convention upfront:
- Array data: `items` or specific name (`services`, `testimonials`)
- Single objects: section name (`company`, `contact`)
- Never `data` or `config` as prop names

### Pitfall 17: Missing Fallback Values

**What goes wrong:** Config user removes a field (e.g., deletes `company.description`). Component crashes because it expects the field to exist.

**Prevention:**
- Use TypeScript optional fields with defaults: `config.company.description ?? 'Empresa especializada em topografia'`
- Provide sensible defaults in each component for every config field

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Create `site.config.ts` types | Monolithic config explosion (Pitfall 1) | Design flat, sectioned structure from day one |
| Create `site.config.ts` types | Server/client boundary violation (Pitfall 4) | Enforce pure-data rule: no React imports in config |
| Refactor `layout.tsx` | Schema.org stale data (Pitfall 9) | Convert JSON-LD to config-driven function |
| Refactor `layout.tsx` | Type safety collapse (Pitfall 6) | Remove `ignoreBuildErrors` first |
| Refactor `navbar.tsx` | Logo SVG duplication (Pitfall 7) | Extract shared `<Logo>` component first |
| Refactor `services.tsx` | Contact form services drift (Pitfall 8) | Audit all service name usages first |
| Refactor `contact-form.tsx` | Monolithic component (Pitfall 12) | Split CTA and Form sections first |
| Refactor `footer.tsx` | Data duplication (Pitfall 2) | Grep for all hardcoded values across components |
| Refactor `hero.tsx` | WhatsApp number duplication (Pitfall 13) | Grep for WhatsApp pattern across all files |
| Unify hex to CSS variables | Incomplete migration (Pitfall 5) | Do color migration BEFORE content refactoring |
| Create demo config | Demo vs production confusion (Pitfall 15) | Use `site.config.example.ts` naming |
| Teste manual | Data duplication not caught (Pitfall 2) | Build grep check into manual test checklist |

---

## Sources

- TechResolve: "How I architected a config-driven marketplace with Next.js 15 App Router" (2026-03) — prop drilling vs Context patterns
- Vivid Labs: "How I made a modular React landing page that isn't a flat, verbose mess" (2022-11) — self-documenting component architecture
- React Composition Patterns: Beyond Boolean Props — compound component pattern for avoiding prop hell
- Project CONCERNS.md — existing tech debt (ignoreBuildErrors, all client components, inline hex colors, no memoization)
- Project PROJECT.md — 18 components to refactor, WhatsApp duplicated in 7+ files, services hardcoded in 3+ files
