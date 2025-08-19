import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  background-attachment: fixed;
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #1a202c;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`;

export const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const SectionTitle = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const RequiredIndicator = styled.span`
  color: #e53e3e;
  font-size: 1rem;
`;

export const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : 'rgba(226, 232, 240, 0.6)'};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #a0aec0;
  }

  &:disabled {
    background: rgba(247, 250, 252, 0.8);
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : 'rgba(226, 232, 240, 0.6)'};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : 'rgba(226, 232, 240, 0.6)'};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#667eea'};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

export const FileUploadArea = styled.div`
  position: relative;
  border: 3px dashed ${props => props.hasError ? '#e53e3e' : props.isDragging ? '#667eea' : 'rgba(160, 174, 192, 0.6)'};
  border-radius: 16px;
  background: ${props => props.isDragging ? 'rgba(102, 126, 234, 0.05)' : 'rgba(255, 255, 255, 0.4)'};
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
    transform: translateY(-2px);
  }
`;

export const DragOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  z-index: 10;
`;

export const FileUploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    margin: 0;
    color: #2d3748;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #4a5568;
    font-size: 1rem;
  }
`;

export const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: ${pulse} 2s infinite;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  max-width: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(229, 62, 62, 0.9);
  color: white;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e53e3e;
    transform: scale(1.1);
  }
`;

export const ImageUploadStats = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  p {
    margin: 0.25rem 0;
    color: #4a5568;
    font-size: 0.9rem;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Tag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const TagInput = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid rgba(226, 232, 240, 0.6);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem;
  }
`;

export const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  color: #4a5568;
  border: 2px solid rgba(226, 232, 240, 0.6);
  backdrop-filter: blur(5px);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(247, 250, 252, 0.95);
    border-color: #cbd5e0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(226, 232, 240, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

export const ErrorMessage = styled.span`
  color: #e53e3e;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '⚠️';
    font-size: 0.75rem;
  }
`;

export const SuccessMessage = styled.div`
  color: #38a169;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  padding: 0.75rem;
  background: rgba(72, 187, 120, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(72, 187, 120, 0.2);
`;

export const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const CharacterCount = styled.span`
  font-size: 0.75rem;
  color: #718096;
  text-align: right;
  margin-top: 0.25rem;
`;

export const HelpText = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
  font-style: italic;
`;