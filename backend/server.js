import express from 'express';

const app = express();

app.get('/usuarios', (req, res) => {
  res.send('Hello, World!');
}); 

app.post('/usuarios', (req, res) => {
  res.send('User created successfully!');
});

app.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId} updated successfully!`);
});

app.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId} deleted successfully!`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});