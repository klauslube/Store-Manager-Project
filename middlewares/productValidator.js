const CustomError = require('../Error/CustomError');

const validators = {
  validateProduct: async (req, _res, next) => {
    const { id } = req.params;
    if (!id) throw new CustomError(404, 'invalidData', 'id invalido'); 
    
    next();
  },
};

module.exports = validators;