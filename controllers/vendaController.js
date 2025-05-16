const Carrinho = require('../models/carrinhoModel');
const Estoque = require('../models/estoqueModel');
const Bebida = require('../models/bebidaModel');
const Venda = require('../models/vendaModel');

function finalizarCompra(req, res) {
  const itensCarrinho = Carrinho.listarCarrinho();

  if (itensCarrinho.length === 0) {
    return res.status(400).json({ erro: 'Carrinho está vazio.' });
  }

  const errosEstoque = [];

  for (const item of itensCarrinho) {
    const estoqueBebida = Estoque.listarEstoques().find(e => e.bebidaId === item.bebidaId);

    if (!estoqueBebida || estoqueBebida.quantidade < item.quantidade) {
      const bebida = Bebida.buscarPorId(item.bebidaId);
      errosEstoque.push({
        bebida: bebida ? bebida.nome : 'Desconhecida',
        disponivel: estoqueBebida ? estoqueBebida.quantidade : 0,
        solicitada: item.quantidade
      });
    }
  }

  if (errosEstoque.length > 0) {
    return res.status(400).json({
      erro: 'Estoque insuficiente para alguns itens.',
      detalhes: errosEstoque
    });
  }

  
  for (const item of itensCarrinho) {
    const estoqueBebida = Estoque.listarEstoques().find(e => e.bebidaId === item.bebidaId);
    estoqueBebida.quantidade -= item.quantidade;
  }

  const total = itensCarrinho.reduce((soma, item) => {
    const bebida = Bebida.buscarPorId(item.bebidaId);
    return soma + (bebida.valor * item.quantidade);
  }, 0);

  const venda = Venda.registrarVenda(itensCarrinho, total);
  Carrinho.limparCarrinho();

  res.status(201).json({ mensagem: 'Venda realizada com sucesso.', venda });
}

function listarVendas(req, res) {
  res.json(Venda.listarVendas());
}

module.exports = { finalizarCompra, listarVendas };
