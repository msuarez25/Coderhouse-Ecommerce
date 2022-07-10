import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.mongo_db_uri, (err) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('🔥 Conectado a la base de datos');
  }
});
