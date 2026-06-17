# Topografia LP — Template

Landing page config-driven para empresas de topografia e georreferenciamento. Um único arquivo `site.config.ts` customiza toda a landing page — cores, textos, serviços, preços, WhatsApp, SEO — sem alterar componentes.

## Como Funciona

Edite `site.config.ts` no root do projeto. Todos os 18 componentes leem desse arquivo:

```ts
// site.config.ts
const config = SiteConfigSchema.parse({
  brand: {
    name: 'Sua Empresa',
    slogan: 'Topografia & Georreferenciamento',
  },
  colors: {
    primary: '#1F3A5F',    // Cor de destaque
    foreground: '#1A2332', // Cor do texto
    background: '#F8FAFC', // Cor de fundo
  },
  contact: {
    phone: '+55 (11) 99999-9999',
    email: 'contato@empresa.com',
    whatsapp: '5511999999999',
  },
  // ... todas as 23 seções
})
```

## Início Rápido

```bash
# 1. Instale dependências
pnpm install

# 2. Inicie o dev server
pnpm dev

# 3. Acesse
# http://localhost:3000
```

## Estrutura do Config

O `site.config.ts` tem 23 seções:

| Seção | O que controla |
|-------|---------------|
| `sections` | Habilita/desabilita cada componente (true/false) |
| `brand` | Nome da empresa, slogan, logo |
| `colors` | 10 tokens de cores (primary, foreground, background, etc.) |
| `contact` | Telefone, email, WhatsApp, endereço, horários |
| `social` | Instagram, LinkedIn |
| `seo` | Título, descrição, keywords (aparece no `<head>` e Schema.org) |
| `hero` | Badge, headline, subtítulo, estatísticas, tags, CTAs |
| `services` | Array de serviços com ícone, código, título, descrição, specs |
| `equipment` | Array de equipamentos com modelo, nome, especificações |
| `differentials` | Array de diferenciais com métricas |
| `about` | Engenheiro, CREA, ano fundação, credenciais, bio |
| `projects` | Array de projetos com título, categoria, local, área, tags |
| `testimonials` | Array de depoimentos com nome, empresa, rating, texto |
| `clientLogos` | Duas fileiras de nomes de clientes |
| `googleRating` | Nota, contagem de avaliações, reviews |
| `faq` | Array de perguntas e respostas |
| `process` | Etapas do processo com número, ícone, descrição |
| `coverage` | 27 estados brasileiros com status atendido/não atendido |
| `calculator` | Opções de serviço, finalidade, preços por hectare |
| `blog` | Artigos com categoria, cor, título, resumo, data |
| `whatsapp` | Número e mensagem pré-preenchida |
| `navLinks` | Links de navegação do menu |
| `footerLinks` | Links do footer |

## Seções

Para desabilitar uma seção, defina como `false`:

```ts
sections: {
  hero: true,
  services: true,
  calculator: false,  // Calculadora não aparecerá na página
  blog: false,        // Blog não aparecerá na página
  // ...
}
```

## Validação

O config usa **Zod** para validação. Se houver erro no config, você receberá uma mensagem clara no terminal:

```bash
# Erro de validação example:
# Error: Invalid input at "contact.phone": Expected string, received undefined
```

## Checklist de Customização

Antes de publicar, verifique:

- [ ] `brand.name` atualiza em navbar, footer e about
- [ ] `whatsapp.number` atualiza em todos os 7 componentes
- [ ] `colors.primary` atualiza cor de destaque global
- [ ] `seo.title` e `seo.description` aparecem no `<head>`
- [ ] Schema.org usa dados do config
- [ ] Calculadora funciona com os preços definidos
- [ ] Links de navegação (âncoras) funcionam
- [ ] WhatsApp button abre conversa correta
- [ ] Site é responsivo (mobile, tablet, desktop)

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Validação:** Zod
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Fonte:** IBM Plex Sans

## Deploy

### Vercel (recomendado)

```bash
# Conecte o repositório ao Vercel
# Deploy automático a cada push no main
```

### Outros

```bash
pnpm build
pnpm start
```

## Licença

Uso pessoal — template para customização.
