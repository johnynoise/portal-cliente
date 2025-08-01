import styled from 'styled-components';

export const Container = styled.main`
  margin: 2rem auto;
  max-width: 960px;
  padding: 0 1rem;
  background-color: #fefefe;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 2rem;
  text-align: center;
`;

export const ProductsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgb(0 0 0 / 0.15);
  }
`;

export const ProductName = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`;

export const ProductDescription = styled.p`
  color: #555;
  line-height: 1.4;
`;
