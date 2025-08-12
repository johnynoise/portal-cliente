// ProdutoDetalhe.styles.js - Versão Melhorada
import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 8px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #6f42c1, #e83e8c, #fd7e14);
    border-radius: 20px 20px 0 0;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  font-weight: 400;
  margin: 0;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  background: linear-gradient(45deg, #f0f2f5, #e4e6ea, #f0f2f5);
  background-size: 400% 400%;
  animation: ${shimmer} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-size: 3rem;
  border: 2px dashed #dee2e6;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #495057;
  text-align: justify;
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

export const MetaItem = styled.div`
  background: rgba(0, 123, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #007bff;
  font-weight: 500;
  border: 1px solid rgba(0, 123, 255, 0.2);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 160px;
  justify-content: center;

  ${props => props.variant === 'primary' && css`
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background: white;
    color: #007bff;
    border: 2px solid #007bff;

    &:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
    }
  `}

  ${props => props.variant === 'success' && css`
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
    }
  `}
`;

export const LinkDoc = styled.a`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 160px;
  justify-content: center;
  background: linear-gradient(135deg, #6f42c1 0%, #495057 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(111, 66, 193, 0.4);
    text-decoration: none;
    color: white;
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 400px;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .text {
    font-size: 1.2rem;
    color: #6c757d;
    animation: ${pulse} 2s infinite;
  }
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 400px;
  color: #dc3545;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .message {
    font-size: 1.1rem;
    color: #6c757d;
    margin-bottom: 2rem;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dee2e6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: translateX(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
  }
`;

export const ShareButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dee2e6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;

  img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;