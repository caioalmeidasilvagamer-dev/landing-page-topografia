# Technology Stack

**Analysis Date:** 2026-06-17

## Languages

**Primary:**
- TypeScript 5.7.3 - All application code (`app/`, `components/`, `lib/`)
- CSS (Tailwind CSS v4.2.0) - Styling and theming

**Secondary:**
- JavaScript (ES modules) - Configuration files (`next.config.mjs`, `postcss.config.mjs`)

## Runtime

**Environment:**
- Node.js 22.22.3 (runtime)
- npm 11.16.0 (package manager)

**Package Manager:**
- pnpm (lockfile: `pnpm-lock.yaml` present)
- Workspace config: `pnpm-workspace.yaml`

## Frameworks

**Core:**
- Next.js 16.2.6 - React framework with App Router
- React 19 - UI library
- React DOM 19 - DOM rendering

**Testing:**
- Not detected (no test framework configured)

**Build/Dev:**
- PostCSS 8.5 - CSS processing
- TypeScript 5.7.3 - Type checking and compilation

## Key Dependencies

**Critical:**
- `@react-three/fiber` ^9.6.1 - React Three.js renderer for 3D visualization
- `@react-three/drei` ^10.7.7 - React Three.js helpers and abstractions
- `three` ^0.184.0 - 3D graphics library for Brazil terrain model
- `framer-motion` ^12.40.0 - Animation library for UI interactions
- `shadcn` ^4.8.0 - UI component system (base-nova style)

**Infrastructure:**
- `@vercel/analytics` 1.6.1 - Vercel analytics integration
- `class-variance-authority` ^0.7.1 - Variant-based component styling
- `clsx` ^2.1.1 - Conditional class names
- `tailwind-merge` ^3.3.1 - Tailwind class deduplication

**UI/UX:**
- `lucide-react` ^1.16.0 - Icon library
- `@base-ui/react` ^1.5.0 - Base UI primitives (shadcn dependencies)
- `@fontsource/ibm-plex-sans` ^5.2.8 - IBM Plex Sans font
- `@fontsource/ibm-plex-mono` (via next/font/google) - IBM Plex Mono font
- `tw-animate-css` ^1.4.0 - Tailwind CSS animations

## Configuration

**Environment:**
- `.env.development.download` - Development environment variables (v0 runtime)
- `.gitignore` - Excludes `.env`, `.env.*`, `*.local` files

**Build:**
- `next.config.mjs` - Next.js configuration
  - `typescript.ignoreBuildErrors: true` - Ignores TypeScript errors during build
  - `images.unoptimized: true` - Disables image optimization
- `postcss.config.mjs` - PostCSS with `@tailwindcss/postcss` plugin
- `tsconfig.json` - TypeScript configuration
  - Target: ES6
  - Module: esnext
  - Strict mode enabled
  - Path alias: `@/*` → `./*`
- `components.json` - shadcn configuration
  - Style: base-nova
  - RSC: enabled
  - Tailwind CSS variables: enabled
  - Icon library: lucide

## Platform Requirements

**Development:**
- Node.js 18+ (recommended: 22.x)
- pnpm package manager
- Windows/macOS/Linux

**Production:**
- Vercel deployment (configured in `.gitignore`)
- Static export capability (unoptimized images)

## Special Features

**3D Graphics:**
- WebGL-based 3D Brazil terrain model (`components/brazil-3d.tsx`)
- Procedural topographic coloring
- WebGL fallback detection for unsupported devices

**Typography:**
- IBM Plex Sans (headings and body)
- IBM Plex Mono (technical metadata)
- Custom font variables in CSS theme

**Theming:**
- Custom color palette (technical/engineering theme)
- CSS custom properties for all semantic colors
- Dark/light mode support (currently light only)

---

*Stack analysis: 2026-06-17*
