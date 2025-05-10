const bebidaModel = require('../models/bebidaModel');

function criar(req, res) {
  const { nome, tipo, validade } = req.body;
  if (!nome || !tipo || !validade) {
    return res.status(400).json({ erro: 'Preencha todos os campos!' });
  }

  const novaBebida = bebidaModel.criarBebida({ nome, tipo, validade });
  res.status(201).json(novaBebida);
}

function listar(req, res) {
  res.json(bebidaModel.listarBebidas());
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  const bebida = bebidaModel.buscarPorId(id);
  if (!bebida) return res.status(404).json({ erro: 'Bebida não encontrada!' });

  res.json(bebida);
}

function atualizar(req, res) {
  const id = parseInt(req.params.id);
  const atualizada = bebidaModel.atualizarBebida(id, req.body);
  if (!atualizada) return res.status(404).json({ erro: 'Bebida não encontrada!' });

  res.json(atualizada);
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  const sucesso = bebidaModel.deletarBebida(id);
  if (!sucesso) return res.status(404).json({ erro: 'Bebida não encontrada!' });

  res.status(204).send();
}

module.exports = { criar, listar, buscar, atualizar, remover };
