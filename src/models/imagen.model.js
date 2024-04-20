import mongoose from 'mongoose';

const imagenSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileName: String,
  path: String,
});

const ImagenModel = mongoose.model('imagenes', imagenSchema);

export default ImagenModel;
