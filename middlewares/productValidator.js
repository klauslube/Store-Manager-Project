const CustomError = require('../Error/CustomError');

const validators = {
  validateProduct: async (req, _res, next) => {
    const { id } = req.params;
    if (!id) throw new CustomError(404, 'invalidData', 'id invalido'); 
    
    next();
  },

  // validateNewProduct: async (req, _res, next) =>
};

module.exports = validators;