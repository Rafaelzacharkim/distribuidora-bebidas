const Venda = require('../models/vendaModel');
const Estoque = require('../models/estoqueModel');
const Bebida = require('../models/bebidaModel');
const { removerEstoque } = require('../models/estoqueModel');


// Controller para gerenciar vendas e status

// Cria uma nova venda em estado 'cotacao'
function criarVenda(req, res) {
  const { itens } = req.body;

  if (!Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: 'Itens da venda são obrigatórios.' });
  }

  // Valida itens sem afetar estoque agora
  for (const item of itens) {
    if (!item.bebidaId || typeof item.quantidade !== 'number') {
      return res.status(400).json({
        erro: 'Cada item precisa de bebidaId válido e quantidade numérica.'
      });
    }
  }

  const novaVenda = Venda.criarVenda({ itens });
  return res.status(201).json(novaVenda);
}

// Lista todas as vendas
function listarVendas(req, res) {
  const todas = Venda.listarVendas();
  res.json(todas);
}

// Busca uma venda pelo ID e adiciona detalhes dos itens
function buscarVendaPorId(req, res) {
  const { id } = req.params;
  const venda = Venda.buscarVendaPorId(id);
  if (!venda) {
    return res.status(404).json({ erro: 'Venda não encontrada.' });
  }

  // Enriquecer itens com nome, subtotal
  venda.itens = venda.itens.map(item => {
    const bebida = Bebida.buscarPorId(item.bebidaId);
    return {
      bebidaId: item.bebidaId,
      nome: bebida?.nome || 'Desconhecida',
      quantidade: item.quantidade,
      precoUnitario: bebida?.preco || 0,
      subtotal: (bebida?.preco || 0) * item.quantidade
    };
  });
  
  // Calcular total dinâmico
  venda.total = venda.itens.reduce((soma, itm) => soma + itm.subtotal, 0);
  
  res.json(venda);
}

// Remove uma venda pelo ID
function deletarVenda(req, res) {
  const { id } = req.params;
  const venda = Venda.deletarVenda(id);
  if (!venda) {
    return res.status(404).json({ erro: 'Venda não encontrada.' });
  }
  res.json(venda);
}

// Atualiza o status da venda: cotacao -> confirmado -> faturado -> entregue
function atualizarStatusVenda(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    
    const venda = Venda.buscarVendaPorId(id);
    if (!venda) {
      return res.status(404).json({ erro: 'Venda não encontrada.' });
    }

   
    if (status === 'confirmado') {
      for (const item of venda.itens) {
        try {
          removerEstoque(item.bebidaId, item.quantidade);
        } catch (erroEstoque) {
          return res.status(400).json({ erro: erroEstoque.message });
        }
      }
    }

   
    const vendaAtualizada = Venda.atualizarStatusVenda(id, status);
    res.json(vendaAtualizada);
    
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}


module.exports = {
  criarVenda,
  listarVendas,
  buscarVendaPorId,
  deletarVenda,
  atualizarStatusVenda
};
