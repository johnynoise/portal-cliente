import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const ProdutoCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`;

export const ProdutoInfo = styled.div`
  max-width: 75%;

  strong {
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0;
  }

  a {
    color: #0077cc;
    text-decoration: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: start;
`;

export const Button = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #c9302c;
  }
`;
