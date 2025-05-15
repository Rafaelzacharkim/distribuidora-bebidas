const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/', estoqueController.adicionar);
router.get('/', estoqueController.listar);
router.get('/:idBebida', estoqueController.buscar);
router.put('/:idBebida', estoqueController.atualizar);
router.delete('/:idBebida', estoqueController.remover);

module.exports = router;
