// import ProductoService from '../services/producto.service.js';
import ProductosDaoFactory from '../services/factory/productos.factory.js';
import logger from '../utils/loggers.js';

export default class ProductoController {
  constructor() {
    this.productoService = ProductosDaoFactory.getDao();

    this.createProducto = this.createProducto.bind(this);
    this.getProductos = this.getProductos.bind(this);
    this.getProducto = this.getProducto.bind(this);
    this.addProducto = this.addProducto.bind(this);
    this.updateProducto = this.updateProducto.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);
  }

  async createProducto(req, res) {
    const { cant } = req.query;
    try {
      const response = await this.productoService.createProducto(cant);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProductos(req, res) {
    try {
      const response = await this.productoService.getProductos();
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProducto(req, res) {
    let id = null;
    // if (req.query.id) id = req.query.id;
    if (req.params.id) id = req.params.id;
    try {
      const response = await this.productoService.getProducto(id);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async addProducto(req, res) {
    const data = req.body;
    const { flag } = req.params;
    let fileObj = false;
    if (flag == 'false') {
      fileObj = req.file;
    }

    const response = await this.productoService.addProducto(data, fileObj);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Producto no pudo ser agregado' });
    }
  }

  async updateProducto(req, res) {
    const { id, flag } = req.params;
    const body = req.body;
    let fileObj = false;
    if (flag == 'true') {
      fileObj = req.file;
    }

    try {
      const response = await this.productoService.updateProducto(
        id,
        body,
        fileObj
      );

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({ error: 'Producto no pudo ser actualizado' });
      }
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProducto(req, res) {
    const { id } = req.params;
    try {
      const response = await this.productoService.deleteProducto(id);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
