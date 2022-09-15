//Variables 
const form = document.querySelector('#formulario');
const todoList = document.querySelector('#todo-list');
let todos = [];

//Event listeners
eventListeners();


function eventListeners(){
    //cuando el usuario agrega una nueva tarea 
    formulario.addEventListener('submit', agregarTodo);

    // Borrar Tareas
    //todoList.addEventListener('click', borrarTodo);

    //cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded',() => {
        todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        createHTML();
    })
}


//Functions 
function agregarTodo(e){
    e.preventDefault();
    
    //textarea donde el usuario escribe 
    const todo = document.querySelector('#todo').value;
    

    //validacion
    if(todo === ''){
        showError('no puede ir vacio');
        return; // evita que se ejecuten mas lineas de codigo
    }

    const todosObj = {
        id: Date.now(),
        todo,
    }

    //anadir al arreglo de tareas 
    todos = [...todos, todosObj];

    //una vez agregado vamos a crear el HTML 
    createHTML();

    //reiniciar el formulario
    formulario.reset();
    
}

//mostrar mensaje de error
function showError(error){

    const errorMessage = document.createElement('p');
    errorMessage.textContent = error; 
    errorMessage.classList.add('error');

    //insertarlo en el contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(errorMessage);

    //eliminar la alerta despues de 3 segundos 
    setTimeout(() => {
        errorMessage.remove();
    },3000);
}

//Muestra un listado de las tareas 
function createHTML(){

    cleanHTML();

    if(todos.length > 0){
        todos.forEach(todo =>{
            //agregar un boton de eliminar 
            const btn = document.createElement('a');
            btn.classList.add('borrar-tarea');
            btn.innerHTML = 'X';

            //añadir la funcion de eliminar 
            btn.onclick = () => {
                borrarTodo(todo.id);
            } 

            //crear el html
            const li = document.createElement('li');

            //añadir el texto 
            li.innerText = todo.todo;

            //asignamos el boton
            li.appendChild(btn);

            //insetarlo en el html
            todoList.appendChild(li);
        })
    }

    addStorage();
}

//agrega las tareas al localStorage
function addStorage(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

//eliminar una tarea 
function borrarTodo(id){
    todos = todos.filter(todo => todo.id !== id);

    createHTML();
}

//Limpiar el html 
function cleanHTML(){
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }
}