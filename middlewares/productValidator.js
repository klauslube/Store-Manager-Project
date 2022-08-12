const productSchema = require('./productSchema');

  const validateProduct = (product) => {
    const isValid = productSchema.validate(product);
    return isValid;
  };

  const productMiddleware = (req, res, next) => {
    const product = { ...req.body };
    const { error } = validateProduct(product);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

module.exports = productMiddleware;