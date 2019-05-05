import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', (e) => {
    const proyectoUrl = e.target.dataset.proyectoUrl;

    Swal.fire({
      title: 'Deseas eliminar el proyecto?',
      text: "Un proyecto eliminado no se puede recuperar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar.',
      cancelButtonText: 'No, cancelar.'
    }).then((result) => {
      if (result.value) {
        const url = `${location.origin}/proyectos/${proyectoUrl}`;

        axios.delete(url, { params: { proyectoUrl } })
          .then((respuesta) => {
            console.log(respuesta);
            Swal.fire(
              'Borrado!',
              respuesta.data,
              'success'
            );

            // redireccionar a la página de proyectos
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error!',
              text: 'No se pudo eliminar el proyecto!'
            });
          });
      }
    });
  });
}

export default btnEliminar;
