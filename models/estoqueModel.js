const { v4: uuidv4 } = require('uuid');

let estoque = [];

function criarEstoque({ bebidaId, quantidade, localArmazenamento, ultimaReposicao }) {
  const novoEstoque = {
    id: uuidv4(),
    bebidaId,
    quantidade,
    localArmazenamento,
    ultimaReposicao: ultimaReposicao || new Date().toISOString(),
  };

  estoque.push(novoEstoque);
  return novoEstoque;
}

function listarEstoques() {
  return estoque;
}

function buscarEstoquePorId(id) {
  return estoque.find(e => e.id === id);
}

function atualizarEstoque(id, dadosAtualizados) {
  const index = estoque.findIndex(e => e.id === id);
  if (index !== -1) {
    estoque[index] = { ...estoque[index], ...dadosAtualizados };
    return estoque[index];
  }
  return null;
}
function removerEstoque(bebidaId, quantidade) {
  const estoqueItem = estoque.find(e => e.bebidaId === bebidaId);
  if (!estoqueItem) {
    throw new Error('Item de estoque não encontrado.');
  }

  if (estoqueItem.quantidade < quantidade) {
    throw new Error('Estoque insuficiente.');
  }

  estoqueItem.quantidade -= quantidade;
  return estoqueItem;
}


function deletarEstoque(id) {
  const index = estoque.findIndex(e => e.id === id);
  if (index !== -1) {
    return estoque.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  criarEstoque,
  listarEstoques,
  buscarEstoquePorId,
  atualizarEstoque,
  deletarEstoque,
  removerEstoque
};
