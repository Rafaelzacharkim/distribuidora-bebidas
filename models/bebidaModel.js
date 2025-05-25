const bebidamodels = [];

function listar() {
  return bebidamodels;
}

function buscarPorId(id) {
  return bebidamodels.find(b => b.id === id);
}

function criar(bebida) {
  bebidamodels.push(bebida);
  return bebida;
}

function atualizar(id, novosDados) {
  const bebida = buscarPorId(id);
  if (!bebida) return null;

  bebida.nome = novosDados.nome || bebida.nome;
  bebida.marca = novosDados.marca || bebida.marca;
  bebida.valor = novosDados.valor || bebida.valor;
  bebida.volume = novosDados.volume || bebida.volume;
  bebida.idFornecedor = novosDados.idFornecedor || bebida.idFornecedor;

  return bebida;
}

function remover(id) {
  const index = bebidamodels.findIndex(b => b.id === id);
  if (index === -1) return false;
  bebidamodels.splice(index, 1);
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };