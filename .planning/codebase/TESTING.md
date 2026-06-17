# Testing Patterns

**Analysis Date:** 2026-06-17

## Test Framework

**Runner:**
- No test framework configured
- No test runner installed (no Jest, Vitest, or Testing Library in `package.json`)
- No test configuration files found

**Assertion Library:**
- Not configured

**Run Commands:**
```bash
# No test commands available
npm test              # Not configured
pnpm test             # Not configured
```

**Current State:**
- No test files exist in project (only in `node_modules/`)
- No test configuration in `package.json`
- No test scripts defined
- No testing dependencies installed

## Test File Organization

**Location:**
- No test files exist in project source
- All `.test.*` files found are in `node_modules/` (third-party)

**Naming:**
- No naming conventions established (no tests exist)

**Structure:**
```
project-root/
├── app/                  # No test files
├── components/           # No test files
├── components/ui/        # No test files
└── lib/                  # No test files
```

## Test Structure

**Suite Organization:**
- Not applicable — no tests exist

**Patterns:**
- Not applicable

## Mocking

**Framework:**
- Not configured

**Patterns:**
- Not applicable

**What to Mock:**
- Client-side localStorage/sessionStorage
- `window.scrollTo` for scroll-to-section navigation
- `requestAnimationFrame` for CountUp animation
- `setTimeout` for simulated API calls
- Framer Motion animations (can use `motion` mock)

**What NOT to Mock:**
- React hooks (use useState, useEffect directly)
- Tailwind CSS classes
- Next.js navigation (not used — single page app)

## Fixtures and Factories

**Test Data:**
- Not applicable — no tests exist

**Location:**
- Not applicable

## Coverage

**Requirements:**
- No coverage requirements enforced
- No coverage configuration

**View Coverage:**
```bash
# No coverage tool configured
# Recommended: Add to package.json
# "coverage": "vitest run --coverage"
```

## Test Types

**Unit Tests:**
- Not implemented
- Recommended for: `lib/utils.ts`, `calculator.tsx` logic, `contact-form.tsx` validation

**Integration Tests:**
- Not implemented
- Recommended for: Form submission flow, navigation interactions

**E2E Tests:**
- Not implemented
- Recommended for: Playwright or Cypress for full user flows

## Recommended Testing Setup

**Install Dependencies:**
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Vitest Config (`vitest.config.ts`):**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

**Setup File (`test/setup.ts`):**
```typescript
import '@testing-library/jest-dom'
```

**Package.json Scripts:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Example Test Patterns

**Component Rendering:**
```typescript
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getByText('Precisão em')).toBeInTheDocument()
  })
})
```

**Form Validation:**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/contact-form'

describe('ContactForm', () => {
  it('shows error for short name', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Jo' } })
    fireEvent.click(screen.getByRole('button', { name: /solicitar/i }))
    await waitFor(() => {
      expect(screen.getByText(/nome completo/i)).toBeInTheDocument()
    })
  })
})
```

**Calculator Logic:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Calculator } from '@/components/calculator'

describe('Calculator', () => {
  it('calculates price range', () => {
    render(<Calculator />)
    fireEvent.change(screen.getByLabelText(/área/i), { target: { value: '50' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))
    expect(screen.getByText(/R\$/)).toBeInTheDocument()
  })
})
```

**Utility Functions:**
```typescript
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('resolves conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
```

**Navigation Links:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'

describe('Navbar', () => {
  it('scrolls to section on link click', () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    
    render(<Navbar />)
    fireEvent.click(screen.getByText('Serviços'))
    expect(scrollIntoView).toHaveBeenCalled()
  })
})
```

## Testing Gaps

**Critical Gaps:**
- No test infrastructure exists
- No component tests
- No utility function tests
- No form validation tests
- No accessibility tests

**Priority Areas:**
1. `lib/utils.ts` — `cn()` utility function (high)
2. `components/contact-form.tsx` — Form validation logic (high)
3. `components/calculator.tsx` — Calculation logic (high)
4. `components/navbar.tsx` — Navigation behavior (medium)
5. `components/hero.tsx` — CountUp animation logic (low)

**Recommended Coverage Target:**
- Critical utilities: 100%
- Form validation: 100%
- Business logic (calculator): 100%
- UI components: 60%+
- Overall: 70%+

---

*Testing analysis: 2026-06-17*
