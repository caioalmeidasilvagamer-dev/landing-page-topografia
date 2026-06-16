'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown, Target, Layers, FileText, Home } from 'lucide-react'
import { TopoBackground } from './topo-background'

const Brazil3D = dynamic(
  () => import('./brazil-3d').then((m) => ({ default: m.Brazil3D })),
  { ssr: false, loading: () => <Brazil3DLoader /> }
)

function Brazil3DLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[480px]">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50" />
        <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Carregando modelo 3D…
        </span>
      </div>
    </div>
  )
}

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

const services = [
  { icon: Target, label: 'Levantamentos Topográficos' },
  { icon: Layers, label: 'Georreferenciamento' },
  { icon: Home, label: 'Locação de Obras' },
  { icon: FileText, label: 'Regularização Fundiária' },
]

const stats = [
  { value: 850, suffix: '+', label: 'Projetos Realizados' },
  { value: 15, suffix: ' anos', label: 'De Experiência' },
  { value: 620, suffix: '+', label: 'Clientes Atendidos' },
]

export function Hero() {
  const scrollToContact = () => {
    const el = document.querySelector('#contato')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <TopoBackground showGrid showCoords />

      {/* Vinheta escura nas bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, oklch(0.165 0.03 230 / 0.5) 80%, oklch(0.165 0.03 230) 100%)',
        }}
      />

      {/* Divisor vertical técnico */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20 hidden lg:block" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Coluna de texto */}
          <div className="flex flex-col gap-8">
            {/* Badge técnico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 w-fit"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 rounded-[6px] bg-primary/5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  Precisão GNSS Certificada
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight text-balance">
                Precisão em{' '}
                <span className="text-primary">Topografia</span>
                <br />
                para Seu Projeto
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base text-muted-foreground leading-relaxed max-w-[480px]"
            >
              Soluções completas em levantamento topográfico, georreferenciamento,
              locação de obras e regularização fundiária — com equipamentos GNSS de
              alta precisão e conformidade com normas técnicas.
            </motion.p>

            {/* Tags de serviços */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {services.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border/60 rounded-[6px] text-sm text-muted-foreground"
                >
                  <Icon className="size-3.5 text-primary flex-shrink-0" />
                  <span className="font-sans text-xs">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={scrollToContact}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans font-medium text-sm rounded-[6px] hover:bg-primary/90 transition-all duration-200"
              >
                Solicitar Orçamento
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border/60 text-foreground font-sans font-medium text-sm rounded-[6px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                <MessageCircle className="size-4 text-primary" />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Coluna do modelo 3D */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Label técnico flutuante */}
            <div className="absolute top-0 left-0 z-10 flex items-center gap-2 px-2.5 py-1 bg-card/70 backdrop-blur-sm border border-border/40 rounded-[6px]">
              <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.18em] text-primary/80 uppercase">
                Modelo Topográfico 3D
              </span>
            </div>

            {/* Coordenadas técnicas */}
            <div className="absolute bottom-4 right-0 z-10 text-right">
              <div className="font-mono text-[9px] text-muted-foreground/40 leading-relaxed">
                <div>LAT -15.7801° S</div>
                <div>LON -47.9292° W</div>
                <div>ALT 1172m AMSL</div>
              </div>
            </div>

            {/* Escala */}
            <div className="absolute bottom-4 left-0 z-10 flex items-center gap-1.5">
              <div className="w-12 h-px bg-muted-foreground/30" />
              <span className="font-mono text-[9px] text-muted-foreground/40">500km</span>
            </div>

            {/* Canvas 3D – sem borda, sem fundo próprio */}
            <div className="w-full" style={{ height: 520 }}>
              <Brazil3D />
            </div>

            {/* Stats abaixo do modelo */}
            <div className="w-full mt-1 grid grid-cols-3 divide-x divide-border/30 border border-border/30 rounded-[6px] bg-card/40 backdrop-blur-sm">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="px-4 py-3 flex flex-col gap-0.5">
                  <div className="font-heading font-semibold text-2xl text-foreground tabular-nums">
                    <CountUp end={value} suffix={suffix} />
                  </div>
                  <div className="font-sans text-[11px] text-muted-foreground leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
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
    </section>
  )
}
