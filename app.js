const express = require('express');
const app = express();

app.use(express.json()); // pra entender JSON nas requisições

// Rota básica pra testar se tá rodando
app.get('/', (req, res) => {
  res.send('API da Distribuidora de Bebidas tá ON!');
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const bebidaRoutes = require('./routes/bebidaRoutes');
app.use('/bebidas', bebidaRoutes);

const fornecedorRoutes = require('./routes/fornecedorRoutes');
app.use(fornecedorRoutes);
