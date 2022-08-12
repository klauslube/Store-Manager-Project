const productService = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const data = await productService.getAll();
    res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    
    const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  },

  create: async (req, res) => {
    // console.log(req.body);
    const { name } = req.body;

    const product = await productService.create(name);
    res.status(201).json(product);
  },
};

module.exports = productController;