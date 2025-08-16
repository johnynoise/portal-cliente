import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content} from './Home.styles';
import LoadingSpinner from '../../components/TelaLoading/Loading';

import WelcomeCard from './components/WelcomeCard/WelcomeCard';
import ProductsSection from './components/ProductsSection/ProductsSection';
import NotificationsSection from './components/NotificationsSection/NotificationSection';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de produtos com documentos
  const mockProducts = [
    {
      id: 1,
      title: 'Medidor Inteligente M1',
      description: 'Manual técnico e certificações do Medidor Inteligente M1',
      image: '/api/placeholder/120/80',
      status: 'Documentos disponíveis',
      link: '/produtos/m1/documentos'
    },
    {
      id: 2,
      title: 'Sensor de Qualidade',
      description: 'Relatórios e manuais do Sensor de Qualidade',
      image: '/api/placeholder/120/80',
      status: 'Documentos disponíveis',
      link: '/produtos/sensor-qualidade/documentos'
    },
    {
      id: 3,
      title: 'Sistema de Backup',
      description: 'Documentação técnica e procedimentos do Sistema de Backup',
      image: '/api/placeholder/120/80',
      status: 'Atualização pendente',
      link: '/produtos/backup/documentos'
    }
  ];

  // Mock de notificações corporativas
  const mockNotifications = [
    {
      id: 1,
      title: 'Novo manual disponível',
      text: 'Manual técnico do Medidor Inteligente M1 foi atualizado.',
      time: 'Hoje, 09:00',
      type: 'info'
    },
    {
      id: 2,
      title: 'Atualização de certificação',
      text: 'Certificação ISO do Sistema de Backup atualizada.',
      time: 'Ontem, 16:30',
      type: 'success'
    },
    {
      id: 3,
      title: 'Manutenção programada',
      text: 'Serviço de documentos estará indisponível domingo das 02h às 06h.',
      time: '2 dias atrás',
      type: 'warning'
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setProducts(mockProducts);
      setNotifications(mockNotifications);
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
        {/* Mensagem de boas-vindas corporativa */}
        <WelcomeCard
          user={{ name: 'Portal Corporativo' }}
          message="Bem-vindo! Aqui você encontra documentos, manuais e certificações dos nossos produtos."
        />

        {/* Lista de produtos com documentos */}
        <ProductsSection
          products={filteredProducts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Seção de notificações importantes */}
        <NotificationsSection notifications={notifications} />

      </Content>
    </Container>
  );
}

export default Home;
