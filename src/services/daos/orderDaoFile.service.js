import fs from 'fs';
import { asOrdersDto } from '../dtos/orders.dto.js';
import CarService from './carDaoFile.service.js';
import { v4 } from 'uuid';
import logger from '../../utils/loggers.js';

export default class ProdcutosDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.carService = new CarService((ruta = './src/database/files/cars.txt'));
    this.orders = [];
  }

  #leerArchivo = async () => {
    const texto = await fs.promises.readFile(this.ruta, 'utf-8');
    this.orders = JSON.parse(texto);
  };

  #escribirArchivo = async () => {
    const texto = JSON.stringify(this.orders, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  };

  #getIndex = (_id) => {
    return this.orders.findIndex((producto) => producto._id === _id);
  };

  async addOrder(userId) {
    try {
      await this.#leerArchivo();
      let data = {};
      if (data !== '') {
        data.timestamp = Date.now();
        data._id = v4();
        data.user = userId;
        data.productos = [];
      }
      this.orders.push(data);
      await this.#escribirArchivo();
      return asOrdersDto(data);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async createOrder(order_id, userCarId) {
    const car = await this.carService.getProductsFromCar(userCarId);

    await this.#leerArchivo();
    const index = this.#getIndex(order_id);
    this.orders[index].productos = car;

    const actualizada = { ...this.orders[index] };
    this.orders.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    await this.carService.deleteCarById(userCarId);
    return this.orders[index].productos;
  }

  async getCompras() {
    await this.#leerArchivo();
    return asOrdersDto(this.orders);
  }

  async getOrder(_id) {
    await this.#leerArchivo();
    return asOrdersDto(this.orders[this.#getIndex(_id)]);
  }

  async updateOrder(_id, data) {
    try {
      await this.#leerArchivo();
      const index = this.#getIndex(_id);
      const actualizada = { ...this.orders[index], ...data };
      this.orders.splice(index, 1, actualizada);
      await this.#escribirArchivo();
      return asOrdersDto(actualizada);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteOrder(_idParaBorrar) {
    try {
      await this.#leerArchivo();
      const [borrada] = this.orders.splice(this.#getIndex(_idParaBorrar), 1);
      await this.#escribirArchivo();
      return asOrdersDto(borrada);
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
