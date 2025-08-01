import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  Title,
  Form,
  Input,
  TextArea,
  Button,
  ProdutoLista,
  ProdutoCard,
  ProdutoInfo,
  ProdutoLink,
  ProdutoActions,
  DeleteButton,
} from './AdminDashboard.styles';

function AdminDashboard() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    linkDocumentacao: ''
  });

  const [produtos, setProdutos] = useState([]);

  // Pega os produtos no backend
  async function fetchProdutos() {
    try {
      const res = await fetch('http://localhost:3000/produtos');
      const data = await res.json();
      setProdutos(data);
    } catch {
      toast.error('Erro ao carregar produtos');
    }
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao adicionar produto');
      }

      toast.success('Produto adicionado com sucesso!');
      setForm({ nome: '', descricao: '', linkDocumentacao: '' });
      fetchProdutos();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem('token');
    if (!window.confirm('Confirma exclusão deste produto?')) return;

    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao deletar produto');
      }

      toast.success('Produto deletado com sucesso!');
      fetchProdutos();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      <Title>Administração de Produtos</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          name="nome"
          placeholder="Nome do produto"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <TextArea
          name="descricao"
          placeholder="Descrição do produto"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <Input
          name="linkDocumentacao"
          placeholder="Link da documentação"
          value={form.linkDocumentacao}
          onChange={handleChange}
          required
        />
        <Button type="submit">Adicionar Produto</Button>
      </Form>

      <Title>Produtos Cadastrados</Title>
      <ProdutoLista>
        {produtos.map(produto => (
          <ProdutoCard key={produto.id}>
            <ProdutoInfo>
              <strong>{produto.nome}</strong>
              <p>{produto.descricao}</p>
              <ProdutoLink href={produto.linkDocumentacao} target="_blank" rel="noopener noreferrer">
                Ver Documentação
              </ProdutoLink>
            </ProdutoInfo>
            <ProdutoActions>
              <DeleteButton onClick={() => handleDelete(produto.id)}>
                Excluir
              </DeleteButton>
            </ProdutoActions>
          </ProdutoCard>
        ))}
      </ProdutoLista>
    </Container>
  );
}

export default AdminDashboard;
