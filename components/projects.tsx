'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'

const projects = [
  {
    id: 'P-001',
    title: 'Aerolevantamento — Fazenda Santa Clara',
    category: 'Aerolevantamento',
    location: 'Mato Grosso do Sul',
    area: '4.820 ha',
    description:
      'Levantamento aerofotogramétrico com VANT de 4.820 ha para geração de ortofoto (GSD 3cm), MDT e curvas de nível para projeto de irrigação.',
    image: '/images/project-aerial.png',
    tags: ['Drone', 'Ortofoto', 'MDT'],
  },
  {
    id: 'P-002',
    title: 'Parcelamento Urbano — Loteamento Horizonte',
    category: 'Topografia Urbana',
    location: 'Ribeirão Preto, SP',
    area: '68 ha',
    description:
      'Levantamento planialtimétrico e projeto de parcelamento urbano de 68 ha com 380 lotes, aprovação junto à Prefeitura Municipal.',
    image: '/images/project-loteamento.png',
    tags: ['Loteamento', 'Parcelamento', 'NBR 13.133'],
  },
  {
    id: 'P-003',
    title: 'Georreferenciamento — Gleba Rural Norte',
    category: 'Georreferenciamento',
    location: 'Goiás',
    area: '1.240 ha',
    description:
      'Georreferenciamento e certificação INCRA de propriedade rural de 1.240 ha com receptores GNSS L1/L2 e processamento PPP/diferencial.',
    image: '/images/project-gnss.png',
    tags: ['GNSS', 'INCRA', 'SIGEF'],
  },
  {
    id: 'P-004',
    title: 'Locação de Obra — Centro Logístico',
    category: 'Locação de Obras',
    location: 'Campinas, SP',
    area: '12.000 m²',
    description:
      'Locação e monitoramento de obras de um centro logístico de 12.000 m², incluindo implantação de pilares, laje e estrutura metálica.',
    image: '/images/project-obra.png',
    tags: ['Locação', 'Estrutura', 'Monitoramento'],
  },
]

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="projetos" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 technical-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              Projetos / 04
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-semibold text-3xl lg:text-4xl text-foreground max-w-lg text-balance"
            >
              Projetos realizados em todo o Brasil
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Uma seleção dos nossos trabalhos mais relevantes em engenharia topográfica e geodésica.
            </motion.p>
          </div>
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative border border-border/50 rounded-[8px] overflow-hidden bg-card hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              {/* Imagem */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-300" />

                {/* ID técnico */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-foreground/80 bg-background/60 backdrop-blur-sm px-2 py-1 rounded-sm">
                  {project.id}
                </div>

                {/* Categoria */}
                <div className="absolute top-3 right-3 font-mono text-[10px] text-primary bg-background/70 backdrop-blur-sm px-2 py-1 rounded-sm border border-primary/30">
                  {project.category}
                </div>

                {/* Ícone de acesso */}
                <AnimatePresence>
                  {hovered === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bottom-3 right-3 size-9 flex items-center justify-center bg-primary rounded-[6px]"
                    >
                      <ArrowUpRight className="size-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Conteúdo */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3" />
                  <span className="font-sans text-xs">{project.location}</span>
                  <span className="text-border mx-1">·</span>
                  <span className="font-mono text-xs text-muted-foreground/70">{project.area}</span>
                </div>

                <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                  {project.title}
                </h3>

                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 bg-muted rounded-sm text-muted-foreground/80 border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
