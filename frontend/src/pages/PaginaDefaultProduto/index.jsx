import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Container,
  Header,
  Title,
  Subtitle,
  ContentGrid,
  ImageSection,
  ProductImage,
  ImagePlaceholder,
  InfoSection,
  Description,
  MetaInfo,
  MetaItem,
  ActionButtons,
  Button,
  LinkDoc,
  Loading,
  Error,
  BackButton,
  ShareButton,
  Modal,
  CloseButton
} from './ProdutoDetalhe.styles';

// Componente de ícones (você pode substituir por uma biblioteca como react-icons)
const Icons = {
  ArrowLeft: () => <span>←</span>,
  Share: () => <span>📤</span>,
  ExternalLink: () => <span>🔗</span>,
  Heart: () => <span>❤️</span>,
  Star: () => <span>⭐</span>,
  Download: () => <span>⬇️</span>,
  Eye: () => <span>👁️</span>,
  Close: () => <span>✕</span>,
  ImageIcon: () => <span>🖼️</span>,
  Calendar: () => <span>📅</span>,
  Tag: () => <span>🏷️</span>
};

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);
  const [visualizacoes, setVisualizacoes] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const res = await api.get(`/produtos/${id}`);
        setProduto(res.data);
        
        // Incrementar visualizações
        await incrementarVisualizacoes();
        
        // Verificar se está nos favoritos (localStorage)
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        setIsFavorito(favoritos.includes(id));
        
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setErro({
            title: 'Produto não encontrado',
            message: 'O produto que você está procurando não existe ou foi removido.'
          });
        } else {
          setErro({
            title: 'Erro ao carregar',
            message: 'Não foi possível carregar as informações do produto. Tente novamente.'
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id]);

  const incrementarVisualizacoes = async () => {
    try {
      const res = await api.post(`/produtos/${id}/visualizacao`);
      setVisualizacoes(res.data.visualizacoes || 0);
    } catch (err) {
      console.log('Erro ao incrementar visualizações:', err);
    }
  };

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    let novosFavoritos;
    
    if (isFavorito) {
      novosFavoritos = favoritos.filter(favId => favId !== id);
    } else {
      novosFavoritos = [...favoritos, id];
    }
    
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    setIsFavorito(!isFavorito);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: produto.nome,
          text: produto.descricao,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
        copiarLink();
      }
    } else {
      copiarLink();
    }
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copiado para a área de transferência!');
    }).catch(() => {
      alert('Não foi possível copiar o link');
    });
  };

  const formatarData = (dataString) => {
    if (!dataString) return null;
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch {
      return null;
    }
  };

  const voltar = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container>
        <Loading>
          <div className="spinner"></div>
          <div className="text">Carregando produto...</div>
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
          <Button href variant="primary" onClick={() => navigate('/solucoes-produtos')} >
            <Icons.ArrowLeft /> Voltar
          </Button>
        </Error>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <BackButton onClick={voltar} title="Voltar">
          <Icons.ArrowLeft />
        </BackButton>
        
        <ShareButton onClick={compartilhar} title="Compartilhar">
          <Icons.Share />
        </ShareButton>

        <Header>
          <Title>{produto.nome}</Title>
          {produto.subtitulo && <Subtitle>{produto.subtitulo}</Subtitle>}
        </Header>

        <ContentGrid>
          <ImageSection>
            {produto.imagemUrl ? (
              <ProductImage 
                src={produto.imagemUrl} 
                alt={`Imagem de ${produto.nome}`}
                onClick={() => setShowImageModal(true)}
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            ) : (
              <ImagePlaceholder>
                <Icons.ImageIcon />
              </ImagePlaceholder>
            )}
            {!imageLoaded && produto.imagemUrl && (
              <ImagePlaceholder>
                <div className="spinner"></div>
              </ImagePlaceholder>
            )}
          </ImageSection>

          <InfoSection>
            <Description>
              {produto.descricao ? (
                produto.descricao.split('\n').map((paragrafo, index) => (
                  <p key={index}>{paragrafo}</p>
                ))
              ) : (
                <p>Descrição não disponível.</p>
              )}
            </Description>

            <MetaInfo>
              {visualizacoes > 0 && (
                <MetaItem>
                  <Icons.Eye /> {visualizacoes} visualizações
                </MetaItem>
              )}
              
              {produto.categoria && (
                <MetaItem>
                  <Icons.Tag /> {produto.categoria}
                </MetaItem>
              )}
              
              {produto.dataPublicacao && (
                <MetaItem>
                  <Icons.Calendar /> {formatarData(produto.dataPublicacao)}
                </MetaItem>
              )}
            </MetaInfo>

            <ActionButtons>
              <Button 
                variant={isFavorito ? 'success' : 'secondary'} 
                onClick={toggleFavorito}
              >
                <Icons.Heart /> {isFavorito ? 'Favoritado' : 'Favoritar'}
              </Button>

              {produto.linkDocumentacao && (
                <LinkDoc 
                  href={produto.linkDocumentacao} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Icons.ExternalLink /> Documentação
                </LinkDoc>
              )}

              {produto.linkDownload && (
                <Button 
                  as="a" 
                  href={produto.linkDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  <Icons.Download /> Download
                </Button>
              )}
            </ActionButtons>
          </InfoSection>
        </ContentGrid>
      </Container>

      {/* Modal para visualizar imagem em tela cheia */}
      {showImageModal && produto.imagemUrl && (
        <Modal onClick={() => setShowImageModal(false)}>
          <CloseButton onClick={() => setShowImageModal(false)}>
            <Icons.Close />
          </CloseButton>
          <img 
            src={produto.imagemUrl} 
            alt={`Imagem de ${produto.nome}`}
            onClick={(e) => e.stopPropagation()}
          />
        </Modal>
      )}
    </>
  );
}