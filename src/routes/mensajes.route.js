import express from 'express';
import MensajesController from '../controllers/mensajes.controller.js';
import * as AuthMiddleware from '../middlewares/auth.middleware.js';

export default class MensajesRoute extends express.Router {
  constructor() {
    super();
    this.mensajesController = new MensajesController();

    this.get(
      '/',
      AuthMiddleware.checkAuthentication,
      this.mensajesController.getMensajes
    );
    this.post('/', this.mensajesController.addMensajes);
  }
}
