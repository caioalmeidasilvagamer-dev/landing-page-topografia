'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Phone, Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { TopoBackground } from './topo-background'

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
  'Levantamento Topográfico',
  'Georreferenciamento Rural',
  'Locação de Obras',
  'Regularização Fundiária',
  'Aerolevantamento com Drone',
  'Cadastro Técnico',
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
        ? 'border-[#E20613]/60 focus:border-[#E20613]'
        : 'border-border focus:border-primary/60'
    }`

  return (
    <>
      {/* CTA Final — fundo escuro com curvas de nível */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#1A2332' }}>
        <TopoBackground showGrid variant="dark" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,35,50,0.6)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="p-8 lg:p-12"
            style={{
              border: '1px solid rgba(49,93,138,0.4)',
              borderRadius: '8px',
              backgroundColor: 'rgba(18,28,42,0.7)',
            }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: '#315D8A' }} />
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: '#7DB3D4' }}>
                    Vamos trabalhar juntos
                  </span>
                </div>
                <h2
                  className="font-heading font-semibold text-3xl lg:text-4xl text-balance"
                  style={{ color: '#F0F4F8' }}
                >
                  Inicie seu projeto com a GeoTech
                </h2>
                <p className="font-sans text-sm leading-relaxed max-w-md" style={{ color: 'rgba(176,196,214,0.8)' }}>
                  Do levantamento inicial à entrega da documentação, nossa equipe garante
                  precisão milimétrica e conformidade técnica em cada etapa do seu projeto.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: Phone, text: '+55 (11) 99999-9999' },
                    { icon: Mail, text: 'contato@geotech.com.br' },
                    { icon: MessageCircle, text: 'WhatsApp disponível 8h–18h' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div
                        className="size-8 flex items-center justify-center"
                        style={{ border: '1px solid rgba(49,93,138,0.45)', borderRadius: '6px', backgroundColor: 'rgba(31,58,95,0.25)' }}
                      >
                        <Icon className="size-3.5" style={{ color: '#7DB3D4' }} />
                      </div>
                      <span className="font-sans text-sm" style={{ color: 'rgba(176,196,214,0.8)' }}>{text}</span>
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
                  className="group flex items-center justify-center gap-2 px-6 py-4 font-sans font-semibold text-base transition-all"
                  style={{ backgroundColor: '#FFFFFF', color: '#1F3A5F', borderRadius: '6px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF1F7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  Solicitar Orçamento Gratuito
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 font-sans font-medium text-base transition-all"
                  style={{
                    border: '1px solid rgba(176,196,214,0.3)',
                    color: 'rgba(176,196,214,0.9)',
                    borderRadius: '6px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(49,93,138,0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <MessageCircle className="size-4" style={{ color: '#7DB3D4' }} />
                  Conversar no WhatsApp
                </a>
                <p className="font-sans text-xs text-center" style={{ color: 'rgba(176,196,214,0.4)' }}>
                  Resposta em até 24 horas úteis. Sem compromisso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário — fundo claro */}
      <section id="contato" className="relative py-24 lg:py-32 bg-background/85 backdrop-blur-[2px]">

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
              {/* Formulário principal */}
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
                  <div
                    className="p-10 flex flex-col items-center gap-4 text-center bg-white border"
                    style={{ borderLeft: '3px solid #1F3A5F', borderRadius: '8px' }}
                  >
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
                    {/* Nome + Telefone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="nome">
                          Nome completo <span className="text-[#E20613]">*</span>
                        </label>
                        <input
                          id="nome"
                          type="text"
                          value={form.nome}
                          onChange={handleChange('nome')}
                          placeholder="Seu nome"
                          className={inputClass(!!errors.nome)}
                          style={{ borderRadius: '6px' }}
                          aria-invalid={!!errors.nome}
                          aria-describedby={errors.nome ? 'nome-error' : undefined}
                        />
                        {errors.nome && (
                          <span id="nome-error" className="font-sans text-xs" style={{ color: '#E20613' }}>
                            {errors.nome}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="telefone">
                          Telefone / WhatsApp <span className="text-[#E20613]">*</span>
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          value={form.telefone}
                          onChange={handleChange('telefone')}
                          placeholder="(00) 00000-0000"
                          inputMode="numeric"
                          className={inputClass(!!errors.telefone)}
                          style={{ borderRadius: '6px' }}
                          aria-invalid={!!errors.telefone}
                          aria-describedby={errors.telefone ? 'telefone-error' : undefined}
                        />
                        {errors.telefone && (
                          <span id="telefone-error" className="font-sans text-xs" style={{ color: '#E20613' }}>
                            {errors.telefone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cidade + Serviço */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="cidade">
                          Cidade / Estado <span className="text-[#E20613]">*</span>
                        </label>
                        <input
                          id="cidade"
                          type="text"
                          value={form.cidade}
                          onChange={handleChange('cidade')}
                          placeholder="Ex: Campinas, SP"
                          className={inputClass(!!errors.cidade)}
                          style={{ borderRadius: '6px' }}
                          aria-invalid={!!errors.cidade}
                        />
                        {errors.cidade && (
                          <span className="font-sans text-xs" style={{ color: '#E20613' }}>{errors.cidade}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs text-muted-foreground" htmlFor="servico">
                          Tipo de serviço <span className="text-[#E20613]">*</span>
                        </label>
                        <select
                          id="servico"
                          value={form.servico}
                          onChange={handleChange('servico')}
                          className={`${inputClass(!!errors.servico)} appearance-none`}
                          style={{ borderRadius: '6px' }}
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
                          <span className="font-sans text-xs" style={{ color: '#E20613' }}>{errors.servico}</span>
                        )}
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs text-muted-foreground" htmlFor="mensagem">
                        Descrição do projeto <span className="text-[#E20613]">*</span>
                      </label>
                      <textarea
                        id="mensagem"
                        value={form.mensagem}
                        onChange={handleChange('mensagem')}
                        placeholder="Descreva brevemente o que precisa: localização, área aproximada, finalidade do levantamento, prazo desejado..."
                        rows={4}
                        className={`px-3 py-2.5 bg-white border font-sans text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none transition-colors resize-none leading-relaxed w-full ${
                          errors.mensagem
                            ? 'border-[#E20613]/60 focus:border-[#E20613]'
                            : 'border-border focus:border-primary/60'
                        }`}
                        style={{ borderRadius: '6px' }}
                        aria-invalid={!!errors.mensagem}
                      />
                      {errors.mensagem && (
                        <span className="font-sans text-xs" style={{ color: '#E20613' }}>{errors.mensagem}</span>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-sans font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
                        style={{ borderRadius: '6px' }}
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
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-sans text-sm hover:border-primary/45 hover:bg-primary/5 transition-all"
                        style={{ borderRadius: '6px' }}
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

              {/* Informações laterais */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-4 flex flex-col gap-4"
              >
                <div
                  className="bg-white border border-border p-5 flex flex-col gap-4"
                  style={{ borderRadius: '8px' }}
                >
                  <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                    Atendimento
                  </div>
                  {[
                    { label: 'Seg – Sex', value: '08h às 18h' },
                    { label: 'Sábado', value: '08h às 12h' },
                    { label: 'Resposta', value: 'Até 24h úteis' },
                    { label: 'Proposta', value: 'Sem compromisso' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between" style={{ borderBottom: '1px solid #E8EFF6', paddingBottom: '0.5rem' }}>
                      <span className="font-sans text-xs text-muted-foreground">{label}</span>
                      <span className="font-mono text-xs text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="bg-white border border-border p-5 flex flex-col gap-3"
                  style={{ borderRadius: '8px' }}
                >
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
