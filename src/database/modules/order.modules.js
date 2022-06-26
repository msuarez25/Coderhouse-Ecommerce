import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  productos: {
    type: Array,
    default: [],
  },
});

export const OrderModule = new mongoose.model('Order', orderSchema);
