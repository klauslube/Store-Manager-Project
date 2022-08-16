const salesService = require('../services/salesService');

const salesController = {
  createSale: async (req, res) => {
    const sales = await salesService.createSale(req.body);

    return res.status(201).json(sales);
  },

  getAll: async (_req, res) => {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    
    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(sale);
  },

   delete: async (req, res) => {
    const { id } = req.params;
    const deletedSale = await salesService.delete(id);
    if (!deletedSale) return res.status(404).json({ message: 'Sale not found' });
    return res.status(204).send();
  },

};

module.exports = salesController;