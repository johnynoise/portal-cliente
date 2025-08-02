import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  Title,
  SearchInput,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductName,
} from './solucoes.styles';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Produtos & Soluções</Title>

      <SearchInput
        type="text"
        placeholder="Pesquisar produto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ProductsGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} onClick={() => navigate(`/produtos/${product.id}`)}>
            {product.imagemUrl && (
              <ProductImage src={product.imagemUrl} alt={product.nome} />
            )}
            <ProductName>{product.nome}</ProductName>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
}
