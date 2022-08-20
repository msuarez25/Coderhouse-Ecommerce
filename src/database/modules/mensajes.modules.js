import mongoose from 'mongoose';
const { Schema } = mongoose;

const MensajesSchema = new Schema({
  email: {
    type: String,
    required: true,
    max: 100,
  },
  tipo: {
    type: String,
    required: true,
    max: 100,
  },
  mensaje: {
    type: String,
    max: 300,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const MensajesModule = new mongoose.model('Mensajes', MensajesSchema);
