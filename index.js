const app = require('./app');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRoute = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', productsRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
