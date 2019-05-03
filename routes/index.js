const express = require('express');
const router = express.Router();

// importar controllador
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
  // ruta para el home
  router.get('/', proyectosController.proyectosHome);
  router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);

  return router;
}