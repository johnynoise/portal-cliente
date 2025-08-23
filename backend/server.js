import express from 'express';
import { PrismaClient } from '../backend/generated/prisma/index.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const SECRET = 'sua_chave_secreta_forte'; // use variável ambiente em produção

// Middleware para verificar token e decodificar usuário
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

    req.usuario = usuarioDecodificado; // passa o usuário para o próximo handler (inclui role)
    next();
  });
}
app.get('/admin', verificarToken, verificarAdmin, (req, res) => {
  res.json({ message: 'Acesso autorizado para administrador.' });
});








// POST /auth/recuperar-senha
import { enviarEmailRecuperacao } from './services/emailService.js';

app.post('/auth/recuperar-senha', async (req, res) => {
  const { email } = req.body;
  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const token = jwt.sign({ userId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

  try {
    await enviarEmailRecuperacao(usuario.email, token);
    res.json({ message: 'E-mail de recuperação enviado' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
});

// Rota para redefinir senha
app.post('/auth/redefinir-senha', async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = bcrypt.hashSync(novaSenha, 8);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Senha redefinida com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Token inválido ou expirado.' });
  }
});



// Rota para listar usuários (apenas admin)
app.get('/admin/usuarios', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        empresa: true,
        telefone: true,
      },
    });
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});



// Middleware para permitir só admin
function verificarAdmin(req, res, next) {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso restrito a administradores.' });
  }
  next();
}

// Rota para listar usuários
app.get('/usuarios', verificarToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
// Rota para Deletar usuário
app.delete('/usuarios/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apagar usuário.' });
  }
});
//Cadastro de usuarios
app.post('/usuarios', async (req, res) => {
  let { email, name, empresa, password, telefone, role } = req.body;

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

  // Validar role (default 'cliente')
  if (!role || !['admin', 'cliente'].includes(role)) {
    role = 'cliente';
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
        role
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
  if (!user) return res.status(401).json({ error: 'Credenciais incorretas' });

  // Compara senha com hash
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Senha incorreta' });

  // Gera token JWT incluindo role
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    SECRET,
    { expiresIn: '1h' } // expira em 1 hora
  );

  res.json({ token });
});

// Exemplo de rota protegida para criação de produtos (apenas admin)

app.post('/produtos', verificarToken, verificarAdmin, async (req, res) => {
   console.log('Body recebido:', req.body);
  const { nome, descricao, linkDocumentacao, imagemUrl } = req.body;

  if (!nome || !descricao || !linkDocumentacao || !imagemUrl) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios, incluindo a imagem.' });
  }

  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        linkDocumentacao,
        imagemUrl, // aqui também
      }
    });
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rota pública para listar produtos
app.get('/produtos',verificarToken, async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});




// Rota para buscar produto por ID
app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.findUnique({ where: { id } });
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para deletar produto
app.delete('/produtos/:id', verificarToken, verificarAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produto.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o produto.' });
  }
});
// Rota para atualizar produto
app.put('/produtos/:id', verificarToken, verificarAdmin, async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, linkDocumentacao } = req.body;

  try {
    const produto = await prisma.produto.update({
      where: { id },
      data: { nome, descricao, linkDocumentacao }
    });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/faq', async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      where: { ativo: true },
      orderBy: [
        { ordem: 'asc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        pergunta: true,
        resposta: true,
        categoria: true,
        ordem: true,
        visualizacoes: true,
        util: true,
        naoUtil: true,
        createdAt: true
      }
    });
    res.json(faqs);
  } catch (err) {
    console.error('Erro ao buscar FAQs:', err);
    res.status(500).json({ error: 'Erro ao buscar FAQs' });
  }
});

// POST /faq/:id/visualizar - Incrementar visualizações
app.post('/faq/:id/visualizar', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.faq.update({
      where: { id },
      data: { visualizacoes: { increment: 1 } }
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar visualização' });
  }
});

