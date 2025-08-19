// frontend/src/pages/Home/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content, StatsGrid } from './Home.styles';
import LoadingSpinner from '../../components/TelaLoading/Loading';

import WelcomeCard from './components/WelcomeCard/WelcomeCard';
import StatsSection from './components/StatsSection/StatsSection';
import ProductsSection from './components/ProductsSection/ProductsSection';
import NotificationsSection from './components/NotificationsSection/NotificationSection';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de estatísticas da conta corporativa
  const mockStats = [
    { 
      label: 'Produtos Disponíveis', 
      value: '24', 
      icon: '🏭',
      description: 'Medidores em catálogo'
    },
    { 
      label: 'Documentos Ativos', 
      value: '156', 
      icon: '📋',
      description: 'Manuais e certificações'
    },
    { 
      label: 'Atualizações', 
      value: '8', 
      icon: '🔄',
      description: 'Este mês'
    },
    { 
      label: 'Suporte 24h', 
      value: 'Ativo', 
      icon: '🛠️',
      description: 'Canal dedicado'
    }
  ];

  // Mock de produtos para concessionárias
  const mockProducts = [
    {
      id: 1,
      title: 'Medidor Trifásico MT-400',
      description: 'Manual de instalação, certificação INMETRO e especificações técnicas atualizadas',
      image: '/api/placeholder/120/80',
      status: 'Certificado',
      category: 'Medição Trifásica',
      lastUpdate: 'Atualizado hoje',
      link: '/produtos/mt400/documentos'
    },
    {
      id: 2,
      title: 'Smart Meter IoT SM-200',
      description: 'Documentação completa, protocolos de comunicação e manual de configuração',
      image: '/api/placeholder/120/80',
      status: 'Certificado',
      category: 'Medição Inteligente',
      lastUpdate: 'Há 2 dias',
      link: '/produtos/sm200/documentos'
    },
    {
      id: 3,
      title: 'Medidor Monofásico MM-100',
      description: 'Especificações técnicas, certificados de conformidade e guias de instalação',
      image: '/api/placeholder/120/80',
      status: 'Em Certificação',
      category: 'Medição Residencial',
      lastUpdate: 'Há 5 dias',
      link: '/produtos/mm100/documentos'
    },
    {
      id: 4,
      title: 'Concentrador de Dados CD-500',
      description: 'Manual técnico, protocolos DLMS/COSEM e procedimentos de configuração',
      image: '/api/placeholder/120/80',
      status: 'Certificado',
      category: 'Infraestrutura',
      lastUpdate: 'Há 1 semana',
      link: '/produtos/cd500/documentos'
    }
  ];

  // Mock de notificações para concessionárias
  const mockNotifications = [
    {
      id: 1,
      title: 'Nova certificação INMETRO disponível',
      text: 'Certificado de conformidade do Smart Meter IoT SM-200 foi renovado e está disponível para download.',
      time: 'Há 2 horas',
      type: 'success',
      priority: 'alta'
    },
    {
      id: 2,
      title: 'Atualização de firmware disponível',
      text: 'Versão 2.1.4 do firmware MT-400 corrige problemas de comunicação e melhora precisão.',
      time: 'Hoje, 08:30',
      type: 'info',
      priority: 'media'
    },
    {
      id: 3,
      title: 'Manutenção programada do portal',
      text: 'Portal estará em manutenção no domingo (25/08) das 02h às 06h para atualizações de segurança.',
      time: 'Ontem, 16:45',
      type: 'warning',
      priority: 'media'
    },
    {
      id: 4,
      title: 'Novo produto em homologação',
      text: 'Medidor Trifásico MT-600 com funcionalidades avançadas entrará em processo de certificação.',
      time: '2 dias atrás',
      type: 'info',
      priority: 'baixa'
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados do portal B2B
    setTimeout(() => {
      setProducts(mockProducts);
      setNotifications(mockNotifications);
      setStats(mockStats);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para obter nome da empresa cliente (seria dinâmico na implementação real)
  const getClientCompany = () => {
    return localStorage.getItem('clientCompany') || 'Concessionária Parceira';
  };

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('clientCompany');
    navigate('/');
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Carregando portal corporativo...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        {/* Boas-vindas personalizada para concessionária */}
        <WelcomeCard
          user={{ 
            name: getClientCompany(),
            role: 'Cliente Corporativo'
          }}
          message="Portal de acesso exclusivo para documentação técnica, certificações e suporte especializado em medidores de energia."

        />

        {/* Estatísticas da conta corporativa */}
        <StatsSection stats={stats} />

        {/* Produtos e documentação disponível */}
        <ProductsSection
          title="Produtos e Documentação Técnica"
          products={filteredProducts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por produto, categoria ou tipo de documento..."
        />

        {/* Notificações importantes para concessionárias */}
        <NotificationsSection 
          title="Comunicados e Atualizações"
          notifications={notifications}
          showPriority={true}
        />

      </Content>
    </Container>
  );
}

export default Home;