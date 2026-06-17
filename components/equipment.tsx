'use client'

import { motion } from 'framer-motion'
import { Satellite, ScanLine, Plane, Waves } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

const equipment = [
  {
    icon: Satellite,
    model: 'GNSS RTK Geodésico',
    name: 'Trimble R12i / Leica GS18 T',
    description:
      'Receptor com rastreamento L1/L2/L5 em todas as constelações GNSS. Precisão horizontal ±3mm + 0.5ppm.',
    specs: ['Precisão ±3mm + 0.5ppm', 'Constelações GPS/GLONASS/Galileo/BeiDou', 'Correção RTK e PPP'],
  },
  {
    icon: ScanLine,
    model: 'Estação Total Robotizada',
    name: 'Leica TS16 / Topcon GT-1200',
    description:
      'Medição angular e distância com alcance de 3.500m sem prisma e precisão angular de 1″.',
    specs: ['Alcance 3.500m sem prisma', 'Precisão angular 1″', 'Rastreamento automático de prisma'],
  },
  {
    icon: Plane,
    model: 'VANT Aerofotogramétrico',
    name: 'DJI Matrice 350 RTK + Zenmuse P1',
    description:
      'Câmera 45MP full-frame, homologada ANAC. GSD de 3cm a 120m de altitude.',
    specs: ['Câmera 45MP full-frame', 'GSD 3cm a 120m', 'ANAC homologado SARP'],
  },
  {
    icon: Waves,
    model: 'Laser Scanner 3D',
    name: 'Leica RTC360',
    description:
      'Varredura 3D de alta velocidade (2 milhões pontos/seg), alcance 130m, ideal para plantas industriais.',
    specs: ['2M pontos por segundo', 'Alcance 130m', 'Precisão 3D ±1.9mm'],
  },
]

const manufacturers = ['Trimble', 'Leica Geosystems', 'DJI', 'Topcon', 'Agisoft', 'Autodesk']

export function Equipment() {
  return (
    <section className="relative py-24 lg:py-32 bg-background/50">
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
              Equipamentos / 02A
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
              Tecnologia de ponta em cada projeto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Equipamentos calibrados e certificados pelos fabricantes, garantindo rastreabilidade total dos dados
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipment.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.model}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, delay: index * 0.09 }}
                className="group relative bg-white border border-border hover:border-primary/40 transition-all duration-200 overflow-hidden rounded-lg"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="size-12 flex items-center justify-center border border-primary/15 shrink-0 rounded-lg bg-muted">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/50 mb-1">
                        {item.model}
                      </div>
                      <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-secondary">
                    {item.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-1.5">
                        <div className="size-1 rounded-full bg-primary/50" />
                        <span className="font-mono text-[10px] text-muted-foreground/70">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {manufacturers.map((m, i) => (
            <span key={m} className="font-mono text-xs text-muted-foreground/50">
              {i > 0 && <span className="mr-6">·</span>}
              {m}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
