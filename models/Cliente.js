const { v4: uuidv4 } = require('uuid');

class Cliente {
  constructor(nome, email) {
    this.id = uuidv4();
    this.nome = nome;
    this.email = email;
  }
}

module.exports = Cliente;
