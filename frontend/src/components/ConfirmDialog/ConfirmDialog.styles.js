import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const DialogContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 450px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  animation: ${scaleUp} 0.2s ease-out;
`;

export const DialogIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  ${props => {
    switch (props.type) {
      case 'danger':
        return `
          color: #f56565;
          filter: drop-shadow(0 0 10px rgba(245, 101, 101, 0.3));
        `;
      case 'info':
        return `
          color: #4299e1;
          filter: drop-shadow(0 0 10px rgba(66, 153, 225, 0.3));
        `;
      default:
        return `
          color: #ed8936;
          filter: drop-shadow(0 0 10px rgba(237, 137, 54, 0.3));
        `;
    }
  }}
`;

export const DialogContent = styled.div`
  margin-bottom: 2rem;
`;

export const DialogTitle = styled.h3`
  color: #2d3748;
  font-size: 1.375rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
`;

export const DialogMessage = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const DialogButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  ${props => {
    if (props.variant === 'danger') {
      return `
        background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(245, 101, 101, 0.4);
        }
      `;
    } else if (props.variant === 'primary') {
      return `
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
        }
      `;
    } else {
      return `
        background: white;
        color: #4a5568;
        border: 2px solid #e2e8f0;

        &:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
        }
      `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;