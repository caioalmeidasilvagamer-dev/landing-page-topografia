'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, MapPinned, Scan, Cpu, PackageCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Solicitação',
    description:
      'Análise da demanda, definição do escopo técnico, emissão de proposta comercial com especificações completas e prazo de execução.',
    detail: 'Proposta em até 24h',
  },
  {
    number: '02',
    icon: MapPinned,
    title: 'Visita Técnica',
    description:
      'Reconhecimento do terreno, avaliação de acesso, identificação de marcos geodésicos e planejamento logístico para o levantamento.',
    detail: 'Agendamento flexível',
  },
  {
    number: '03',
    icon: Scan,
    title: 'Levantamento',
    description:
      'Execução em campo com equipamentos GNSS e estação total. Coleta de pontos, coordenadas, cotas e dados planialtimétricos completos.',
    detail: 'Rastreamento em tempo real',
  },
  {
    number: '04',
    icon: Cpu,
    title: 'Processamento de Dados',
    description:
      'Processamento em software geodésico, ajustamento de redes, geração de modelos digitais e elaboração de relatórios técnicos conforme normas.',
    detail: 'Software Trimble Business Center',
  },
  {
    number: '05',
    icon: PackageCheck,
    title: 'Entrega Final',
    description:
      'Entrega dos arquivos DWG/DXF, memoriais descritivos, relatórios georeferenciados, ART/RRT e suporte técnico pós-entrega.',
    detail: 'Arquivos + ART inclusos',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 technical-grid opacity-20" />

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
              Processo / 03
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-lg text-balance"
            >
              Como executamos seu projeto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-sm text-muted-foreground max-w-xs leading-relaxed"
            >
              Processo estruturado em cinco etapas para garantir qualidade e rastreabilidade em cada projeto.
            </motion.p>
          </div>
        </div>

        {/* Timeline horizontal desktop / vertical mobile */}
        <div className="relative">
          {/* Linha conectora desktop */}
          <div className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px bg-border/50 z-0" />
          <motion.div
            className="hidden lg:block absolute top-[2.75rem] left-0 h-px bg-primary/50 z-0"
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex lg:flex-col gap-4 lg:gap-0"
                >
                  {/* Nó da timeline */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="size-11 flex items-center justify-center border-2 border-primary/50 rounded-full bg-background relative z-10">
                      <Icon className="size-4.5 text-primary" />
                    </div>
                    {/* Linha vertical mobile */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden w-px flex-1 bg-border/40 mt-2 ml-0 min-h-[2rem]" />
                    )}
                  </div>

                  {/* Conteúdo do passo */}
                  <div className="flex-1 lg:mt-6 pb-4 lg:pb-0">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 mb-1">
                      {step.number}
                    </div>
                    <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="size-1 rounded-full bg-primary/60 flex-shrink-0" />
                      <span className="font-mono text-[10px] text-primary/70">{step.detail}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
