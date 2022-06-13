import mongoose from 'mongoose';
const { Schema } = mongoose;

const carSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  productos: {
    type: Array,
    default: [],
  },
});

export const CarModule = new mongoose.model('Car', carSchema);
