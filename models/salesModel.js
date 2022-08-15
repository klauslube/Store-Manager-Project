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
};

module.exports = salesModel;