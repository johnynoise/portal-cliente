import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  Title,
  ProductsGrid,
  ProductCard,
  ProductName,
  ProductDescription,
} from './solucoes.styles';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('http://localhost:3000/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erro ao carregar produtos');

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Container>
      <Title>Produtos & Soluções</Title>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id} onClick={() => navigate(`/produtos/${product.id}`)}>
            {product.imagemUrl && (
              <img 
                src={product.imagemUrl} 
                alt={product.nome} 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }} 
              />
            )}
            <ProductName>{product.nome}</ProductName>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
}
