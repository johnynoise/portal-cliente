import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  Title,
  Form,
  Input,
  TextArea,
  Button
} from './AdminProdutos.styles';

function AdminProdutos() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    linkDocumentacao: ''
  });

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
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao adicionar produto');
      }

      toast.success('Produto adicionado com sucesso!');
      setForm({ nome: '', descricao: '', linkDocumentacao: '' });
      navigate('/solucoes-produtos'); // volta para lista de produtos
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      <Title>Adicionar Novo Produto</Title>
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
    </Container>
  );
}

export default AdminProdutos;
