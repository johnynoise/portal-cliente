import express from 'express';
import { PrismaClient } from '../backend/generated/prisma/index.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const SECRET = 'sua_chave_secreta_forte'; // use variável ambiente em produção

// Retorna todos os usuários
app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
// Deleta um usuário pelo ID
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar usuário.' });
  }
});
// Cria um novo usuário
app.post('/usuarios', async (req, res) => {
  const { email, name, empresa, password, telefone } = req.body;

  // Verifica se a senha foi enviada
  if (typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ error: 'Senha obrigatória.' });
  }

  // Verifica se a senha cumpre as regras
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'A senha não atende aos requisitos: mínimo 8 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial (!@#$%).'
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        empresa,
        telefone,
        password: hashedPassword,
      }
    });
    res.status(201).send('User added successfully!');
  } catch (err) {
    // Mostra a mensagem de erro do backend
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Busca usuário no banco pelo email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

  // Compara senha com hash
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Senha incorreta' });

  // Gera token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
