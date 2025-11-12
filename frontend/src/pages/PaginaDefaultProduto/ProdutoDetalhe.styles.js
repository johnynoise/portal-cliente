import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Container Principal
export const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem 4rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
    margin: 1rem auto;
  }

  @media print {
    padding: 0;
    max-width: 100%;
  }
`;

// Breadcrumb
export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`;

export const BreadcrumbItem = styled.span`
  color: ${props => props.active ? '#495057' : '#007bff'};
  cursor: ${props => props.active ? 'default' : 'pointer'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.active ? '#495057' : '#0056b3'};
  }

  &:not(:last-child)::after {
    content: '›';
    margin-left: 0.5rem;
    color: #6c757d;
  }
`;

// Botões de Ação Flutuantes
export const BackButton = styled.button`
  position: fixed;
  top: 100px;
  left: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background: #007bff;
    color: white;
    border-color: #007bff;
    transform: translateX(-5px);
  }

  @media (max-width: 968px) {
    top: 80px;
    left: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  @media print {
    display: none;
  }
`;

// Seção Superior
export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #dee2e6;
  }
`;

// Galeria de Imagens
export const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MainImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media print {
    height: 400px;
    box-shadow: none;
    border: 1px solid #dee2e6;
  }
`;

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;

  @media print {
    display: none;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.active ? '#007bff' : '#e9ecef'};
  transition: all 0.3s ease;
  background: #f8f9fa;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.2);
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #adb5bd;
  font-size: 4rem;

  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;

// Cabeçalho do Produto
export const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProductTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #212529;
  margin: 0;
  line-height: 1.2;
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const getBadgeColors = (variant) => {
  const colors = {
    success: { bg: '#d4edda', border: '#28a745', text: '#155724' },
    warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
    danger: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' },
    default: { bg: '#e7f3ff', border: '#007bff', text: '#004085' }
  };
  return colors[variant] || colors.default;
};

export const StatusBadge = styled.span`
  ${props => {
    const colors = getBadgeColors(props.variant);
    return css`
      background: ${colors.bg};
      color: ${colors.text};
      border: 2px solid ${colors.border};
    `;
  }}
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const VersionBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MetaBadge = styled.span`
  background: #f8f9fa;
  color: #495057;
  border: 2px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

// Quick Info Cards
export const QuickInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

export const InfoCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    border-color: #007bff;
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
`;

// Action Bar
export const ActionBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media print {
    display: none;
  }
`;

export const ActionButton = styled.button`
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;

  ${props => {
    switch(props.variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0,123,255,0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,123,255,0.4);
          }
        `;
      case 'success':
        return css`
          background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(40,167,69,0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40,167,69,0.4);
          }
        `;
      case 'outline':
        return css`
          background: white;
          color: #6c757d;
          border: 2px solid #dee2e6;
          &:hover {
            background: #f8f9fa;
            border-color: #adb5bd;
            transform: translateY(-2px);
          }
        `;
      default:
        return css`
          background: white;
          color: #007bff;
          border: 2px solid #007bff;
          &:hover {
            background: #007bff;
            color: white;
            transform: translateY(-2px);
          }
        `;
    }
  }}
`;

export const ShareButton = styled(ActionButton)`
  background: linear-gradient(135deg, #6f42c1 0%, #520f8d 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(111,66,193,0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(111,66,193,0.4);
  }
`;

// Content Wrapper com Tabs
export const ContentWrapper = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;

  @media print {
    box-shadow: none;
    border: 1px solid #dee2e6;
  }
`;

export const TabNav = styled.div`
  display: flex;
  border-bottom: 2px solid #e9ecef;
  background: #f8f9fa;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #adb5bd;
    border-radius: 4px;
  }

  @media print {
    display: none;
  }
`;

export const Tab = styled.button`
  padding: 1.25rem 2rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? '#007bff' : '#6c757d'};
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: white;
    color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  padding: 2rem;
  animation: ${fadeIn} 0.4s ease-out;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e9ecef;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }
  }
`;

// Overview Section
export const OverviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #495057;

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// Specs Section
export const SpecsSection = styled.div``;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const SpecCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: #007bff;
  }
`;

export const SpecLabel = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
`;

export const SpecValue = styled.div`
  font-size: 1.15rem;
  color: #212529;
  font-weight: 500;
  word-break: break-word;
`;

// Documents Section
export const DocumentsSection = styled.div`
  .docs-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const DocumentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    border-color: #007bff;
  }
`;

export const DocIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  flex-shrink: 0;
`;

export const DocInfo = styled.div`
  flex: 1;
`;

export const DocTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
`;

export const DocMeta = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
`;

export const DownloadButton = styled.button`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(40,167,69,0.4);
  }
`;

// Certifications Section
export const CertificationsSection = styled.div`
  .certs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export const CertCard = styled.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  padding: 2rem;
  border-radius: 16px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    color: #212529;
    margin: 1rem 0;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    color: #6c757d;
    margin: 0.5rem 0;
    text-align: left;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.15);
    border-color: #007bff;
  }
`;

export const CertBadge = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(255,193,7,0.4);
`;

// Loading & Error States
export const Loading = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SkeletonBox = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 400px;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #dc3545;
    margin-bottom: 0.75rem;
  }

  .message {
    font-size: 1.1rem;
    color: #6c757d;
    margin-bottom: 2rem;
    max-width: 500px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #6c757d;

  .icon {
    font-size: 3rem;
    opacity: 0.5;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin: 0 0 1.5rem;
  }
`;
