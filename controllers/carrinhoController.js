const Carrinho = require('../models/carrinhoModel');
const Bebida = require('../models/bebidaModel');

function adicionar(req, res) {
  const { bebidaId, quantidade } = req.body;
  const bebida = Bebida.buscarPorId(bebidaId);

  if (!bebida) {
    return res.status(404).json({ erro: 'Bebida não encontrada.' });
  }

  const item = Carrinho.adicionarAoCarrinho(bebida, quantidade);
  res.status(201).json(item);
}

function listar(req, res) {
  const carrinho = Carrinho.listarCarrinho();
  res.json(carrinho);
}

function remover(req, res) {
  const sucesso = Carrinho.removerDoCarrinho(req.params.id);
  if (!sucesso) return res.status(404).json({ erro: 'Item não encontrado.' });
  res.json({ mensagem: 'Item removido com sucesso.' });
}

function esvaziar(req, res) {
  Carrinho.esvaziarCarrinho();
  res.json({ mensagem: 'Carrinho esvaziado.' });
}

module.exports = { adicionar, listar, remover, esvaziar };
