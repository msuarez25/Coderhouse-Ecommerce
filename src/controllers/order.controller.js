import '../database/config/db.js';
import { UserModel } from '../database/modules/users.module.js';
import OrderService from '../services/order.service.js';
import logger from '../utils/loggers.js';
import sendMailGmail from '../services/mailer.service.js';
import sendWA from '../services/whatsapp.service.js';
import sms from '../services/text.service.js';
export default class OrderController {
  constructor() {
    this.orderService = new OrderService();

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
        console.log(user);
        const products = await response.json();
        let htmlBody = `<h1>Nuevo Perido</h1>
          <p>Tu cliente ${user.firstName} ${user.lastName} ha generado una orden de tus productos.</p>
          <p>Su email de contacto es ${user.email} y su teléfono ${user['country-code']} ${phone} </p>
          <p>Los productos solicitados son:</p>
          <ul>
        `;
        if (products[0].length > 0) {
          products[0].forEach((product) => {
            htmlBody += `<li><strong>${product.nombre}</strong> - Precio: $${product.precio} - Cantidad: ${product.amount}</li>`;
          });
        }
        htmlBody = `</ul><p>Ponte en contacto con tu cliente lo antes posible para coordinar el envio de sus productos.</p>`;

        const asunto = `Nuevo pedido de ${user.firstName} ${user.lastName} - ${user.email}`;

        sendMailGmail(asunto, htmlBody);
        sendWA(asunto);
        sms(
          `Su orden número **${orderID}** ha sido recibida y se encuentra en proceso.`,
          `${user['country-code']}${phone}`
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
