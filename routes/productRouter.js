const { Router } = require('express');
const productValidator = require('../middlewares/productValidator');
const productController = require('../controllers/productController');

const route = Router();

route.get('/', productController.getAll);

route.get('/:id', productValidator.validateProduct, productController.getById);

module.exports = route;