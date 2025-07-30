import express from 'express';
import { PrismaClient } from '../backend/generated/prisma/index.js';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());


app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
  
});
app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      empresa: req.body.empresa
    }
  })
  res.status(201).send('User added successfully!');
});

app.put('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;
  await prisma.user.update({
    where: { id: userId },
    data: {
      email: req.body.email,
      name: req.body.name,
      empresa: req.body.empresa
    }
  });
  res.status(200).send(`User with ID ${userId} updated successfully!`);
});

app.delete('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: { id: userId }
  });
  res.status(204).send(`User with ID ${userId} deleted successfully!`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});