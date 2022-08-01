import { Config } from '../../config.mjs'
import { BoardView } from '../../view/board.view.mjs';
import { BoardModel } from '../board.model.mjs';
import { BoardService } from './board.service.mjs';


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
        }).then(async () => {
            const board = new BoardService();
            const data = await board.getBoardById(idBoard);
            const responseData = data.data;
            const boardUpdate = new BoardModel(responseData.id, responseData.name);
            new BoardView().init(boardUpdate);
        });

    }

    // PUT Actualizar una tarea por su ID
    updateTaskById(idTask, newTask, idBoard) {
        const {name, description, deliveryDate} = newTask;
        
        fetch(`${Config.API_URL}task/${idTask}`, {
            method: 'PUT',
            body: JSON.stringify({
                "name": name,
                "description": description,
                "deliveryDate": deliveryDate
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async () => {
            const board = new BoardService();
            const data = await board.getBoardById(idBoard);
            const responseData = data.data;
            const boardUpdate = new BoardModel(responseData.id, responseData.name);
            new BoardView().init(boardUpdate);
        });
        
    }

    // DELETE Elimina una tarea por su ID
    deleteTaskById = (id, idBoard) => {
        axios.delete(`${Config.API_URL}task/${id}`)
            .then( async () => {
                const board = new BoardService();                
                const data = await board.getBoardById(idBoard);
                const responseData = data.data;
                const boardUpdate = new BoardModel(responseData.id, responseData.name);
                new BoardView().init(boardUpdate);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}


