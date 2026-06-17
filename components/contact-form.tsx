'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Phone, Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { TopoBackground } from './topo-background'
import config from '@/site.config'

interface FormData {
  nome: string
  telefone: string
  cidade: string
  servico: string
  mensagem: string
}

interface FormErrors {
  nome?: string
  telefone?: string
  cidade?: string
  servico?: string
  mensagem?: string
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const servicos = [
  ...config.services.map((s) => s.title),
  'Outro',
]

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const [form, setForm] = useState<FormData>({
    nome: '',
    telefone: '',
    cidade: '',
    servico: '',
    mensagem: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.nome.trim() || form.nome.trim().length < 3) {
      newErrors.nome = 'Informe seu nome completo'
    }
    const phoneDigits = form.telefone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      newErrors.telefone = 'Informe um telefone válido com DDD'
    }
    if (!form.cidade.trim()) {
      newErrors.cidade = 'Informe sua cidade'
    }
    if (!form.servico) {
      newErrors.servico = 'Selecione o tipo de serviço'
    }
    if (!form.mensagem.trim() || form.mensagem.trim().length < 20) {
      newErrors.mensagem = 'Descreva sua necessidade (mín. 20 caracteres)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value
    if (field === 'telefone') value = formatPhone(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const inputClass = (hasError: boolean) =>
    `h-10 px-3 bg-white border font-sans text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none transition-colors w-full ${
      hasError
        ? 'border-destructive/60 focus:border-destructive'
        : 'border-border focus:border-primary/60'
    }`

  return (
    <>
      <section className="relative py-24 lg:py-32 overflow-hidden bg-foreground">
        <TopoBackground showGrid variant="dark" />
        <div className="absolute inset-0 bg-foreground/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 lg:p-12 border border-topo-line/40 rounded-lg bg-foreground/70">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-topo-line" />
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-topo-accent">
                    Vamos trabalhar juntos
                  </span>
                </div>
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-balance text-background-alt">
                  Inicie seu projeto com a {config.brand.name}
                </h2>
                <p className="font-sans text-sm leading-relaxed max-w-md text-topo-accent/80">
                  Do levantamento inicial à entrega da documentação, nossa equipe garante
                  precisão milimétrica e conformidade técnica em cada etapa do seu projeto.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: Phone, text: config.contact.phone },
                    { icon: Mail, text: config.contact.email },
                    { icon: MessageCircle, text: `WhatsApp disponível ${config.contact.hours.weekdays}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="size-8 flex items-center justify-center border border-topo-line/45 rounded-[6px] bg-primary/25">
                        <Icon className="size-3.5 text-topo-accent" />
                      </div>
                      <span className="font-sans text-sm text-topo-accent/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group flex items-center justify-center gap-2 px-6 py-4 bg-white text-primary font-sans font-semibold text-base rounded-[6px] hover:bg-muted transition-all"
                >
                  Solicitar Orçamento Gratuito
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`https://wa.me/${config.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-topo-accent/30 text-topo-accent/90 font-sans font-medium text-base rounded-[6px] hover:bg-topo-line/20 transition-all"
                >
                  <MessageCircle className="size-4 text-topo-accent" />
                  Conversar no WhatsApp
                </a>
                <p className="font-sans text-xs text-center text-topo-accent/40">
                  Resposta em até 24 horas úteis. Sem compromisso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="relative py-24 lg:py-32 bg-background/50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                Contato / 07
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-8"
              >
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-8 text-balance">
                  Solicite seu orçamento
                </h2>

                {status === 'success' ? (
                  <div className="p-10 flex flex-col items-center gap-4 text-center bg-white border-l-[3px] border-l-primary rounded-lg">
                    <CheckCircle2 className="size-10 text-primary" />
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      Solicitação recebida!
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed">
                      Nossa equipe técnica analisará sua solicitação e entrará em contato
                      em até 24 horas úteis com uma proposta personalizada.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="font-sans text-sm text-primary hover:underline mt-2"
                    >
                      Enviar nova solicitação
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="nome">
                          Nome completo <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="nome"
                          type="text"
                          value={form.nome}
                          onChange={handleChange('nome')}
                          placeholder="Seu nome"
                          className={`${inputClass(!!errors.nome)} rounded-[6px]`}
                          aria-invalid={!!errors.nome}
                          aria-describedby={errors.nome ? 'nome-error' : undefined}
                        />
                        {errors.nome && (
                          <span id="nome-error" className="font-sans text-xs text-destructive">
                            {errors.nome}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="telefone">
                          Telefone / WhatsApp <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          value={form.telefone}
                          onChange={handleChange('telefone')}
                          placeholder="(00) 00000-0000"
                          inputMode="numeric"
                          className={`${inputClass(!!errors.telefone)} rounded-[6px]`}
                          aria-invalid={!!errors.telefone}
                          aria-describedby={errors.telefone ? 'telefone-error' : undefined}
                        />
                        {errors.telefone && (
                          <span id="telefone-error" className="font-sans text-xs text-destructive">
                            {errors.telefone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="cidade">
                          Cidade / Estado <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="cidade"
                          type="text"
                          value={form.cidade}
                          onChange={handleChange('cidade')}
                          placeholder="Ex: Campinas, SP"
                          className={`${inputClass(!!errors.cidade)} rounded-[6px]`}
                          aria-invalid={!!errors.cidade}
                        />
                        {errors.cidade && (
                          <span className="font-sans text-xs text-destructive">{errors.cidade}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="servico">
                          Tipo de serviço <span className="text-destructive">*</span>
                        </label>
                        <select
                          id="servico"
                          value={form.servico}
                          onChange={handleChange('servico')}
                          className={`${inputClass(!!errors.servico)} appearance-none rounded-[6px]`}
                          aria-invalid={!!errors.servico}
                        >
                          <option value="">Selecione o serviço</option>
                          {servicos.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {errors.servico && (
                          <span className="font-sans text-xs text-destructive">{errors.servico}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs text-muted-foreground" htmlFor="mensagem">
                        Descrição do projeto <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="mensagem"
                        value={form.mensagem}
                        onChange={handleChange('mensagem')}
                        placeholder="Descreva brevemente o que precisa: localização, área aproximada, finalidade do levantamento, prazo desejado..."
                        rows={4}
                        className={`px-3 py-2.5 bg-white border font-sans text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none transition-colors resize-none leading-relaxed w-full rounded-[6px] ${
                          errors.mensagem
                            ? 'border-destructive/60 focus:border-destructive'
                            : 'border-border focus:border-primary/60'
                        }`}
                        aria-invalid={!!errors.mensagem}
                      />
                      {errors.mensagem && (
                        <span className="font-sans text-xs text-destructive">{errors.mensagem}</span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-sans font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 transition-all rounded-[6px]"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar Orçamento
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      <a
                        href={`https://wa.me/${config.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-sans text-sm hover:border-primary/45 hover:bg-primary/5 transition-all rounded-[6px]"
                      >
                        <MessageCircle className="size-4 text-primary" />
                        Preferir WhatsApp
                      </a>
                    </div>
                    <p className="font-sans text-xs text-muted-foreground/50">
                      Seus dados são utilizados apenas para responder à sua solicitação. Resposta em até 24h úteis.
                    </p>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-4 flex flex-col gap-4"
              >
                <div className="bg-white border border-border p-5 flex flex-col gap-4 rounded-lg">
                  <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                    Atendimento
                  </div>
                  {[
                    { label: 'Seg – Sex', value: config.contact.hours.weekdays },
                    { label: 'Sábado', value: config.contact.hours.saturday },
                    { label: 'Resposta', value: 'Até 24h úteis' },
                    { label: 'Proposta', value: 'Sem compromisso' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between border-b border-secondary pb-2">
                      <span className="font-sans text-xs text-muted-foreground">{label}</span>
                      <span className="font-mono text-xs text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-border p-5 flex flex-col gap-3 rounded-lg">
                  <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                    Área de cobertura
                  </div>
                  {[
                    'São Paulo (Capital e Interior)',
                    'Minas Gerais',
                    'Rio de Janeiro',
                    'Goiás e DF',
                    'Mato Grosso / MS',
                    'Paraná e Santa Catarina',
                  ].map((estado) => (
                    <div key={estado} className="flex items-center gap-2">
                      <div className="size-1 rounded-full bg-primary/50 flex-shrink-0" />
                      <span className="font-sans text-xs text-muted-foreground">{estado}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
