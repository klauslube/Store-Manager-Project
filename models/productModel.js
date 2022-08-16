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
    if (!product) return null;
    return product;
  },

  create: async (name) => {
    const [product] = await connection.query('INSERT INTO StoreManager.products (name) VALUES (?)',
      [name]);
    return product.insertId;
  },

  update: async (id, name) => {
      console.log(id);
      await connection.query(`UPDATE StoreManager.products SET name = ? 
    WHERE id = ?`,
      [name, id]);
    return { id, name };
  },

};

module.exports = productModel;