const express = require('express');
const app = express();

const bebidaRoutes = require('./routes/bebidaRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes'); 
const estoqueRoutes = require('./routes/estoqueRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da Distribuidora de Bebidas tá ON!');
});


app.use('/bebidas', bebidaRoutes);
app.use('/fornecedores', fornecedorRoutes); 
app.use('/estoque', estoqueRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/vendas', vendaRoutes);
app.use('/clientes', clienteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

