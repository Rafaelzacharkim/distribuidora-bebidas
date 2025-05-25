const Cliente = require('../models/Cliente');

const clientes = [];

function criarCliente(req, res) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: 'Nome e email são obrigatórios' });
  }

  const novoCliente = new Cliente(nome, email);
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
}

function listarClientes(req, res) {
  res.json(clientes);
}

function buscarClientePorId(req, res) {
  const { id } = req.params;
  const cliente = clientes.find(c => c.id === id);

  if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });

  res.json(cliente);
}

module.exports = {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  clientes, 
};
