import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
`;

export const Form = styled.form`
  background: white;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 0.8rem;
  width: 100%;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Message = styled.p`
  color: green;
  font-weight: bold;
`;
