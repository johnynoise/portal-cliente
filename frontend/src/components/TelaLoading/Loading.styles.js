import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Tela cheia */
  width: 100%;
  background-color: #f9f9f9;
`;

export const Logo = styled.img`
  width: 240px;
  margin-bottom: 20px;
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #ddd;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
