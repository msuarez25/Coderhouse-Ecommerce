import express from 'express';
import InfoController from '../controllers/info.controller.js';

export default class InfoRoute extends express.Router {
  constructor() {
    super();
    this.infoController = new InfoController();

    this.get('/', this.infoController.getInfo);
  }
}
