'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Crosshair, Users, MapPin, Clock, ShieldCheck } from 'lucide-react'
import { TopoBackground } from './topo-background'

const differentials = [
  {
    icon: Crosshair,
    title: 'Equipamentos de Alta Precisão',
    description:
      'Receptores GNSS geodésicos Trimble e Leica, estações totais robotizadas e drones aerofotogramétricos DJI com câmeras métricas. Tecnologia de ponta para resultados confiáveis.',
    metric: '±5mm',
    metricLabel: 'Precisão posicional',
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description:
      'Engenheiros cartógrafos, agrimensores e técnicos em georreferenciamento com registro ativo no CREA/CONFEA, especializados nos mais rigorosos padrões normativos.',
    metric: '18+',
    metricLabel: 'Profissionais certificados',
  },
  {
    icon: MapPin,
    title: 'Atendimento Regional',
    description:
      'Cobertura nos estados do Sudeste, Centro-Oeste e Sul do Brasil. Mobilização rápida para qualquer município com logística otimizada para reduzir custos operacionais.',
    metric: '12',
    metricLabel: 'Estados atendidos',
  },
  {
    icon: Clock,
    title: 'Entrega Ágil',
    description:
      'Processamento interno com software GIS e CAD profissional. Relatórios técnicos e arquivos georreferenciados entregues no menor prazo do mercado, sem abrir mão da precisão.',
    metric: '5 dias',
    metricLabel: 'Prazo médio de entrega',
  },
  {
    icon: ShieldCheck,
    title: 'Conformidade Técnica',
    description:
      'Todos os trabalhos seguem as normas NBR 13.133, INCRA 572, e demais especificações técnicas do IBGE e órgãos reguladores. Laudos e ARTs em conformidade total.',
    metric: '100%',
    metricLabel: 'Conformidade normativa',
  },
]

export function Differentials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="diferenciais" className="relative py-24 lg:py-32 overflow-hidden">
      <TopoBackground showGrid={false} density="low" />
      <div className="absolute inset-0 bg-muted/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              Diferenciais / 02
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-xl text-balance"
          >
            Por que escolher a GeoTech?
          </motion.h2>
        </div>

        {/* Layout assimétrico: destaque grande + grid */}
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Card destaque principal */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 border border-border/50 rounded-[8px] bg-card relative overflow-hidden flex flex-col"
          >
            {/* Detalhe de fundo SVG interno */}
            <svg
              className="absolute inset-0 w-full h-full opacity-5"
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <g stroke="oklch(0.62 0.10 210)" fill="none" strokeWidth="1">
                <path d="M0,100 C80,60 180,120 280,80 C360,48 420,100 480,70" />
                <path d="M0,160 C90,115 200,175 310,130 C390,97 450,150 480,125" />
                <path d="M0,225 C100,172 220,235 340,185 C420,152 465,205 480,182" />
                <path d="M0,295 C110,235 240,298 372,242 C448,210 472,262 480,242" />
                <path d="M0,368 C120,300 260,365 400,302 C456,270 475,322 480,305" />
                <path d="M0,445 C130,370 280,438 428,365 C470,334 480,385 480,370" />
              </g>
            </svg>

            <div className="relative z-10 p-8 flex flex-col gap-6 flex-1">
              {/* Icon grande */}
              <div className="size-14 flex items-center justify-center border border-primary/30 rounded-[8px] bg-primary/5">
                <Crosshair className="size-7 text-primary" />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Equipamentos de Alta Precisão
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Receptores GNSS geodésicos Trimble e Leica, estações totais
                  robotizadas e drones aerofotogramétricos DJI com câmeras métricas.
                  Tecnologia de ponta para resultados confiáveis e rastreáveis.
                </p>
              </div>

              {/* Métricas inline */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                <div>
                  <div className="font-heading font-semibold text-3xl text-primary">±5mm</div>
                  <div className="font-sans text-xs text-muted-foreground mt-1">Precisão posicional</div>
                </div>
                <div>
                  <div className="font-heading font-semibold text-3xl text-primary">L1/L2</div>
                  <div className="font-sans text-xs text-muted-foreground mt-1">Frequência GNSS</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid 2x2 dos outros diferenciais */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {differentials.slice(1).map((diff, index) => {
              const Icon = diff.icon
              return (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  className="border border-border/50 rounded-[8px] bg-card p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-8 flex items-center justify-center border border-primary/20 rounded-[6px] bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-semibold text-lg text-primary leading-none">
                        {diff.metric}
                      </div>
                      <div className="font-mono text-[9px] text-muted-foreground/60 mt-0.5">
                        {diff.metricLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                    {diff.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {diff.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
