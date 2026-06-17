'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import config from '@/site.config'

const VP = { once: true, amount: 0.05 } as const

export function FAQ() {
  const faqs = config.faq.items

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-muted/50">

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
            {config.faq.headline}
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
                    className="bg-white border border-border px-5 overflow-hidden data-[state=open]:border-l-[3px] data-[state=open]:border-l-primary rounded-lg"
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

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <div className="bg-white border border-border p-6 flex flex-col gap-4 rounded-lg">
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
                href={`https://wa.me/${config.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-sans font-medium hover:bg-primary/90 transition-colors rounded-[6px]"
              >
                Falar com especialista
              </a>
            </div>

            <div className="bg-white border border-border p-5 flex flex-col gap-3 rounded-lg border-l-[3px] border-l-primary">
              <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/55 uppercase">
                Normas e certificações
              </div>
              {config.faq.certifications.map((cert) => (
                <div key={cert} className="flex items-start gap-2">
                  <div className="size-1 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                  <span className="font-mono text-[10px] text-muted-foreground/65 leading-relaxed">
                    {cert}
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
