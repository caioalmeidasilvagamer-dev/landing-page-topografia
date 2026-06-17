# External Integrations

**Analysis Date:** 2026-06-17

## APIs & External Services

**Analytics:**
- Vercel Analytics
  - Package: `@vercel/analytics` 1.6.1
  - Implementation: `<Analytics />` component in `app/layout.tsx:125`
  - Auth: Automatically configured via Vercel deployment
  - Condition: Only active in production (`process.env.NODE_ENV === 'production'`)

**3D Rendering:**
- Three.js WebGL
  - Package: `three` ^0.184.0
  - Implementation: `components/brazil-3d.tsx`
  - Purpose: Interactive 3D Brazil terrain visualization
  - Dependencies: `@react-three/fiber`, `@react-three/drei`

## Data Storage

**Databases:**
- Not detected (static landing page)

**File Storage:**
- Local filesystem only (`public/images/` directory)
- Static assets served via Next.js public directory

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- Not detected (public landing page, no user authentication)

## External Links & Contact

**WhatsApp Integration:**
- URL pattern: `https://wa.me/5511999999999`
- Files: `components/whatsapp-button.tsx`, `components/contact-form.tsx`, `components/hero.tsx`, `components/navbar.tsx`
- Purpose: Direct WhatsApp communication with pre-filled messages

**Social Media:**
- Instagram: `https://instagram.com/geotech` (`components/footer.tsx:86`)
- LinkedIn: `https://linkedin.com/company/geotech` (`components/footer.tsx:112`)

**Email:**
- Contact email: `contato@geotech.com.br` (`components/footer.tsx:79`)
- Implementation: `mailto:` link (no email service integration)

**Phone:**
- Contact phone: `+55 (11) 99999-9999` (`components/footer.tsx:69`)
- Implementation: `tel:` link (no SMS/voice service integration)

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Console logging only (no structured logging)

## CI/CD & Deployment

**Hosting:**
- Vercel (indicated by `.vercel` in `.gitignore` and `@vercel/analytics`)

**CI Pipeline:**
- Vercel automatic deployment on `main` branch merge (per README)

## Schema & SEO

**Structured Data:**
- Schema.org LocalBusiness markup (`app/layout.tsx:76-116`)
- Open Graph metadata (`app/layout.tsx:37-44`)
- Robots meta tags (`app/layout.tsx:45-49`)

**SEO Configuration:**
- Title: "GeoTech | Topografia & Georreferenciamento"
- Keywords: topografia, georreferenciamento, levantamento topográfico, etc.
- Locale: pt_BR
- Language: pt-BR

## Webhooks & Callbacks

**Incoming:**
- Not detected

**Outgoing:**
- Not detected

## Environment Configuration

**Required env vars:**
- `NODE_ENV` - Controls analytics activation (used in `app/layout.tsx:125`)
- No other environment variables detected in codebase

**Secrets location:**
- `.env.development.download` - v0 runtime credentials (development only)
- Environment variables managed via Vercel dashboard (production)

## Third-Party Scripts

**Google Fonts:**
- IBM Plex Sans (loaded via `next/font/google`)
- IBM Plex Mono (loaded via `next/font/google`)

**No external scripts detected:**
- No Google Analytics (uses Vercel Analytics)
- No Facebook Pixel
- No chat widgets
- No payment processors

## Form Handling

**Contact Form:**
- File: `components/contact-form.tsx`
- Implementation: Client-side only (no API endpoint)
- Validation: Client-side validation with error states
- Submission: Simulated with `setTimeout` (no actual backend)
- Fields: nome, telefone, cidade, servico, mensagem

## Static Assets

**Images:**
- Hero background: `/images/mapa-topo-bg.jpeg`
- Mobile background: `/images/mapa-topo-bg-mobile.jpeg`
- Location: `public/images/`

---

*Integration audit: 2026-06-17*
