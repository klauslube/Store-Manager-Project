const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { salesMiddleware, checkProductId } = require('../middlewares/salesValidator');
// const checkProductId = require('../middlewares/salesValidator');

const route = Router();

route.post('/', salesMiddleware, checkProductId, salesController.createSale);

module.exports = route;