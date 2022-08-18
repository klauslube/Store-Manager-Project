const connection = require('./connection');

const salesModel = {
  createSale: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
    const [{ insertId }] = await connection.query(query);
    return { id: insertId };
  },
  createSaleProduct: async (saleInfo) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity)
    VALUES (?,?,?)`;
    const { saleId, productId, quantity } = saleInfo; 
    await connection.query(query,
      [saleId, productId, quantity]);
    
    return { productId, quantity };
  },

  getAll: async () => {
    const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id`;
    const [result] = await connection.query(query);
    return result;
  },

  getById: async (id) => {
      const query = `SELECT date, product_id as productId, quantity 
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id`;
     const [result] = await connection.query(query,
       [id]);
    if (result.length === 0) return null;
    return result;
  },

  delete: async (id) => {
    await connection.query('DELETE FROM StoreManager.sales WHERE id  = ?', [id]);
    return { id };
  },
    
  update: async (saleId, productId, quantity) => {
    await connection.query(`UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ? 
    WHERE sale_id = ? AND product_id = ?`,
    [productId, quantity, saleId, productId]);
  return { productId, quantity };
  },  
    
};

module.exports = salesModel;