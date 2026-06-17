# Coding Conventions

**Analysis Date:** 2026-06-17

## Naming Patterns

**Files:**
- kebab-case for all component files: `contact-form.tsx`, `hero.tsx`, `navbar.tsx`
- kebab-case for utility files: `utils.ts`
- kebab-case for CSS files: `globals.css`
- No index.ts barrel files — direct imports used

**Functions:**
- camelCase for functions and handlers: `scrollToContact`, `handleCalculate`, `formatPhone`, `formatCurrency`
- React components use PascalCase: `Hero`, `Navbar`, `ContactForm`, `Calculator`
- Internal helper components use PascalCase: `CountUp`
- Custom hooks use camelCase with `use` prefix (none found in codebase)

**Variables:**
- camelCase for variables and state: `scrolled`, `open`, `service`, `area`, `result`
- UPPER_SNAKE_CASE not used — no constants require it
- Boolean state uses descriptive names: `scrolled`, `loading`, `open`

**Types/Interfaces:**
- PascalCase for interfaces: `FormData`, `FormErrors`, `CountUpProps`, `Result`
- Interface names describe the data shape: `FormData` for form state, `FormErrors` for validation errors
- Props interfaces named after component with `Props` suffix: `CountUpProps`

## Code Style

**Formatting:**
- No explicit Prettier/ESLint config files in project root
- Indentation: 2 spaces consistently across all files
- Semicolons: Not used (consistent with Prettier default for JSX)
- Trailing commas: Used in arrays, objects, and function parameters
- Single quotes for strings in JSX attributes, template literals for dynamic classes

**Linting:**
- ESLint configured via `next lint` (Next.js default)
- No custom ESLint config detected
- TypeScript strict mode enabled in `tsconfig.json`

**Component Structure:**
- Functional components only — no class components
- `'use client'` directive at top of client components
- Exported as named exports: `export function Hero()`
- Default export only for page/layout: `export default function HomePage()`

## Import Organization

**Order:**
1. React/Next.js imports: `import { useState } from 'react'`
2. Third-party libraries: `import { motion, useInView } from 'framer-motion'`
3. Icon libraries: `import { ArrowRight, MessageCircle } from 'lucide-react'`
4. Local components: `import { TopoBackground } from './topo-background'`
5. Utility functions: `import { cn } from '@/lib/utils'`
6. CSS imports: `import './globals.css'`

**Path Aliases:**
- `@/*` maps to project root: `@/components/*`, `@/lib/*`
- Relative imports for sibling components: `./topo-background`
- Absolute imports for cross-directory: `@/components/navbar`

**Import Style:**
- Named imports preferred: `import { useState, useEffect } from 'react'`
- Default imports only for modules that export default: `import { Analytics } from '@vercel/analytics/next'`
- Type imports use `type` keyword: `import type { Metadata, Viewport } from 'next'`

## Component Design

**File Organization:**
- One component per file
- Components in `components/` directory
- UI primitives in `components/ui/` directory (shadcn pattern)
- Utilities in `lib/` directory
- App routes in `app/` directory

**Component Structure Pattern:**
```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // Props interface
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State declarations
  // Event handlers
  // Helper functions
  
  return (
    <section className="...">
      {/* Content */}
    </section>
  )
}
```

**Styling Approach:**
- Tailwind CSS for all styling
- `cn()` utility for conditional classes: `cn(baseClass, condition && 'conditional-class')`
- Inline `style` attributes for custom colors not in Tailwind theme: `style={{ backgroundColor: '#1F3A5F' }}`
- CSS variables for theme tokens: `var(--primary)`, `var(--foreground)`
- Responsive design using Tailwind prefixes: `sm:`, `md:`, `lg:`

**Animation Pattern:**
- Framer Motion for animations
- Viewport-triggered animations: `whileInView`, `useInView`
- Consistent animation variants: opacity + transform
- Staggered delays: `delay: 0.1`, `delay: 0.2`
- AnimatePresence for conditional animations

## State Management

**Local State Only:**
- No global state management (Redux, Zustand, Context API)
- All state is component-local using `useState`
- State variables named descriptively: `scrolled`, `open`, `loading`, `result`

**State Patterns:**
```typescript
// Simple boolean state
const [scrolled, setScrolled] = useState(false)

// Form state with object
const [form, setForm] = useState<FormData>({
  nome: '',
  telefone: '',
})

// Loading/async state
const [loading, setLoading] = useState(false)

// Result state (nullable)
const [result, setResult] = useState<Result | null>(null)

// Status enum pattern
const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
```

## Error Handling

**Patterns:**
- No try/catch blocks found in client components
- Form validation handled inline with state: `if (!validate()) return`
- No error boundaries detected
- No API error handling (form submission is mocked with `setTimeout`)

**Form Validation:**
```typescript
const validate = (): boolean => {
  const newErrors: FormErrors = {}
  if (!form.nome.trim() || form.nome.trim().length < 3) {
    newErrors.nome = 'Informe seu nome completo'
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

## Comments

**When to Comment:**
- Portuguese comments for section dividers: `{/* CTA Final — fundo escuro com curvas de nível */}`
- Portuguese comments for technical explanations: `{/* Divisor vertical técnico */}`
- No JSDoc/TSDoc comments
- No inline code comments

**Comment Style:**
```tsx
{/* Section divider */}
{/* Technical explanation */}
{/* Background element */}
```

## Function Design

**Size:**
- Components: 50-280 lines (hero.tsx: 281, contact-form.tsx: 456)
- Helper functions: 5-20 lines
- No strict size limits enforced

**Parameters:**
- Destructured props in function signature
- Default values in destructuring: `suffix = ''`, `duration = 2`
- Event handlers use arrow functions: `onChange={handleChange('nome')}`

**Return Values:**
- Components always return JSX
- Helper functions return explicit types: `formatPhone(value: string): string`
- Validation functions return boolean: `validate(): boolean`

## Module Design

**Exports:**
- Named exports for components: `export function Hero()`
- Named exports for utilities: `export function cn()`
- Named exports for UI components: `export { Button, buttonVariants }`
- Default exports only for Next.js pages/layouts

**Barrel Files:**
- Not used — direct imports preferred
- No `index.ts` files in any directory

## UI Component Patterns

**shadcn/ui Components:**
- Located in `components/ui/`
- Use `@base-ui/react` primitives
- Variant pattern with `class-variance-authority`:
```typescript
const buttonVariants = cva(
  "base classes...",
  {
    variants: {
      variant: { default: '...', outline: '...' },
      size: { default: '...', sm: '...' }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)
```

**Component Wrapper Pattern:**
```typescript
function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

## Accessibility

**Patterns:**
- `aria-label` for icon-only buttons: `aria-label="Fechar menu"`
- `aria-hidden="true"` for decorative SVGs
- `aria-invalid` for form validation states
- `aria-describedby` for error messages
- Semantic HTML: `<nav>`, `<header>`, `<footer>`, `<main>`, `<section>`
- Focus states: `focus:outline-none focus:ring-2 focus:ring-primary/30`

## Language

**Primary Language:**
- Portuguese (pt-BR) for all UI text and comments
- English for code identifiers (function names, variable names)
- Technical terms may mix: "GNSS RTK", "CRA/CAU"

---

*Convention analysis: 2026-06-17*
