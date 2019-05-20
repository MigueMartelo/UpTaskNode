import axios from 'axios';
import Swal from 'sweetalert2';

import { actualizarAvance } from '../funciones/avances';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      
      // request hacia /tareas/:id
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea })
        .then(respuesta => {
          if (respuesta.status === 200) {
            icono.classList.toggle('completo');
            actualizarAvance();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    if (e.target.classList.contains('fa-trash')) {
      const tareaHTML = e.target.parentElement.parentElement;
      const idTarea = tareaHTML.dataset.tarea;

      Swal.fire({
        title: 'Deseas eliminar esta tarea?',
        text: "Una tarea eliminad no se puede recuperar!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar.',
        cancelButtonText: 'No, cancelar.'
      }).then((result) => {
        if (result.value) {
          // request hacia /tareas/:id
          const url = `${location.origin}/tareas/${idTarea}`;
    
          axios.delete(url, { params: {idTarea} })
            .then(respuesta => {
              if (respuesta.status === 200) {
                // Eliminar el nodo
                tareaHTML.parentElement.removeChild(tareaHTML);

                // Opcional una alerta
                Swal.fire(
                  'Tarea Eliminada',
                  respuesta.data,
                  'success'
                );

                actualizarAvance();
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      })

    }
  })
}

export default tareas;