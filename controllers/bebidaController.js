const bebidaModel = require('../models/bebidaModel');
const fornecedores = require('../models/fornecedor');
const { v4: uuidv4 } = require('uuid');

function listar(req, res) {
  res.json(bebidaModel.listar());
}

function buscar(req, res) {
  const bebida = bebidaModel.buscarPorId(req.params.id);
  if (!bebida) return res.status(404).json({ mensagem: 'Bebida não encontrada.' });
  res.json(bebida);
}

function criar(req, res) {
  const { nome, marca, volume, valor, idFornecedor } = req.body;

  if (!nome || !marca || !volume || !valor || !idFornecedor) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios: nome, marca, volume, idFornecedor' });
  }

  const fornecedorExiste = fornecedores.find(f => f.id === idFornecedor);
  if (!fornecedorExiste) {
    return res.status(400).json({ mensagem: 'Fornecedor informado não existe.' });
  }

  const novaBebida = {
    id: uuidv4(),
    nome,
    marca,
    valor,
    volume,
    idFornecedor
  };

  bebidaModel.criar(novaBebida);
  res.status(201).json(novaBebida);
}

function atualizar(req, res) {
  const { nome, marca, valor, volume, idFornecedor } = req.body;

  if (idFornecedor) {
    const fornecedorExiste = fornecedores.find(f => f.id === idFornecedor);
    if (!fornecedorExiste) {
      return res.status(400).json({ mensagem: 'Fornecedor informado não existe.' });
    }
  }

  const atualizada = bebidaModel.atualizar(req.params.id, { nome, marca, valor, volume, idFornecedor });

  if (!atualizada) return res.status(404).json({ mensagem: 'Bebida não encontrada.' });

  res.json(atualizada);
}

function remover(req, res) {
  const sucesso = bebidaModel.remover(req.params.id);
  if (!sucesso) return res.status(404).json({ mensagem: 'Bebida não encontrada.' });

  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };