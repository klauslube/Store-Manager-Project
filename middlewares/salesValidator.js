const salesSchema = require('./salesSchema');

const validateSale = (product) => {
  const isValid = salesSchema.validate(product);
  return isValid;
};

const salesMiddleware = (req, res, next) => {
  const product = [...req.body];
  console.log(product);
    const { error } = validateSale(product);

    if (error) {
      const [code, message] = error.message.split('|');
      console.log(error);
      return res.status(Number(code)).json({ message });
    }
    next();
  };

module.exports = salesMiddleware;