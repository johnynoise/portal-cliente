import React from 'react';
import { ProductsSection as Section, SectionTitle, ProductCard, ProductImage, ProductInfo, ProductTitle, ProductDescription, ProductStatus } from './ProductsSection.styles';

export default function ProductsSection({ products }) {
  return (
    <Section>
      <SectionTitle>Seus Produtos ({products.length})</SectionTitle>
      {products.map(product => (
        <ProductCard key={product.id}>
          <ProductImage src={product.image} alt={product.title} />
          <ProductInfo>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <ProductStatus status={product.status}>{product.status}</ProductStatus>
              <span style={{ fontSize:'0.9rem', color:'#666' }}>{product.consumo}</span>
            </div>
          </ProductInfo>
        </ProductCard>
      ))}
    </Section>
  );
}
