import { Config } from '../../config.mjs'
import { TaskModel } from '../task.model.mjs'

export class TaskService {

    // GET Crea un nuevo log al mover tareas entre columnas
    getAndMoveTask(idColumn, idTaks) {
        fetch(`${Config.API_URL}taskMoveTo/${idTaks}/${idColumn}`)
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    // // GET Traer una tarea por su ID
    getTaskById(id) {
        return fetch(`${Config.API_URL}task/${id}`)
            .then(response => response.json());
    }

    // // GET Traer todas las tareas por tablero
    getAllTaskByBoardId(idBoard) {
        return fetch(`${Config.API_URL}tasks/${idBoard}`)
            .then(response => response.json());
    }

    // POST Crear una nueva tarea en su respectivo tablero
    createTask(idBoard, newTask) {
        const {name, description, deliveryDate} = newTask;
        
        fetch(`${Config.API_URL}task/${idBoard}`, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "description": description,
                "deliveryDate": deliveryDate
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // PUT Actualizar una tarea por su ID
    updateTaskById(id, newTask) {
        const {name, description, deliveryDate} = newTask;
        
        return fetch(`${Config.API_URL}task/${id}`, {
            method: 'PUT',
            body: JSON.stringify(TaskModel),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // DELETE Elimina una tarea por su ID
    deleteTaskById = (id) => {
        axios.delete(`${Config.API_URL}task/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}


