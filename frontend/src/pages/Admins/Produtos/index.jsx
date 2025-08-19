import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  FormSection,
  FormGrid,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  FileUploadArea,
  FileUploadContent,
  UploadIcon,
  PreviewContainer,
  ImagePreview,
  RemoveButton,
  TagsContainer,
  TagInput,
  Tag,
  FormActions,
  SaveButton,
  CancelButton,
  ProgressBar,
  ProgressFill,
  ErrorMessage,
  SuccessMessage,
  LoadingSpinner,
  CharacterCount,
  RequiredIndicator,
  SectionTitle,
  HelpText,
  ImageUploadStats,
  DragOverlay
} from './AdminProdutos.styles';

function AdminProdutos() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    linkDocumentacao: '',
    imagemUrl: '',
    categoria: '',
    preco: '',
    status: 'ativo',
    destaque: false,
    tags: []
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [imageStats, setImageStats] = useState(null);

  const categorias = [
    { value: 'software', label: 'Software' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'treinamento', label: 'Treinamento' }
  ];

  useEffect(() => {
    // Simular progresso de upload
    if (uploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uploading, uploadProgress]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (form.nome.length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!form.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    } else if (form.descricao.length < 10) {
      newErrors.descricao = 'Descrição deve ter pelo menos 10 caracteres';
    }

    if (!form.linkDocumentacao.trim()) {
      newErrors.linkDocumentacao = 'Link da documentação é obrigatório';
    } else if (!/^https?:\/\/.+/.test(form.linkDocumentacao)) {
      newErrors.linkDocumentacao = 'Link deve ser uma URL válida';
    }

    if (!form.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (form.preco && isNaN(parseFloat(form.preco))) {
      newErrors.preco = 'Preço deve ser um número válido';
    }

    if (!form.imagemUrl) {
      newErrors.imagemUrl = 'Imagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar erro do campo quando usuário digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload({ target: { files } });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo e tamanho do arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Calcular estatísticas da imagem
    const img = new Image();
    img.onload = () => {
      setImageStats({
        width: img.width,
        height: img.height,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
    };
    img.src = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portal-clientes');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnth50woo/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.secure_url) throw new Error('Erro no upload da imagem');

      setForm(prev => ({ ...prev, imagemUrl: data.secure_url }));
      toast.success('Imagem enviada com sucesso!');
      
      // Limpar erro de imagem
      if (errors.imagemUrl) {
        setErrors(prev => ({ ...prev, imagemUrl: '' }));
      }
    } catch (err) {
      toast.error('Erro ao enviar imagem');
      setImageStats(null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, imagemUrl: '' }));
    setImageStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      
      if (tag && !form.tags.includes(tag) && form.tags.length < 10) {
        setForm(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setSaving(true);

    try {
      const formData = {
        ...form,
        preco: form.preco ? parseFloat(form.preco) : null
      };

      const res = await api.post('/produtos', formData);
      
      toast.success('Produto adicionado com sucesso!');
      
      // Reset form
      setForm({
        nome: '',
        descricao: '',
        linkDocumentacao: '',
        imagemUrl: '',
        categoria: '',
        preco: '',
        status: 'ativo',
        destaque: false,
        tags: []
      });
      setImageStats(null);
      setTagInput('');
      
      // Opcional: navegar para lista de produtos
      // navigate('/admin/produtos');
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao adicionar produto';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Deseja realmente cancelar? Todas as alterações serão perdidas.')) {
      navigate(-1); // Voltar para página anterior
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>Novo Produto</Title>
          <Subtitle>Adicione um novo produto ao catálogo</Subtitle>
        </div>
      </Header>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informações Básicas</SectionTitle>
          
          <FormGrid>
            <FormGroup>
              <Label>
                Nome do Produto <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                name="nome"
                placeholder="Digite o nome do produto"
                value={form.nome}
                onChange={handleChange}
                hasError={!!errors.nome}
                maxLength={100}
              />
              {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
              <CharacterCount>{form.nome.length}/100</CharacterCount>
            </FormGroup>

            <FormGroup>
              <Label>
                Categoria <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                hasError={!!errors.categoria}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
              {errors.categoria && <ErrorMessage>{errors.categoria}</ErrorMessage>}
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label>
              Descrição <RequiredIndicator>*</RequiredIndicator>
            </Label>
            <TextArea
              name="descricao"
              placeholder="Descreva detalhadamente o produto, suas funcionalidades e benefícios..."
              value={form.descricao}
              onChange={handleChange}
              hasError={!!errors.descricao}
              maxLength={1000}
              rows={6}
            />
            {errors.descricao && <ErrorMessage>{errors.descricao}</ErrorMessage>}
            <CharacterCount>{form.descricao.length}/1000</CharacterCount>
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <Label>
                Link da Documentação <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                name="linkDocumentacao"
                type="url"
                placeholder="https://docs.exemplo.com"
                value={form.linkDocumentacao}
                onChange={handleChange}
                hasError={!!errors.linkDocumentacao}
              />
              {errors.linkDocumentacao && <ErrorMessage>{errors.linkDocumentacao}</ErrorMessage>}
              <HelpText>URL completa para a documentação do produto</HelpText>
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>Status</Label>
              <Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="em_desenvolvimento">Em Desenvolvimento</option>
              </Select>
            </FormGroup>


          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Imagem do Produto</SectionTitle>
          
          {!form.imagemUrl ? (
            <FileUploadArea
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              isDragging={isDragging}
              hasError={!!errors.imagemUrl}
            >
              {isDragging && <DragOverlay>Solte a imagem aqui</DragOverlay>}
              
              <FileUploadContent>
                <UploadIcon>📷</UploadIcon>
                <h3>Adicionar Imagem</h3>
                <p>Arraste e solte uma imagem aqui ou</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Selecionar Arquivo
                </button>
                <HelpText>PNG, JPG ou GIF (máx. 5MB)</HelpText>
              </FileUploadContent>
            </FileUploadArea>
          ) : (
            <PreviewContainer>
              <ImagePreview>
                <img src={form.imagemUrl} alt="Preview do produto" />
                <RemoveButton onClick={removeImage}>×</RemoveButton>
              </ImagePreview>
              {imageStats && (
                <ImageUploadStats>
                  <p><strong>Dimensões:</strong> {imageStats.width}x{imageStats.height}px</p>
                  <p><strong>Tamanho:</strong> {imageStats.size}</p>
                </ImageUploadStats>
              )}
              <SuccessMessage>✅ Imagem carregada com sucesso!</SuccessMessage>
            </PreviewContainer>
          )}

          {errors.imagemUrl && <ErrorMessage>{errors.imagemUrl}</ErrorMessage>}

          {uploading && (
            <div>
              <ProgressBar>
                <ProgressFill progress={uploadProgress} />
              </ProgressBar>
              <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#667eea' }}>
                Enviando... {uploadProgress}%
              </p>
            </div>
          )}
        </FormSection>

        <FormSection>
          <SectionTitle>Tags e Palavras-chave</SectionTitle>
          
          <FormGroup>
            <Label>Tags (Opcional)</Label>
            <TagInput
              type="text"
              placeholder="Digite uma tag e pressione Enter ou vírgula"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
            />
            <HelpText>Adicione até 10 tags para facilitar a busca. Pressione Enter ou vírgula para adicionar.</HelpText>
          </FormGroup>

          {form.tags.length > 0 && (
            <TagsContainer>
              {form.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                </Tag>
              ))}
            </TagsContainer>
          )}
        </FormSection>

        <FormActions>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
          <SaveButton type="submit" disabled={saving || uploading}>
            {saving && <LoadingSpinner />}
            {saving ? 'Salvando...' : 'Salvar Produto'}
          </SaveButton>
        </FormActions>
      </form>
    </Container>
  );
}

export default AdminProdutos;