// src/pages/AdminGerenciarProdutos.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  Title,
  ProdutoCard,
  ProdutoInfo,
  ButtonGroup,
  Button,
} from './AdminProdutos.styles';

function AdminGerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    try {
      const res = await fetch('http://localhost:3000/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erro ao carregar produtos');

      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function deletarProduto(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erro ao excluir produto');

      toast.success('Produto excluído com sucesso!');
      fetchProdutos(); // Atualiza lista
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      <Title>Gerenciar Produtos</Title>
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id}>
          <ProdutoInfo>
            <strong>{produto.nome}</strong>
            <p>{produto.descricao}</p>
            <a href={produto.linkDocumentacao} target="_blank" rel="noopener noreferrer">
              Ver documentação
            </a>
          </ProdutoInfo>
          <ButtonGroup>
            {/* Aqui você pode adicionar botão de edição futuramente */}
            <Button onClick={() => deletarProduto(produto.id)}>Excluir</Button>
          </ButtonGroup>
        </ProdutoCard>
      ))}
    </Container>
  );
}

export default AdminGerenciarProdutos;
