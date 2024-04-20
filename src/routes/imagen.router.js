import { Router } from 'express';
const router = Router();
import { promises as fs } from 'fs';
import ImagenModel from '../models/imagen.model.js';

/* Ruta a la raiz de la aplicación */
router.get('/', async (req, res) => {
  const imagenes = await ImagenModel.find().lean();
  console.log(imagenes);
  res.render('index', { imagenes });
});

/* Ruta para acceder al form de carga de imagenes */
router.get('/upload', (req, res) => {
  res.render('upload');
});

/* Ruta upload para cargar imagenes */
router.post('/upload', async (req, res) => {
  try {
    const imagen = new ImagenModel();
    imagen.title = req.body.title;
    imagen.description = req.body.description;
    imagen.fileName = req.file.filename;
    imagen.path = '/img/' + req.file.filename;
    /* La guardamos en la base de datos */
    await imagen.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send({ message: 'No se pudo subir la imagen' });
  }
});

/* Ruta para eliminar imágenes */
router.get('/image/:id/delete', async (req, res) => {
  const { id } = req.params;
  const imagen = await ImagenModel.findByIdAndDelete(id);
  await fs.unlink('./src/public' + imagen.path);
  res.redirect('/');
});

export default router;
