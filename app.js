const express = require('express');
const app = express();

const bebidaRoutes = require('./routes/bebidaRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes'); 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da Distribuidora de Bebidas tá ON!');
});


app.use('/bebidas', bebidaRoutes);
app.use('/fornecedores', fornecedorRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const estoqueRoutes = require('./routes/estoqueRoutes');
app.use('/estoque', estoqueRoutes);

