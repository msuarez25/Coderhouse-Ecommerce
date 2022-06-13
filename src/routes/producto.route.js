import express from 'express';
import ProductoController from '../controllers/producto.controller.js';
import logger from '../middlewares/logger.js';
import upload from '../middlewares/uploadFiles.js';

export default class ProductoRoute extends express.Router {
  constructor() {
    super();
    this.productoController = new ProductoController();

    this.post('/popular', this.productoController.createProducto);
    this.post(
      '/',
      logger,
      upload.single('foto'),
      this.productoController.addProducto
    );
    this.get('/', this.productoController.getProductos);
    this.get('/:id', this.productoController.getProducto);
    this.put('/:id', this.productoController.updateProducto);
    this.delete('/:id', this.productoController.deleteProducto);
  }
}
