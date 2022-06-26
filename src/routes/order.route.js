import express from 'express';
import OrderController from '../controllers/order.controller.js';
import * as AuthMiddleware from '../middlewares/auth.middleware.js';

export default class OrderRoute extends express.Router {
  constructor() {
    super();
    this.orderController = new OrderController();

    this.post(
      '/',
      AuthMiddleware.checkAuthentication,
      this.orderController.createOrder
    );
  }
}
