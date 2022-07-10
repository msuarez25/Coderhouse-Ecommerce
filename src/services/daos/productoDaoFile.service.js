import fs from 'fs';
import { asProductosDto } from '../dtos/productos.dto.js';
import { v4 } from 'uuid';

export default class ProductosDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.productos = [];
  }

  #leerArchivo = async () => {
    const texto = await fs.promises.readFile(this.ruta, 'utf-8');
    this.productos = JSON.parse(texto);
  };

  #escribirArchivo = async () => {
    const texto = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  };

  #getIndex = (_id) => {
    return this.productos.findIndex((producto) => producto._id === _id);
  };

  async getProductos() {
    await this.#leerArchivo();
    return asProductosDto(this.productos);
  }

  async getProducto(_id) {
    await this.#leerArchivo();
    const producto = this.productos[this.#getIndex(_id)];
    return asProductosDto(producto);
  }

  async addProducto(data, file) {
    await this.#leerArchivo();
    if (data !== '') {
      data.timestamp = Date.now();
      data._id = v4();
      data.code = v4();
      data.foto = file.path.replace('src/public', '');
    }
    this.productos.push(data);
    await this.#escribirArchivo();
    return asProductosDto(data);
  }

  async deleteProducto(_idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.productos.splice(this.#getIndex(_idParaBorrar), 1);
    await this.#escribirArchivo();
    return asProductosDto(borrada);
  }

  async updateProducto(id, data, file) {
    const dataObj = JSON.parse(JSON.stringify(data));

    try {
      await this.#leerArchivo();
      const index = this.#getIndex(id);

      let newFoto = this.productos[index].foto;

      if (file !== false) {
        newFoto = file.path.replace('src/public', '');
      }

      const updatedProduct = {
        nombre: dataObj.nombre,
        code: this.productos[index].code,
        precio: parseInt(dataObj.precio),
        foto: newFoto,
        timestamp: Date.now(),
        stock: parseInt(dataObj.stock),
      };

      const actualizada = { ...this.productos[index], ...updatedProduct };

      this.productos.splice(index, 1, actualizada);

      await this.#escribirArchivo();
      return asProductosDto(actualizada);
    } catch (error) {
      console.log(error);
    }
  }
}
