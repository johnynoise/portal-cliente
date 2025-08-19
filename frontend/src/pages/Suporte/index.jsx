import React, { useState } from 'react';
import { Search, Phone, Mail, Clock, FileText, Download, MessageCircle, AlertCircle, CheckCircle, Users } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '0'
  },
  
  header: {
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  
  headerTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.025em'
  },
  
  headerSubtitle: {
    fontSize: '1.25rem',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem'
  },
  
  searchSection: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2.5rem',
    marginBottom: '4rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  
  searchContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto'
  },
  
  searchInput: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    fontSize: '1.1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.75rem',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  
  cardIcon: {
    width: '3rem',
    height: '3rem',
    backgroundColor: '#dbeafe',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    color: '#2563eb'
  },
  
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#1f2937'
  },
  
  cardDescription: {
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  },
  
  cardAction: {
    color: '#2563eb',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem'
  },
  
  contactSection: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '3rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#1f2937'
  },
  
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  
  contactItem: {
    textAlign: 'center',
    padding: '1.5rem'
  },
  
  contactIcon: {
    width: '4rem',
    height: '4rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    color: '#0369a1'
  },
  
  contactTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1f2937'
  },
  
  contactInfo: {
    color: '#6b7280',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    margin: '1rem 0'
  }
};

const Suporte = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const supportOptions = [
    {
      id: 1,
      icon: <FileText size={24} />,
      title: "Documentação Técnica",
      description: "Acesse manuais, especificações técnicas, guias de instalação e documentação completa dos nossos medidores de energia.",
      action: "Ver Documentos"
    },
    {
      id: 2,
      icon: <Download size={24} />,
      title: "Downloads",
      description: "Baixe drivers, firmware, certificações, fichas técnicas e outros arquivos importantes para seus projetos.",
      action: "Área de Downloads"
    },
    {
      id: 3,
      icon: <MessageCircle size={24} />,
      title: "Chat com Especialista",
      description: "Converse diretamente com nossa equipe técnica especializada em medidores de energia e soluções para concessionárias.",
      action: "Iniciar Chat"
    },
    {
      id: 4,
      icon: <AlertCircle size={24} />,
      title: "Reportar Problema",
      description: "Relate problemas técnicos, falhas em equipamentos ou solicite suporte para resolução de incidentes.",
      action: "Abrir Chamado"
    },
    {
      id: 5,
      icon: <Users size={24} />,
      title: "Treinamentos",
      description: "Acesse materiais de treinamento, webinars e capacitação técnica para sua equipe de manutenção.",
      action: "Ver Treinamentos"
    },
    {
      id: 6,
      icon: <CheckCircle size={24} />,
      title: "Status do Sistema",
      description: "Verifique o status dos nossos serviços, atualizações de sistema e manutenções programadas.",
      action: "Verificar Status"
    }
  ];

  const getCardStyle = (cardId) => ({
    ...styles.card,
    transform: hoveredCard === cardId ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hoveredCard === cardId 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  });

  const getSearchInputStyle = () => ({
    ...styles.searchInput,
    borderColor: searchQuery ? '#3b82f6' : '#e5e7eb',
    boxShadow: searchQuery ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Central de Suporte</h1>
        <p style={styles.headerSubtitle}>
          Estamos aqui para ajudar você com todas as suas necessidades técnicas e comerciais. 
          Encontre respostas rápidas ou entre em contato com nossa equipe especializada.
        </p>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar na base de conhecimento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={getSearchInputStyle()}
            />
          </div>
          
          <div style={styles.statusBadge}>
            <CheckCircle size={16} />
            Todos os sistemas operacionais
          </div>
        </section>

        {/* Support Options Grid */}
        <div style={styles.grid}>
          {supportOptions.map((option) => (
            <div
              key={option.id}
              style={getCardStyle(option.id)}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.cardIcon}>
                {option.icon}
              </div>
              <h3 style={styles.cardTitle}>{option.title}</h3>
              <p style={styles.cardDescription}>{option.description}</p>
              <div style={styles.cardAction}>
                {option.action} →
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <section style={styles.contactSection}>
          <h2 style={styles.sectionTitle}>Precisa de Ajuda Personalizada?</h2>
          <div style={styles.contactGrid}>
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <Phone size={24} />
              </div>
              <h3 style={styles.contactTitle}>Suporte Técnico</h3>
              <div style={styles.contactInfo}>
                (11) 3000-0000<br />
                Segunda a Sexta: 8h às 18h<br />
                Sábado: 8h às 12h
              </div>
            </div>
            
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <Mail size={24} />
              </div>
              <h3 style={styles.contactTitle}>E-mail Corporativo</h3>
              <div style={styles.contactInfo}>
                suporte@empresa.com.br<br />
                Resposta em até 4 horas<br />
                comercial@empresa.com.br
              </div>
            </div>
            
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <Clock size={24} />
              </div>
              <h3 style={styles.contactTitle}>Suporte 24/7</h3>
              <div style={styles.contactInfo}>
                Emergências técnicas<br />
                0800 000 0000<br />
                Disponível 24h por dia
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Suporte;