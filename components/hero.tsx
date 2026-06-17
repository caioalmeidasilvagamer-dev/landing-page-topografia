'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import { TopoBackground } from './topo-background'
import config from '@/site.config'
import { getIcon } from '@/lib/icons'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

function CountUp({ end, suffix = '', duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function Hero() {
  const h = config.hero

  const scrollToContact = () => {
    const el = document.querySelector('#contato')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCta = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <TopoBackground showGrid showCoords backgroundImageUrl="/images/mapa-topo-bg.jpeg" backgroundImageUrlMobile="/images/mapa-topo-bg-mobile.jpeg" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 30%, rgba(248, 250, 252, 0.15) 75%, var(--background) 100%)',
        }}
      />

      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20 hidden lg:block" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 w-fit"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 rounded-[6px] bg-primary/5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  {h.badge}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight text-balance">
                {h.headline}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base text-muted-foreground leading-relaxed max-w-[480px]"
            >
              {h.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {h.tags.map((tag) => {
                const Icon = getIcon(tag.icon)
                return (
                  <div
                    key={tag.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border/60 rounded-[6px] text-sm text-muted-foreground"
                  >
                    <Icon className="size-3.5 text-primary flex-shrink-0" />
                    <span className="font-sans text-xs">{tag.label}</span>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {h.ctas.map((cta, i) => (
                i === 0 ? (
                  <button
                    key={cta.label}
                    onClick={() => handleCta(cta.href)}
                    className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans font-medium text-sm rounded-[6px] hover:bg-primary/90 transition-all duration-200"
                  >
                    {cta.label}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-border/60 text-foreground font-sans font-medium text-sm rounded-[6px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    <MessageCircle className="size-4 text-primary" />
                    {cta.label}
                  </a>
                )
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6 items-center lg:items-stretch"
          >
            <div className="relative border border-border/40 rounded-[8px] bg-card/60 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary/60" />
                  <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                    Dados Técnicos
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  v2.4.1
                </span>
              </div>

              <div className="p-5 grid grid-cols-3 divide-x divide-border/30">
                {h.stats.map((stat) => (
                  <div key={stat.label} className="px-4 first:pl-0 last:pr-0 flex flex-col gap-1">
                    <div className="font-heading font-semibold text-3xl lg:text-4xl text-foreground tabular-nums">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="font-sans text-xs text-muted-foreground leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-4 pt-2 border-t border-border/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground/70">Precisão posicional</span>
                  <span className="font-mono text-[10px] text-primary">±5mm</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '96%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] text-muted-foreground/70">Cobertura regional</span>
                  <span className="font-mono text-[10px] text-primary">12 estados</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden mt-1.5">
                  <motion.div
                    className="h-full bg-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {h.certifications.map((cert) => (
                <div
                  key={cert.code}
                  className="petroleum-accent pl-3 py-2"
                >
                  <div className="font-mono text-xs text-primary font-medium">{cert.code}</div>
                  <div className="font-sans text-[11px] text-muted-foreground mt-0.5">{cert.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            Conheça nossos serviços
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-4 text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
    </section>
  )
}
