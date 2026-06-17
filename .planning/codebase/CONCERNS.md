# Codebase Concerns

**Analysis Date:** 2026-06-17

## Tech Debt

**TypeScript build errors ignored:**
- Issue: `next.config.mjs` sets `typescript: { ignoreBuildErrors: true }`, completely disabling type checking during builds.
- Files: `next.config.mjs:4`
- Impact: Type errors accumulate silently. Bugs that TypeScript would catch at build time ship to production undetected. This is especially dangerous when adding new features or refactoring.
- Fix approach: Remove `ignoreBuildErrors: true` and fix all existing TypeScript errors. Run `npx tsc --noEmit` to identify current errors before re-enabling build checks.

**Every component is a client component:**
- Issue: All 21 components in `components/` use `'use client'` directive. None leverage React Server Components.
- Files: `components/about.tsx`, `components/blog-preview.tsx`, `components/brazil-3d.tsx`, `components/calculator.tsx`, `components/client-logos.tsx`, `components/contact-form.tsx`, `components/coverage-map.tsx`, `components/differentials.tsx`, `components/equipment.tsx`, `components/faq.tsx`, `components/footer.tsx`, `components/google-rating.tsx`, `components/hero.tsx`, `components/navbar.tsx`, `components/process.tsx`, `components/projects.tsx`, `components/services.tsx`, `components/testimonials.tsx`, `components/topo-background.tsx`, `components/topo-page-background.tsx`, `components/whatsapp-button.tsx`
- Impact: All JavaScript is shipped to the client. Components like `Footer`, `Services`, `Differentials`, and `GoogleRating` are purely presentational and could be server components, reducing client bundle size.
- Fix approach: Remove `'use client'` from components that have no interactivity (state, effects, event handlers). Only `Navbar`, `Hero`, `ContactForm`, `Calculator`, `Testimonials`, `Projects`, `CoverageMap`, `ClientLogos`, `WhatsAppButton`, `Brazil3D`, and `TopoPageBackground` genuinely need client-side code.

**Unoptimized images totaling ~13 MB:**
- Issue: `images: { unoptimized: true }` in `next.config.mjs` disables Next.js Image Optimization. Large images are served raw from `public/images/`.
- Files: `next.config.mjs:7`, `public/images/bg-site-desktop.png` (2.99 MB), `public/images/mapa-topo-bg-mobile.jpeg` (2.90 MB), `public/images/mapa-topo-bg.jpeg` (2.79 MB), `public/images/project-obra.png` (2.29 MB), `public/images/project-aerial.png` (1.88 MB), `public/images/project-gnss.png` (1.37 MB), `public/images/project-loteamento.png` (1.45 MB)
- Impact: Massive page weight. First contentful paint is significantly delayed, especially on mobile. Lighthouse performance score will be severely penalized.
- Fix approach: Remove `unoptimized: true`. Use Next.js `<Image>` with `priority` for above-fold images. Compress PNGs to WebP/AVIF. Target <500 KB per image.

**Unused `sora` dependency:**
- Issue: `sora` (v0.0.2) is listed in `package.json` dependencies but never imported anywhere in the codebase.
- Files: `package.json:26`
- Impact: Adds unnecessary weight to `node_modules` and increases install time. A v0.0.2 package may have security vulnerabilities.
- Fix approach: Run `pnpm remove sora`.

**Duplicate gitignore files committed:**
- Issue: `gitignore.txt` and `gitignore copy.txt` are identical files committed to the repo. They are also listed in `.gitignore` but were committed before the rule was added.
- Files: `gitignore.txt`, `gitignore copy.txt`
- Impact: Clutter in repo root. Confusion for developers about which file is authoritative.
- Fix approach: Delete both files and ensure `.gitignore` covers the patterns they contain (it already does).

**Duplicated logo SVG across components:**
- Issue: The topographic crosshair SVG logo is manually duplicated in `navbar.tsx` (lines 53-60) and `footer.tsx` (lines 36-43) with slightly different stroke colors.
- Files: `components/navbar.tsx:53-60`, `components/footer.tsx:36-43`
- Impact: Maintenance burden — any design change requires updating both copies. Risk of visual drift.
- Fix approach: Extract the SVG into a shared `Logo` component that accepts a `color` prop.

