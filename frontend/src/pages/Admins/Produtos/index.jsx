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
    linkDocumentacao: '',
    imagemUrl: '' // ✅ Campo alinhado com backend
  });

  const [uploading, setUploading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portal-clientes'); // seu upload preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnth50woo/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.secure_url) throw new Error('Erro no upload da imagem');

      setForm(prev => ({ ...prev, imagemUrl: data.secure_url })); // ✅ campo corrigido
      toast.success('Imagem enviada com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!form.imagemUrl) {
      toast.error('Envie uma imagem antes de cadastrar o produto');
      return;
    }

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
      setForm({
        nome: '',
        descricao: '',
        linkDocumentacao: '',
        imagemUrl: ''
      });
      navigate('/solucoes-produtos');
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
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploading && <p>Enviando imagem...</p>}
        {form.imagemUrl && (
          <>
            <p>Imagem carregada ✅</p>
            <img src={form.imagemUrl} alt="Preview" style={{ maxWidth: 200, marginTop: 10 }} />
          </>
        )}
        <Button type="submit" disabled={uploading}>Adicionar Produto</Button>
      </Form>
    </Container>
  );
}

export default AdminProdutos;
