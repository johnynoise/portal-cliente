// ProdutoDetalhe.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #222;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
`;

export const LinkDoc = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  font-weight: 500;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export const Error = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: red;
`;
export const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  margin: 1.5rem 0;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
