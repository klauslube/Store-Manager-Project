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

  delete: async (id) => {
    const checkId = await salesModel.getById(id);
    if (!checkId) return null;
    const response = await salesModel.delete(id);
    return response;
  },

  update: async (saleId, saleArr) => {
    const checkId = await salesModel.getById(saleId);
    if (!checkId) return null;
    const sales = await Promise
      .all(saleArr
      .map(({ productId, quantity }) => salesModel.update(saleId, productId, quantity)));  

    return { saleId, itemsUpdated: sales };
  },
};

module.exports = salesService;