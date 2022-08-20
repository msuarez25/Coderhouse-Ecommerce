// import MensajesService from '../services/mensajes.service.js';
import MensajesDaoFactory from '../services/factory/mensajes.factory.js';

export default class MensajesController {
  constructor() {
    this.mensajesService = MensajesDaoFactory.getDao();

    this.getMensajes = this.getMensajes.bind(this);
    this.addMensajes = this.addMensajes.bind(this);
  }

  async getMensajes(req, res) {
    try {
      const email = req.cookies.userEmail;
      console.log(email);
      const mensajes = await this.mensajesService.getMensajes(email);
      res.status(200).render('mensajes', {
        mensajes: mensajes,
        email: email,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }

  async addMensajes(req, res) {
    try {
      const data = req.body;
      const email = req.cookies.userEmail;
      console.log(email);
      await this.mensajesService.addMensajes(data, email);

      const mensajes = await this.mensajesService.getMensajes();

      res.json(mensajes);
    } catch (error) {
      console.log('error', error.message);
    }
  }
}
