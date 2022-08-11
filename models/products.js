const connection = require('./connection');

const productObj = {
  getAll: async () => {
    const [[products]] = await connection.execute('SELECT * FROM StoreManager.products');
  
    return products;
  },

  getById: async (id) => {
    const [[product]] = await connection.query('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);

    return product;
  },
};

module.exports = { productObj };