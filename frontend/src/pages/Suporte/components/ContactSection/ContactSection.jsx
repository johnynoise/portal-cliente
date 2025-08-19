// frontend/src/pages/Suporte/components/ContactSection/ContactSection.jsx
import React from 'react';
import { 
  ContactSection, 
  SectionTitle, 
  ContactGrid, 
  ContactItem, 
  ContactIcon, 
  ContactTitle, 
  ContactInfo 
} from '../../Suporte.styles';

const ContactSectionComponent = () => {
  const contactOptions = [
    {
      id: 1,
      icon: '📞',
      title: 'Suporte Técnico',
      info: (
        <>
          <strong>(11) 3000-0000</strong><br />
          Segunda a Sexta: 8h às 18h<br />
          Sábado: 8h às 12h
        </>
      )
    },
    {
      id: 2,
      icon: '✉️',
      title: 'E-mail Corporativo',
      info: (
        <>
          <strong>suporte@empresa.com.br</strong><br />
          Resposta em até 4 horas<br />
          comercial@empresa.com.br
        </>
      )
    },
    {
      id: 3,
      icon: '🕒',
      title: 'Suporte 24/7',
      info: (
        <>
          <strong>Emergências técnicas</strong><br />
          0800 000 0000<br />
          Disponível 24h por dia
        </>
      )
    }
  ];

  return (
    <ContactSection>
      <SectionTitle>Precisa de Ajuda Personalizada?</SectionTitle>
      <ContactGrid>
        {contactOptions.map((contact) => (
          <ContactItem key={contact.id}>
            <ContactIcon>{contact.icon}</ContactIcon>
            <ContactTitle>{contact.title}</ContactTitle>
            <ContactInfo>{contact.info}</ContactInfo>
          </ContactItem>
        ))}
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactSectionComponent;