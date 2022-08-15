const salesModel = require('../models/salesModel');

const salesService = {
  createSale: async (saleInfo) => {
    const { id } = await salesModel.createSale();
    const sales = await Promise.all(saleInfo.map(({ productId, quantity }) =>
      salesModel.createSaleProduct({ saleId: id, productId, quantity })));
    return { id, itemsSold: sales };
  },

  getAll: async () => {
    const sales = await salesModel.getAll();
    return sales;
  },

  getById: async (id) => {
    const sale = await salesModel.getById(id);
     if (!sale) return null;
    return sale;
  },
};

module.exports = salesService;