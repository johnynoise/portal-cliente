// frontend/src/pages/Suporte/components/HeaderSection/HeaderSection.jsx
import React from 'react';
import { HeaderSection, HeaderTitle, HeaderSubtitle } from '../../Suporte.styles';

const HeaderSectionComponent = () => {
  return (
    <HeaderSection>
      <HeaderTitle>Central de Suporte</HeaderTitle>
      <HeaderSubtitle>
        Estamos aqui para ajudar você com todas as suas necessidades técnicas e comerciais. 
        Encontre respostas rápidas ou entre em contato com nossa equipe especializada.
      </HeaderSubtitle>
    </HeaderSection>
  );
};

export default HeaderSectionComponent;