const { v4: uuidv4 } = require('uuid');

let carrinho = [];

function adicionarAoCarrinho(bebida, quantidade) {
  const subtotal = bebida.valor * quantidade;

  const item = {
    id: uuidv4(),
    bebidaId: bebida.id,
    nome: bebida.nome,
    marca: bebida.marca,
    valor: bebida.valor,
    volume: bebida.volume,
    quantidade,
    subtotal
  };

  carrinho.push(item);
  return item;
}

function listarCarrinho() {
  const total = carrinho.reduce((soma, item) => soma + item.subtotal, 0);
  return { itens: carrinho, total };
}

function removerDoCarrinho(id) {
  const index = carrinho.findIndex(item => item.id === id);
  if (index === -1) return false;
  carrinho.splice(index, 1);
  return true;
}

function esvaziarCarrinho() {
  carrinho = [];
  return true;
}

module.exports = {
  adicionarAoCarrinho,
  listarCarrinho,
  removerDoCarrinho,
  esvaziarCarrinho
};
