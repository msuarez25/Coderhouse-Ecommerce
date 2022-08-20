import MensajesDaoFile from '../daos/mensajesDaoFile.service.js';
import MensajesDaoDb from '../daos/mensajesDaoDB.service.js';

const rutaArchivoMensajes = './src/database/files/mensajes.txt';

const opcion = process.argv[2] || 'mongo';

let dao;
switch (opcion) {
  case 'file':
    dao = new MensajesDaoFile(rutaArchivoMensajes);
    break;
  default:
    dao = new MensajesDaoDb();
}

export default class MensajesDaoFactory {
  static getDao() {
    return dao;
  }
}
