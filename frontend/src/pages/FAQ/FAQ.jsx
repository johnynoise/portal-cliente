import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel,
  FiltersSection,
  SearchContainer,
  SearchIcon,
  SearchInput,
  FilterTabs,
  FilterTab,
  SortContainer,
  SortButton,
  HelpfulSection,
  HelpfulTitle,
  QuickActions,
  QuickActionCard,
  MainContent,
  FaqSection,
  SectionHeader,
  ResultsCount,
  FaqList,
  FaqItem,
  FaqHeader,
  Question,
  QuestionIcon,
  ToggleIcon,
  CategoryBadge,
  AnswerWrapper,
  Answer,
  FaqFooter,
  HelpfulButtons,
  HelpfulButton,
  ShareButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  SuggestButton,
  ContactSection,
  ContactCard,
  ContactTitle,
  ContactText,
  ContactButton,
  LoadingSpinner,
  PopularFaqs,
  PopularTitle,
  PopularItem,
  ViewsCount
} from './faq.styles';

const faqs = [
  {
    id: 1,
    category: 'Conta',
    question: 'Como acesso minha conta?',
    answer: 'Para acessar sua conta, clique no botão "Login" localizado no topo direito da página. Insira seu email e senha cadastrados. Se você esqueceu seus dados de acesso, utilize a opção "Esqueci minha senha" para redefinir.',
    views: 1250,
    helpful: 89,
    notHelpful: 12,
    popular: true,
    tags: ['login', 'acesso', 'conta']
  },
  {
    id: 2,
    category: 'Conta',
    question: 'Como redefinir minha senha?',
    answer: 'Para redefinir sua senha: 1) Clique em "Esqueci minha senha" na página de login; 2) Digite seu email cadastrado; 3) Verifique sua caixa de entrada e spam; 4) Clique no link recebido; 5) Digite sua nova senha. O link expira em 24 horas.',
    views: 890,
    helpful: 76,
    notHelpful: 8,
    popular: true,
    tags: ['senha', 'redefinir', 'recuperar']
  },
  {
    id: 3,
    category: 'Produtos',
    question: 'Como visualizar detalhes dos produtos?',
    answer: 'Na página de produtos, clique sobre qualquer produto para ver informações detalhadas, incluindo especificações técnicas, preços, disponibilidade e avaliações de outros clientes. Você também pode favoritar produtos para acesso rápido.',
    views: 567,
    helpful: 45,
    notHelpful: 3,
    popular: false,
    tags: ['produtos', 'detalhes', 'informações']
  },
  {
    id: 4,
    category: 'Documentação',
    question: 'Onde encontro a documentação técnica?',
    answer: 'A documentação técnica está disponível na seção "Arquivos" do portal. Lá você encontra manuais, especificações, diagramas e guias de instalação organizados por categoria de produto. Todos os documentos podem ser baixados em PDF.',
    views: 445,
    helpful: 38,
    notHelpful: 5,
    popular: false,
    tags: ['documentação', 'arquivos', 'manuais']
  },
  {
    id: 5,
    category: 'Suporte',
    question: 'Como entrar em contato com o suporte?',
    answer: 'Você pode contatar nosso suporte através de: 1) Chat online (disponível 24/7); 2) Formulário de contato na seção Suporte; 3) Email: suporte@wasion.com; 4) Telefone: (11) 3333-4444. Nosso tempo médio de resposta é de 2 horas.',
    views: 723,
    helpful: 67,
    notHelpful: 4,
    popular: true,
    tags: ['suporte', 'contato', 'ajuda']
  },
  {
    id: 6,
    category: 'Suporte',
    question: 'Qual o horário de atendimento?',
    answer: 'Nosso atendimento funciona: Segunda a Sexta: 8h às 18h | Sábados: 8h às 14h | Chat online: 24/7 | Email: respondemos em até 24h. Para emergências técnicas, temos plantão 24h nos finais de semana.',
    views: 334,
    helpful: 28,
    notHelpful: 2,
    popular: false,
    tags: ['horário', 'atendimento', 'plantão']
  },
  {
    id: 7,
    category: 'Produtos',
    question: 'Como solicitar orçamento de produtos?',
    answer: 'Para solicitar orçamento: 1) Navegue até a página de produtos; 2) Selecione os produtos desejados; 3) Clique em "Solicitar Orçamento"; 4) Preencha suas informações; 5) Receba o orçamento em até 2 horas úteis por email.',
    views: 456,
    helpful: 41,
    notHelpful: 6,
    popular: false,
    tags: ['orçamento', 'produtos', 'solicitação']
  },
  {
    id: 8,
    category: 'Documentação',
    question: 'Como baixar certificados dos produtos?',
    answer: 'Os certificados estão disponíveis na seção "Arquivos" > "Certificações". Você pode filtrar por produto ou tipo de certificado (ISO, INMETRO, etc.). Clique no certificado desejado para visualizar ou baixar em alta resolução.',
    views: 289,
    helpful: 25,
    notHelpful: 1,
    popular: false,
    tags: ['certificados', 'download', 'documentos']
  }
];

