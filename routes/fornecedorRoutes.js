const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/fornecedores', fornecedorController.listarFornecedores);
router.get('/fornecedores/:id', fornecedorController.obterFornecedor);
router.post('/fornecedores', fornecedorController.criarFornecedor);
router.put('/fornecedores/:id', fornecedorController.atualizarFornecedor);
router.delete('/fornecedores/:id', fornecedorController.deletarFornecedor);

module.exports = router;
