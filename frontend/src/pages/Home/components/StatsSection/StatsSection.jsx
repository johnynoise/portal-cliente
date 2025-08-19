// frontend/src/pages/Home/components/StatsSection/StatsSection.jsx
import React from 'react';
import {
  SectionTitle,
  StatsGrid,
    StatCard,
    StatIcon,
    StatNumber,
    StatLabel
} from '../../Home.styles';

const StatsSection = ({ stats, title = "Visão Geral da Conta" }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <>
      <SectionTitle>
        📊 {title}
      </SectionTitle>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon>
              {stat.icon}
            </StatIcon>
            <div style={{ flex: 1 }}>
              <StatNumber>{stat.value}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
              {stat.description && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#888', 
                  marginTop: '0.2rem' 
                }}>
                  {stat.description}
                </div>
              )}
              {stat.trend && (
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#3c56e7', 
                  marginTop: '0.3rem',
                  fontWeight: '500'
                }}>
                  {stat.trend}
                </div>
              )}
            </div>
          </StatCard>
        ))}
      </StatsGrid>
    </>
  );
};

export default StatsSection;