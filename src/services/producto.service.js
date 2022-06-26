import createProducto from '../utils/producto.utils.js';
import '../database/config/db.js';
import { ProductoModule } from '../database/modules/productos.modules.js';
import { v4 } from 'uuid';
import logger from '../utils/loggers.js';

export default class ProductoService {
  constructor() {}

  async createProducto(cant = 10) {
    for (let i = 0; i < cant; i++) {
      const fakeProducto = createProducto();
      await ProductoModule.create(fakeProducto);
    }
    return await ProductoModule.find();
  }

  async getProductos() {
    return await ProductoModule.find();
  }

  async getProducto(id) {
    if (id) {
      return await ProductoModule.findOne({ _id: id });
    } else {
      return await ProductoModule.find();
    }
  }

  async addProducto(data, file) {
    if (data !== '') {
      data.timestamp = Date.now();
      data.code = v4();
      data.foto = file.path.replace('src/public', '');
      return await ProductoModule.create(data);
    }
    return false;
  }

  async updateProducto(id, data) {
    try {
      const producto = await this.getProducto(id);
      if (producto.length === 0) throw new Error('No hay data');

      let updatedProduct = {};
      for (const property in producto) {
        console.log(data[property]);
        if (
          data[property] === undefined &&
          property !== '_id' &&
          property !== '_v'
        ) {
          updatedProduct[property] = producto[property];
        } else if (property !== '_id' && property !== '_v') {
          updatedProduct[property] = data[property];
        }
      }

      console.log(JSON.parse(JSON.stringify(updatedProduct)));

      return await ProductoModule.updateOne({ _id: id }, data);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProducto(id) {
    try {
      return await ProductoModule.deleteOne({ _id: id });
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
