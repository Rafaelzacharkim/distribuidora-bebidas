const Estoque = require('../models/estoqueModel');
const Bebida = require('../models/bebidaModel');

function criarEstoque(req, res) {
  const { bebidaId, quantidade, localArmazenamento, ultimaReposicao } = req.body;

  const bebidaExiste = Bebida.buscarPorId(bebidaId);
  if (!bebidaExiste) {
    return res.status(400).json({ erro: 'Bebida não encontrada.' });
  }

  const novo = Estoque.criarEstoque({
    bebidaId,
    quantidade,
    localArmazenamento,
    ultimaReposicao
  });

  res.status(201).json(novo);
}

function listarEstoques(req, res) {
  const lista = Estoque.listarEstoques().map(e => {
    const bebida = Bebida.buscarPorId(e.bebidaId);
    return {
      ...e,
      bebida: bebida ? {
        nome: bebida.nome,
        marca: bebida.marca,
        volume: bebida.volume,
        preco: bebida.preco
      } : null
    };
  });

  res.json(lista);
}

function buscarEstoquePorId(req, res) {
  const estoque = Estoque.buscarEstoquePorId(req.params.id);
  if (!estoque) return res.status(404).json({ erro: 'Item de estoque não encontrado.' });

  const bebida = Bebida.buscarPorId(estoque.bebidaId);
  res.json({
    ...estoque,
    bebida: bebida || null
  });
}

function atualizarEstoque(req, res) {
  const atualizado = Estoque.atualizarEstoque(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Item de estoque não encontrado.' });

  res.json(atualizado);
}

function deletarEstoque(req, res) {
  const deletado = Estoque.deletarEstoque(req.params.id);
  if (!deletado) return res.status(404).json({ erro: 'Item de estoque não encontrado.' });

  res.json(deletado);
}

module.exports = {
  criarEstoque,
  listarEstoques,
  buscarEstoquePorId,
  atualizarEstoque,
  deletarEstoque
};
