import express from 'express';
import ProductoRoute from './producto.route.js';
import ProductoTestRoute from './producto.test.route.js';
import CarRoute from './car.route.js';
import RandomRoute from './random.route.js';
import OrderRoute from './order.route.js';
const router = express.Router();

//usa el archivo products.route.js para manejar todo
//lo que este en el endpoint /api/productos
router.use('/productos', new ProductoRoute());

// Test Productos
router.use('/test/productos', new ProductoTestRoute());

//usa el archivo car.route.js para manejar todo
//lo que este en el endpoint /api/carrito
router.use('/carrito', new CarRoute());

//usa el archivo order.route.js para manejar todo
//lo que este en el endpoint /api/order
router.use('/order', new OrderRoute());

//usa el archivo random.route.js para manejar todo
//lo que este en el endpoint /api/random
router.use('/random', new RandomRoute());

export default router;