const quickActions = [
  {
    icon: '🔐',
    title: 'Problemas de Login',
    description: 'Não consegue acessar sua conta?',
    action: 'Conta'
  },
  {
    icon: '📦',
    title: 'Dúvidas sobre Produtos',
    description: 'Informações técnicas e especificações',
    action: 'Produtos'
  },
  {
    icon: '📞',
    title: 'Falar com Suporte',
    description: 'Atendimento personalizado',
    action: 'Suporte'
  },
  {
    icon: '📄',
    title: 'Documentos e Manuais',
    description: 'Downloads e certificações',
    action: 'Documentação'
  }
];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [openIndex, setOpenIndex] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = ['Todas', ...new Set(faqs.map(faq => faq.category))];

  useEffect(() => {
    // Simula carregamento inicial
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }, []);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'popular':
        return (b.views + b.helpful) - (a.views + a.helpful);
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
        return b.id - a.id;
      case 'alphabetical':
        return a.question.localeCompare(b.question);
      default:
        return 0;
    }
  });

  const popularFaqs = faqs.filter(faq => faq.popular).slice(0, 3);
  
  const stats = {
    total: faqs.length,
    views: faqs.reduce((sum, faq) => sum + faq.views, 0),
    solved: Math.floor(faqs.reduce((sum, faq) => sum + faq.helpful, 0) * 0.85)
  };

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleHelpfulVote = (faqId, isHelpful) => {
    const voteKey = `${faqId}-${isHelpful ? 'helpful' : 'notHelpful'}`;
    
    if (helpfulVotes[voteKey]) {
      toast.info('Você já avaliou esta resposta!');
      return;
    }

    setHelpfulVotes(prev => ({ ...prev, [voteKey]: true }));
    toast.success(isHelpful ? 'Obrigado pelo feedback positivo!' : 'Obrigado pelo feedback! Vamos melhorar.');
  };

  const handleQuickAction = (category) => {
    setSelectedCategory(category);
    setSearch('');
    // Scroll suave para a seção FAQ
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = (faq) => {
    if (navigator.share) {
      navigator.share({
        title: faq.question,
        text: faq.answer,
        url: window.location.href + `#faq-${faq.id}`
      });
    } else {
      navigator.clipboard.writeText(`${faq.question}\n\n${faq.answer}`);
      toast.success('Conteúdo copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner" />
          <p>Carregando perguntas frequentes...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Central de Ajuda</Title>
        <Subtitle>
          Encontre respostas rápidas para suas dúvidas mais comuns
        </Subtitle>
      </Header>

      <StatsSection>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Perguntas</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.views.toLocaleString()}</StatNumber>
          <StatLabel>Visualizações</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.solved}%</StatNumber>
          <StatLabel>Problemas Resolvidos</StatLabel>
        </StatCard>
      </StatsSection>

      <HelpfulSection>
        <HelpfulTitle>Como podemos ajudar você hoje?</HelpfulTitle>
        <QuickActions>
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              onClick={() => handleQuickAction(action.action)}
            >
              <div className="icon">{action.icon}</div>
              <div className="content">
                <div className="title">{action.title}</div>
                <div className="description">{action.description}</div>
              </div>
            </QuickActionCard>
          ))}
        </QuickActions>
      </HelpfulSection>

      <FiltersSection>
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar por pergunta, resposta ou palavra-chave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>

        <FilterTabs>
          {categories.map((category) => (
            <FilterTab
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {category !== 'Todas' && (
                <span className="count">
                  {faqs.filter(faq => faq.category === category).length}
                </span>
              )}
            </FilterTab>
          ))}
        </FilterTabs>

        <SortContainer>
          <SortButton
            active={sortBy === 'popular'}
            onClick={() => setSortBy('popular')}
          >
            🔥 Populares
          </SortButton>
          <SortButton
            active={sortBy === 'helpful'}
            onClick={() => setSortBy('helpful')}
          >
            👍 Mais Úteis
          </SortButton>
          <SortButton
            active={sortBy === 'recent'}
            onClick={() => setSortBy('recent')}
          >
            🆕 Recentes
          </SortButton>
          <SortButton
            active={sortBy === 'alphabetical'}
            onClick={() => setSortBy('alphabetical')}
          >
            🔤 A-Z
          </SortButton>
        </SortContainer>
      </FiltersSection>

      <MainContent>
        <FaqSection id="faq-section">
          <SectionHeader>
            <ResultsCount>
              {filteredFaqs.length} pergunta{filteredFaqs.length !== 1 ? 's' : ''} encontrada{filteredFaqs.length !== 1 ? 's' : ''}
              {selectedCategory !== 'Todas' && ` em ${selectedCategory}`}
              {search && ` para "${search}"`}
            </ResultsCount>
          </SectionHeader>

          {filteredFaqs.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🤔</EmptyIcon>
              <EmptyTitle>Nenhuma pergunta encontrada</EmptyTitle>
              <EmptyText>
                Não encontramos resultados para sua busca. Tente usar palavras diferentes ou navegue pelas categorias.
              </EmptyText>
              <SuggestButton onClick={() => toast.info('Funcionalidade em desenvolvimento!')}>
                💡 Sugerir Nova Pergunta
              </SuggestButton>
            </EmptyState>
          ) : (
            <FaqList>
              {filteredFaqs.map((faq, index) => (
                <FaqItem key={faq.id}>
                  <FaqHeader onClick={() => toggleAnswer(index)}>
                    <QuestionIcon>{faq.category === 'Conta' ? '🔐' : 
                                   faq.category === 'Produtos' ? '📦' : 
                                   faq.category === 'Suporte' ? '💬' : '📄'}</QuestionIcon>
                    <Question isOpen={openIndex === index}>
                      {faq.question}
                      <div className="meta">
                        <CategoryBadge category={faq.category}>{faq.category}</CategoryBadge>
                        <ViewsCount>{faq.views} visualizações</ViewsCount>
                        {faq.popular && <span className="popular">🔥 Popular</span>}
                      </div>
                    </Question>
                    <ToggleIcon isOpen={openIndex === index}>
                      {openIndex === index ? '−' : '+'}
                    </ToggleIcon>
                  </FaqHeader>
                  
                  <AnswerWrapper isOpen={openIndex === index}>
                    <Answer>{faq.answer}</Answer>
                    
                    <FaqFooter>
                      <HelpfulButtons>
                        <span>Esta resposta foi útil?</span>
                        <HelpfulButton
                          helpful
                          voted={helpfulVotes[`${faq.id}-helpful`]}
                          onClick={() => handleHelpfulVote(faq.id, true)}
                        >
                          👍 Sim ({faq.helpful})
                        </HelpfulButton>
                        <HelpfulButton
                          voted={helpfulVotes[`${faq.id}-notHelpful`]}
                          onClick={() => handleHelpfulVote(faq.id, false)}
                        >
                          👎 Não ({faq.notHelpful})
                        </HelpfulButton>
                      </HelpfulButtons>
                      
                      <ShareButton onClick={() => handleShare(faq)}>
                        📤 Compartilhar
                      </ShareButton>
                    </FaqFooter>
                  </AnswerWrapper>
                </FaqItem>
              ))}
            </FaqList>
          )}
        </FaqSection>

        <aside>
          <PopularFaqs>
            <PopularTitle>📈 Perguntas em Alta</PopularTitle>
            {popularFaqs.map((faq) => (
              <PopularItem
                key={faq.id}
                onClick={() => {
                  setSelectedCategory(faq.category);
                  setSearch('');
                  setTimeout(() => {
                    const faqIndex = filteredFaqs.findIndex(f => f.id === faq.id);
                    if (faqIndex !== -1) {
                      toggleAnswer(faqIndex);
                    }
                  }, 100);
                }}
              >
                <div className="question">{faq.question}</div>
                <ViewsCount>{faq.views} visualizações</ViewsCount>
              </PopularItem>
            ))}
          </PopularFaqs>

          <ContactSection>
            <ContactCard>
              <ContactTitle>Ainda precisa de ajuda? 🤝</ContactTitle>
              <ContactText>
                Nossa equipe está pronta para ajudar você com qualquer dúvida específica.
              </ContactText>
              <ContactButton onClick={() => toast.info('Redirecionando para suporte...')}>
                💬 Falar com Suporte
              </ContactButton>
            </ContactCard>
          </ContactSection>
        </aside>
      </MainContent>
    </Container>
  );
}