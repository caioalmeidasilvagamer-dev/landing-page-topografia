'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import config from '@/site.config'

const VP = { once: true, amount: 0.05 } as const

const serviceOptions = config.calculator.serviceOptions
const purposeOptions = config.calculator.purposeOptions
const serviceBase = config.calculator.pricing

interface Result {
  prazoMin: number
  prazoMax: number
  precoMin: number
  precoMax: number
  equipment: string
}

function calculate(service: string, area: number): Result {
  const base = serviceBase[service]
  const areaFactor = Math.max(1, area / 50)

  const prazoMin = Math.round(base.minDays * Math.sqrt(areaFactor))
  const prazoMax = Math.round(base.maxDays * Math.sqrt(areaFactor))

  const basePrice = base.fixedPrice ?? area * base.pricePerHa
  const precoMin = Math.round(basePrice * 0.85)
  const precoMax = Math.round(basePrice * 1.20)

  return { prazoMin, prazoMax, precoMin, precoMax, equipment: base.equipment }
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function Calculator() {
  const [service, setService] = useState(serviceOptions[0])
  const [area, setArea] = useState('')
  const [purpose, setPurpose] = useState(purposeOptions[0])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const handleCalculate = () => {
    const areaNum = parseFloat(area)
    if (!areaNum || areaNum <= 0) return

    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const r = calculate(service, areaNum)
      setResult(r)
      setLoading(false)
    }, 1500)
  }

  const scrollToContact = () => {
    const el = document.querySelector('#contato')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
              Calculadora / 07A
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4"
          >
            Estime seu projeto em segundos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-sans text-sm text-muted-foreground max-w-lg"
          >
            Informe o tipo de serviço e a área para receber uma estimativa de prazo e faixa de investimento
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white border border-border p-8"
          style={{ borderRadius: '8px' }}
        >
          <div className="flex flex-col gap-5">
            <div>
              <label className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70 uppercase mb-2 block">
                Tipo de serviço
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-[6px] font-sans text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70 uppercase mb-2 block">
                Área (hectares)
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex: 50"
                min="0"
                step="0.1"
                className="w-full px-4 py-3 border border-border rounded-[6px] font-sans text-sm text-foreground placeholder:text-muted-foreground/40 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70 uppercase mb-2 block">
                Finalidade
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-[6px] font-sans text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              >
                {purposeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading || !area}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans font-medium text-sm rounded-[6px] hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Calculando...
                </>
              ) : (
                <>
                  Calcular estimativa
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-5 bg-muted/30 rounded-[6px] border-l-[3px] border-l-primary">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground/60 uppercase mb-1">Prazo estimado</div>
                      <div className="font-heading font-semibold text-lg text-foreground">
                        {result.prazoMin} – {result.prazoMax} dias úteis
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground/60 uppercase mb-1">Faixa de investimento</div>
                      <div className="font-heading font-semibold text-lg text-foreground">
                        {formatCurrency(result.precoMin)} – {formatCurrency(result.precoMax)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="font-mono text-[10px] text-muted-foreground/60 uppercase mb-1">Equipamento recomendado</div>
                    <div className="font-sans text-sm text-foreground">{result.equipment}</div>
                  </div>

                  <p className="font-sans text-xs text-muted-foreground/60 italic">
                    * Estimativa indicativa. O valor exato depende de acesso ao terreno, datum solicitado e especificidades do projeto. Solicite uma proposta formal.
                  </p>
                </div>

                <button
                  onClick={scrollToContact}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 border border-border/60 text-foreground font-sans font-medium text-sm rounded-[6px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  Solicitar proposta formal
                  <ArrowRight className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
