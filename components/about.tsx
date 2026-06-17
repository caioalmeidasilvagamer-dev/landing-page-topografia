'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Award, Users, ArrowRight } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

const credentials = [
  {
    icon: ShieldCheck,
    title: 'Eng. Responsável',
    name: 'Eng. Rafael Moreira Costa',
    detail: 'CREA-SP 123.456/D · Cartógrafo',
  },
  {
    icon: Award,
    title: 'Registro Profissional',
    name: 'CREA/SP · INCRA habilitado',
    detail: 'Execução própria — sem terceirização',
  },
  {
    icon: Users,
    title: 'Equipe Técnica',
    name: '18 profissionais ativos',
    detail: 'Engenheiros, agrimensores e operadores certificados',
  },
]

const stats = [
  { value: '+850', label: 'projetos' },
  { value: '+15', label: 'anos' },
  { value: '18', label: 'profissionais' },
  { value: '12', label: 'estados' },
]

export function About() {
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: 'rgba(237,241,247,0.50)' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              Sobre / 03A
            </span>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2.5 w-fit">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 rounded-[6px] bg-primary/5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  Fundada em 2009 · 15 anos de mercado
                </span>
              </div>
            </div>

            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground leading-tight">
              Engenharia de precisão com responsabilidade técnica
            </h2>

            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              A GeoTech Topografia nasceu da experiência de engenheiros cartógrafos com passagem por grandes obras de infraestrutura no Brasil. Ao longo de 15 anos, construímos uma metodologia que combina tecnologia de ponta com rigor normativo.
            </p>

            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Cada projeto é assinado por profissional habilitado no CREA, com emissão de ART, documentação completa e suporte técnico pós-entrega. Não terceirizamos levantamentos — toda a execução é feita pela nossa equipe própria.
            </p>

            <div>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-border/60 text-foreground font-sans font-medium text-sm rounded-[6px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                Falar com o engenheiro responsável
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {credentials.map((cred) => {
              const Icon = cred.icon
              return (
                <div
                  key={cred.title}
                  className="bg-white border border-border p-5 flex gap-4"
                  style={{ borderRadius: '8px', borderLeft: '3px solid #1F3A5F' }}
                >
                  <div
                    className="size-10 flex items-center justify-center border border-primary/15 shrink-0"
                    style={{ borderRadius: '6px', backgroundColor: '#EDF1F7' }}
                  >
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/50 mb-1">
                      {cred.title}
                    </div>
                    <div className="font-heading font-semibold text-sm text-foreground">
                      {cred.name}
                    </div>
                    <div className="font-sans text-xs text-muted-foreground mt-1">
                      {cred.detail}
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center py-3 bg-white border border-border" style={{ borderRadius: '6px' }}>
                  <div className="font-heading font-semibold text-xl text-primary">{stat.value}</div>
                  <div className="font-sans text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
