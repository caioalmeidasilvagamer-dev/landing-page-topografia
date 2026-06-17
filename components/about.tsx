'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import config from '@/site.config'
import { getIcon } from '@/lib/icons'

const VP = { once: true, amount: 0.05 } as const

export function About() {
  const a = config.about

  return (
    <section className="relative py-24 lg:py-32 bg-muted/50">
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
                  Fundada em {a.foundedYear} · {a.experienceText}
                </span>
              </div>
            </div>

            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground leading-tight">
              {a.headline}
            </h2>

            {a.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}

            <div>
              <a
                href={`https://wa.me/${config.contact.whatsapp}`}
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
            {a.credentials.map((cred) => {
              const Icon = getIcon(cred.icon)
              return (
                <div
                  key={cred.title}
                  className="bg-white border border-border p-5 flex gap-4 rounded-lg border-l-[3px] border-l-primary"
                >
                  <div className="size-10 flex items-center justify-center border border-primary/15 shrink-0 rounded-[6px] bg-muted">
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
              {a.stats.map((stat) => (
                <div key={stat.label} className="text-center py-3 bg-white border border-border rounded-[6px]">
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
