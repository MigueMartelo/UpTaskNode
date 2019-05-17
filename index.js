const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// importando helpers con algunas funciones
const helpers = require('./helpers');

// crear la conexión a la DB
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
  .then(() => console.log('Conectado al Servidor'))
  .catch(err => console.log(err));

// crear una aplicación de express
const app = express();

// donde cargar archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// habilitando vardump en la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// habilitar bodyParser para leer datos de formularios
app.use(bodyParser.urlencoded({ extends: true }));

// rutas
app.use('/', routes());

// puerto de la app
app.listen(3500);