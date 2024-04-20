/* imports */
import express from 'express';
import exphbs from 'express-handlebars';
import multer from 'multer';
const app = express();
const port = 8080;
import imagenRouter from './routes/imagen.router.js';
import './database.js';

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

/* multer config */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/img');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).single('image'));

/* express handlebars */
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

/* routes */
app.use('/', imagenRouter);

/* listen */
app.listen(port, () => {
  console.log(`escuchando en el puerto:`, port);
});
