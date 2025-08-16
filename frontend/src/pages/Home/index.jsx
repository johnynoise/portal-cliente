import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content, LoadingSpinner } from './Home.styles';

import WelcomeCard from './components/WelcomeCard/WelcomeCard';
import ProductsSection from './components/ProductsSection/ProductsSection';
import NotificationsSection from './components/NotificationsSection/NotificationSection';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Johny', email: 'johny@email.com' });
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados mockados - substituir por chamadas reais da API
  const mockNotifications = [
    { id: 1, title: 'Novo produto disponível', text: 'Confira nossa nova linha de medidores inteligentes', time: '2h atrás', type: 'info' },
    { id: 2, title: 'Manutenção programada', text: 'Sistema estará em manutenção no domingo das 2h às 6h', time: '5h atrás', type: 'warning' },
    { id: 3, title: 'Relatório mensal disponível', text: 'Seu relatório de consumo de janeiro está pronto', time: '1 dia atrás', type: 'success' }
  ];

  const mockProducts = [
    { id: 1, title: 'Medidor Inteligente M1', description: 'Medidor de energia com conectividade IoT e análise em tempo real', image: '/api/placeholder/120/80', status: 'Ativo', consumo: '1.2 kWh/dia' },
    { id: 2, title: 'Sensor de Qualidade', description: 'Monitor de qualidade de energia com alertas automáticos', image: '/api/placeholder/120/80', status: 'Ativo', consumo: '0.8 kWh/dia' },
    { id: 3, title: 'Sistema de Backup', description: 'Sistema de backup inteligente para proteção de dados', image: '/api/placeholder/120/80', status: 'Manutenção', consumo: '0.5 kWh/dia' }
  ];

  useEffect(() => {
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
      case 'relatorios': navigate('/relatorios'); break;
      case 'produtos': navigate('/produtos'); break;
      case 'suporte': navigate('/suporte'); break;
      case 'configuracoes': navigate('/configuracoes'); break;
      default: console.log('Ação:', action);
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
        <WelcomeCard user={user} onAction={handleQuickAction} />
        <ProductsSection products={filteredProducts} />
        <NotificationsSection notifications={notifications} />
      </Content>
    </Container>
  );
}

export default Home;
