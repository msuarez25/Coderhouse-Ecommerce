import express from 'express';
import ProductoController from '../controllers/producto.controller.js';
import upload from '../middlewares/uploadFiles.js';

export default class ProductoTestRoute extends express.Router {
  constructor() {
    super();
    this.productoController = new ProductoController();

    // este endpoint no trata de convertir el archivo. Ya que no hay ninguno.
    // Solo le estamos pasando la url de una imagen.
    this.post('/false', this.productoController.addProducto);
    this.post('/', upload.single('foto'), this.productoController.addProducto);
    this.get('/', this.productoController.getProductos);
    this.get('/:id', this.productoController.getProducto);
    this.post('/:id', upload.none(), this.productoController.updateProducto);
    this.post(
      '/:id/:flag',
      upload.single('foto'),
      this.productoController.updateProducto
    );
    this.delete('/:id', this.productoController.deleteProducto);
  }
}
