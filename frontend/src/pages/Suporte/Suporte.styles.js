// frontend/src/pages/Suporte/Suporte.styles.js
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

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

// Header Section
export const HeaderSection = styled.header`
  background: linear-gradient(135deg, #3c56e7 0%, #5a67d8 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/api/placeholder/100/100') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  animation: ${slideUp} 0.8s ease;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: ${slideUp} 0.8s ease 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

// Search Section
export const SearchSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.8s ease 0.3s both;
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1.1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #3c56e7;
    box-shadow: 0 0 0 3px rgba(60, 86, 231, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.2rem;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 1rem;
  border: 1px solid rgba(39, 174, 96, 0.2);
`;

// Support Grid
export const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease 0.4s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const SupportCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(60, 86, 231, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3c56e7, #5a67d8);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const CardIcon = styled.div`
  font-size: 3rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, rgba(60, 86, 231, 0.1), rgba(90, 103, 216, 0.1));
  border-radius: 16px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  ${SupportCard}:hover & {
    transform: scale(1.1);
    background: linear-gradient(45deg, rgba(60, 86, 231, 0.2), rgba(90, 103, 216, 0.2));
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  line-height: 1.3;
`;

export const CardDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

export const CardAction = styled.div`
  color: #3c56e7;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  ${SupportCard}:hover & {
    transform: translateX(5px);
    color: #2d46c7;
  }
`;

// Contact Section
export const ContactSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.8s ease 0.5s both;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ContactItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(60, 86, 231, 0.02);
  }
`;

export const ContactIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, rgba(60, 86, 231, 0.1), rgba(90, 103, 216, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  animation: ${pulse} 3s infinite;

  ${ContactItem}:hover & {
    transform: scale(1.1);
    background: linear-gradient(45deg, rgba(60, 86, 231, 0.2), rgba(90, 103, 216, 0.2));
  }
`;

export const ContactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

export const ContactInfo = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    color: #3c56e7;
    font-weight: 600;
  }
`;

// Responsividade adicional
export const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${HeaderSection} {
      padding: 2rem 1rem;
    }

    ${SearchSection} {
      padding: 1.5rem;
      margin: 0 1rem;
    }

    ${ContactSection} {
      padding: 2rem 1rem;
      margin: 0 1rem;
    }

    ${Content} {
      padding: 1rem;
    }
  }
`;