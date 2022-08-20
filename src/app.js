import express from 'express';
import fetch from 'node-fetch';
import compression from 'compression';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import apiRouter from './routes/index.route.js';
import vistasRouter from './routes/vistas.route.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import logger from './utils/loggers.js';
import cookieParser from 'cookie-parser';
import passport from './utils/passport.util.js';
import minimist from 'minimist';
import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Numero de CPUs disponibles
const numCPUs = cpus().length;

// Define el modo por defecto del servidor y le asigna un alias
const options = {
  default: {
    MODE: 'FORK',
  },
  alias: {
    m: 'MODE',
  },
};

// Revisa argumentos con minimist
const args = minimist(process.argv.slice(2), options);

// Revisa el modo en que se inicia el servidor con los argumentos enviados. CLUSTER || FORK

if (cluster.isPrimary && args.MODE === 'CLUSTER') {
  logger.log('info', { mode: 'cluster' });

  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    logger.log('info', `Worker ${worker.process.pid} died.`);
    cluster.fork();
  });
} else {
  // Resuleve la url del sitio para obtener el path
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Analizar objetos anidados
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // comprime todas las respuestas
  app.use(compression());

  // Asigna la ruta del directorio publico
  app.use(express.static(__dirname + '/public'));

  // Establece vistas con Handlebars
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

  // Genera Sesiones
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
  // Habilita cookie parser
  app.use(cookieParser(process.env.SECRET));

  // Inicia passport
  app.use(passport.initialize());
  app.use(passport.session());

  // usa el archivo index.route.js para manejar todo
  // lo que este en el endpoint /api
  app.use('/api', apiRouter);

  // usa el archivo vistas.route.js para manejar todo
  // lo que este en el endpoint /
  app.use('/', vistasRouter);

  // set port
  const PORT = process.env.PORT || 8080;

  io.on('connection', (socket) => {
    // Mensaje de bienvenida cuando se conecta un cliente nuevo
    console.log('💻 Nuevo usuario conectado!');

    socket.on('disconnect', () => {
      console.log('❌ Usuario desconectado');
    });

    //Recibimos los mensajes desde el frontend
    socket.on('mensajeEnviado', (data) => {
      // console.log(data);
      (async function () {
        if (data.formData) {
          try {
            const response = await fetch(`http://localhost:${PORT}/mensajes`, {
              method: 'POST',
              body: JSON.stringify(data.formData),
              headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            console.log(json);
            io.sockets.emit('mensajeAgragado', json);
          } catch (error) {
            console.log('error:', error);
          }
        } else {
          io.sockets.emit('mensajeError', {
            error: 'El mensaje no pudo ser agregado',
          });
        }
      })();
    });
  });

  server.listen(PORT, (err) => {
    if (err) {
      return console.log('ERROR', err);
    }
    console.log(
      `Listening on port ${PORT}, http://localhost:${PORT} - PID ${process.pid}`
    );
  });
}
