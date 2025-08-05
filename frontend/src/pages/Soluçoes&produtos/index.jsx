import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

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
      const { data } = await api.get('/produtos'); // o interceptor do api já manda o token no header
      setProducts(data);
    } catch (error) {
      // Se a resposta for 401, o interceptor já tratou, aqui só exibe mensagem para outros erros
      if (error.response && error.response.status !== 401) {
        toast.error(error.message || 'Erro ao carregar produtos');
      }
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
