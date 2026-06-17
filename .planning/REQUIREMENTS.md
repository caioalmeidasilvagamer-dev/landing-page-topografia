# Requirements: Topografia LP Template

**Defined:** 2026-06-17
**Core Value:** Um arquivo `site.config.ts` único que, ao ser editado, customiza toda a landing page sem necessidade de alterar componentes.

## v1 Requirements

### Config Foundation

- [ ] **CONF-01**: Criar `site.config.ts` no root do projeto com todos os dados customizáveis
- [ ] **CONF-02**: Criar tipos TypeScript `SiteConfig` em `lib/config-types.ts` com schema completo
- [ ] **CONF-03**: Instalar Zod e validar config no import (fail fast com erros claros)
- [ ] **CONF-04**: Criar seção `sections` no config para habilitar/desabilitar cada componente
- [ ] **CONF-05**: Criar seção `brand` (nome, logo, slogan, colors, fonts)
- [ ] **CONF-06**: Criar seção `contact` (telefone, email, WhatsApp, endereço, horários)
- [ ] **CONF-07**: Criar seção `social` (Instagram, LinkedIn, URLs)
- [ ] **CONF-08**: Criar seção `seo` (title, description, keywords, ogImage)
- [ ] **CONF-09**: Criar seção `hero` (badge, headline, subheadline, stats, tags, CTAs)
- [ ] **CONF-10**: Criar seção `services` (array de serviços com icon, código, título, descrição, specs)
- [ ] **CONF-11**: Criar seção `equipment` (array de equipamentos com modelo, nome, specs)
- [ ] **CONF-12**: Criar seção `differentials` (array com título, descrição, métrica)
- [ ] **CONF-13**: Criar seção `about` (engenheiro, CREA, ano fundação, stats, texto)
- [ ] **CONF-14**: Criar seção `projects` (array com título, categoria, localização, área, imagem, tags)
- [ ] **CONF-15**: Criar seção `testimonials` (array com nome, empresa, rating, texto)
- [ ] **CONF-16**: Criar seção `clientLogos` (array de nomes de empresas)
- [ ] **CONF-17**: Criar seção `googleRating` (rating, contagem, reviews)
- [ ] **CONF-18**: Criar seção `faq` (array de perguntas e respostas)
- [ ] **CONF-19**: Criar seção `process` (array de etapas com número, título, descrição)
- [ ] **CONF-20**: Criar seção `coverage` (estados atendidos)
- [ ] **CONF-21**: Criar seção `calculator` (preços por serviço, taxas, limites)
- [ ] **CONF-22**: Criar seção `blog` (array de artigos com categoria, título, excerpt)
- [ ] **CONF-23**: Criar seção `whatsapp` (número, mensagem pré-preenchida)

### Color Migration

- [ ] **COLR-01**: Migrar `style={{ backgroundColor: '#1F3A5F' }}` para classes Tailwind com CSS vars em todos os componentes
- [ ] **COLR-02**: Migrar `text-[#E20613]` e hex inline similares para classes com CSS vars
- [ ] **COLR-03**: Atualizar `globals.css` para garantir que todas as CSS vars estejam mapeadas
- [ ] **COLR-04**: Remover `ignoreBuildErrors: true` do `next.config.mjs`

### Component Refactor

- [ ] **CMP-01**: Refatorar `layout.tsx` para importar metadata e Schema.org do config
- [ ] **CMP-02**: Refatorar `navbar.tsx` para usar logo, nav links, WhatsApp do config
- [ ] **CMP-03**: Refatorar `hero.tsx` para usar textos, stats, badges, CTAs do config
- [ ] **CMP-04**: Refatorar `services.tsx` para usar array de serviços do config
- [ ] **CMP-05**: Refatorar `equipment.tsx` para usar equipamentos do config
- [ ] **CMP-06**: Refatorar `differentials.tsx` para usar diferenciais do config
- [ ] **CMP-07**: Refatorar `about.tsx` para usar dados do engenheiro e empresa do config
- [ ] **CMP-08**: Refatorar `projects.tsx` para usar projetos do config
- [ ] **CMP-09**: Refatorar `testimonials.tsx` para usar depoimentos do config
- [ ] **CMP-10**: Refatorar `client-logos.tsx` para usar logos do config
- [ ] **CMP-11**: Refatorar `google-rating.tsx` para usar rating do config
- [ ] **CMP-12**: Refatorar `contact-form.tsx` para usar telefone, email, serviços do config
- [ ] **CMP-13**: Refatorar `calculator.tsx` para usar preços e serviços do config
- [ ] **CMP-14**: Refatorar `faq.tsx` para usar perguntas do config
- [ ] **CMP-15**: Refatorar `process.tsx` para usar etapas do config
- [ ] **CMP-16**: Refatorar `coverage-map.tsx` para usar estados do config
- [ ] **CMP-17**: Refatorar `blog-preview.tsx` para usar artigos do config
- [ ] **CMP-18**: Refatorar `footer.tsx` para usar dados da empresa, redes sociais, CNPJ do config
- [ ] **CMP-19**: Refatorar `whatsapp-button.tsx` para usar número do config
- [ ] **CMP-20**: Refatorar `page.tsx` para passar props dos componentes via config
- [ ] **CMP-21**: Extrair componente `<Logo>` compartilhado (navbar + footer)

### Demo & Validation

