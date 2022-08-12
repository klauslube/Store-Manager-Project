const connection = require('./connection');

const salesModel = {
  create: async (productId, quantity) => {
    const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
    const q2 = `INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity)
    VALUES (?,?,?)`;
    const [sale] = await connection.query(querySales);
    const [saleProduct] = await connection.query(q2, [sale.insertId, productId, quantity]);
    
    const saleObj = {
      id: [saleProduct.insertId],
      itemsSold: [
        {
          productId,
          quantity,
        },
      ],
    };
    if (!saleProduct.affectedRows) return null;
    return saleObj;
  },
};

module.exports = salesModel;