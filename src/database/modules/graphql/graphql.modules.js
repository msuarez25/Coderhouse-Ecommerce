import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Producto {
        _id: ID
        nombre: String
        foto: String
        precio: String
        stock: Int
        code: String
        timestamp: String
        amount: Int
    }
  
    type User {
        _id: ID
        userName: String
        password: String
        firstName: String
        lastName: String
        email: String
        countryCode: String
        phone: String
        address: String
        age: Int
        foto: String
        timestamps: String
    }

    type Car {
        _id: ID
        timestamp: String
        user: String
        productos: [Producto]
    }

    type Order {
        _id: ID
        timestamp: String
        user: String
        productos: [Producto]
    }

    input ProductoInput {
        nombre: String!
        foto: String!
        precio: String!
        stock: Int!
        code: String!
    }

    input CarInput {
        timestamp: String
        productos: [ProductoInput]
    }

    input UserInput {
        userName: String!
        password: String!
        firstName: String!
        lastName: String!
        email: String!
        countryCode: String!
        phone: String!
        address: String!
        age: Int!
        foto: String!
        timestamps: String!
    }

    input ProductoUpdateInput {
        nombre: String
        foto: String
        precio: String
        stock: Int
        code: String
    }

    input UserUpdateInput {
        userName: String
        password: String
        firstName: String
        lastName: String
        email: String
        countryCode: String
        phone: String
        address: String
        age: Int
        foto: String
        timestamps: String
    }

    input CarUpdateInput {
        timestamp: String
        productos: [ProductoInput]
    }

    type Query {
        productos: [Producto]
        producto(_id: ID!): Producto
        userGet(_id: ID!): User
        car(_id: ID!): Car
    }

    type Mutation {
        createProducto(producto: ProductoInput): Producto
        updateProducto(_id: ID!, producto: ProductoUpdateInput): Producto
        deleteProducto(_id: ID!): String
        createCar(car: CarInput): Car
        updateCar(_id: ID!, car: CarUpdateInput): Car
        deleteCar(_id: ID!): String
    }
`);

export default schema;
