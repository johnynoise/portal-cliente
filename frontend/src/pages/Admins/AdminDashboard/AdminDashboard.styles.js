import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Title = styled.h2`
  margin: 2rem 0 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
`;

export const Button = styled.button`
  background-color: #2c73d2;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #1a56b3;
  }
`;

export const ProdutoLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProdutoCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProdutoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProdutoLink = styled.a`
  margin-top: 0.5rem;
  color: #2c73d2;
  text-decoration: underline;
`;

export const ProdutoActions = styled.div`
  display: flex;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
