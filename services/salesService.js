const salesModel = require('../models/salesModel');

const salesService = {
  create: async (productId, quantity) => {
    const id = await salesModel.create(productId, quantity);
    const sales = { id };
    return sales;
  },
};

module.exports = salesService;