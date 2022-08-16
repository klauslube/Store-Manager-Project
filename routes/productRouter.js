const { Router } = require('express');
const productValidator = require('../middlewares/productValidator');
const productController = require('../controllers/productController');
// const productMiddleware = require('../middlewares/productValidator');

const route = Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);

route.post('/', productValidator, productController.create);

route.put('/:id', productValidator, productController.update);

route.delete('/:id', productController.delete);

module.exports = route;