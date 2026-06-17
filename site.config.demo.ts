import { SiteConfigSchema } from './lib/config-types'

const config = SiteConfigSchema.parse({
  sections: {
    navbar: true,
    hero: true,
    clientLogos: true,
    services: true,
    equipment: true,
    differentials: true,
    about: true,
    coverage: true,
    process: true,
    projects: true,
    googleRating: true,
    testimonials: true,
    blog: true,
    calculator: true,
    faq: true,
    contact: true,
    footer: true,
    whatsapp: true,
  },

  brand: {
    name: 'CartoPrime Topografia',
    slogan: 'Georreferenciamento & Soluções Geoespaciais',
  },

  colors: {
    primary: '#2D6A4F',
    foreground: '#1B1B1B',
    background: '#FAFDF7',
    muted: '#E8F5E9',
    secondary: '#D8F3DC',
    destructive: '#D00000',
    border: '#B7E4C7',
    topoLine: '#40916C',
    topoAccent: '#95D5B2',
    backgroundAlt: '#F0FAF0',
  },

  contact: {
    phone: '+55 (31) 98888-7777',
    email: 'contato@cartoprime.com.br',
    whatsapp: '5531988887777',
    address: 'Belo Horizonte, MG',
    hours: {
      weekdays: '07h30 às 17h30',
      saturday: '08h às 12h',
    },
    coverageRegions: [
      'Belo Horizonte (MG)',
      'Contagem (MG)',
      'Uberlândia (MG)',
      'Juiz de Fora (MG)',
      'Interior de MG',
      'São Paulo (SP)',
    ],
  },

  social: {
    instagram: 'https://instagram.com/cartoprime',
    linkedin: 'https://linkedin.com/company/cartoprime',
  },

  seo: {
    title: 'CartoPrime | Georreferenciamento & Soluções Geoespaciais',
    description:
      'Empresa especializada em georreferenciamento rural, levantamentos topográficos, mapeamento por drone e consultoria geoespacial em Minas Gerais e Brasil.',
    keywords: [
      'georreferenciamento',
      'topografia',
      'levantamento topográfico',
      'GNSS',
      'georreferenciamento INCRA',
      'drone mapeamento',
      'Belo Horizonte',
      'Minas Gerais',
    ],
  },

  hero: {
    badge: 'Incerteza zero em cada coordenada',
    headline: 'Georreferenciamento com precisão certificada pelo INCRA',
    subheadline:
      'Georreferenciamento de imóveis rurais, levantamentos topográficos, mapeamento por drone e consultoria geoespacial com rastreamento GNSS de dupla frequência.',
    stats: [
      { value: 1200, suffix: '+', label: 'Imóveis Certificados' },
      { value: 20, suffix: ' anos', label: 'De Experiência' },
      { value: 850, suffix: '+', label: 'Clientes Atendidos' },
    ],
    tags: [
      { icon: 'Satellite', label: 'Georreferenciamento' },
      { icon: 'Target', label: 'Levantamentos Topográficos' },
      { icon: 'Plane', label: 'Mapeamento por Drone' },
      { icon: 'FileText', label: 'Consultoria Geoespacial' },
    ],
    ctas: [
      { label: 'Solicitar Orçamento', href: '#contato' },
      { label: 'Falar no WhatsApp', href: 'https://wa.me/5531988887777' },
    ],
    certifications: [
      { code: 'INCRA 572', label: 'Georreferenciamento Rural' },
      { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
      { code: 'CREA/MG', label: 'Habilitação Profissional' },
      { code: 'ISO 9001', label: 'Gestão da Qualidade' },
    ],
  },

  services: {
    headline: 'Georreferenciamento & Soluções Geoespaciais',
    description: 'Do levantamento em campo à certificação final, oferecemos serviços integrados de topografia e consultoria geoespacial com tecnologia de ponta.',
    items: [
    {
      icon: 'Satellite',
      code: 'CP-01',
      title: 'Georreferenciamento Rural',
      description:
        'Certificação de imóveis rurais conforme padrão INCRA 572, com receptores GNSS geodésicos L1/L2 e processamento em base diferencial.',
      specs: ['Padrão INCRA 572', 'SIGEF/SNCR', 'Certificado pelo INCRA'],
    },
    {
      icon: 'Compass',
      code: 'CP-02',
      title: 'Levantamento Topográfico',
      description:
        'Levantamentos planialtimétricos com precisão milimétrica para engenharia civil, agrimensura e projetos de infraestrutura.',
      specs: ['Precisão ±3mm', 'Entrega em DWG/DXF', 'Relatório NBR 13.133'],
    },
    {
      icon: 'Plane',
      code: 'CP-03',
      title: 'Mapeamento por Drone',
      description:
        'Aerolevantamento com VANTs de alta resolução para geração de ortofotos, modelos digitais e nuvens de pontos 3D.',
      specs: ['GSD até 2cm', 'Câmera 61MP', 'ANAC homologado'],
    },
    {
      icon: 'Building2',
      code: 'CP-04',
      title: 'Locação de Obras',
      description:
        'Implantação de projetos em campo com precisão milimétrica, garantindo que estruturas sejam executadas conforme o projeto.',
      specs: ['Locação estrutural', 'Nivelamento de precisão', 'Acompanhamento'],
    },
    {
      icon: 'Map',
      code: 'CP-05',
      title: 'Cadastro Técnico Rural',
      description:
        'Elaboração de cadastro técnico rural para fins de tributação, crédito rural e programas governamentais.',
      specs: ['CAR/SNCR', 'Georreferenciamento', 'Compatível INCRA'],
    },
    {
      icon: 'FileCheck',
      code: 'CP-06',
      title: 'Consultoria Geoespacial',
      description:
        'Análise de viabilidade, estudos de solo e planejamento territorial com dados geoespaciais de alta precisão.',
      specs: ['SIG/GIS', 'Análise de viabilidade', 'Planejamento territorial'],
    },
    ],
  },

  equipment: [
    {
      icon: 'Satellite',
      model: 'GNSS Geodésico L1/L2',
      name: 'Trimble R10 / Leica GS18',
      description:
        'Receptor com rastreamento L1/L2 em todas as constelações. Precisão horizontal ±2mm + 0.5ppm.',
      specs: ['Precisão ±2mm + 0.5ppm', 'GPS/GLONASS/Galileo/BeiDou', 'RTK e PPP'],
    },
    {
      icon: 'ScanLine',
      model: 'Estação Total Robotizada',
      name: 'Leica TS16 / Topcon GT-1200',
      description:
        'Medição angular e distância com alcance de 3.500m sem prisma e precisão angular de 1″.',
      specs: ['Alcance 3.500m sem prisma', 'Precisão angular 1″', 'Rastreamento automático'],
    },
    {
      icon: 'Plane',
      model: 'VANT Mapeamento',
      name: 'DJI Mavic 3 Enterprise',
      description:
        'Câmera 61MP, sensor mecânico de obturação, RTK integrado. GSD de 2cm a 80m de altitude.',
      specs: ['Câmera 61MP', 'GSD 2cm a 80m', 'RTK integrado'],
    },
    {
      icon: 'Waves',
      model: 'Scanner 3D Portátil',
      name: 'Leica BLK360',
      description:
        'Varredura 3D compacta, 360.000 pontos/seg, alcance 45m, ideal para interiores e fachadas.',
      specs: ['360K pontos/seg', 'Alcance 45m', '360° horizontal'],
    },
  ],

  differentials: [
    {
      icon: 'Crosshair',
      title: 'Precisão Geodésica Certificada',
      description:
        'Receptores GNSS geodésicos de última geração com processamento em base diferencial e rastreamento multi-constelação.',
      metric: '±2mm',
      metricLabel: 'Precisão posicional',
    },
    {
      icon: 'Users',
      title: 'Engenheiros Cartógrafos',
      description:
        'Equipe com registro ativo no CREA/CONFEA, especializada em georreferenciamento e levantamentos topográficos.',
      metric: '25+',
      metricLabel: 'Profissionais certificados',
    },
    {
      icon: 'MapPin',
      title: 'Cobertura Nacional',
      description:
        'Atendemos todos os estados brasileiros com mobilização rápida e equipe técnica em campo.',
      metric: '27',
      metricLabel: 'Estados atendidos',
    },
    {
      icon: 'Clock',
      title: 'Entrega em 48h',
      description:
        'Processamento interno com software geodésico profissional. Relatórios técnicos entregues em até 48h.',
      metric: '48h',
      metricLabel: 'Prazo mínimo de entrega',
    },
    {
      icon: 'ShieldCheck',
      title: '100% INCRA Aprovado',
      description:
        'Todos os georreferenciamentos são aprovados na primeira análise do INCRA. Zero retrabalho.',
      metric: '100%',
      metricLabel: 'Taxa de aprovação INCRA',
    },
  ],

  about: {
    headline: 'Precisão geodésica com foco no seu projeto',
    engineer: 'Eng. Marcos Vinícius Almeida',
    creNumber: 'CREA-MG 789.012/D',
    foundedYear: '2004',
    experienceText: '20 anos de mercado',
    credentials: [
      {
        icon: 'ShieldCheck',
        title: 'Eng. Responsável',
        name: 'Eng. Marcos Vinícius Almeida',
        detail: 'CREA-MG 789.012/D · Engenheiro Cartógrafo',
      },
      {
        icon: 'Award',
        title: 'Registro Profissional',
        name: 'CREA/MG · INCRA habilitado',
        detail: 'Execução própria — sem terceirização',
      },
      {
        icon: 'Users',
        title: 'Equipe Técnica',
        name: '25 profissionais ativos',
        detail: 'Engenheiros, agrimensores e operadores certificados',
      },
    ],
    stats: [
      { value: '+1200', label: 'imóveis certificados' },
      { value: '+20', label: 'anos' },
      { value: '25', label: 'profissionais' },
      { value: '27', label: 'estados' },
    ],
    paragraphs: [
      'Fundada em 2004, a CartoPrime Topografia se consolidou como referência em georreferenciamento rural e soluções geoespaciais no Brasil. Com mais de 1.200 imóveis certificados pelo INCRA e 20 anos de atuação, oferecemos soluções técnicas completas para o agronegócio, engenharia e gestão territorial.',
      'Nossa equipe é formada por engenheiros cartógrafos, agrimensores e técnicos especializados em SIG, todos com registro ativo no CREA/CONFEA. Utilizamos equipamentos geodésicos de última geração — receptores GNSS L1/L2, estações totais robotizadas e drones de mapeamento — para garantir a máxima precisão em cada projeto.',
    ],
  },

  projects: [
    {
      id: 'CP-P001',
      title: 'Georreferenciamento — Fazenda Ipê Amarelo',
      category: 'Georreferenciamento',
      location: 'Triângulo Mineiro, MG',
      area: '6.500 ha',
      description:
        'Georreferenciamento e certificação INCRA de propriedade rural de 6.500 ha com receptores GNSS geodésicos e processamento diferencial.',
      image: '/images/project-gnss.png',
      tags: ['GNSS', 'INCRA', 'SIGEF'],
    },
    {
      id: 'CP-P002',
      title: 'Mapeamento Aéreo — Parque Industrial',
      category: 'Mapeamento por Drone',
      location: 'Contagem, MG',
      area: '320 ha',
      description:
        'Aerolevantamento com VANT de 320 ha para geração de ortofoto (GSD 2cm), MDT e curvas de nível para projeto de expansão industrial.',
      image: '/images/project-aerial.png',
      tags: ['Drone', 'Ortofoto', 'MDT'],
    },
    {
      id: 'CP-P003',
      title: 'Levantamento Topográfico — Loteamento Verde',
      category: 'Topografia Urbana',
      location: 'Uberlândia, MG',
      area: '45 ha',
      description:
        'Levantamento planialtimétrico e projeto de parcelamento urbano de 45 ha com 280 lotes, aprovação junto à Prefeitura Municipal.',
      image: '/images/project-loteamento.png',
      tags: ['Loteamento', 'Parcelamento', 'NBR 13.133'],
    },
    {
      id: 'CP-P004',
      title: 'Locação de Obra — Centro Empresarial',
      category: 'Locação de Obras',
      location: 'Belo Horizonte, MG',
      area: '18.000 m²',
      description:
        'Locação e monitoramento de obras de um centro empresarial de 18.000 m², incluindo implantação de pilares, laje e estrutura metálica.',
      image: '/images/project-obra.png',
      tags: ['Locação', 'Estrutura', 'Monitoramento'],
    },
  ],

  testimonials: [
    {
      id: 1,
      name: 'Engenheiro Pedro Henrique Santos',
      role: 'Diretor de Projetos',
      company: 'Construtora Serra Verde',
      rating: 5,
      text: 'A CartoPrime georreferenciou nossa propriedade de 4.200 ha com uma precisão impressionante. O certificado INCRA foi aprovado na primeira análise.',
      location: 'Belo Horizonte, MG',
      project: 'Georreferenciamento — 4.200 ha',
    },
    {
      id: 2,
      name: 'Carlos Eduardo Lima',
      role: 'Proprietário Rural',
      company: 'Fazenda São José',
      rating: 5,
      text: 'Precisava regularizar minha fazenda de 2.800 ha junto ao INCRA. A equipe conduziu todo o processo com profissionalismo e agilidade.',
      location: 'Uberlândia, MG',
      project: 'Georreferenciamento Rural — 2.800 ha',
    },
    {
      id: 3,
      name: 'Arq. Ana Beatriz Costa',
      role: 'Gerente de Incorporação',
      company: 'Incorporadora Vale',
      rating: 5,
      text: 'Utilizamos a CartoPrime no levantamento topográfico do nosso novo empreendimento. A qualidade dos arquivos DWG entregues facilitou imensamente o trabalho.',
      location: 'Contagem, MG',
      project: 'Topografia Urbana — Loteamento',
    },
    {
      id: 4,
      name: 'Dr. Fernando Augusto Mendes',
      role: 'Superintendente de Operações',
      company: 'Mineração Vale do Aço',
      rating: 5,
      text: 'Para nosso projeto de expansão precisávamos de mapeamento aéreo de alta resolução. A CartoPrime entregou ortofotos com GSD de 2cm, superando expectativas.',
      location: 'Itabira, MG',
      project: 'Mapeamento Aéreo — 1.200 ha',
    },
  ],

  clientLogos: {
    row1: [
      'Construtora Serra Verde',
      'Agro Ipê Amarelo',
      'Incorporadora Vale',
      'Mineração Vale do Aço',
      'Fazenda São José',
      'Logística Minas Gerais',
      'Grupo Triângulo',
    ],
    row2: [
      'GLP Logística',
      'Engenharia Prime',
      'Prefeitura de Contagem',
      'Agro Triângulo',
      'Construtora Serra',
      'Engenharia MG',
      'Incorporadora Horizonte',
    ],
  },

  googleRating: {
    rating: 4.8,
    reviewCount: 203,
    reviews: [
      {
        name: 'Roberto Carvalho',
        initial: 'R',
        text: 'Georreferenciamento aprovado na primeira análise. Equipe extremamente competente e ágil.',
      },
      {
        name: 'Mariana Oliveira',
        initial: 'M',
        text: 'Serviço de levantamento topográfico impecável. Documentação completa e dentro do prazo.',
      },
    ],
  },

  faq: {
    headline: 'Perguntas Frequentes',
    certifications: [
      'INCRA 572',
      'NBR 13.133',
      'CREA/MG',
      'ISO 9001',
      'SIGEF',
    ],
    items: [
      {
        id: 'cp-q1',
        question: 'Qual o prazo para georreferenciamento de imóvel rural?',
        answer:
          'O prazo varia conforme a área e complexidade. Imóveis de até 500 ha são concluídos em 10 a 15 dias úteis. Áreas maiores podem demandar de 15 a 30 dias úteis.',
      },
      {
        id: 'cp-q2',
        question: 'Quais documentos são necessários para o georreferenciamento?',
        answer:
          'Carta de AR, certidão de matrícula atualizada, documento de identidade e CPF do proprietário, comprovante de residência e planta de localização do imóvel.',
      },
      {
        id: 'cp-q3',
        question: 'A CartoPrime atende fora de Minas Gerais?',
        answer:
          'Sim! Atendemos todos os estados brasileiros. Para projetos fora de MG, avaliamos a viabilidade e custos de deslocamento.',
      },
      {
        id: 'cp-q4',
        question: 'O que é SIGEF e como funciona?',
        answer:
          'SIGEF é o Sistema de Gestão Fundiária do INCRA. É o sistema onde o georreferenciamento é registrado e certificado. Nós executamos todo o processo, desde o levantamento em campo até o registro no SIGEF.',
      },
      {
        id: 'cp-q5',
        question: 'Qual a diferença entre georreferenciamento e levantamento topográfico?',
        answer:
          'O georreferenciamento determina as coordenadas geodésicas de um imóvel rural. O levantamento topográfico mapeia o terreno em detalhes (curvas de nível, cotas, volumes).',
      },
      {
        id: 'cp-q6',
        question: 'Vocês trabalham com mapeamento por drone?',
        answer:
          'Sim! Utilizamos drones de mapeamento de alta resolução para gerar ortofotos, modelos digitais e nuvens de pontos 3D. Ideal para grandes áreas e projetos de engenharia.',
      },
    ],
  },

  process: [
    {
      number: '01',
      icon: 'ClipboardList',
      title: 'Solicitação',
      description:
        'Análise da demanda, definição do escopo técnico, emissão de proposta comercial com especificações completas.',
      detail: 'Proposta em até 24h',
    },
    {
      number: '02',
      icon: 'MapPinned',
      title: 'Visita Técnica',
      description:
        'Reconhecimento do terreno, avaliação de acesso, identificação de marcos geodésicos e planejamento logístico.',
      detail: 'Agendamento flexível',
    },
    {
      number: '03',
      icon: 'Scan',
      title: 'Levantamento',
      description:
        'Execução em campo com equipamentos GNSS de dupla frequência. Coleta de pontos geodésicos e coordenadas.',
      detail: 'RTK em tempo real',
    },
    {
      number: '04',
      icon: 'Cpu',
      title: 'Processamento',
      description:
        'Processamento em software geodésico, ajustamento de redes, geração de memorial descritivo georreferenciado.',
      detail: 'Trimble Business Center',
    },
    {
      number: '05',
      icon: 'PackageCheck',
      title: 'Certificação',
      description:
        'Registro no SIGEF/SNCR, emissão de certificado INCRA, entrega de documentação completa e ART/RRT.',
      detail: 'Certificado INCRA incluso',
    },
  ],

  coverage: [
    { abbr: 'AC', name: 'Acre', served: false },
    { abbr: 'AL', name: 'Alagoas', served: false },
    { abbr: 'AP', name: 'Amapá', served: false },
    { abbr: 'AM', name: 'Amazonas', served: false },
    { abbr: 'BA', name: 'Bahia', served: true },
    { abbr: 'CE', name: 'Ceará', served: false },
    { abbr: 'DF', name: 'Distrito Federal', served: true },
    { abbr: 'ES', name: 'Espírito Santo', served: true },
    { abbr: 'GO', name: 'Goiás', served: true },
    { abbr: 'MA', name: 'Maranhão', served: false },
    { abbr: 'MT', name: 'Mato Grosso', served: true },
    { abbr: 'MS', name: 'Mato Grosso do Sul', served: true },
    { abbr: 'MG', name: 'Minas Gerais', served: true },
    { abbr: 'PA', name: 'Pará', served: false },
    { abbr: 'PB', name: 'Paraíba', served: false },
    { abbr: 'PR', name: 'Paraná', served: true },
    { abbr: 'PE', name: 'Pernambuco', served: true },
    { abbr: 'PI', name: 'Piauí', served: false },
    { abbr: 'RJ', name: 'Rio de Janeiro', served: true },
    { abbr: 'RN', name: 'Rio Grande do Norte', served: false },
    { abbr: 'RS', name: 'Rio Grande do Sul', served: true },
    { abbr: 'RO', name: 'Rondônia', served: false },
    { abbr: 'RR', name: 'Roraima', served: false },
    { abbr: 'SC', name: 'Santa Catarina', served: true },
    { abbr: 'SP', name: 'São Paulo', served: true },
    { abbr: 'SE', name: 'Sergipe', served: false },
    { abbr: 'TO', name: 'Tocantins', served: false },
  ],

  calculator: {
    serviceOptions: [
      'Georreferenciamento Rural',
      'Levantamento Topográfico',
      'Mapeamento por Drone',
      'Locação de Obras',
      'Cadastro Técnico',
      'Consultoria Geoespacial',
    ],
    purposeOptions: [
      'Certificação INCRA',
      'Engenharia Civil',
      'Agronegócio',
      'Loteamento Urbano',
      'Projeto de Irrigação',
      'Outro',
    ],
    pricing: {
      'Georreferenciamento Rural': { pricePerHa: 110, minDays: 10, maxDays: 25, equipment: 'GNSS Geodésico L1/L2' },
      'Levantamento Topográfico': { pricePerHa: 200, minDays: 2, maxDays: 5, equipment: 'GNSS RTK + Estação Total' },
      'Mapeamento por Drone': { pricePerHa: 55, minDays: 3, maxDays: 10, equipment: 'DJI Mavic 3 Enterprise' },
      'Locação de Obras': { pricePerHa: 0, minDays: 1, maxDays: 3, equipment: 'Estação Total Robotizada', fixedPrice: 2800 },
      'Cadastro Técnico': { pricePerHa: 130, minDays: 5, maxDays: 12, equipment: 'GNSS RTK + SIG' },
      'Consultoria Geoespacial': { pricePerHa: 0, minDays: 1, maxDays: 5, equipment: 'Software GIS/SIG', fixedPrice: 5000 },
    },
  },

  blog: [
    {
      category: 'Georreferenciamento',
      categoryColor: '#2D6A4F',
      topColor: '#E8F5E9',
      title: 'Georreferenciamento INCRA 2025: mudanças no processo de certificação',
      excerpt:
        'As principais mudanças no processo de georreferenciamento rural implementadas pelo INCRA em 2025 e como elas afetam produtores rurais.',
      date: '15 Mai 2025',
      readTime: '8 min',
    },
    {
      category: 'Tecnologia',
      categoryColor: '#1F3A5F',
      topColor: '#EDF1F7',
      title: 'Drone vs Estação Total: quando usar cada equipamento?',
      excerpt:
        'Comparativo técnico entre levantamento por drone e estação total. Analisamos custo, precisão e aplicabilidade para diferentes projetos.',
      date: '02 Abr 2025',
      readTime: '10 min',
    },
    {
      category: 'Fundamentos',
      categoryColor: '#D97706',
      topColor: '#FAEEDA',
      title: 'Coordenadas geodésicas: como funcionam e por que são importantes?',
      excerpt:
        'Entenda o sistema de coordenadas geodésicas, datum SIRGAS 2000 e como eles influenciam na precisão do georreferenciamento.',
      date: '20 Mar 2025',
      readTime: '6 min',
    },
  ],

  whatsapp: {
    number: '5531988887777',
    message: 'Olá! Gostaria de solicitar um orçamento de georreferenciamento.',
  },

  navLinks: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ],

  footer: {
    description: 'Georreferenciamento certificado pelo INCRA e soluções geoespaciais com precisão geodésica.',
    certifications: [
      { code: 'CREA-MG 789.012/D', label: 'Eng. Responsável' },
      { code: 'INCRA Habilitado', label: 'Georreferenciamento' },
      { code: 'ISO 9001:2015', label: 'Gestão da Qualidade' },
      { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
      { code: 'ANAC SARP', label: 'Mapeamento por Drone' },
    ],
  },

  footerLinks: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ],

  footerServices: [
    'Georreferenciamento Rural',
    'Levantamento Topográfico',
    'Mapeamento por Drone',
    'Consultoria Geoespacial',
    'Cadastro Técnico Rural',
    'Locação de Obras',
  ],
})

export default config
