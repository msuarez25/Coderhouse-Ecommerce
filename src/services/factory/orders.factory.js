import OrderDaoFile from '../daos/orderDaoFile.service.js';
import OrderDaoDb from '../daos/orderDaoDB.service.js';

const rutaArchivoOrders = './src/database/files/orders.txt';
const opcion = process.argv[2] || 'mongo';

let dao;
switch (opcion) {
  case 'file':
    dao = new OrderDaoFile(rutaArchivoOrders);
    break;
  default:
    dao = new OrderDaoDb();
}

export default class OrdersDaoFactory {
  static getDao() {
    return dao;
  }
}
