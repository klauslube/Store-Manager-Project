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

    return res.status(200).json(product);
  },

  create: async (req, res) => {
    const { name } = req.body;
    
    const product = await productService.create(name);
    res.status(201).json(product);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productService.update(id, name);
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(updatedProduct);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productService.delete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).send();
  },
};

module.exports = productController;