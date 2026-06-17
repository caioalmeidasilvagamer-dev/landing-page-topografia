'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const VP = { once: true, amount: 0.05 } as const

const faqs = [
  {
    id: 'q1',
    question: 'Qual é o prazo médio para realização de um levantamento topográfico?',
    answer:
      'O prazo varia conforme a área e complexidade do projeto. Levantamentos de até 5 ha são concluídos em 2 a 3 dias úteis. Áreas maiores ou com terrenos acidentados podem demandar de 5 a 15 dias úteis. O prazo exato é informado na proposta técnica após a visita de reconhecimento.',
  },
  {
    id: 'q2',
    question: 'Quais documentos são entregues ao final do serviço?',
    answer:
      'A entrega padrão inclui: arquivos técnicos em DWG/DXF e PDF, memorial descritivo georreferenciado, relatório técnico com dados do levantamento, ART (Anotação de Responsabilidade Técnica) do engenheiro responsável, e lista de coordenadas dos pontos levantados. Para georreferenciamento rural, é incluso o certificado INCRA e os arquivos para inserção no SIGEF.',
  },
  {
    id: 'q3',
    question: 'A GeoTech atende a área em que preciso de serviços?',
    answer:
      'Atendemos os estados do Sudeste (SP, RJ, MG, ES), Centro-Oeste (GO, MT, MS, DF) e Sul (PR, SC, RS). Para demandas em outras regiões, avaliamos caso a caso conforme o tamanho e urgência do projeto. Entre em contato para verificar disponibilidade.',
  },
  {
    id: 'q4',
    question: 'O que é georreferenciamento e quando é obrigatório?',
    answer:
      'Georreferenciamento é o processo de determinar as coordenadas de um imóvel rural com precisão geodésica, vinculando-o ao Sistema Geodésico Brasileiro (SIRGAS2000). É obrigatório para imóveis que pretendem realizar desmembramento, parcelamento, remembramento, transferência de domínio ou qualquer alteração registral a partir das áreas mínimas definidas pelo INCRA.',
  },
  {
    id: 'q5',
    question: 'Qual a diferença entre levantamento planimétrico e planialtimétrico?',
    answer:
      'O levantamento planimétrico registra apenas a posição horizontal dos elementos (limite de imóvel, construções, vias). O planialtimétrico inclui também as cotas de altitude, gerando curvas de nível e o modelo digital do terreno. Para projetos de drenagem, terraplanagem e construção civil, o levantamento planialtimétrico é indispensável.',
  },
  {
    id: 'q6',
    question: 'Como funciona o aerolevantamento com drone e quais os benefícios?',
    answer:
      'O aerolevantamento utiliza VANTs (drones) equipados com câmeras métricas que capturam centenas de imagens sobrepostas da área. Com o processamento fotogramétrico, geramos ortofotos de alta resolução (GSD até 3cm), modelos digitais de superfície e do terreno, e nuvens de pontos 3D. Os benefícios incluem cobertura rápida de grandes áreas e custo-benefício superior ao levantamento convencional para áreas acima de 50 ha.',
  },
  {
    id: 'q7',
    question: 'É necessário estar presente durante o levantamento em campo?',
    answer:
      'Não é obrigatório, mas recomendamos que o proprietário ou seu representante esteja disponível para identificar os marcos de divisa e sanar eventuais dúvidas sobre os limites do imóvel. Para georreferenciamentos rurais, a presença nos dias de campo garante maior precisão e evita retrabalhos.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(237,241,247,0.85)' }}>

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
              FAQ / 06
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-xl text-balance"
          >
            Perguntas frequentes sobre topografia
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <Accordion className="flex flex-col gap-2">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.04 }}
                >
                  <AccordionItem
                    value={faq.id}
                    className="bg-white border border-border px-5 overflow-hidden data-[state=open]:border-l-[3px] data-[state=open]:border-l-primary"
                    style={{ borderRadius: '8px' }}
                  >
                    <AccordionTrigger className="font-sans font-medium text-sm text-foreground py-4 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Painel lateral */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <div
              className="bg-white border border-border p-6 flex flex-col gap-4"
              style={{ borderRadius: '8px' }}
            >
              <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                Suporte técnico
              </div>
              <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
                Não encontrou sua dúvida?
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Nossa equipe técnica está disponível para responder qualquer questão sobre
                topografia, georreferenciamento e engenharia de precisão.
              </p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
                style={{ borderRadius: '6px' }}
              >
                Falar com especialista
              </a>
            </div>

            <div
              className="bg-white border border-border p-5 flex flex-col gap-3"
              style={{ borderRadius: '8px', borderLeft: '3px solid #1F3A5F' }}
            >
              <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                Normas e certificações
              </div>
              {[
                'ABNT NBR 13.133 — Levantamento Topográfico',
                'INCRA 572 — Georreferenciamento',
                'IBGE NT 05 — Coordenadas GPS',
                'SIRGAS2000 — Datum Geodésico',
              ].map((norm) => (
                <div key={norm} className="flex items-start gap-2">
                  <div className="size-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                  <span className="font-mono text-[10px] text-muted-foreground/65 leading-relaxed">
                    {norm}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
