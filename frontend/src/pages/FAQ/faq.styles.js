import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

export const FaqItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
`;

export const Question = styled.h3`
  font-size: 1.1rem;
  color: #222;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #0077cc;
  }
`;

export const Answer = styled.p`
  margin-top: 0.5rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
`;
