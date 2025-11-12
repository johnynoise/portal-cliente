# Portal Cliente – Guia de Setup pós-clone

Este guia descreve o que você precisa fazer após clonar o repositório para rodar o projeto (backend + frontend) em ambiente local.

## Requisitos

- Node.js LTS (18.x ou 20.x recomendado)
- npm (vem com o Node)
- MongoDB (local ou MongoDB Atlas)
- (Opcional) Conta SMTP para envio de e-mails de recuperação de senha

## Estrutura do projeto

```
portal-cliente/
  backend/
    prisma/schema.prisma            # Prisma (MongoDB)
    generated/prisma/               # Prisma Client gerado
    services/emailService.js        # Envio de e-mail (Nodemailer)
    server.js                       # API Express
    package.json
    .env                            # Suas variáveis (criar)
  frontend/
    src/ ...
    vite.config.js
    package.json
```

## 1) Backend

1. Crie o arquivo `.env` dentro de `backend/` (você pode usar o `backend/.env.example` como base):

```
DATABASE_URL="mongodb://localhost:27017/portal_cliente"  # ou string do MongoDB Atlas
JWT_SECRET="uma_chave_bem_forte_aqui"
EMAIL_HOST="smtp.seuprovedor.com"
EMAIL_PORT=587
EMAIL_USER="seu_usuario"
EMAIL_PASS="sua_senha"
```

Observações:
- O Prisma usa `DATABASE_URL` do `.env` do backend.
- O backend usa `JWT_SECRET` para assinar/verificar tokens.
- O serviço de e-mail (`emailService.js`) usa `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER` e `EMAIL_PASS`.
- O link de redefinição de senha abre no frontend: `http://localhost:5173/redefinir-senha/:token`.

2. Instale as dependências e gere o Prisma Client:

```powershell
cd backend
npm install
npx prisma generate
npx prisma db push
```

3. Suba o servidor de desenvolvimento (porta 3000):

```powershell
npm run dev
```

CORS está configurado para permitir `http://localhost:5173`.

## 2) Frontend

Em um novo terminal, instale as dependências e rode o Vite (porta 5173):

```powershell
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## Scripts úteis

Backend (dentro de `backend/`):
- `npm run dev` – Inicia o servidor com nodemon
- `npm start` – Inicia o servidor com Node
- `npx prisma generate` – Gera o Prisma Client
- `npx prisma db push` – Sincroniza o schema com o MongoDB
- `npx prisma studio` – Abre o Prisma Studio

Frontend (dentro de `frontend/`):
- `npm run dev` – Inicia o Vite (dev)
- `npm run build` – Build de produção
- `npm run preview` – Preview do build

## Rotas principais (resumo)

- Autenticação:
  - `POST /login` – Retorna JWT
  - `POST /auth/recuperar-senha` – Envia e-mail de recuperação
  - `POST /auth/redefinir-senha` – Redefine a senha com token
- Usuários:
  - `POST /usuarios` – Cadastro
  - `GET /usuarios` – Listagem (requer Bearer token)
  - `DELETE /usuarios/:id` – Remoção (requer Bearer token)
- Produtos (admin):
  - `POST /produtos` – Criação (requer admin)
  - `GET /produtos` – Listagem (atual: protegida; ajuste se quiser pública)
  - `PUT /produtos/:id` – Atualização (admin)
  - `DELETE /produtos/:id` – Remoção (admin)
- FAQ:
  - `GET /faq` – Lista FAQs ativas
  - `POST /faq/:id/visualizar` – Incrementa visualizações
  - `POST /faq/:id/avaliar` – Avalia utilidade
  - Admin: `GET/POST/PUT/DELETE /admin/faq` e `GET /admin/faq/estatisticas`

## Solução de problemas

- Erro `P1012 Environment variable not found: DATABASE_URL` ao rodar Prisma:
  - Crie o arquivo `backend/.env` com a variável `DATABASE_URL` ou ajuste o caminho.
  - Rode novamente: `npx prisma generate` e depois `npx prisma db push`.

- Não conecta ao MongoDB local:
  - Verifique se o serviço do Mongo está rodando; teste com uma GUI (Compass) ou troque para MongoDB Atlas.

- 401/403 nas rotas protegidas:
  - Garanta que o frontend envia `Authorization: Bearer <token>`.
  - Para permissões de admin, o usuário precisa ter `role = 'admin'` no banco.

- E-mail de recuperação não chega:
  - Verifique `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` no `.env`.
  - Alguns provedores exigem senha de app ou TLS/porta correta.

## Observações e próximos passos

- Segurança: prefira manter `JWT_SECRET` apenas no `.env` e não hardcode no código.
- Você pode criar um script de seed para criar um usuário admin inicial (não incluído neste repo). Se quiser, abra uma issue ou peça no chat.
- Se quiser tornar `GET /produtos` público, remova o middleware de autenticação nessa rota.

---

Se tiver qualquer dúvida, abra uma issue no repositório ou peça ajuda no chat.
