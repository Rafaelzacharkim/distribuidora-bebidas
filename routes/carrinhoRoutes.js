const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/carrinhoController');

router.post('/', CarrinhoController.adicionar);
router.get('/', CarrinhoController.listar);
router.delete('/:id', CarrinhoController.remover);
router.delete('/', CarrinhoController.esvaziar);

module.exports = router;
