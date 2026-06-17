'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import config from '@/site.config'
import { getIcon } from '@/lib/icons'

const VP = { once: true, amount: 0.05 } as const

function ServiceCard({ service, index }: { service: typeof config.services[number]; index: number }) {
  const Icon = getIcon(service.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative bg-white border border-border hover:border-primary/40 transition-all duration-200 overflow-hidden rounded-lg"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 flex items-center justify-center border border-primary/15 group-hover:border-primary/30 transition-colors rounded-[6px] bg-muted">
              <Icon className="size-5 text-primary" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/50">
              {service.code}
            </span>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground/25 group-hover:text-primary/50 transition-colors" />
        </div>

        <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
          {service.title}
        </h3>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        <div className="pt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-secondary">
          {service.specs.map((spec) => (
            <div key={spec} className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-primary/50" />
              <span className="font-mono text-[10px] text-muted-foreground/70">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32 bg-background/50">

      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent, rgba(248,250,252,0.50))',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

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
              Serviços / 01
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
              Soluções técnicas para cada demanda de campo
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Desde o levantamento inicial até a entrega dos documentos finais,
              cobrimos todas as etapas do processo topográfico e geodésico.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, index) => (
            <ServiceCard key={service.code} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
