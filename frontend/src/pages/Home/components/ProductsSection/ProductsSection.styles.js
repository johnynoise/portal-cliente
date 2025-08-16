import styled from 'styled-components';
import { statusColors } from '../../Home.styles';

export const ProductsSection = styled.section`
  background: rgba(255,255,255,0.95); backdrop-filter:blur(10px);
  border-radius:20px; padding:2rem; box-shadow:0 8px 30px rgba(0,0,0,0.1);
  border:1px solid rgba(255,255,255,0.2);
  max-height:600px; overflow-y:auto; display:flex; flex-direction:column; gap:1rem;
`;

export const SectionTitle = styled.h3`
  font-size:1.4rem; font-weight:700; color:#2c3e50; margin:0 0 1rem 0; display:flex; align-items:center;
`;

export const ProductCard = styled.div`
  display:flex; gap:1rem; padding:1.5rem; border-radius:12px; transition:all 0.3s ease; cursor:pointer;
  border:2px solid #f0f0f0; background:white;
  &:hover{ border-color:#667eea; transform:translateX(5px); box-shadow:0 4px 15px rgba(102,126,234,0.1);}
`;

export const ProductImage = styled.img`
  width:80px; height:60px; object-fit:cover; border-radius:8px; background:#f0f0f0;
`;

export const ProductInfo = styled.div`flex:1;`;

export const ProductTitle = styled.h4`font-size:1.1rem; font-weight:600; color:#2c3e50; margin:0 0 0.5rem 0;`;

export const ProductDescription = styled.p`color:#666; font-size:0.9rem; line-height:1.4; margin:0;`;

export const ProductStatus = styled.span`
  padding:0.3rem 0.8rem; border-radius:12px; font-size:0.8rem; font-weight:600;
  background-color: ${({ status }) => statusColors[status]?.bg || '#f8f9fa'};
  color: ${({ status }) => statusColors[status]?.color || '#495057'};
`;
