import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/wasion.svg';

import {
  Container,
  Navbar,
  LogoWrapper,
  Logo,
  NavItems,
  NavItem,
  Title,
  LogoutButton,
  Content,
  WelcomeSection,
  WelcomeCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserStatus,
  QuickActions,
  ActionButton,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  StatIcon,
  MainGrid,
  ProductsSection,
  SectionTitle,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductStatus,
  NotificationsSection,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationTitle,
  NotificationText,
  NotificationTime,
  SearchBar,
  SearchInput,
  SearchIcon,
  Badge,
  LoadingSpinner
} from './Home.styles';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Johny', email: 'johny@email.com' });
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados mockados - substitua por chamadas reais da API
  const stats = [
    { label: 'Produtos Ativos', value: '12', icon: '📦' },
    { label: 'Consumo Mensal', value: '2.5k', icon: '⚡' },
    { label: 'Economia', value: 'R$ 350', icon: '💰' },
    { label: 'Status', value: 'Ativo', icon: '✅' }
  ];

  const mockNotifications = [
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

  const mockProducts = [
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

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setNotifications(mockNotifications);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  function handleQuickAction(action) {
    switch(action) {
      case 'relatorios':
        navigate('/relatorios');
        break;
      case 'produtos':
        navigate('/produtos');
        break;
      case 'suporte':
        navigate('/suporte');
        break;
      case 'configuracoes':
        navigate('/configuracoes');
        break;
      default:
        console.log('Ação:', action);
    }
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Carregando seu painel...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>

      <Content>
        <WelcomeSection>
          <WelcomeCard>
            <UserAvatar>
              {user.name.charAt(0).toUpperCase()}
            </UserAvatar>
            <UserInfo>
              <UserName>Bem-vindo, {user.name}!</UserName>
              <UserStatus>
                <Badge type="success">Conta Ativa</Badge>
                <span>Último acesso: Hoje às 14:30</span>
              </UserStatus>
            </UserInfo>
            <QuickActions>
              <ActionButton onClick={() => handleQuickAction('relatorios')}>
                📊 Relatórios
              </ActionButton>
              <ActionButton onClick={() => handleQuickAction('produtos')}>
                📦 Produtos
              </ActionButton>
              <ActionButton onClick={() => handleQuickAction('suporte')}>
                💬 Suporte
              </ActionButton>
              <ActionButton onClick={() => handleQuickAction('configuracoes')}>
                ⚙️ Config
              </ActionButton>
            </QuickActions>
          </WelcomeCard>
        </WelcomeSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon>{stat.icon}</StatIcon>
              <div>
                <StatNumber>{stat.value}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </div>
            </StatCard>
          ))}
        </StatsGrid>

        <MainGrid>
          <ProductsSection>
            <SectionTitle>
              Seus Produtos ({filteredProducts.length})
            </SectionTitle>
            {filteredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <ProductStatus status={product.status}>
                      {product.status}
                    </ProductStatus>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      {product.consumo}
                    </span>
                  </div>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsSection>

          <NotificationsSection>
            <SectionTitle>
              Notificações 
              {notifications.length > 0 && (
                <Badge type="info" style={{ marginLeft: '0.5rem' }}>
                  {notifications.length}
                </Badge>
              )}
            </SectionTitle>
            {notifications.map(notification => (
              <NotificationItem key={notification.id} type={notification.type}>
                <NotificationIcon type={notification.type}>
                  {notification.type === 'info' && 'ℹ️'}
                  {notification.type === 'warning' && '⚠️'}
                  {notification.type === 'success' && '✅'}
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationText>{notification.text}</NotificationText>
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </NotificationsSection>
        </MainGrid>
      </Content>
    </Container>
  );
}

export default Home;