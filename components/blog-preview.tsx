'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import config from '@/site.config'

const VP = { once: true, amount: 0.05 } as const

export function BlogPreview() {
  const articles = config.blog

  return (
    <section className="relative py-24 lg:py-32 bg-muted/50">
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
              Blog / 07
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-lg text-balance"
            >
              Conteúdo técnico sobre topografia
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Artigos, guias e comparativos para ajudar você a tomar decisões técnicas informadas.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              className="group bg-white border border-border overflow-hidden hover:border-primary/35 transition-all duration-200 rounded-lg"
            >
              <div
                className="h-32 flex items-center justify-center"
                style={{ backgroundColor: article.topColor }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: article.categoryColor, color: '#FFFFFF' }}
                >
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-[10px]">{article.date}</span>
                  <span className="text-border">·</span>
                  <span className="font-mono text-[10px]">{article.readTime}</span>
                </div>

                <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-primary font-sans text-xs font-medium group-hover:gap-2.5 transition-all">
                  Ler artigo
                  <ArrowRight className="size-3" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
