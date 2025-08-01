import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.1);
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #222;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #444;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #444;
  }
`;

export const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;
