const Venda = require('../models/vendaModel');
const Estoque = require('../models/estoqueModel');
const Bebida = require('../models/bebidaModel');

function criarVenda(req, res) {
  const { itens } = req.body;

  if (!Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: 'Itens da venda são obrigatórios.' });
  }

  let total = 0;
  const itensProcessados = [];

  for (const item of itens) {
    const bebida = Bebida.buscarPorId(item.bebidaId);
    const estoque = Estoque.listarEstoques().find(e => e.bebidaId === item.bebidaId);

    if (!bebida || !estoque) {
      return res.status(400).json({ erro: `Bebida ou estoque não encontrado para ID ${item.bebidaId}` });
    }

    if (estoque.quantidade < item.quantidade) {
      return res.status(400).json({ erro: `Estoque insuficiente para bebida ${bebida.nome}` });
    }

    estoque.quantidade -= item.quantidade;

    const subtotal = bebida.preco * item.quantidade;
    total += subtotal;

    itensProcessados.push({
      bebidaId: item.bebidaId,
      nome: bebida.nome,
      quantidade: item.quantidade,
      precoUnitario: bebida.preco,
      subtotal
    });
  }

  const novaVenda = Venda.criarVenda({ itens: itensProcessados, total });
  res.status(201).json(novaVenda);
}

function listarVendas(req, res) {
  const vendas = Venda.listarVendas();
  res.json(vendas);
}

function buscarVendaPorId(req, res) {
  const venda = Venda.buscarVendaPorId(req.params.id);
  if (!venda) return res.status(404).json({ erro: 'Venda não encontrada.' });

  res.json(venda);
}

function deletarVenda(req, res) {
  const venda = Venda.deletarVenda(req.params.id);
  if (!venda) return res.status(404).json({ erro: 'Venda não encontrada.' });

  res.json(venda);
}

function atualizarStatusVenda(req, res) {
  const { status } = req.body;
  const id = req.params.id;

  const resultado = Venda.atualizarStatus(id, status);

  if (resultado === null) {
    return res.status(404).json({ erro: 'Venda não encontrada.' });
  }

  if (resultado === 'invalido') {
    return res.status(400).json({ erro: 'Status inválido. Use: cotacao, confirmado, faturado, entregue.' });
  }

  res.json(resultado);
}

module.exports = {
  criarVenda,
  listarVendas,
  buscarVendaPorId,
  deletarVenda,
  atualizarStatusVenda
};
