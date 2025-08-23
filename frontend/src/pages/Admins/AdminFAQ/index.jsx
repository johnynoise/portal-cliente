import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  HeaderContent,
  HeaderInfo,
  Title,
  Subtitle,
  NewButton,
  MainContent,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatNumber,
  FiltersSection,
  SearchContainer,
  SearchInput,
  CategorySelect,
  TableContainer,
  TableHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CategoryBadge,
  StatusButton,
  StatusIndicator,
  ActionButton,
  RatingContainer,
  RatingItem,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  FormGrid,
  ModalFooter,
  CancelButton,
  SubmitButton,
  LoadingContainer,
  LoadingSpinner,
  LoadingText
} from './AdminFAQ.styles';

const AdminFAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [formData, setFormData] = useState({
    pergunta: '',
    resposta: '',
    categoria: '',
    ordem: 0,
    ativo: true
  });

  const categorias = ['Conta', 'Produtos', 'Suporte', 'Documentação', 'Pagamentos', 'Técnico'];

  useEffect(() => {
    fetchFaqs();
    fetchStats();
  }, []);

  const fetchFaqs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/admin/faq', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFaqs(data.sort((a, b) => a.ordem - b.ordem));
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      toast.error('Erro ao carregar FAQs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/admin/faq/estatisticas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pergunta.trim() || !formData.resposta.trim() || !formData.categoria) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = editingFaq 
        ? `http://localhost:3000/admin/faq/${editingFaq.id}`
        : 'http://localhost:3000/admin/faq';
      
      const method = editingFaq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editingFaq ? 'FAQ atualizada!' : 'FAQ criada!');
        setShowModal(false);
        resetForm();
        fetchFaqs();
        fetchStats();
      } else {
        throw new Error('Erro na requisição');
      }
    } catch (error) {
      console.error('Erro ao salvar FAQ:', error);
      toast.error('Erro ao salvar FAQ');
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      pergunta: faq.pergunta,
      resposta: faq.resposta,
      categoria: faq.categoria,
      ordem: faq.ordem,
      ativo: faq.ativo
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta FAQ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/admin/faq/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('FAQ excluída!');
        fetchFaqs();
        fetchStats();
      }
    } catch (error) {
      console.error('Erro ao excluir FAQ:', error);
      toast.error('Erro ao excluir FAQ');
    }
  };

  const toggleActive = async (id, ativo) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3000/admin/faq/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ativo: !ativo })
      });

      fetchFaqs();
      toast.success(`FAQ ${!ativo ? 'ativada' : 'desativada'}!`);
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const resetForm = () => {
    setFormData({
      pergunta: '',
      resposta: '',
      categoria: '',
      ordem: 0,
      ativo: true
    });
    setEditingFaq(null);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todas' || faq.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoria) => {
    const colors = {
      'Conta': 'blue',
      'Produtos': 'green', 
      'Suporte': 'yellow',
      'Documentação': 'purple',
      'Pagamentos': 'indigo',
      'Técnico': 'gray'
    };
    return colors[categoria] || 'gray';
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Carregando...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <HeaderInfo>
            <Title>Gerenciador de FAQ</Title>
            <Subtitle>Gerencie as perguntas frequentes do seu site</Subtitle>
          </HeaderInfo>
          <NewButton onClick={() => { resetForm(); setShowModal(true); }}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova FAQ
          </NewButton>
        </HeaderContent>
      </Header>

      <MainContent>
        {/* Stats Cards */}
        {stats && (
          <StatsGrid>
            <StatCard>
              <StatIcon color="blue">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </StatIcon>
              <StatInfo>
                <StatLabel>Total de FAQs</StatLabel>
                <StatNumber>{stats.totalFaqs}</StatNumber>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIcon color="green">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </StatIcon>
              <StatInfo>
                <StatLabel>Visualizações</StatLabel>
                <StatNumber>{stats.totalVisualizacoes?.toLocaleString() || '0'}</StatNumber>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIcon color="yellow">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905V7l1 1H9l-1-1v-.5C8 5.672 8.448 5 9 5h.905a2 2 0 002-.096V10m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v5.5C3 12.224 3.776 13 4.5 13h5V10z" />
                </svg>
              </StatIcon>
              <StatInfo>
                <StatLabel>Satisfação</StatLabel>
                <StatNumber>{stats.satisfacao || '0'}%</StatNumber>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIcon color="purple">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </StatIcon>
              <StatInfo>
                <StatLabel>Avaliações</StatLabel>
                <StatNumber>{stats.totalAvaliacoes || '0'}</StatNumber>
              </StatInfo>
            </StatCard>
          </StatsGrid>
        )}

        {/* Filters */}
        <FiltersSection>
          <SearchContainer>
            <div className="search-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <SearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar FAQs..."
            />
          </SearchContainer>
          <CategorySelect
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Todas">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </CategorySelect>
        </FiltersSection>

        {/* FAQ Table */}
        <TableContainer>
          <TableHeader>
            <h3>Lista de FAQs ({filteredFaqs.length})</h3>
          </TableHeader>
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <tr>
                  <th>Pergunta</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Visualizações</th>
                  <th>Avaliações</th>
                  <th>Ações</th>
                </tr>
              </TableHead>
              <TableBody>
                {filteredFaqs.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <EmptyState>
                        <EmptyIcon>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H2.05A7.963 7.963 0 014 12 7.962 7.962 0 0112 4.05 7.963 7.963 0 0112 4c4.418 0 8 3.582 8 8 0 1.596-.476 3.078-1.291 4.309m-13.418 0A7.962 7.962 0 0112 20a7.962 7.962 0 0110.95 0H22.05A7.963 7.963 0 0120 12a7.962 7.962 0 00-8-8.05z" />
                          </svg>
                        </EmptyIcon>
                        <EmptyTitle>Nenhuma FAQ encontrada</EmptyTitle>
                        <EmptyText>Tente ajustar os filtros ou criar uma nova FAQ</EmptyText>
                      </EmptyState>
                    </td>
                  </tr>
                ) : (
                  filteredFaqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell>
                        <div>
                          <div className="question">{faq.pergunta}</div>
                          <div className="answer">{faq.resposta}</div>
                          <div className="order">Ordem: {faq.ordem}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <CategoryBadge color={getCategoryColor(faq.categoria)}>
                          {faq.categoria}
                        </CategoryBadge>
                      </TableCell>
                      <TableCell>
                        <StatusButton
                          active={faq.ativo}
                          onClick={() => toggleActive(faq.id, faq.ativo)}
                        >
                          <StatusIndicator active={faq.ativo} />
                          {faq.ativo ? 'Ativo' : 'Inativo'}
                        </StatusButton>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="number">{faq.visualizacoes?.toLocaleString() || '0'}</div>
                          <div className="label">visualizações</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RatingContainer>
                          <RatingItem positive>
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {faq.util || '0'}
                          </RatingItem>
                          <RatingItem>
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {faq.naoUtil || '0'}
                          </RatingItem>
                        </RatingContainer>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <ActionButton type="edit" onClick={() => handleEdit(faq)}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </ActionButton>
                          <ActionButton type="delete" onClick={() => handleDelete(faq.id)}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Excluir
                          </ActionButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </MainContent>

      {/* Modal */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingFaq ? '✏️ Editar FAQ' : '➕ Nova FAQ'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Pergunta *</Label>
                <Input
                  type="text"
                  value={formData.pergunta}
                  onChange={(e) => setFormData({...formData, pergunta: e.target.value})}
                  required
                  placeholder="Digite a pergunta..."
                />
              </FormGroup>

              <FormGroup>
                <Label>Resposta *</Label>
                <Textarea
                  value={formData.resposta}
                  onChange={(e) => setFormData({...formData, resposta: e.target.value})}
                  rows={6}
                  required
                  placeholder="Digite a resposta detalhada..."
                />
              </FormGroup>

              <FormGrid>
                <FormGroup>
                  <Label>Categoria *</Label>
                  <Select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Ordem</Label>
                  <Input
                    type="number"
                    value={formData.ordem}
                    onChange={(e) => setFormData({...formData, ordem: parseInt(e.target.value) || 0})}
                    min="0"
                    placeholder="0"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Status</Label>
                  <Select
                    value={formData.ativo}
                    onChange={(e) => setFormData({...formData, ativo: e.target.value === 'true'})}
                  >
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <ModalFooter>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </CancelButton>
                <SubmitButton type="submit">
                  {editingFaq ? '💾 Atualizar' : '✨ Criar'}
                </SubmitButton>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminFAQManager;