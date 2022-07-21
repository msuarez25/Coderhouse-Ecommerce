import supertest from 'supertest';
import { expect } from 'chai';
import generateProducto from '../utils/producto.utils.js';
import productosJson from './productos.js';

const productosFromJson = productosJson();

const request = supertest('http://localhost:8080');

let createdProductID = '';
const createProducto = generateProducto();

describe('Test Api REST de Productos', () => {
  describe('GET', () => {
    it('deberia retornar un status 200', async () => {
      let response = await request.get('/api/test/productos');
      expect(response.status).to.eql(200);
    });
  });

  describe('GET', () => {
    it('Deberia traer todos los productos', async () => {
      let response = await request.get('/api/test/productos');
      expect(response.status).to.eql(200);
      const products = response.body;
      expect(products).to.deep.equal(productosFromJson);
    });
  });

  describe('POST', () => {
    it('Deberia incorporar un producto', async () => {
      const response = await request
        .post('/api/test/productos/false')
        .send(createProducto);

      expect(response.status).to.eql(200);

      const product = response.body;

      createdProductID = product._id;

      expect(product).to.include.keys('_id', 'timestamp');
      expect(product.nombre).to.eql(createProducto.nombre);
      expect(product.precio).to.eql(createProducto.precio);
      expect(product.foto).to.eql(createProducto.foto);
      expect(product.stock).to.eql(createProducto.stock);
      expect(product.amount).to.eql(createProducto.amount);
    });
  });

  describe('POST', () => {
    it('Deberia actualizar un producto', async () => {
      createProducto.amount = 0;
      console.log(createProducto);
      const response = await request
        .post(`/api/test/productos/${createdProductID}`)
        .send(createProducto);

      expect(response.status).to.eql(200);
    });
  });

  after(function () {
    // runs once after the last test in this block
    describe('DELETE', () => {
      it('Deberia borrar un producto por su ID', async () => {
        const response = await request.delete(
          `/api/test/productos/${createdProductID}`
        );
        expect(response.status).to.eql(200);
      });
    });
  });
});
