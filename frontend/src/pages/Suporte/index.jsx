// frontend/src/pages/Suporte/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Content, 
} from './Suporte.styles';
import Loading from '../../components/TelaLoading/Loading';

import HeaderSection from './components/HeaderSection/HeaderSection';
import SupportGrid from './components/SupportGrid/SupportGrid';
import ContactSection from './components/ContactSection/ContactSection';

function Suporte() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [supportOptions, setSupportOptions] = useState([]);

  // Mock de opções de suporte
  const mockSupportOptions = [
    {
      id: 1,
      icon: '📋',
      title: "Documentação Técnica",
      description: "Acesse manuais, especificações técnicas, guias de instalação e documentação completa dos nossos medidores de energia.",
      action: "Ver Documentos",
      link: "/documentacao"
    },
    {
      id: 2,
      icon: '⬇️',
      title: "Downloads",
      description: "Baixe drivers, firmware, certificações, fichas técnicas e outros arquivos importantes para seus projetos.",
      action: "Área de Downloads",
      link: "/downloads"
    },
    {
      id: 3,
      icon: '💬',
      title: "Chat com Especialista",
      description: "Converse diretamente com nossa equipe técnica especializada em medidores de energia e soluções para concessionárias.",
      action: "Iniciar Chat",
      link: "/chat"
    },
    {
      id: 4,
      icon: '⚠️',
      title: "Reportar Problema",
      description: "Relate problemas técnicos, falhas em equipamentos ou solicite suporte para resolução de incidentes.",
      action: "Abrir Chamado",
      link: "/chamados"
    },
    {
      id: 5,
      icon: '🎓',
      title: "Treinamentos",
      description: "Acesse materiais de treinamento, webinars e capacitação técnica para sua equipe de manutenção.",
      action: "Ver Treinamentos",
      link: "/treinamentos"
    },
    {
      id: 6,
      icon: '✅',
      title: "Status do Sistema",
      description: "Verifique o status dos nossos serviços, atualizações de sistema e manutenções programadas.",
      action: "Verificar Status",
      link: "/status"
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setSupportOptions(mockSupportOptions);
      setLoading(false);
    }, 800);
  }, []);

  const filteredOptions = supportOptions.filter(option =>
    option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <Loading>
          <div className="spinner"></div>
          <p>Carregando central de suporte...</p>
        </Loading>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection />
      
      <Content>

        <SupportGrid supportOptions={filteredOptions} />

        <ContactSection />
      </Content>
    </Container>
  );
}

export default Suporte;