**No memoization anywhere:**
- Issue: No component uses `React.memo`, `useMemo`, or `useCallback`. Every re-render of `app/page.tsx` re-renders all 18 child components.
- Files: `app/page.tsx` (parent), all components
- Impact: On scroll events (navbar state changes) or other state updates, every component re-renders unnecessarily. The `ClientLogos` infinite animation triggers constant re-renders.
- Fix approach: Wrap pure components (`Footer`, `Services`, `Differentials`, `GoogleRating`, `BlogPreview`, `Process`, `Equipment`) in `React.memo`. Memoize expensive computations like `normaliseCoords` in `brazil-3d.tsx`.

**No React error boundaries:**
- Issue: No error boundary components exist. If `Brazil3D` (Three.js) or any component throws, the entire page crashes with a white screen.
- Files: None (gap)
- Impact: Unhandled rendering errors crash the entire page with no recovery path.
- Fix approach: Add an `ErrorBoundary` wrapper in `app/layout.tsx` that catches errors and displays a fallback UI.

**Heavy 3D dependencies on a landing page:**
- Issue: `three`, `@react-three/fiber`, and `@react-three/drei` add ~300+ KB gzipped to the bundle for a single Brazil 3D terrain visualization.
- Files: `package.json:14-16`, `components/brazil-3d.tsx`
- Impact: Significantly increases initial JavaScript load. The 3D component is below the fold and only seen after scrolling.
- Fix approach: Dynamic import `Brazil3D` with `next/dynamic` and `{ ssr: false }`. Consider lazy-loading only when the section is near viewport.

**Framer Motion used for simple CSS animations:**
- Issue: `framer-motion` is imported in 18 of 21 components. Simple fade-in/slide-up animations could be achieved with CSS `@keyframes` or Tailwind's `tw-animate-css`.
- Files: All components except `topo-background.tsx`, `ui/button.tsx`, `ui/badge.tsx`
- Impact: `framer-motion` is ~40+ KB gzipped. Using it for basic `opacity: 0 → 1` transitions is overkill.
- Fix approach: Replace simple `initial`/`animate`/`whileInView` with CSS transitions for components that don't need layout animation. Reserve framer-motion for `AnimatePresence` and complex orchestration (testimonials, accordion, whatsapp).

## Known Bugs

**Contact form submission is a no-op mock:**
- Symptoms: Form shows loading spinner for 1.5s, then displays "success" message. No data is sent anywhere.
- Files: `components/contact-form.tsx:77-83`
- Trigger: Fill form and click "Solicitar Orçamento".
- Workaround: None — this is a demo/landing page. For production, connect to an API endpoint.

**Calculator uses artificial delay:**
- Symptoms: Calculator shows a fake 1.5s loading spinner before displaying hardcoded math results.
- Files: `components/calculator.tsx:76-80`
- Trigger: Click "Calcular estimativa".
- Workaround: None — purely cosmetic.

**Blog and Google Rating links point nowhere:**
- Symptoms: "Ver todos os artigos" links to `href="#"`. "Ver avaliações no Google" also links to `href="#"`.
- Files: `components/blog-preview.tsx:125`, `components/google-rating.tsx:56`
- Trigger: Clicking these links.
- Workaround: Create actual blog page and Google Reviews link.

**CNPJ in footer is placeholder:**
- Symptoms: Footer displays `CNPJ 00.000.000/0001-00` which is clearly not a real tax ID.
- Files: `components/footer.tsx:210`
- Trigger: Scroll to footer.
- Workaround: Replace with actual CNPJ.

## Security Considerations

