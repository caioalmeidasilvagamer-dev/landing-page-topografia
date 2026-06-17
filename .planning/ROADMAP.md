# Roadmap: Topografia LP Template

## Overview

Transform a hardcoded Next.js 16 landing page into a config-driven template where a single `site.config.ts` file customizes 18 components — colors, content, services, pricing, WhatsApp, SEO — without touching component code. The journey progresses from config schema definition → theme system → core component refactor → supporting component refactor → demo validation.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Config Foundation** - Define site.config.ts schema with Zod validation and TypeScript types
- [x] **Phase 2: Theme System** - Migrate inline hex colors to CSS variables driven by config
- [x] **Phase 3: Core Component Refactor** - Refactor conversion-critical sections (hero, navbar, services, contact, WhatsApp, footer, layout)
- [x] **Phase 4: Supporting Component Refactor** - Refactor remaining content sections (equipment, about, projects, testimonials, FAQ, calculator, etc.)
- [x] **Phase 5: Demo & Integration** - Create demo config, validation checklist, end-to-end testing
- [x] **Phase 6: Hardcoded Cleanup** - Migrate remaining hardcoded text in components to config for 100% template customization

## Phase Details

### Phase 1: Config Foundation
**Goal**: User can define and validate site configuration with full type safety
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: CONF-01, CONF-02, CONF-03, CONF-04, CONF-05, CONF-06, CONF-07, CONF-08, CONF-09, CONF-10, CONF-11, CONF-12, CONF-13, CONF-14, CONF-15, CONF-16, CONF-17, CONF-18, CONF-19, CONF-20, CONF-21, CONF-22, CONF-23
**Success Criteria** (what must be TRUE):
  1. User can edit `site.config.ts` and get TypeScript autocomplete for all 23 config sections
  2. User receives clear Zod validation errors when config has invalid data (fail fast at import)
  3. All config sections (brand, contact, social, seo, hero, services, equipment, etc.) exist with complete schemas
  4. Config file is pure data with no React imports — works in both Server Components and client components
**Plans**: 2 plans

Plans:
- [ ] 01-01: Install Zod + Create lib/config-types.ts (all 23 Zod schemas) + lib/icons.ts (icon mapping)
- [ ] 01-02: Create site.config.ts (validated config data) + lib/config-helpers.ts (derived value utilities)

### Phase 2: Theme System
**Goal**: User can customize site colors and typography by editing config
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: COLR-01, COLR-02, COLR-03, COLR-04
**Success Criteria** (what must be TRUE):
  1. User can change primary color in config and see it applied across all site sections
  2. No inline hex colors remain in any component — all use CSS custom properties
  3. `globals.css` has all CSS variables mapped from config brand colors
**Plans**: 2 plans

Plans:
- [x] 02-01: Add colors section to config + migrate globals.css + update config-types.ts
- [x] 02-02: Migrate all 15 components to CSS variable classes + remove ignoreBuildErrors (restored)

### Phase 3: Core Component Refactor
**Goal**: User can customize all conversion-critical sections via config
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: CMP-01, CMP-02, CMP-03, CMP-04, CMP-12, CMP-18, CMP-19, CMP-20, CMP-21
**Success Criteria** (what must be TRUE):
  1. Changing company name in config updates navbar, footer, about section, and Schema.org metadata
  2. Changing WhatsApp number updates all 7 locations (navbar, hero, about, contact, footer, whatsapp-button, page)
  3. Hero section displays custom badge, headline, subheadline, stats, tags, and CTAs from config
  4. Services section renders configurable array of services with icons, codes, titles, descriptions, and specs
  5. Contact form uses phone, email, and services list from config instead of hardcoded values
**Plans**: 2 plans

Plans:
- [x] 03-01: page.tsx conditional rendering + navbar → config + whatsapp-button → config
- [x] 03-02: hero → config + services → config + footer → config + contact-form → config

### Phase 4: Supporting Component Refactor
**Goal**: User can customize all remaining content sections via config
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: CMP-05, CMP-06, CMP-07, CMP-08, CMP-09, CMP-10, CMP-11, CMP-13, CMP-14, CMP-15, CMP-16, CMP-17
**Success Criteria** (what must be TRUE):
  1. Equipment section displays configurable array of equipment with model, name, and specs
  2. About section shows engineer name, CREA, company founding year, stats, and bio from config
  3. Projects gallery renders configurable project cards with title, category, location, area, image, and tags
  4. Testimonials display configurable reviews with name, company, rating, and text
  5. Calculator uses configurable pricing per service, tax rates, and limits
**Plans**: 2 plans

Plans:
- [x] 04-01: equipment → config + about → config + differentials → config + process → config + coverage-map → config
- [x] 04-02: projects → config + testimonials → config + faq → config + calculator → config + blog-preview → config + google-rating → config + client-logos → config

### Phase 5: Demo & Integration
**Goal**: User has a complete working demo config and validation checklist
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: DEMO-01, DEMO-02, DEMO-03, DEMO-04, DEMO-05, DEMO-06, DEMO-07
**Success Criteria** (what must be TRUE):
  1. `site.config.demo.ts` exists with fictional topography company data (all sections populated)
  2. Validation checklist documents step-by-step what to test when customizing the template
  3. Changing company name in config propagates to navbar, footer, about, and Schema.org
  4. Changing WhatsApp number propagates to all 7 component locations
  5. Disabling a section in config removes the corresponding component from the rendered page
**Plans**: TBD

Plans:
- [x] 05-01: Create site.config.demo.ts (CartoPrime fictional data) + VALIDATION.md (18-section checklist)
- [x] 05-02: End-to-end manual testing with demo config

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Config Foundation | 2/2 | Complete | 2026-06-17 |
| 2. Theme System | 2/2 | Complete | 2026-06-17 |
| 3. Core Component Refactor | 2/2 | Complete | 2026-06-17 |
| 4. Supporting Component Refactor | 2/2 | Complete | 2026-06-17 |
| 5. Demo & Integration | 2/2 | Complete | 2026-06-17 |
| 6. Hardcoded Cleanup | 0/2 | Pending | - |

### Phase 6: Hardcoded Cleanup
**Goal**: All component text configurable via site.config.ts — zero hardcoded text
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: CLEAN-01, CLEAN-02, CLEAN-03, CLEAN-04, CLEAN-05, CLEAN-06
**Success Criteria** (what must be TRUE):
  1. User can change certifications in config and see them update in hero, footer, and FAQ
  2. User can change section headlines/descriptions in config (services, about)
  3. User can change footer company description in config
  4. User can change coverage regions in contact form via config
  5. Zero hardcoded Portuguese text remains in any component
**Plans**: 2 plans

Plans:
- [ ] 06-01: Add new schema fields to config-types.ts + update site.config.ts + site.config.demo.ts
- [ ] 06-02: Refactor hero, footer, services, about, contact-form, faq to use new config fields
