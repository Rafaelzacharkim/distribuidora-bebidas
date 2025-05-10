let bebidas = []; 
let idAtual = 1;

function criarBebida(bebida) {
  const novaBebida = { id: idAtual++, ...bebida };
  bebidas.push(novaBebida);
  return novaBebida;
}

function listarBebidas() {
  return bebidas;
}

function buscarPorId(id) {
  return bebidas.find(b => b.id === id);
}

function atualizarBebida(id, dadosAtualizados) {
  const index = bebidas.findIndex(b => b.id === id);
  if (index === -1) return null;

  bebidas[index] = { ...bebidas[index], ...dadosAtualizados };
  return bebidas[index];
}

function deletarBebida(id) {
  const index = bebidas.findIndex(b => b.id === id);
  if (index === -1) return false;

  bebidas.splice(index, 1);
  return true;
}

module.exports = {
  criarBebida,
  listarBebidas,
  buscarPorId,
  atualizarBebida,
  deletarBebida
};
