import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Loading from '../../../components/TelaLoading/Loading';

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
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  }

if (loading) return <Loading />;


  return (
    <Container>
      <Title>Usuários</Title>
      <UsersTable>
        <thead>
          <TableRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Tipo</TableHeader>
            <TableHeader>Empresa</TableHeader>
            <TableHeader>Telefone</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.name}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.role}</TableCell>
              <TableCell>{usuario.empresa}</TableCell>
              <TableCell>{usuario.telefone}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </UsersTable>
    </Container>
  );
}
