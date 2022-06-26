import express from 'express';
import CarController from '../controllers/car.controller.js';
import * as AuthMiddleware from '../middlewares/auth.middleware.js';

export default class CarRoute extends express.Router {
  constructor() {
    super();
    this.carController = new CarController();

    this.post(
      '/',
      AuthMiddleware.checkAuthentication,
      this.carController.addCar
    );
    this.delete(
      '/:id',
      AuthMiddleware.checkAuthentication,
      this.carController.deleteCarById
    );
    this.get(
      '/:id/productos',
      AuthMiddleware.checkAuthentication,
      this.carController.getProductsFromCar
    );
    this.post(
      '/:id/productos/:id_prod',
      AuthMiddleware.checkAuthentication,
      this.carController.addProductToCarById
    );
    this.delete(
      '/:id/productos/:id_prod',
      AuthMiddleware.checkAuthentication,
      this.carController.deleteProductFromCarById
    );
  }
}
