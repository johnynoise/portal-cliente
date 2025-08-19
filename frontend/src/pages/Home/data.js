// frontend/src/pages/Home/data.js

// Estatísticas para portal B2B de medidores
export const stats = [
  { 
    label: 'Produtos Disponíveis', 
    value: '24', 
    icon: '🏭',
    description: 'Medidores em catálogo',
    trend: '+2 este mês'
  },
  { 
    label: 'Documentos Ativos', 
    value: '156', 
    icon: '📋',
    description: 'Manuais e certificações',
    trend: '+12 atualizados'
  },
  { 
    label: 'Atualizações', 
    value: '8', 
    icon: '🔄',
    description: 'Este mês',
    trend: 'Firmware e docs'
  },
  { 
    label: 'Suporte 24h', 
    value: 'Ativo', 
    icon: '🛠️',
    description: 'Canal dedicado',
    trend: '< 2h resposta'
  }
];

// Produtos para concessionárias de energia
export const mockProducts = [
  {
    id: 1,
    title: 'Medidor Trifásico MT-400',
    description: 'Manual de instalação, certificação INMETRO e especificações técnicas para redes trifásicas',
    image: '/api/placeholder/120/80',
    status: 'Certificado',
    category: 'Medição Trifásica',
    lastUpdate: 'Atualizado hoje',
    documents: ['Manual Técnico', 'Certificado INMETRO', 'Especificações'],
    firmware: '2.1.4',
    link: '/produtos/mt400/documentos'
  },
  {
    id: 2,
    title: 'Smart Meter IoT SM-200',
    description: 'Medidor inteligente com conectividade IoT, protocolos DLMS/COSEM e comunicação bidirecional',
    image: '/api/placeholder/120/80',
    status: 'Certificado',
    category: 'Medição Inteligente',
    lastUpdate: 'Há 2 dias',
    documents: ['Manual de Instalação', 'Protocolos de Comunicação', 'Certificações'],
    firmware: '3.2.1',
    link: '/produtos/sm200/documentos'
  },
  {
    id: 3,
    title: 'Medidor Monofásico MM-100',
    description: 'Solução residencial com precisão classe 1, display LCD e interfaces de comunicação',
    image: '/api/placeholder/120/80',
    status: 'Em Certificação',
    category: 'Medição Residencial',
    lastUpdate: 'Há 5 dias',
    documents: ['Especificações Técnicas', 'Guia de Instalação', 'Certificados'],
    firmware: '1.8.2',
    link: '/produtos/mm100/documentos'
  },
  {
    id: 4,
    title: 'Concentrador de Dados CD-500',
    description: 'Equipamento para coleta e concentração de dados de múltiplos medidores com protocolos avançados',
    image: '/api/placeholder/120/80',
    status: 'Certificado',
    category: 'Infraestrutura',
    lastUpdate: 'Há 1 semana',
    documents: ['Manual Técnico', 'Configuração DLMS', 'Procedimentos'],
    firmware: '4.1.0',
    link: '/produtos/cd500/documentos'
  },
  {
    id: 5,
    title: 'Medidor Industrial MI-800',
    description: 'Medição para grandes consumidores industriais com múltiplas grandezas e alta precisão',
    image: '/api/placeholder/120/80',
    status: 'Certificado',
    category: 'Medição Industrial',
    lastUpdate: 'Há 3 dias',
    documents: ['Manual Completo', 'Certificações', 'Análise de Grandezas'],
    firmware: '2.3.6',
    link: '/produtos/mi800/documentos'
  }
];

// Notificações para ambiente corporativo B2B
export const mockNotifications = [
  {
    id: 1,
    title: 'Nova certificação INMETRO disponível',
    text: 'Certificado de conformidade do Smart Meter IoT SM-200 foi renovado e está disponível para download na área de documentos.',
    time: 'Há 2 horas',
    type: 'success',
    priority: 'alta',
    category: 'Certificação',
    relatedProduct: 'SM-200'
  },
  {
    id: 2,
    title: 'Atualização de firmware crítica',
    text: 'Versão 2.1.4 do firmware MT-400 corrige problemas de comunicação e melhora precisão nas medições. Atualização recomendada.',
    time: 'Hoje, 08:30',
    type: 'info',
    priority: 'alta',
    category: 'Firmware',
    relatedProduct: 'MT-400'
  },
  {
    id: 3,
    title: 'Manutenção programada do portal',
    text: 'Portal estará em manutenção no domingo (25/08) das 02h às 06h para implementação de melhorias de segurança e performance.',
    time: 'Ontem, 16:45',
    type: 'warning',
    priority: 'media',
    category: 'Sistema',
    relatedProduct: null
  },
  {
    id: 4,
    title: 'Novo produto em homologação',
    text: 'Medidor Trifásico MT-600 com funcionalidades avançadas de análise de qualidade de energia entrará em processo de certificação.',
    time: '2 dias atrás',
    type: 'info',
    priority: 'baixa',
    category: 'Produto',
    relatedProduct: 'MT-600'
  },
  {
    id: 5,
    title: 'Webinar técnico agendado',
    text: 'Participe do webinar "Implementação de Smart Meters em Redes de Distribuição" no dia 30/08 às 14h.',
    time: '3 dias atrás',
    type: 'info',
    priority: 'media',
    category: 'Treinamento',
    relatedProduct: null
  }
];

// Categorias de produtos para filtros
export const productCategories = [
  'Todas',
  'Medição Trifásica',
  'Medição Inteligente', 
  'Medição Residencial',
  'Medição Industrial',
  'Infraestrutura'
];

// Status possíveis dos produtos
export const productStatus = {
  'Certificado': { bg: '#d4edda', color: '#155724' },
  'Em Certificação': { bg: '#fff3cd', color: '#856404' },
  'Descontinuado': { bg: '#f8d7da', color: '#721c24' },
  'Em Desenvolvimento': { bg: '#d1ecf1', color: '#0c5460' }
};

// Tipos de documentos disponíveis
export const documentTypes = [
  'Manual Técnico',
  'Manual de Instalação', 
  'Certificado INMETRO',
  'Especificações Técnicas',
  'Protocolos de Comunicação',
  'Guia de Configuração',
  'Procedimentos de Manutenção',
  'Certificações de Qualidade'
];