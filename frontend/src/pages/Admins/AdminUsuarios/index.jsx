import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import {
  Container,
  Title,
  UsersTable,
  TableRow,
  TableHeader,
  TableCell,
  AddButton
} from './AdminUsuarios.styles';

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    try {
      const res = await api.get('/admin/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      toast.error('Erro ao carregar usuários');
    }
  }

  return (
    <Container>
      <Title>Gerenciar Usuários</Title>

      <AddButton onClick={() => navigate('/admin/usuarios/novo')}>
        + Novo Usuário
      </AddButton>

      <UsersTable>
        <thead>
          <TableRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Tipo</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.name}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.role}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </UsersTable>
    </Container>
  );
}
