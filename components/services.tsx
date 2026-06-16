'use client'

import { motion } from 'framer-motion'
import {
  Compass,
  Satellite,
  Building2,
  FileCheck,
  Plane,
  Map,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  icon: LucideIcon
  code: string
  title: string
  description: string
  specs: string[]
}

const services: Service[] = [
  {
    icon: Compass,
    code: 'SRV-01',
    title: 'Levantamento Topográfico',
    description:
      'Levantamentos planialtimétricos e cadastrais com estações totais e equipamentos GNSS de alta precisão, para projetos de engenharia civil, ambiental e rural.',
    specs: ['Precisão ±5mm', 'Entrega em DWG/DXF', 'Relatório NBR 13.133'],
  },
  {
    icon: Satellite,
    code: 'SRV-02',
    title: 'Georreferenciamento Rural',
    description:
      'Georreferenciamento de imóveis rurais conforme padrão INCRA, com receptores GNSS geodésicos de dupla frequência e processamento em base diferencial.',
    specs: ['Padrão INCRA 572', 'SIGEF/SNCR', 'Certificado pelo INCRA'],
  },
  {
    icon: Building2,
    code: 'SRV-03',
    title: 'Locação de Obras',
    description:
      'Implantação de projetos em campo com rigor milimétrico, garantindo que fundações, estruturas e infraestruturas sejam executadas conforme o projeto.',
    specs: ['Locação estrutural', 'Nivelamento de precisão', 'Acompanhamento de obra'],
  },
  {
    icon: FileCheck,
    code: 'SRV-04',
    title: 'Regularização Fundiária',
    description:
      'Assessoria técnica completa para regularização de imóveis urbanos e rurais, desde o levantamento até a aprovação nos órgãos competentes.',
    specs: ['REURB urbano', 'Regularização rural', 'Memorial descritivo'],
  },
  {
    icon: Plane,
    code: 'SRV-05',
    title: 'Aerolevantamento com Drone',
    description:
      'Levantamentos aerofotogramétricos com VANTs homologados pela ANAC, gerando ortofotos, modelos digitais de superfície e nuvens de pontos 3D.',
    specs: ['Ortofoto GSD 3cm', 'Nuvem de pontos 3D', 'Modelo Digital Terreno'],
  },
  {
    icon: Map,
    code: 'SRV-06',
    title: 'Cadastro Técnico',
    description:
      'Cadastro técnico multifinalitário de imóveis e infraestrutura, com georreferenciamento, banco de dados espacial e integração com sistemas GIS.',
    specs: ['SIG/GIS integrado', 'Banco de dados espacial', 'Relatórios personalizados'],
  },
]

const VP = { once: true, amount: 0.05 } as const

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative bg-white border border-border hover:border-primary/40 transition-all duration-200 overflow-hidden"
      style={{ borderRadius: '8px' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-10 flex items-center justify-center border border-primary/15 group-hover:border-primary/30 transition-colors"
              style={{ borderRadius: '6px', backgroundColor: '#EDF1F7' }}
            >
              <Icon className="size-5 text-primary" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/50">
              {service.code}
            </span>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground/25 group-hover:text-primary/50 transition-colors" />
        </div>

        <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
          {service.title}
        </h3>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        <div className="pt-3 flex flex-wrap gap-x-4 gap-y-1.5" style={{ borderTop: '1px solid #E8EFF6' }}>
          {service.specs.map((spec) => (
            <div key={spec} className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-primary/50" />
              <span className="font-mono text-[10px] text-muted-foreground/70">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32 bg-background">
      <div className="absolute inset-0 technical-grid" />

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
              Serviços / 01
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
              Soluções técnicas para cada demanda de campo
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Desde o levantamento inicial até a entrega dos documentos finais,
              cobrimos todas as etapas do processo topográfico e geodésico.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, index) => (
            <ServiceCard key={service.code} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
