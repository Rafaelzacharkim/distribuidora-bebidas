const estoqueModel = require('../models/estoqueModel');

function adicionar(req, res) {
  const { idBebida, quantidade } = req.body;
  if (!idBebida || quantidade == null) {
    return res.status(400).json({ erro: 'ID da bebida e quantidade são obrigatórios.' });
  }

  const resultado = estoqueModel.adicionarEstoque(idBebida, quantidade);
  res.status(201).json(resultado);
}

function listar(req, res) {
  res.json(estoqueModel.listarEstoque());
}

function buscar(req, res) {
  const idBebida = parseInt(req.params.idBebida);
  const estoque = estoqueModel.buscarEstoquePorBebida(idBebida);
  if (!estoque) return res.status(404).json({ erro: 'Estoque não encontrado para essa bebida.' });

  res.json(estoque);
}

function atualizar(req, res) {
  const idBebida = parseInt(req.params.idBebida);
  const { novaQuantidade } = req.body;
  const atualizado = estoqueModel.atualizarEstoque(idBebida, novaQuantidade);

  if (!atualizado) return res.status(404).json({ erro: 'Estoque não encontrado para essa bebida.' });

  res.json(atualizado);
}

function remover(req, res) {
  const idBebida = parseInt(req.params.idBebida);
  const removido = estoqueModel.removerEstoque(idBebida);

  if (!removido) return res.status(404).json({ erro: 'Estoque não encontrado.' });

  res.status(204).send();
}

module.exports = { adicionar, listar, buscar, atualizar, remover };
