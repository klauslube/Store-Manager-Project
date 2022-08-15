const salesService = require('../services/salesService');

const salesController = {
  createSale: async (req, res) => {
    // const [{ productId, quantity }] = req.body;
    const sale = await salesService.createSale(req.body);
    // if (!productId) return res.status(404).json({ message: 'Product not found' });

    return res.status(201).json(sale);
  },
};

module.exports = salesController;