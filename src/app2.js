import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
import apiRouter from './routes/index.route.js';
import InfoRoute from './routes/info.route.js';
import minimist from 'minimist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;

// Set Default port and alias for PORT
const options = {
  default: {
    PORT: '3000',
    MODE: 'FORK',
  },
  alias: {
    p: 'PORT',
    m: 'MODE',
  },
};

// check args
const args = minimist(process.argv.slice(2), options);

if (cluster.isPrimary && args.MODE === 'CLUSTER') {
  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    cluster.fork();
  });
} else {
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

  // info
  app.use('/info', new InfoRoute());

  // set port
  const PORT = args.PORT || 3000;

  app.listen(PORT, (err) => {
    if (err) {
      return console.log('ERROR', err);
    }
    console.log(`Listening on port ${PORT}, http://localhost:${PORT}`);
  });
}
