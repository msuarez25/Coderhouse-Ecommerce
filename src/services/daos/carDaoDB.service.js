import '../../database/config/db.js';
import { CarModule } from '../../database/modules/cars.modules.js';
import ProductoService from './productoDaoDB.service.js';
import logger from '../../utils/loggers.js';
import { asCarsDto } from '../dtos/cars.dto.js';
import { asProductosDto } from '../dtos/productos.dto.js';

export default class CarService {
  constructor() {
    this.productoService = new ProductoService();
  }

  async addCar(userId) {
    try {
      const car = await CarModule.findOne({ user: userId });
      if (car) {
        return asCarsDto(car);
      }
      const response = await CarModule.create({
        user: userId,
        productos: [],
      });
      return asCarsDto(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteCarById(id) {
    try {
      return await CarModule.deleteOne({ _id: id });
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProductsFromCar(id) {
    try {
      const car = await CarModule.findOne({ _id: id });
      return asProductosDto(car.productos);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async addProductToCarById(id, id_prod) {
    try {
      const productos = await CarModule.findOne({ _id: id });
      if (productos.productos.length > -1) {
        const product = await this.productoService.getProducto(id_prod);
        const alReadyThere = productos.productos.filter((prod) => {
          return prod._id.equals(product._id);
        });

        if (alReadyThere.length > 0) {
          await CarModule.updateOne(
            { _id: id },
            { $pull: { productos: product } }
          );

          product.amount = alReadyThere.length + 1;
        } else {
          product.amount = 1;
        }

        const response = await CarModule.updateOne(
          { _id: id },
          { $push: { productos: product } }
        );
        return asCarsDto(response);
      }
      return false;
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProductFromCarById(id, id_prod) {
    try {
      const productos = await CarModule.findOne({ _id: id });
      if (productos.productos.length > -1) {
        const product = await this.productoService.getProducto(id_prod);

        return await CarModule.updateOne(
          { _id: id },
          { $pull: { productos: product } }
        );
      }
      return false;
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
