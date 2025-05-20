const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/', fornecedorController.listarFornecedores);
router.get('/:id', fornecedorController.obterFornecedor);
router.post('/', fornecedorController.criarFornecedor);
router.put('/:id', fornecedorController.atualizarFornecedor);
router.delete('/:id', fornecedorController.deletarFornecedor);


module.exports = router;
