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
    name: 'GeoTech Topografia',
    slogan: 'Topografia & Georreferenciamento',
  },

  colors: {
    primary: '#1F3A5F',
    foreground: '#1A2332',
    background: '#F8FAFC',
    muted: '#EDF1F7',
    secondary: '#E8EFF6',
    destructive: '#E20613',
    border: '#D0DAEA',
    topoLine: '#315D8A',
    topoAccent: '#7DB3D4',
    backgroundAlt: '#F0F4F8',
  },

  contact: {
    phone: '+55 (11) 99999-9999',
    email: 'contato@geotech.com.br',
    whatsapp: '5511999999999',
    address: 'São Paulo, SP',
    hours: {
      weekdays: '08h às 18h',
      saturday: '08h às 12h',
    },
    coverageRegions: [
      'São Paulo (SP)',
      'Campinas (SP)',
      'Sorocaba (SP)',
      'Santos (SP)',
      'Jundiaí (SP)',
      'Interior de SP',
    ],
  },

  social: {
    instagram: 'https://instagram.com/geotech',
    linkedin: 'https://linkedin.com/company/geotech',
  },

  seo: {
    title: 'GeoTech | Topografia & Georreferenciamento',
    description:
      'Empresa especializada em levantamentos topográficos, georreferenciamento rural, locação de obras e regularização fundiária com precisão GNSS certificada.',
    keywords: [
      'topografia',
      'georreferenciamento',
      'levantamento topográfico',
      'GNSS',
      'RTK',
      'locação de obras',
      'regularização fundiária',
      'INCRA',
      'São Paulo',
    ],
  },

  hero: {
    badge: 'Precisão GNSS Certificada',
    headline: 'Precisão em Topografia para Seu Projeto',
    subheadline:
      'Levantamentos planialtimétricos, georreferenciamento rural, locação de obras e regularização fundiária com equipamentos de alta precisão e equipe certificada.',
    stats: [
      { value: 850, suffix: '+', label: 'Projetos Realizados' },
      { value: 15, suffix: ' anos', label: 'De Experiência' },
      { value: 620, suffix: '+', label: 'Clientes Atendidos' },
    ],
    tags: [
      { icon: 'Target', label: 'Levantamentos Topográficos' },
      { icon: 'Layers', label: 'Georreferenciamento' },
      { icon: 'Home', label: 'Locação de Obras' },
      { icon: 'FileText', label: 'Regularização Fundiária' },
    ],
    ctas: [
      { label: 'Solicitar Orçamento', href: '#contato' },
      { label: 'Falar no WhatsApp', href: 'https://wa.me/5511999999999' },
    ],
    certifications: [
      { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
      { code: 'INCRA 572', label: 'Georreferenciamento Rural' },
      { code: 'ISO 9001', label: 'Gestão da Qualidade' },
      { code: 'CREA/CAU', label: 'Habilitação Profissional' },
    ],
  },

  services: {
    headline: 'Soluções Completas para seu Projeto',
    description: 'Do levantamento ao projeto final, oferecemos serviços integrados de topografia e engenharia com tecnologia de ponta.',
    items: [
    {
      icon: 'Compass',
      code: 'SRV-01',
      title: 'Levantamento Topográfico',
      description:
        'Levantamentos planialtimétricos e cadastrais com estações totais e equipamentos GNSS de alta precisão, para projetos de engenharia civil, ambiental e rural.',
      specs: ['Precisão ±5mm', 'Entrega em DWG/DXF', 'Relatório NBR 13.133'],
    },
    {
      icon: 'Satellite',
      code: 'SRV-02',
      title: 'Georreferenciamento Rural',
      description:
        'Georreferenciamento de imóveis rurais conforme padrão INCRA, com receptores GNSS geodésicos de dupla frequência e processamento em base diferencial.',
      specs: ['Padrão INCRA 572', 'SIGEF/SNCR', 'Certificado pelo INCRA'],
    },
    {
      icon: 'Building2',
      code: 'SRV-03',
      title: 'Locação de Obras',
      description:
        'Implantação de projetos em campo com rigor milimétrico, garantindo que fundações, estruturas e infraestruturas sejam executadas conforme o projeto.',
      specs: ['Locação estrutural', 'Nivelamento de precisão', 'Acompanhamento de obra'],
    },
    {
      icon: 'FileCheck',
      code: 'SRV-04',
      title: 'Regularização Fundiária',
      description:
        'Processo completo de regularização de imóveis rurais e urbanos, desde o levantamento topográfico até a obtenção de certidões e registros.',
      specs: ['Certificado INCRA', 'Memorial Descritivo', 'Registro em Cartório'],
    },
    {
      icon: 'Plane',
      code: 'SRV-05',
      title: 'Aerolevantamento com Drone',
      description:
        'Levantamento aerofotogramétrico com VANTs equipados com câmeras métricas para geração de ortofotos, modelos digitais e curvas de nível.',
      specs: ['GSD até 3cm', 'Câmera 45MP', 'Homologado ANAC'],
    },
    {
      icon: 'Map',
      code: 'SRV-06',
      title: 'Cadastro Técnico Rural',
      description:
        'Elaboração de cadastro técnico rural para fins de tributação, crédito rural e programas governamentais, com levantamento e mapeamento da propriedade.',
      specs: ['CAR/SNCR', 'Georreferenciamento', 'Compatível INCRA'],
    },
    ],
  },

  equipment: [
    {
      icon: 'Satellite',
      model: 'GNSS RTK Geodésico',
      name: 'Trimble R12i / Leica GS18 T',
      description:
        'Receptor com rastreamento L1/L2/L5 em todas as constelações GNSS. Precisão horizontal ±3mm + 0.5ppm.',
      specs: ['Precisão ±3mm + 0.5ppm', 'Constelações GPS/GLONASS/Galileo/BeiDou', 'Correção RTK e PPP'],
    },
    {
      icon: 'ScanLine',
      model: 'Estação Total Robotizada',
      name: 'Leica TS16 / Topcon GT-1200',
      description:
        'Medição angular e distância com alcance de 3.500m sem prisma e precisão angular de 1″.',
      specs: ['Alcance 3.500m sem prisma', 'Precisão angular 1″', 'Rastreamento automático de prisma'],
    },
    {
      icon: 'Plane',
      model: 'VANT Aerofotogramétrico',
      name: 'DJI Matrice 350 RTK + Zenmuse P1',
      description:
        'Câmera 45MP full-frame, homologada ANAC. GSD de 3cm a 120m de altitude.',
      specs: ['Câmera 45MP full-frame', 'GSD 3cm a 120m', 'ANAC homologado SARP'],
    },
    {
      icon: 'Waves',
      model: 'Laser Scanner 3D',
      name: 'Leica RTC360',
      description:
        'Varredura 3D de alta velocidade (2 milhões pontos/seg), alcance 130m, ideal para plantas industriais.',
      specs: ['2M pontos por segundo', 'Alcance 130m', 'Precisão 3D ±1.9mm'],
    },
  ],

  differentials: [
    {
      icon: 'Crosshair',
      title: 'Equipamentos de Alta Precisão',
      description:
        'Receptores GNSS geodésicos Trimble e Leica, estações totais robotizadas e drones aerofotogramétricos DJI com câmeras métricas.',
      metric: '±5mm',
      metricLabel: 'Precisão posicional',
    },
    {
      icon: 'Users',
      title: 'Equipe Especializada',
      description:
        'Engenheiros cartógrafos, agrimensores e técnicos em georreferenciamento com registro ativo no CREA/CONFEA.',
      metric: '18+',
      metricLabel: 'Profissionais certificados',
    },
    {
      icon: 'MapPin',
      title: 'Atendimento Regional',
      description:
        'Cobertura nos estados do Sudeste, Centro-Oeste e Sul do Brasil. Mobilização rápida para qualquer município.',
      metric: '12',
      metricLabel: 'Estados atendidos',
    },
    {
      icon: 'Clock',
      title: 'Entrega Ágil',
      description:
        'Processamento interno com software GIS e CAD profissional. Relatórios técnicos entregues no menor prazo do mercado.',
      metric: '5 dias',
      metricLabel: 'Prazo médio de entrega',
    },
    {
      icon: 'ShieldCheck',
      title: 'Conformidade Técnica',
      description:
        'Todos os trabalhos seguem as normas NBR 13.133, INCRA 572, e demais especificações técnicas do IBGE.',
      metric: '100%',
      metricLabel: 'Conformidade normativa',
    },
  ],

  about: {
    headline: 'Engenharia de precisão com foco no seu projeto',
    engineer: 'Eng. Rafael Moreira Costa',
    creNumber: 'CREA-SP 123.456/D',
    foundedYear: '2009',
    experienceText: '15 anos de mercado',
    credentials: [
      {
        icon: 'ShieldCheck',
        title: 'Eng. Responsável',
        name: 'Eng. Rafael Moreira Costa',
        detail: 'CREA-SP 123.456/D · Cartógrafo',
      },
      {
        icon: 'Award',
        title: 'Registro Profissional',
        name: 'CREA/SP · INCRA habilitado',
        detail: 'Execução própria — sem terceirização',
      },
      {
        icon: 'Users',
        title: 'Equipe Técnica',
        name: '18 profissionais ativos',
        detail: 'Engenheiros, agrimensores e operadores certificados',
      },
    ],
    stats: [
      { value: '+850', label: 'projetos' },
      { value: '+15', label: 'anos' },
      { value: '18', label: 'profissionais' },
      { value: '12', label: 'estados' },
    ],
    paragraphs: [
      'Fundada em 2009, a GeoTech Topografia se consolidou como referência em levantamentos topográficos e georreferenciamento no Brasil. Com mais de 850 projetos realizados e 15 anos de atuação, oferecemos soluções técnicas completas para engenharia civil, agropecuária e gestão fundiária.',
      'Nossa equipe é formada por engenheiros cartógrafos, agrimensores e técnicos especializados, todos com registro ativo no CREA/CONFEA. Utilizamos equipamentos de última geração — receptores GNSS geodésicos, estações totais robotizadas e drones aerofotogramétricos — para garantir a máxima precisão em cada projeto.',
    ],
  },

  projects: [
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
  ],

  testimonials: [
    {
      id: 1,
      name: 'Engenheiro Carlos Mendes',
      role: 'Diretor de Projetos',
      company: 'Construtora Alpha',
      rating: 5,
      text: 'A GeoTech entregou o levantamento topográfico do nosso canteiro de obras com uma precisão impressionante. O relatório técnico estava em conformidade total com as normas ABNT.',
      location: 'São Paulo, SP',
      project: 'Locação de Obras — Edifício Comercial',
    },
    {
      id: 2,
      name: 'Ricardo Souza',
      role: 'Proprietário Rural',
      company: 'Fazenda Bom Retiro',
      rating: 5,
      text: 'Precisava georreferenciar minha propriedade de 3.200 ha para regularização junto ao INCRA. A equipe conduziu todo o processo com profissionalismo.',
      location: 'Goiás',
      project: 'Georreferenciamento Rural — 3.200 ha',
    },
    {
      id: 3,
      name: 'Arq. Fernanda Lima',
      role: 'Gerente de Incorporação',
      company: 'Incorporadora Horizonte',
      rating: 5,
      text: 'Utilizamos a GeoTech no levantamento planialtimétrico do nosso novo empreendimento. A qualidade dos arquivos DWG entregues facilitou imensamente o trabalho.',
      location: 'Ribeirão Preto, SP',
      project: 'Topografia Urbana — Loteamento',
    },
    {
      id: 4,
      name: 'Dr. Marcos Pereira',
      role: 'Superintendente de Obras',
      company: 'Infraestrutura Nacional S.A.',
      rating: 5,
      text: 'Para obras de infraestrutura precisão não é opcional. A GeoTech nos atendeu com equipamentos de última geração e equipe altamente treinada.',
      location: 'Campinas, SP',
      project: 'Locação e Monitoramento — Centro Logístico',
    },
  ],

  clientLogos: {
    row1: [
      'Construtora Alpha',
      'Agro Santa Clara',
      'Incorporadora Horizonte',
      'Infraestrutura Nacional S.A.',
      'Fazenda Bom Retiro',
      'Logística Express',
      'Grupo Terraço',
    ],
    row2: [
      'GLP Logística',
      'Mineração Centro-Oeste',
      'Prefeitura de Campinas',
      'Agro Pantanal',
      'Construtora Delta',
      'Engenharia Prime',
      'Incorporadora Vista',
    ],
  },

  googleRating: {
    rating: 4.9,
    reviewCount: 127,
    reviews: [
      {
        name: 'José Ferreira',
        initial: 'J',
        text: 'Serviço excelente, prazo cumprido e documentação impecável. Recomendo!',
      },
      {
        name: 'Ana Paula Silva',
        initial: 'A',
        text: 'Georreferenciamento aprovado no INCRA na primeira análise. Equipe muito competente.',
      },
    ],
  },

  faq: {
    headline: 'Perguntas Frequentes',
    certifications: [
      'NBR 13.133',
      'ABNT NBR 13.133',
      'INCRA',
      'ISO 9001',
      'CREA/CAU',
    ],
    items: [
      {
        id: 'q1',
        question: 'Qual é o prazo médio para realização de um levantamento topográfico?',
        answer:
          'O prazo varia conforme a área e complexidade do projeto. Levantamentos de até 5 ha são concluídos em 2 a 3 dias úteis. Áreas maiores podem demandar de 5 a 15 dias úteis.',
      },
      {
        id: 'q2',
        question: 'Quais documentos são entregues ao final do serviço?',
        answer:
          'A entrega padrão inclui: arquivos técnicos em DWG/DXF e PDF, memorial descritivo georreferenciado, relatório técnico, ART do engenheiro responsável, e lista de coordenadas.',
      },
      {
        id: 'q3',
        question: 'A GeoTech atende a área em que preciso de serviços?',
        answer:
          'Atendemos os estados do Sudeste (SP, RJ, MG, ES), Centro-Oeste (GO, MT, MS, DF) e Sul (PR, SC, RS). Para outras regiões, avaliamos caso a caso.',
      },
      {
        id: 'q4',
        question: 'O que é georreferenciamento e quando é obrigatório?',
        answer:
          'Georreferenciamento é o processo de determinar as coordenadas de um imóvel rural com precisão geodésica. É obrigatório para desmembramento, parcelamento, remembramento e transferência de domínio.',
      },
      {
        id: 'q5',
        question: 'Qual a diferença entre levantamento planimétrico e planialtimétrico?',
        answer:
          'O planimétrico registra apenas a posição horizontal. O planialtimétrico inclui cotas de altitude, curvas de nível e modelo digital do terreno.',
      },
      {
        id: 'q6',
        question: 'Como funciona o aerolevantamento com drone?',
        answer:
          'Utilizamos VANTs com câmeras métricas que capturam centenas de imagens. Com processamento fotogramétrico, geramos ortofotos de alta resolução, modelos digitais e nuvens de pontos 3D.',
      },
      {
        id: 'q7',
        question: 'É necessário estar presente durante o levantamento em campo?',
        answer:
          'Não é obrigatório, mas recomendamos que o proprietário ou representante esteja disponível para identificar marcos de divisa e sanar dúvidas sobre os limites do imóvel.',
      },
    ],
  },

  process: [
    {
      number: '01',
      icon: 'ClipboardList',
      title: 'Solicitação',
      description:
        'Análise da demanda, definição do escopo técnico, emissão de proposta comercial com especificações completas e prazo de execução.',
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
        'Execução em campo com equipamentos GNSS e estação total. Coleta de pontos, coordenadas, cotas e dados planialtimétricos.',
      detail: 'Rastreamento em tempo real',
    },
    {
      number: '04',
      icon: 'Cpu',
      title: 'Processamento',
      description:
        'Processamento em software geodésico, ajustamento de redes, geração de modelos digitais e elaboração de relatórios técnicos.',
      detail: 'Trimble Business Center',
    },
    {
      number: '05',
      icon: 'PackageCheck',
      title: 'Entrega Final',
      description:
        'Entrega dos arquivos DWG/DXF, memoriais descritivos, relatórios georeferenciados, ART/RRT e suporte técnico pós-entrega.',
      detail: 'Arquivos + ART inclusos',
    },
  ],

  coverage: [
    { abbr: 'AC', name: 'Acre', served: false },
    { abbr: 'AL', name: 'Alagoas', served: false },
    { abbr: 'AP', name: 'Amapá', served: false },
    { abbr: 'AM', name: 'Amazonas', served: false },
    { abbr: 'BA', name: 'Bahia', served: false },
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
    { abbr: 'PE', name: 'Pernambuco', served: false },
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
      'Levantamento Topográfico',
      'Georreferenciamento Rural',
      'Locação de Obras',
      'Aerolevantamento com Drone',
      'Cadastro Técnico',
      'Regularização Fundiária',
    ],
    purposeOptions: [
      'Engenharia Civil',
      'Regularização Fundiária',
      'Projeto de Irrigação',
      'Loteamento Urbano',
      'Certificação INCRA',
      'Outro',
    ],
    pricing: {
      'Levantamento Topográfico': { pricePerHa: 180, minDays: 3, maxDays: 7, equipment: 'GNSS RTK + Estação Total' },
      'Georreferenciamento Rural': { pricePerHa: 95, minDays: 10, maxDays: 25, equipment: 'GNSS Geodésico L1/L2' },
      'Locação de Obras': { pricePerHa: 0, minDays: 2, maxDays: 5, equipment: 'Estação Total Robotizada', fixedPrice: 3500 },
      'Aerolevantamento com Drone': { pricePerHa: 45, minDays: 5, maxDays: 12, equipment: 'DJI Matrice 350 RTK' },
      'Cadastro Técnico': { pricePerHa: 120, minDays: 7, maxDays: 15, equipment: 'GNSS RTK + GIS' },
      'Regularização Fundiária': { pricePerHa: 0, minDays: 15, maxDays: 40, equipment: 'GNSS + Cartório', fixedPrice: 4500 },
    },
  },

  blog: [
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
        'Comparativo técnico entre levantamento GNSS convencional e aerolevantamento com VANT. Analisamos custo, precisão e aplicabilidade.',
      date: '10 Abr 2025',
      readTime: '8 min',
    },
  ],

  whatsapp: {
    number: '5511999999999',
    message: 'Olá! Gostaria de solicitar um orçamento de topografia.',
  },

  navLinks: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ],

  footer: {
    description: 'Soluções completas em topografia e engenharia. Tecnologia de precisão para projetos de qualquer escala.',
    certifications: [
      { code: 'CREA/SP 123.456/D', label: 'Eng. Responsável' },
      { code: 'INCRA Habilitado', label: 'Georreferenciamento' },
      { code: 'ISO 9001:2015', label: 'Gestão da Qualidade' },
      { code: 'NBR 13.133', label: 'Levantamento Topográfico' },
      { code: 'ANAC SARP', label: 'Aerolevantamento' },
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
    'Levantamento Topográfico',
    'Georreferenciamento Rural',
    'Locação de Obras',
    'Regularização Fundiária',
    'Aerolevantamento com Drone',
    'Cadastro Técnico',
  ],
})

export default config
