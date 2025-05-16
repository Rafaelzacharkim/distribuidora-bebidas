const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/vendaController');

router.post('/', VendaController.finalizarCompra);
router.get('/', VendaController.listarVendas);

module.exports = router;
