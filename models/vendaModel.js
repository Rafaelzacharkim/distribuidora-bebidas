const crypto = require('crypto');
const { buscarPorId: buscarBebidaPorId } = require('./bebidaModel');
const { removerEstoque, listarEstoques } = require('./estoqueModel');

let vendas = [];

const STATUS = ['cotacao', 'confirmado', 'faturado', 'entregue'];

function criarVenda(venda) {
  venda.id = crypto.randomUUID();
  venda.status = 'cotacao';
  venda.data = new Date().toISOString();

  venda.itens = (venda.itens || []).filter(item =>
    item.bebidaId && item.quantidade > 0
  );

  vendas.push(venda);
  return venda;
}

function listarVendas() {
  return vendas;
}

function buscarVendaPorId(id) {
  return vendas.find(v => v.id === id) || null;
}

function deletarVenda(id) {
  const index = vendas.findIndex(v => v.id === id);
  if (index === -1) return null;
  return vendas.splice(index, 1)[0];
}

function atualizarStatusVenda(id, novoStatus) {
  const venda = buscarVendaPorId(id);
  if (!venda) return null;

  const atualIndex = STATUS.indexOf(venda.status);
  const novoIndex = STATUS.indexOf(novoStatus);
  if (novoIndex === -1 || novoIndex !== atualIndex + 1) {
    throw new Error(`Transição inválida: ${venda.status} → ${novoStatus}`);
  }

  if (novoStatus === 'confirmado') {
   
    for (const item of venda.itens) {
      const estoqueItem = listarEstoques().find(e => e.bebidaId === item.bebidaId);
      if (!estoqueItem || estoqueItem.quantidade < item.quantidade) {
        throw new Error(`Estoque insuficiente para bebida ${item.bebidaId}`);
      }
    }
    venda.itens.forEach(item => removerEstoque(item.bebidaId, item.quantidade));
  }

  venda.status = novoStatus;
  
  if (novoStatus === 'faturado' || novoStatus === 'entregue') {
    venda.total = venda.itens.reduce((sum, it) => sum + (it.subtotal || 0), 0);
  }

  return venda;
}

module.exports = {
  criarVenda,
  listarVendas,
  buscarVendaPorId,
  deletarVenda,
  atualizarStatusVenda
};
