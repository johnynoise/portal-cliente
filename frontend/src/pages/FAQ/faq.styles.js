import styled from 'styled-components';

export const Container = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const CategorySelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FaqItem = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  cursor: pointer;
`;

export const Question = styled.h2`
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ isOpen }) => (isOpen ? '#0077cc' : '#333')};
`;

export const AnswerWrapper = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

export const Answer = styled.p`
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
`;
