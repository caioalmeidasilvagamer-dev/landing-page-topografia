'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

const articles = [
  {
    category: 'Fundamentos',
    categoryColor: '#1F3A5F',
    topColor: '#EDF1F7',
    title: 'O que é levantamento planialtimétrico e quando contratar?',
    excerpt:
      'Entenda a diferença entre levantamento planimétrico e planialtimétrico, quando cada um é necessário e como o datum geodésico influencia nos resultados.',
    date: '12 Mai 2025',
    readTime: '7 min',
  },
  {
    category: 'Georreferenciamento',
    categoryColor: '#5E7C52',
    topColor: '#EAF3DE',
    title: 'Georreferenciamento INCRA: passo a passo do processo de certificação',
    excerpt:
      'Tudo o que proprietários rurais precisam saber sobre o processo de georreferenciamento, prazos, documentos necessários e como escolher uma empresa habilitada.',
    date: '28 Abr 2025',
    readTime: '10 min',
  },
  {
    category: 'Tecnologia',
    categoryColor: '#D97706',
    topColor: '#FAEEDA',
    title: 'Drone em topografia: quando o aerolevantamento vale mais que o método convencional?',
    excerpt:
      'Comparativo técnico entre levantamento GNSS convencional e aerolevantamento com VANT. Analisamos custo, precisão e aplicabilidade para diferentes tipos de projeto.',
    date: '10 Abr 2025',
    readTime: '8 min',
  },
]

export function BlogPreview() {
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: 'rgba(237,241,247,0.50)' }}>
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
              Blog / 06A
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-semibold text-3xl lg:text-4xl text-foreground"
          >
            Conteúdo técnico sobre topografia
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              className="group bg-white border border-border hover:border-primary/40 hover:shadow-sm transition-all duration-200 overflow-hidden cursor-pointer"
              style={{ borderRadius: '8px' }}
            >
              <div
                className="h-20 w-full"
                style={{ backgroundColor: article.topColor }}
              />

              <div className="p-5 flex flex-col gap-3">
                <div
                  className="inline-flex items-center w-fit px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-white uppercase"
                  style={{ backgroundColor: article.categoryColor, borderRadius: '4px' }}
                >
                  {article.category}
                </div>

                <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E8EFF6' }}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground/60">{article.date}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/40">·</span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">{article.readTime}</span>
                  </div>
                  <span className="font-mono text-[10px] text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Ler artigo <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border/60 text-foreground font-sans font-medium text-sm rounded-[6px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            Ver todos os artigos
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
