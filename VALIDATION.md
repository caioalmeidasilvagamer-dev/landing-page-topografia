# Validação do Template - Topografia LP

## Visão Geral
Este documento lista todos os passos para validar que o template funciona corretamente quando o arquivo `site.config.ts` é personalizado.

## Pré-requisitos
- [ ] `pnpm install` executado com sucesso
- [ ] `pnpm dev` rodando sem erros
- [ ] Acessar `http://localhost:3000` no navegador

---

## 1. Seções (config.sections)
Teste desabilitando cada seção:

| Seção | Como testar | Esperado |
|-------|-------------|----------|
| `sections.navbar: false` | Editar config | Navbar some do topo |
| `sections.hero: false` | Editar config | Hero section some |
| `sections.services: false` | Editar config | Seção de serviços some |
| `sections.equipment: false` | Editar config | Seção de equipamentos some |
| `sections.about: false` | Editar config | Seção "Sobre" some |
| `sections.projects: false` | Editar config | Seção de projetos some |
| `sections.testimonials: false` | Editar config | Seção de depoimentos some |
| `sections.faq: false` | Editar config | Seção de FAQ some |
| `sections.contact: false` | Editar config | Seção de contato some |
| `sections.footer: false` | Editar config | Footer some |
| `sections.whatsapp: false` | Editar config | Botão WhatsApp some |
| `sections.calculator: false` | Editar config | Calculadora some |
| `sections.blog: false` | Editar config | Seção blog some |
| `sections.googleRating: false` | Editar config | Seção Google Rating some |
| `sections.clientLogos: false` | Editar config | Seção de logos some |

---

## 2. Marca (config.brand)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `brand.name` | Navbar, Footer, About | Nome atualiza em todos |
| `brand.slogan` | Footer | Slogan atualiza |

---

## 3. Cores (config.colors)
| Campo | Efeito |
|-------|--------|
| `colors.primary` | Cor de destaque (botões, links, badges) |
| `colors.foreground` | Cor do texto principal |
| `colors.background` | Cor de fundo da página |
| `colors.muted` | Cor de fundo de seções alternadas |
| `colors.border` | Cor das bordas e separadores |

**Teste:** Altere `colors.primary` de `#1F3A5F` para `#FF0000` e verifique se botões, badges e links ficam vermelhos.

---

## 4. Contato (config.contact)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `contact.phone` | Footer, Contact Form | Telefone atualiza |
| `contact.email` | Footer, Contact Form | Email atualiza |
| `contact.whatsapp` | WhatsApp button | Link do WhatsApp atualiza |
| `contact.address` | Footer | Endereço atualiza |
| `contact.hours.weekdays` | Footer | Horário atualiza |
| `contact.hours.saturday` | Footer | Horário atualiza |

---

## 5. WhatsApp (config.whatsapp)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `whatsapp.number` | WhatsApp button, Hero CTAs | Número atualiza em todos |
| `whatsapp.message` | WhatsApp button | Mensagem pré-preenchida atualiza |

---

## 6. Hero (config.hero)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `hero.badge` | Hero | Badge de destaque atualiza |
| `hero.headline` | Hero | Título principal atualiza |
| `hero.subheadline` | Hero | Subtítulo atualiza |
| `hero.stats` | Hero | Estatísticas atualizam |
| `hero.tags` | Hero | Tags de serviços atualizam |
| `hero.ctas` | Hero | Botões de ação atualizam |

---

## 7. Serviços (config.services)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `services[].icon` | Services | Ícone atualiza (Lucide icons) |
| `services[].code` | Services | Código do serviço atualiza |
| `services[].title` | Services | Título atualiza |
| `services[].description` | Services | Descrição atualiza |
| `services[].specs` | Services | Especificações atualizam |

---

## 8. Equipamentos (config.equipment)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `equipment[].icon` | Equipment | Ícone atualiza |
| `equipment[].model` | Equipment | Modelo atualiza |
| `equipment[].name` | Equipment | Nome atualiza |
| `equipment[].description` | Equipment | Descrição atualiza |
| `equipment[].specs` | Equipment | Especificações atualizam |

---

## 9. Diferenciais (config.differentials)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `differentials[].icon` | Differentials | Ícone atualiza |
| `differentials[].title` | Differentials | Título atualiza |
| `differentials[].description` | Differentials | Descrição atualiza |
| `differentials[].metric` | Differentials | Métrica atualiza |
| `differentials[].metricLabel` | Differentials | Label da métrica atualiza |

