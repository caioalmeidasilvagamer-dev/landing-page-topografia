# Topografia LP Demo — Template

## What This Is

Landing page protótipo/demo para prospectar topógrafos e empresas de topografia que não possuem site. Funciona como template reutilizável onde o usuário troca identidade (nome, cores, logo), serviços, preços, projetos e conteúdo por meio de um arquivo de configuração central — sem mexer nos componentes.

## Core Value

Um arquivo `site.config.ts` único que, ao ser editado, customiza toda a landing page (cores, textos, serviços, preços, WhatsApp, contato) sem necessidade de alterar componentes.

## Requirements

### Validated

- ✓ Landing page visual profissional com tema topográfico — existing
- ✓ 18 componentes funcionais (hero, serviços, FAQ, contato, etc.) — existing
- ✓ Design responsivo mobile/desktop — existing
- ✓ Animações com Framer Motion — existing
- ✓ Sistema de cores via CSS variables — existing
- ✓ Calculadora de orçamento interativa — existing
- ✓ Integração WhatsApp — existing
- ✓ SEO com Schema.org — existing

### Active

- [ ] Criar `site.config.ts` com todos os dados customizáveis
- [ ] Criar tipos TypeScript para o config (`SiteConfig`)
- [ ] Refatorar `layout.tsx` para usar dados do config (metadata, Schema.org, nome)
- [ ] Refatorar `navbar.tsx` para usar logo, nav links e WhatsApp do config
- [ ] Refatorar `hero.tsx` para usar textos, stats, badges e CTAs do config
- [ ] Refatorar `services.tsx` para usar array de serviços do config
- [ ] Refatorar `equipment.tsx` para usar equipamentos do config
- [ ] Refatorar `differentials.tsx` para usar diferenciais do config
- [ ] Refatorar `about.tsx` para usar dados do engenheiro e empresa do config
- [ ] Refatorar `projects.tsx` para usar projetos do config
- [ ] Refatorar `testimonials.tsx` para usar depoimentos do config
- [ ] Refatorar `client-logos.tsx` para usar logos do config
- [ ] Refatorar `google-rating.tsx` para usar rating do config
- [ ] Refatorar `contact-form.tsx` para usar telefone, email, serviços do config
- [ ] Refatorar `calculator.tsx` para usar preços e serviços do config
- [ ] Refatorar `faq.tsx` para usar perguntas do config
- [ ] Refatorar `process.tsx` para usar etapas do config
- [ ] Refatorar `coverage-map.tsx` para usar estados do config
- [ ] Refatorar `blog-preview.tsx` para usar artigos do config
- [ ] Refatorar `footer.tsx` para usar dados da empresa, redes sociais, CNPJ do config
- [ ] Refatorar `whatsapp-button.tsx` para usar número do config
- [ ] Refatorar `page.tsx` para passar props dos componentes via config
- [ ] Unificar hex inline para usar CSS variables
- [ ] Criar exemplo de config com dados fictícios para demo
- [ ] Teste manual: trocar dados no config e validar que tudo altera corretamente

### Out of Scope

- CMS ou painel admin — optou por arquivo de config
- i18n / tradução — conteúdo em português apenas
- Autenticação ou rotas protegidas — landing page estática
- Backend / banco de dados — projeto puramente frontend
- Testes automatizados — validação manual apenas

## Context

- **Brownfield**: Projeto Next.js 16 existente com 18 componentes hardcoded
- **Stack**: React 19, Tailwind CSS v4, shadcn/ui, Framer Motion, IBM Plex Sans
- **Problema atual**: Todo conteúdo está hardcoded dentro dos componentes — número WhatsApp duplicado em 7 arquivos, serviços fixos, preços fixos, textos fixos
- **Objetivo**: Transformar em template onde o usuário edita UM arquivo e a landing page inteira muda
- **Público-alvo**: Topógrafos e empresas de topografia sem site

## Constraints

- **Tech stack**: Next.js 16, React 19, Tailwind v4 — não mudar framework
- **Compatibilidade**: Manter compatibilidade com o design atual (não quebrar visual)
- **Simplicidade**: Config deve ser simples o suficiente para quem não é dev alterar
- **Performance**: Não introduzir dependências pesadas para o config

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Arquivo de config (não CMS) | Usuário é dev/technical, quer customizar no código | — Pending |
| Tudo em uma fase | Escopo claro e bem definido, não vale dividir | — Pending |
| Teste manual | Protótipo/demo, não precisa de testes automatizados | — Pending |
| TypeScript para o config | Type safety, autocomplete, validação | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state (users, feedback, metrics)

---
*Last updated: 2026-06-17 after initialization*
