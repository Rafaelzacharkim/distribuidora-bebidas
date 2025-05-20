const express = require('express');
const router = express.Router();
const bebidaController = require('../controllers/bebidaController');

router.post('/', bebidaController.criar);
router.get('/', bebidaController.listar);
router.get('/:id', bebidaController.buscar);
router.put('/:id', bebidaController.atualizar);
router.delete('/:id', bebidaController.remover);

module.exports = router;
