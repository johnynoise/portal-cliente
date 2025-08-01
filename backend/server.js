import express from 'express';
import { PrismaClient } from '../backend/generated/prisma/index.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';


const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const SECRET = 'sua_chave_secreta_forte'; // use variável ambiente em produção

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, SECRET, (err, usuarioDecodificado) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }

    req.usuario = usuarioDecodificado; // passa o usuário para o próximo handler
    next();
  });
}


// Retorna todos os usuários
app.get('/usuarios', verificarToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
// Deleta um usuário pelo ID
app.delete('/usuarios/:id',verificarToken, async (req, res) => {
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
  let { email, name, empresa, password, telefone } = req.body;

  // Sanitize
  email = validator.normalizeEmail(email || '');
  name = validator.escape(name || '');
  empresa = validator.escape(empresa || '');
  telefone = validator.blacklist(telefone || '', '<>/"\''); // remove caracteres perigosos

  // Validar email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  // Validar campos obrigatórios
  if (!name || !empresa || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Validar senha
  if (typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ error: 'Senha obrigatória.' });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial (!@#$%).'
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
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Busca usuário no banco pelo email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais Incorretas' });

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
