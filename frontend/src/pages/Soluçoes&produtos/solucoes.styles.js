import styled from 'styled-components';

export const Container = styled.main`
  margin: 2rem auto;
  width: 100vw;
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
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr); /* máximo 5 por linha */
`;

export const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgb(0 0 0 / 0.15);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const ProductName = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.4rem;
`;

export const ProductDescription = styled.p`
  color: #555;
  line-height: 1.3;
  font-size: 0.85rem;
`;
