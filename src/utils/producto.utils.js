import { faker } from '@faker-js/faker';
faker.locale = 'es';

export default function generateUser() {
  return {
    nombre: faker.name.findName(),
    code: faker.random.alphaNumeric(12),
    precio: faker.commerce.price(100, 5000),
    foto: faker.image.imageUrl(),
    timestamp: faker.time.recent('unix'),
    stock: faker.random.number({ max: 100 }),
  };
}
