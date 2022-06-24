import express from 'express';
import compression from 'compression';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
import apiRouter from './routes/index.route.js';
import InfoRoute from './routes/info.route.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import logger from './utils/loggers.js';
import cookieParser from 'cookie-parser';
// import upload from './middlewares/uploadFiles.js';

import passport from './utils/passport.util.js';
import * as AuthController from './controllers/auth.controller.js';
// import * as AuthMiddleware from './middlewares/auth.middleware.js';

// import ProductoController from './controllers/producto.controller.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/public/views/layout',
    partialsDir: __dirname + '/public/views/partials',
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: Number(process.env.EXPIRE),
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
app.use(passport.session());

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/api', apiRouter);

// Public URLs
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});
app.get('/productos', (req, res) => {
  res.sendFile(__dirname + '/public/views/productos.html');
});
app.get('/carrito', (req, res) => {
  res.sendFile(__dirname + '/public/views/carrito.html');
});
app.get('/editar/:id', (req, res) => {
  res.sendFile(__dirname + '/public/views/editar-producto.html');
});
app.get('/agregar', (req, res) => {
  res.sendFile(__dirname + '/public/views/agregar-producto.html');
});

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

app.get('/signup', AuthController.getSignup);
app.post(
  '/signup',
  // upload.single('foto'),
  passport.authenticate('signup', { failureRedirect: '/failSignup' }),
  AuthController.postSignup
);
app.get('/failSignup', AuthController.failSignup);

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

app.get('/login', AuthController.getLogin);
app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failLogin' }),
  AuthController.postLogin
);
app.get('/failLogin', AuthController.failLogin);

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

app.get('/logout', AuthController.logout);

// info
app.use('/info', new InfoRoute());
app.use('/info-gzip', compression(), new InfoRoute());

// 404
app.use((req, res) => {
  res.status(400).json({ error: 'Pagina no encontrada' });
  logger.log('warn', { ruta: req.url, metodo: req.method });
});

// set port
const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(
    `Listening on port ${PORT}, http://localhost:${PORT} - PID ${process.pid}`
  );
});
