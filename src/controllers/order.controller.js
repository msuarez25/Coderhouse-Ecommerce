// import OrderService from '../services/order.service.js';
import OrderDaoFactory from '../services/factory/orders.factory.js';
import { UserModel } from '../database/modules/users.module.js';
import logger from '../utils/loggers.js';
import sendMailGmail from '../services/mailer.service.js';
import sendWA from '../services/whatsapp.service.js';
import sms from '../services/text.service.js';
export default class OrderController {
  constructor() {
    this.orderService = OrderDaoFactory.getDao();

    this.createOrder = this.createOrder.bind(this);
  }

  async createOrder(req, res) {
    try {
      const { userId, userCarId } = req.cookies;
      const order = await this.orderService.addOrder(userId);
      const orderID = order._id.toString();
      const response = await this.orderService.createOrder(orderID, userCarId);
      if (response) {
        const user = await UserModel.findOne({ _id: userId });
        const products = response;

        let htmlBody = `<h1>Nuevo Pedido</h1>
          <p>Tu cliente ${user.firstName} ${user.lastName} ha generado una orden de tus productos.</p>
          <p>Su email de contacto es ${user.email} y su teléfono ${user[countryCode]} ${user.phone} </p>
          <p>Los productos solicitados son:</p>
          <ul>
        `;
        if (products.length > 0) {
          products.forEach((product) => {
            htmlBody += `<li><strong>${product.nombre}</strong> - Precio: $${product.precio} - Cantidad: ${product.amount}</li>`;
          });
        }
        htmlBody += `</ul><p>Ponte en contacto con tu cliente lo antes posible para coordinar el envio de sus productos.</p>`;

        const asunto = `Nuevo pedido de ${user.firstName} ${user.lastName} - ${user.email}`;

        await sendMailGmail(asunto, htmlBody);
        await sendWA(asunto);
        await sms(
          `Su orden número **${orderID}** ha sido recibida y se encuentra en proceso.`,
          `${user[countryCode]}${user.phone}`
        );
        res
          .status(200)
          .clearCookie('userCarId')
          .redirect('/gracias?o=' + orderID);
      } else {
        res.status(200).json({ error: 'No se pudo realizar su compra' });
      }
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
