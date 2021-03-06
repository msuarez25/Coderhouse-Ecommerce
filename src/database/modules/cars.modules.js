import mongoose from 'mongoose';
const { Schema } = mongoose;

const carSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: String,
  },
  productos: {
    type: Array,
    default: [],
  },
});

export const CarModule = new mongoose.model('Car', carSchema);
