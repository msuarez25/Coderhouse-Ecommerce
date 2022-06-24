import express from 'express';
import ProductoController from '../controllers/producto.controller.js';
// import * as AuthController from '../controllers/auth.controller.js';
import * as AuthMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/uploadFiles.js';

export default class ProductoRoute extends express.Router {
  constructor() {
    super();
    this.productoController = new ProductoController();

    this.post('/popular', this.productoController.createProducto);
    this.post(
      '/',
      AuthMiddleware.checkAuthentication,
      this.productoController.addProducto
    );
    this.get('/', this.productoController.getProductos);
    this.get('/:id', this.productoController.getProducto);
    this.put(
      '/:id',
      AuthMiddleware.checkAuthentication,
      upload.single('foto'),
      this.productoController.updateProducto
    );
    this.delete(
      '/:id',
      AuthMiddleware.checkAuthentication,
      this.productoController.deleteProducto
    );
  }
}
