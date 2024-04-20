import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Conectado a mongoDB');
  })
  .catch((error) => {
    console.log(error, 'Error de conexión con mongoDB');
  });
