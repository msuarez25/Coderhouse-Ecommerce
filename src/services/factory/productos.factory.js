import ProductoDaoFile from '../daos/productoDaoFile.service.js';
import ProductoDaoDb from '../daos/productoDaoDB.service.js';

const rutaArchivoProductos = './src/database/files/productos.txt';
const opcion = process.argv[2] || 'mongo';

let dao;
switch (opcion) {
  case 'file':
    dao = new ProductoDaoFile(rutaArchivoProductos);
    break;
  default:
    dao = new ProductoDaoDb();
}

export default class ProductosDaoFactory {
  static getDao() {
    return dao;
  }
}
