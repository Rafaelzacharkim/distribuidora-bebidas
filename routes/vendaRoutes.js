// routes/vendaRoutes.js
const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');


router.post('/', vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.get('/:id', vendaController.buscarVendaPorId);
router.delete('/:id', vendaController.deletarVenda);
router.patch('/:id/status', vendaController.atualizarStatusVenda);

module.exports = router;