- [ ] **DEMO-01**: Criar `site.config.demo.ts` com dados fictícios de uma empresa de topografia demo
- [ ] **DEMO-02**: Criar passo a passo de validação manual no README ou VALIDATION.md
- [ ] **DEMO-03**: Testar que trocar nome da empresa altera em navbar, footer, about, Schema.org
- [ ] **DEMO-04**: Testar que trocar número WhatsApp altera em navbar, hero, about, contact, footer, whatsapp-button
- [ ] **DEMO-05**: Testar que trocar cores altera visual em todos os componentes
- [ ] **DEMO-06**: Testar que trocar serviços altera em services, contact-form, calculator
- [ ] **DEMO-07**: Testar que desabilitar seção no config remove o componente da página

## v2 Requirements

### Enhanced Customization

- **V2-01**: Suporte a modo escuro via config
- **V2-02**: Suporte a múltiplos idiomas (i18n)
- **V2-03**: CMS headless (Strapi/Sanity) para edição non-technical
- **V2-04**: Deploy automático via Vercel com preview por branch

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / Painel admin | Usuário é dev, prefere editar no código |
| i18n / Tradução | Conteúdo em português apenas |
| Backend / Banco de dados | Landing page estática |
| Autenticação | Não há rotas protegidas |
| Testes automatizados | Protótipo/demo, validação manual |
| Multi-tenant | Cada部署 é uma cópia independente do template |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONF-01 | Phase 1: Config Foundation | Complete |
| CONF-02 | Phase 1: Config Foundation | Complete |
| CONF-03 | Phase 1: Config Foundation | Complete |
| CONF-04 | Phase 1: Config Foundation | Complete |
| CONF-05 | Phase 1: Config Foundation | Complete |
| CONF-06 | Phase 1: Config Foundation | Complete |
| CONF-07 | Phase 1: Config Foundation | Complete |
| CONF-08 | Phase 1: Config Foundation | Complete |
| CONF-09 | Phase 1: Config Foundation | Complete |
| CONF-10 | Phase 1: Config Foundation | Complete |
| CONF-11 | Phase 1: Config Foundation | Complete |
| CONF-12 | Phase 1: Config Foundation | Complete |
| CONF-13 | Phase 1: Config Foundation | Complete |
| CONF-14 | Phase 1: Config Foundation | Complete |
| CONF-15 | Phase 1: Config Foundation | Complete |
| CONF-16 | Phase 1: Config Foundation | Complete |
| CONF-17 | Phase 1: Config Foundation | Complete |
| CONF-18 | Phase 1: Config Foundation | Complete |
| CONF-19 | Phase 1: Config Foundation | Complete |
| CONF-20 | Phase 1: Config Foundation | Complete |
| CONF-21 | Phase 1: Config Foundation | Complete |
| CONF-22 | Phase 1: Config Foundation | Complete |
| CONF-23 | Phase 1: Config Foundation | Complete |
| COLR-01 | Phase 2: Theme System | Complete |
| COLR-02 | Phase 2: Theme System | Complete |
| COLR-03 | Phase 2: Theme System | Complete |
| COLR-04 | Phase 2: Theme System | Complete |
| CMP-01 | Phase 3: Core Component Refactor | Complete |
| CMP-02 | Phase 3: Core Component Refactor | Complete |
| CMP-03 | Phase 3: Core Component Refactor | Complete |
| CMP-04 | Phase 3: Core Component Refactor | Complete |
| CMP-12 | Phase 3: Core Component Refactor | Complete |
| CMP-18 | Phase 3: Core Component Refactor | Complete |
| CMP-19 | Phase 3: Core Component Refactor | Complete |
| CMP-20 | Phase 3: Core Component Refactor | Complete |
| CMP-21 | Phase 3: Core Component Refactor | Complete |
| CMP-05 | Phase 4: Supporting Component Refactor | Complete |
| CMP-06 | Phase 4: Supporting Component Refactor | Complete |
| CMP-07 | Phase 4: Supporting Component Refactor | Complete |
| CMP-08 | Phase 4: Supporting Component Refactor | Complete |
| CMP-09 | Phase 4: Supporting Component Refactor | Complete |
| CMP-10 | Phase 4: Supporting Component Refactor | Complete |
| CMP-11 | Phase 4: Supporting Component Refactor | Complete |
| CMP-13 | Phase 4: Supporting Component Refactor | Complete |
| CMP-14 | Phase 4: Supporting Component Refactor | Complete |
| CMP-15 | Phase 4: Supporting Component Refactor | Complete |
| CMP-16 | Phase 4: Supporting Component Refactor | Complete |
| CMP-17 | Phase 4: Supporting Component Refactor | Complete |
| DEMO-01 | Phase 5: Demo & Integration | Complete |
| DEMO-02 | Phase 5: Demo & Integration | Complete |
| DEMO-03 | Phase 5: Demo & Integration | Complete |
| DEMO-04 | Phase 5: Demo & Integration | Complete |
| DEMO-05 | Phase 5: Demo & Integration | Complete |
| DEMO-06 | Phase 5: Demo & Integration | Complete |
| DEMO-07 | Phase 5: Demo & Integration | Complete |

**Coverage:**
- v1 requirements: 54 total
- Mapped to phases: 54
- Complete: 54 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-17*
*Last updated: 2026-06-17 after roadmap creation*
