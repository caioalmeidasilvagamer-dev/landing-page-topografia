'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

const testimonials = [
  {
    id: 1,
    name: 'Engenheiro Carlos Mendes',
    role: 'Diretor de Projetos',
    company: 'Construtora Alpha',
    rating: 5,
    text: 'A GeoTech entregou o levantamento topográfico do nosso canteiro de obras com uma precisão impressionante. O relatório técnico estava em conformidade total com as normas ABNT e o prazo de entrega foi cumprido rigorosamente. Recomendo sem hesitar.',
    location: 'São Paulo, SP',
    project: 'Locação de Obras — Edifício Comercial',
  },
  {
    id: 2,
    name: 'Ricardo Souza',
    role: 'Proprietário Rural',
    company: 'Fazenda Bom Retiro',
    rating: 5,
    text: 'Precisava georreferenciar minha propriedade de 3.200 ha para regularização junto ao INCRA. A equipe da GeoTech conduziu todo o processo com profissionalismo e clareza técnica. Certificado aprovado na primeira análise.',
    location: 'Goiás',
    project: 'Georreferenciamento Rural — 3.200 ha',
  },
  {
    id: 3,
    name: 'Arq. Fernanda Lima',
    role: 'Gerente de Incorporação',
    company: 'Incorporadora Horizonte',
    rating: 5,
    text: 'Utilizamos a GeoTech no levantamento planialtimétrico do nosso novo empreendimento. A qualidade dos arquivos DWG entregues facilitou imensamente o trabalho dos projetistas. Equipe técnica muito capacitada e atenciosa.',
    location: 'Ribeirão Preto, SP',
    project: 'Topografia Urbana — Loteamento',
  },
  {
    id: 4,
    name: 'Dr. Marcos Pereira',
    role: 'Superintendente de Obras',
    company: 'Infraestrutura Nacional S.A.',
    rating: 5,
    text: 'Para obras de infraestrutura como a nossa, precisão não é opcional. A GeoTech nos atendeu com equipamentos de última geração e uma equipe altamente treinada. Os dados de monitoramento foram fundamentais para o controle de qualidade estrutural.',
    location: 'Campinas, SP',
    project: 'Locação e Monitoramento — Centro Logístico',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3 ${i < rating ? 'fill-primary text-primary' : 'text-border'}`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="depoimentos" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: 'rgba(248,250,252,0.50)' }}>

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
              Depoimentos / 05
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-lg text-balance"
          >
            Clientes que confiam na nossa precisão
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Depoimento principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-7 bg-white border border-border relative overflow-hidden flex flex-col"
            style={{ borderRadius: '8px' }}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: '#1F3A5F' }} />

            <div className="p-8 flex flex-col gap-6 flex-1">
              <Quote className="size-14 absolute top-8 right-8" style={{ color: '#EDF1F7' }} aria-hidden="true" />

              <div className="flex items-start gap-4 relative z-10">
                <div
                  className="size-12 flex items-center justify-center flex-shrink-0 font-heading font-semibold text-base text-primary"
                  style={{ border: '1px solid #D0DAEA', borderRadius: '6px', backgroundColor: '#EDF1F7' }}
                >
                  {testimonials[current].name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex flex-col gap-0.5">
                  <StarRating rating={testimonials[current].rating} />
                  <div className="font-heading font-semibold text-sm text-foreground mt-1">
                    {testimonials[current].name}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {testimonials[current].role} — {testimonials[current].company}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="font-sans text-base text-foreground/85 leading-relaxed relative z-10"
                >
                  &ldquo;{testimonials[current].text}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #E8EFF6' }}>
                <div className="petroleum-accent pl-3">
                  <div className="font-mono text-[10px] text-muted-foreground/55 mb-0.5">Projeto</div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {testimonials[current].project}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="size-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/35 transition-all"
                    style={{ borderRadius: '6px' }}
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className="font-mono text-xs text-muted-foreground/55">
                    {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </div>
                  <button
                    onClick={next}
                    className="size-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/35 transition-all"
                    style={{ borderRadius: '6px' }}
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lista compacta */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {testimonials.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
                onClick={() => setCurrent(index)}
                className="text-left border p-4 transition-all duration-200"
                style={{
                  borderRadius: '8px',
                  backgroundColor: current === index ? '#FFFFFF' : 'transparent',
                  borderColor: current === index ? '#1F3A5F' : '#D0DAEA',
                  borderLeftWidth: current === index ? '3px' : '1px',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-sans text-sm font-medium text-foreground">{t.name}</div>
                  <StarRating rating={t.rating} />
                </div>
                <div className="font-sans text-xs text-muted-foreground mb-1">
                  {t.company} · {t.location}
                </div>
                <div className="font-sans text-xs text-muted-foreground/60 line-clamp-2">
                  {t.text}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
