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
    // if (!product) throw new CustomError(404, 'notFound', 'Product not found');

    return product;
  },

};

module.exports = productService;