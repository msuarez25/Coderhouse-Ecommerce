import fs from 'fs';
import ProductoService from './productoDaoFile.service.js';
import { asCarsDto } from '../dtos/cars.dto.js';
import { v4 } from 'uuid';
import logger from '../../utils/loggers.js';

export default class CarsDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.productoService = new ProductoService(
      (ruta = './src/database/files/productos.txt')
    );
    this.cars = [];
  }

  #leerArchivo = async () => {
    const texto = await fs.promises.readFile(this.ruta, 'utf-8');
    this.cars = JSON.parse(texto);
  };

  #escribirArchivo = async () => {
    const texto = JSON.stringify(this.cars, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  };

  #getIndex = (_id) => {
    return this.cars.findIndex((car) => car._id === _id);
  };

  async addCar(userId) {
    try {
      await this.#leerArchivo();
      let data = {};

      data.timestamp = Date.now();
      data._id = v4();
      data.user = userId;
      data.productos = [];

      this.cars.push(data);
      await this.#escribirArchivo();
      return asCarsDto(data);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteCarById(_idParaBorrar) {
    try {
      await this.#leerArchivo();
      const [borrada] = this.cars.splice(this.#getIndex(_idParaBorrar), 1);
      await this.#escribirArchivo();
      return borrada;
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProductsFromCar(_id) {
    try {
      await this.#leerArchivo();
      return this.cars[this.#getIndex(_id)].productos;
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async addProductToCarById(_id, id_prod) {
    try {
      const producto = await this.productoService.getProducto(id_prod);
      if (producto.amount) {
        producto.amount = parseInt(producto.amount) + 1;
      } else {
        producto.amount = 1;
      }
      await this.#leerArchivo();
      const index = this.#getIndex(_id);
      let productos = this.cars[index].productos;
      if (productos.length < 1) {
        productos.push(producto);
      } else {
        productos = productos.forEach((prod) => {
          if (prod._id == producto._id) {
            prod.amount = parseInt(prod.amount) + 1;
          } else {
            productos.push(producto);
          }
        });
      }
      const actualizada = { ...this.cars[index] };
      this.cars.splice(index, 1, actualizada);
      await this.#escribirArchivo();
      return asCarsDto(actualizada);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProductFromCarById(_id, id_prod) {
    try {
      await this.#leerArchivo();
      const index = this.#getIndex(_id);
      let productos = this.cars[index].productos;
      productos = productos.filter((prod) => {
        return prod._id != id_prod;
      });
      this.cars[index].productos = productos;
      await this.#escribirArchivo();
      return actualizada;
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
