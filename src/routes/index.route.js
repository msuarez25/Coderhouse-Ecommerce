import express from 'express';
import ProductoRoute from './producto.route.js';
import CarRoute from './car.route.js';
import RandomRoute from './random.route.js';
const router = express.Router();

//usa el archivo products.js para manejar todo
//lo que este en el endpoint /api/productos
router.use('/productos', new ProductoRoute());

//usa el archivo car.js para manejar todo
//lo que este en el endpoint /api/carrito
router.use('/carrito', new CarRoute());

//usa el archivo random.route.js para manejar todo
//lo que este en el endpoint /api/random
router.use('/random', new RandomRoute());

export default router;
