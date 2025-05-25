const express = require('express');
const router = express.Router();
const controller = require('../controllers/estoqueController');


router.post('/', controller.criarEstoque);
router.get('/', controller.listarEstoques);
router.get('/:id', controller.buscarEstoquePorId);
router.put('/:id', controller.atualizarEstoque);
router.delete('/:id', controller.deletarEstoque);

module.exports = router;
