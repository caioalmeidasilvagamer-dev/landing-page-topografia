# VALIDATION.md — Phase 01: Config Foundation

**Phase:** 01
**Slug:** config-foundation
**Created:** 2026-06-17
**Status:** Ready

## Validation Strategy

This phase uses **manual testing** per REQUIREMENTS.md (Out of Scope: testes automatizados).

## Requirement → Test Map

| Requirement | Test Method | Expected Result |
|-------------|-------------|-----------------|
| CONF-01 | Manual: Edit site.config.ts | File accepts valid config data |
| CONF-02 | TypeScript: tsc --noEmit | No type errors in lib/config-types.ts |
| CONF-03 | Manual: Introduce invalid data | Zod throws clear validation error |
| CONF-04 | Manual: Set sections.hero = false | Hero section removed from page |
| CONF-05 | Manual: Change brand.name | Name updates in navbar, footer, Schema.org |
| CONF-06 | Manual: Change contact.phone | Phone updates in contact form, footer |
| CONF-07 | Manual: Change social.instagram | Instagram link updates in footer |
| CONF-08 | Manual: Change seo.title | Title updates in browser tab and meta |
| CONF-09 | Manual: Change hero.headline | Headline updates in hero section |
| CONF-10 | Manual: Edit services array | Services section renders updated list |
| CONF-11 | Manual: Edit equipment array | Equipment section renders updated list |
| CONF-12 | Manual: Edit differentials array | Differentials section renders updated list |
| CONF-13 | Manual: Change about.engineer | Engineer name updates in about section |
| CONF-14 | Manual: Edit projects array | Projects section renders updated cards |
| CONF-15 | Manual: Edit testimonials array | Testimonials section renders updated reviews |
| CONF-16 | Manual: Edit clientLogos array | Client logos section renders updated names |
| CONF-17 | Manual: Change googleRating.rating | Rating updates in Google rating section |
| CONF-18 | Manual: Edit faq array | FAQ section renders updated questions |
| CONF-19 | Manual: Edit process array | Process section renders updated steps |
| CONF-20 | Manual: Edit coverage.states | Coverage map renders updated states |
| CONF-21 | Manual: Edit calculator.pricing | Calculator uses updated pricing |
| CONF-22 | Manual: Edit blog articles | Blog section renders updated posts |
| CONF-23 | Manual: Change whatsapp.number | WhatsApp button uses updated number |

## Sampling Rate

- **Per-task commit verification:** Each task commit will be verified manually
- **Wave 0 gaps:** All 4 files (site.config.ts, lib/config-types.ts, lib/icons.ts, lib/config-helpers.ts)

## Gate Criteria

Phase passes when:
1. All 23 requirements have been manually tested
2. site.config.ts accepts valid data without errors
3. Invalid config data produces clear Zod validation errors
4. Changing any config value updates the corresponding UI element
5. TypeScript compilation passes (tsc --noEmit)

## Test Framework

None (manual testing per project scope).

---
*Validation strategy defined: 2026-06-17*
