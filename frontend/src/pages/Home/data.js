export const stats = [
  { label: 'Produtos Ativos', value: '12', icon: '📦' },
  { label: 'Consumo Mensal', value: '2.5k', icon: '⚡' },
  { label: 'Economia', value: 'R$ 350', icon: '💰' },
  { label: 'Status', value: 'Ativo', icon: '✅' }
];

export const mockProducts = [
  {
    id: 1,
    title: 'Medidor Inteligente M1',
    description: 'Medidor de energia com conectividade IoT e análise em tempo real',
    image: '/api/placeholder/120/80',
    status: 'Ativo',
    consumo: '1.2 kWh/dia'
  },
  {
    id: 2,
    title: 'Sensor de Qualidade',
    description: 'Monitor de qualidade de energia com alertas automáticos',
    image: '/api/placeholder/120/80',
    status: 'Ativo',
    consumo: '0.8 kWh/dia'
  },
  {
    id: 3,
    title: 'Sistema de Backup',
    description: 'Sistema de backup inteligente para proteção de dados',
    image: '/api/placeholder/120/80',
    status: 'Manutenção',
    consumo: '0.5 kWh/dia'
  }
];

export const mockNotifications = [
  {
    id: 1,
    title: 'Novo produto disponível',
    text: 'Confira nossa nova linha de medidores inteligentes',
    time: '2h atrás',
    type: 'info'
  },
  {
    id: 2,
    title: 'Manutenção programada',
    text: 'Sistema estará em manutenção no domingo das 2h às 6h',
    time: '5h atrás',
    type: 'warning'
  },
  {
    id: 3,
    title: 'Relatório mensal disponível',
    text: 'Seu relatório de consumo de janeiro está pronto',
    time: '1 dia atrás',
    type: 'success'
  }
];
