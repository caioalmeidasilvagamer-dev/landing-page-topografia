/**
 * Single source of truth for all site configuration types.
 *
 * Each section schema validates its data shape independently.
 * The top-level SiteConfigSchema composes all sections.
 *
 * Usage:
 *   import { SiteConfig, SiteConfigSchema } from '@/lib/config-types'
 *   const config = SiteConfigSchema.parse(rawData)
 */
import { z } from 'zod'
import { iconNames } from './icons'

// ─── Section Toggles ──────────────────────────────────────────────────────────

export const SectionsSchema = z.object({
  navbar: z.boolean().default(true),
  hero: z.boolean().default(true),
  clientLogos: z.boolean().default(true),
  services: z.boolean().default(true),
  equipment: z.boolean().default(true),
  differentials: z.boolean().default(true),
  about: z.boolean().default(true),
  coverage: z.boolean().default(true),
  process: z.boolean().default(true),
  projects: z.boolean().default(true),
  googleRating: z.boolean().default(true),
  testimonials: z.boolean().default(true),
  blog: z.boolean().default(true),
  calculator: z.boolean().default(true),
  faq: z.boolean().default(true),
  contact: z.boolean().default(true),
  footer: z.boolean().default(true),
  whatsapp: z.boolean().default(true),
})

// ─── Brand ────────────────────────────────────────────────────────────────────

export const BrandSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().optional(),
  logoUrl: z.string().url().optional(),
  logoAlt: z.string().optional(),
})

// ─── Contact ──────────────────────────────────────────────────────────────────

export const ContactSchema = z.object({
  phone: z.string().min(10),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  address: z.string().min(1),
  hours: z.object({
    weekdays: z.string().default('08h às 18h'),
    saturday: z.string().optional(),
  }),
  coverageRegions: z.array(z.string()).optional().default([
    'São Paulo (SP)',
    'Campinas (SP)',
    'Sorocaba (SP)',
    'Santos (SP)',
    'Jundiaí (SP)',
    'Interior de SP',
  ]),
})

// ─── Social ───────────────────────────────────────────────────────────────────

export const SocialSchema = z.object({
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
})

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string()),
  ogImage: z.string().url().optional(),
})

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const HeroStatSchema = z.object({
  value: z.number(),
  suffix: z.string(),
  label: z.string(),
})

export const HeroTagSchema = z.object({
  icon: z.string().min(1),
  label: z.string(),
})

export const HeroCtaSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const HeroCertificationSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
})

export const HeroSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  stats: z.array(HeroStatSchema),
  tags: z.array(HeroTagSchema),
  ctas: z.array(HeroCtaSchema),
  certifications: z.array(HeroCertificationSchema).optional().default([]),
})

// ─── Services ─────────────────────────────────────────────────────────────────

export const ServiceSchema = z.object({
  icon: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  specs: z.array(z.string()),
})

export const ServicesConfigSchema = z.object({
  headline: z.string().optional().default('Soluções Completas para seu Projeto'),
  description: z.string().optional().default('Do levantamento ao projeto final, oferecemos serviços integrados de topografia e engenharia com tecnologia de ponta.'),
  items: z.array(ServiceSchema),
})

// ─── Equipment ────────────────────────────────────────────────────────────────

export const EquipmentSchema = z.object({
  icon: z.string().min(1),
  model: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  specs: z.array(z.string()),
})

// ─── Differentials ────────────────────────────────────────────────────────────

export const DifferentialSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metric: z.string(),
  metricLabel: z.string(),
})

// ─── About ────────────────────────────────────────────────────────────────────

export const CredentialSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  name: z.string().min(1),
  detail: z.string().min(1),
})

export const AboutStatSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const AboutSchema = z.object({
  headline: z.string().optional().default('Engenharia de precisão com foco no seu projeto'),
  engineer: z.string().min(1),
  creNumber: z.string().min(1),
  foundedYear: z.string().min(1),
  experienceText: z.string().min(1),
  credentials: z.array(CredentialSchema),
  stats: z.array(AboutStatSchema),
  paragraphs: z.array(z.string()),
})

// ─── Projects ─────────────────────────────────────────────────────────────────

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  area: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  tags: z.array(z.string()),
})

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TestimonialSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  rating: z.number().min(1).max(5),
  text: z.string().min(1),
  location: z.string().min(1),
  project: z.string().min(1),
})

// ─── Client Logos ─────────────────────────────────────────────────────────────

export const ClientLogosSchema = z.object({
  row1: z.array(z.string()),
  row2: z.array(z.string()),
})

// ─── Google Rating ────────────────────────────────────────────────────────────

export const GoogleReviewSchema = z.object({
  name: z.string().min(1),
  initial: z.string().min(1).max(1),
  text: z.string().min(1),
})

export const GoogleRatingSchema = z.object({
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  reviews: z.array(GoogleReviewSchema),
})

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FaqSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
})

