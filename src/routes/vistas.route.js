import express from 'express';
import InfoRoute from './info.route.js';
import MensajesRoute from './mensajes.route.js';
import upload from '../middlewares/uploadFiles.js';
import { dirname } from 'path';
import passport from '../utils/passport.util.js';
import logger from '../utils/loggers.js';
import { fileURLToPath } from 'url';
import * as AuthController from '../controllers/auth.controller.js';
import * as AuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Resuleve la url del sitio para obtener el path
const url = dirname(fileURLToPath(import.meta.url));
const __dirname = url.substring(0, url.lastIndexOf('/'));

// Public URLs

// Inicio
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});
// Lista de Productos
router.get('/productos', (req, res) => {
  res.sendFile(__dirname + '/public/views/productos.html');
});

// Carrito
router.get('/carrito', AuthMiddleware.checkAuthentication, (req, res) => {
  res.sendFile(__dirname + '/public/views/carrito.html');
});

// Actualizar un producto por su ID
router.get('/editar/:id', AuthMiddleware.checkAuthentication, (req, res) => {
  res.sendFile(__dirname + '/public/views/editar-producto.html');
});

// Agregar producto
router.get('/agregar', AuthMiddleware.checkAuthentication, (req, res) => {
  res.sendFile(__dirname + '/public/views/agregar-producto.html');
});

// Despues de hacer una compra redirige a esta pagina
router.get('/gracias', AuthMiddleware.checkAuthentication, (req, res) => {
  res.status(200).render('gracias', {
    query: req.query,
  });
});

// info
router.use('/info', new InfoRoute());

// Mensajes / Chat
router.use('/mensajes', new MensajesRoute());

// Agrega favicon y evita error 404 en la consola.
router.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/assets/images/ecommerce-favicon.ico');
});

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

router.get('/signup', AuthController.getSignup);
router.post(
  '/signup',
  (req, res, next) => {
    upload.single('foto')(req, {}, (err) => {
      if (err) {
        throw err;
      }
      req.body.foto = req.file.path.replace('src/public', '');
      next();
    });
  },
  passport.authenticate('signup', { failureRedirect: '/failSignup' }),
  AuthController.postSignup
);
router.get('/failSignup', AuthController.failSignup);

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

router.get('/login', AuthController.getLogin);
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failLogin' }),
  AuthController.postLogin
);
router.get('/failLogin', AuthController.failLogin);

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

router.get('/logout', AuthController.logout);

// 404
router.use((req, res) => {
  res.status(400).json({ error: 'Pagina no encontrada' });
  logger.log('error', { ruta: req.url, metodo: req.method, error: '404' });
});

export default router;
