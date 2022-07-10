import '../../database/config/db.js';
import { OrderModule } from '../../database/modules/order.modules.js';
import CarService from './carDaoDB.service.js';
import logger from '../../utils/loggers.js';
import { asOrdersDto } from '../dtos/orders.dto.js';
import { asProductosDto } from '../dtos/productos.dto.js';

export default class OrderService {
  constructor() {
    this.carService = new CarService();
  }

  async addOrder(userId) {
    try {
      const order = await OrderModule.create({
        user: userId,
        productos: [],
      });
      return asOrdersDto(order);
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
      return asProductosDto(car);
    }
    return false;
  }

  async getCompras() {
    const order = await OrderModule.find();
    return asOrdersDto(order);
  }

  async getOrder(id) {
    let order;
    if (id) {
      order = await OrderModule.findOne({ _id: id });
    } else {
      order = await OrderModule.find();
    }
    return asOrdersDto(order);
  }

  async updateOrder(id, data) {
    try {
      const order = this.getOrder(id);
      if (order.length === 0) throw new Error('No hay data');
      const newOrder = await OrderModule.updateOne({ _id: id }, data);
      return asOrdersDto(newOrder);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteOrder(id) {
    try {
      const order = await OrderModule.deleteOne({ _id: id });
      return asOrdersDto(order);
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