**API keys and tokens committed to git history:**
- Risk: `env.development.download` contains an `AI_GATEWAY_API_KEY`, `V0_RUNTIME_URL`, `V0_CALLBACK_URL`, `V0_CODE_SERVER_CALLBACK_URL`, and `V0_CODE_SERVER_CALLBACK_TOKEN`. While `.gitignore` now lists this file, the secrets were already committed and remain in git history.
- Files: `env.development.download`
- Current mitigation: `.gitignore` now prevents future commits of this file.
- Recommendations: Rotate all exposed credentials immediately. Use `git filter-branch` or BFG Repo-Cleaner to purge the file from git history. Add `.env*` pattern to `.gitignore` (already present but `env.development.download` doesn't match the pattern). Consider adding a pre-commit hook to detect secret patterns.

**JSON-LD structured data uses `dangerouslySetInnerHTML`:**
- Risk: The JSON-LD block in `layout.tsx` is hardcoded, so it's safe. But the pattern could become dangerous if dynamic data is ever interpolated.
- Files: `app/layout.tsx:75-115`
- Current mitigation: Data is static/inline.
- Recommendations: Keep static. Never interpolate user input into this block.

**No Content Security Policy headers:**
- Risk: No CSP headers configured. The page loads scripts from external origins (Vercel Analytics) without restrictions.
- Files: `app/layout.tsx` (no CSP meta or header config)
- Current mitigation: None.
- Recommendations: Add CSP headers in `next.config.mjs` or via Vercel configuration.

**No rate limiting or CSRF protection on contact form:**
- Risk: Even though the form is currently a mock, when connected to a backend, there's no CSRF token or rate limiting mechanism.
- Files: `components/contact-form.tsx`
- Current mitigation: Form doesn't actually submit.
- Recommendations: Add CSRF token and rate limiting when implementing the real backend.

## Performance Bottlenecks

**13+ MB of unoptimized images loaded on page load:**
- Problem: Background images (`bg-site-desktop.png` at 2.99 MB, `mapa-topo-bg.jpeg` at 2.79 MB) are loaded immediately as CSS background images via inline styles.
- Files: `components/topo-page-background.tsx:104`, `components/hero.tsx:62`
- Cause: `images: { unoptimized: true }` disables Next.js optimization. Images are raw PNG/JPEG in `public/images/`.
- Improvement path: Convert to WebP/AVIF. Use Next.js `<Image>` component. Set `priority` on hero images. Lazy-load below-fold images. Target total image budget <2 MB.

**Three.js terrain mesh computed on every mount:**
- Problem: `BrazilTerrain` creates a 160×160 segment PlaneGeometry with per-vertex elevation calculations on mount. This is ~25,600 vertices with expensive `elevation()` and `topoColor()` calls.
- Files: `components/brazil-3d.tsx:85-114`
- Cause: Geometry is computed in a `useMemo` with `[]` deps, so it runs once per mount — but on mobile devices with limited GPU, this causes jank during initial render.
- Improvement path: Reduce segment count to 80×80 for mobile. Use `Suspense` with a visible loading indicator. Consider `React.lazy` for the entire component.

**All 18 section components rendered simultaneously:**
- Problem: `app/page.tsx` imports and renders all 18 components in a flat `<main>` tag. Every component mounts immediately, even those far below the fold.
- Files: `app/page.tsx:20-42`
- Cause: No code splitting or lazy loading. All components are eagerly imported.
- Improvement path: Use `next/dynamic` for below-fold components (`Calculator`, `FAQ`, `ContactForm`, `BlogPreview`, `Testimonials`, `Projects`). Each is a large component with its own dependencies.

**ClientLogos infinite animation never pauses:**
- Problem: The marquee animation runs `repeat: Infinity` with `duration: 30` and never pauses, even when not visible.
- Files: `components/client-logos.tsx:37`
- Cause: Framer Motion `animate` runs continuously regardless of viewport visibility.
- Improvement path: Use `whileInView` instead of `animate` to pause animation when scrolled out of view. Or use CSS `animation-play-state` with Intersection Observer.

## Fragile Areas

**Inline styles with hardcoded hex/rgba values:**
- Files: Nearly every component (e.g., `components/footer.tsx:25`, `components/contact-form.tsx:104`, `components/services.tsx:86`)
- Why fragile: Colors like `#1F3A5F`, `#D0DAEA`, `rgba(176,196,214,0.65)` are scattered across components instead of using Tailwind tokens. Changing the brand color requires a codebase-wide find-and-replace.
- Safe modification: Define all brand colors in `app/globals.css` as CSS custom properties. Replace inline `style` attributes with Tailwind classes referencing those tokens.

**Fixed z-index stacking context:**
- Files: `components/topo-page-background.tsx:93` (`zIndex: 0`), `app/layout.tsx:122` (`zIndex: 1`), `components/whatsapp-button.tsx:19` (`z-index: 9999`)
- Why fragile: The entire site relies on a global fixed background at z-index 0 and content at z-index 1. Adding any component with a new z-index can break the visual layering.
- Safe modification: Document the z-index scale. Use a consistent z-index token system (e.g., `z-background`, `z-content`, `z-overlay`, `z-modal`).

**Monolithic `contact-form.tsx` (456 lines):**
- Files: `components/contact-form.tsx`
- Why fragile: Contains two completely unrelated sections (CTA dark section + Form light section) in a single component. Changes to the contact form require navigating a 456-line file.
- Safe modification: Split into `ContactCTA.tsx` and `ContactFormSection.tsx`. Keep form logic in its own file.

**Hardcoded business data throughout components:**
- Files: `components/contact-form.tsx:137-139` (phone, email), `components/hero.tsx:155` (WhatsApp link), `components/navbar.tsx:120` (WhatsApp link), `components/footer.tsx:62-79` (phone, email), `components/coverage-map.tsx:9-37` (state coverage), `components/testimonials.tsx:9-49` (testimonials), `components/blog-preview.tsx:8-38` (articles), `components/google-rating.tsx:7-18` (reviews)
- Why fragile: Business data (phone numbers, email, testimonials, coverage area, review count) is hardcoded across 8+ files. Updating a phone number requires touching 5+ files.
- Safe modification: Create a `lib/content.ts` or `lib/config.ts` with all business constants. Import from a single source of truth.

## Dependencies at Risk

**`sora` package (v0.0.2):**
- Risk: Listed in dependencies but never imported. A v0.0.2 package suggests early/experimental status with potential security vulnerabilities.
- Impact: Unknown — currently unused. But its presence in `node_modules` could introduce transitive dependency issues.
- Migration plan: Remove with `pnpm remove sora`.

**`@vercel/analytics` pinned to 1.6.1:**
- Risk: Pinned to a specific version rather than using `^1.6.1`. This prevents automatic patch updates.
- Impact: Missing security or bug fix patches.
- Migration plan: Change to `^1.6.1` in `package.json` and run `pnpm update @vercel/analytics`.

## Test Coverage Gaps

**No tests exist:**
- What's not tested: Every component, utility function, and page in the entire codebase.
- Files: No test files exist (searched `*.test.*` and `*.spec.*` — zero results in project source).
- Risk: Regressions are invisible. Changes to `calculator.tsx` pricing logic, `contact-form.tsx` validation, or `topo-page-background.tsx` SVG generation could break without detection.
- Priority: High — at minimum, add tests for `lib/utils.ts`, `calculator.tsx` (calculate function), `contact-form.tsx` (validation logic), and `hero.tsx` (CountUp component).

## Missing Critical Features

**No error handling for image loading:**
- Problem: `<Image>` in `projects.tsx` has no fallback if the image fails to load. Broken images show as empty squares.
- Files: `components/projects.tsx:114-120`
- Blocks: Production deployment with potentially broken image references.

**No SEO structure beyond basic meta:**
- Problem: No `sitemap.xml`, no `robots.txt`, no dynamic Open Graph images, no page-level metadata for individual routes.
- Files: `app/layout.tsx` (only has basic `Metadata`)
- Blocks: Search engine indexing is suboptimal. Social media sharing shows generic preview.

**No accessibility audit:**
- Problem: No `aria-label` on interactive icons (except navbar hamburger). No `role` attributes on custom interactive elements. Color contrast between muted text (`rgba(176,196,214,0.65)`) and backgrounds may fail WCAG AA.
- Files: Throughout all components
- Blocks: Legal compliance in some jurisdictions. Excludes users with disabilities.

**No loading/error states for 3D component:**
- Problem: `Brazil3D` checks WebGL support but shows nothing while the Three.js Canvas loads. On slow connections, the user sees a blank area.
- Files: `components/brazil-3d.tsx:273-313`
- Blocks: Poor user experience on mobile/low-bandwidth.

---

*Concerns audit: 2026-06-17*