// POST /faq/:id/avaliar - Avaliar utilidade da FAQ
app.post('/faq/:id/avaliar', async (req, res) => {
  const { id } = req.params;
  const { util } = req.body; // boolean: true = útil, false = não útil

  try {
    const updateData = util ? 
      { util: { increment: 1 } } : 
      { naoUtil: { increment: 1 } };

    await prisma.faq.update({
      where: { id },
      data: updateData
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao avaliar FAQ' });
  }
});

// ===== ROTAS ADMIN FAQ =====

// GET /admin/faq - Buscar todas as FAQs (admin)
app.get('/admin/faq', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: [
        { ordem: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    res.json(faqs);
  } catch (err) {
    console.error('Erro ao buscar FAQs:', err);
    res.status(500).json({ error: 'Erro ao buscar FAQs' });
  }
});

// POST /admin/faq - Criar nova FAQ
app.post('/admin/faq', verificarToken, verificarAdmin, async (req, res) => {
  const { pergunta, resposta, categoria, ordem, ativo } = req.body;

  // Validações
  if (!pergunta || !resposta || !categoria) {
    return res.status(400).json({ 
      error: 'Pergunta, resposta e categoria são obrigatórios' 
    });
  }

  try {
    const faq = await prisma.faq.create({
      data: {
        pergunta: validator.escape(pergunta.trim()),
        resposta: resposta.trim(),
        categoria: validator.escape(categoria.trim()),
        ordem: ordem || 0,
        ativo: ativo !== false,
        visualizacoes: 0,
        util: 0,
        naoUtil: 0
      }
    });

    res.status(201).json(faq);
  } catch (err) {
    console.error('Erro ao criar FAQ:', err);
    res.status(500).json({ error: 'Erro ao criar FAQ' });
  }
});

// PUT /admin/faq/:id - Atualizar FAQ
app.put('/admin/faq/:id', verificarToken, verificarAdmin, async (req, res) => {
  const { id } = req.params;
  const { pergunta, resposta, categoria, ordem, ativo } = req.body;

  try {
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        ...(pergunta && { pergunta: validator.escape(pergunta.trim()) }),
        ...(resposta && { resposta: resposta.trim() }),
        ...(categoria && { categoria: validator.escape(categoria.trim()) }),
        ...(ordem !== undefined && { ordem }),
        ...(ativo !== undefined && { ativo })
      }
    });

    res.json(faq);
  } catch (err) {
    console.error('Erro ao atualizar FAQ:', err);
    res.status(500).json({ error: 'Erro ao atualizar FAQ' });
  }
});

// DELETE /admin/faq/:id - Deletar FAQ
app.delete('/admin/faq/:id', verificarToken, verificarAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.faq.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar FAQ:', err);
    res.status(500).json({ error: 'Erro ao deletar FAQ' });
  }
});

// GET /admin/faq/estatisticas - Estatísticas das FAQs
app.get('/admin/faq/estatisticas', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const stats = await prisma.faq.aggregate({
      where: { ativo: true },
      _sum: {
        visualizacoes: true,
        util: true,
        naoUtil: true
      },
      _count: {
        id: true
      }
    });

    const totalFaqs = stats._count.id || 0;
    const totalVisualizacoes = stats._sum.visualizacoes || 0;
    const totalUtil = stats._sum.util || 0;
    const totalNaoUtil = stats._sum.naoUtil || 0;
    const totalAvaliacoes = totalUtil + totalNaoUtil;
    const satisfacao = totalAvaliacoes > 0 ? 
      Math.round((totalUtil / totalAvaliacoes) * 100) : 0;

    const categorias = await prisma.faq.groupBy({
      by: ['categoria'],
      where: { ativo: true },
      _count: {
        categoria: true
      }
    });

    res.json({
      totalFaqs,
      totalVisualizacoes,
      satisfacao,
      totalAvaliacoes,
      categorias: categorias.map(cat => ({
        nome: cat.categoria,
        quantidade: cat._count.categoria
      }))
    });
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