---

## 10. Sobre (config.about)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `about.engineer` | About | Nome do engenheiro atualiza |
| `about.creNumber` | About | CREA atualiza |
| `about.foundedYear` | About | Ano de fundação atualiza |
| `about.credentials` | About | Credenciais atualizam |
| `about.stats` | About | Estatísticas atualizam |
| `about.paragraphs` | About | Parágrafos atualizam |

---

## 11. Projetos (config.projects)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `projects[].title` | Projects | Título atualiza |
| `projects[].category` | Projects | Categoria atualiza |
| `projects[].location` | Projects | Localização atualiza |
| `projects[].area` | Projects | Área atualiza |
| `projects[].description` | Projects | Descrição atualiza |
| `projects[].tags` | Projects | Tags atualizam |

---

## 12. Depoimentos (config.testimonials)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `testimonials[].name` | Testimonials | Nome atualiza |
| `testimonials[].role` | Testimonials | Cargo atualiza |
| `testimonials[].company` | Testimonials | Empresa atualiza |
| `testimonials[].rating` | Testimonials | Estrelas atualizam |
| `testimonials[].text` | Testimonials | Texto atualiza |

---

## 13. Google Rating (config.googleRating)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `googleRating.rating` | GoogleRating | Nota atualiza |
| `googleRating.reviewCount` | GoogleRating | Contagem de avaliações atualiza |
| `googleRating.reviews` | GoogleRating | Depoimentos atualizam |

---

## 14. Blog (config.blog)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `blog[].category` | BlogPreview | Categoria atualiza |
| `blog[].categoryColor` | BlogPreview | Cor da categoria atualiza |
| `blog[].topColor` | BlogPreview | Cor de fundo atualiza |
| `blog[].title` | BlogPreview | Título atualiza |
| `blog[].excerpt` | BlogPreview | Resumo atualiza |
| `blog[].date` | BlogPreview | Data atualiza |
| `blog[].readTime` | BlogPreview | Tempo de leitura atualiza |

---

## 15. FAQ (config.faq)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `faq[].question` | FAQ | Pergunta atualiza |
| `faq[].answer` | FAQ | Resposta atualiza |

---

## 16. Calculadora (config.calculator)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `calculator.serviceOptions` | Calculator | Opções de serviço atualizam |
| `calculator.purposeOptions` | Calculator | Opções de finalidade atualizam |
| `calculator.pricing` | Calculator | Preços e prazos atualizam |

---

## 17. Client Logos (config.clientLogos)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `clientLogos.row1` | ClientLogos | Primeira fileira de logos atualiza |
| `clientLogos.row2` | ClientLogos | Segunda fileira de logos atualiza |

---

## 18. SEO (config.seo)
| Campo | Componente | Esperado |
|-------|------------|----------|
| `seo.title` | head (HTML) | Título da aba atualiza |
| `seo.description` | head (HTML) | Meta description atualiza |
| `seo.keywords` | head (HTML) | Keywords atualizam |

---

## Problemas Conhecidos

### ignoreBuildErrors
- `next.config.mjs` tem `ignoreBuildErrors: true`
- **Motivo:** Erros TS pré-existentes de resolução de módulos pnpm
- **Solução futura:** Remover incrementalmente após refatorar imports

### Cores de Marca
- `google-rating.tsx` usa cores da Google (#4285F4, #34A853, #FBBC05, #EA4335) — não são do tema
- `whatsapp-button.tsx` usa verde WhatsApp (#25D366) — não é do tema
- `blog-preview.tsx` usa cores de categoria específicas (configuráveis via `categoryColor`)

---

## Checklist Final

- [ ] Site carrega sem erros no console
- [ ] Todos os 18 componentes renderizam corretamente
- [ ] Mudar `brand.name` atualiza em navbar, footer e about
- [ ] Mudar `whatsapp.number` atualiza em todos os 7 locais
- [ ] Mudar `colors.primary` atualiza cor de destaque global
- [ ] Desabilitar seção remove componente da página
- [ ] Calculadora funciona com dados do config
- [ ] Links de navegação funcionam (âncoras)
- [ ] WhatsApp button abre conversa correta
- [ ] Site é responsivo (mobile, tablet, desktop)
