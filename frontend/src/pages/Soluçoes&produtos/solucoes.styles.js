import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 1.5rem;
`;

export const ProductCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.25rem 1rem;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
  }
`;

export const ProductName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.4;
`;
