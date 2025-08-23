import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Title,
  Subtitle,
  SearchContainer,
  SearchInput,
  FilterTabs,
  FilterTab,
  MainContent,
  FaqList,
  FaqItem,
  FaqHeader,
  Question,
  ToggleIcon,
  AnswerWrapper,
  Answer,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  LoadingSpinner
} from './faq.styles';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/faq');
      const data = await response.json();
      setFaqs(data.filter(faq => faq.ativo)); // Apenas FAQs ativas
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      toast.error('Erro ao carregar perguntas frequentes');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Todas', ...new Set(faqs.map(faq => faq.categoria))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.pergunta.toLowerCase().includes(search.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || faq.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.ordem - b.ordem);

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const updateVisualizacoes = async (faqId) => {
    try {
      await fetch(`http://localhost:3000/api/faq/${faqId}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Erro ao atualizar visualizações:', error);
    }
  };

  const handleToggle = (index, faqId) => {
    toggleAnswer(index);
    if (openIndex !== index) {
      updateVisualizacoes(faqId);
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
        <Title>Perguntas Frequentes</Title>
        <Subtitle>
          Encontre respostas rápidas para suas dúvidas
        </Subtitle>
      </Header>

      <MainContent>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar perguntas..."
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
            </FilterTab>
          ))}
        </FilterTabs>

        {filteredFaqs.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🤔</EmptyIcon>
            <EmptyTitle>Nenhuma pergunta encontrada</EmptyTitle>
            <EmptyText>
              Tente buscar com outras palavras ou selecione uma categoria diferente.
            </EmptyText>
          </EmptyState>
        ) : (
          <FaqList>
            {filteredFaqs.map((faq, index) => (
              <FaqItem key={faq.id}>
                <FaqHeader onClick={() => handleToggle(index, faq.id)}>
                  <Question isOpen={openIndex === index}>
                    {faq.pergunta}
                  </Question>
                  <ToggleIcon isOpen={openIndex === index}>
                    {openIndex === index ? '−' : '+'}
                  </ToggleIcon>
                </FaqHeader>
                
                <AnswerWrapper isOpen={openIndex === index}>
                  <Answer>
                    {faq.resposta}
                  </Answer>
                </AnswerWrapper>
              </FaqItem>
            ))}
          </FaqList>
        )}
      </MainContent>
    </Container>
  );
}