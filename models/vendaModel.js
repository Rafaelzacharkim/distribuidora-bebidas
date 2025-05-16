const { v4: uuidv4 } = require('uuid');

let vendas = [];

function registrarVenda(itens, total) {
  const novaVenda = {
    id: uuidv4(),
    data: new Date().toISOString(),
    itens,
    total
  };
  vendas.push(novaVenda);
  return novaVenda;
}

function listarVendas() {
  return vendas;
}

module.exports = { registrarVenda, listarVendas };
