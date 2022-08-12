const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const [products] = await connection
      .query('SELECT * FROM StoreManager.products ORDER BY id');
  
    return products;
  },

  getById: async (id) => {
    const [[product]] = await connection.query('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);

    return product;
  },

  create: async (name) => {
    const [product] = await connection.query('INSERT INTO StoreManager.products (name) VALUES (?)',
      [name]);
    console.log(product);
    return product.insertId;
  },
};

module.exports = productModel;