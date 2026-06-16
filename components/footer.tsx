import { MapPin, Phone, Mail } from 'lucide-react'

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
    <footer className="relative border-t border-border/40 bg-card/30">
      {/* Linha de acento no topo */}
      <div className="h-px bg-primary/20 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Identidade */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative size-8 flex items-center justify-center">
                <div className="absolute inset-0 border border-primary/60 rounded-sm rotate-45" />
                <MapPin className="size-4 text-primary relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-700 text-[15px] text-foreground tracking-tight">
                  GeoTech
                </span>
                <span className="font-mono text-[9px] text-muted-foreground tracking-[0.2em] uppercase">
                  Topografia
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Empresa especializada em topografia, georreferenciamento e engenharia de precisão.
              Equipamentos GNSS de última geração e equipe certificada CREA.
            </p>

            {/* Dados de contato */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Phone className="size-3.5 text-primary flex-shrink-0" />
                <span className="font-sans text-xs">(11) 99999-9999</span>
              </a>
              <a
                href="mailto:contato@geotech.com.br"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="size-3.5 text-primary flex-shrink-0" />
                <span className="font-sans text-xs">contato@geotech.com.br</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/geotech"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 flex items-center justify-center border border-border/50 rounded-[6px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
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
                className="size-8 flex items-center justify-center border border-border/50 rounded-[6px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
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
              <div className="w-4 h-px bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                Serviços
              </span>
            </div>
            {services.map((service) => (
              <a
                key={service}
                href="#servicos"
                className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {service}
              </a>
            ))}
          </div>

          {/* Coluna 3: Navegação */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                Navegação
              </span>
            </div>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Coluna 4: Normas e Certificações */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
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
              <div key={code} className="petroleum-accent pl-2.5">
                <div className="font-mono text-[10px] text-primary">{code}</div>
                <div className="font-sans text-[10px] text-muted-foreground/70 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-14 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-muted-foreground/50 text-center sm:text-left">
            © {new Date().getFullYear()} GeoTech Topografia Ltda. · CNPJ 00.000.000/0001-00 · Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="font-sans text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Política de Privacidade
            </a>
            <div className="font-mono text-[10px] text-muted-foreground/30">·</div>
            <div className="font-mono text-[10px] text-muted-foreground/30">
              UTM 23S · SIRGAS2000
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
