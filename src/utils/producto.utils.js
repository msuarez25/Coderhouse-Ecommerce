import { faker } from '@faker-js/faker';
faker.locale = 'es';

const date = new Date();

export default function generateProducto() {
  return {
    nombre: faker.name.findName(),
    code: faker.random.alphaNumeric(12),
    precio: Math.floor(Math.random() * (500 - 100 + 1) + 100),
    foto: faker.image.imageUrl(),
    timestamp: date.toISOString(),
    stock: faker.datatype.number(),
    amount: Math.floor(Math.random() * (100 - 1 + 1) + 1),
  };
}