export const FaqConfigSchema = z.object({
  headline: z.string().optional().default('Perguntas Frequentes'),
  certifications: z.array(z.string()).optional().default([
    'NBR 13.133',
    'ABNT NBR 13.133',
    'INCRA',
    'ISO 9001',
    'CREA/CAU',
  ]),
  items: z.array(FaqSchema),
})

// ─── Process ──────────────────────────────────────────────────────────────────

export const ProcessStepSchema = z.object({
  number: z.string().min(1),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  detail: z.string().min(1),
})

// ─── Coverage ─────────────────────────────────────────────────────────────────

export const CoverageStateSchema = z.object({
  abbr: z.string().min(2).max(2),
  name: z.string().min(1),
  served: z.boolean(),
})

// ─── Calculator ───────────────────────────────────────────────────────────────

export const CalculatorPricingSchema = z.object({
  pricePerHa: z.number().min(0),
  minDays: z.number().min(1),
  maxDays: z.number().min(1),
  equipment: z.string().min(1),
  fixedPrice: z.number().optional(),
})

export const CalculatorSchema = z.object({
  serviceOptions: z.array(z.string()),
  purposeOptions: z.array(z.string()),
  pricing: z.record(z.string(), CalculatorPricingSchema),
})

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const BlogArticleSchema = z.object({
  category: z.string().min(1),
  categoryColor: z.string().min(1),
  topColor: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  date: z.string().min(1),
  readTime: z.string().min(1),
})

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

export const WhatsappSchema = z.object({
  number: z.string().min(10),
  message: z.string().min(1),
})

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FooterLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

export const FooterCertificationSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
})

export const FooterConfigSchema = z.object({
  description: z.string().optional().default('Soluções completas em topografia e engenharia. Tecnologia de precisão para projetos de qualquer escala.'),
  certifications: z.array(FooterCertificationSchema).optional().default([]),
})

// ─── Top-Level Config ─────────────────────────────────────────────────────────

export const ColorsSchema = z.object({
  primary: z.string().min(1),
  foreground: z.string().min(1),
  background: z.string().min(1),
  muted: z.string().min(1),
  secondary: z.string().min(1),
  destructive: z.string().min(1),
  border: z.string().min(1),
  topoLine: z.string().min(1),
  topoAccent: z.string().min(1),
  backgroundAlt: z.string().min(1),
})

export const SiteConfigSchema = z.object({
  sections: SectionsSchema,
  brand: BrandSchema,
  colors: ColorsSchema,
  contact: ContactSchema,
  social: SocialSchema,
  seo: SeoSchema,
  hero: HeroSchema,
  services: ServicesConfigSchema,
  equipment: z.array(EquipmentSchema),
  differentials: z.array(DifferentialSchema),
  about: AboutSchema,
  projects: z.array(ProjectSchema),
  testimonials: z.array(TestimonialSchema),
  clientLogos: ClientLogosSchema,
  googleRating: GoogleRatingSchema,
  faq: FaqConfigSchema,
  process: z.array(ProcessStepSchema),
  coverage: z.array(CoverageStateSchema),
  calculator: CalculatorSchema,
  blog: z.array(BlogArticleSchema),
  whatsapp: WhatsappSchema,
  navLinks: z.array(NavLinkSchema),
  footer: FooterConfigSchema,
  footerLinks: z.array(FooterLinkSchema),
  footerServices: z.array(z.string()),
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>
export type Sections = z.infer<typeof SectionsSchema>
export type Brand = z.infer<typeof BrandSchema>
export type Colors = z.infer<typeof ColorsSchema>
export type Contact = z.infer<typeof ContactSchema>
export type Social = z.infer<typeof SocialSchema>
export type Seo = z.infer<typeof SeoSchema>
export type Hero = z.infer<typeof HeroSchema>
export type HeroCertification = z.infer<typeof HeroCertificationSchema>
export type Service = z.infer<typeof ServiceSchema>
export type ServicesConfig = z.infer<typeof ServicesConfigSchema>
export type Equipment = z.infer<typeof EquipmentSchema>
export type Differential = z.infer<typeof DifferentialSchema>
export type About = z.infer<typeof AboutSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Testimonial = z.infer<typeof TestimonialSchema>
export type ClientLogos = z.infer<typeof ClientLogosSchema>
export type GoogleRating = z.infer<typeof GoogleRatingSchema>
export type Faq = z.infer<typeof FaqSchema>
export type FaqConfig = z.infer<typeof FaqConfigSchema>
export type ProcessStep = z.infer<typeof ProcessStepSchema>
export type CoverageState = z.infer<typeof CoverageStateSchema>
export type Calculator = z.infer<typeof CalculatorSchema>
export type BlogArticle = z.infer<typeof BlogArticleSchema>
export type Whatsapp = z.infer<typeof WhatsappSchema>
export type NavLink = z.infer<typeof NavLinkSchema>
export type FooterLink = z.infer<typeof FooterLinkSchema>
export type FooterConfig = z.infer<typeof FooterConfigSchema>
