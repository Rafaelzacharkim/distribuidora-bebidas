let estoque = [];

function adicionarEstoque(idBebida, quantidade) {
  const itemExistente = estoque.find(item => item.idBebida === idBebida);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    estoque.push({ idBebida, quantidade });
  }

  return buscarEstoquePorBebida(idBebida);
}

function listarEstoque() {
  return estoque;
}

function buscarEstoquePorBebida(idBebida) {
  return estoque.find(item => item.idBebida === idBebida);
}

function atualizarEstoque(idBebida, novaQuantidade) {
  const item = estoque.find(item => item.idBebida === idBebida);
  if (!item) return null;

  item.quantidade = novaQuantidade;
  return item;
}

function removerEstoque(idBebida) {
  const index = estoque.findIndex(item => item.idBebida === idBebida);
  if (index === -1) return false;

  estoque.splice(index, 1);
  return true;
}

module.exports = {
  adicionarEstoque,
  listarEstoque,
  buscarEstoquePorBebida,
  atualizarEstoque,
  removerEstoque
};
