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
  height: 140px;          /* altura fixa para uniformizar */
  object-fit: cover;      /* cobre todo o espaço, cortando partes se precisar */
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;


export const ProductName = styled.h2`
text-align: center;
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

export const SearchInput = styled.input`
  display: block;
  margin: 0 auto 2rem auto;
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;