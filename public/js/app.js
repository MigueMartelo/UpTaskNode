import proyectos from './moduls/proyectos';
import tareas from './moduls/tareas';
import { actualizarAvance } from './funciones/avances';

document.addEventListener('DOMContentLoaded', () => {
  actualizarAvance();
});