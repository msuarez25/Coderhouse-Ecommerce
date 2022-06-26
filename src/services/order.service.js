import '../database/config/db.js';
import { OrderModule } from '../database/modules/order.modules.js';
import CarService from './car.service.js';
import logger from '../utils/loggers.js';

export default class OrderService {
  constructor() {
    this.carService = new CarService();
  }

  async addOrder(userId) {
    try {
      return await OrderModule.create({
        user: userId,
        productos: [],
      });
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async createOrder(order_id, userCarId) {
    const car = await this.carService.getProductsFromCar(userCarId);

    const response = await OrderModule.updateOne(
      { _id: order_id },
      { $push: { productos: car } }
    );
    if (response) {
      await this.carService.deleteCarById(userCarId);
      return response;
    }
    return false;
  }

  async getCompras() {
    return await OrderModule.find();
  }

  async getOrder(id) {
    if (id) {
      return await OrderModule.findOne({ _id: id });
    } else {
      return await OrderModule.find();
    }
  }

  async updateOrder(id, data) {
    try {
      const order = this.getOrder(id);
      if (order.length === 0) throw new Error('No hay data');

      return await OrderModule.updateOne({ _id: id }, data);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteOrder(id) {
    try {
      return await OrderModule.deleteOne({ _id: id });
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
