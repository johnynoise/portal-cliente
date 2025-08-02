import React, { useState } from 'react';
import {
  Container,
  Title,
  FaqItem,
  Question,
  Answer
} from './faq.styles';

const faqData = [
  {
    question: 'Como posso acessar meus relatórios?',
    answer: 'Você pode acessar seus relatórios ao fazer login e ir até a aba "Meus Relatórios" no menu principal.'
  },
  {
    question: 'O que fazer se eu esquecer minha senha?',
    answer: 'Use a opção "Esqueci minha senha" na página de login. Um link de recuperação será enviado ao seu e-mail.'
  },
  {
    question: 'Como posso entrar em contato com o suporte?',
    answer: 'Envie um e-mail para suporte@seudominio.com ou utilize o formulário de contato dentro do portal.'
  },
  {
    question: 'Posso alterar meus dados cadastrais?',
    answer: 'Sim, vá até a aba "Meu Perfil" e edite as informações desejadas.'
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <Title>Perguntas Frequentes</Title>
      {faqData.map((item, index) => (
        <FaqItem key={index}>
          <Question onClick={() => toggle(index)}>
            {item.question}
          </Question>
          {activeIndex === index && <Answer>{item.answer}</Answer>}
        </FaqItem>
      ))}
    </Container>
  );
}
