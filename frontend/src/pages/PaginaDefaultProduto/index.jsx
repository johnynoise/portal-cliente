import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  TopSection,
  ProductHeader,
  ProductTitle,
  BadgeGroup,
  StatusBadge,
  VersionBadge,
  MetaBadge,
  ImageGallery,
  MainImage,
  ThumbnailGrid,
  Thumbnail,
  ImagePlaceholder,
  ContentWrapper,
  TabNav,
  Tab,
  TabContent,
  OverviewSection,
  Description,
  QuickInfo,
  InfoCard,
  InfoLabel,
  InfoValue,
  SpecsSection,
  SpecsGrid,
  SpecCard,
  SpecLabel,
  SpecValue,
  DocumentsSection,
  DocumentCard,
  DocIcon,
  DocInfo,
  DocTitle,
  DocMeta,
  DownloadButton,
  CertificationsSection,
  CertCard,
  CertBadge,
  ActionBar,
  ActionButton,
  ShareButton,
  BackButton,
  Loading,
  SkeletonBox,
  Error,
  EmptyState
} from './ProdutoDetalhe.styles';

// Ícones usando emojis (você pode substituir por react-icons)
const Icons = {
  ArrowLeft: () => '←',
  ArrowRight: () => '→',
  Home: () => '🏠',
  Share: () => '📤',
  Print: () => '🖨️',
  Download: () => '⬇️',
  Heart: () => '❤️',
  HeartFilled: () => '❤️',
  Eye: () => '👁️',
  Calendar: () => '📅',
  Users: () => '👥',
  Package: () => '📦',
  FileText: () => '📄',
  File: () => '📋',
  Award: () => '🏆',
  CheckCircle: () => '✓',
  AlertCircle: () => '⚠️',
  XCircle: () => '⊗',
  Image: () => '🖼️',
  Link: () => '🔗',
  Factory: () => '🏭'
};

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    fetchProduto();
  }, [id]);

  const fetchProduto = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/produtos/${id}`);
      setProduto(res.data);
      
      // Verificar favoritos
      const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      setIsFavorito(favoritos.includes(id));
      
    } catch (err) {
      console.error('Erro ao carregar produto:', err);
      setErro({
        title: 'Produto não encontrado',
        message: 'O produto que você procura não existe ou foi removido.'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    let novosFavoritos;
    
    if (isFavorito) {
      novosFavoritos = favoritos.filter(favId => favId !== id);
      toast.info('Removido dos favoritos');
    } else {
      novosFavoritos = [...favoritos, id];
      toast.success('Adicionado aos favoritos!');
    }
    
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    setIsFavorito(!isFavorito);
  };

  const compartilhar = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: produto.nome,
          text: produto.descricao?.substring(0, 100),
          url: url
        });
        toast.success('Compartilhado com sucesso!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copiarLink(url);
        }
      }
    } else {
      copiarLink(url);
    }
  };

  const copiarLink = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Link copiado!'))
      .catch(() => toast.error('Erro ao copiar link'));
  };

  const imprimirDatasheet = () => {
    window.print();
    toast.info('Preparando para impressão...');
  };

  const handleDownloadDoc = async (doc) => {
    try {
      toast.info(`Baixando ${doc.nome}...`);
      window.open(doc.url, '_blank');
    } catch (err) {
      toast.error('Erro ao baixar documento');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusIcon = () => {
    switch (produto?.status) {
      case 'ativo': return Icons.CheckCircle();
      case 'desenvolvimento': return Icons.AlertCircle();
      case 'descontinuado': return Icons.XCircle();
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (produto?.status) {
      case 'ativo': return 'success';
      case 'desenvolvimento': return 'warning';
      case 'descontinuado': return 'danger';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading>
          <SkeletonBox width="200px" height="20px" />
          <SkeletonBox width="60%" height="40px" style={{ marginTop: '2rem' }} />
          <SkeletonBox width="40%" height="20px" style={{ marginTop: '1rem' }} />
          <SkeletonBox width="100%" height="400px" style={{ marginTop: '2rem' }} />
        </Loading>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container>
        <Error>
          <div className="icon">⚠️</div>
          <div className="title">{erro.title}</div>
          <div className="message">{erro.message}</div>
          <ActionButton variant="primary" onClick={() => navigate('/solucoes-produtos')}>
            {Icons.ArrowLeft()} Voltar para Produtos
          </ActionButton>
        </Error>
      </Container>
    );
  }

  const images = [produto.imagemUrl, ...(produto.galeria || [])].filter(Boolean);

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)} title="Voltar">
        {Icons.ArrowLeft()}
      </BackButton>

      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate('/')}>
          {Icons.Home()} Início
        </BreadcrumbItem>
        <BreadcrumbItem onClick={() => navigate('/solucoes-produtos')}>
          Produtos
        </BreadcrumbItem>
        <BreadcrumbItem active>{produto.nome}</BreadcrumbItem>
      </Breadcrumb>

      <TopSection>
        <ImageGallery>
          <MainImage>
            {images.length > 0 ? (
              <img src={images[selectedImage]} alt={produto.nome} />
            ) : (
              <ImagePlaceholder>
                {Icons.Image()}
                <span>Sem imagem</span>
              </ImagePlaceholder>
            )}
          </MainImage>
          
          {images.length > 1 && (
            <ThumbnailGrid>
              {images.map((img, idx) => (
                <Thumbnail
                  key={idx}
                  active={selectedImage === idx}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${produto.nome} ${idx + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailGrid>
          )}
        </ImageGallery>

        <ProductHeader>
          <ProductTitle>{produto.nome}</ProductTitle>
          
          <BadgeGroup>
            <StatusBadge variant={getStatusColor()}>
              {getStatusIcon()} {produto.status || 'Ativo'}
            </StatusBadge>
            
            {produto.versao && (
              <VersionBadge>v{produto.versao}</VersionBadge>
            )}
            
            {produto.categoria && (
              <MetaBadge>{produto.categoria}</MetaBadge>
            )}
          </BadgeGroup>

          <QuickInfo>
            {produto.fabricante && (
              <InfoCard>
                <InfoLabel>{Icons.Factory()} Fabricante</InfoLabel>
                <InfoValue>{produto.fabricante}</InfoValue>
              </InfoCard>
            )}
            
            <InfoCard>
              <InfoLabel>{Icons.Users()} Clientes</InfoLabel>
              <InfoValue>{produto.totalClientes || 0}</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoLabel>{Icons.Eye()} Visualizações</InfoLabel>
              <InfoValue>{produto.visualizacoes || 0}</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoLabel>{Icons.Calendar()} Atualizado</InfoLabel>
              <InfoValue>{formatDate(produto.atualizadoEm)}</InfoValue>
            </InfoCard>
          </QuickInfo>

          <ActionBar>
            <ActionButton 
              variant={isFavorito ? 'success' : 'secondary'}
              onClick={toggleFavorito}
            >
              {isFavorito ? Icons.HeartFilled() : Icons.Heart()}
              {isFavorito ? 'Favoritado' : 'Favoritar'}
            </ActionButton>
            
            <ShareButton onClick={compartilhar}>
              {Icons.Share()} Compartilhar
            </ShareButton>
            
            <ActionButton variant="outline" onClick={imprimirDatasheet}>
              {Icons.Print()} Imprimir
            </ActionButton>
          </ActionBar>
        </ProductHeader>
      </TopSection>

      <ContentWrapper>
        <TabNav>
          <Tab 
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            {Icons.Package()} Visão Geral
          </Tab>
          <Tab 
            active={activeTab === 'specs'}
            onClick={() => setActiveTab('specs')}
          >
            {Icons.FileText()} Especificações
          </Tab>
          <Tab 
            active={activeTab === 'docs'}
            onClick={() => setActiveTab('docs')}
          >
            {Icons.File()} Documentos
          </Tab>
          <Tab 
            active={activeTab === 'certs'}
            onClick={() => setActiveTab('certs')}
          >
            {Icons.Award()} Certificações
          </Tab>
        </TabNav>

        <TabContent active={activeTab === 'overview'}>
          <OverviewSection>
            <h2>Sobre o Produto</h2>
            <Description>
              {produto.descricao ? (
                produto.descricao.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))
              ) : (
                <EmptyState>Descrição não disponível</EmptyState>
              )}
            </Description>

            {produto.linkDocumentacao && (
              <ActionButton 
                as="a" 
                href={produto.linkDocumentacao}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                {Icons.Link()} Acessar Documentação Completa
              </ActionButton>
            )}
          </OverviewSection>
        </TabContent>

        <TabContent active={activeTab === 'specs'}>
          <SpecsSection>
            <h2>Especificações Técnicas</h2>
            
            {produto.especificacoes && Object.keys(produto.especificacoes).length > 0 ? (
              <SpecsGrid>
                {Object.entries(produto.especificacoes).map(([key, value]) => (
                  <SpecCard key={key}>
                    <SpecLabel>{key}</SpecLabel>
                    <SpecValue>{value}</SpecValue>
                  </SpecCard>
                ))}
              </SpecsGrid>
            ) : (
              <EmptyState>
                <div className="icon">{Icons.FileText()}</div>
                <p>Especificações técnicas não disponíveis</p>
                {produto.linkDocumentacao && (
                  <ActionButton 
                    as="a"
                    href={produto.linkDocumentacao}
                    target="_blank"
                    variant="secondary"
                  >
                    Ver Documentação Completa
                  </ActionButton>
                )}
              </EmptyState>
            )}
          </SpecsSection>
        </TabContent>

        <TabContent active={activeTab === 'docs'}>
          <DocumentsSection>
            <h2>Documentos e Downloads</h2>
            
            {produto.documentos && produto.documentos.length > 0 ? (
              <div className="docs-grid">
                {produto.documentos.map((doc, idx) => (
                  <DocumentCard key={idx}>
                    <DocIcon tipo={doc.tipo}>{Icons.File()}</DocIcon>
                    <DocInfo>
                      <DocTitle>{doc.nome}</DocTitle>
                      <DocMeta>
                        {doc.tipo} • {doc.tamanho || 'N/A'}
                        {doc.dataUpload && ` • ${formatDate(doc.dataUpload)}`}
                      </DocMeta>
                    </DocInfo>
                    <DownloadButton onClick={() => handleDownloadDoc(doc)}>
                      {Icons.Download()}
                    </DownloadButton>
                  </DocumentCard>
                ))}
              </div>
            ) : (
              <EmptyState>
                <div className="icon">{Icons.File()}</div>
                <p>Nenhum documento disponível para download</p>
                {produto.linkDocumentacao && (
                  <ActionButton 
                    as="a"
                    href={produto.linkDocumentacao}
                    target="_blank"
                    variant="secondary"
                  >
                    Acessar Documentação Online
                  </ActionButton>
                )}
              </EmptyState>
            )}
          </DocumentsSection>
        </TabContent>

        <TabContent active={activeTab === 'certs'}>
          <CertificationsSection>
            <h2>Certificações e Portarias</h2>
            
            {produto.certificacoes && produto.certificacoes.length > 0 ? (
              <div className="certs-grid">
                {produto.certificacoes.map((cert, idx) => (
                  <CertCard key={idx}>
                    <CertBadge>{Icons.Award()}</CertBadge>
                    <h3>{cert.tipo}</h3>
                    <p><strong>Número:</strong> {cert.numero}</p>
                    <p><strong>Órgão:</strong> {cert.orgao}</p>
                    {cert.dataValidade && (
                      <p><strong>Validade:</strong> {formatDate(cert.dataValidade)}</p>
                    )}
                    {cert.url && (
                      <ActionButton 
                        as="a"
                        href={cert.url}
                        target="_blank"
                        variant="secondary"
                        style={{ marginTop: '1rem' }}
                      >
                        {Icons.Link()} Ver Certificado
                      </ActionButton>
                    )}
                  </CertCard>
                ))}
              </div>
            ) : (
              <EmptyState>
                <div className="icon">{Icons.Award()}</div>
                <p>Nenhuma certificação cadastrada</p>
                {produto.linkCertificacao && (
                  <ActionButton 
                    as="a"
                    href={produto.linkCertificacao}
                    target="_blank"
                    variant="secondary"
                  >
                    Ver Certificações
                  </ActionButton>
                )}
              </EmptyState>
            )}
          </CertificationsSection>
        </TabContent>
      </ContentWrapper>
    </Container>
  );
}