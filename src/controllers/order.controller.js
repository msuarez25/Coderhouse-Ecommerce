import OrderService from '../services/order.service.js';
import logger from '../utils/loggers.js';

export default class OrderController {
  constructor() {
    this.orderService = new OrderService();

    this.createOrder = this.createOrder.bind(this);
  }

  async createOrder(req, res) {
    try {
      const { userId, userCarId } = req.cookies;
      const order = await this.orderService.addOrder(userId);
      const response = await this.orderService.createOrder(
        order._id.toString(),
        userCarId
      );
      if (response) {
        res
          .status(200)
          .clearCookie('userCarId')
          .redirect('/gracias?o=' + order._id.toString());
      } else {
        res.status(200).json({ error: 'No se pudo realizar su compra' });
      }
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
