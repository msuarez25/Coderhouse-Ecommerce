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

  async getProducto(id, options = false) {
    if (id) {
      if (options) {
        return await ProductoModule.findOne({ _id: id }, options);
      }
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

  async updateProducto(id, data, file) {
    try {
      const producto = await this.getProducto(id, {
        _id: 0,
        timestamp: 0,
        __v: 0,
      });
      if (producto.length === 0) throw new Error('No hay data');

      const dataObj = JSON.parse(JSON.stringify(data));

      let newFoto = producto.foto;

      if (file !== false) {
        newFoto = file.path.replace('src/public', '');
      }

      const updatedProduct = {
        nombre: dataObj.nombre,
        code: producto.code,
        precio: parseInt(dataObj.precio),
        foto: newFoto,
        timestamp: Date.now(),
        stock: parseInt(dataObj.stock),
      };

      console.log('Updated: ', updatedProduct);
      // console.log(JSON.parse(JSON.stringify(updatedProduct)));
      const response = await ProductoModule.updateOne(
        { _id: id },
        updatedProduct
      );

      return response;
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
