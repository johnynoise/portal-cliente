import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import {
  Container,
  Title,
  Description,
  LinkDoc,
  Loading,
  Error,
  ProductImage
} from './ProdutoDetalhe.styles';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

useEffect(() => {
  async function fetchProduto() {
    try {
      const res = await api.get(`/produtos/${id}`);
      setProduto(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErro('Produto não encontrado');
      } else {
        setErro('Erro ao carregar produto');
      }
    } finally {
      setLoading(false);
    }
  }

  fetchProduto();
}, [id]);

  if (loading) return <Loading>Carregando produto...</Loading>;
  if (erro) return <Error>{erro}</Error>;

  return (
    <Container>
      <Title>{produto.nome}</Title>
      {produto.imagemUrl && (
        <ProductImage src={produto.imagemUrl} alt={`Imagem de ${produto.nome}`} />
      )}
      <Description>{produto.descricao}</Description>
      {produto.linkDocumentacao && (
        <LinkDoc href={produto.linkDocumentacao} target="_blank" rel="noopener noreferrer">
          Ver documentação
        </LinkDoc>
      )}
    </Container>
  );
}
