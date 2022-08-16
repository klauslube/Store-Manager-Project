// const CustomError = require('../Error/CustomError');
const productModel = require('../models/productModel');

const productService = {
  getAll: async () => {
    const product = await productModel.getAll();
    return product;
  },

  getById: async (id) => {
    const product = await productModel.getById(id);
     if (!product) return null;

    return product;
  },

  create: async (name) => {
    const id = await productModel.create(name);
    const product = { id, name };
    return product;
  },
  check: async (productId) => {
    const product = await productModel.getById(productId);
    if (!product) return false;
  },
  update: async (id, name) => {
    const checkId = await productModel.getById(id);
    if (!checkId) return null;
    const response = await productModel.update(id, name);

    return response;
  },
  delete: async (id) => {
    const checkId = await productModel.getById(id);
    if (!checkId) return null;
    const response = await productModel.delete(id);
    return response;
  },
};

module.exports = productService;