import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import schema from '../database/modules/graphql/graphql.modules.js';
import logger from '../utils/loggers.js';
import ProductoDaoDb from '../services/daos/productoDaoDB.service.js';
// import Cars from '../services/daos/carDaoDB.service.js';

const prod = new ProductoDaoDb();

const router = express.Router();

const productos = async () => {
  const productos = await prod.getProductos();
  return productos;
};

const producto = async ({ _id }) => {
  const producto = await prod.getProducto(_id);
  return producto;
};

const createProducto = async ({ producto }) => {
  const { nombre, foto, precio, stock, code } = producto;
  const productoNuevo = {
    nombre,
    foto,
    precio,
    code,
    stock,
  };
  logger.info(`Post Productos/ Producto: ${JSON.stringify(productoNuevo)} `);
  const produc = await prod.addProducto(productoNuevo);
  return produc;
};

const updateProducto = async ({ _id, producto }) => {
  const { nombre, foto, precio, stock, code } = producto;
  const productoNuevo = {
    nombre,
    foto,
    precio,
    code,
    stock,
  };
  logger.info(`Put Productos/ Producto: ${JSON.stringify(productoNuevo)}`);
  const produc = await prod.updateProducto(_id, productoNuevo, false);
  return produc;
};

const deleteProducto = async ({ _id }) => {
  logger.info(`Delete Productos/ Producto: ${_id}`);
  const produc = await prod.deleteProducto(_id);
  return produc;
};

router.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: {
      producto,
      productos,
      createProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  })
);

export default router;
