const productService = require('../services/productService');
const salesSchema = require('./salesSchema');

const validateSale = (sale) => {
  const isValid = salesSchema.validate(sale);
  return isValid;
};

const salesMiddleware = (req, res, next) => {
  const product = [...req.body];
    const { error } = validateSale(product);

    if (error) {
      const [code, message] = error.message.split('|');
      console.log(error);
      return res.status(Number(code)).json({ message });
    }
    next();
  };

const checkProductId = async (req, res, next) => {
  const saleArr = req.body;
  const response = await Promise.all(saleArr.map((sale) => productService.check(sale.productId)));

  if (response.some((r) => r === false)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { salesMiddleware, checkProductId };