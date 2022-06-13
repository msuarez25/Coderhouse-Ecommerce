import mongoose from 'mongoose';
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    max: 100,
  },
  code: {
    type: String,
    required: true,
    max: 100,
  },
  precio: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    max: 100,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const ProductoModule = new mongoose.model('Producto', productoSchema);
