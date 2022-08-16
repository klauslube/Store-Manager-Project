const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { salesMiddleware, checkProductId } = require('../middlewares/salesValidator');
// const checkProductId = require('../middlewares/salesValidator');

const route = Router();

route.post('/', salesMiddleware, checkProductId, salesController.createSale);

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);

route.delete('/:id', salesController.delete);

module.exports = route;