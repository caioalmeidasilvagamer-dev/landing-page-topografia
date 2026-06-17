'use client'

import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.05 } as const

const reviews = [
  {
    name: 'José Ferreira',
    initial: 'J',
    text: 'Serviço excelente, prazo cumprido e documentação impecável. Recomendo!',
  },
  {
    name: 'Ana Paula Silva',
    initial: 'A',
    text: 'Georreferenciamento aprovado no INCRA na primeira análise. Equipe muito competente.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span>
      ))}
    </div>
  )
}

export function GoogleRating() {
  return (
    <section className="relative py-12 lg:py-16" style={{ backgroundColor: 'rgba(237,241,247,0.50)' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-mono text-xs text-muted-foreground">Google Reviews</span>
            </div>
            <div className="font-heading font-semibold text-5xl text-primary mb-2">4.9</div>
            <Stars />
            <p className="font-sans text-sm text-muted-foreground mt-2">Nota no Google</p>
            <p className="font-sans text-xs text-muted-foreground/60">Baseado em 127 avaliações</p>
            <a
              href="#"
              className="font-sans text-xs text-primary mt-3 hover:underline"
            >
              Ver avaliações no Google →
            </a>
          </motion.div>

          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="bg-white border border-border p-5"
              style={{ borderRadius: '8px' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="size-9 flex items-center justify-center rounded-full bg-primary text-white font-heading font-semibold text-sm"
                >
                  {review.initial}
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-foreground">{review.name}</div>
                  <Stars />
                </div>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
