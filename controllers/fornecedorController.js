const fornecedores = require('../models/fornecedor');
const { v4: uuidv4 } = require('uuid');

function listarFornecedores(req, res) {
  res.json(fornecedores);
}

function obterFornecedor(req, res) {
  const fornecedor = fornecedores.find(f => f.id === req.params.id);
  if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
  res.json(fornecedor);
}

function criarFornecedor(req, res) {
  const { nome, cnpj, contato } = req.body;

  if (!nome || !cnpj || !contato) {
    return res.status(400).json({ mensagem: 'Nome, CNPJ e contato são obrigatórios.' });
  }

  const novoFornecedor = {
    id: uuidv4(),
    nome,
    cnpj,
    contato
  };

  fornecedores.push(novoFornecedor);
  res.status(201).json(novoFornecedor);
}

function atualizarFornecedor(req, res) {
  const fornecedor = fornecedores.find(f => f.id === req.params.id);
  if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });

  const { nome, cnpj, contato } = req.body;

  if (nome) fornecedor.nome = nome;
  if (cnpj) fornecedor.cnpj = cnpj;
  if (contato) fornecedor.contato = contato;

  res.json(fornecedor);
}

function deletarFornecedor(req, res) {
  const index = fornecedores.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });

  fornecedores.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  listarFornecedores,
  obterFornecedor,
  criarFornecedor,
  atualizarFornecedor,
  deletarFornecedor
};
