import styled, { keyframes } from 'styled-components';

// Animação leve de pulso para o título 404
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    color: #333;
  }
  50% {
    transform: scale(1.1);
    color: #007bff;
  }
`;

// Fade in suave para o container
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  animation: ${fadeIn} 0.8s ease forwards;
`;

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  animation: ${pulse} 2.5s infinite;
`;

export const Message = styled.p`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 2.5rem;
  font-weight: 500;
`;

export const Button = styled.button`
  padding: 0.8rem 2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #0056b3;
    box-shadow: 0 6px 14px rgba(0, 86, 179, 0.5);
  }
`;
