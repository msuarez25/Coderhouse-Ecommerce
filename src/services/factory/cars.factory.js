import CarDaoFile from '../daos/carDaoFile.service.js';
import CarDaoDb from '../daos/carDaoDB.service.js';

const rutaArchivoCars = './src/database/files/cars.txt';
const opcion = process.argv[2] || 'mongo';

let dao;
switch (opcion) {
  case 'file':
    dao = new CarDaoFile(rutaArchivoCars);
    break;
  default:
    dao = new CarDaoDb();
}

export default class CarsDaoFactory {
  static getDao() {
    return dao;
  }
}
