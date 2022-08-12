const { Router } = require('express');
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesValidator');

const route = Router();

route.post('/', salesMiddleware, salesController.create);

module.exports = route;