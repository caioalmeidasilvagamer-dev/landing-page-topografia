'use client'

import { Phone, Mail } from 'lucide-react'

const services = [
  'Levantamento Topográfico',
  'Georreferenciamento Rural',
  'Locação de Obras',
  'Regularização Fundiária',
  'Aerolevantamento com Drone',
  'Cadastro Técnico',
]

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A2332', borderTop: '1px solid rgba(49,93,138,0.35)' }}>
      {/* Barra de acento no topo */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #1F3A5F 0%, #315D8A 50%, #1F3A5F 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Coluna 1: Identidade */}
          <div className="flex flex-col gap-5">
            {/* Logo com mira topográfica */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" className="size-8 flex-shrink-0" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="13" stroke="rgba(125,179,212,0.7)" strokeWidth="1.2" />
                <circle cx="16" cy="16" r="4" stroke="rgba(125,179,212,0.9)" strokeWidth="1.5" />
                <line x1="3" y1="16" x2="10" y2="16" stroke="rgba(125,179,212,0.7)" strokeWidth="1.2" />
                <line x1="22" y1="16" x2="29" y2="16" stroke="rgba(125,179,212,0.7)" strokeWidth="1.2" />
                <line x1="16" y1="3" x2="16" y2="10" stroke="rgba(125,179,212,0.7)" strokeWidth="1.2" />
                <line x1="16" y1="22" x2="16" y2="29" stroke="rgba(125,179,212,0.7)" strokeWidth="1.2" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-semibold text-[15px] tracking-tight" style={{ color: '#F0F4F8' }}>
                  GeoTech
                </span>
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(176,196,214,0.5)' }}>
                  Topografia
                </span>
              </div>
            </div>

            <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(176,196,214,0.65)' }}>
              Empresa especializada em topografia, georreferenciamento e engenharia de precisão.
              Equipamentos GNSS de última geração e equipe certificada CREA.
            </p>

            {/* Contato */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(176,196,214,0.65)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F4F8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.65)')}
              >
                <Phone className="size-3.5 flex-shrink-0" style={{ color: '#7DB3D4' }} />
                <span className="font-sans text-xs">(11) 99999-9999</span>
              </a>
              <a
                href="mailto:contato@geotech.com.br"
                className="flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(176,196,214,0.65)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F4F8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.65)')}
              >
                <Mail className="size-3.5 flex-shrink-0" style={{ color: '#7DB3D4' }} />
                <span className="font-sans text-xs">contato@geotech.com.br</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/geotech"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 flex items-center justify-center transition-all"
                style={{
                  border: '1px solid rgba(49,93,138,0.5)',
                  borderRadius: '6px',
                  color: 'rgba(176,196,214,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F0F4F8'
                  e.currentTarget.style.borderColor = 'rgba(125,179,212,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(176,196,214,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(49,93,138,0.5)'
                }}
                aria-label="Instagram"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/geotech"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 flex items-center justify-center transition-all"
                style={{
                  border: '1px solid rgba(49,93,138,0.5)',
                  borderRadius: '6px',
                  color: 'rgba(176,196,214,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F0F4F8'
                  e.currentTarget.style.borderColor = 'rgba(125,179,212,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(176,196,214,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(49,93,138,0.5)'
                }}
                aria-label="LinkedIn"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Serviços */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px" style={{ backgroundColor: '#315D8A' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7DB3D4' }}>
                Serviços
              </span>
            </div>
            {services.map((service) => (
              <a
                key={service}
                href="#servicos"
                className="font-sans text-xs transition-colors"
                style={{ color: 'rgba(176,196,214,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F4F8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.6)')}
              >
                {service}
              </a>
            ))}
          </div>

          {/* Coluna 3: Navegação */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px" style={{ backgroundColor: '#315D8A' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7DB3D4' }}>
                Navegação
              </span>
            </div>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs transition-colors"
                style={{ color: 'rgba(176,196,214,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F4F8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.6)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Coluna 4: Certificações */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px" style={{ backgroundColor: '#315D8A' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7DB3D4' }}>
                Certificações
              </span>
            </div>
            {[
              { code: 'CREA/CONFEA', label: 'Registro ativo' },
              { code: 'INCRA', label: 'Habilitado p/ Georreferenciamento' },
              { code: 'ANAC', label: 'Operação VANT certificada' },
              { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
              { code: 'SIRGAS2000', label: 'Datum Geodésico Oficial' },
            ].map(({ code, label }) => (
              <div key={code} className="pl-2.5" style={{ borderLeft: '2px solid rgba(49,93,138,0.55)' }}>
                <div className="font-mono text-[10px] font-medium" style={{ color: '#7DB3D4' }}>{code}</div>
                <div className="font-sans text-[10px] mt-0.5" style={{ color: 'rgba(176,196,214,0.5)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(49,93,138,0.3)' }}>
          <div className="font-mono text-[10px] text-center sm:text-left" style={{ color: 'rgba(176,196,214,0.35)' }}>
            © {new Date().getFullYear()} GeoTech Topografia Ltda. · CNPJ 00.000.000/0001-00 · Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="font-sans text-[11px] transition-colors" style={{ color: 'rgba(176,196,214,0.35)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(176,196,214,0.35)')}
            >
              Política de Privacidade
            </a>
            <div className="font-mono text-[10px]" style={{ color: 'rgba(176,196,214,0.2)' }}>·</div>
            <div className="font-mono text-[10px]" style={{ color: 'rgba(176,196,214,0.25)' }}>
              UTM 23S · SIRGAS2000
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
