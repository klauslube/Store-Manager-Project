const salesModel = require('../models/salesModel');

const salesService = {
  createSale: async (saleInfo) => {
    const { id } = await salesModel.createSale();
    const sales = await Promise.all(saleInfo.map(({ productId, quantity }) =>
      salesModel.createSaleProduct({ saleId: id, productId, quantity })));
    return { id, itemsSold: sales };
  },

};

module.exports = salesService;