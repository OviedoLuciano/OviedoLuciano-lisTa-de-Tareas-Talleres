import { guardarTarea, obtenerTareas, onGetTasks,
borrarTarea, obtenerTarea, editarTarea } from "./firebase.js";

const tareasForm = document.getElementById('form-tareas')
const lista = document.getElementById('lista')
let editStatus = false;
let id = "";

window.addEventListener('DOMContentLoaded', async () => {
    
//    TRAER TAREAS
onGetTasks((querySnapshot) => {
   let html = '';

   querySnapshot.forEach(doc => {
    const tarea = doc.data()
    html += `
    <ul>
    <li>
    <h4>${tarea.titulo}. 
    <button class="btn-borrar bi bi-x-circle" data-id="${doc.id}"></button>
    <button class="btn-editar bi bi-pencil-square" data-id="${doc.id}"></button>
    </h4>
    
    <p>${tarea.fecha}</p>
    </li> 
    
    </ul>`
   
})

lista.innerHTML = html;

// BORRAR
const btnBorrar = lista.querySelectorAll('.btn-borrar')

btnBorrar.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) => {
borrarTarea(dataset.id)
Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Tarea eliminada',
    showConfirmButton: false,
    timer: 1500
  })
    })
})


// EDITAR
const btnEditar = lista.querySelectorAll('.btn-editar')

btnEditar.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
const doc = await obtenerTarea(e.target.dataset.id)
const tarea = doc.data()

tareasForm['titulo-tarea'].value = tarea.titulo
tareasForm['fecha-tarea'].value = tarea.fecha

editStatus = true;
id = doc.id;

tareasForm['boton-submit'].innerText = 'Editar'
})
})
    })
})

// AGREGAR
tareasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = tareasForm['titulo-tarea']
    const fecha = tareasForm['fecha-tarea']

// CHEQUEAR ESTADO
    if(!editStatus){
    // AGREGAR BTN
        guardarTarea(titulo.value, fecha.value)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tarea agregada con éxito',
        showConfirmButton: false,
        timer: 1500
    })
    } else {
    // EDITAR BTN
    editarTarea(id, {
        titulo: titulo.value,
        fecha: fecha.value,
    });
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tarea editada',
        showConfirmButton: false,
        timer: 1500
      })

    editStatus = false;
    }


    tareasForm.reset()
})