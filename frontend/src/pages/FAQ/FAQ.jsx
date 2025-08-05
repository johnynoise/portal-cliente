import React, { useState } from 'react';
import {
  Container,
  Title,
  SearchInput,
  CategorySelect,
  FaqList,
  FaqItem,
  Question,
  AnswerWrapper,
  Answer
} from './faq.styles';

const faqs = [
  {
    category: 'Conta',
    question: 'Como acesso minha conta?',
    answer: 'Você pode acessar sua conta clicando em "Login" no topo da página.'
  },
  {
    category: 'Conta',
    question: 'Como redefinir minha senha?',
    answer: 'Clique em "Esqueci minha senha" na página de login.'
  },
  {
    category: 'Documentação',
    question: 'Onde posso encontrar a documentação?',
    answer: 'A documentação está disponível na seção "Ajuda" do portal.'
  },
  {
    category: 'Suporte',
    question: 'Como falar com o suporte?',
    answer: 'Você pode nos contactar pelo formulário de contato ou chat online.'
  }
];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [openIndex, setOpenIndex] = useState(null);

  const categorias = ['Todas', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <Container>
      <Title>FAQ - Perguntas Frequentes</Title>

      <SearchInput
        type="text"
        placeholder="Pesquisar uma pergunta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategorySelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categorias.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </CategorySelect>

      <FaqList>
        {filteredFaqs.map((faq, index) => (
          <FaqItem key={index} onClick={() => toggleAnswer(index)}>
            <Question isOpen={openIndex === index}>
              {faq.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </Question>
            <AnswerWrapper isOpen={openIndex === index}>
              <Answer>{faq.answer}</Answer>
            </AnswerWrapper>
          </FaqItem>
        ))}

        {filteredFaqs.length === 0 && <p>Nenhuma pergunta encontrada.</p>}
      </FaqList>
    </Container>
  );
}
