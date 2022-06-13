import express from 'express';
import CarController from '../controllers/car.controller.js';
import logger from '../middlewares/logger.js';

export default class CarRoute extends express.Router {
  constructor() {
    super();
    this.carController = new CarController();

    this.post('/', logger, this.carController.addCar);
    this.delete('/:id', logger, this.carController.deleteCarById);
    this.get('/:id/productos', this.carController.getProductsFromCar);
    this.post(
      '/:id/productos/:id_prod',
      logger,
      this.carController.addProductToCarById
    );
    this.delete(
      '/:id/productos/:id_prod',
      logger,
      this.carController.deleteProductFromCarById
    );
  }
}
