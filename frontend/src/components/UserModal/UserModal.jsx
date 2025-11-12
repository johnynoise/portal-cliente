import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  ModalFooter,
  Button,
  ErrorMessage,
  LoadingSpinner
} from './UserModal.styles';

export default function UserModal({ user, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'cliente',
    empresa: '',
    telefone: '',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
  role: user.role || 'cliente',
        empresa: user.empresa || '',
        telefone: user.telefone || '',
        status: user.status || 'active',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!user && !formData.password) {
      newErrors.password = 'Senha é obrigatória para novos usuários';
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (formData.telefone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (11) 99999-9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Formatação do telefone
    if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpar erro do campo quando usuário digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatPhone = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = { ...formData };
      
      // Remover confirmPassword antes de enviar
      delete submitData.confirmPassword;
      
      // Se não há senha, remover do payload
      if (!submitData.password) {
        delete submitData.password;
      }

      if (user) {
        // Editar usuário existente
        await api.put(`/admin/usuarios/${user.id}`, submitData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        // Criar novo usuário
        await api.post('/admin/usuarios', submitData);
        toast.success('Usuário criado com sucesso!');
      }

      onSave();
    } catch (error) {
      if (error.response?.data?.errors) {
        // Erros de validação do backend
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erro ao salvar usuário');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            {user ? 'Editar Usuário' : 'Novo Usuário'}
          </ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">
                Nome *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                hasError={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                Email *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite o email"
                hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">
                Função *
              </Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                hasError={!!errors.role}
              >
                <option value="cliente">Cliente/Usuário</option>
                <option value="admin">Administrador</option>
              </Select>
              {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="empresa">
                Empresa
              </Label>
              <Input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Digite o nome da empresa"
                hasError={!!errors.empresa}
              />
              {errors.empresa && <ErrorMessage>{errors.empresa}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="telefone">
                Telefone
              </Label>
              <Input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                maxLength="15"
                hasError={!!errors.telefone}
              />
              {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="status">
                Status *
              </Label>
              <Select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                hasError={!!errors.status}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
              {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                {user ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha *'}
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Digite a senha"
                hasError={!!errors.password}
              />
              {!errors.password && (
                <small style={{ color: '#718096' }}>
                  A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
                </small>
              )}
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>

            {formData.password && (
              <FormGroup>
                <Label htmlFor="confirmPassword">
                  Confirmar Senha *
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme a senha"
                  hasError={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </FormGroup>
            )}

            <ModalFooter>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading && <LoadingSpinner />}
                {loading ? 'Salvando...' : user ? 'Atualizar' : 'Criar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}