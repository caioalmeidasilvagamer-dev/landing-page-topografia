'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown, Target, Layers, FileText, Home } from 'lucide-react'
import { TopoBackground } from './topo-background'

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
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#1A2332' }}
    >
      {/* Curvas de nível topográficas sobre fundo escuro */}
      <TopoBackground showGrid showCoords variant="dark" />

      {/* Vinheta sutil nas bordas — muito leve, apenas para direcionar o olhar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(26,35,50,0.35) 80%, rgba(26,35,50,0.65) 100%)',
        }}
      />

      {/* Linha técnica vertical central */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" style={{ backgroundColor: 'rgba(49,93,138,0.18)' }} />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Coluna de texto */}
          <div className="flex flex-col gap-8">
            {/* Badge técnico */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 w-fit"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-[6px]"
                style={{
                  border: '1px solid rgba(49,93,138,0.5)',
                  backgroundColor: 'rgba(49,93,138,0.12)',
                }}
              >
                <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4A7FA8' }} />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7DB3D4' }}>
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
              <h1
                className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-balance"
                style={{ color: '#F0F4F8' }}
              >
                Precisão em{' '}
                <span style={{ color: '#7DB3D4' }}>Topografia</span>
                <br />
                para Seu Projeto
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base leading-relaxed max-w-[480px]"
              style={{ color: 'rgba(176,196,214,0.85)' }}
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                  style={{
                    border: '1px solid rgba(49,93,138,0.4)',
                    backgroundColor: 'rgba(31,58,95,0.25)',
                    borderRadius: '6px',
                    color: 'rgba(176,196,214,0.9)',
                  }}
                >
                  <Icon className="size-3.5 flex-shrink-0" style={{ color: '#7DB3D4' }} />
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
                className="group flex items-center justify-center gap-2 px-6 py-3 font-sans font-semibold text-sm rounded-[6px] transition-all duration-200"
                style={{ backgroundColor: '#1F3A5F', color: '#FFFFFF' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A4D7A')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1F3A5F')}
              >
                Solicitar Orçamento
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 font-sans font-medium text-sm rounded-[6px] transition-all duration-200"
                style={{
                  border: '1px solid rgba(176,196,214,0.3)',
                  color: 'rgba(176,196,214,0.9)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(31,58,95,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <MessageCircle className="size-4" style={{ color: '#7DB3D4' }} />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Coluna — painel de dados técnicos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Painel técnico — sólido, sem backdrop-blur */}
            <div
              className="relative overflow-hidden"
              style={{
                border: '1px solid rgba(49,93,138,0.45)',
                borderRadius: '8px',
                backgroundColor: 'rgba(18,28,42,0.85)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: '1px solid rgba(49,93,138,0.3)', backgroundColor: 'rgba(31,58,95,0.3)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: '#315D8A' }} />
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(176,196,214,0.6)' }}>
                    Dados Técnicos
                  </span>
                </div>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(176,196,214,0.4)' }}>
                  v2.4.1
                </span>
              </div>

              {/* Estatísticas */}
              <div className="p-5 grid grid-cols-3" style={{ borderBottom: '1px solid rgba(49,93,138,0.2)' }}>
                {stats.map(({ value, suffix, label }, i) => (
                  <div
                    key={label}
                    className="px-4 first:pl-0 last:pr-0 flex flex-col gap-1"
                    style={i > 0 ? { borderLeft: '1px solid rgba(49,93,138,0.3)' } : {}}
                  >
                    <div className="font-heading font-semibold text-3xl lg:text-4xl tabular-nums" style={{ color: '#F0F4F8' }}>
                      <CountUp end={value} suffix={suffix} />
                    </div>
                    <div className="font-sans text-xs leading-tight" style={{ color: 'rgba(176,196,214,0.6)' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Barras de métricas */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(176,196,214,0.55)' }}>Precisão posicional</span>
                    <span className="font-mono text-[10px]" style={{ color: '#7DB3D4' }}>±5mm</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(49,93,138,0.25)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#315D8A' }}
                      initial={{ width: 0 }}
                      animate={{ width: '96%' }}
                      transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(176,196,214,0.55)' }}>Cobertura regional</span>
                    <span className="font-mono text-[10px]" style={{ color: '#7DB3D4' }}>12 estados</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(49,93,138,0.25)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#315D8A', opacity: 0.75 }}
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Certificações */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
                { code: 'INCRA 572', label: 'Georreferenciamento Rural' },
                { code: 'ISO 9001', label: 'Gestão da Qualidade' },
                { code: 'CREA/CAU', label: 'Habilitação Profissional' },
              ].map((cert) => (
                <div
                  key={cert.code}
                  className="pl-3 py-2"
                  style={{ borderLeft: '2px solid rgba(49,93,138,0.6)' }}
                >
                  <div className="font-mono text-xs font-medium" style={{ color: '#7DB3D4' }}>{cert.code}</div>
                  <div className="font-sans text-[11px] mt-0.5" style={{ color: 'rgba(176,196,214,0.6)' }}>{cert.label}</div>
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
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(176,196,214,0.35)' }}>
            Conheça nossos serviços
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-4" style={{ color: 'rgba(176,196,214,0.3)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
