const Venda = require('../models/vendaModel');
const Estoque = require('../models/estoqueModel');
const Bebida = require('../models/bebidaModel');
const { removerEstoque } = require('../models/estoqueModel');
const { clientes } = require('./clienteController');


function criarVenda(req, res) {
  const { clienteId, itens } = req.body;

  if (!clienteId || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: 'clienteId e itens da venda são obrigatórios.' });
  }

  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado.' });
  }

  for (const item of itens) {
    if (!item.bebidaId || typeof item.quantidade !== 'number') {
      return res.status(400).json({
        erro: 'Cada item precisa de bebidaId válido e quantidade numérica.'
      });
    }
  }

  const novaVenda = Venda.criarVenda({ clienteId, itens });
  return res.status(201).json(novaVenda);
}


function listarVendas(req, res) {
  const todas = Venda.listarVendas();
  res.json(todas);
}


function buscarVendaPorId(req, res) {
  const { id } = req.params;
  const venda = Venda.buscarVendaPorId(id);
  if (!venda) {
    return res.status(404).json({ erro: 'Venda não encontrada.' });
  }


  const itensDetalhados = venda.itens.map(item => {
    const bebida = Bebida.buscarPorId(item.bebidaId);
    return {
      bebidaId: item.bebidaId,
      nome: bebida?.nome || 'Desconhecida',
      quantidade: item.quantidade,
      precoUnitario: bebida?.preco || 0,
      subtotal: (bebida?.preco || 0) * item.quantidade
    };
  });

  const total = itensDetalhados.reduce((soma, itm) => soma + itm.subtotal, 0);

  
  const cliente = clientes.find(c => c.id === venda.clienteId);

  res.json({
    id: venda.id,
    cliente: cliente || { id: venda.clienteId, nome: 'Desconhecido' },
    status: venda.status,
    data: venda.data,
    itens: itensDetalhados,
    total
  });
}

function deletarVenda(req, res) {
  const { id } = req.params;
  const venda = Venda.deletarVenda(id);
  if (!venda) {
    return res.status(404).json({ erro: 'Venda não encontrada.' });
  }
  res.json(venda);
}


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
