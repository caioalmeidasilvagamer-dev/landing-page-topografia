'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import config from '@/site.config'

const VP = { once: true, amount: 0.05 } as const

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
  const testimonials = config.testimonials

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="depoimentos" className="relative py-24 lg:py-32 overflow-hidden bg-background/50">

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-7 bg-white border border-border relative overflow-hidden flex flex-col rounded-lg"
          >
            <div className="h-[3px] w-full bg-primary" />

            <div className="p-8 flex flex-col gap-6 flex-1">
              <Quote className="size-14 absolute top-8 right-8 text-muted" aria-hidden="true" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="size-12 flex items-center justify-center flex-shrink-0 font-heading font-semibold text-base text-primary border border-border rounded-[6px] bg-muted">
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

              <div className="pt-4 flex items-center justify-between border-t border-secondary">
                <div className="petroleum-accent pl-3">
                  <div className="font-mono text-[10px] text-muted-foreground/55 mb-0.5">Projeto</div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {testimonials[current].project}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="size-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/35 transition-all rounded-[6px]"
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className="font-mono text-xs text-muted-foreground/55">
                    {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </div>
                  <button
                    onClick={next}
                    className="size-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/35 transition-all rounded-[6px]"
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            {testimonials.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
                onClick={() => setCurrent(index)}
                className={`text-left border p-4 transition-all duration-200 rounded-lg ${
                  current === index
                    ? 'bg-white border-primary border-l-[3px]'
                    : 'bg-transparent border-border'
                }`}
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
