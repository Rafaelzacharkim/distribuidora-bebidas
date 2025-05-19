const { v4: uuidv4 } = require('uuid');

let vendas = [];

function criarVenda({ itens, total }) {
  const novaVenda = {
    id: uuidv4(),
    itens,
    total,
    status: 'cotacao', 
    data: new Date().toISOString()
  };
  vendas.push(novaVenda);
  return novaVenda;
}

function listarVendas() {
  return vendas;
}

function buscarVendaPorId(id) {
  return vendas.find(v => v.id === id);
}

function deletarVenda(id) {
  const index = vendas.findIndex(v => v.id === id);
  if (index !== -1) {
    return vendas.splice(index, 1)[0];
  }
  return null;
}

function atualizarStatus(id, novoStatus) {
  const venda = buscarVendaPorId(id);
  if (!venda) return null;

  const estadosValidos = ['cotacao', 'confirmado', 'faturado', 'entregue'];
  if (!estadosValidos.includes(novoStatus)) return 'invalido';

  venda.status = novoStatus;
  return venda;
}

module.exports = {
  criarVenda,
  listarVendas,
  buscarVendaPorId,
  deletarVenda,
  atualizarStatus
};
