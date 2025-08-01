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

  function handleClick(docUrl) {
    // Se a docUrl for uma URL externa absoluta, usa window.open
    if (docUrl.startsWith('http')) {
      window.open(docUrl, '_blank');
    } else {
      // Caso seja uma rota interna
      navigate(docUrl);
    }
  }

  return (
    <Container>
      <Title>Produtos & Soluções</Title>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id} onClick={() => handleClick(product.linkDocumentacao)}>
            <ProductName>{product.nome}</ProductName>
            <ProductDescription>{product.descricao}</ProductDescription>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
}
