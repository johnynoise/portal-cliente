import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const Card = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #666;
  }
`;
