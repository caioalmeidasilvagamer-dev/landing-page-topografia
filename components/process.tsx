'use client'

import { motion } from 'framer-motion'
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
    title: 'Processamento',
    description:
      'Processamento em software geodésico, ajustamento de redes, geração de modelos digitais e elaboração de relatórios técnicos conforme normas.',
    detail: 'Trimble Business Center',
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

const VP = { once: true, amount: 0.05 } as const

export function Process() {
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: 'rgba(248,250,252,0.40)' }}>

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
              Processo / 03
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-lg text-balance"
            >
              Como executamos seu projeto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-xs leading-relaxed"
            >
              Processo estruturado em cinco etapas para garantir qualidade e rastreabilidade em cada projeto.
            </motion.p>
          </div>
        </div>

        <div className="relative">
          {/* Linha de fundo — sempre visível */}
          <div
            className="hidden lg:block absolute top-[1.4rem] left-0 right-0 h-px z-0"
            style={{ backgroundColor: '#D0DAEA' }}
          />
          {/* Linha de progresso animada */}
          <motion.div
            className="hidden lg:block absolute top-[1.4rem] left-0 h-px z-0"
            style={{ backgroundColor: '#1F3A5F' }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={VP}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.09 }}
                  className="flex lg:flex-col gap-4 lg:gap-0"
                >
                  <div className="flex flex-col items-center lg:items-start">
                    <div
                      className="size-11 flex items-center justify-center bg-white relative z-10"
                      style={{ border: '2px solid #1F3A5F', borderRadius: '50%' }}
                    >
                      <Icon className="size-[18px] text-primary" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="lg:hidden w-px flex-1 mt-2 min-h-[2rem]" style={{ backgroundColor: '#1F3A5F' }} />
                    )}
                  </div>

                  <div className="flex-1 lg:mt-6 pb-4 lg:pb-0">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/45 mb-1">
                      {step.number}
                    </div>
                    <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="size-1 rounded-full bg-primary/50 flex-shrink-0" />
                      <span className="font-mono text-[10px] text-primary/65">{step.detail}</span>
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
