'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'

const VP = { once: true, amount: 0.05 } as const

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
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="projetos" className="relative py-24 lg:py-32" style={{ backgroundColor: 'rgba(237,241,247,0.50)' }}>

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
              Projetos / 04
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
              Projetos realizados em todo o Brasil
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Uma seleção dos nossos trabalhos mais relevantes em engenharia topográfica e geodésica.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-white border border-border overflow-hidden hover:border-primary/35 transition-all duration-200 cursor-pointer"
              style={{ borderRadius: '8px' }}
            >
              <div className="relative h-52 overflow-hidden" style={{ borderBottom: '1px solid #D0DAEA' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-all duration-300" />

                <div
                  className="absolute top-3 left-3 font-mono text-[10px] text-white px-2 py-1"
                  style={{ backgroundColor: 'rgba(26,35,50,0.7)', borderRadius: '4px' }}
                >
                  {project.id}
                </div>

                <div
                  className="absolute top-3 right-3 font-mono text-[10px] px-2 py-1"
                  style={{
                    backgroundColor: 'rgba(31,58,95,0.85)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  {project.category}
                </div>

                <AnimatePresence>
                  {hovered === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="absolute bottom-3 right-3 size-9 flex items-center justify-center"
                      style={{ backgroundColor: '#1F3A5F', borderRadius: '6px' }}
                    >
                      <ArrowUpRight className="size-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3" />
                  <span className="font-sans text-xs">{project.location}</span>
                  <span className="text-border mx-1">·</span>
                  <span className="font-mono text-xs text-muted-foreground/65">{project.area}</span>
                </div>

                <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                  {project.title}
                </h3>

                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: '1px solid #E8EFF6' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 text-muted-foreground/70"
                      style={{
                        backgroundColor: '#EDF1F7',
                        border: '1px solid #D0DAEA',
                        borderRadius: '4px',
                      }}
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
