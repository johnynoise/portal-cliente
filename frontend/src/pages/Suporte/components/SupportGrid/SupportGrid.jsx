// frontend/src/pages/Suporte/components/SupportGrid/SupportGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SupportGrid, 
  SupportCard, 
  CardIcon, 
  CardTitle, 
  CardDescription, 
  CardAction 
} from '../../Suporte.styles';

const SupportGridComponent = ({ supportOptions }) => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <SupportGrid>
      {supportOptions.map((option) => (
        <SupportCard
          key={option.id}
          onClick={() => handleCardClick(option.link)}
        >
          <CardIcon>{option.icon}</CardIcon>
          <CardTitle>{option.title}</CardTitle>
          <CardDescription>{option.description}</CardDescription>
          <CardAction>
            {option.action} →
          </CardAction>
        </SupportCard>
      ))}
    </SupportGrid>
  );
};

export default SupportGridComponent;