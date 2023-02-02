import { guardarTarea, obtenerTareas, onGetTasks,
borrarTarea, obtenerTarea, editarTarea } from "./firebase.js";

const tareasForm = document.getElementById('form-tareas')
const lista = document.getElementById('lista')
let editStatus = false;
let id = "";

window.addEventListener('DOMContentLoaded', async () => {
    
   
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

const btnBorrar = lista.querySelectorAll('.btn-borrar')

btnBorrar.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) => {
borrarTarea(dataset.id)
console.log('Borrando')
    })
})

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


tareasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = tareasForm['titulo-tarea']
    const fecha = tareasForm['fecha-tarea']

    if(!editStatus){
    guardarTarea(titulo.value, fecha.value)
    } else {
    editarTarea(id, {
        titulo: titulo.value,
        fecha: fecha.value
    });

    editStatus = false;
    }


    tareasForm.reset()
})