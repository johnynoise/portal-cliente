import React, { useState, useEffect, useMemo } from 'react';
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
      const response = await fetch('http://localhost:3000/faq');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      toast.error('Erro ao carregar perguntas frequentes');
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = [...new Set(faqs.map(faq => faq.categoria))];
    return ['Todas', ...cats];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs
      .filter(faq => {
        const matchesSearch =
          faq.pergunta.toLowerCase().includes(search.toLowerCase()) ||
          faq.resposta.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === 'Todas' || faq.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.ordem - b.ordem);
  }, [faqs, search, selectedCategory]);

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const updateVisualizacoes = async (faqId) => {
    try {
      await fetch(`http://localhost:3000/faq/${faqId}/visualizar`, { method: 'POST' });
      setFaqs(prevFaqs =>
        prevFaqs.map(faq =>
          faq.id === faqId ? { ...faq, visualizacoes: faq.visualizacoes + 1 } : faq
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar visualizações:', error);
    }
  };

  const handleToggle = (index, faqId) => {
    toggleAnswer(index);
    if (openIndex !== index) updateVisualizacoes(faqId);
  };

  const avaliarFaq = async (faqId, util) => {
    try {
      await fetch(`http://localhost:3000/faq/${faqId}/avaliar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ util })
      });

      // Atualiza contadores localmente
      setFaqs(prevFaqs =>
        prevFaqs.map(faq => {
          if (faq.id === faqId) {
            return util
              ? { ...faq, util: faq.util + 1 }
              : { ...faq, naoUtil: faq.naoUtil + 1 };
          }
          return faq;
        })
      );
    } catch (error) {
      console.error('Erro ao avaliar FAQ:', error);
      toast.error('Não foi possível registrar sua avaliação');
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
        <Subtitle>Encontre respostas rápidas para suas dúvidas</Subtitle>
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
          {categories.map(category => (
            <FilterTab
              key={category}
              active={selectedCategory === category ? 'true' : 'false'}
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
                  <Question isOpen={openIndex === index}>{faq.pergunta}</Question>
                  <ToggleIcon isOpen={openIndex === index}>
                    {openIndex === index ? '−' : '+'}
                  </ToggleIcon>
                </FaqHeader>

                <AnswerWrapper isOpen={openIndex === index}>
                  <Answer>
                    {faq.resposta}
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => avaliarFaq(faq.id, true)}
                        style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}
                      >
                        Útil ({faq.util})
                      </button>
                      <button
                        onClick={() => avaliarFaq(faq.id, false)}
                        style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', background: '#e11d48', color: 'white', border: 'none', cursor: 'pointer' }}
                      >
                        Não útil ({faq.naoUtil})
                      </button>
                    </div>
                    <small style={{ display: 'block', marginTop: '0.5rem', color: '#64748b' }}>
                      Visualizações: {faq.visualizacoes}
                    </small>
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
