'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

const states = [
  { abbr: 'AC', name: 'Acre', served: false },
  { abbr: 'AL', name: 'Alagoas', served: false },
  { abbr: 'AP', name: 'Amapá', served: false },
  { abbr: 'AM', name: 'Amazonas', served: false },
  { abbr: 'BA', name: 'Bahia', served: false },
  { abbr: 'CE', name: 'Ceará', served: false },
  { abbr: 'DF', name: 'Distrito Federal', served: true },
  { abbr: 'ES', name: 'Espírito Santo', served: true },
  { abbr: 'GO', name: 'Goiás', served: true },
  { abbr: 'MA', name: 'Maranhão', served: false },
  { abbr: 'MT', name: 'Mato Grosso', served: true },
  { abbr: 'MS', name: 'Mato Grosso do Sul', served: true },
  { abbr: 'MG', name: 'Minas Gerais', served: true },
  { abbr: 'PA', name: 'Pará', served: false },
  { abbr: 'PB', name: 'Paraíba', served: false },
  { abbr: 'PR', name: 'Paraná', served: true },
  { abbr: 'PE', name: 'Pernambuco', served: false },
  { abbr: 'PI', name: 'Piauí', served: false },
  { abbr: 'RJ', name: 'Rio de Janeiro', served: true },
  { abbr: 'RN', name: 'Rio Grande do Norte', served: false },
  { abbr: 'RS', name: 'Rio Grande do Sul', served: true },
  { abbr: 'RO', name: 'Rondônia', served: false },
  { abbr: 'RR', name: 'Roraima', served: false },
  { abbr: 'SC', name: 'Santa Catarina', served: true },
  { abbr: 'SP', name: 'São Paulo', served: true },
  { abbr: 'SE', name: 'Sergipe', served: false },
  { abbr: 'TO', name: 'Tocantins', served: false },
]

const servedStates = states.filter((s) => s.served)

export function CoverageMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: 'rgba(248,250,252,0.50)' }}>
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
              Cobertura / 04A
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground"
          >
            Atendemos em todo o Brasil
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Com equipe própria e equipamentos mobilizados, atendemos projetos em 11 estados brasileiros. Nossa cobertura abrange as regiões Sudeste, Sul, Centro-Oeste e parte do Norte.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {servedStates.map((state) => (
                <div key={state.abbr} className="flex items-center gap-2 py-1.5">
                  <Check className="size-3.5 text-green-600" />
                  <span className="font-sans text-sm text-foreground">{state.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
              {states.map((state) => (
                <div
                  key={state.abbr}
                  className="relative"
                  onMouseEnter={() => setHovered(state.abbr)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="aspect-square flex items-center justify-center text-xs font-mono font-medium cursor-default transition-all duration-200"
                    style={{
                      borderRadius: '6px',
                      backgroundColor: state.served ? '#1F3A5F' : '#EDF1F7',
                      color: state.served ? '#FFFFFF' : 'rgba(83,96,112,0.4)',
                      border: `1px solid ${state.served ? '#1F3A5F' : '#D0DAEA'}`,
                    }}
                  >
                    {state.abbr}
                  </div>

                  <AnimatePresence>
                    {hovered === state.abbr && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1.5 text-xs font-sans bg-white border border-border shadow-sm"
                        style={{ borderRadius: '6px' }}
                      >
                        {state.served ? (
                          <span className="text-foreground">{state.name} ✓</span>
                        ) : (
                          <span className="text-muted-foreground">Consultar disponibilidade</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#1F3A5F' }} />
                <span className="font-mono text-[10px] text-muted-foreground">Atendido</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border" style={{ borderColor: '#D0DAEA', backgroundColor: '#EDF1F7' }} />
                <span className="font-mono text-[10px] text-muted-foreground">Consultar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
