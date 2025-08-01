import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  ProductsGrid,
  ProductCard,
  ProductName,
  ProductDescription,
} from './solucoes.styles';

const products = [
  {
    id: 1,
    name: 'Medidor Smart X1',
    description: 'Medidor de energia inteligente com comunicação remota.',
    docUrl: '/docs/medidor-smart-x1',
  },
  {
    id: 2,
    name: 'Software Gestão Energia',
    description: 'Sistema para controle e análise de consumo energético.',
    docUrl: '/docs/software-gestao-energia',
  },
  {
    id: 3,
    name: 'Sensor IoT',
    description: 'Sensor para monitoramento em tempo real da rede elétrica.',
    docUrl: '/docs/sensor-iot',
  },
  // Adicione mais produtos aqui
];

export default function Products() {
  const navigate = useNavigate();

  function handleClick(docUrl) {
    navigate(docUrl);
  }

  return (
    <Container>
      <Title>Produtos & Soluções</Title>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id} onClick={() => handleClick(product.docUrl)}>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
}
