'use client'

import { motion } from 'framer-motion'
import config from '@/site.config'

const VP = { once: true, amount: 0.05 } as const

function LogoTrack({ logos, direction }: { logos: string[]; direction: 'left' | 'right' }) {
  const duplicated = [...logos, ...logos, ...logos]
  const fromX = direction === 'left' ? 0 : -300
  const toX = direction === 'left' ? -300 : 0

  return (
    <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: [fromX, toX] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {duplicated.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="bg-white border border-border rounded-[6px] px-6 py-3 flex items-center justify-center shrink-0"
          >
            <span className="font-heading font-semibold text-sm text-muted-foreground whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function ClientLogos() {
  const cl = config.clientLogos

  return (
    <section className="relative py-20 lg:py-24 bg-muted/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              Clientes / 00
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
            Empresas que confiam na nossa precisão
          </h2>
          <p className="font-sans text-sm text-muted-foreground max-w-lg mx-auto">
            Do agronegócio à construção civil, atendemos os maiores projetos do Brasil
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <LogoTrack logos={cl.row1} direction="left" />
          <LogoTrack logos={cl.row2} direction="right" />
        </div>
      </div>
    </section>
  )
}
