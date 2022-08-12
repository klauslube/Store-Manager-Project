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
};

module.exports = productService;