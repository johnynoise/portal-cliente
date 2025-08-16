import styled, { keyframes } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Mapas de cores
export const statusColors = {
  Ativo: { bg: '#d4edda', color: '#155724' },
  Manutenção: { bg: '#fff3cd', color: '#856404' },
  Inativo: { bg: '#f8d7da', color: '#721c24' }
};

export const notificationColors = {
  info: { bg: 'rgba(102, 126, 234, 0.05)', border: '#667eea', hover: 'rgba(102, 126, 234, 0.1)' },
  warning: { bg: 'rgba(243, 156, 18, 0.05)', border: '#f39c12', hover: 'rgba(243, 156, 18, 0.1)' },
  success: { bg: 'rgba(39, 174, 96, 0.05)', border: '#27ae60', hover: 'rgba(39, 174, 96, 0.1)' },
  default: { bg: 'rgba(149, 165, 166, 0.05)', border: '#95a5a6', hover: 'rgba(149, 165, 166, 0.1)' }
};

// Container principal
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.8s ease;
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

// WelcomeCard
export const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  animation: ${pulse} 2s infinite;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;

export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const Badge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;

  ${props => {
    switch(props.type) {
      case 'success': return `background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;`;
      case 'info': return `background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;`;
      case 'warning': return `background-color: #fff3cd; color: #856404; border: 1px solid #ffeaa7;`;
      default: return `background-color: #f8f9fa; color: #495057; border: 1px solid #dee2e6;`;
    }
  }}
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// StatsGrid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const StatCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 25px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
`;

export const StatIcon = styled.div`
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

// ProductsSection
export const ProductsSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// NotificationsSection
export const NotificationsSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// SectionTitle
export const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
`;

// ProductCard
export const ProductCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #f0f0f0;
  background: white;

  &:hover {
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(102,126,234,0.1);
  }
`;

// ProductStatus
export const ProductStatus = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${({ status }) => statusColors[status]?.bg || '#f8f9fa'};
  color: ${({ status }) => statusColors[status]?.color || '#495057'};
`;

// NotificationItem
export const NotificationItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid ${({ type }) => notificationColors[type]?.border || notificationColors.default.border};
  background-color: ${({ type }) => notificationColors[type]?.bg || notificationColors.default.bg};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ type }) => notificationColors[type]?.hover || notificationColors.default.hover};
    transform: translateX(5px);
  }
`;
